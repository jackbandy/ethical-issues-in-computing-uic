// ─────────────────────────────────────────────────────────────────────────────
// Visual Seat Shuffle — sends every student to a new table.
//
// THE CONSTRAINTS
//
// A shuffle is only ever shown if it satisfies all of these at once. When they
// can't all be met, the tool says so (⚠️ in the header) rather than quietly
// breaking one. See generateAssignment() for how they are solved.
//
//   1. Nobody stays put, except a seat marked to stay.
//      A seat's destination is never its own table — unless it is a staying
//      seat (rule 7), which keeps its own table by design.
//
//   2. Tablemates split up.
//      The occupied seats at one table all go to different destinations, so no
//      two people travel together.
//
//   3. No lonely tables.
//      A table that has anyone — a staying student or an incoming one — has at
//      least MIN_PER_TABLE people in all. One or two people isn't a discussion.
//
//   4. Nobody stands.
//      A table holds at most SEATS_PER_TABLE students — it has that many chairs
//      whether or not anyone is sitting in them today.
//
//   5. No wasted tables.
//      As many tables are used as rules 1–4 allow. A table only goes empty
//      when there genuinely aren't enough students to fill it.
//
//   6. Absent seats sit out.
//      A seat marked absent (👻) is a student who isn't here. It gets no
//      destination and sends nobody. The chair still counts toward rule 4,
//      because the chair is still there.
//
//   7. Staying seats stay put.
//      A seat marked to stay (⚓️) is a student who keeps their chair through
//      the shuffle (an accommodation). They hold their chair and count toward rule 3's head count, and on screen they land on their own table number like any other seat, so the chart doesn't single them out.
//
//   8. Empty tables still receive students.
//      A table with every seat absent is not out of the room; its chairs are
//      still there, so the shuffle may still send students to it.
//
//   9. Reproducible.
//      The same seed with the same seat states always produces the same
//      assignment. Changing either changes the result.
//
//  10. The lectern joins only when clicked.
//      A clicked lectern is one more student, sent to a table like everyone
//      else. Nobody is ever sent to the lectern.
//
// Rules 2 and 3 are the ones that fight each other: a table of four splits four
// ways, and those four destinations need 4 × MIN_PER_TABLE students between
// them. A small room can therefore be genuinely impossible to shuffle.
// ─────────────────────────────────────────────────────────────────────────────

// CTA line colors assigned to groups 1–8
const CTA_COLORS = [
  '#c60c30', // 1 Red
  '#00a1de', // 2 Blue
  '#62361b', // 3 Brown
  '#009b3a', // 4 Green
  '#f47920', // 5 Orange (shifted from red-orange toward true orange)
  '#e27ea6', // 6 Pink
  '#522398', // 7 Purple
  '#f9e300', // 8 Yellow
];

// Table background colors — vivid, each paired with white or dark text for
// contrast (blue, pink, and yellow take dark text; see paintSeat).
const CTA_TABLE_COLORS = [
  '#c60c30', // 1 Red
  '#00a1de', // 2 Blue
  '#62361b', // 3 Brown
  '#009b3a', // 4 Green
  '#e06000', // 5 Orange (dark enough for white text, clearly orange not red)
  '#e27ea6', // 6 Pink
  '#522398', // 7 Purple
  '#dcc800', // 8 Yellow (between golden and bright CTA yellow)
];

// Destination marker (pill) geometry — lifted above the table's top edge so it
// clears the "TABLE N" label instead of sitting on top of it.
const PILL_R    = 8;
const PILL_LIFT = 8;

// Seat marker for circle day's ring of chairs: a colored dot on a white halo.
const DOT_RING_R = 13;
const DOT_R      = 8.5;

// Reveal pacing: seats land one at a time, SETTLE_GAP_MS apart, so the room fills in one route at a time instead of all at once.
const SETTLE_FIRST_MS = 2000; // first seat lands this long after Shuffle
const SETTLE_GAP_MS   = 250;
const SETTLE_DECEL_MS = 1500; // a seat's numbers slow down over this long before it lands
const PATH_DRAW_MS    = 600;

// Grid positions (row, col) for tables in DOM order: t1…t8, then the lectern
const TABLE_GRID = [
  {row:0, col:1}, {row:0, col:2},
  {row:1, col:0}, {row:1, col:1}, {row:1, col:2},
  {row:2, col:0}, {row:2, col:1}, {row:2, col:2},
  {row:0, col:0}, // TABLE_GRID[LECTERN]
];

// Room shape.
const NUM_TABLES      = 8;
const SEATS_PER_TABLE = 4;
const NUM_SEATS       = NUM_TABLES * SEATS_PER_TABLE;

// The lectern seats one more student when clicked. It sends that student like a table of one but never receives anyone.
const LECTERN      = NUM_TABLES;     // its index among sources (tables 0–7, then the lectern)
const NUM_SOURCES  = NUM_TABLES + 1;
const LECTERN_SEAT = NUM_SEATS;      // its index in an assignment (table seats 0–31, then the lectern)
const LECTERN_TILT = -10;            // degrees; matches .lectern's rotate(-10deg) in the CSS
let lecternActive  = false;

// A table either holds nobody or holds at least this many students —
// one or two people isn't a table discussion.
const MIN_PER_TABLE = 3;

// Each seat is in one of three states, cycled by clicking it:
//   RANDOM (🎲) — a student who takes part in the shuffle and gets a new table.
//   ABSENT (👻) — no student today; the chair is still there but sends nobody.
//   STAYS  (⚓️) — a student who keeps their own chair through the shuffle.
const STATE_RANDOM = 0;
const STATE_ABSENT = 1;
const STATE_STAYS  = 2;

// Seat states, indexed ti * SEATS_PER_TABLE + si.
const seatState = new Array(NUM_SEATS).fill(STATE_RANDOM);

// Last computed assignment; used by drawOverlay so it does not rely on live DOM text. Each entry is a destination table number (1–8), or null for an absent seat or a lectern left out; a staying seat's entry is its own table.
let currentAssignment = null;

// Seats whose number has landed in the current shuffle. Only these show their color and route, so a redraw mid-shuffle (resize, checkbox) doesn't give away seats still spinning.
const settledSeats = new Array(NUM_SEATS + 1).fill(false);

// Route elements from the last drawOverlay, keyed by seat index, so revealSeat can draw one route as its seat lands.
let overlayRoutes = {};

// Incremented on each shuffle to cancel in-flight animations from prior shuffles.
let shuffleToken = 0;

// Seats remaining before animation is fully complete (used for status indicator).
let pendingSeats = 0;

// Timeout ID for auto-clearing the ✅ status after 5 s.
let statusClearTimeout = null;

