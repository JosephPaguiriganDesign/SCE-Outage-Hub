/*! CONH hi-fi page transitions — View Transitions API + sessionStorage fallback */
(function () {
  var KEY = 'conhNav';
  var SHEETS = {
    'F6-map-sheet.html': true,
    'F9-afn-help.html': true
  };
  var usedVT = false;

  function basenameFromUrl(href) {
    try {
      var u = new URL(href, location.href);
      var parts = u.pathname.split('/');
      var last = parts[parts.length - 1];
      return last || 'index.html';
    } catch (e) {
      return '';
    }
  }

  function depthOf(file) {
    if (!file) return 0;
    if (/^index\.html$/i.test(file)) return 0;
    if (/^F5-confirm/i.test(file)) return 3;
    if (/^F5-report/i.test(file)) return 2;
    var m = file.match(/^F(\d+)/i);
    if (!m) return 1;
    var n = parseInt(m[1], 10);
    if (n === 0) return 1;
    if (n === 1) return 2;
    if (n === 2) return 3;
    if (n === 6 || n === 9) return 4;
    if (n === 7 || n === 10) return 2;
    if (n === 5) return 2;
    return Math.min(n, 4);
  }

  function isSameFolderRelativeNav(a) {
    var href = a.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    if (/^(tel:|mailto:|sms:|javascript:)/i.test(href)) return false;
    if (/^(https?:)?\/\//i.test(href)) return false;
    try {
      var u = new URL(href, location.href);
      if (u.origin !== location.origin) return false;
      var hereDir = location.pathname.replace(/[^/]*$/, '');
      var thereDir = u.pathname.replace(/[^/]*$/, '');
      if (hereDir !== thereDir) return false;
      var hereFile = basenameFromUrl(location.href);
      var thereFile = basenameFromUrl(u.href);
      var sameSearch = (u.search || '') === (location.search || '');
      if (hereFile === thereFile && sameSearch) return false;
      return true;
    } catch (e) {
      return false;
    }
  }

  function looksLikeBack(a, targetFile) {
    if (a.closest && a.closest('.back-bar')) return true;
    if (/\b(back|nav-back|link-back)\b/i.test(a.className || '')) return true;
    var label = ((a.textContent || '') + ' ' + (a.getAttribute('aria-label') || '')).replace(/\s+/g, ' ');
    if (/←|⟵|↖/.test(label)) return true;
    if (/\bback\b/i.test(label) && !/\bbackup\b/i.test(label)) return true;
    var cur = basenameFromUrl(location.href);
    if (targetFile && depthOf(targetFile) < depthOf(cur)) return true;
    return false;
  }

  function directionFor(a) {
    var target = basenameFromUrl(a.href);
    if (SHEETS[target]) return 'sheet';
    if (looksLikeBack(a, target)) return 'back';
    return 'forward';
  }

  function readDir() {
    try {
      return sessionStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function writeDir(dir) {
    try {
      sessionStorage.setItem(KEY, dir);
    } catch (e) {}
  }

  function clearDir() {
    try {
      sessionStorage.removeItem(KEY);
    } catch (e) {}
  }

  function applyTypes(vt) {
    if (!vt || !vt.types) return;
    var dir = readDir() || 'forward';
    try {
      if (typeof vt.types.clear === 'function') vt.types.clear();
    } catch (e) {}
    try {
      vt.types.add(dir);
    } catch (e) {}
  }

  document.addEventListener(
    'click',
    function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
      if (!a) return;
      if (a.target && a.target !== '' && a.target !== '_self') return;
      if (!isSameFolderRelativeNav(a)) return;
      writeDir(directionFor(a));
    },
    true
  );

  window.addEventListener('pageswap', function (e) {
    if (e.viewTransition) applyTypes(e.viewTransition);
  });

  window.addEventListener('pagereveal', function (e) {
    if (e.viewTransition) {
      usedVT = true;
      applyTypes(e.viewTransition);
    }
  });

  function runFallback() {
    var dir = readDir();
    clearDir();
    try {
      if (document.documentElement.matches(':active-view-transition')) usedVT = true;
    } catch (e) {}
    if (!dir || usedVT) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.documentElement.classList.add('enter-fade');
      window.setTimeout(function () {
        document.documentElement.classList.remove('enter-fade');
      }, 120);
      return;
    }
    var cls = 'enter-' + dir;
    document.documentElement.classList.add(cls);
    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      document.documentElement.classList.remove(cls);
    }
    var app = document.querySelector('.app');
    if (app) {
      app.addEventListener('animationend', done, { once: true });
    }
    window.setTimeout(done, 400);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runFallback);
  } else {
    runFallback();
  }
})();
