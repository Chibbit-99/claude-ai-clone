"use strict";
(() => {
  var t = "spa:locale",
    e = { no: "nb", nn: "nb", tl: "fil" };
  function n(t, n = "zh-hans") {
    let a = t.indexOf("-"),
      o = -1 === a ? t : t.slice(0, a);
    return "zh" !== o
      ? Object.hasOwn(e, o)
        ? e[o]
        : o
      : "zh" === t
        ? n
        : /-hans\b/.test(t) || !/-(tw|hk|mo|hant)\b/.test(t)
          ? "zh-hans"
          : "zh-hant";
  }
  function a(t, e) {
    let a,
      o = (t) =>
        e.findLast((e) => e.toLowerCase() === t) ??
        e.find((e) => n(e.toLowerCase()) === t);
    for (let e of t)
      if (e) {
        let t = e.toLowerCase(),
          s = n(t, a);
        ("zh" === t || t.startsWith("zh-")) && (a ?? (a = s));
        let i = o(t) ?? o(s);
        if (i) return i;
      }
  }
  try {
    let e = document.querySelector('meta[name="i18n-catalogs"]')?.dataset
      .i18nReleased;
    if (
      e &&
      !0 !== window.__ml_hop_pending &&
      !window.__SKIP_FIRST_VISIT_LOCALE__ &&
      self === top &&
      !location.pathname.startsWith("/mobile/") &&
      !localStorage.getItem(t)
    ) {
      let n = [
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
        ],
        o = navigator.languages || [],
        s = a(o, [...n, ...e.split(",")]);
      s &&
        !n.includes(s) &&
        (localStorage.setItem(t, s),
        (window.__FIRST_VISIT_LOCALE__ = { to: s, from: a(o, n) ?? "en-US" }));
    }
  } catch {}
})();
