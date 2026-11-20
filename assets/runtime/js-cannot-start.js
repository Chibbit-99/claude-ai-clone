!(function () {
  if ("function" != typeof Array.fromAsync) {
    if (
      "undefined" == typeof CSSLayerBlockRule &&
      /^\/(login|new)?\/?$/i.test(location.pathname)
    )
      return (
        new MutationObserver(n).observe(document.body, { childList: !0 }),
        void n()
      );
    (addEventListener("error", t),
      document.addEventListener("DOMContentLoaded", function () {
        removeEventListener("error", t);
      }));
  }
  function e(e) {
    ((e.textContent =
      "This page can’t be shown because your browser or device software is out of date."),
      (e.lang = "en"),
      (e.dir = "ltr"),
      (e.hidden = !1));
  }
  function n() {
    for (var n = document.body.children, t = 0; t < n.length; t++)
      "js-cannot-start" === n[t].id
        ? e(n[t])
        : ((n[t].style || {}).display = "none");
  }
  function t(n) {
    var t = document.querySelector('script[type="module"][src]'),
      o = t ? t.src.slice(0, t.src.lastIndexOf("/") + 1) : "";
    o &&
      n.error instanceof SyntaxError &&
      0 === String(n.filename).indexOf(o) &&
      e(document.getElementById("js-cannot-start"));
  }
})();
