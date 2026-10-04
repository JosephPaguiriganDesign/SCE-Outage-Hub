/*! CONH hi-fi — ut11 motion layer. Static, deferred, no dependencies. Core answer is already in the HTML (no-JS / reduced motion = instant swaps).
   - NO timing literals here: every duration / easing is read from the shared CSS tokens (--motion-*, m3_tokens.css) through a hidden probe.
   - Off when prefers-reduced-motion: reduce or html[data-motion="off"]  (?motion=off|slow|on, remembered for the session; see README "Motion").
   - Safety / 911 / 211 content is never animated (Motion.EXCLUDE; CSS twin at the end of m3_motion.css). */
(function () {
  'use strict';
  var d = document, root = d.documentElement, win = window;
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }

  /* ---- exclusion list (static content). Keep in sync with the CSS :is(...) list at the end of m3_motion.css ---- */
  var EXCLUDE = '.hx-safety,.hx-detect,.safety-card,.hx-mb,.ut-help,.btn211,.btn.danger,a[href^="tel:"],.ut-banner[data-tone="alert"],[data-ph-list="s7Safety"],[data-mo-static]';
  function isStatic(el) { return !!(el && el.closest && el.closest(EXCLUDE)); }

  /* ---- ?motion=off|slow|on (also set by the head snippet before first paint) ---- */
  var mq = win.matchMedia ? win.matchMedia('(prefers-reduced-motion: reduce)') : { matches: false };
  function mode() { return root.getAttribute('data-motion') || 'on'; }
  function enabled() { return !mq.matches && mode() !== 'off'; }
  function setMode(m) {
    if (m === 'on') root.removeAttribute('data-motion'); else root.setAttribute('data-motion', m);
    try { sessionStorage.setItem('conh_motion', m); } catch (e) {}
    $$('[data-motion-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-motion-set') === m)); });
  }

  /* ---- token reader: no literals, the CSS variables are the single source ---- */
  var probe = d.createElement('i'); probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText = 'position:absolute;width:0;height:0;visibility:hidden;pointer-events:none';
  function mount() { if (!probe.parentNode && d.body) d.body.appendChild(probe); }
  function ms(name) {            /* ms('duration-medium') -> number of ms (0 when motion is off) */
    mount(); probe.style.transitionDuration = 'var(--motion-' + name + ')';
    var v = getComputedStyle(probe).transitionDuration || '', n = parseFloat(v) || 0;
    return /ms$/.test(v) ? n : n * 1000;
  }
  function ease(name) { mount(); probe.style.transitionTimingFunction = 'var(--motion-ease-' + name + ')'; return getComputedStyle(probe).transitionTimingFunction; }
  function len(name) { mount(); probe.style.width = 'var(--motion-' + name + ')'; return parseFloat(getComputedStyle(probe).width) || 0; }
  function opts(dur, easing, extra) { var o = { duration: ms('duration-' + dur), easing: ease(easing), fill: 'forwards' }; if (extra) for (var k in extra) o[k] = extra[k]; return o; }

  /* ---- height animation (the only animated layout property; measured, so surrounding content moves once, as intended) ---- */
  function animate(el, kf, o, done, keep) {          /* keep: leave the end state applied (the owner cancels it when it cleans up) */
    var a = el.animate(kf, o), fin = false;
    function end() { if (fin) return; fin = true; if (done) done(); if (!keep) { try { a.cancel(); } catch (e) {} } }
    a.onfinish = end; a.oncancel = function () { if (!fin) { fin = true; if (done) done(); } };
    return a;
  }
  function stop(el) { (el._moAnims || []).forEach(function (a) { try { a.cancel(); } catch (e) {} }); el._moAnims = []; }
  function track(el, a) { (el._moAnims = el._moAnims || []).push(a); return a; }
  function hOf(el) { return el.getBoundingClientRect().height; }
  function grow(el, h0, cb) {    /* el has already reached its new natural layout; ease its height from h0 */
    var h1 = hOf(el); if (!enabled() || isStatic(el) || Math.abs(h1 - h0) < 1) { if (cb) cb(); return; }
    el.setAttribute('data-mo-grow', '');
    track(el, animate(el, [{ height: h0 + 'px' }, { height: h1 + 'px' }], opts('medium', 'standard'), function () { el.removeAttribute('data-mo-grow'); if (cb) cb(); }));
  }

  /* ---- 1. status card View / Hide details: card height + current step slides, other steps / extra rows fade ---- */
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cps-toggle]') : null; if (!t) return;
    var card = t.closest('.cps'); if (!card || !enabled() || isStatic(card)) return;
    var opening = card.getAttribute('data-exp') !== '1';
    var h0 = hOf(card), cur = $('.step.is-current', card), y0 = cur ? cur.getBoundingClientRect().top : 0;
    stop(card); $$('.step,.cps-x', card).forEach(stop);
    if (!opening) card.setAttribute('data-moving', '1');          /* keep the expanded layout (CSS) until the collapse finishes */
    requestAnimationFrame(function () {
      var fade = $$('.step:not(.is-current),.cps-x', card), o = opts('medium', 'standard'), y1, h1;
      function clean() { card.removeAttribute('data-moving'); card.removeAttribute('data-mo-grow'); $$('.step,.cps-x', card).forEach(stop); }
      if (opening) {
        h1 = hOf(card); y1 = cur ? cur.getBoundingClientRect().top : 0;
        card.setAttribute('data-mo-grow', '');
        track(card, animate(card, [{ height: h0 + 'px' }, { height: h1 + 'px' }], o, clean));
        if (cur) track(cur, animate(cur, [{ transform: 'translateY(' + (y0 - y1) + 'px)' }, { transform: 'none' }], o, null, true));
        fade.forEach(function (n) { track(n, animate(n, [{ opacity: 0 }, { opacity: 1 }], o, null, true)); });
      } else {
        var hx = hOf(card), yx = cur ? cur.getBoundingClientRect().top : 0;
        card.removeAttribute('data-moving'); h1 = hOf(card); y1 = cur ? cur.getBoundingClientRect().top : 0; card.setAttribute('data-moving', '1');
        card.setAttribute('data-mo-grow', '');
        track(card, animate(card, [{ height: hx + 'px' }, { height: h1 + 'px' }], o, clean));
        if (cur) track(cur, animate(cur, [{ transform: 'none' }, { transform: 'translateY(' + (y1 - yx) + 'px)' }], o, null, true));
        fade.forEach(function (n) { track(n, animate(n, [{ opacity: 1 }, { opacity: 0 }], o, null, true)); });
      }
    });
  }, true);

  /* ---- 2. generic Show / Hide target (View Details rows) and Show less / more list ---- */
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ut-toggle]') : null; if (!t || !enabled()) return;
    var tgt = d.getElementById(t.getAttribute('data-ut-toggle')); if (!tgt || isStatic(tgt)) return;
    var opening = tgt.hidden, h0 = opening ? 0 : hOf(tgt); stop(tgt);
    requestAnimationFrame(function () {
      if (opening) { grow(tgt, 0); }
      else {                                                       /* existing handler hid it: show again, ease closed, then hide */
        tgt.hidden = false; tgt.setAttribute('data-mo-grow', '');
        track(tgt, animate(tgt, [{ height: h0 + 'px' }, { height: '0px' }], opts('medium', 'standard'), function () { tgt.hidden = true; tgt.removeAttribute('data-mo-grow'); }));
      }
    });
  }, true);
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ut-less]') : null; if (!t || !enabled()) return;
    var list = d.getElementById(t.getAttribute('data-ut-less')); if (!list || isStatic(list)) return;
    var h0 = hOf(list); stop(list); requestAnimationFrame(function () { grow(list, h0); });
  }, true);

  /* ---- 3. <details> accordions (Account, weather row, history rows, "more"): height ease, chevron via [data-closing] ---- */
  d.addEventListener('click', function (e) {
    var s = e.target.closest ? e.target.closest('summary') : null; if (!s || !s.parentNode || s.parentNode.tagName !== 'DETAILS') return;
    var det = s.parentNode;
    if (!enabled() || isStatic(det) || det.closest('.proto-panel,.facilitator')) return;      /* prototype chrome stays native */
    e.preventDefault(); stop(det);
    var h0 = hOf(det);
    if (!det.open) { det.removeAttribute('data-closing'); det.open = true; grow(det, h0); return; }
    var cs = getComputedStyle(det), sp = getComputedStyle(s).position, flow = sp !== 'absolute' && sp !== 'fixed';
    var h1 = (flow ? s.getBoundingClientRect().bottom - det.getBoundingClientRect().top : parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth)) + parseFloat(cs.paddingBottom) + parseFloat(cs.borderBottomWidth);   /* summary out of flow (Account) collapses to 0 */
    det.setAttribute('data-closing', ''); det.setAttribute('data-mo-grow', '');
    track(det, animate(det, [{ height: h0 + 'px' }, { height: h1 + 'px' }], opts('medium', 'standard'), function () { det.open = false; det.removeAttribute('data-closing'); det.removeAttribute('data-mo-grow'); }));
  }, true);

  /* ---- 4. status word flip (ON <-> OFF is a text cross-fade / rise, never a control) + soft swap of changed card fields ---- */
  function watch() {
    $$('.cps-state').forEach(function (el) {
      var prev = el.textContent;
      new MutationObserver(function () {
        var now = el.textContent; if (now === prev) return; var old = prev; prev = now;
        if (!enabled() || isStatic(el)) return;
        el.setAttribute('data-prev', old); el.classList.remove('mo-flip-in'); void el.offsetWidth; el.classList.add('mo-flip-in');
        var dur = ms('duration-medium') + 50;
        setTimeout(function () { el.classList.remove('mo-flip-in'); el.removeAttribute('data-prev'); }, dur);
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
    $$('.cps [data-f],.cps .cps-label,.cps .cps-line').forEach(function (el) {
      var prev = el.textContent;
      new MutationObserver(function () {
        var now = el.textContent; if (now === prev) return; prev = now;
        if (!enabled() || isStatic(el) || el.closest('.cps-state')) return;
        el.classList.remove('mo-swap'); void el.offsetWidth; el.classList.add('mo-swap');
        setTimeout(function () { el.classList.remove('mo-swap'); }, ms('duration-medium') + 50);
      }).observe(el, { childList: true, characterData: true, subtree: true });
    });
    /* map layer switches: the row gets a short highlight (the switch knob itself eases in CSS) */
    $$('.ut-legend .ut-sw').forEach(function (sw) {
      new MutationObserver(function () {
        var li = sw.closest('li'); if (!li || !enabled()) return;
        li.classList.remove('mo-flash'); void li.offsetWidth; li.classList.add('mo-flash');
        setTimeout(function () { li.classList.remove('mo-flash'); }, ms('duration-long') + 50);
      }).observe(sw, { attributes: true, attributeFilter: ['aria-checked'] });
    });
  }

  /* ---- 5. refresh feedback on the "Updated ..." trust line (simulated) + card skeleton ---- */
  function refresh() {
    if (!enabled()) return;
    $$('.cps-upd').forEach(function (u) {
      if (!u.offsetParent || isStatic(u)) return;
      u.classList.remove('is-refreshed'); u.classList.add('is-loading');
      setTimeout(function () {
        u.classList.remove('is-loading'); void u.offsetWidth; u.classList.add('is-refreshed');
        setTimeout(function () { u.classList.remove('is-refreshed'); }, ms('duration-long') + 50);
      }, ms('latency-refresh'));
    });
  }
  d.addEventListener('click', function (e) { if (e.target.closest && e.target.closest('[data-act="refresh-ok"],[data-mo-refresh]')) refresh(); }, true);
  function skeleton(cards, done) {
    cards = cards.filter(function (c) { return !isStatic(c); });
    if (!enabled() || !cards.length) { if (done) done(); return; }
    cards.forEach(function (c) { c.classList.add('is-skeleton'); c.setAttribute('aria-busy', 'true'); });
    setTimeout(function () {
      cards.forEach(function (c) {
        c.classList.remove('is-skeleton'); c.removeAttribute('aria-busy'); c.classList.add('mo-reveal');
        setTimeout(function () { c.classList.remove('mo-reveal'); }, ms('duration-medium') + 50);
      });
      if (done) done();
    }, ms('latency-skeleton'));
  }
  var qs = new URLSearchParams(location.search);
  if (qs.get('loading') === '1') skeleton($$('.cps'));           /* ?loading=1: review flag, shows the card skeleton once on load */

  /* ---- 6. prototype control: Motion  Standard / Slow 2x / Off  (injected into the existing "Prototype controls" panel) ---- */
  function control() {
    var body = $('.proto-panel .pp-body'); if (!body || $('[data-motion-set]', body)) return;
    var g = d.createElement('div'); g.className = 'seg'; g.setAttribute('role', 'group'); g.setAttribute('aria-label', 'Motion');
    [['on', 'Motion: standard'], ['slow', 'Slow 2×'], ['off', 'Off']].forEach(function (p) {
      var b = d.createElement('button'); b.type = 'button'; b.setAttribute('data-motion-set', p[0]); b.setAttribute('aria-pressed', String(mode() === p[0])); b.textContent = p[1];
      b.addEventListener('click', function () { setMode(p[0]); }); g.appendChild(b);
    });
    var n = d.createElement('p'); n.className = 'hx-fine'; n.textContent = 'Motion also via URL: ?motion=off · ?motion=slow · ?motion=on';
    body.appendChild(g); body.appendChild(n);
  }

  /* ---- 7. components.html "Motion" section: replay buttons (prototype chrome) ---- */
  function click(sel, scope) { var el = $(sel, scope || d); if (el) el.click(); }
  var REPLAY = {
    flip: function () {
      var c = $('#moFlip'); if (!c) return; var on = c.getAttribute('data-state') === 'on', w = $('.cps-state', c);
      c.setAttribute('data-state', on ? 'off' : 'on'); w.textContent = on ? 'OFF' : 'ON';
    },
    chips: function () { $$('#moChips .cps-chip').forEach(function (c) { c.hidden = true; }); requestAnimationFrame(function () { $$('#moChips .cps-chip').forEach(function (c) { c.hidden = false; }); }); },
    banner: function () { var b = $('#moBanner'); if (!b) return; b.hidden = true; requestAnimationFrame(function () { b.hidden = false; }); },
    stepper: function () {
      var c = $('#moStep'); if (!c) return; var ol = $('.steps', c), st = $$('.step', c), i = st.findIndex(function (s) { return s.classList.contains('is-current'); });
      if (!ol._init) ol._init = ol.innerHTML;
      if (i < 0 || i >= st.length - 1) { ol.innerHTML = ol._init; return; }
      st[i].classList.remove('is-current'); st[i].classList.add('is-done'); st[i + 1].classList.add('is-current');
      var dot = $('.step-dot', st[i]); if (dot && !$('svg', dot)) dot.innerHTML = '<svg viewBox="0 0 12 12" aria-hidden="true" focusable="false"><path d="M2 6.4 4.8 9.2 10 3"/></svg>';
      var pill = $('.step-pill', st[i + 1]); if (!pill) { pill = d.createElement('span'); pill.className = 'step-pill'; pill.textContent = 'Now'; $('.step-t', st[i + 1]).appendChild(pill); }
      var pd = $('.step-pill', st[i]); if (pd) pd.textContent = 'Done';
    },
    expand: function () { click('#moExp [data-cps-toggle]'); },
    accordion: function () { var s = $('#moAcc > summary'); if (s) s.click(); },
    sheet: function () { var s = $('#moSheet'), sc = $('#moScrim'); if (!s) return; if (s.hidden) { sc.hidden = false; s.hidden = false; } else sheetClose(); },
    refresh: function () { refresh(); },
    skeleton: function () { var c = $('#moSkel'); if (c) skeleton([c]); },
    press: function () { /* demo buttons are real; nothing to replay */ }
  };
  function sheetClose() {
    var s = $('#moSheet'), sc = $('#moScrim'); if (!s || s.hidden) return;
    function fin() { s.hidden = true; sc.hidden = true; }
    if (!enabled()) { fin(); return; }
    var o = opts('long', 'accelerate', { fill: 'both' }), so = getComputedStyle(sc).opacity;
    animate(sc, [{ opacity: so }, { opacity: 0 }], o, null, true);
    animate(s, [{ transform: 'none', opacity: 1 }, { transform: 'translateY(' + len('sheet-offset') + 'px)', opacity: 0 }], o, fin);
  }
  d.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-mo-replay]') : null;
    if (b && REPLAY[b.getAttribute('data-mo-replay')]) { REPLAY[b.getAttribute('data-mo-replay')](b); return; }
    if (e.target.closest && e.target.closest('#moScrim,[data-mo-sheet-close]')) sheetClose();
  });

  d.addEventListener('click', function (e) { var c = e.target.closest ? e.target.closest('[data-mo-chip]') : null; if (c) c.setAttribute('aria-pressed', String(c.getAttribute('aria-pressed') !== 'true')); });

  win.Motion = { EXCLUDE: EXCLUDE, isStatic: isStatic, enabled: enabled, ms: ms, ease: ease, mode: mode, setMode: setMode, refresh: refresh, skeleton: skeleton };
  function init() { mount(); control(); setMode(mode()); }
  if (d.readyState === 'loading') d.addEventListener('DOMContentLoaded', init); else init();
  if (d.readyState === 'complete') watch(); else win.addEventListener('load', function () { setTimeout(watch, 0); });
})();
