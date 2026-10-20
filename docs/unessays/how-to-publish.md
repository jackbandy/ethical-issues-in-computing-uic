---
layout: page
title: Publish Your Unessay as a Website
description: How students can publish an unessay website on doethics.fun.
---

<!-- NOTICE: This page was modified by an LLM coding system. -->

**This page is  for unessays that are websites.** If yours is a painting, song, video, or anything else, you don't need it. Publishing here is optional: you can host your site anywhere and just send me the link.

The site will gets its own address, like `doethics.fun/unessays/fa26/your-folder/`, and a link on the [unessays page](./). You can start from the [demo site](fa26/demo/), whose source is in [`docs/unessays/fa26/demo/`](https://github.com/jackbandy/ethical-issues-in-computing-uic/tree/main/docs/unessays/fa26/demo).

## Constraints

1. **Static files only.** HTML, CSS, JavaScript, images, audio, and video work. Anything that needs a server (PHP, databases, logins, forms) will not work.
2. **Everything must stay in your folder.** Don't load anything from another website (Fonts, CDNs, YouTube, etc.). Download it into the folder instead.
3. **Keep the three tags** at the top of the demo's `<head>`.
4. **Use relative paths** (`style.css`, not `/style.css`).
5. **Try to stay under 10 MB.**

Some files are automatically dropped / ignored ( `.csv`, `.py`, `.sh`, `.scss`, and `.bib` files, and names starting with `_` or `.`). 

## Steps

1. **Fork** the [course repository](https://github.com/jackbandy/ethical-issues-in-computing-uic).
2. **Copy** `docs/unessays/fa26/demo/` to `docs/unessays/fa26/your-folder/` (lowercase letters, numbers, and hyphens), and replace contents with your site.
3. **Preview** it by running `python3 -m http.server` inside your folder and opening `http://localhost:8000`.
4. **Add one line** to `docs/_data/unessays.csv`: `fa26,your-folder,Your Title,Your Name or Pseudonym,Book Title`.
5. **Open a pull request** with the checklist below. Your site goes live when I merge it.


This is all fully optional. You have many other options for your unessay, and you can also publish a website "unessay" in a different way. If you do want your unessay website in this repo, please let me know that you agree to the following:

```
- [ ] I agree to publish this work on doethics.fun.
- [ ] Credit me as: (real name / pseudonym / anonymous) ____
- [ ] After the semester: (keep it up / take it down) ____
- [ ] I have permission to use every image, sound, and video in it.
```
