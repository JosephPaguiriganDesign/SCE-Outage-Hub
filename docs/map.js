/* F6 interactive map — Leaflet + layer filters + sheet swap */
(function () {
  'use strict';

  var LAYERS = {
    active: {
      id: 'active',
      center: [34.1478, -118.1445],
      zoom: 15,
      ring: 0.0045,
      color: '#D97706',
      fill: 'rgba(217,119,6,0.28)',
      pinClass: 'restore',
      html:
        '<div class="hero rail-restore tint-restore">' +
          '<div class="hero-inner compact">' +
            '<div class="row-top">' +
              '<span class="evchip">Repair</span>' +
              '<span class="pill restore"><span class="mark"></span>Restoring</span>' +
            '</div>' +
            '<div class="addr">1847 Maple Ave, Pasadena</div>' +
            '<div class="status-word" style="font-size:22px;line-height:26px">RESTORING</div>' +
            '<div class="subline">Power is off at this address</div>' +
            '<div class="etr sm">Back by 4:45 PM</div>' +
            '<div class="trust">Updated 10:28 AM · May lag ~15–20 min</div>' +
            '<div class="actions">' +
              '<a class="btn" href="F2-active-detail.html">Details</a>' +
              '<a class="btn" href="F5-report.html">Report</a>' +
              '<a class="btn" href="F9-afn-help.html">Get help</a>' +
            '</div>' +
          '</div>' +
        '</div>'
    },
    planned: {
      id: 'planned',
      /* ~412 Elm St, Glendale 91205 */
      center: [34.1462, -118.2448],
      zoom: 15,
      ring: 0.005,
      color: '#2563EB',
      fill: 'rgba(37,99,235,0.28)',
      pinClass: 'planned',
      html:
        '<div class="hero rail-planned tint-planned">' +
          '<div class="hero-inner compact">' +
            '<div class="row-top">' +
              '<span class="evchip">Scheduled</span>' +
              '<span class="pill planned"><span class="mark"></span>Upcoming</span>' +
            '</div>' +
            '<div class="addr">412 Elm St, Glendale</div>' +
            '<div class="status-word sm">SCHEDULED</div>' +
            '<div class="subline">Pole replacement and line maintenance</div>' +
            '<div class="etr sm">Thu Sep 11 · 9:00 AM – 1:00 PM PT</div>' +
            '<div class="trust">Updated 9:05 AM · May lag ~15–20 min</div>' +
            '<div class="actions">' +
              '<a class="btn" href="F0-signed.html">Details</a>' +
              '<a class="btn" href="F7-portfolio.html">Portfolio</a>' +
              '<a class="btn" href="F9-afn-help.html">Get help</a>' +
            '</div>' +
          '</div>' +
        '</div>'
    },
    psps: {
      id: 'psps',
      /* ~891 Canyon Rd, Santa Clarita / Canyon Country 91387 */
      center: [34.4238, -118.4722],
      zoom: 14,
      ring: 0.012,
      color: '#EA580C',
      fill: 'rgba(234,88,12,0.28)',
      pinClass: 'warn',
      html:
        '<div class="hero rail-warn tint-warn">' +
          '<div class="hero-inner compact">' +
            '<div class="row-top">' +
              '<span class="evchip">PSPS</span>' +
              '<span class="pill warn"><span class="mark"></span>Warning</span>' +
            '</div>' +
            '<div class="addr">891 Canyon Rd, Santa Clarita</div>' +
            '<div class="status-word" style="font-size:22px;line-height:26px">WARNING</div>' +
            '<div class="subline">Extreme fire weather — high winds and low humidity</div>' +
            '<div class="etr sm">May begin as early as Thu Sep 10 · 8:00 PM PT</div>' +
            '<div class="trust">Updated 10:15 AM · May lag ~15–20 min</div>' +
            '<div class="actions">' +
              '<a class="btn" href="F10-psps-banner.html">Details</a>' +
              '<a class="btn" href="F9-afn-help.html">Get help</a>' +
            '</div>' +
          '</div>' +
        '</div>'
    },
    consideration: {
      id: 'consideration',
      /* near Canyon Rd / Santa Clarita — offset from PSPS */
      center: [34.41, -118.45],
      zoom: 14,
      ring: 0.011,
      color: '#D4A017',
      fillOpacity: 0.22,
      dashArray: '6 4',
      pinClass: 'consideration',
      html:
        '<div class="hero rail-warn tint-warn">' +
          '<div class="hero-inner compact">' +
            '<div class="row-top">' +
              '<span class="evchip">Under consideration</span>' +
              '<span class="pill watch"><span class="mark"></span>Watch</span>' +
            '</div>' +
            '<div class="addr">Near Canyon Rd, Santa Clarita</div>' +
            '<div class="status-word" style="font-size:18px;line-height:24px">UNDER CONSIDERATION</div>' +
            '<div class="subline">PSPS under consideration · no shutoff ordered</div>' +
            '<div class="etr sm">Monitoring fire weather · no de-energization ordered</div>' +
            '<div class="trust">Updated 10:15 AM · Illustrative prototype</div>' +
            '<div class="actions">' +
              '<a class="btn" href="F10-psps-banner.html">Details</a>' +
              '<a class="btn" href="F9-afn-help.html">Get help</a>' +
            '</div>' +
          '</div>' +
        '</div>'
    }
  };

  var ORDER = ['active', 'planned', 'psps', 'consideration'];
  var focus = 'active';
  var on = { active: true, planned: false, psps: false, consideration: false };
  var groups = {};
  var map = null;
  var leafletOk = false;

  var canvas = document.getElementById('mapCanvas');
  var sheet = document.getElementById('mapSheet');
  var sheetBody = document.getElementById('sheetBody');
  var stub = document.getElementById('mapStub');
  var filtersRoot = document.querySelector('.map-filters');

  function filterButtons() {
    return Array.prototype.slice.call(
      document.querySelectorAll('.map-filters .filter[data-layer]')
    );
  }

  function blobRing(lat, lng, r) {
    var pts = [];
    var i, a, rr, la, lo;
    for (i = 0; i < 12; i++) {
      a = (i / 12) * Math.PI * 2;
      rr = r * (0.72 + 0.28 * Math.sin(i * 2.3 + 0.4));
      la = lat + Math.cos(a) * rr;
      lo = lng + Math.sin(a) * rr * 1.15;
      pts.push([la, lo]);
    }
    return pts;
  }

  function pinIcon(pinClass) {
    return L.divIcon({
      className: '',
      html:
        '<div class="conh-pin ' +
        pinClass +
        '" aria-hidden="true"><div class="halo"></div><div class="dot"></div></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
  }

  function setSheet(id) {
    if (!sheet || !sheetBody) return;
    if (!id || !on[id]) {
      sheet.classList.add('is-empty');
      sheetBody.innerHTML = '';
      if (stub) {
        stub.classList.add('is-empty');
        stub.removeAttribute('data-layer');
      }
      return;
    }
    sheet.classList.remove('is-empty');
    sheetBody.innerHTML = LAYERS[id].html;
    if (stub) {
      stub.classList.remove('is-empty');
      stub.setAttribute('data-layer', id);
    }
  }

  function remainingFocus(prefer) {
    if (prefer && on[prefer]) return prefer;
    var i, id;
    for (i = 0; i < ORDER.length; i++) {
      id = ORDER[i];
      if (on[id]) return id;
    }
    return null;
  }

  function syncFilters() {
    filterButtons().forEach(function (btn) {
      var id = btn.getAttribute('data-layer');
      btn.classList.toggle('on', !!on[id]);
      btn.setAttribute('aria-pressed', on[id] ? 'true' : 'false');
    });
  }

  function visibleCount() {
    var n = 0, id;
    for (id in on) {
      if (Object.prototype.hasOwnProperty.call(on, id) && on[id]) n++;
    }
    return n;
  }

  function fitVisible(opts) {
    opts = opts || {};
    if (!map || !leafletOk) return;
    try {
      var bounds = null;
      var id, g, b, n;
      for (id in groups) {
        if (!Object.prototype.hasOwnProperty.call(groups, id)) continue;
        if (!on[id]) continue;
        g = groups[id];
        if (!map.hasLayer(g)) continue;
        b = g.getBounds && g.getBounds();
        if (!b || !b.isValid()) continue;
        if (!bounds) bounds = L.latLngBounds(b.getSouthWest(), b.getNorthEast());
        else bounds.extend(b);
      }
      n = visibleCount();
      var padTL = L.point(36, 88);
      var padBR = L.point(36, 250);
      if (bounds && bounds.isValid()) {
        var maxZ = n <= 1 ? 16 : 12;
        var flyOpts = {
          paddingTopLeft: padTL,
          paddingBottomRight: padBR,
          maxZoom: maxZ,
          duration: n <= 1 ? 0.55 : 0.75
        };
        if (typeof map.flyToBounds === 'function') {
          map.flyToBounds(bounds, flyOpts);
        } else {
          map.fitBounds(bounds, {
            paddingTopLeft: padTL,
            paddingBottomRight: padBR,
            maxZoom: maxZ,
            animate: true
          });
        }
      } else if (opts.forceOverview) {
        if (typeof map.flyTo === 'function') {
          map.flyTo(L.latLng(34.1478, -118.1445), 11, { duration: 0.5 });
        } else {
          map.setView([34.1478, -118.1445], 11, { animate: true });
        }
      }
    } catch (err) {
    }
  }

  function syncLayers() {
    var id, g;
    focus = remainingFocus(focus);
    setSheet(focus);
    syncFilters();
    if (leafletOk) {
      for (id in groups) {
        if (!Object.prototype.hasOwnProperty.call(groups, id)) continue;
        g = groups[id];
        if (on[id]) {
          if (!map.hasLayer(g)) g.addTo(map);
        } else if (map.hasLayer(g)) {
          map.removeLayer(g);
        }
      }
      fitVisible();
    }
  }

  function toggleLayer(id) {
    if (!LAYERS[id]) return;
    on[id] = !on[id];
    if (on[id]) focus = id;
    else if (focus === id) focus = remainingFocus(null);
    syncLayers();
  }

  function onFiltersClick(e) {
    var btn = e.target && e.target.closest ? e.target.closest('.filter[data-layer]') : null;
    if (!btn || !filtersRoot || !filtersRoot.contains(btn)) return;
    e.preventDefault();
    toggleLayer(btn.getAttribute('data-layer'));
  }

  function applyLayerParam() {
    try {
      var q = new URLSearchParams(location.search);
      var raw = (q.get('layer') || '').toLowerCase();
      if (!raw) return;
      var alias = {
        active: 'active',
        planned: 'planned',
        scheduled: 'planned',
        psps: 'psps',
        consideration: 'consideration'
      };
      var id = alias[raw];
      if (!id || !LAYERS[id]) return;
      on[id] = true;
      focus = id;
    } catch (err) {
    }
  }

  function buildLeaflet() {
    if (typeof L === 'undefined') return false;
    var el = document.getElementById('map');
    if (!el) return false;

    try {
      map = L.map(el, {
        zoomControl: false,
        attributionControl: false
      });
      L.control.attribution({ position: 'topright', prefix: false }).addTo(map);
      L.control.zoom({ position: 'topright' }).addTo(map);

      var tiles = L.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a> · Demo basemap (not SCE EMCS)'
        }
      );
      tiles.addTo(map);

      ORDER.forEach(function (id) {
        var cfg = LAYERS[id];
        var g = L.layerGroup();
        var polyOpts = {
          color: cfg.color,
          weight: 2,
          fillColor: cfg.color,
          fillOpacity: cfg.fillOpacity != null ? cfg.fillOpacity : 0.28,
          opacity: 0.75
        };
        if (cfg.dashArray) polyOpts.dashArray = cfg.dashArray;
        L.polygon(blobRing(cfg.center[0], cfg.center[1], cfg.ring), polyOpts).addTo(g);
        L.marker(cfg.center, { icon: pinIcon(cfg.pinClass), keyboard: false }).addTo(g);
        groups[id] = g;
      });

      map.setView(LAYERS.active.center, LAYERS.active.zoom);
      if (canvas) canvas.classList.add('has-leaflet');
      leafletOk = true;

      setTimeout(function () {
        if (map) map.invalidateSize();
        fitVisible();
      }, 80);

      return true;
    } catch (err) {
      leafletOk = false;
      if (canvas) canvas.classList.remove('has-leaflet');
      return false;
    }
  }

  function boot() {
    if (filtersRoot) {
      filtersRoot.addEventListener('click', onFiltersClick);
    }
    applyLayerParam();
    syncFilters();
    setSheet(focus);

    if (!buildLeaflet()) {
      leafletOk = false;
    }
    syncLayers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