// ── Status helpers ────────────────────────────────────────────────────────────

function setStatusDone() {
  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  const el = document.getElementById('shuffle-status');
  el.className = 'status-done';
  statusClearTimeout = setTimeout(() => {
    el.className = '';
    statusClearTimeout = null;
  }, 5000);
}

// Remove SVG paths and destination colors; also clears the status indicator.
function clearLines() {
  resetCircle();
  const svg = document.getElementById('lines-svg');
  if (svg) svg.remove();
  overlayRoutes = {};
  clearDestColors();
  if (statusClearTimeout) { clearTimeout(statusClearTimeout); statusClearTimeout = null; }
  document.getElementById('shuffle-status').className = '';
}

// ── PRNG ──────────────────────────────────────────────────────────────────────

function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function fisherYates(arr, rand) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

// ── Constrained assignment ────────────────────────────────────────────────────
// Every random seat is sent to a table other than its own, the random seats at
// any one table all go to different destinations, and any table that has anyone
// (a staying student or an incoming one) holds at least MIN_PER_TABLE people in
// all and never more than its SEATS_PER_TABLE chairs. As many tables are used
// as those rules allow, so a table only goes empty when there genuinely aren't
// enough students to fill it.
//
// Same seed + same seat states always produces the same result.

function generateAssignment(seed) {
  // Random (shuffling) and staying students per table.
  const movable = [];
  const stays = [];
  for (let t = 0; t < NUM_TABLES; t++) {
    let m = 0, st = 0;
    for (let s = 0; s < SEATS_PER_TABLE; s++) {
      const state = seatState[t * SEATS_PER_TABLE + s];
      if (state === STATE_RANDOM) m++;
      else if (state === STATE_STAYS) st++;
    }
    movable.push(m);
    stays.push(st);
  }
  movable.push(lecternActive ? 1 : 0); // movable[LECTERN]
  stays.push(0);

  // Only the random students shuffle; the staying students are already seated.
  const total = movable.reduce((a, b) => a + b, 0);

  if (total === 0) {
    return { ok: false, reason: 'Every seat is absent or marked to stay — nothing to shuffle.' };
  }

  const rand = mulberry32(seedFor(seed));

  // Try each workable set of destination tables, the fullest room first.
  for (const dests of candidateDestinations(movable, stays, total, rand)) {
    for (let attempt = 0; attempt < 40; attempt++) {
      const incoming = distribute(dests, total, stays, rand);
      if (!incoming) break;
      const sets = solveRouting(movable, dests, incoming);
      if (!sets) continue;
      diversify(sets, movable, rand);
      return { ok: true, assignment: layOutSeats(sets, rand) };
    }
  }

  // Only a clicked lectern can bring more shufflers than there are chairs left
  // once the staying students are seated.
  const staysTotal = stays.reduce((a, b) => a + b, 0);
  const chairs     = NUM_TABLES * SEATS_PER_TABLE - staysTotal;
  // Marking a student to stay takes away a shuffler and a chair together, so it never helps here.
  if (total > chairs) {
    const seated = staysTotal ? ` once ${staysTotal} staying student${staysTotal === 1 ? ' is' : 's are'} seated` : '';
    return {
      ok: false,
      reason: `${total} students to shuffle and only ${chairs} chair${chairs === 1 ? '' : 's'}${seated}. If a seat is empty, mark it absent; otherwise click the lectern to take it back out.`,
    };
  }
  // No advice here: marking a present student absent would free their chair for someone else, and marking one to stay rarely helps.
  return {
    ok: false,
    reason: `No arrangement sends ${total} student${total === 1 ? '' : 's'} to new tables with tablemates split up and ${MIN_PER_TABLE}+ people at every table in use.`,
  };
}

// Mix the seat-state pattern into the seed, so the same seed number with a
// different set of absences and staying seats is a different (but still
// reproducible) shuffle.
function seedFor(seed) {
  let h = Math.imul(seed | 0, 0x9E3779B1) | 0;
  for (let i = 0; i < NUM_SEATS; i++) {
    const state = seatState[i];
    if (state !== STATE_RANDOM) h = Math.imul(h ^ ((i + 1) * (state + 1)), 0x85EBCA6B) | 0;
  }
  if (lecternActive) h = Math.imul(h ^ (LECTERN_SEAT + 1), 0x85EBCA6B) | 0;
  return h;
}

// Every set of destination tables that could work, ordered by size — largest
// first, because we want as few empty tables as possible. Ties are broken by
// the seeded PRNG, so the choice varies between seeds but stays reproducible.
//
// A table with a staying student is always in use, so it is always in the set;
// its other chairs may still take incoming students. A table with no staying
// student may stay empty or be filled. Either way, an absent seat marks a
// student who isn't here, not a chair that has been taken away, so a table
// still seats SEATS_PER_TABLE in all.
function candidateDestinations(movable, stays, total, rand) {
  const mandatory = [];
  const optional  = [];
  for (let t = 0; t < NUM_TABLES; t++) (stays[t] > 0 ? mandatory : optional).push(t);

  const out = [];
  for (let mask = 0; mask < (1 << optional.length); mask++) {
    const dests = mandatory.concat(optional.filter((_, i) => mask & (1 << i)));

    // Every destination must reach MIN_PER_TABLE people in all (staying
    // students already there count)...
    const minIn = dests.reduce((a, t) => a + Math.max(0, MIN_PER_TABLE - stays[t]), 0);
    if (minIn > total) continue;
    // ...and hold no more than its chairs.
    const maxIn = dests.reduce((a, t) => a + (SEATS_PER_TABLE - stays[t]), 0);
    if (maxIn < total) continue;
    // Each table's random students split up, so it needs that many destinations
    // with a free chair open to it — its own table doesn't count.
    const openFor = s => dests.filter(t => t !== s && stays[t] < SEATS_PER_TABLE).length;
    if (movable.some((m, s) => m > openFor(s))) continue;

    out.push({ dests, key: rand() });
  }

  out.sort((a, b) => b.dests.length - a.dests.length || a.key - b.key);
  return out.map(o => o.dests);
}

// Split `total` shuffling students across the destination tables: each is
// topped up to MIN_PER_TABLE people in all (counting staying students already
// there), then the remainder is handed out at random among tables with a chair
// left.
function distribute(dests, total, stays, rand) {
  const incoming = {};
  dests.forEach(t => { incoming[t] = Math.max(0, MIN_PER_TABLE - stays[t]); });

  for (let left = total - dests.reduce((a, t) => a + incoming[t], 0); left > 0; left--) {
    const room = dests.filter(t => incoming[t] < SEATS_PER_TABLE - stays[t]);
    if (!room.length) return null;
    incoming[room[Math.floor(rand() * room.length)]]++;
  }
  return incoming;
}

