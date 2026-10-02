/*! CONH hi-fi — Outage Dashboard Hierarchy v0.03 behaviours. Static, no build step, no dependencies.
   Everything below runs AFTER first paint (deferred). Core answer is already in the HTML. */
(function () {
  'use strict';

  /* ==== PLACEHOLDERS: the ONE place to change unresolved values. Mirrors open-items.md. ====
     HTML has the same strings baked in for no-JS; this block overwrites every [data-ph="key"] on load. */
  var HX_CONFIG = {
  "searchPosition": "above-status",
  "advisoryPosition": "below-status",
  "advisoryActive": "on",
  "bannerPosition": "below-status",
  "lookbackDays": "7",
  "refreshCadence": "May lag ~15–20 min",
  "forecastSource": "Forecast source not confirmed",
  "s7Temp": "Your power is back on. The PSPS event is not over yet.",
  "s7Before": [
    "Weather in your area must improve to safe levels.",
    "SCE must inspect and clear the lines in the affected area.",
    "SCE will confirm when the event has ended."
  ],
  "s7Safety": [
    "Power can go off again while lines are re-energized.",
    "Treat every downed wire as energized. Stay away and keep others away.",
    "Keep backup power and medical equipment ready."
  ],
  "pspsDuration": "About 24–48 hours",
  "guestNoAddress": "Enter a service address, outage #, or meter # to check status.",
  "outOfTerritory": "That address looks like it is outside SCE’s service area. Check with your local utility.",
  "newScenarioNote": "NEW 1 / NEW 2 working draft, not yet in Scenarios doc",
  "needsAttention": "Needs attention = Active Outage + Planned Outage"
};
  window.HX_CONFIG = HX_CONFIG;

  var HX_PROPS = (window.HUB_DATA ? Object.keys(HUB_DATA.props).map(function (k) { var p = HUB_DATA.props[k]; return { id: p.id, addr: p.full }; }).concat([{ id: HUB_DATA.disc.id, addr: HUB_DATA.disc.full }]) : []);
  var d = document, root = d.documentElement;
  var q = new URLSearchParams(location.search);
  function $(s, r) { return (r || d).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || d).querySelectorAll(s)); }
  function store(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) {} return null; }
  function snack(msg) {
    var s = d.createElement('div'); s.className = 'hx-snack'; s.setAttribute('role', 'status'); s.textContent = msg; d.body.appendChild(s);
    setTimeout(function () { s.remove(); }, 2600);
  }

  /* ---- placeholders -> text ---- */
  $$('[data-ph]').forEach(function (el) {
    var k = el.getAttribute('data-ph'), v = HX_CONFIG[k]; if (v == null || Array.isArray(v)) return;
    var t = $('.ph-t', el); if (t) t.textContent = v;
  });
  $$('[data-ph-list]').forEach(function (ul) {
    var v = HX_CONFIG[ul.getAttribute('data-ph-list')]; if (!Array.isArray(v)) return;
    ul.innerHTML = ''; v.forEach(function (x) { var li = d.createElement('li'); li.textContent = x; ul.appendChild(li); });
  });

  /* ---- frame chip dismiss (was inline on every page) ---- */
  var chip = $('.frame-chip');
  if (chip) {
    var b = $('.dismiss', chip); if (b) b.addEventListener('click', function () { chip.hidden = true; });
    root.style.setProperty('--hx-chip-h', chip.offsetHeight + 'px');
  }

  /* ---- audience memory (nav "Outage Center" goes to the right home) ---- */
  var aud = root.getAttribute('data-aud');
  var qa = q.get('aud');
  if (qa) { aud = qa; }
  if (aud === 'guest' || aud === 'signed' || aud === 'multi') store('conh_aud', aud);
  var home = { guest: 'F0-hub-home.html', signed: 'F0-signed.html', multi: 'F0-multi.html' }[store('conh_aud') || 'guest'];
  $$('a[data-nav-home]').forEach(function (a) { a.setAttribute('href', home); });

  /* ---- pending badge (F0 guest / F1) — unchanged behaviour ---- */
  try {
    if (q.get('pending') === '1') store('conh_pending', '1');
    if (store('conh_pending') === '1') { var pb = $('#pendingBadge'); if (pb) pb.classList.add('show'); }
  } catch (e) {}

  /* ---- came from portfolio: header gets a "‹ Portfolio" back link ---- */
  var prop = q.get('prop');
  if (q.get('from') === 'pf') {
    var tt = $('.ut-title');
    if (tt && !$('.ut-back', tt)) {
      var a = d.createElement('a'); a.href = 'F7-portfolio.html'; a.className = 'ut-back'; a.setAttribute('data-back', '');
      a.innerHTML = '<svg viewBox="0 0 10 14" aria-hidden="true" focusable="false"><path d="M8 1 2 7l6 6"/></svg>Portfolio';
      tt.appendChild(a);
    }
  }

  /* ==== S2: ERT change in place / refresh-failed / Medical Baseline / lookback / PSPS variant ==== */
  function setF(name, v) { $$('[data-f="' + name + '"]').forEach(function (e) { e.textContent = v; }); }
  function showErtChange(was, now) {
    var note = $('#ertNote'), ert = $('#hxErt'); if (!note || !ert) return;
    if (now) setF('ertText', now);
    setF('ertWas', was); note.hidden = false;
    ert.classList.remove('ert-flash'); void ert.offsetWidth; ert.classList.add('ert-flash');
  }
  function setStale(on) {
    var st = $('#hxStale'), hero = $('#activeHero'); if (!st) return;
    st.hidden = !on; if (hero) { if (on) hero.setAttribute('data-stale', '1'); else hero.removeAttribute('data-stale'); }
    $$('[data-act="refresh-fail"],[data-act="refresh-ok"]').forEach(function (b) {
      if (b.closest('.seg')) b.setAttribute('aria-pressed', String((b.getAttribute('data-act') === 'refresh-fail') === on));
    });
    if (!on) snack('Refreshed. Last updated ' + ($('[data-f="updated"]') ? $('[data-f="updated"]').textContent : 'just now'));
  }
  function setMB(on) {
    if (on) root.setAttribute('data-mb', '1'); else root.removeAttribute('data-mb');
    $$('[data-act="mb-on"],[data-act="mb-off"]').forEach(function (b) { b.setAttribute('aria-pressed', String((b.getAttribute('data-act') === 'mb-on') === on)); });
  }
  function setPsps(v) {
    if (v) root.setAttribute('data-psps', v); else root.removeAttribute('data-psps');
    var m = { 'psps-none': '', 'psps-temp': 'temp', 'psps-ended': 'ended' };
    $$('[data-act^="psps-"]').forEach(function (b) { b.setAttribute('aria-pressed', String(m[b.getAttribute('data-act')] === (v || ''))); });
    var t = $('[data-f="s9title"]'), tm = $('[data-f="s9time"]'), du = $('[data-f="s9dur"]');
    if (v === 'temp' && t) { t.textContent = 'Power temporarily restored'; }
    else if (v === 'ended' && t) { t.textContent = 'Power restored · PSPS event ended'; }
    else if (t) { t.textContent = 'Power restored'; }
  }
  d.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-act]') : null; if (!t) return;
    var a = t.getAttribute('data-act');
    if (a === 'ert-change') {
      setF('ertText', 'Back by 2:30 PM'); var n = $('#ertNote'); if (n) n.hidden = true;
      snack('Estimate refreshing…');
      setTimeout(function () { showErtChange(HUB_DATA.outage.ert_was, 'Back by ' + HUB_DATA.outage.ert); }, 900);
    } else if (a === 'refresh-fail') setStale(true);
    else if (a === 'refresh-ok') setStale(false);
    else if (a === 'mb-on') setMB(true);
    else if (a === 'mb-off') setMB(false);
    else if (a === 'lookback-toggle') {
      var ex = root.getAttribute('data-lookback') === 'expired';
      if (ex) root.removeAttribute('data-lookback'); else root.setAttribute('data-lookback', 'expired');
      t.textContent = ex ? 'Simulate restored > lookback window' : 'Restore earlier outage row';
    } else if (a && a.indexOf('psps-') === 0) setPsps({ 'psps-none': '', 'psps-temp': 'temp', 'psps-ended': 'ended' }[a]);
    else if (a === 'ics') {
      var s = t.getAttribute('data-start'), en = t.getAttribute('data-end'), ti = t.getAttribute('data-title');
      var ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//SCE Outage Hub prototype//EN', 'BEGIN:VEVENT', 'UID:' + s + '@conh-prototype',
        'DTSTAMP:' + s + 'Z', 'DTSTART:' + s, 'DTEND:' + en, 'SUMMARY:' + ti, 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
      try {
        var blob = new Blob([ics], { type: 'text/calendar' }), u = URL.createObjectURL(blob), l = d.createElement('a');
        l.href = u; l.download = 'sce-outage.ics'; d.body.appendChild(l); l.click(); l.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 500);
      } catch (x) {}
      snack('Calendar file created (prototype)');
    }
  });
  d.addEventListener('change', function (e) {
    var t = e.target; if (t.matches && t.matches('input[data-act="remind"]')) snack(t.checked ? 'Reminder on (prototype)' : 'Reminder off');
  });
  if (q.get('ert') === 'changed') showErtChange(HUB_DATA.outage.ert_was);
  if (q.get('state') === 'refresh-failed') setStale(true);
  if (q.get('mb') === '1') setMB(true);
  if (q.get('lookback') === 'expired') root.setAttribute('data-lookback', 'expired');
  if (q.get('psps')) setPsps(q.get('psps') === 'temp' ? 'temp' : q.get('psps') === 'ended' ? 'ended' : '');
  else if (root.getAttribute('data-page') === 's9') setPsps('');

  /* ==== S11: weather / detail content lazy-loaded after the core answer, off the critical path ==== */
  /* all values come from hub-data.js (window.HUB_DATA.weather), the single data source */
  var HW = HUB_DATA.weather;
  function wxOf(k) { var w = HW[k]; return { c: [[w.temp, 'Temp'], [w.hum, 'Humidity'], [w.wind, 'Wind']], note: w.note }; }
  var WX = { pasadena: wxOf('pasadena'), santaclarita: wxOf('santaclarita'), agoura: wxOf('agoura'), glendale: wxOf('glendale'), forecast: { c: HW.forecast, note: null } };
  function loadWeather() {
    $$('[data-lazy-weather]').forEach(function (h) {
      if (h.getAttribute('data-loaded')) return; var k = h.getAttribute('data-lazy-weather'), w = WX[k] || WX.pasadena;
      var g = '<div class="wx-grid">' + w.c.map(function (x) { return '<div><b>' + x[0] + '</b>' + x[1] + '</div>'; }).join('') + '</div>';
      var extra = (k === 'forecast')
        ? '<p class="hx-fine" style="margin-top:8px">Multi-day forecast: <span data-ph="forecastSource"><span class="ph-t">' + HX_CONFIG.forecastSource + '</span> <span class="ph-tag">Placeholder</span></span>. Government warnings appear only from an approved source.</p>'
        : '<p class="hx-fine" style="margin-top:8px">' + w.note + '</p><p class="hx-fine">Multi-day forecast: <span data-ph="forecastSource"><span class="ph-t">' + HX_CONFIG.forecastSource + '</span> <span class="ph-tag">Placeholder</span></span></p>';
      h.innerHTML = g + extra; h.setAttribute('data-loaded', '1');
    });
  }
  (window.requestIdleCallback || function (f) { return setTimeout(f, 600); })(function () { setTimeout(loadWeather, 300); });
  $$('details[data-lazy]').forEach(function (x) { x.addEventListener('toggle', loadWeather); });

  /* ==== S3/S4/S5: Report flow ==== */
  if (root.getAttribute('data-page') === 'f5' || root.getAttribute('data-page') === 'f5c' || d.body.getAttribute('data-page') === 'f5' || d.body.getAttribute('data-page') === 'f5c') {
    var page = d.body.getAttribute('data-page');
    var ra = q.get('aud') || store('conh_aud') || 'guest';
    root.setAttribute('data-aud', ra === 'guest' ? 'guest' : ra);
    var intent = q.get('intent') || 'power';
    function setIntent(v, moved) {
      root.setAttribute('data-intent', v); var f = $('#intentField'); if (f) f.value = v;
      var r = $('input[name="intent"][value="' + v + '"]'); if (r) r.checked = true;
      var meta = $('#rptMeta'); if (meta) meta.textContent = { power: 'Power outage', downed: 'Downed power line', hazard: 'Other hazard' }[v];
      var nav = $('.hub-nav'); if (nav) nav.setAttribute('data-report', 'safety');
      var det = $('#hxDetect'); if (det) det.hidden = !moved;
      var sb = $('#submitBtn'); if (sb) sb.textContent = v === 'downed' ? 'Send downed line report' : 'Submit report';
      var opt = $('.only-opt'); if (opt) opt.textContent = v === 'downed' ? '' : '(optional)';
      if (v === 'downed') { var h = $('#dlSafety'); if (h) h.setAttribute('aria-live', 'assertive'); }
      store('conh_intent', v);
    }
    if (page === 'f5') {
      var af = $('#audField'); if (af) af.value = ra;
      var sel = $('#propSel');
      if (sel) {
        var list = ra === 'multi' ? HX_PROPS : HX_PROPS.filter(function (p) { return HUB_DATA.report_props.signed.indexOf(p.id) > -1; });
        list.forEach(function (p) { var o = d.createElement('option'); o.value = p.id; o.textContent = p.addr; sel.appendChild(o); });
        var want = q.get('prop') || 'maple'; if (!list.some(function (p) { return p.id === want; })) want = list[0].id; sel.value = want;
      }
      setIntent(intent, false);
      $$('input[name="intent"]').forEach(function (r) { r.addEventListener('change', function () { setIntent(r.value, false); }); });
      $$('[data-pick]').forEach(function (b) { b.addEventListener('click', function (e) { if (b.tagName === 'A') e.preventDefault(); setIntent(b.getAttribute('data-pick'), false); window.scrollTo(0, 0); }); });
      $$('input[name="wire"]').forEach(function (r) {
        r.addEventListener('change', function () { if (r.value === 'yes' && r.checked) { setIntent('downed', true); window.scrollTo(0, 0); } });
      });
      var hint = $('#breakerHint');
      $$('input[name="breaker"]').forEach(function (r) { r.addEventListener('change', function () { if (hint) hint.hidden = !(r.value === 'yes' && r.checked); }); });
      var from = q.get('from'); if (from === 's3') { var nv = $('.hub-nav'); if (nv) nv.setAttribute('data-report', 'safety'); }
      var form = $('#rptForm');
      if (form) form.addEventListener('submit', function () { try { var p = sel && sel.options[sel.selectedIndex]; store('conh_rpt_addr', p ? p.textContent : ($('#loc') ? $('#loc').value : '')); } catch (x) {} });
    } else {
      setIntent(q.get('intent') || 'power', false);
      var addr = store('conh_rpt_addr') || q.get('loc') || HUB_DATA.props.maple.full;
      var it = q.get('intent') || 'power';
      var det = $('#cfDetail'), tt = $('#cfTitle');
      if (det) det.textContent = ({ power: 'Power out at ', downed: 'Downed power line at ', hazard: 'Hazard reported at ' })[it] + addr;
      if (tt && it === 'downed') tt.textContent = 'SCE has your downed line report';
      var lag = $('#cfLag'); if (lag && it !== 'power') lag.textContent = 'Keep everyone away from the line. SCE may call the number you gave.';
      var sb = $('#backStatus'); if (sb && ra !== 'guest') sb.setAttribute('href', ra === 'multi' ? 'F7-portfolio.html' : 'S1-active.html');
      /* F5-confirm updates block (was inline) */
      var en = $('#updatesEnable'), body = $('#updatesBody'), skip = $('#updatesSkip');
      if (en && body) en.addEventListener('change', function () { body.hidden = !en.checked; });
      if (skip && en && body) skip.addEventListener('click', function () { en.checked = false; body.hidden = true; });
      $$('.ub-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
          $$('.ub-tab').forEach(function (x) { x.classList.toggle('on', x === tab); x.setAttribute('aria-selected', x === tab ? 'true' : 'false'); });
          var ph = $('#ubPhone'), em = $('#ubEmail'); if (!ph || !em) return; var isP = tab.getAttribute('data-ch') === 'phone'; ph.hidden = !isP; em.hidden = isP;
        });
      });
      var hint2 = $('#breakerHint');
      $$('input[name="breaker"]').forEach(function (r) { r.addEventListener('change', function () { if (hint2) hint2.hidden = !(r.value === 'yes' && r.checked); }); });
      store('conh_pending', '1');
    }
  }

  /* ==== S8: guest Outage Search (mock resolver) ==== */
  if (d.body.getAttribute('data-page') === 'f1') {
    var inp = $('.hx-search input'), term = (q.get('q') || '').trim();
    if (inp && term) inp.value = term;
    var key = 'maple', low = term.toLowerCase(), gmatch = null;
    /* guest lookups outside the signed-in portfolio (Orange, Riverside, Tulare, Kern, Ventura counties) come from HUB_DATA.guest */
    function guestMatch(t) {
      var g = HUB_DATA.guest, k, city, street;
      for (k in g) { city = g[k].full.split(',')[1].trim().toLowerCase(); street = g[k].short.split(' ')[1].toLowerCase();
        if (t.indexOf(city) > -1 || t.indexOf(street) > -1 || t.indexOf(g[k].full.slice(-5)) > -1) return g[k]; }
      return null;
    }
    if (term) {
      if (/maple/.test(low)) key = 'maple';
      else if (/elm/.test(low)) key = 'elm';
      else if (/canyon|santa clarita/.test(low)) key = 'canyon';
      else if ((gmatch = guestMatch(low))) key = 'on';
      else if (/^out[-\s]?\d|outage/.test(low) || low.indexOf(HUB_DATA.prior.id.slice(-6)) > -1) key = 'restored';
      else if (/^\d{5,}$/.test(low.replace(/\s/g, ''))) key = 'area';
      else if (/brooklyn|new york|ny\b|chicago|texas|seattle|portland|las vegas|phoenix/.test(low)) key = 'oot';
      else key = 'none';
    }
    if (gmatch) { var oc = $('[data-result="on"]'); if (oc) { oc.setAttribute('data-label', gmatch.full); $$('.cps-addr', oc).forEach(function (a) { a.textContent = gmatch.full; }); } }
    $$('[data-result]').forEach(function (x) { x.hidden = x.getAttribute('data-result') !== key; });
    var cur = $('[data-result="' + key + '"]'), lab = $('#gsLabel');
    if (cur && lab) lab.textContent = cur.getAttribute('data-label');
    var gr = $('#gsResolved'); if (gr && cur && cur.hasAttribute('data-area')) gr.firstChild.textContent = 'Approximate match: ';
    $$('.gs-try button').forEach(function (bt) { bt.addEventListener('click', function () { location.href = 'F1-lookup-result.html?q=' + encodeURIComponent(bt.getAttribute('data-q')); }); });
  }

  /* ==== S10: portfolio — filter / search / sort / group / paginate / scroll restore ==== */
  var list = $('#pfList');
  if (list) {
    var tiles = $$('a.pf-tile', list), PER = 6, pageNo = 1;
    var st = { f: {}, s: 'attention', g: false, p: true, q: '' };
    try { var saved = JSON.parse(store('conh_pf') || 'null'); if (saved) st = Object.assign(st, saved.st || {}); } catch (e) {}
    var rank = { active: 0, planned: 1, restored: 2, on: 3 };
    function render() {
      var qq = st.q.toLowerCase();
      var vis = tiles.filter(function (t) {
        var on = Object.keys(st.f).filter(function (k) { return st.f[k]; });
        return (!on.length || on.indexOf(t.dataset.state) > -1) && (!qq || t.dataset.addr.indexOf(qq) > -1);
      });
      vis.sort(function (a, b) {
        if (st.s === 'address') return a.dataset.addr.localeCompare(b.dataset.addr, undefined, { numeric: true });
        return rank[a.dataset.state] - rank[b.dataset.state] || (+a.dataset.rank) - (+b.dataset.rank);
      });
      if (st.g) vis.sort(function (a, b) { return a.dataset.zip.localeCompare(b.dataset.zip); });
      var pages = st.p ? Math.max(1, Math.ceil(vis.length / PER)) : 1; if (pageNo > pages) pageNo = pages;
      var shown = st.p ? vis.slice((pageNo - 1) * PER, pageNo * PER) : vis;
      $$('.pf-group', list).forEach(function (g) { g.remove(); });
      tiles.forEach(function (t) { t.hidden = shown.indexOf(t) < 0; });
      var last = null; shown.forEach(function (t) {
        if (st.g && t.dataset.zip !== last) { var h = d.createElement('div'); h.className = 'pf-group'; h.textContent = 'ZIP ' + t.dataset.zip; list.appendChild(h); last = t.dataset.zip; }
        list.appendChild(t);
      });
      var em = $('#pfEmpty'); if (em) em.hidden = vis.length > 0;
      var pg = $('#pfPg'); if (pg) { pg.hidden = !st.p || pages < 2; $('#pfPgLab').textContent = 'Page ' + pageNo + ' of ' + pages; $('#pfPrev').disabled = pageNo <= 1; $('#pfNext').disabled = pageNo >= pages; }
      $$('[data-filter]').forEach(function (b) { b.setAttribute('aria-pressed', String(!!st.f[b.dataset.filter])); });
      $$('[data-sort]').forEach(function (b) { b.setAttribute('aria-pressed', String(st.s === b.dataset.sort)); });
      var g = $('#pfGroup'); if (g) g.setAttribute('aria-pressed', String(st.g)); var p = $('#pfPage'); if (p) p.setAttribute('aria-pressed', String(st.p));
      var qi = $('#pfQ'); if (qi && qi.value !== st.q) qi.value = st.q;
    }
    function save() { store('conh_pf', JSON.stringify({ st: st })); }
    $$('[data-filter]').forEach(function (b) { b.addEventListener('click', function () { st.f[b.dataset.filter] = !st.f[b.dataset.filter]; pageNo = 1; save(); render(); }); });
    $$('[data-sort]').forEach(function (b) { b.addEventListener('click', function () { st.s = b.dataset.sort; save(); render(); }); });
    var gb = $('#pfGroup'); if (gb) gb.addEventListener('click', function () { st.g = !st.g; save(); render(); });
    var pb2 = $('#pfPage'); if (pb2) pb2.addEventListener('click', function () { st.p = !st.p; pageNo = 1; save(); render(); });
    var qi = $('#pfQ'); if (qi) qi.addEventListener('input', function () { st.q = qi.value; pageNo = 1; save(); render(); });
    var pv = $('#pfPrev'), nx = $('#pfNext'); if (pv) pv.addEventListener('click', function () { pageNo--; render(); }); if (nx) nx.addEventListener('click', function () { pageNo++; render(); });
    var savedPos = null; try { savedPos = JSON.parse(store('conh_pf') || 'null'); } catch (e) {}
    if (savedPos && savedPos.page) pageNo = savedPos.page;
    render();
    list.addEventListener('click', function (e) {
      var a = e.target.closest('a.pf-tile'); if (!a) return;
      store('conh_pf', JSON.stringify({ st: st, page: pageNo, y: window.scrollY, id: a.dataset.id }));
    });
    function restore() {
      try {
        var s = JSON.parse(store('conh_pf') || 'null');
        if (s && typeof s.y === 'number' && s.y > 0) { window.scrollTo(0, s.y); s.y = 0; store('conh_pf', JSON.stringify(s)); }
      } catch (e) {}
    }
    requestAnimationFrame(function () { requestAnimationFrame(restore); });
    window.addEventListener('pageshow', function (e) { if (e.persisted) restore(); });
  }
})();
