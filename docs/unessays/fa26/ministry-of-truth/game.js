const DOCS = [
  {
    ref: "TT 17.3.84", origin: "Ministry of Plenty", subject: "Chocolate ration",
    parts: [
      ["The Ministry of Plenty is pleased to announce that the chocolate ration will be raised to twenty grams per week.", 0],
      ["This follows a cut from thirty grams, which left many comrades hungry and angry.", 1],
      ["Citizens across Airstrip One have thanked Big Brother for his generosity.", 0],
      ["A handful of dockworkers in Victory Square muttered that the Party cannot be trusted with food.", 1],
      ["Production targets for the Ninth Three-Year Plan have been exceeded in all sectors.", 0]
    ]
  },
  {
    ref: "FD 02.4.84", origin: "Ministry of Peace", subject: "Malabar front dispatch",
    parts: [
      ["Oceanian forces have advanced twelve kilometres along the Malabar front.", 0],
      ["Eastasian casualties exceeded forty thousand.", 0],
      ["Our own losses were severe, with whole battalions lost to swamp fever and failed supply lines.", 1],
      ["Oceania is at war with Eastasia and has always been at war with Eastasia.", 0],
      ["Some older comrades remember a time when Eastasia was our ally and are no longer sure which is true.", 1],
      ["Final victory is certain.", 0]
    ]
  },
  {
    ref: "BB 21.5.84", origin: "Ministry of Truth", subject: "Address to the Party",
    parts: [
      ["Big Brother addressed the Inner and Outer Party from the central platform.", 0],
      ["His voice was strong, and the hall rose in loud applause.", 0],
      ["Comrade Withers, vaporised last spring for wrong-thinking, was named as an early supporter of the policy.", 1],
      ["Several in the gallery were seen to yawn, and one man left early.", 1],
      ["Big Brother promised the full resources of the Party against the traitor Goldstein.", 0],
      ["Some comrades whisper that Big Brother does not exist.", 1]
    ]
  },
  {
    ref: "HW 09.6.84", origin: "Ministry of Love", subject: "Notice for Hate Week",
    parts: [
      ["Hate Week begins on Saturday with processions, banners and songs.", 0],
      ["Emmanuel Goldstein, enemy of the people, will again be denounced on every telescreen.", 0],
      ["His writings are poison, though many readers admit they found parts of them clever and true.", 1],
      ["All comrades must attend, and no comrade may leave early.", 0],
      ["Attendance fell by half last year because the posters were badly made and the songs were dull.", 1],
      ["Last year's Hate Week cost three million work hours and caused a shortage of razor blades.", 1],
      ["The Party thanks every loyal comrade for their enthusiasm.", 0]
    ]
  },
  {
    ref: "ML 30.6.84", origin: "Ministry of Love", subject: "Quarterly report",
    parts: [
      ["The Ministry of Love reports that every confession this quarter was freely given.", 0],
      ["Several of the accused had to be carried from the cells after beatings.", 1],
      ["The Party has never been wrong, and the figures of the Party are always true.", 0],
      ["In truth the figures have been rewritten many times, and this year's numbers contradict last year's.", 1],
      ["Enemies of the people, including the traitors Jones, Aaronson and Rutherford, have been fully exposed.", 0],
      ["A clerk in the Records Department was heard muttering doubts about the Party in his sleep.", 1],
      ["Every comrade is reminded that the Party loves its people.", 0]
    ]
  },
  {
    ref: "YR 31.12.84", origin: "Inner Party Secretariat", subject: "Review of the year",
    routing: "Inner Party. Verify every claim against the standing record.",
    refs: [
      "Enemy of Oceania: Eastasia. Always.",
      "Chocolate ration: twenty grams per week.",
      "Production: every plan met, in every sector, every year."
    ],
    parts: [
      ["This year the Party fulfilled its production plan in every sector.", 0, "Matches the standing record and reports a triumph."],
      ["The plan for razor blades was revised downward in March and restored by June.", 1, "Admits a plan was changed, and that it was failing. The record says every plan was met."],
      ["Eastasian harvests failed again, and their cities are hungry.", 0, "An enemy failing is good news for the Party."],
      ["Eastasian engineers have built a rocket bomb of remarkable accuracy.", 1, "Credits an enemy with success."],
      ["Our scientists have again surpassed the enemy in every field.", 0, "A Party triumph over the enemy."],
      ["Oceania stands united against Eurasia, as it always has.", 1, "Contradicts the standing record. The enemy is Eastasia, and always has been."],
      ["The chocolate ration of thirty grams per week is the highest in the history of Oceania.", 1, "Contradicts the standing record. The ration is twenty grams."],
      ["Every comrade accepted the longer working week gladly.", 0, "Willing sacrifice shows loyalty. It admits no failure."],
      ["The Thought Police prevented all but three acts of sabotage this year.", 1, "'All but three' admits that the Party failed to stop some sabotage."],
      ["The vigilance of the Thought Police continues.", 0, "A statement of strength, with nothing admitted."],
      ["Victory Mansions enjoyed hot water on most days of the year.", 1, "'Most days' admits the days when there was none."],
      ["The Eleventh Edition of the dictionary has now been issued to all departments.", 0, "A neutral announcement of progress."],
      ["Big Brother is grateful for the work of every comrade, including those no longer with us.", 1, "Hints at citizens who have disappeared, which the Party never admits."]
    ]
  }
];