// Max-flow on a tiny network: each source table supplies its shuffling students
// (staying students never leave), each destination table demands `incoming[t]`,
// and every source→destination arc has capacity 1, which is what forces a
// table's students to split up. A flow that saturates the supply is a valid
// routing; anything less means this particular split can't be seated.
//
// Returns one Set of destination tables per source (the tables, then the
// lectern), or null.
function solveRouting(movable, dests, incoming) {
  const SRC = 0;
  const SNK = NUM_SOURCES + NUM_TABLES + 1;
  const n   = SNK + 1;
  const dst = t => NUM_SOURCES + 1 + t;

  const res = Array.from({ length: n }, () => new Array(n).fill(0));

  let supply = 0;
  for (let s = 0; s < NUM_SOURCES; s++) {
    if (!movable[s]) continue;
    res[SRC][s + 1] = movable[s];
    supply += movable[s];
    dests.forEach(t => { if (t !== s) res[s + 1][dst(t)] = 1; });
  }
  dests.forEach(t => { res[dst(t)][SNK] = incoming[t]; });

  // Edmonds–Karp.
  let flow = 0;
  for (;;) {
    const prev = new Array(n).fill(-1);
    prev[SRC] = SRC;
    const queue = [SRC];
    while (queue.length && prev[SNK] === -1) {
      const u = queue.shift();
      for (let v = 0; v < n; v++) {
        if (prev[v] === -1 && res[u][v] > 0) { prev[v] = u; queue.push(v); }
      }
    }
    if (prev[SNK] === -1) break;

    let bottleneck = Infinity;
    for (let v = SNK; v !== SRC; v = prev[v]) bottleneck = Math.min(bottleneck, res[prev[v]][v]);
    for (let v = SNK; v !== SRC; v = prev[v]) {
      res[prev[v]][v] -= bottleneck;
      res[v][prev[v]] += bottleneck;
    }
    flow += bottleneck;
  }

  if (flow !== supply) return null;

  // A unit-capacity arc with no residual left is an arc that carried a student.
  const sets = Array.from({ length: NUM_SOURCES }, () => new Set());
  for (let s = 0; s < NUM_SOURCES; s++) {
    if (!movable[s]) continue;
    dests.forEach(t => { if (t !== s && res[s + 1][dst(t)] === 0) sets[s].add(t); });
  }
  return sets;
}

// Walk the solution to a random point in the space of valid solutions. Trading
// one destination between two source tables leaves every constraint intact:
// both tables keep the same number of distinct destinations, neither picks up
// its own table, and both destinations keep the same head count.
function diversify(sets, movable, rand) {
  const live = [];
  for (let t = 0; t < NUM_SOURCES; t++) if (movable[t] > 0) live.push(t);
  if (live.length < 2) return;

  for (let i = 0; i < 400; i++) {
    const s1 = live[Math.floor(rand() * live.length)];
    const s2 = live[Math.floor(rand() * live.length)];
    if (s1 === s2) continue;

    const from1 = [...sets[s1]].filter(d => d !== s2 && !sets[s2].has(d));
    const from2 = [...sets[s2]].filter(d => d !== s1 && !sets[s1].has(d));
    if (!from1.length || !from2.length) continue;

    const d1 = from1[Math.floor(rand() * from1.length)];
    const d2 = from2[Math.floor(rand() * from2.length)];
    sets[s1].delete(d1); sets[s1].add(d2);
    sets[s2].delete(d2); sets[s2].add(d1);
  }
}

// Drop each table's destinations onto its random seats in random order. A staying seat gets its own table, so it lands like any other seat; an absent seat gets null.
function layOutSeats(sets, rand) {
  const assignment = new Array(NUM_SEATS + 1).fill(null);
  for (let t = 0; t < NUM_TABLES; t++) {
    const dests = [...sets[t]].map(d => d + 1);
    fisherYates(dests, rand);
    let k = 0;
    for (let s = 0; s < SEATS_PER_TABLE; s++) {
      const i = t * SEATS_PER_TABLE + s;
      if (seatState[i] === STATE_RANDOM) assignment[i] = dests[k++];
      else if (seatState[i] === STATE_STAYS) assignment[i] = t + 1;
    }
  }
  if (sets[LECTERN].size) assignment[LECTERN_SEAT] = [...sets[LECTERN]][0] + 1;
  return assignment;
}

// ── DOM helpers ───────────────────────────────────────────────────────────────

function centerOf(el, ref) {
  const r = el.getBoundingClientRect();
  return {
    x:      r.left - ref.left + r.width  / 2,
    y:      r.top  - ref.top  + r.height / 2,
    top:    r.top    - ref.top,
    bottom: r.bottom - ref.top,
  };
}

// ── Seat spinner animation ────────────────────────────────────────────────────
// Each seat gets its own random spin + deceleration duration (2–4.5 s total).
// pool: the table numbers worth flashing during the spin.
// token: invalidated if the user clicks Shuffle again before this seat finishes.
// onDone: called once the seat has settled on its final value.

// settleMs: when the seat lands, counted from now; it spins until SETTLE_DECEL_MS before that, then slows down.
function animateSeat(seatEl, finalValue, pool, token, onDone, settleMs) {
  const spinMs = settleMs - SETTLE_DECEL_MS;
  const flash  = () => pool[Math.floor(Math.random() * pool.length)];

  seatEl.style.color = 'rgba(255,255,255,0.30)';

  const spinInterval = setInterval(() => {
    if (shuffleToken !== token) { clearInterval(spinInterval); return; }
    seatEl.textContent = flash();
  }, 70);

  setTimeout(() => {
    clearInterval(spinInterval);
    if (shuffleToken !== token) return;

    // Build a deceleration schedule over the remaining time.
    // t² spacing: gaps START small and GROW → updates slow down naturally.
    const decelMs  = SETTLE_DECEL_MS;
    const numSteps = 9;
    const schedule = Array.from({length: numSteps + 1}, (_, i) => {
      const t = i / numSteps;
      return Math.round(decelMs * t * t);
    });

    schedule.forEach((delay, i) => {
      setTimeout(() => {
        if (shuffleToken !== token) return;
        if (i === schedule.length - 1) {
          seatEl.textContent = finalValue;
          seatEl.style.color = ''; // restore full-white
          onDone();
        } else {
          seatEl.textContent = flash();
        }
      }, delay);
    });
  }, spinMs);
}

