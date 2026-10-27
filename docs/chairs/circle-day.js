// ─────────────────────────────────────────────────────────────────────────────
// Circle day: an easter egg for October 21, 2026.
//
// On that day a shuffle never lands. The numbers fade out, the colored dots come up as usual, then the tables huddle into a small block of gray slabs in the middle of the room (1 and 2 turned sideways at the front, 3–5 and 6–8 behind them) while every dot leaves its seat for a ring of chairs around the outside of the room, in random order. The ring keeps slowly turning and breathing after it forms.
// ─────────────────────────────────────────────────────────────────────────────

const CIRCLE_DAY = { year: 2026, month: 9, date: 21 }; // month counts from 0

// The huddled tables shrink to this fraction of their size to leave the floor to the ring.
const CIRCLE_TABLE_SCALE = 0.5;
const CIRCLE_TABLE_GAP   = 18;

// Keeps the ring off the window panels on the left wall (and the same distance off the right wall).
const CIRCLE_WALL_MARGIN = 64;

// Set while a circle-day shuffle is on screen, so the normal overlay keeps out of its way.
let circleShown = false;

function isCircleDay() {
  const d = new Date();
  return d.getFullYear() === CIRCLE_DAY.year && d.getMonth() === CIRCLE_DAY.month && d.getDate() === CIRCLE_DAY.date;
}

// Same signature as animateSeat so shuffle() can pick either: spins and slows the same way, but fades out the whole time it slows and never settles on a number.
function fadeSeat(seatEl, _finalValue, pool, token, onDone) {
  const totalMs = 2000 + Math.random() * 2500;
  const spinMs  = totalMs * (0.30 + Math.random() * 0.15);
  const fadeMs  = totalMs - spinMs + 1000;
  const flash   = () => pool[Math.floor(Math.random() * pool.length)];

  seatEl.style.color = 'rgba(255,255,255,0.30)';

  const spinInterval = setInterval(() => {
    if (shuffleToken !== token) { clearInterval(spinInterval); return; }
    seatEl.textContent = flash();
  }, 70);

  setTimeout(() => {
    clearInterval(spinInterval);
    if (shuffleToken !== token) return;

    seatEl.style.transition = `color ${fadeMs}ms ease-in`;
    seatEl.style.color = 'rgba(255,255,255,0)';

    const numSteps = 9;
    for (let i = 1; i <= numSteps; i++) {
      const t = i / numSteps;
      setTimeout(() => {
        if (shuffleToken !== token) return;
        if (i < numSteps) { seatEl.textContent = flash(); return; }
        seatEl.textContent = '';
        seatEl.style.transition = '';
        seatEl.style.color = '';
        onDone();
      }, Math.round(fadeMs * t * t));
    }
  }, spinMs);
}

// Called from clearLines(): put the furniture back where it was.
function resetCircle() {
  circleShown = false;
  document.querySelectorAll('.table').forEach(t => { t.style.transform = ''; });
  document.querySelectorAll('.seat').forEach(s => { s.style.transition = ''; });
  document.querySelectorAll('.table-num, .table-seats').forEach(el => {
    el.style.transition = '';
    el.style.opacity = '';
  });
  const lectern = document.querySelector('.lectern');
  lectern.style.transition = '';
  lectern.style.opacity = '';
}