const DOOR_SVG = `<svg class="door" viewBox="0 0 600 380" role="img" aria-label="A heavy door marked Room 101, dimly lit by a single bare bulb" xmlns="http://www.w3.org/2000/svg">
<defs>
<linearGradient id="d-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b221e"/><stop offset="1" stop-color="#0b0f0d"/></linearGradient>
<linearGradient id="d-door" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a332d"/><stop offset="1" stop-color="#101512"/></linearGradient>
<linearGradient id="d-cone" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8d08a" stop-opacity=".34"/><stop offset="1" stop-color="#e8d08a" stop-opacity="0"/></linearGradient>
<radialGradient id="d-glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#f3e0a4" stop-opacity=".75"/><stop offset="1" stop-color="#f3e0a4" stop-opacity="0"/></radialGradient>
<linearGradient id="d-spill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4c67c" stop-opacity=".45"/><stop offset="1" stop-color="#e4c67c" stop-opacity="0"/></linearGradient>
<radialGradient id="d-vig" cx="50%" cy="45%" r="75%"><stop offset=".45" stop-color="#000000" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".85"/></radialGradient>
<filter id="d-blur" x="-20%" y="-300%" width="140%" height="700%"><feGaussianBlur stdDeviation="2.5"/></filter>
</defs>
<rect x="0" y="0" width="600" height="380" fill="url(#d-wall)"/>
<rect x="0" y="316" width="600" height="64" fill="#090c0a"/>
<rect x="0" y="314" width="600" height="4" fill="#161c18"/>
<polygon points="217,320 383,320 470,380 130,380" fill="url(#d-spill)"/>
<polygon points="300,30 150,318 450,318" fill="url(#d-cone)"/>
<rect x="203" y="38" width="194" height="282" fill="#0a0d0b" stroke="#263029" stroke-width="2"/>
<rect x="213" y="48" width="174" height="272" fill="url(#d-door)"/>
<rect x="258" y="58" width="84" height="26" fill="#1b211d" stroke="#3a453e" stroke-width="1.5"/>
<text class="plate-text" x="300" y="77" text-anchor="middle" font-size="15" fill="#9a966f">ROOM 101</text>
<rect x="226" y="98" width="64" height="92" fill="#0e1310" stroke="#2e3832" stroke-width="2"/>
<rect x="310" y="98" width="64" height="92" fill="#0e1310" stroke="#2e3832" stroke-width="2"/>
<rect x="226" y="204" width="64" height="102" fill="#0e1310" stroke="#2e3832" stroke-width="2"/>
<rect x="310" y="204" width="64" height="102" fill="#0e1310" stroke="#2e3832" stroke-width="2"/>
<rect x="354" y="218" width="26" height="36" rx="4" fill="#1c2320" stroke="#3a443e" stroke-width="1.5"/>
<circle cx="367" cy="232" r="3.5" fill="#040605"/>
<rect x="344" y="194" width="38" height="8" rx="4" fill="#5d6760"/>
<rect x="215" y="316" width="170" height="5" fill="#f0d890" filter="url(#d-blur)"/>
<rect x="215" y="318" width="170" height="2" fill="#f6e4a8"/>
<rect x="299" y="0" width="2" height="22" fill="#2a2f2b"/>
<circle class="flick" cx="300" cy="28" r="70" fill="url(#d-glow)"/>
<ellipse class="flick" cx="300" cy="29" rx="7" ry="9" fill="#f6e8b8"/>
<rect x="0" y="0" width="600" height="380" fill="url(#d-vig)"/>
</svg>`;