// ── Draw overlay ──────────────────────────────────────────────────────────────
// Two independent layers, each with its own checkbox:
//
//   Colors — a landed seat is filled with the color of the table it is heading
//            to, and that table's "TABLE N" header band takes the same color,
//            so a student matches their seat to a header. Tables stay gray.
//   Paths  — the routed lines, and the pill each route arrives in.
//
// drawOverlay lays out the whole room but shows only seats that have already
// landed; revealSeat shows the rest one at a time as they land.

function showColors() { return document.getElementById('colors-cb').checked; }
function showPaths()  { return document.getElementById('paths-cb').checked; }
function lecternPOV() { return document.getElementById('pov-cb').checked; }

// Where each assignment index shows its number: the 32 table seats, then the lectern's.
function seatEls() {
  return [...document.querySelectorAll('.seat'), document.querySelector('.lectern-seat')];
}

// Destination number in the middle of the seat. With Paths off there is no
// line to follow, so a small arrow beside the number points at the
// destination table's center instead.
function labelSeat(i) {
  const dest = currentAssignment[i];
  const seat = seatEls()[i];
  seat.textContent = dest;
  if (showPaths() || seatState[i] === STATE_STAYS) return; // a staying seat's table is its own: nothing to point at

  const table = document.querySelectorAll('.table')[dest - 1];
  const dx = (table.offsetLeft + table.offsetWidth  / 2) - (seat.offsetLeft + seat.offsetWidth  / 2);
  const dy = (table.offsetTop  + table.offsetHeight / 2) - (seat.offsetTop  + seat.offsetHeight / 2);
  // Under Lectern POV the room is turned 180° but the seat's contents are turned back upright, so the arrow turns too.
  // The lectern's number also rides its tilt, which the arrow has to undo.
  const tilt  = i === LECTERN_SEAT ? LECTERN_TILT : 0;
  const angle = Math.atan2(dy, dx) * 180 / Math.PI + (lecternPOV() ? 180 : 0) - tilt;
  const arrow = document.createElement('span');
  arrow.className = 'seat-arrow';
  arrow.style.setProperty('--angle', `${angle}deg`);
  seat.appendChild(arrow);
}

function relabelSeats() {
  if (circleShown) return;
  settledSeats.forEach((settled, i) => { if (settled) labelSeat(i); });
}

// Lectern POV flips the room over like a card: it turns edge-on, the room is
// turned around while it can't be seen, then it turns face-up again.
const POV_FLIP_MS = 700;
let povFlip = null;

async function flipRoom() {
  const done = () => { fitRoom(); relabelSeats(); };
  if (povFlip) povFlip.cancel();
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { done(); return; }

  // Flip about the diagonal from top right to bottom left, so the lectern corner swings across to the opposite corner.
  const wrapper = document.getElementById('room-scale');
  const axis = `${wrapper.offsetWidth}, ${-wrapper.offsetHeight}, 0`;
  const turn = (from, to, easing) => wrapper.animate(
    [{ transform: `perspective(1600px) rotate3d(${axis}, ${from}deg)` }, { transform: `perspective(1600px) rotate3d(${axis}, ${to}deg)` }],
    { duration: POV_FLIP_MS / 2, easing, fill: 'forwards' });

  const firstHalf = povFlip = turn(0, 90, 'ease-in');
  try { await firstHalf.finished; } catch { return; } // cancelled by a newer toggle, which takes over
  done();
  firstHalf.cancel();
  povFlip = turn(-90, 0, 'ease-out');
}

function clearDestColors() {
  document.querySelectorAll('.dest').forEach(el => el.classList.remove('dest'));
}

// Fill a seat (the whole lectern, for its student), and the header band of the table it is heading to, with that table's color.
function paintSeat(i) {
  const dest   = currentAssignment[i];
  const tables = document.querySelectorAll('.table');
  const seat   = i === LECTERN_SEAT ? document.querySelector('.lectern') : seatEls()[i];
  [seat, tables[dest - 1].querySelector('.table-num')].forEach(el => {
    el.classList.add('dest');
    el.style.setProperty('--dest-bg', CTA_TABLE_COLORS[dest - 1]);
    el.style.setProperty('--dest-fg', (dest === 8 || dest === 2 || dest === 6) ? '#222' : '#fff'); // dark text on yellow, blue, and pink — white fails contrast there
  });
}

// A seat's number has landed: color it and draw its route.
function revealSeat(i) {
  settledSeats[i] = true;
  labelSeat(i);
  if (showColors()) paintSeat(i);
  const route = overlayRoutes[i];
  if (!route) return;
  route.pill.style.visibility = '';
  route.els.forEach(el => {
    el.style.transition       = `stroke-dashoffset ${PATH_DRAW_MS}ms ease`;
    el.style.strokeDashoffset = '0';
  });
}

