"use strict";
(() => {
  var t = new Set(["tw", "hk", "mo"]);
  function e(e) {
    let [n, ...r] = e.toLowerCase().split(/[-_]/);
    if ("ja" === n) return "ja";
    if ("ko" === n) return "ko";
    if ("zh" !== n && "yue" !== n) return null;
    let u = r.find((t) => 4 === t.length);
    if ("hant" === u) return "zh-hant";
    if ("hans" === u) return "zh-hans";
    let a = r.find((t) => 2 === t.length);
    return (void 0 !== a && t.has(a)) || "yue" === n ? "zh-hant" : "zh-hans";
  }
  try {
    document.documentElement.setAttribute(
      "data-cjk-order",
      (function (t) {
        for (let n of t) {
          let t = e(n);
          if (null !== t) return t;
        }
        return null;
      })(
        (function () {
          let t = window.desktopPreferredLanguages,
            e = Array.isArray(t) ? t.filter((t) => "string" == typeof t) : [];
          return e.length > 0 ? e : navigator.languages;
        })(),
      ) ?? "none",
    );
  } catch {}
})();