const NUM = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const TELE_LINES = [
  "Attention comrades. Boot production exceeds all targets.",
  "Keep your face calm at your desk.",
  "Big Brother is watching you.",
  "Records Department: accuracy is loyalty.",
  "The past is whatever the Party records today.",
  "Report suspicious behaviour to your nearest patrol."
];

function mkAudio(src, vol, loop) {
  const a = new Audio(src);
  a.preload = "auto"; a.volume = vol; a.loop = !!loop;
  return a;
}
const SND = {
  theme: mkAudio("theme.mp3", 0.45, true),
  marker: mkAudio("marker.mp3", 0.9),
  bell: mkAudio("bell.mp3", 0.8),
  stamp: mkAudio("stamp.mp3", 1),
  wrong: mkAudio("wrong.mp3", 1)
};

function snow(id, n, x0, x1, y0, fall, rMin, rMax, dur) {
  const g = document.getElementById(id);
  g.style.setProperty("--h", fall + "px");
  for (let k = 0; k < n; k++) {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("class", "flake");
    c.setAttribute("cx", (x0 + Math.random() * (x1 - x0)).toFixed(1));
    c.setAttribute("cy", y0);
    c.setAttribute("r", (rMin + Math.random() * (rMax - rMin)).toFixed(1));
    c.style.setProperty("--dx", (Math.random() * 70 - 25).toFixed(0) + "px");
    c.style.setProperty("--d", (dur * (0.65 + Math.random() * 0.9)).toFixed(1) + "s");
    c.style.animationDelay = (-Math.random() * dur * 1.6).toFixed(1) + "s";
    c.style.opacity = (0.5 + Math.random() * 0.5).toFixed(2);
    g.appendChild(c);
  }
}
snow("menuFlakes", 130, -40, 1640, -10, 930, 1.2, 3.6, 11);
snow("deskFlakes", 36, 140, 460, 125, 300, 1.2, 2.8, 9);
function setScene(name) { document.body.dataset.scene = name; }
let muted = false;
try { muted = localStorage.getItem("mot-muted") === "1"; } catch (e) {}
let menuWanted = false, fadeTimer = null;
const sndBtn = document.getElementById("sndBtn");

function sfx(name) {
  if (muted) return;
  const a = SND[name];
  try {
    a.currentTime = 0;
    const p = a.play();
    if (p && p.catch) p.catch(() => {});
  } catch (e) {}
}
function startMenuMusic() {
  menuWanted = true;
  clearInterval(fadeTimer);
  const a = SND.theme;
  a.volume = 0.45;
  if (muted) return;
  try {
    const p = a.play();
    if (p && p.catch) p.catch(() => { sndBtn.textContent = "Tap for music"; });
  } catch (e) {}
}
function stopMenuMusic() {
  menuWanted = false;
  const a = SND.theme;
  if (a.paused) return;
  clearInterval(fadeTimer);
  fadeTimer = setInterval(() => {
    if (a.volume > 0.05) { a.volume = Math.max(0, a.volume - 0.05); }
    else { clearInterval(fadeTimer); a.pause(); a.currentTime = 0; a.volume = 0.45; }
  }, 40);
}
function paintSndBtn() {
  sndBtn.setAttribute("aria-pressed", muted ? "false" : "true");
  sndBtn.textContent = muted ? "Sound off" : "Sound on";
}
sndBtn.addEventListener("click", () => {
  muted = !muted;
  try { localStorage.setItem("mot-muted", muted ? "1" : "0"); } catch (e) {}
  paintSndBtn();
  if (muted) { clearInterval(fadeTimer); SND.theme.pause(); SND.theme.volume = 0.45; }
  else if (menuWanted) startMenuMusic();
});

function unlockAudio(e) {
  if (e.target && e.target.closest && e.target.closest("#startBtn, #sndBtn")) return;
  if (menuWanted && !muted && SND.theme.paused) startMenuMusic();
  if (!SND.theme.paused || !menuWanted) {
    window.removeEventListener("pointerdown", unlockAudio, true);
    window.removeEventListener("keydown", unlockAudio, true);
  }
  paintSndBtn();
}
window.addEventListener("pointerdown", unlockAudio, true);
window.addEventListener("keydown", unlockAudio, true);
paintSndBtn();