function drawOverlay() {
  if (circleShown) return; // the circle-day ring owns the room (see circle-day.js)

  const existing = document.getElementById('lines-svg');
  if (existing) existing.remove();
  overlayRoutes = {};
  clearDestColors();

  if (!currentAssignment) return;
  if (showColors()) settledSeats.forEach((settled, i) => { if (settled) paintSeat(i); });
  if (!showPaths()) return;

  const tables = Array.from(document.querySelectorAll('.table'));

  const room = document.querySelector('.room');

  // The SVG overlay is a child of .room, so it draws in .room's pre-transform
  // (local) space. Layout offsets are already in that space, unlike on-screen
  // rects, which bake in the scale and the Lectern POV turn. .room is the
  // offsetParent of every table and seat (nothing positioned in between).
  const localRect = el => {
    const left = el.offsetLeft, right  = left + el.offsetWidth;
    const top  = el.offsetTop,  bottom = top  + el.offsetHeight;
    return { left, right, top, bottom, midX: (left+right)/2, midY: (top+bottom)/2 };
  };

  // Full rect for each table (room-relative, in SVG-local units)
  const tRects = tables.map(localRect);
  tRects[LECTERN] = localRect(document.querySelector('.lectern')); // a source only, never a destination

  // Individual seat centers (room-relative, in SVG-local units)
  const seatCenters = tables.map(t =>
    Array.from(t.querySelectorAll('.seat')).map(s => {
      const r = localRect(s);
      return [r.midX, r.midY];
    })
  );

  // Vertical aisle x-positions (col0 = ti 2,5 | col1 = ti 0,3,6 | col2 = ti 1,4,7)
  const aisleX_L  = tRects[2].left  - 30;
  const aisleX_01 = (tRects[2].right  + tRects[0].left)  / 2;
  const aisleX_12 = (tRects[0].right  + tRects[1].left)  / 2;
  const aisleX_R  = tRects[1].right  + 30;

  // Horizontal aisle y-positions
  const aisleY_01 = (Math.max(tRects[0].bottom, tRects[1].bottom) +
                     Math.min(tRects[2].top, tRects[3].top, tRects[4].top)) / 2;
  const aisleY_12 = (Math.max(tRects[2].bottom, tRects[3].bottom, tRects[4].bottom) +
                     Math.min(tRects[5].top, tRects[6].top, tRects[7].top)) / 2;

  // Virtual aisle above row 0 — approach lane for row-0 destinations
  const aisleY_top = Math.min(tRects[0].top, tRects[1].top) - 30;

  const aisles = { aisleX_L, aisleX_01, aisleX_12, aisleX_R, aisleY_01, aisleY_12, aisleY_top };

  // HSEP: horizontal spread for multiple routes entering the same destination top
  const HSEP = 14;

  // Pass 1: collect raw route metadata
  const rawRoutes = [];
  for (let ti = 0; ti < 8; ti++) {
    const { col } = TABLE_GRID[ti];
    for (let si = 0; si < SEATS_PER_TABLE; si++) {
      const group    = currentAssignment[ti * SEATS_PER_TABLE + si];
      if (group === null) continue;   // absent seat, nobody here
      if (ti === group - 1) continue; // staying seat, no route to draw
      const dti      = group - 1;
      const exitLeft = (si % 2 === 0);
      const exitY    = seatCenters[ti][si][1]; // seat y-center
      const vAisle   = exitLeft ? leftOf(col, aisles) : rightOf(col, aisles);
      rawRoutes.push({ i: ti * SEATS_PER_TABLE + si, ti, group, dti, exitY, exitLeft, vAisle });
    }
  }

  // The lectern's student leaves by its right side, into the aisle beside Table 1.
  const lecternGroup = currentAssignment[LECTERN_SEAT];
  if (lecternGroup !== null) {
    rawRoutes.push({
      i: LECTERN_SEAT, ti: LECTERN, group: lecternGroup, dti: lecternGroup - 1,
      exitY: tRects[LECTERN].midY, exitLeft: false, vAisle: rightOf(TABLE_GRID[LECTERN].col, aisles),
    });
  }

  // Spread exitY for routes sharing the same V-aisle at the same natural y-level,
  // so no two horizontal exit segments ever overlap.
  const VSEP = 7;
  const byVAisleY = {};
  rawRoutes.forEach((r, ri) => {
    const key = `${r.vAisle.toFixed(1)}_${r.exitY.toFixed(1)}`;
    if (!byVAisleY[key]) byVAisleY[key] = [];
    byVAisleY[key].push(ri);
  });
  Object.values(byVAisleY).forEach(grp => {
    if (grp.length < 2) return;
    grp.sort((a, b) => rawRoutes[a].group - rawRoutes[b].group);
    grp.forEach((ri, i) => { rawRoutes[ri].exitY += (i - (grp.length - 1) / 2) * VSEP; });
  });

  // Pass 2: spread entry x-positions horizontally at each destination's top edge
  const byDest = Array.from({ length: 8 }, () => []);
  rawRoutes.forEach((r, ri) => byDest[r.dti].push({ ri, group: r.group }));
  const entryXArr = rawRoutes.map(r => tRects[r.dti].midX);
  byDest.forEach((arr) => {
    if (arr.length < 2) return;
    arr.sort((a, b) => a.group - b.group);
    arr.forEach((item, i) => {
      entryXArr[item.ri] = tRects[rawRoutes[item.ri].dti].midX + (i - (arr.length - 1) / 2) * HSEP;
    });
  });

  // Pass 3: build full routes — start on outer table edge, first segment horizontal
  const routes = rawRoutes.map(({ i, ti, group, dti, exitY, exitLeft }, ri) => {
    const entryX = entryXArr[ri];
    const pts    = computeRoute(ti, dti, tRects, aisles, exitY, entryX, exitLeft);
    return { i, ti, group, dti, pts };
  });

  // Offset lines sharing an aisle so they run as adjacent parallel tracks
  applyParallelOffsets(routes, aisles);

  // The parallel-lane offset above can push a route's approach-aisle segment
  // as low as (or lower than) its own destination pill when many routes share
  // an aisle — which would make the final segment climb into the pill from
  // below instead of dropping into it from above. Re-clamp the last "lane"
  // waypoint (and its horizontal partner) so the final descent always has a
  // safe, strictly-downward run into the pill's top.
  clampApproachDescents(routes);

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.id = 'lines-svg';
  Object.assign(svg.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible',
  });
  room.appendChild(svg);

  // Collect SVG elements grouped by layer
  const outlineElems = [];
  const lineElems    = [];

  routes.forEach(({ group, pts }) => {
    const color     = CTA_COLORS[group - 1];
    const pointsStr = pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');

    const outline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    outline.setAttribute('points', pointsStr);
    outline.setAttribute('stroke', 'white');
    outline.setAttribute('stroke-width', '8');
    outline.setAttribute('fill', 'none');
    outline.setAttribute('stroke-linecap', 'round');
    outline.setAttribute('stroke-linejoin', 'round');
    outlineElems.push(outline);

    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', pointsStr);
    line.setAttribute('stroke', color);
    line.setAttribute('stroke-width', '4.5');
    line.setAttribute('fill', 'none');
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('stroke-linejoin', 'round');
    lineElems.push(line);
  });

  // One horizontal pill per destination table, lifted clear of the table label.
  const pillGroups = {};
  routes.forEach(({ dti, pts }) => {
    const [ex] = pts[pts.length - 1]; // entryX at the pill's top edge
    if (!pillGroups[dti]) pillGroups[dti] = { top: tRects[dti].top - PILL_LIFT, exs: [] };
    pillGroups[dti].exs.push(ex);
  });
  const pills = {};
  Object.entries(pillGroups).forEach(([dti, { top, exs }]) => {
    const minX = Math.min(...exs) - PILL_R;
    const maxX = Math.max(...exs) + PILL_R;
    const pill = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    pill.setAttribute('x',      minX.toFixed(1));
    pill.setAttribute('y',      (top - PILL_R).toFixed(1));
    pill.setAttribute('width',  (maxX - minX).toFixed(1));
    pill.setAttribute('height', (2 * PILL_R).toString());
    pill.setAttribute('rx',     PILL_R.toString());
    pill.setAttribute('ry',     PILL_R.toString());
    pill.setAttribute('fill',   'white');
    pill.setAttribute('stroke', '#555');
    pill.setAttribute('stroke-width', '2');
    pill.style.visibility = 'hidden'; // until the first route into it is drawn
    pills[dti] = pill;
  });

  // Z-order: outlines → colored lines → pills
  outlineElems.forEach(el => svg.appendChild(el));
  lineElems.forEach(el => svg.appendChild(el));
  Object.values(pills).forEach(el => svg.appendChild(el));

  // Landed seats show their route whole; the rest start undrawn for revealSeat.
  // getTotalLength needs the elements in the DOM, hence after the appends.
  routes.forEach(({ i, dti }, ri) => {
    const els = [outlineElems[ri], lineElems[ri]];
    const len = lineElems[ri].getTotalLength();
    els.forEach(el => {
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = settledSeats[i] ? 0 : len;
    });
    if (settledSeats[i]) pills[dti].style.visibility = '';
    overlayRoutes[i] = { els, pill: pills[dti] };
  });
}

