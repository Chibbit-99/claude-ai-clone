"use strict";
(() => {
  function e(e) {
    return t(e).replace(/[A-Z]/g, (e) => e.toLowerCase());
  }
  function t(e) {
    let t = 0,
      n = e.length;
    for (; t < n && (" " === e[t] || "\t" === e[t]); ) t += 1;
    for (; n > t && (" " === e[n - 1] || "\t" === e[n - 1]); ) n -= 1;
    return e.slice(t, n);
  }
  var n = "https://assets.claude.ai/videos/login-hero-kt3-still-005fec8b.webp";
  function r() {
    return (function (e) {
      for (let n of document.cookie.split(";")) {
        let r = t(n),
          o = r.indexOf("=");
        if (!(o <= 0 || r.slice(0, o) !== e))
          try {
            return decodeURIComponent(r.slice(o + 1));
          } catch {
            return null;
          }
      }
      return null;
    })("__Host-claude-ai-pending-login-email");
  }
  function o(e) {
    let t = (function (e) {
      return document.cookie
        .split(";")
        .map((e) => e.trim())
        .filter((t) => t.startsWith(e + "="));
    })(e)[0];
    try {
      return t && decodeURIComponent(t.slice(e.length + 1));
    } catch {}
  }
  function i() {
    return o("sessionKeyLC") || o("sessionKeyV3LC") || void 0;
  }
  var c = "https://js.hcaptcha.com",
    l = "(min-width: 64rem)",
    a = /^(?:[A-Za-z0-9_-]{38}|[A-Za-z0-9_-]{81})_post$/;
  function u(e, t, n) {
    let r = document.createElement("link");
    ((r.rel = e), (r.href = t));
    for (let e in n) r.setAttribute(e, n[e]);
    document.head.appendChild(r);
  }
  function s() {
    return new URLSearchParams(location.search.slice(1));
  }
  function f(e, t) {
    let n = e.getAll(t);
    if (1 !== n.length) return 0 === n.length ? null : n[0];
    try {
      let e = JSON.parse(n[0]);
      if (Array.isArray(e) && 0 === e.length) return null;
      let t = Array.isArray(e) ? e[0] : e;
      return "string" == typeof t ? t : n[0];
    } catch {
      return n[0];
    }
  }
  try {
    if (!0 !== window.__ml_hop_pending) {
      let t = location.pathname;
      if ("/login" !== t || i())
        (("/magic-link" === t &&
          (function () {
            let t = s();
            if ("desktop_app" === f(t, "client")) return !1;
            let n = f(t, "continue");
            if ("team_signup" === n || "enterprise_signup" === n) return !0;
            if (!document.head.hasAttribute("data-ion-pending-login"))
              return !1;
            let [o, i] = (function () {
              let e = location.hash.slice(1);
              if ("" !== e) return e;
              try {
                let e = sessionStorage.getItem("__ml_handoff");
                if (null === e) return "";
                let t = JSON.parse(e);
                if (
                  "string" == typeof t.hash &&
                  "number" == typeof t.at &&
                  Date.now() - t.at <= 6e5
                )
                  return t.hash;
              } catch {}
              return "";
            })().split(":");
            if (!o || !i) return !1;
            let c = (function (e) {
                try {
                  let t = Uint8Array.from(
                    atob(e.replace(/-/g, "+").replace(/_/g, "/")),
                    (e) => e.charCodeAt(0),
                  );
                  return new TextDecoder("utf-8", {
                    fatal: !0,
                    ignoreBOM: !0,
                  }).decode(t);
                } catch {
                  return null;
                }
              })(i),
              l = r();
            return null !== c && null !== l && e(l) === e(c);
          })()) ||
          "/login/popup-google-auth" === t ||
          ("/sso-callback" === t &&
            (function () {
              let e = s();
              return (
                null === f(e, "error") &&
                !!f(e, "code") &&
                a.test(f(e, "state") ?? "")
              );
            })())) &&
          (u("preconnect", c),
          u("preconnect", "https://newassets.hcaptcha.com"));
      else {
        let e =
            /claude(nest|gov)?\/[^ ]/i.test(navigator.userAgent) &&
            !!window.claudeAppBindings,
          t = s().get("returnTo")?.includes("/oauth/authorize") ?? !1;
        (!e &&
          !t &&
          matchMedia(l).matches &&
          (u("preconnect", new URL(n).origin),
          document.addEventListener(
            "DOMContentLoaded",
            () => {
              try {
                if (
                  i() ||
                  !(function () {
                    let e = navigator.connection;
                    return (
                      void 0 !== e &&
                      "4g" === e.effectiveType &&
                      "number" == typeof e.downlink &&
                      e.downlink >= 9 &&
                      !0 !== e.saveData
                    );
                  })()
                )
                  return;
                u("preload", n, { as: "image", media: l });
              } catch {}
            },
            { once: !0 },
          )),
          u("preconnect", c),
          e || u("preconnect", "https://accounts.google.com"));
      }
    }
  } catch {}
})();
