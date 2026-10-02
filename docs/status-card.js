/*! CONH hi-fi — Round 1 status component behaviours (menu, Show/Hide Details, advisory position).
   Static, deferred, no dependencies. Core answer is already in the HTML (no-JS shows the default state). */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var q = new URLSearchParams(location.search);
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  var CFG = window.HX_CONFIG || {};

  /* ---- Heat Advisory position: ONE config value, HX_CONFIG.advisoryPosition (hierarchy.js header).
          'below-status' (default) | 'above-search' (screen 05) | 'below-buttons' (screen 01).
          ?adv=<value> overrides for review. Advisory shows only when active: HX_CONFIG.advisoryActive / ?advisory=off. ---- */
  var POS = ['below-status', 'above-search', 'below-buttons'];
  var pos = q.get('adv') || CFG.advisoryPosition || 'below-status';
  /* ?view=01 / ?view=05 reproduce tested screens 01 (expanded, advisory below buttons) and 05 (collapsed, advisory above search) */
  var view = q.get('view');
  if (view === '01') pos = 'below-buttons'; else if (view === '05') pos = 'above-search';
  if (POS.indexOf(pos) < 0) pos = 'below-status';
  var main = $('.ut-main');
  var banner = q.get('banner') || CFG.bannerPosition || 'below-status';
  $$('.ut-main').forEach(function (m) { m.setAttribute('data-adv', pos); m.setAttribute('data-banner', banner); });
  var act = q.get('advisory');
  if (act === 'off' || (act == null && CFG.advisoryActive === 'off')) root.setAttribute('data-advisory', 'off');
  else root.setAttribute('data-advisory', 'on');
  function syncPosButtons() {
    $$('[data-adv-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-adv-set') === (main && main.getAttribute('data-adv')))); });
    $$('[data-advisory-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-advisory-set') === root.getAttribute('data-advisory'))); });
  }
  d.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-adv-set],[data-advisory-set]') : null; if (!b) return;
    if (b.hasAttribute('data-adv-set')) $$('.ut-main').forEach(function (m) { m.setAttribute('data-adv', b.getAttribute('data-adv-set')); });
    if (b.hasAttribute('data-advisory-set')) root.setAttribute('data-advisory', b.getAttribute('data-advisory-set'));
    syncPosButtons();
  });
  syncPosButtons();

  /* ---- gallery-only demo switches (the map page binds its own in map.js) ---- */
  $$('.ut-sw[data-demo]').forEach(function (b) { b.addEventListener('click', function () { b.setAttribute('aria-checked', String(b.getAttribute('aria-checked') !== 'true')); }); });

  /* ---- hamburger menu ---- */
  var burger = $('.ut-burger'), menu = $('.ut-menu');
  if (burger && menu) {
    function setMenu(on) { menu.hidden = !on; burger.setAttribute('aria-expanded', String(on)); }
    burger.addEventListener('click', function (e) { e.stopPropagation(); setMenu(menu.hidden); });
    d.addEventListener('click', function (e) { if (!menu.hidden && !menu.contains(e.target)) setMenu(false); });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !menu.hidden) { setMenu(false); burger.focus(); } });
    var hm = (window.HX_HOME || null); /* Outage Center link follows audience memory (hierarchy.js) */
  }

  /* ---- search clear (X) ---- */
  $$('.ut-search .ut-x').forEach(function (x) {
    x.addEventListener('click', function () { var i = $('input', x.parentNode); if (i) { i.value = ''; i.focus(); } });
  });

  /* ---- CPS expand / collapse: collapsed = current step only; expanded = all five ---- */
  function setExp(card, open) {
    card.setAttribute('data-exp', open ? '1' : '0');
    $$('[data-cps-toggle]', card).forEach(function (b) {
      b.setAttribute('aria-expanded', String(open));
      var l = $('.lbl', b); if (l) l.textContent = open ? (b.getAttribute('data-open') || 'Hide Details') : (b.getAttribute('data-closed') || 'Show Details');
    });
  }
  if (view === '01' || view === '05') $$('.cps').forEach(function (c) { if ($('[data-cps-toggle]', c)) setExp(c, view === '01'); });
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-cps-toggle]') : null;
    if (!t) return;
    var card = t.closest('.cps'); if (!card) return;
    setExp(card, card.getAttribute('data-exp') !== '1');
  });

  /* ---- generic Show/Hide target (View Details rows, Show Less list) ---- */
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ut-toggle]') : null; if (!t) return;
    var tgt = d.getElementById(t.getAttribute('data-ut-toggle')); if (!tgt) return;
    var open = tgt.hidden; /* hidden -> opening */
    tgt.hidden = !open;
    t.setAttribute('aria-expanded', String(open));
    var l = $('.lbl', t); if (l) l.textContent = open ? t.getAttribute('data-open') : t.getAttribute('data-closed');
  });
  /* Show Less / Show More for the address list */
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ut-less]') : null; if (!t) return;
    var list = d.getElementById(t.getAttribute('data-ut-less')); if (!list) return;
    var less = list.getAttribute('data-less') !== '1';
    list.setAttribute('data-less', less ? '1' : '0');
    $$('li', list).forEach(function (li, i) { li.hidden = less && i >= 3; });
    t.setAttribute('aria-expanded', String(!less));
    var l = $('.lbl', t); if (l) l.textContent = less ? 'Show More' : 'Show Less';
  });
})();