// Offset lines sharing the same aisle so they run as adjacent parallel tracks.
// Works by shifting aisle-coordinate points perpendicularly by (rank - mid) * STRIDE.
function applyParallelOffsets(routes, aisles) {
  const STRIDE = 7;
  const TOL    = 2;
  const { aisleX_L, aisleX_01, aisleX_12, aisleX_R, aisleY_01, aisleY_12, aisleY_top } = aisles;
  const vAs = [aisleX_L, aisleX_01, aisleX_12, aisleX_R];
  const hAs = [aisleY_01, aisleY_12, aisleY_top];

  // Find which routes touch each aisle (by having a waypoint on it)
  const vUsers = vAs.map(() => []);
  const hUsers = hAs.map(() => []);
  routes.forEach((route, ri) => {
    const seenV = new Set(), seenH = new Set();
    route.pts.forEach(([x, y]) => {
      vAs.forEach((ax, ai) => {
        if (Math.abs(x - ax) < TOL && !seenV.has(ai)) {
          seenV.add(ai);
          vUsers[ai].push({ ri, group: route.group });
        }
      });
      hAs.forEach((ay, hi) => {
        if (Math.abs(y - ay) < TOL && !seenH.has(hi)) {
          seenH.add(hi);
          hUsers[hi].push({ ri, group: route.group });
        }
      });
    });
  });

  // Assign perpendicular offsets, sorted by group for determinism
  const vAO = routes.map(() => vAs.map(() => 0));
  const hAO = routes.map(() => hAs.map(() => 0));
  vAs.forEach((_, ai) => {
    const u = vUsers[ai]; if (u.length < 2) return;
    u.sort((a, b) => a.group - b.group);
    u.forEach((item, i) => { vAO[item.ri][ai] = (i - (u.length - 1) / 2) * STRIDE; });
  });
  hAs.forEach((_, hi) => {
    const u = hUsers[hi]; if (u.length < 2) return;
    u.sort((a, b) => a.group - b.group);
    u.forEach((item, i) => { hAO[item.ri][hi] = (i - (u.length - 1) / 2) * STRIDE; });
  });

  // Apply: shift each waypoint that sits on an aisle coordinate
  routes.forEach((route, ri) => {
    route.pts = route.pts.map(([x, y]) => {
      let nx = x, ny = y;
      vAs.forEach((ax, ai) => { if (Math.abs(x - ax) < TOL) nx = ax + vAO[ri][ai]; });
      hAs.forEach((ay, hi) => { if (Math.abs(y - ay) < TOL) ny = ay + hAO[ri][hi]; });
      return [nx, ny];
    });
  });
}

// Guarantee the final approach-to-pill segment always descends. Each route's
// points are [exit, vAisle@exitY, vAisle@approach, entry@approach, entry@pillTop];
// the parallel-lane offset above can push the "@approach" pair as low as (or
// below) pillTop when many routes share that aisle, so clamp both to stay a
// fixed margin above it.
function clampApproachDescents(routes) {
  const MIN_GAP = 6;
  routes.forEach(({ pts }) => {
    const n = pts.length;
    const pillY = pts[n - 1][1];
    const safeY = Math.min(pts[n - 2][1], pillY - MIN_GAP);
    pts[n - 2][1] = safeY;
    pts[n - 3][1] = safeY;
  });
}

// V-aisle immediately to the right / left of column c
function rightOf(c, a) { return [a.aisleX_01, a.aisleX_12, a.aisleX_R][c]; }
function leftOf(c, a)  { return [a.aisleX_L,  a.aisleX_01, a.aisleX_12][c]; }

// H-aisle immediately above the destination table's row.
function getApproachAisle(dti, aisles) {
  const r = TABLE_GRID[dti].row;
  if (r === 1) return aisles.aisleY_01;
  if (r === 2) return aisles.aisleY_12;
  return aisles.aisleY_top; // virtual aisle above row 0
}

// Build the most direct H/V route from table ti to the top of table dti.
// Starts horizontal from the outer table edge; ends at dst.top from above.
function computeRoute(ti, dti, tRects, aisles, exitY, entryX, exitLeft) {
  const { col: c1 } = TABLE_GRID[ti];
  const src           = tRects[ti];
  const dst           = tRects[dti];
  const approachAisle = getApproachAisle(dti, aisles);
  const exitX         = exitLeft ? src.left  : src.right;
  const vA            = exitLeft ? leftOf(c1, aisles) : rightOf(c1, aisles);
  return [
    [exitX,  exitY],
    [vA,     exitY],
    [vA,     approachAisle],
    [entryX, approachAisle],
    [entryX, dst.top - PILL_LIFT - PILL_R],
  ];
}

// ── Shuffle ───────────────────────────────────────────────────────────────────

function shuffle() {
  clearLines();

  // Invalidate any in-flight animations from a prior shuffle
  shuffleToken++;
  const token = shuffleToken;

  const seedIn = parseInt(document.getElementById('seed').value, 10);
  const seed   = Number.isFinite(seedIn) ? seedIn : 0;
  const result = generateAssignment(seed);

  if (!result.ok) {
    currentAssignment = null;
    clearSeatText();
    showMessage(result.reason);
    document.getElementById('shuffle-status').className = 'status-error';
    refreshSeats(); // keep the seat icons on screen
    refreshLectern();
    return;
  }

  showMessage('');
  currentAssignment = result.assignment;
  syncShuffleButton();
  settledSeats.fill(false);
  circleShown = isCircleDay();
  const animate = circleShown ? fadeSeat : animateSeat;

  // Numbers the spinner is allowed to flash: every table, since an empty table
  // still receives students.
  const pool = [];
  for (let t = 0; t < NUM_TABLES; t++) pool.push(t + 1);

  // Show loading spinner
  const statusEl = document.getElementById('shuffle-status');
  statusEl.className = 'status-loading';

  // Lay out every route now, undrawn; each one is drawn as its seat lands.
  drawOverlay();

  // Seats land one at a time, in random order, SETTLE_GAP_MS apart.
  const seats = seatEls();
  const order = [];
  // Absent seats keep their ghost and a lectern left out keeps its anchor (from refreshSeats and refreshLectern); staying seats aren't null, they land on their own table.
  currentAssignment.forEach((value, i) => { if (value !== null) order.push(i); });
  fisherYates(order, Math.random);
  pendingSeats = order.length;

  order.forEach((i, k) => {
    animate(seats[i], currentAssignment[i], pool, token, () => {
      if (shuffleToken !== token) return; // superseded shuffle
      if (!circleShown) revealSeat(i);
      pendingSeats--;
      if (pendingSeats === 0) {
        if (circleShown) {
          formCircle(seed, token);
        } else {
          // ✅ once the last route has finished drawing
          setTimeout(() => { if (shuffleToken === token) setStatusDone(); }, showPaths() ? PATH_DRAW_MS : 0);
        }
      }
    }, SETTLE_FIRST_MS + k * SETTLE_GAP_MS);
  });
}

