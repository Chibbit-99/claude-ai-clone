"use strict";
(() => {
  var t = /^[a-p]{32}\.chromiumapp\.org$/;
  var e = (() => {
      try {
        return (
          !(function () {
            if (typeof window > "u") return !1;
            try {
              return window.self !== window.top;
            } catch {
              return !0;
            }
          })() &&
          (function (e) {
            if (!e || "/oauth/authorize" !== e.pathname) return !1;
            let n = new URLSearchParams(e.search);
            if ("none" !== n.get("prompt")) return !1;
            let r = n.get("redirect_uri");
            if (!r) return !1;
            try {
              let e = new URL(r);
              return "https:" === e.protocol && t.test(e.hostname);
            } catch {
              return !1;
            }
          })(
            (function () {
              try {
                let t =
                  typeof performance < "u" &&
                  "function" == typeof performance.getEntriesByType
                    ? performance.getEntriesByType("navigation")[0]
                    : void 0;
                if (void 0 !== t) return new URL(t.name);
              } catch {}
              return typeof location < "u" ? location : void 0;
            })(),
          )
        );
      } catch {
        return !1;
      }
    })(),
    n = "magic-link";
  function r(t) {
    return new RegExp(
      "^/" +
        t
          .split("/")
          .map((t) =>
            t.startsWith("$")
              ? "[^/]+"
              : t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          )
          .join("/") +
        "/?$",
      "i",
    );
  }
  var o = [
      "login",
      "login/app-google-auth",
      "login/popup-google-auth",
      ...[n],
    ].map(r),
    a = r(n);
  function i(t) {
    let e = (function (t) {
      return document.cookie
        .split(";")
        .map((t) => t.trim())
        .filter((e) => e.startsWith(t + "="));
    })(t)[0];
    try {
      return e && decodeURIComponent(e.slice(t.length + 1));
    } catch {}
  }
  var c;
  try {
    if (
      !e &&
      ((c = window.location.pathname),
      void 0 !== (i("sessionKeyLC") || i("sessionKeyV3LC") || void 0) ||
        !(function (t) {
          return o.some((e) => e.test(t));
        })(c) ||
        (function (t) {
          return a.test(t);
        })(c))
    ) {
      let t = document.createElement("link");
      ((t.rel = "preload"),
        t.setAttribute("as", "font"),
        (t.type = "font/woff2"),
        (t.crossOrigin = "anonymous"),
        t.setAttribute("data-icon-font-preload", ""),
        (t.href =
          "https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/c0f671921-DjPIPM7y.woff2"),
        document.head.append(t));
    }
  } catch {}
  requestAnimationFrame(() =>
    window.requestIdleCallback?.(() => {
      try {
        (new Intl.DateTimeFormat(),
          Intl.NumberFormat.supportedLocalesOf("en"),
          "a".localeCompare("b"));
      } catch {}
    }),
  );
  try {
    performance.mark("claude:inline_scripts_end");
  } catch {}
})();