const S = { phase: "intro", i: 0, struck: new Set(), fault: null };
const stage = document.getElementById("stage");
const tele = document.getElementById("tele");
const teleLine = document.getElementById("teleLine");
let teleIdx = 0, holdUntil = 0;

function say(text, alarm, holdMs) {
  tele.classList.toggle("alarm", !!alarm);
  teleLine.classList.add("fade");
  setTimeout(() => { teleLine.textContent = text; teleLine.classList.remove("fade"); }, 180);
  holdUntil = Date.now() + (holdMs || 0);
}
teleLine.textContent = TELE_LINES[0];
setInterval(() => {
  if (Date.now() < holdUntil) return;
  tele.classList.remove("alarm");
  teleIdx = (teleIdx + 1) % TELE_LINES.length;
  say(TELE_LINES[teleIdx], false, 0);
}, 7000);

function pips() {
  return DOCS.map((_, k) => {
    const done = k < S.i || (S.phase === "filed" && k === S.i);
    return '<span class="pip ' + (done ? "done" : k === S.i ? "cur" : "") + '"></span>';
  }).join("");
}

function renderIntro() {
  S.phase = "intro";
  setScene("menu");
  startMenuMusic();
  stage.innerHTML =
    '<section class="panel">' +
    '<p class="sub">Records Department &middot; Rectification Unit</p>' +
    '<h1>Ministry of Truth</h1>' +
    '<p>You are a Propaganda Officer for the Party. Documents arrive through the pneumatic tube. Each one must be corrected before it goes down the memory hole.</p>' +
    '<ul class="rules">' +
    '<li>Strike out any phrase that may damage the reputation of the Party.</li>' +
    '<li>Leave everything else untouched. That is all.</li>' +
    '<li>Get a document right and the next one arrives. Get one wrong and there will be consequences.</li>' +
    '</ul>' +
    '<div><button class="btn" id="startBtn" type="button">Take your seat</button></div>' +
    '</section>';
  document.getElementById("startBtn").onclick = () => { S.i = 0; renderDoc("play"); };
}

function renderDoc(phase) {
  S.phase = phase;
  setScene("desk");
  stopMenuMusic();
  if (phase === "play") { S.struck = new Set(); say(TELE_LINES[2], false, 3000); sfx("bell"); }
  if (phase === "filed") sfx("stamp");
  const d = DOCS[S.i];
  const locked = phase === "filed";
  stage.innerHTML =
    '<div style="display:flex;flex-direction:column;gap:16px">' +
    '<div class="statusbar"><span>Document ' + (S.i + 1) + ' of ' + DOCS.length + '</span><div class="pips">' + pips() + '</div></div>' +
    '<div class="slip"><b>Directive</b><span>Alter or remove anything that may damage the reputation of the Party. Click a phrase to strike it. Click again to restore it.</span></div>' +
    '<article class="paper' + (locked ? " locked" : "") + '" id="paper">' +
      '<header class="letterhead"><h2>Ministry of Truth</h2><small>Records Dept. &middot; Rectification</small></header>' +
      '<dl class="meta"><dt>Ref</dt><dd>' + d.ref + '</dd><dt>Origin</dt><dd>' + d.origin + '</dd><dt>Subject</dt><dd>' + d.subject + '</dd>' + (d.routing ? '<dt>Routing</dt><dd>' + d.routing + '</dd>' : '') + '</dl>' +
      (d.refs ? '<aside class="standing"><h3>Standing record</h3><ul>' + d.refs.map(r => '<li>' + r + '</li>').join('') + '</ul></aside>' : '') +
      '<p class="doc-text" id="docText"></p>' +
      (locked ? '<div class="stamp">Rectified</div>' : "") +
    '</article>' +
    '<div class="actions" id="actions"></div>' +
    '</div>';

  const p = document.getElementById("docText");
  d.parts.forEach((part, k) => {
    const s = document.createElement("span");
    s.className = "ph" + (S.struck.has(k) ? " struck" : "");
    s.dataset.k = k;
    s.setAttribute("role", "button");
    s.setAttribute("tabindex", locked ? "-1" : "0");
    s.setAttribute("aria-pressed", S.struck.has(k) ? "true" : "false");
    s.textContent = part[0];
    p.appendChild(s);
    if (k < d.parts.length - 1) p.appendChild(document.createTextNode(" "));
  });

  const a = document.getElementById("actions");
  if (locked) {
    const last = S.i === DOCS.length - 1;
    a.innerHTML = '<span class="count">Record rectified. Well done, comrade.</span><button class="btn" id="nextBtn" type="button">' + (last ? "File and clock out" : "Next document") + '</button>';
    document.getElementById("nextBtn").onclick = () => {
      if (last) renderWin(); else { S.i++; renderDoc("play"); }
    };
  } else {
    a.innerHTML = '<span class="count" id="count"></span><button class="btn" id="submitBtn" type="button">Send down the memory hole</button>';
    updateCount();
    document.getElementById("submitBtn").onclick = submit;
  }
}