// ── Seed ──────────────────────────────────────────────────────────────────────
// A typed seed is used as-is. A blank box draws one from random.org when Shuffle is pressed (the only time the page contacts it), and falls back to Math.random if random.org doesn't answer in time.

const RANDOM_ORG_SEED = 'https://www.random.org/integers/?num=1&min=0&max=1000&col=1&base=10&format=plain&rnd=new';
const SEED_FETCH_MS   = 3000;
const SEED_HINT       = 'Leave blank to draw a seed from random.org';

let seedDrawn   = false; // the box holds a drawn seed, which Reset clears so the next Shuffle draws again
let drawingSeed = false; // a random.org request is in flight; Shuffle presses wait for it

async function drawSeed() {
  try {
    const r = await fetch(RANDOM_ORG_SEED, { cache: 'no-store', signal: AbortSignal.timeout(SEED_FETCH_MS) });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    const n = parseInt(await r.text(), 10);
    if (!(n >= 0 && n <= 1000)) throw new Error('unexpected response');
    return { seed: n, source: 'random.org' };
  } catch (err) {
    console.warn('random.org seed draw failed, using Math.random:', err);
    return { seed: Math.floor(Math.random() * 1001), source: 'this browser (random.org did not answer)' };
  }
}

async function shuffleWithSeed() {
  const input = document.getElementById('seed');
  if (input.value === '') {
    drawingSeed = true;
    document.getElementById('shuffle-status').className = 'status-loading';
    const { seed, source } = await drawSeed();
    drawingSeed = false;
    input.value = seed;
    input.title = `Seed drawn by ${source}`;
    seedDrawn = true;
  }
  shuffle();
}

function clearDrawnSeed() {
  if (!seedDrawn) return;
  const input = document.getElementById('seed');
  input.value = '';
  input.title = SEED_HINT;
  seedDrawn = false;
}

// ── Marking seats ─────────────────────────────────────────────────────────────
// Clicking a seat cycles it through three states: random (🎲), absent (👻), and
// staying (⚓️), then back to random.

// Changing any seat (or the lectern) changes the arithmetic for the whole room,
// so whatever is on screen is no longer a valid assignment. Wipe it and wait
// for a fresh shuffle rather than leaving a stale one up. Reset does the same,
// keeping the seat states and the lectern as they are.
function discardShuffle() {
  shuffleToken++; // cancels any in-flight seat animations
  currentAssignment = null;
  clearLines();
  clearSeatText();
  showMessage('');
  syncShuffleButton();
  refreshSeats();
  refreshLectern();
  clearDrawnSeed();
}

function toggleSeat(i) {
  seatState[i] = (seatState[i] + 1) % 3;
  discardShuffle();
}

// Clicking the lectern puts a student there into the shuffle (dark, like a
// seat in use), and clicking it again takes them back out (light).
function toggleLectern() {
  lecternActive = !lecternActive;
  discardShuffle();
}

function refreshLectern() {
  const lectern = document.querySelector('.lectern');
  lectern.classList.toggle('active', lecternActive);
  lectern.setAttribute('aria-pressed', lecternActive ? 'true' : 'false');
  lectern.setAttribute('aria-label', 'Lectern — ' +
    (lecternActive ? 'in the shuffle, click to take out' : 'click to add a student here to the shuffle'));
  const seat = document.querySelector('.lectern-seat');
  seat.textContent = '';
  if (lecternActive) {
    seat.textContent = '🎲';
  } else {
    seat.appendChild(seatIcon('anchor'));
  }
}

function clearSeatText() {
  seatEls().forEach(seat => {
    seat.textContent = '';
    seat.style.color = '';
  });
}

// The anchor and ghost are SVG files in assets/seat-icons/, each drawing wrapped in <g id="icon"> and stroked in currentColor so the seat or lectern sets their color. A random seat shows the 🎲 emoji instead.
const SEAT_ICON_DIR = '/assets/seat-icons/';

function seatIcon(name) {
  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'seat-icon');
  svg.setAttribute('viewBox', '0 0 24 24');
  svg.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS(NS, 'use');
  use.setAttribute('href', `${SEAT_ICON_DIR}${name}.svg#icon`);
  svg.appendChild(use);
  return svg;
}

// Reflect the seat states in the DOM: each seat shows its state icon (🎲 for random, a faint ghost for absent, an anchor for staying), with the absent seat reading as a hole punched through the table.
function refreshSeats() {
  document.querySelectorAll('.table').forEach((table, ti) => {
    table.querySelectorAll('.seat').forEach((seat, si) => {
      const i     = ti * SEATS_PER_TABLE + si;
      const state = seatState[i];
      seat.classList.toggle('absent', state === STATE_ABSENT);
      seat.classList.toggle('stays',  state === STATE_STAYS);
      seat.textContent = '';
      if (state === STATE_RANDOM) {
        seat.textContent = '🎲';
      } else {
        seat.appendChild(seatIcon(state === STATE_STAYS ? 'anchor' : 'ghost'));
      }
      const stateName = state === STATE_ABSENT ? 'absent' : state === STATE_STAYS ? 'stays here' : 'random assignment';
      const action    = state === STATE_ABSENT ? 'mark to stay' : state === STATE_STAYS ? 'reset to random' : 'mark absent';
      seat.setAttribute('aria-label', `Table ${ti + 1}, seat ${si + 1} — ${stateName}, click to ${action}`);
      seat.setAttribute('aria-pressed', state !== STATE_RANDOM ? 'true' : 'false');
    });
  });
}

