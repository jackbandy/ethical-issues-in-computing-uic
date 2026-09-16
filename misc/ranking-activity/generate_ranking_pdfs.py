#!/usr/bin/env python3
"""Build the "Values in Ranking" handout from a Communalytic CSV export.

Usage:
    python3 generate_ranking_pdfs.py --input uic-subreddit-feb-2026.csv --term "fall-2026"

Pipeline:
    1. Read a Communalytic "Reddit - Search Posts" CSV export (columns:
       id,date,author,title,text,comment_on,type,score,upvote_ratio,url,
       permalink,user_flair,submission_flair).
    2. Trim: keep submissions with score > --min-score, drop rows an "NSFW"
       column marks true (if the export has one -- the current Communalytic
       schema above does not, so this is a no-op unless a future export adds
       it), drop posts whose content is an image/video (flagged via "media_urls"
       or an "Image" flair), truncate body text to --max-preview-chars
       characters (cutting at the last full word that still fits, so the
       preview uses as much of the cell as possible instead of stopping at a
       fixed word count).
    3. Randomly sample --num-versions * --per-version posts (no overlap
       across versions) and split into that many groups (Version A, B, C...).
    4. For each version, trial-compile its table alone and drop posts from
       the end one at a time (lowering the "propose a ranking (1-N)" max to
       match) until the table fits on a single page.
    5. Render one combined .tex (table + reflection page per version) from
       ranking-template.tex and compile it to a single PDF with latexmk.

Requires latexmk and pdfinfo (part of a standard TeX Live / MacTeX + poppler
install) on PATH.
"""
import argparse
import csv
import random
import re
import shutil
import string
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
TEMPLATE = HERE / "ranking-template.tex"
MIN_POSTS_PER_VERSION = 5

EMOJI_PATTERN = re.compile(
    "["
    "\U0001F300-\U0001FAFF"
    "\U00002600-\U000027BF"
    "\U0001F1E6-\U0001F1FF"
    "\U0000FE0F"
    "\U0000200D"
    "]+",
    flags=re.UNICODE,
)

LATEX_SPECIAL = {
    "&": r"\&",
    "%": r"\%",
    "$": r"\$",
    "#": r"\#",
    "_": r"\_",
    "{": r"\{",
    "}": r"\}",
    "~": r"\textasciitilde{}",
    "^": r"\textasciicircum{}",
    "\\": r"\textbackslash{}",
}
LATEX_SPECIAL_RE = re.compile(r"[&%$#_{}~^\\]")


def escape_latex(s: str) -> str:
    return LATEX_SPECIAL_RE.sub(lambda m: LATEX_SPECIAL[m.group()], s)


MARKDOWN_LINK_PATTERN = re.compile(r"\[[^\]]*\]\(https?://[^)]+\)")
URL_PATTERN = re.compile(r"https?://\S+")
MARKDOWN_ESCAPE_PATTERN = re.compile(r"\\([-*_`#+.!\[\]()>~\\])")


def clean_text(s: str, max_chars: int | None = None) -> str:
    s = s or ""
    s = EMOJI_PATTERN.sub("", s)
    s = MARKDOWN_ESCAPE_PATTERN.sub(r"\1", s)  # reddit's markdown backslash-escapes, e.g. "\-6" -> "-6"
    s = MARKDOWN_LINK_PATTERN.sub("[link]", s)  # "[text](url)" as a whole, before the bare-URL pass below
    s = URL_PATTERN.sub("[link]", s)  # bare URLs have no spaces to wrap on and overflow the table cell
    s = " ".join(s.split())  # collapse newlines/whitespace
    if max_chars is not None and len(s) > max_chars:
        # Cut at the last full word that still fits the budget, rather than a
        # fixed word count -- a word-count cutoff stops well short of the cell's
        # actual width whenever the words happen to be short.
        s = s[: max_chars + 1].rsplit(" ", 1)[0] + "..."
    return s


