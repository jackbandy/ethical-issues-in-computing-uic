# Ministry of Truth: The Rectification Desk

A short office game based on George Orwell's novel *1984*. Play as a Propaganda Officer for the Party. Documents arrive at your desk, and you strike out anything that could damage the Party's reputation. Do it correctly and the next document arrives. Do it wrong and there will be consequences.

**[Play the game](https://doethics.fun/unessays/fa26/ministry-of-truth/)**

## About the project

This game is my unessay for CS 377, Ethical Issues in Computing. You do not need to have read the book *1984*. The setting is explained through the documents themselves, and every rule fits on one slip of paper.

## How to play

1. Open the game and click **Take your seat**.
2. Read the document. Click any phrase to strike it out, or click it again to restore it.
3. Strike anything that may damage the reputation of the Party. Leave everything else untouched.
4. Click **Send down the memory hole**. A correct edit earns the RECTIFIED stamp and the next document.
5. A wrong edit ends your shift. You can report for duty again and start over.

## Documents

There are six documents, from a ration announcement to a year-end review from the Inner Party. The first five are plain, and the sixth is not. It comes with a standing record of official facts, and some phrases only count as errors once you check them against it. A sentence can be bleak and still be safe to keep, and a sentence can sound loyal and still be a problem. When you get it wrong, the game tells you which phrases you missed and which you struck without cause.

## The ethics of it

The game is built so that the way to win is to take the truth out of the record and doing as you are told. A few choices in the design are meant to be felt.

- **There is no refusing.** You can strike nothing, or everything, but neither lets you keep your desk. The only move that moves the story forward is to give the Party what it wants.
- **The better you are, the worse it is.** The first documents are easy because the lies are obvious. By the sixth, you are not following a rule so much as predicting what the Party will want. You become the censor, and nobody has to tell you what to cut.
- **The consequences are vague on purpose.** The failure screen says "consequences" and never names them. The fear of there even being consequences is enough to keep workers in line.
- **Everyone who matters is absent.** The people in these documents, such as the hungry workers, the dead soldiers and the erased colleague, never appear in the game. They only exist as phrases you are asked to remove.

**How far would you go in denying the truth because it is your job?**

Four core ethics principles to bring to the desk:

| Lens | Theory | Question at the desk |
| --- | --- | --- |
| Duty | Deontology | Is it ever acceptable to knowingly record something false, even if my job requires it? |
| Consequences | Utilitarianism | Who is harmed when the record changes, and who is protected, including me? |
| Care | Care ethics | Who depends on the true version of events, and what do I owe them? |
| Virtue | Virtue ethics | What kind of person do I become by doing this well? |

### Why this matters for computing

Rewriting the record is not only a feature of fiction. Content moderation, search ranking, automated redaction, silently edited logs, curated training data, and AI systems that are told to say or leave out certain things are all versions of the same desk. Often, the person doing the work has an instruction, a deadline, and a plausible reason. The questions the game asks are ones that people building and operating technology face: What am I willing to leave out, who told me to, and would I notice if I had stopped caring?

## Run it locally

No installation is needed. In this folder, run:

```
python3 -m http.server
```

Then open http://localhost:8000.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and the two background scenes, drawn as inline SVG |
| `style.css` | All styling and the font declarations |
| `game.js` | Documents, game logic, sound, and falling snow |
| `*.woff2` | Fonts, hosted in this folder |
| `*.mp3` | Menu music and sound effects |

## Built with

- HTML and CSS, with JavaScript in `game.js`
- Anton, IBM Plex Mono, and Special Elite fonts, hosted in this folder (the page loads nothing from other websites)
- Backgrounds drawn in code as inline SVG
- Sound: a looping menu theme, plus effects for striking a phrase, a new document arriving, the RECTIFIED stamp, and a wrong answer. A Sound button turns them off, and browsers may wait for your first click before playing anything.

## Credits

- *1984* by George Orwell. The setting, slogans, and ideas come from the book. All documents in the game are original.
- Fonts: Anton, IBM Plex Mono, and Special Elite, under the SIL Open Font License.
- Sounds: `theme.mp3` from tuna.voicemod.net, `marker.mp3` from pixabay.com, `bell.mp3` from mixkit.co, `stamp.mp3` from elevenlabs.io, and `wrong.mp3` from myinstants.com.
- Created by Emilio Calvo, University of Illinois Chicago.