// The reason a shuffle couldn't run lives behind the ⚠️ in the header corner,
// not inline — an impossible room is rare, and the header stays quiet when the
// tool is working.
function showMessage(text) {
  document.getElementById('shuffle-tip-why').textContent =
    text ? `(Can't meet the constraints: ${text})` : '';
  const status = document.getElementById('shuffle-status');
  if (text) {
    status.setAttribute('tabindex', '0');   // reachable without a mouse
    status.setAttribute('aria-label', `Shuffle seats another day! Can't meet the constraints: ${text}`);
  } else {
    status.removeAttribute('tabindex');
    status.removeAttribute('aria-label');
  }
}

// ── Fit room to viewport ───────────────────────────────────────────────────────
// The room's contents have fixed pixel sizes. Scale it to fill as much of the
// space between header and footer as possible — up when there's room to
// spare, down when the window is small — bounded by whichever of width/height
// is tighter so it never overflows sideways either.

let roomNaturalSize = null; // cached; the room's own content size never changes
let currentRoomScale = 1;   // last scale factor applied to .room; used by circle-day.js

function fitRoom() {
  const wrapper = document.getElementById('room-scale');
  const room    = document.querySelector('.room');
  if (!wrapper || !room) return;

  if (!roomNaturalSize) {
    room.style.transform = 'none';
    roomNaturalSize = { w: room.offsetWidth, h: room.offsetHeight };
  }

  const header = document.querySelector('.header');
  const footer = document.querySelector('.footnotes');
  const page   = document.querySelector('.page');

  const bodyStyle = getComputedStyle(document.body);
  const padX = parseFloat(bodyStyle.paddingLeft) + parseFloat(bodyStyle.paddingRight);
  const padY = parseFloat(bodyStyle.paddingTop)  + parseFloat(bodyStyle.paddingBottom);
  const pageGap = parseFloat(getComputedStyle(page).rowGap || getComputedStyle(page).gap) || 0;

  const availW = window.innerWidth - padX;

  // Forcing the header to the room's width can make it wrap onto a second
  // line, which changes its own height — and thus how much vertical space is
  // left for the room. Iterate a couple of times so that feedback settles
  // before committing to a final scale. Embedded in a slide the frame is only
  // a few hundred pixels wide, and pinning the header there wraps the controls
  // over two or three lines; let it use the full frame width instead.
  const pinHeader = !document.documentElement.classList.contains('embedded');
  let scale = currentRoomScale;
  for (let i = 0; i < 3; i++) {
    const availH = window.innerHeight - padY - header.offsetHeight - footer.offsetHeight - pageGap;
    scale = Math.min(availW / roomNaturalSize.w, availH / roomNaturalSize.h);
    if (pinHeader) header.style.width = `${roomNaturalSize.w * scale}px`;
  }

  currentRoomScale = scale;
  // Lectern POV turns the room 180° about its top-left corner; the translate brings it back into the wrapper.
  const W = roomNaturalSize.w * scale, H = roomNaturalSize.h * scale;
  room.classList.toggle('pov', lecternPOV()); // turns the labels back upright (see the CSS)
  room.style.transform = lecternPOV() ? `translate(${W}px, ${H}px) scale(${scale}) rotate(180deg)` : `scale(${scale})`;
  wrapper.style.width  = `${roomNaturalSize.w * scale}px`;
  wrapper.style.height = `${roomNaturalSize.h * scale}px`;
}

// ── Info panel ────────────────────────────────────────────────────────────────

let panelContentLoaded = false;

function openPanel() {
  document.getElementById('side-panel').classList.add('open');
  document.getElementById('overlay').classList.add('visible');

  if (!panelContentLoaded) {
    panelContentLoaded = true;
    fetch('seat-shuffle-about.md')
      .then(r => r.text())
      .then(md => {
        document.getElementById('panel-content').innerHTML = marked.parse(md);
      })
      .catch(() => {
        document.getElementById('panel-content').innerHTML = '<p>Could not load content.</p>';
      });
  }
}

function closePanel() {
  document.getElementById('side-panel').classList.remove('open');
  document.getElementById('overlay').classList.remove('visible');
}

// ── Init ──────────────────────────────────────────────────────────────────────

function makeButton(el, onPress) {
  el.setAttribute('role', 'button');
  el.setAttribute('tabindex', '0');
  el.addEventListener('click', onPress);
  el.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPress(); }
  });
}

function setUpSeats() {
  document.querySelectorAll('.table').forEach((table, ti) => {
    table.querySelectorAll('.seat').forEach((seat, si) => {
      makeButton(seat, () => toggleSeat(ti * SEATS_PER_TABLE + si));
    });
  });
  refreshSeats();
  makeButton(document.querySelector('.lectern'), toggleLectern);
  refreshLectern();
}

// The button shuffles, and becomes Reset while a shuffle is on screen.
// Lectern POV is for setting up the room (marking absences); students read a
// shuffle in their own view, so the button waits until the room is flipped back.
function syncShuffleButton() {
  const btn = document.getElementById('shuffle-btn');
  btn.classList.toggle('is-reset', currentAssignment !== null);
  btn.disabled = lecternPOV();
  btn.title = btn.disabled ? 'Uncheck Lectern POV to use this button' : '';
}

document.addEventListener('DOMContentLoaded', () => {
  const seedInput = document.getElementById('seed');
  seedInput.value = ''; // blank on load, even if the browser restored last visit's seed
  seedInput.title = SEED_HINT;
  seedInput.addEventListener('input', () => { seedDrawn = false; seedInput.title = SEED_HINT; });
  document.getElementById('shuffle-btn').addEventListener('click', () => {
    if (drawingSeed) return;
    if (currentAssignment) discardShuffle(); else shuffleWithSeed();
  });
  setUpSeats();
  showMessage('');
  ['colors-cb', 'paths-cb'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => {
      if (circleShown) return;
      if (showColors() || showPaths()) drawOverlay(); else clearLines();
      relabelSeats(); // the arrows only show with Paths off
    });
  });
  syncShuffleButton(); // the browser may have restored a checked box on reload
  document.getElementById('pov-cb').addEventListener('change', () => {
    syncShuffleButton();
    flipRoom();
  });

  document.getElementById('about-link').addEventListener('click', e => { e.preventDefault(); openPanel(); });
  document.getElementById('info-btn').addEventListener('click', openPanel);
  document.getElementById('panel-close').addEventListener('click', closePanel);
  document.getElementById('overlay').addEventListener('click', closePanel);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closePanel(); });

  fitRoom();
  window.addEventListener('resize', () => {
    fitRoom();
    if (showColors() || showPaths()) drawOverlay();
  });
});