def has_media(row: dict, fieldnames: list[str]) -> bool:
    if "media_urls" in fieldnames:
        v = (row.get("media_urls") or "").strip()
        if v not in ("", "[]"):
            return True
    return (row.get("submission_flair") or "").strip().lower() == "image"


def load_pool(input_csv: Path, min_score: float, max_preview_chars: int) -> list[dict]:
    with input_csv.open(encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        fieldnames = reader.fieldnames or []
        rows = list(reader)

    pool = []
    for row in rows:
        if "type" in fieldnames and row.get("type") != "Submission":
            continue
        if "NSFW" in fieldnames and str(row.get("NSFW", "")).strip().lower() in ("true", "1", "yes"):
            continue
        if has_media(row, fieldnames):
            continue
        title = (row.get("title") or "").strip()
        if not title:
            continue
        try:
            score = float(row.get("score", "0") or "0")
        except ValueError:
            continue
        if not (score > min_score):
            continue
        pool.append(
            {
                "title": clean_text(title),  # titles aren't truncated, just cleaned
                "preview": clean_text(row.get("text") or "", max_chars=max_preview_chars),
                "tag": clean_text(row.get("submission_flair") or ""),
            }
        )
    return pool


def write_audit_csv(path: Path, rows: list[dict]) -> None:
    with path.open("w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "tag", "preview"])
        writer.writeheader()
        writer.writerows(rows)


def render_table_section(version_label: str, rows: list[dict], rank_max: int) -> str:
    row_lines = []
    for r in rows:
        title = escape_latex(r["title"])
        preview = escape_latex(r["preview"])
        tag = escape_latex(r["tag"])
        row_lines.append(f"{title} & {preview} & {tag} & \\rule{{0pt}}{{1.6\\baselineskip}} \\\\ \\hline")
    table_body = "\n    ".join(row_lines)

    return f"""\\wstitle{{Values in Ranking (Version {version_label})}}
\\wscourseline
\\wsbigtitle
\\rkinstructions{{{rank_max}}}

\\rktable{{%
    {table_body}
}}"""


def render_reflection_section() -> str:
    return """\\setcounter{wsquestion}{0}
\\wstitle{Ranking Reflection}
\\wsheader

\\wsprompt{Briefly summarize how you decided to rank the posts, that is, how you decided which posts should be seen by the most people.}"""


def render_document(body: str) -> str:
    return f"""\\input{{{TEMPLATE}}}

\\wscourse{{CS 377}}

\\begin{{document}}
{body}
\\end{{document}}
"""


def compile_pdf(tex_path: Path, aux_dir: Path) -> Path:
    aux_dir.mkdir(parents=True, exist_ok=True)
    result = subprocess.run(
        [
            "latexmk",
            "-pdf",
            "-interaction=nonstopmode",
            "-halt-on-error",
            f"-outdir={aux_dir}",
            "-cd",
            str(tex_path),
        ],
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        log_tail = "\n".join(result.stdout.splitlines()[-40:])
        raise RuntimeError(f"latexmk failed for {tex_path.name}:\n{log_tail}")
    return aux_dir / (tex_path.stem + ".pdf")


def pdf_page_count(pdf_path: Path) -> int:
    result = subprocess.run(["pdfinfo", str(pdf_path)], capture_output=True, text=True, check=True)
    for line in result.stdout.splitlines():
        if line.startswith("Pages"):
            return int(line.split(":", 1)[1].strip())
    raise RuntimeError(f"pdfinfo produced no Pages line for {pdf_path}")


def table_fits_one_page(version_label: str, rows: list[dict], fit_dir: Path) -> bool:
    tex_path = fit_dir / "fitcheck.tex"
    tex_path.write_text(render_document(render_table_section(version_label, rows, len(rows))), encoding="utf-8")
    result = subprocess.run(
        ["pdflatex", "-interaction=nonstopmode", "-halt-on-error", "-output-directory", str(fit_dir), str(tex_path)],
        capture_output=True,
        text=True,
        cwd=fit_dir,
    )
    if result.returncode != 0:
        log_tail = "\n".join(result.stdout.splitlines()[-40:])
        raise RuntimeError(f"pdflatex fit-check failed for version {version_label}:\n{log_tail}")
    return pdf_page_count(fit_dir / "fitcheck.pdf") <= 1


def fit_to_one_page(version_label: str, rows: list[dict], fit_dir: Path) -> list[dict]:
    chunk = rows[:]
    while len(chunk) > MIN_POSTS_PER_VERSION and not table_fits_one_page(version_label, chunk, fit_dir):
        chunk = chunk[:-1]
    if not table_fits_one_page(version_label, chunk, fit_dir):
        raise RuntimeError(
            f"Version {version_label}'s table still doesn't fit on one page at the {MIN_POSTS_PER_VERSION}-post "
            "floor. Lower --max-preview-chars or MIN_POSTS_PER_VERSION."
        )
    return chunk


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("--input", required=True, type=Path, help="Communalytic CSV export")
    parser.add_argument("--term", required=True, help="e.g. fall-2026 -- used in output filenames")
    parser.add_argument("--num-versions", type=int, default=4)
    parser.add_argument("--per-version", type=int, default=13, help="starting post count per version, before the one-page fit check may trim it")
    parser.add_argument("--min-score", type=float, default=1, help="keep posts with score > this value")
    parser.add_argument("--max-preview-chars", type=int, default=100)
    parser.add_argument("--seed", type=int, default=None, help="random seed, for reproducible samples")
    args = parser.parse_args()

    if not shutil.which("latexmk"):
        sys.exit("Error: latexmk is required (part of MacTeX/TeX Live) but was not found on PATH.")
    if not shutil.which("pdfinfo"):
        sys.exit("Error: pdfinfo is required (part of poppler) but was not found on PATH.")

    pool = load_pool(args.input, min_score=args.min_score, max_preview_chars=args.max_preview_chars)
    needed = args.num_versions * args.per_version
    if len(pool) < needed:
        sys.exit(
            f"Error: only {len(pool)} posts survived trimming (score > {args.min_score}), "
            f"but {needed} are needed for {args.num_versions} versions of {args.per_version} posts each. "
            "Lower --min-score, --per-version, or --num-versions."
        )

    rng = random.Random(args.seed)
    sample = pool[:]
    rng.shuffle(sample)
    sample = sample[:needed]

    output_dir = HERE / "output" / args.term
    output_dir.mkdir(parents=True, exist_ok=True)
    fit_dir = output_dir / ".fit_check"
    fit_dir.mkdir(parents=True, exist_ok=True)

    labels = string.ascii_uppercase
    sections = []
    for i in range(args.num_versions):
        label = labels[i]
        chunk = sample[i * args.per_version : (i + 1) * args.per_version]

        fitted = fit_to_one_page(label, chunk, fit_dir)
        if len(fitted) < len(chunk):
            print(f"Version {label}: trimmed {len(chunk)} -> {len(fitted)} posts to fit one page")

        write_audit_csv(output_dir / f"version-{label}.csv", fitted)
        sections.append(render_table_section(label, fitted, rank_max=len(fitted)))
        sections.append(render_reflection_section())

    combined_tex = render_document("\n\n\\newpage\n\n".join(sections))
    tex_path = output_dir / f"ranking-{args.term}.tex"
    tex_path.write_text(combined_tex, encoding="utf-8")

    pdf_path = compile_pdf(tex_path, aux_dir=output_dir / ".build")
    pdf_dir = HERE / "pdfs" / args.term
    pdf_dir.mkdir(parents=True, exist_ok=True)
    final_pdf = pdf_dir / f"ranking-{args.term}.pdf"
    shutil.copy(pdf_path, final_pdf)

    pages = pdf_page_count(final_pdf)
    print(f"\nBuilt {final_pdf} ({pages} pages)")
    print(f"Audit CSVs and .tex source are in {output_dir}")


if __name__ == "__main__":
    main()
