/* babelize:static-runtime v1.1.0 */
(function () {
  'use strict';
  var SOURCE = "en";
  var LOCALES = ["en","fr","de","ja"];
  var BASE_DIR = null;

  var loadedLocales = {};
  var fetching = {};
  var lang = null;

  function resolveBase() {
    var script = document.currentScript;
    if (script && script.src) {
      var url = new URL(script.src, window.location.href);
      return url.href.replace(/\/[^/]*$/, '/');
    }
    var el = document.querySelector('[data-babelize-base]');
    if (el) {
      var attr = el.getAttribute('data-babelize-base');
      if (attr) return attr;
    }
    if (BASE_DIR) return BASE_DIR;
    return './';
  }

  var BASE = resolveBase();

  function fetchLocale(locale, cb) {
    if (loadedLocales[locale]) {
      cb(null, loadedLocales[locale]);
      return;
    }
    if (fetching[locale]) {
      fetching[locale].push(cb);
      return;
    }
    fetching[locale] = [cb];

    var url = BASE + 'locales/' + locale + '.json';

    function done(err, data) {
      if (!err && data) {
        loadedLocales[locale] = data;
      }
      var cbs = fetching[locale];
      delete fetching[locale];
      for (var i = 0; i < cbs.length; i++) {
        cbs[i](err, data);
      }
    }

    if (typeof window.fetch === 'function') {
      window.fetch(url).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        return res.json();
      }).then(function (data) {
        done(null, data);
      }).catch(function (e) {
        fallbackXhr(url, done);
      });
    } else {
      fallbackXhr(url, done);
    }
  }

  function fallbackXhr(url, cb) {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            try {
              cb(null, JSON.parse(xhr.responseText));
            } catch (e) {
              cb(e, null);
            }
          } else {
            cb(new Error('HTTP ' + xhr.status), null);
          }
        }
      };
      xhr.onerror = function () { cb(new Error('Network error'), null); };
      xhr.send();
    } catch (e) {
      cb(e, null);
    }
  }

  function getTranslation(key) {
    var parts = key.split('.');
    var current = loadedLocales[lang] || {};
    for (var i = 0; i < parts.length; i++) {
      if (current === null || current === undefined) break;
      current = current[parts[i]];
    }
    if (current !== undefined) return current;
    current = loadedLocales[lang] || {};
    if (current[key] !== undefined) return current[key];
    return undefined;
  }

  function applyTranslations() {
    // The whole document, so <title> and SEO <meta> tags in <head> are translated too.
    var walk = document.createTreeWalker(
      document.documentElement,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );
    var node;
    while ((node = walk.nextNode())) {
      var key = node.getAttribute('data-i18n');
      if (key) {
        var val = getTranslation(key);
        if (val === undefined) continue;
        var argsStr = node.getAttribute('data-i18n-args');
        if (argsStr) {
          try {
            var args = JSON.parse(argsStr);
            val = String(val).split('{').map(function(part, i) {
              if (i === 0) return part;
              var closeIdx = part.indexOf('}');
              if (closeIdx === -1) return '{' + part;
              var name = part.substring(0, closeIdx);
              var rest = part.substring(closeIdx + 1);
              return (args[name] !== undefined ? args[name] : '{' + name + '}') + rest;
            }).join('');
          } catch (e) {}
        }
        if (node.getAttribute('data-i18n-html') === '1') {
          node.innerHTML = val;
        } else {
          var tw = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null, false);
          var textNodes = [];
          while (tw.nextNode()) textNodes.push(tw.currentNode);
          for (var i = 0; i < textNodes.length; i++) {
            textNodes[i].textContent = val;
          }
        }
      }
      var attrNames = ['alt', 'title', 'placeholder', 'aria-label', 'aria-description', 'content'];
      for (var a = 0; a < attrNames.length; a++) {
        var attrKey = node.getAttribute('data-i18n-' + attrNames[a]);
        if (attrKey) {
          var attrVal = getTranslation(attrKey);
          if (attrVal !== undefined) node.setAttribute(attrNames[a], attrVal);
        }
      }
    }
  }

  function updateHtmlAttributes() {
    var select = document.querySelector('[data-babelize-switcher-select]');
    if (select) select.value = lang;
    var meta = (loadedLocales[lang] || {})._meta;
    if (!meta) return;
    var html = document.documentElement;
    if (meta.language) html.setAttribute('lang', meta.language);
    if (meta.dir) html.setAttribute('dir', meta.dir);
  }

  function resolveLanguage() {
    var params = new URLSearchParams(window.location.search);
    var fromParam = params.get('lang') || params.get('hl');
    if (fromParam) return fromParam;
    try {
      var stored = window.localStorage.getItem('babelize-lang');
      if (stored) return stored;
    } catch (e) {}
    var match = document.cookie.match(/(?:^|;\s*)lang=([^;]*)/);
    if (match) return match[1];
    return (navigator.language || 'en').split('-')[0];
  }

  function switchLanguage(locale) {
    lang = locale;
    document.cookie = 'lang=' + locale + ';path=/;max-age=31536000';
    try { window.localStorage.setItem('babelize-lang', locale); } catch (e) {}
    fetchLocale(locale, function (err) {
      if (!err) {
        updateHtmlAttributes();
        applyTranslations();
      }
      document.dispatchEvent(new CustomEvent('babelize:languagechange', {
        detail: { language: locale }
      }));
    });
  }

  function init() {
    lang = resolveLanguage();
    fetchLocale(lang, function (err) {
      if (err) {
        if (lang !== SOURCE) {
          lang = SOURCE;
          fetchLocale(SOURCE, function () {
            updateHtmlAttributes();
            applyTranslations();
          });
        }
        return;
      }
      updateHtmlAttributes();
      applyTranslations();
    });
  }

  window.switchLanguage = switchLanguage;

  window.babelize = {
    switchLanguage: switchLanguage,
    t: getTranslation,
    apply: applyTranslations,
    getLanguage: function () { return lang; },
    locales: LOCALES
  };

  var switcher = document.querySelector('[data-babelize-switcher]');
  if (switcher) {
    var sel = document.createElement('select');
    sel.setAttribute('data-babelize-switcher-select', '');
    for (var i = 0; i < LOCALES.length; i++) {
      var opt = document.createElement('option');
      opt.value = LOCALES[i];
      opt.textContent = LOCALES[i];
      sel.appendChild(opt);
    }
    sel.addEventListener('change', function () { switchLanguage(this.value); });
    switcher.appendChild(sel);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
