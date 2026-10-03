// NOTICE: Moved verbatim out of an inline <script> in _includes/masthead.html by an LLM coding
// system (Claude Code), so the Content-Security-Policy can drop 'unsafe-inline'.

(function () {
  var SWEEP_MS = 32000;   // how long the single edgeward glide takes
  var rail = document.querySelector('.ble-masthead__inner');
  var train = rail && rail.querySelector('.ble-masthead__train');
  if (!train || !train.animate) return;

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  var anim = null;        // the glide, once it is under way
  var parked = false;     // true once the glide has finished
  var x = 0;              // the train's current translateX, in px

  /* How far the train may be translated: `min` puts its left edge on the window's
     left edge, `max` puts its right edge on the window's right edge. The rail has
     no horizontal padding, so the untranslated train sits at the rail's left edge.
     clientWidth excludes any vertical scrollbar, so `max` stays on screen. */
  function bounds() {
    var railLeft = rail.getBoundingClientRect().left;
    var min = -railLeft;
    return {
      min: min,
      max: Math.max(min, document.documentElement.clientWidth - train.offsetWidth - railLeft)
    };
  }

  function place(px) {
    x = px;
    train.style.transform = 'translateX(' + px + 'px)';
  }

  function start() {
    if (anim) anim.cancel();
    var b = bounds();

    // A parked train (or a reduced-motion one) never glides again; on resize it
    // just gets nudged back inside the window.
    if (parked || reduce.matches) {
      place(Math.min(Math.max(x, b.min), b.max));
      return;
    }

    var from = b.min + Math.random() * (b.max - b.min);
    var to = (from - b.min) > (b.max - from) ? b.min : b.max;   // the further edge
    place(to);   // rest at the destination, so the glide has something to land on
    anim = train.animate(
      [{ transform: 'translateX(' + from + 'px)' },
       { transform: 'translateX(' + to + 'px)' }],
      { duration: SWEEP_MS, easing: 'ease-in-out', fill: 'backwards' }
    );
    anim.finished.then(function () { parked = true; }, function () { /* cancelled */ });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(start, 150);
  });
  reduce.addEventListener('change', start);
  if (train.complete) start(); else train.addEventListener('load', start);
})();
