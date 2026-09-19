#!/usr/bin/env python3
"""NOTICE: This file was written by an LLM coding system (Claude).

Builds the three "platform moderation at scale" plates for docs/slides/week5.md.

Each plate is a golden rectangle (1000 x 618, per docs/assets/STYLE.md) filled with
that platform's own primary brand colour, with the platform wordmark knocked out in
white and centred. Source logos are the public-domain Wikimedia Commons SVGs in
docs/assets/logos/; they are recoloured to a white monochrome knockout here, which
is why the originals are kept alongside the generated plates.
"""
import re
from pathlib import Path

PHI = (1 + 5 ** 0.5) / 2
WIDTH = 1000
HEIGHT = round(WIDTH / PHI)          # 618
LOGO_FRACTION = 0.52                 # wordmark spans ~half the plate width

HERE = Path(__file__).resolve().parent
LOGOS = HERE.parent / "docs" / "assets" / "logos"

PLATFORMS = [
    # slug,      source svg,    brand colour,  why that colour
    ("meta",     "meta.svg",    "#0064E0", "Meta blue, the gradient anchor in its own wordmark"),
    ("tiktok",   "tiktok.svg",  "#000000", "TikTok black, the app's own background surface"),
    ("youtube",  "youtube.svg", "#FF0000", "YouTube red, the play-button colour"),
]


def logo_body(svg_text):
    """Return (inner markup recoloured white, viewBox numbers)."""
    vb = re.search(r'viewBox="([\d.\-\s]+)"', svg_text)
    if vb:
        x, y, w, h = (float(n) for n in vb.group(1).split())
    else:  # a couple of Commons files give width/height only
        w = float(re.search(r'width="([\d.]+)', svg_text).group(1))
        h = float(re.search(r'height="([\d.]+)', svg_text).group(1))
        x = y = 0.0

    inner = re.sub(r'^.*?<svg[^>]*>', '', svg_text, flags=re.S)
    inner = re.sub(r'</svg>\s*$', '', inner, flags=re.S)
    inner = re.sub(r'<(defs|style)\b.*?</\1>', '', inner, flags=re.S | re.I)

    # Shapes the source already paints white are cut-outs (YouTube's play triangle),
    # so they have to end up the plate colour, not white. Park them behind a
    # sentinel, flatten every other paint to white, then restore them.
    CUTOUT = '__CUTOUT__'
    inner = re.sub(r'fill="(?:white|#fff(?:fff)?)"', f'fill="{CUTOUT}"', inner, flags=re.I)
    inner = re.sub(r'fill:\s*(?:white|#fff(?:fff)?)\b', f'fill:{CUTOUT}', inner, flags=re.I)

    # Flatten every remaining paint: flat fills, style fills, rgb(), gradients.
    inner = re.sub(r'fill="url\([^)]*\)"', 'fill="#FFFFFF"', inner, flags=re.I)
    inner = re.sub(r'fill="#[0-9A-Fa-f]{3,6}"', 'fill="#FFFFFF"', inner)
    inner = re.sub(r'fill="rgb\([^)]*\)"', 'fill="#FFFFFF"', inner, flags=re.I)
    inner = re.sub(r'fill:\s*url\([^)]*\)', 'fill:#FFFFFF', inner, flags=re.I)
    inner = re.sub(r'fill:\s*#[0-9A-Fa-f]{3,6}', 'fill:#FFFFFF', inner)
    inner = re.sub(r'fill:\s*rgb\([^)]*\)', 'fill:#FFFFFF', inner, flags=re.I)
    return inner.strip(), (x, y, w, h)


def build(slug, src, colour, rationale):
    inner, (x, y, w, h) = logo_body((LOGOS / src).read_text())
    inner = inner.replace('__CUTOUT__', colour)
    scale = (WIDTH * LOGO_FRACTION) / w
    tx = (WIDTH - w * scale) / 2 - x * scale
    ty = (HEIGHT - h * scale) / 2 - y * scale
    out = f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {WIDTH} {HEIGHT}" width="{WIDTH}" height="{HEIGHT}" role="img" aria-label="{slug} logo">
  <title>{slug} — {rationale}</title>
  <rect width="{WIDTH}" height="{HEIGHT}" fill="{colour}"/>
  <g transform="translate({tx:.3f} {ty:.3f}) scale({scale:.5f})" fill="#FFFFFF">
{inner}
  </g>
</svg>
"""
    dest = LOGOS / f"{slug}-plate.svg"
    dest.write_text(out)
    print(f"  {dest.name:<20} {WIDTH}x{HEIGHT}  {colour}  ({rationale})")


if __name__ == "__main__":
    print(f"golden rectangle {WIDTH} x {HEIGHT} (phi={PHI:.5f})")
    for args in PLATFORMS:
        build(*args)
