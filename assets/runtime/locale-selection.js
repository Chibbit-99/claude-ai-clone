"use strict";
(() => {
  var e = "en-US",
    t = [
      "en-US",
      "de-DE",
      "fr-FR",
      "ko-KR",
      "ja-JP",
      "es-419",
      "es-ES",
      "it-IT",
      "hi-IN",
      "pt-BR",
      "id-ID",
    ];
  function n(n, o = t) {
    let r = new Map();
    for (let e of o) {
      let t = e.toLowerCase();
      r.set(t, e);
      let n = t.split("-")[0];
      r.has(n) || r.set(n, e);
    }
    for (let e of n)
      if (e) {
        let t = e.toLowerCase(),
          n = r.get(t) ?? r.get(t.split("-")[0]);
        if (n) return n;
      }
    return e;
  }
  function o(e = r()?.dataset.i18nCatalogs || "") {
    let t = [];
    for (let n of e.split(",")) {
      let e = /^([\w-]+):([\w-]+)\.([\w-]+)$/.exec(n);
      e && t.push(e.slice(1));
    }
    return t;
  }
  function r() {
    try {
      return document.querySelector('meta[name="i18n-catalogs"]');
    } catch {
      return null;
    }
  }
  try {
    let t = (function () {
      let e = null;
      try {
        e = localStorage.getItem("spa:locale");
      } catch {}
      if (!e) return n(navigator.languages);
      let t = e.toLowerCase();
      for (let [e] of o()) if (e.toLowerCase() === t) return e;
      return n([e]);
    })();
    if (
      ((document.documentElement.lang = window.__FIRST_PAINT_LOCALE__ = t),
      (function (e) {
        r()?.dataset.i18nRtl?.split(",")?.includes(e) &&
          (document.documentElement.dir = window.__FIRST_PAINT_DIR__ = "rtl");
      })(t),
      window.__SKIP_I18N_CATALOG_PRELOAD__)
    )
      throw new Error();
    if (t === e) throw new Error();
    performance.mark?.("i18n:catalog_preload_start");
    let a = (function (e) {
        let t = r()?.dataset,
          n = encodeURIComponent(e);
        return (
          (function (e, t = "", n = "") {
            for (let [r, a, l] of o(t))
              if (r === e)
                return {
                  base: "/i18n/" + n + e + ".json?v=" + a,
                  dynamic: "/i18n/dynamic/" + e + ".json?v=" + l,
                };
          })(e, t?.i18nCatalogs, t?.i18nCut) || {
            base: "/i18n/" + n + ".json",
            dynamic: "/i18n/dynamic/" + n + ".json",
          }
        );
      })(t),
      l = {},
      i = {},
      s = {};
    for (let e of [a.base, a.dynamic]) {
      let t = fetch(e),
        n = t.then((e) => (e.ok ? e.json() : void 0));
      (n.then(
        (t) => {
          t && (s[e] = performance.now());
        },
        () => {},
      ),
        (l[e] = t),
        (i[e] = n));
    }
    let c = { locale: t, responses: l, bodies: i, parsedAt: s };
    ((window.__I18N_CATALOG_PRELOAD__ = c),
      performance.measure?.("i18n:catalog_preload_exec", {
        start: "i18n:catalog_preload_start",
      }));
  } catch {}
})();
