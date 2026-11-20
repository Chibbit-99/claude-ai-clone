"use strict";
(() => {
  var e = "__restoreGuard",
    t = "claude:stale_entry_reload";
  function n(e) {
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
  var r = !1;
  try {
    let e = document.head.dataset,
      o = Number(e.ionServedAt),
      a = Date.now(),
      c = a - o,
      i = (function () {
        let e = performance.getEntriesByType?.("navigation")[0]?.type;
        if ("string" == typeof e && "" !== e) return e;
        switch (performance.navigation?.type) {
          case 0:
            return "navigate";
          case 1:
            return "reload";
          case 2:
            return "back_forward";
          default:
            return null;
        }
      })(),
      s = "back_forward" === i,
      l = performance.timeOrigin || a,
      d = (function (e) {
        return e.replace(/#.*$/s, "");
      })(location.href),
      u = window.__claudeKeptLaunch,
      m = performance.getEntriesByType("navigation")[0]?.transferSize;
    !m &&
      ("kept" === e.ionEntryCache
        ? !u ||
          0 !== m ||
          u !== document.documentElement.dataset.buildId ||
          !(c >= 0 && c <= 864e5) ||
          !(function (e) {
            try {
              let t =
                  Number(localStorage.getItem("spa:kept-build-disk-until")) - e,
                r = localStorage.getItem("rq-cache-confirmed-session-marker");
              return (
                t > 0 &&
                t <= 864e5 &&
                !!r &&
                (function () {
                  for (let e of ["sessionKeyLC", "sessionKeyV3LC"]) {
                    let t = n(e);
                    if (t)
                      return '""' === t ||
                        RegExp("(sessionKeyLC|" + e + ")=.*\\1=", "s").test(
                          document.cookie,
                        )
                        ? ""
                        : t;
                  }
                })() === r
              );
            } catch {
              return !1;
            }
          })(a)
        : u) &&
      ((r = !0), window.stop(), location.reload());
    let g = "kept-web" === e.ionEntryCache;
    if (g && !s) {
      let e = () => {
        document.cookie = "__Host-kept-build=; Path=/; Max-Age=0; Secure";
      };
      document.prerendering
        ? document.addEventListener("prerenderingchange", e)
        : e();
    }
    if (
      (g || "revalidate" === e.ionEntryCache) &&
      o > 0 &&
      c > 864e5 &&
      (s || ("navigate" === i && !1 !== navigator.onLine)) &&
      !(function (e, n) {
        try {
          let r = JSON.parse(sessionStorage.getItem(t) ?? "null");
          return (
            "object" == typeof r && null !== r && r.href === n && e - r.at < 6e4
          );
        } catch {
          return !1;
        }
      })(l, d) &&
      !(function (e) {
        try {
          let t =
            e -
            Number(localStorage.getItem("claude:stale_entry_clock_suspect"));
          return t >= 0 && t < 864e5;
        } catch {
          return !1;
        }
      })(a)
    ) {
      let e = !1;
      try {
        (sessionStorage.setItem(
          t,
          JSON.stringify({
            servedAt: o,
            ageMs: c,
            at: a,
            href: d,
            nav: i,
            hidden: document.hidden,
          }),
        ),
          (e = !0));
      } catch {}
      (e || s) && ((r = !0), window.stop(), location.reload());
    }
  } catch {}
  try {
    localStorage.getItem("persisted.spa:sign-out-owed") &&
      !r &&
      !/^\/logout\/?$/i.test(location.pathname) &&
      (window.stop(),
      location.replace("/logout"),
      sessionStorage.setItem("__sign_out_intent", "single:" + Date.now()));
  } catch {}
  try {
    if (/^(revalidate|kept-web)$/.test(document.head.dataset.ionEntryCache)) {
      let t = () => {
          try {
            return [
              (
                ("; " + document.cookie).match(
                  /;\s*sessionKey(V3)?LC(=[^;]*|\s*(?=;|$))/g,
                ) || []
              )
                .sort()
                .join(""),
              localStorage.getItem("rq-cache-confirmed-account"),
            ];
          } catch {
            return ["?", null];
          }
        },
        n = t(),
        r = n[1],
        o = n[0],
        a = !1,
        c = () => {
          let [e, n] = t();
          return (
            a ||
            !/^((; sessionKeyLC=[\w-]+)+(; sessionKeyV3LC=.*)?|(; sessionKeyV3LC=[\w-]+)*)$/.test(
              o,
            ) ||
            e !== o ||
            (n !== r && (!!r || !o))
          );
        },
        i = (n) => {
          let r = window,
            i = r[e];
          n.persisted &&
            !0 !== i &&
            ((r[e] = c),
            "pageshow" === n.type
              ? ((a = c()),
                a &&
                  (document.getElementById("static-composer")?.remove(),
                  document.getElementById("chat-static-composer")?.remove()))
              : !i && !o && ([o] = t()));
        };
      (addEventListener("pagehide", i), addEventListener("pageshow", i));
    }
  } catch {}
})();
