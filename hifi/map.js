/* F6 interactive map (tested screen 02): Leaflet + four PSPS overlays + legend toggles + control stack.
   Layers (order Active, Potential, Likely, Scheduled): active (red) / potential (circle, orange) / likely (triangle, orange) / scheduled (blue). Toggle changes call fitBounds. */
(function () {
  'use strict';
  var LAYERS = {
    active:    { center: [0, 0], r: 1, color: '#BB0000', fill: 0.22 },
    potential: { center: [0, 0], r: 1, color: '#CC6006', fill: 0.30 },
    likely:    { center: [0, 0], r: 1, color: '#CC6006', fill: 0.22 },
    scheduled: { center: [0, 0], r: 1, color: '#0057D2', fill: 0.22 }
  };
  /* overlay colors = the status icon colors, single-sourced from hub-data.js (HUB_DATA.status_colors) */
  var HC = (window.HUB_DATA && window.HUB_DATA.status_colors) || {};
  Object.keys(LAYERS).forEach(function (k) { if (HC[k]) LAYERS[k].color = HC[k]; });
  /* footprints (center / radius / label) come from hub-data.js (window.HUB_DATA.maplayers): the single data source */
  var HM = (window.HUB_DATA && window.HUB_DATA.maplayers) || {};
  Object.keys(LAYERS).forEach(function (k) { if (HM[k]) { LAYERS[k].center = HM[k].center; LAYERS[k].r = HM[k].r; LAYERS[k].label = HM[k].label; } });
  var ORDER = (window.HUB_DATA && window.HUB_DATA.status_order) || ['active', 'potential', 'likely', 'scheduled'];
  var on = { active: true, potential: false, likely: false, scheduled: false };
  var groups = {}, map = null, ok = false;
  var canvas = document.getElementById('mapCanvas');
  var legend = document.getElementById('mapLegend');

  function switches() { return Array.prototype.slice.call(document.querySelectorAll('.ut-sw[data-layer]')); }
  function syncSwitches() { switches().forEach(function (b) { b.setAttribute('aria-checked', on[b.getAttribute('data-layer')] ? 'true' : 'false'); }); }
  function iconHtml(id) {
    var s = legend && legend.querySelector('li[data-layer="' + id + '"] svg');
    return s ? s.outerHTML.replace('ut-lg', 'ut-ovsvg') : '';
  }
  function fitVisible() {
    if (!ok) return;
    var b = null;
    ORDER.forEach(function (id) {
      if (!on[id] || !groups[id]) return;
      var gb = groups[id].circle.getBounds();
      b = b ? b.extend(gb) : L.latLngBounds(gb.getSouthWest(), gb.getNorthEast());
    });
    if (b && b.isValid()) map.fitBounds(b, { padding: [28, 28], maxZoom: 14, animate: true });
    else map.setView(LAYERS.active.center, 11, { animate: true });
  }
  function syncLayers() {
    syncSwitches();
    if (!ok) return;
    ORDER.forEach(function (id) {
      var g = groups[id].group;
      if (on[id]) { if (!map.hasLayer(g)) g.addTo(map); } else if (map.hasLayer(g)) map.removeLayer(g);
    });
    fitVisible();
  }
  function applyParam() {
    try {
      var raw = (new URLSearchParams(location.search).get('layer') || '').toLowerCase();
      if (!raw) return;
      if (raw === 'all') { ORDER.forEach(function (k) { on[k] = true; }); return; }
      var alias = { active: ['active'], likely: ['likely'], potential: ['potential'], scheduled: ['scheduled'], planned: ['scheduled'],
                    psps: ['potential', 'likely'], consideration: ['potential'] }; /* ?layer=psps from F10 -> Potential + Likely */
      (alias[raw] || []).forEach(function (k) { on[k] = true; });
    } catch (e) {}
  }
  function build() {
    if (typeof L === 'undefined') return false;
    var el = document.getElementById('map'); if (!el) return false;
    try {
      map = L.map(el, { zoomControl: false, attributionControl: false });
      L.control.attribution({ position: 'topleft', prefix: false }).addTo(map);
      /* Basemap: CARTO's free raster tiles now return an "API KEY REQUIRED" watermark tile, so the demo uses the standard OSM tiles
         (light prototype use only; swap for the real SCE EMCS basemap in production). */
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors · Demo basemap (not SCE EMCS)'
      }).addTo(map);
      ORDER.forEach(function (id) {
        var c = LAYERS[id], g = L.layerGroup();
        var circle = L.circle(c.center, { radius: c.r, color: c.color, weight: 2, opacity: .85, fillColor: c.color, fillOpacity: c.fill });
        circle.addTo(g);
        L.marker(c.center, { keyboard: false, interactive: false,
          icon: L.divIcon({ className: 'ut-ov', html: iconHtml(id), iconSize: [36, 36], iconAnchor: [18, 18] }) }).addTo(g);
        groups[id] = { group: g, circle: circle };
      });
      map.setView(LAYERS.active.center, 13);
      if (canvas) canvas.classList.add('has-leaflet');
      ok = true;
      setTimeout(function () { if (map) { map.invalidateSize(); fitVisible(); } }, 80);
      return true;
    } catch (e) { ok = false; return false; }
  }
  function boot() {
    applyParam(); syncSwitches();
    build(); syncLayers();
    switches().forEach(function (b) { b.addEventListener('click', function () { var k = b.getAttribute('data-layer'); on[k] = !on[k]; syncLayers(); }); });
    var f = document.getElementById('mcFilter');
    if (f && legend) f.addEventListener('click', function () { legend.hidden = !legend.hidden; f.setAttribute('aria-expanded', String(!legend.hidden)); });
    var zi = document.getElementById('mcIn'), zo = document.getElementById('mcOut'), ex = document.getElementById('mcExp');
    if (zi) zi.addEventListener('click', function () { if (ok) map.zoomIn(); });
    if (zo) zo.addEventListener('click', function () { if (ok) map.zoomOut(); });
    if (ex && canvas) ex.addEventListener('click', function () {
      var x = canvas.classList.toggle('is-expanded'); ex.setAttribute('aria-pressed', String(x));
      if (ok) setTimeout(function () { map.invalidateSize(); fitVisible(); }, 60);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
