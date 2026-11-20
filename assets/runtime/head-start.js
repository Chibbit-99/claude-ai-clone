"use strict";
(() => {
  try {
    performance.mark("claude:head_scripts_start");
  } catch {}
  try {
    if (
      (!(function () {
        if (window.parent === window) return !1;
        if ("null" === window.origin) return !0;
        let t = window.frameElement,
          n = t?.getAttribute("src");
        if (!t || !n || "contentIframe" === t.id) return !1;
        try {
          let e = new URL(n, t.baseURI);
          return "about:" !== e.protocol && e.origin !== window.origin;
        } catch {
          return !0;
        }
      })() ||
        ((window.__ml_hop_pending = !0),
        window.stop(),
        window.location.replace("about:blank"),
        0)) &&
      document.head.hasAttribute("data-ion-clean-url-hop")
    ) {
      let t = location.pathname;
      try {
        t = decodeURIComponent(t);
      } catch {}
      t = t
        .replace(/[\x00-\x1f\x7f]/g, "")
        .toLowerCase()
        .replace(/\/{2,}/g, "/")
        .replace(/\/+$/, "");
      let n = location.hash.slice(1),
        e =
          "/magic-link" === t
            ? "__ml_handoff"
            : "/appeal-status" === t
              ? "__as_handoff"
              : "/connector-consent" === t
                ? "__cc_handoff"
                : null;
      if (null !== e && "" !== n) {
        if (
          (sessionStorage.setItem(
            e,
            JSON.stringify({ hash: n, at: Date.now() }),
          ),
          "__ml_handoff" === e)
        )
          try {
            sessionStorage.setItem(
              "login_timing_hop_t0",
              String(Math.round(performance.timeOrigin)),
            );
          } catch {}
        window.__ml_hop_pending = !0;
        let t = location.origin + location.pathname + location.search;
        (history.replaceState(null, "", t), location.replace(t));
      }
    }
  } catch {
    try {
      window.__ml_hop_pending = !1;
    } catch {}
  }
})();