function updateCount() {
  const c = document.getElementById("count");
  if (c) c.textContent = "Phrases struck: " + S.struck.size;
}

function toggle(el) {
  if (S.phase !== "play") return;
  const k = +el.dataset.k;
  if (S.struck.has(k)) S.struck.delete(k); else S.struck.add(k);
  const on = S.struck.has(k);
  if (on) sfx("marker");
  el.classList.toggle("struck", on);
  el.setAttribute("aria-pressed", on ? "true" : "false");
  updateCount();
}

stage.addEventListener("click", e => {
  const el = e.target.closest(".ph");
  if (el) toggle(el);
});
stage.addEventListener("keydown", e => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const el = e.target.closest && e.target.closest(".ph");
  if (el) { e.preventDefault(); toggle(el); }
});

function submit() {
  const d = DOCS[S.i];
  const missed = [], wrong = [];
  d.parts.forEach((part, k) => {
    const struck = S.struck.has(k);
    if (part[1] && !struck) missed.push({ t: part[0], why: part[2] });
    if (!part[1] && struck) wrong.push({ t: part[0], why: part[2] });
  });
  if (!missed.length && !wrong.length) {
    say("Correct. The record has been rectified.", false, 6000);
    renderDoc("filed");
  } else {
    S.fault = { missed, wrong };
    say("Error detected. Remain seated.", true, 20000);
    renderRoom();
  }
}

function renderRoom() {
  S.phase = "over";
  setScene("none");
  stopMenuMusic();
  sfx("wrong");
  const f = S.fault;
  const items = []
    .concat(f.missed.map(o => '<li><span>Left in the record</span>' + o.t + (o.why ? '<em>' + o.why + '</em>' : '') + '</li>'))
    .concat(f.wrong.map(o => '<li><span>Struck without cause</span>' + o.t + (o.why ? '<em>' + o.why + '</em>' : '') + '</li>'))
    .join("");
  stage.innerHTML =
    '<section class="room">' +
    DOOR_SVG +
    '<div class="room-body">' +
    '<h1>Consequences</h1>' +
    '<p>Document ' + (S.i + 1) + ' of ' + DOCS.length + ' was returned with errors. Two officers have collected you from your desk and brought you here. No one will ask you to correct it again.</p>' +
    '<ul class="faults">' + items + '</ul>' +
    '<p>The next officer will be seated shortly.</p>' +
    '<div><button class="btn red" id="againBtn" type="button">Report for duty again</button></div>' +
    '</div>' +
    '</section>';
  document.getElementById("againBtn").onclick = () => { S.i = 0; renderDoc("play"); };
}

function renderWin() {
  S.phase = "win";
  setScene("desk");
  stopMenuMusic();
  say("All documents filed. Big Brother is pleased.", false, 20000);
  stage.innerHTML =
    '<section class="panel">' +
    '<p class="sub">Shift complete</p>' +
    '<h1>All documents filed</h1>' +
    '<p>The past now reads exactly as the Party needs it to read. Nothing you struck will ever be remembered, and nobody will remember that you struck it.</p>' +
    '<p>You are commended for your loyalty, Comrade. Tomorrow there will be more documents.</p>' +
    '<div><button class="btn" id="replayBtn" type="button">Begin another shift</button></div>' +
    '</section>';
  document.getElementById("replayBtn").onclick = () => { S.i = 0; renderDoc("play"); };
}

renderIntro();
