/*! CONH hi-fi — Round 1 status component behaviours (menu, View/Hide Details, advisory position).
   Static, deferred, no dependencies. Core answer is already in the HTML (no-JS shows the default state). */
(function () {
  'use strict';
  var d = document, root = d.documentElement;
  var q = new URLSearchParams(location.search);
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  var CFG = window.HX_CONFIG || {};
  var CFG_COPY = (window.HUB_DATA && HUB_DATA.copy) || {};   /* ut10: customer-facing copy from hub-data.js */

  /* ---- Heat Advisory position: ONE config value, HX_CONFIG.advisoryPosition (hierarchy.js header).
          'below-status' (default) | 'above-search' (screen 05) | 'below-buttons' (screen 01).
          ?adv=<value> overrides for review. Advisory shows only when active: HX_CONFIG.advisoryActive / ?advisory=off. ---- */
  var POS = ['below-status', 'above-search', 'below-buttons'];
  var pa = q.get('adv');                                   /* ?adv= is a POSITION value, or the on/off override (below) */
  var pos = POS.indexOf(pa) > -1 ? pa : (CFG.advisoryPosition || 'below-status');
  /* ?view=01 / ?view=05 reproduce tested screens 01 (expanded, advisory below buttons) and 05 (collapsed, advisory above search) */
  var view = q.get('view');
  if (view === '01') pos = 'below-buttons'; else if (view === '05') pos = 'above-search';
  if (POS.indexOf(pos) < 0) pos = 'below-status';
  /* ---- Search position: ONE config value, HX_CONFIG.searchPosition (hierarchy.js header).
          'above-status' (default: header, search, status card, advisory, buttons) | 'below-advisory' (round-2 status-first order).
          ?search=below (or below-advisory) / ?search=above overrides for review. ---- */
  var sq = q.get('search'), spos = CFG.searchPosition || 'above-status';
  if (sq === 'below' || sq === 'below-advisory') spos = 'below-advisory'; else if (sq === 'above' || sq === 'above-status') spos = 'above-status';
  if (spos !== 'below-advisory') spos = 'above-status';
  var main = $('.ut-main');
  var banner = q.get('banner') || CFG.bannerPosition || 'below-status';
  $$('.ut-main').forEach(function (m) { m.setAttribute('data-search', spos); m.setAttribute('data-adv', pos); m.setAttribute('data-banner', banner); });
  /* ---- Advisory row ON/OFF (round 5). One mode value on <html data-advisory>:
          'auto' = each page's own scenario flag (HUB_DATA.advisory, baked as data-scn on the row) | 'on' = force shown | 'off' = force hidden.
          Precedence: ?advisory=auto|on|off  >  ?adv=on|off  >  prototype control (click)  >  HX_CONFIG.advisoryActive ('auto' default). ---- */
  var MODES = ['auto', 'on', 'off'];
  function mode_(v) { return MODES.indexOf(v) > -1 ? v : null; }
  var amode = mode_(q.get('advisory')) || mode_(q.get('adv')) || mode_(CFG.advisoryActive) || 'auto';
  root.setAttribute('data-advisory', amode);
  /* F1: the row follows the shown lookup result (Maple heat, Canyon Red Flag; others none) */
  var rk = root.getAttribute('data-result-key');
  if (rk && window.HUB_DATA && HUB_DATA.advisory && HUB_DATA.advisory.f1) {
    var sp = HUB_DATA.advisory.f1[rk], row = $('.adv[data-scn]');
    if (sp && row) {
      var wk = sp.key && sp.key.indexOf('{guest}') > -1 ? 'g_' + root.getAttribute('data-guest-key') : sp.key, w = wk && HUB_DATA.weather[wk];
      row.setAttribute('data-scn', !w ? 'none' : (sp.active ? 'on' : 'off')); row.setAttribute('data-kind', sp.kind);
      if (w) {
        var t = $('.adv-t', row); if (t) t.innerHTML = '<b>' + w.title + '</b> \u00b7 Fire risk: ' + w.risk;
        var nt = $('.adv-note', row); if (nt) nt.textContent = (sp.kind !== 'none' && w.banner) ? w.banner : '';
        var lz = $('[data-lazy-weather]', row); if (lz) { lz.setAttribute('data-lazy-weather', wk); lz.removeAttribute('data-loaded'); lz.innerHTML = '<div class="lazy-skel" role="status">Loading conditions\u2026</div>'; if (row.open) row.dispatchEvent(new Event('toggle')); }
      }
    }
  }
  function syncPosButtons() {
    $$('[data-adv-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-adv-set') === (main && main.getAttribute('data-adv')))); });
    $$('[data-advisory-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-advisory-set') === root.getAttribute('data-advisory'))); });
    $$('[data-search-set]').forEach(function (b) { b.setAttribute('aria-pressed', String(b.getAttribute('data-search-set') === (main && main.getAttribute('data-search')))); });
  }
  d.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('[data-adv-set],[data-advisory-set],[data-search-set]') : null; if (!b) return;
    if (b.hasAttribute('data-adv-set')) $$('.ut-main').forEach(function (m) { m.setAttribute('data-adv', b.getAttribute('data-adv-set')); });
    if (b.hasAttribute('data-search-set')) $$('.ut-main').forEach(function (m) { m.setAttribute('data-search', b.getAttribute('data-search-set')); });
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
      var l = $('.lbl', b); if (l) l.textContent = open ? (b.getAttribute('data-open') || CFG_COPY.toggle_open) : (b.getAttribute('data-closed') || CFG_COPY.toggle_closed);
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
    var row = t.closest('.hx-status-group-row'); if (row) row.setAttribute('data-state', open ? 'expanded' : 'collapsed');   /* ut15 StatusGroupRow state */
  });
  /* Show Less / Show More for the address list */
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-ut-less]') : null; if (!t) return;
    var list = d.getElementById(t.getAttribute('data-ut-less')); if (!list) return;
    var less = list.getAttribute('data-less') !== '1';
    list.setAttribute('data-less', less ? '1' : '0');
    var keep = +(list.getAttribute('data-keep') || 3);   /* ut16: Hub/StatusGroup keeps row 1 (data-keep="1"); other lists keep 3 */
    $$(':scope > li', list).forEach(function (li, i) { li.hidden = less && i >= keep; });
    t.setAttribute('aria-expanded', String(!less));
    var l = $('.lbl', t); if (l) l.textContent = less ? t.getAttribute('data-all') : t.getAttribute('data-fewer');
    /* ut15 Hub/StatusGroup: collapsing (Show fewer) moves focus to the group heading (h2.hx-sg-h, tabindex=-1); expanding keeps it on the toggle */
    var g = t.closest('.hx-status-group'), gh = g && $('.hx-sg-h', g);
    if (less && gh) gh.focus({ preventScroll: true });
  });

  /* ---- ut15 Hub/StatusGroup URL state (replaceState, no history entries); ut16: defaults now differ per element (row 1 starts expanded), so
          ?sg-open=<ids>  the toggles (address-row bodies + Likely/Potential row lists) that are open. Present = authoritative: every StatusGroup toggle
                          not listed is closed on load. Absent = the server-rendered Figma defaults. Written only when it differs from the defaults.
          ?sg-less=<ids>  address lists collapsed with Show fewer
          Restored on load without moving focus. Only elements inside .hx-status-group take part. ---- */
  var SGS = $$('.hx-status-group');
  if (SGS.length) {
    var csv = function (k) { return (q.get(k) || '').split(',').filter(Boolean); };
    var sgToggles = function () { var a = []; SGS.forEach(function (g) { a = a.concat($$('[data-ut-toggle]', g)); }); return a; };
    var setT = function (b, open) {
      var el = d.getElementById(b.getAttribute('data-ut-toggle')); if (!el) return;
      el.hidden = !open; b.setAttribute('aria-expanded', String(open));
      var rw = b.closest('.hx-status-group-row'); if (rw && rw.contains(el)) rw.setAttribute('data-state', open ? 'expanded' : 'collapsed');
      var bl = $('.lbl', b); if (bl) bl.textContent = b.getAttribute(open ? 'data-open' : 'data-closed');
    };
    var sgOpenNow = function () { return sgToggles().filter(function (b) { return b.getAttribute('aria-expanded') === 'true'; }).map(function (b) { return b.getAttribute('data-ut-toggle'); }); };
    var SG_DEFAULT = sgOpenNow().join(',');
    if (q.has('sg-open')) {
      var want = csv('sg-open');
      sgToggles().forEach(function (b) { setT(b, want.indexOf(b.getAttribute('data-ut-toggle')) >= 0); });
    }
    csv('sg-less').forEach(function (id) {
      var list = d.getElementById(id), b = $('[data-ut-less="' + id + '"]'); if (!list || !b || !list.closest('.hx-status-group')) return;
      var keep = +(list.getAttribute('data-keep') || 3);
      list.setAttribute('data-less', '1'); $$(':scope > li', list).forEach(function (li, i) { li.hidden = i >= keep; });
      b.setAttribute('aria-expanded', 'false'); var bl = $('.lbl', b); if (bl) bl.textContent = b.getAttribute('data-all');
    });
    var sgSync = function () {
      if (!window.history || !history.replaceState || !window.URL) return;
      var open = sgOpenNow().join(','), less = [];
      SGS.forEach(function (g) { $$('.cps-list[data-less="1"]', g).forEach(function (l) { less.push(l.id); }); });
      var u = new URL(location.href);
      if (open !== SG_DEFAULT) u.searchParams.set('sg-open', open); else u.searchParams.delete('sg-open');
      if (less.length) u.searchParams.set('sg-less', less.join(',')); else u.searchParams.delete('sg-less');
      if (u.href !== location.href) history.replaceState(history.state, '', u.href);
    };
    d.addEventListener('click', function (e) {
      var t = e.target.closest ? e.target.closest('[data-ut-toggle],[data-ut-less]') : null;
      if (t && t.closest('.hx-status-group')) sgSync();
    });
    /* ut16 Find an address: the trailing clear button (Figma Close glyph) shows once there is text; it clears and returns focus to the field */
    $$('.hx-status-group .cps-find').forEach(function (f) {
      var inp = $('input', f), clr = $('.hx-sg-clear', f); if (!inp || !clr) return;
      var upd = function () { clr.hidden = !inp.value; };
      inp.addEventListener('input', upd); upd();
      clr.addEventListener('click', function () { inp.value = ''; upd(); inp.focus(); });
    });
  }
})();
