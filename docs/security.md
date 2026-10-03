---
layout: page
title: Privacy &amp; Security
description: Privacy and security policy for doethics.fun
---

<!-- NOTICE: This page was drafted by an LLM coding system (Claude Code), adapted from dodatascience.fun/security.html and jackbandy.com/security. Review before relying on it. -->

## Privacy

This site collects nothing. No analytics, no cookies, no accounts, no advertising, no profiling.

### No analytics, no cookies

There is no analytics script on this site — no GoatCounter, no Clicky, no Google Analytics, etc. The site sets no cookies and no local storage. There is nothing to opt out of and nothing to block.

There are also no accounts, no logins, no comment system, and no newsletter, so there is nothing for the site to store about you.

### Third-party requests

The core pages (schedule, syllabus, dilemmas, exercises, FAQ, the book gallery) are self-contained: HTML, CSS, fonts, images, and a few small JavaScript files, all served from this domain. Book covers in the gallery are cached copies served from here, not loaded from a bookseller.

The **slides** (`/slides/`) are Reveal.js decks built by [Quarto](https://quarto.org). They load no third-party scripts or fonts, but a few reach outside the domain, and you should know about them:

- A few slides embed a page from another site: YouTube (via `youtube-nocookie.com`), the Stanford Encyclopedia of Philosophy, Wikipedia, Northwestern, and jackbandy.com. Those embeds are subject to the provider's own privacy practices, not mine.
- The radio button streams UIC Radio from `maindigitalstream.com`, only after you press play.
- The attendance letter draw asks `random.org` for one letter, only when the button is pressed.

### Affiliate links

The book gallery links to [Bookshop.org](https://bookshop.org), which supports independent bookstores. Each book has two links: an affiliate link, which credits this course with a small commission, and a plain link with no referral tag. Both go to the same book at the same price. Nothing is tracked on this site either way; Bookshop.org handles the click under its own privacy policy.

### Hosting

The site is static files served by GitHub Pages, which keeps its own request logs under [GitHub's privacy statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) (I have no access to per-visitor data from those logs).

---

## Security

*Reporting procedure adapted from the [GitHub official security policy template](https://github.com/github/.github/blob/master/SECURITY.md).*

This is a course website — static HTML on GitHub Pages, with no server-side code, no database, and no user accounts. The attack surface is small, but I still take reports seriously, so thanks for being here.

### What's in place

- **Static hosting**: no server-side code, no database, nothing to inject into.
- **HTTPS everywhere**, enforced by GitHub Pages.
- **Content Security Policy on every page**, set in a `<meta>` tag. On the core pages it defaults to `'self'`, with no `'unsafe-inline'` for scripts, so injected inline JavaScript will not run. `base-uri 'none'` blocks `<base>`-tag hijacking, and `form-action 'none'` applies everywhere because the site has no forms. The slides get their own policy, which names each outside host listed above and nothing else.
- **Minimal scripts**, none of them inline on the core pages: JavaScript lives in separate files. The two one-line redirect stubs that do use an inline script allowlist it by sha256 hash and run under `default-src 'none'`.
- **No third-party fonts, scripts, or CDNs**: fonts are self-hosted, and math in the slides is rendered as MathML at build time instead of being loaded from a CDN.
- **Escaped student writing**: reviews in the book gallery are escaped before they reach the page, so a review cannot run as script.
- **Everything is public**: the full source of this site is in [the repository](https://github.com/jackbandy/ethical-issues-in-computing-uic), so anything you can find in the site, you can also find in the code.

### Known gaps

- GitHub Pages cannot send custom response headers, so there is no HTTP Strict Transport Security and no clickjacking protection (`frame-ancestors` only works as a header, not in a `<meta>` tag).
- The slides' policy still allows `'unsafe-inline'` scripts, because Quarto writes inline scripts into every deck.
- There is no CSP violation reporting, so I find out about problems when someone tells me.

### Reporting security issues

If you believe you have found a security or privacy issue, please report it through coordinated disclosure. Email [jxb@uic.edu](mailto:jxb@uic.edu) for anything sensitive. To encrypt it, use my [PGP key](https://jackbandy.com/pgp-key.txt), fingerprint `F37C FDA1 D0DD 0853 6C60 7D86 D9C9 11D1 1B09 9DD3`. For non-sensitive issues, you can open a [GitHub issue](https://github.com/jackbandy/ethical-issues-in-computing-uic/issues).

Include as much of the following as you can:

- The type of issue
- Full paths of source file(s) related to the issue
- The location of the affected source code (i.e. direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it
- Anything else you think I should know

### Policy

This site follows the principles of [GitHub's Safe Harbor Policy](https://docs.github.com/en/site-policy/security-policies/github-bug-bounty-program-legal-safe-harbor). Good-faith research consistent with that policy is welcome. There is no bug bounty — this is a simple course site — but I'm glad to say thanks and/or credit you somewhere.

Machine-readable contact details: [security.txt](/.well-known/security.txt).

*Last reviewed: 3 October 2026.*