function formCircle(seed, token) {
  const room     = document.querySelector('.room');
  const roomRect = room.getBoundingClientRect();
  const scale    = currentRoomScale || 1;

  // Center and size in .room's local (pre-scale) units, the space both the SVG and the table transforms live in.
  const box = el => {
    const r = el.getBoundingClientRect();
    return { x: (r.left - roomRect.left + r.width / 2) / scale, y: (r.top - roomRect.top + r.height / 2) / scale, w: r.width / scale, h: r.height / scale };
  };

  const tables = Array.from(document.querySelectorAll('.table'));
  const tBoxes = tables.map(box);

  // The ring fills the floor below the front wall, and the huddle sits at its center.
  const W        = roomRect.width / scale;
  const H        = roomRect.height / scale;
  const main     = box(document.querySelector('.main-area'));
  const floorTop = main.y - main.h / 2;
  const cx = W / 2;
  const cy = (floorTop + H) / 2;
  const rx = W / 2 - CIRCLE_WALL_MARGIN;
  const ry = (H - floorTop) / 2 - DOT_RING_R - 16;

  // Huddle layout: tables 1 and 2 lie sideways in a front row, then 3–5 and 6–8.
  const tw = tBoxes[0].w * CIRCLE_TABLE_SCALE;
  const th = tBoxes[0].h * CIRCLE_TABLE_SCALE;
  const G  = CIRCLE_TABLE_GAP;
  const frontY = cy - (tw + 2 * th + 2 * G) / 2 + tw / 2;
  const rowAY  = frontY + tw / 2 + G + th / 2;
  const rowBY  = rowAY + th + G;
  const targets = [
    { x: cx - (th + G) / 2, y: frontY, rot: -90 },
    { x: cx + (th + G) / 2, y: frontY, rot: 90 },
    ...[rowAY, rowBY].flatMap(y => [-1, 0, 1].map(k => ({ x: cx + k * (tw + G), y, rot: 0 }))),
  ];

  // One dot per occupied seat, where the colors layer would put it: on the table's outer edge, level with the seat.
  const dots = [];
  tables.forEach((t, ti) => {
    t.querySelectorAll('.seat').forEach((seat, si) => {
      const group = currentAssignment[ti * SEATS_PER_TABLE + si];
      if (group === null) return;
      const tb = tBoxes[ti];
      dots.push({ ti, color: CTA_COLORS[group - 1], ox: (si % 2 === 0 ? -1 : 1) * tb.w / 2, oy: box(seat).y - tb.y });
    });
  });

  // Seeded, so the same seed seats the same circle.
  const order = dots.map((_, i) => i);
  fisherYates(order, mulberry32(seedFor(seed) ^ 0x2026));
  order.forEach((di, k) => { dots[di].slot = -Math.PI / 2 + 2 * Math.PI * k / dots.length; });

  const NS  = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.id = 'lines-svg'; // so clearLines() sweeps it away like the normal overlay
  Object.assign(svg.style, {
    position: 'absolute', top: '0', left: '0',
    width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible',
    opacity: '0', transition: 'opacity 0.6s',
  });
  dots.forEach(d => {
    const ring = document.createElementNS(NS, 'circle');
    ring.setAttribute('r', DOT_RING_R); ring.setAttribute('fill', 'white');
    ring.setAttribute('stroke', '#bbb'); ring.setAttribute('stroke-width', '1');
    const dot = document.createElementNS(NS, 'circle');
    dot.setAttribute('r', DOT_R); dot.setAttribute('fill', d.color);
    d.el = document.createElementNS(NS, 'g');
    d.el.append(ring, dot);
    svg.appendChild(d.el);
  });
  room.appendChild(svg);

  const lerp = (a, b, p) => a + (b - a) * p;
  const ease = p => p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  const setDots = at => dots.forEach(d => {
    const { x, y } = at(d);
    d.el.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  });

  // Each dot leaves its seat for its chair while the tables are still moving, swinging around the center rather than cutting straight across.
  const MOVE_MS = 2400;
  const FLY_MS  = 2400;
  const STAGGER = 600;
  dots.forEach(d => {
    d.x0 = tBoxes[d.ti].x + d.ox;
    d.y0 = tBoxes[d.ti].y + d.oy;
    const u = (d.x0 - cx) / rx, v = (d.y0 - cy) / ry;
    d.r0     = Math.hypot(u, v);
    d.theta0 = Math.atan2(v, u);
    d.dTheta = ((d.slot - d.theta0) % (2 * Math.PI) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
    d.delay  = Math.random() * STAGGER;
  });
  const toChair = (d, q) => {
    const r = lerp(d.r0, 1, q), theta = d.theta0 + d.dTheta * q;
    return { x: cx + rx * r * Math.cos(theta), y: cy + ry * r * Math.sin(theta) };
  };

  setDots(d => ({ x: d.x0, y: d.y0 }));
  svg.getBoundingClientRect();
  svg.style.opacity = '1';

  circleAfter(1000, token, () => {
    const lectern = document.querySelector('.lectern');
    lectern.style.transition = `opacity ${MOVE_MS}ms`;
    lectern.style.opacity = '0.3';

    // The huddle is plain gray slabs: no labels, no seats.
    document.querySelectorAll('.table-num, .table-seats').forEach(el => {
      el.style.transition = `opacity ${MOVE_MS / 2}ms`;
      el.style.opacity = '0';
    });

    const total = FLY_MS + STAGGER;
    circleTween(total, token, p => {
      const e = ease(Math.min(1, p * total / MOVE_MS));
      tables.forEach((t, ti) => {
        const tb = tBoxes[ti], tg = targets[ti];
        t.style.transform = `translate(${((tg.x - tb.x) * e).toFixed(1)}px, ${((tg.y - tb.y) * e).toFixed(1)}px) rotate(${(tg.rot * e).toFixed(2)}deg) scale(${lerp(1, CIRCLE_TABLE_SCALE, e).toFixed(3)})`;
      });
      setDots(d => toChair(d, ease(Math.min(1, Math.max(0, (p * total - d.delay) / FLY_MS)))));
    }, () => {
      setStatusDone();
      driftCircle(dots, { cx, cy, rx, ry }, setDots, token);
    });
  });
}

// Once seated, the ring keeps moving until the next shuffle or erase: a slow clockwise lap, while each axis gently draws in and lets back out on its own rhythm, so the oval breathes and changes shape a little. Both start from rest at the seated positions, so there is no jump.
const DRIFT_LAP_MS  = 120000;
const DRIFT_RAMP_MS = 3000;
const BREATH_DEPTH  = 0.06;
const BREATH_X_MS   = 7000;
const BREATH_Y_MS   = 9100;

function driftCircle(dots, { cx, cy, rx, ry }, setDots, token) {
  const omega = 2 * Math.PI / DRIFT_LAP_MS;
  const breath = (t, period) => 1 - BREATH_DEPTH * (1 - Math.cos(2 * Math.PI * t / period)) / 2;
  const t0 = performance.now();
  requestAnimationFrame(function frame(now) {
    if (shuffleToken !== token) return;
    const t = Math.max(0, now - t0);
    // Angle with the speed ramped up from zero over DRIFT_RAMP_MS; positive is clockwise with y pointing down.
    const turn = omega * (t < DRIFT_RAMP_MS ? t * t / (2 * DRIFT_RAMP_MS) : t - DRIFT_RAMP_MS / 2);
    const kx = breath(t, BREATH_X_MS), ky = breath(t, BREATH_Y_MS);
    setDots(d => ({ x: cx + rx * kx * Math.cos(d.slot + turn), y: cy + ry * ky * Math.sin(d.slot + turn) }));
    requestAnimationFrame(frame);
  });
}

function circleAfter(ms, token, fn) {
  setTimeout(() => { if (shuffleToken === token) fn(); }, ms);
}

function circleTween(ms, token, step, done) {
  const t0 = performance.now();
  requestAnimationFrame(function frame(now) {
    if (shuffleToken !== token) return;
    const p = Math.min(1, Math.max(0, (now - t0) / ms));
    step(p);
    if (p < 1) requestAnimationFrame(frame); else done();
  });
}
