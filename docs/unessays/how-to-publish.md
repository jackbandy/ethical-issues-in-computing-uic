---
layout: page
nav_current: unessays
title: Publish Your Unessay as a Website
description: How students can publish an unessay website on doethics.fun.
---

<!-- NOTICE: This page was modified by an LLM coding system. -->

**This page is for unessays that are websites.** If yours is a painting, song, video, or anything else, you don't need it. Publishing here is also optional: you can host anywhere and just send me the link, or an archive.

If you do put your unessay in the repo, your site will get its own address, like `doethics.fun/unessays/fa26/your-folder/`, and a link on the [unessays page](./). You can start from the [demo site](fa26/demo/), source is in [`docs/unessays/fa26/demo/`](https://github.com/jackbandy/ethical-issues-in-computing-uic/tree/main/docs/unessays/fa26/demo).

## Constraints

1. **Static files only.** HTML, CSS, JavaScript, images, audio, and video work. Anything that needs a server (PHP, databases, logins, forms) will not work.
2. **Everything must stay in your folder.** Don't load anything from another website (Fonts, CDNs, YouTube, etc.). Download it into the folder instead.
3. **Keep the three tags** at the top of the demo's `<head>`.
4. **Put JavaScript in its own `.js` file** (`<script src="game.js"></script>`). The tags above block JavaScript written directly inside the HTML file, including `onclick="..."` attributes.
5. **Use relative paths** (`style.css`, not `/style.css`).
6. **Try to stay under 10 MB.**

Some files are automatically dropped / ignored ( `.csv`, `.py`, `.sh`, `.scss`, and `.bib` files, a `README.md` in your folder, and names starting with `_` or `.`). 

## Steps

1. **Fork** the [course repository](https://github.com/jackbandy/ethical-issues-in-computing-uic).
2. **Copy** `docs/unessays/fa26/demo/` to `docs/unessays/fa26/your-folder/` (lowercase letters, numbers, and hyphens), and replace contents with your site.
3. **Preview** it by running `python3 -m http.server` inside your folder and opening `http://localhost:8000`.
4. **Add one line** to `docs/_data/unessays.csv`: `fa26,your-folder,Your Title,Your Name or Pseudonym,Book Title`.
5. **Open a pull request** with the checklist below. Your site should go live when I merge it.


Again, this is all fully optional. You have many other options for your unessay, and you can also publish a website "unessay" in a different way. If you do want your unessay website in this repo, please let me know that you agree to the following:

```
- [ ] I agree to publish this work on doethics.fun.
- [ ] Credit me as: (real name / pseudonym / anonymous) ____
- [ ] After the semester: (keep it up / take it down) ____
- [ ] I have permission to use every image, sound, and video in it.
```

## Step-by-step details

This section walks through each step in more detail. Note that you need a free [GitHub account](https://github.com/signup).

### 1. Fork the repository

A fork is your own copy of the course repository, where you can make changes without affecting any of the original material.

1. Go to the [course repository](https://github.com/jackbandy/ethical-issues-in-computing-uic) while logged in to GitHub.
2. Click **Fork** near the top right, keep the default settings, and click **Create fork**.
3. You now have a copy at `github.com/YOUR-USERNAME/ethical-issues-in-computing-uic`. Make all changes in that copy.

### 2. Add your folder

Pick a folder name, e.g. `chicago-train-game`. Use only lowercase letters, numbers, and hyphens, as it becomes part of your site's address.

**Option A: in the browser (no software to install).**

1. In your fork, open `docs/unessays/fa26/`.
2. Click **Add file → Create new file**. In the name box, type `your-folder/index.html`. Typing the `/` creates the folder.
3. Paste in the demo's `index.html` (or your own) and click **Commit changes**.
4. Open your new folder, click **Add file → Upload files**, and drag in the rest of your files (`.css`, `.js`, images, and so on). Click **Commit changes**.

**Option B: with Git on your computer.**

```
git clone https://github.com/YOUR-USERNAME/ethical-issues-in-computing-uic.git
cd ethical-issues-in-computing-uic
cp -r docs/unessays/fa26/demo docs/unessays/fa26/your-folder
```

Then replace the files in `docs/unessays/fa26/your-folder/` with your own.

A few things to check in your folder:

- **The main page must be named `index.html`** (all lowercase). That is the page people see at your site's address.
- **File names must match exactly, including capital letters.** Your computer may treat `Cover.JPG` and `cover.jpg` as the same file, but the live site will not.
- **Link back to the list of unessays**, as the demo does: `<a href="../../">&larr; All unessays</a>`.
- **A `README.md` is welcome** for people reading your source on GitHub. It stays in the public repository but is not published on doethics.fun.

### 3. Preview your site

This step needs your files on your computer (Option B, or download them) and Python 3 (already installed on most Macs and can be installed on Windows from [python.org](https://www.python.org/downloads/)).

1. Open a terminal and go to your folder: `cd docs/unessays/fa26/your-folder`
2. Run `python3 -m http.server` (on Windows, `py -m http.server`).
3. Open `http://localhost:8000` in your browser. You should see your site, and it should behave the same way it will on doethics.fun.
4. Press `Ctrl+C` in the terminal to stop the preview.

If the page is blank or something doesn't work, open your browser's developer console (right-click the page, choose **Inspect**, then the **Console** tab) to look for error messages.

### 4. Add your line to the list

1. In your fork, open `docs/_data/unessays.csv` and click the pencil icon to edit it.
2. Add your line at the very bottom, directly under the last line: `fa26,your-folder,Your Title,Your Name or Pseudonym,Book Title`.
3. `your-folder` must match your folder name exactly.
4. Don't leave blank lines. A blank line shows up as an empty entry on the unessays page.
5. If your title contains a comma, put it in double quotes: `fa26,your-folder,"Power, Code, and You",Your Name,Book Title`.
6. Click **Commit changes**. (With Option B, run `git add docs`, then `git commit -m "Add my unessay"`, then `git push`.)

### 5. Open a pull request

A pull request asks me to copy the changes from your fork into the course repository.

1. Go to your fork on GitHub. Click **Contribute**, then **Open pull request**.
2. Check that the top of the page shows `jackbandy/ethical-issues-in-computing-uic` and `main` on the left, and your fork on the right.
3. Give it a short title, like "Add Chicago train game unessay".
4. Paste the checklist above into the description. Change each `[ ]` to `[x]` and fill in the blanks.
5. Click **Create pull request**.

I'll review it and may leave comments asking for changes. To make a change, edit the files in your fork again: new commits show up in the same pull request automatically, so you don't need to open a new one. After I merge it, your site goes live within a few minutes at `doethics.fun/unessays/fa26/your-folder/`.

To change your site after it's live, click **Sync fork** on your fork's page first so it has the latest version of the course repository, then make your edits and open a new pull request the same way.
