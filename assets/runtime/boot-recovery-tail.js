"use strict";
(() => {
  var e = 0;
  function t() {
    e = Date.now();
    try {
      performance.now();
    } catch {
      0;
    }
  }
  function n() {
    return e > 0 && Date.now() - e < 3e4;
  }
  function r() {
    return n() ? Math.min(Math.max(0, 3e4 - (Date.now() - e)), 3e4) : 0;
  }
  typeof window < "u" &&
    (window.addEventListener("pagehide", t),
    window.addEventListener("pageshow", (t) => {
      t.persisted && ((e = 0), void 0);
    }));
  var o = "spa_chunk_reload_log";
  function i(e, t) {
    let n,
      r = e.getItem(o);
    if (null === r) return [];
    try {
      n = JSON.parse(r);
    } catch {
      return [];
    }
    return Array.isArray(n)
      ? n
          .filter(
            (e) =>
              "number" == typeof e &&
              Number.isFinite(e) &&
              e - t < 1e4 &&
              t - e < 18e5,
          )
          .slice(-3)
      : [];
  }
  function a(e) {
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
  var s = "static-composer-typed-text-carry",
    c = `${s}-written-at`;
  function d(e) {
    return "" === e.replace(/\u200B/g, "").trim();
  }
  function u(e, t, n, r, o) {
    return o &&
      r === o &&
      (function (e) {
        return e.length <= 4096 && !d(e);
      })(e)
      ? { text: e, pathname: t, writtenAt: n, sessionMarker: o }
      : null;
  }
  var l,
    m,
    p,
    f = "boot-recovery",
    h = document,
    g = 6e3,
    v = () => performance.now(),
    y = (e) => h.getElementById(e),
    w = () => !!h.prerendering,
    _ = () => "hidden" === h.visibilityState || w(),
    E = (e) => !!performance.getEntriesByName(e)[0],
    b = () => !E("entry_eval:end") && !y("root")?.firstElementChild,
    S = () => E("entry_eval:start") && !(C && b()),
    T = () => !1 === y("js-cannot-start")?.hidden,
    A = 1,
    C = !1,
    L = !1,
    x = 0,
    k = !1,
    R = 0,
    I = !1,
    D = !1,
    N = !1,
    M = !1,
    O = 0,
    B = 0,
    K = 0,
    P = g,
    z = v(),
    H = (e) => location.origin + location.pathname + e + location.hash;
  function G(e, t = "") {
    if (S()) return;
    ((R = e), q());
    let n = location.search;
    location.replace(H(n + (n ? "&" : "?") + "attempt=" + t + e));
  }
  var J = () =>
      C ? 6 : me?.unparsed ? 4 : void 0 === l ? (L ? 5 : 3) : l ? 2 : 1,
    j = () =>
      G(
        (me?.unparsed || ((l || C) && A > 1)) && A < 4 ? 4 : 3,
        "0".repeat(J()),
      ),
    F = h.currentScript,
    U = () => (y("chat-static-composer") ? "chat-" : "") + "static-composer",
    V = () => y(U() + "-input");
  function W() {
    let e = y(U()),
      t = V();
    return (
      !!e &&
      !!t &&
      (function (e, t) {
        return (
          !e.hidden &&
          !d(t.value) &&
          (!e.hasAttribute("data-mirror-draft-painted") ||
            e.hasAttribute("data-mirror-draft-edited"))
        );
      })(e, t)
    );
  }
  var $ = !1;
  function q() {
    if (S()) Z();
    else {
      try {
        let e,
          t = me?.keepHome;
        if (
          (t
            ? t(R)
            : C && me?.appKeeps
              ? (($ = !1), me.appKeeps())
              : (e =
                  W() &&
                  u(
                    V().value,
                    location.pathname,
                    Date.now(),
                    (function () {
                      let e = window;
                      return (
                        e.__PRELOADED_CHAT_DRAFT_READS_MARKER__ ??
                        window.__SIGNIN_PRERENDER__?.sessionMarker ??
                        e.__CHAT_STATIC_COMPOSER_PARSE_MARKER__
                      );
                    })(),
                    a("sessionKeyLC") || a("sessionKeyV3LC") || void 0,
                  )),
          e)
        ) {
          try {
            localStorage.setItem(c, String(e.writtenAt));
          } catch {}
          return (sessionStorage.setItem(s, JSON.stringify(e)), void ($ = !0));
        }
      } catch {}
      if ($) {
        $ = !1;
        try {
          sessionStorage.removeItem(s);
        } catch {}
      }
    }
  }
  function Q() {
    (h.addEventListener("input", q), q());
  }
  function X() {
    window.__claudeStaticComposerSignals?.includes("tc") && Q();
  }
  var Y = /handoff/.test(h.head.getAttributeNames().join());
  function Z() {
    (clearTimeout(p),
      h.removeEventListener("input", q),
      delete window.__bootRecovery,
      ee("removeEventListener"));
  }
  function ee(e) {
    (h[e]("visibilitychange", le),
      h[e]("prerenderingchange", le),
      window[e]("focus", le),
      window[e]("online", le),
      window[e]("beforeunload", t));
  }
  function te() {
    if (D || S() || T()) return;
    D = k = !0;
    let e = h.createElement("div");
    ((e.id = f),
      (e.lang = "en"),
      (e.dir = "ltr"),
      e.setAttribute("role", "alert"),
      (e.style.cssText =
        "position:fixed;top:.5rem;z-index:11;padding:.5rem 1rem;border-radius:.5rem;background:var(--cds-alpha-2,#8883);color:var(--cds-text-primary,CanvasText);app-region:no-drag;text-align:center;font:500 .875rem/1.25rem var(--cds-font-sans,system-ui,sans-serif)"));
    let t = () => {
      let t = y("static-composer")?.getBoundingClientRect();
      ((e.style.left = Math.max(8, t?.width ? t.left : 0) + "px"),
        (e.style.right =
          Math.max(8, t?.width ? innerWidth - t.right : 0) + "px"));
    };
    (t(),
      addEventListener("resize", t),
      (e.textContent =
        (me?.unparsed || (C && navigator.onLine)) && !R
          ? "Couldn’t finish loading. If trying again doesn’t help, try later or use another browser or device. "
          : "Can’t reach Claude. Check your connection. "));
    let n = e.appendChild(h.createElement("button"));
    ((n.type = "button"),
      (n.textContent = "Try again"),
      (n.style.cssText =
        "margin:-.5rem 0;padding:.5rem 0;border:0;background:none;color:inherit;font:inherit;text-decoration:underline;cursor:pointer"),
      n.addEventListener("click", j),
      F ? F.after(e) : h.body.append(e));
    try {
      let n = new PerformanceObserver(() => {
        (S() || T()) &&
          (e.remove(), removeEventListener("resize", t), n.disconnect(), Z());
      });
      (n.observe({ entryTypes: ["mark"] }),
        performance.mark("claude:boot_notice", { detail: J() }));
    } catch {}
    let r = new URL(ae(), H("")),
      o = (t) => {
        !t &&
          !R &&
          navigator.onLine &&
          (e.firstChild.nodeValue =
            "Couldn’t finish loading. Check your connection and try again. If it keeps happening, ask your IT team to allow " +
            r.host +
            ". ");
      };
    !me?.unparsed &&
      !C &&
      r.origin !== location.origin &&
      navigator.onLine &&
      performance.getEntriesByType("navigation")[0]?.transferSize &&
      (m && !l ? o() : void 0 === m && !1 === l && se(o));
  }
  function ne(e) {
    (clearTimeout(p), (p = setTimeout(ie, e)));
  }
  function re(e) {
    try {
      return !!sessionStorage.getItem(e);
    } catch {
      return !0;
    }
  }
  function oe() {
    if (S()) return void Z();
    if (R || C || void 0 === l || (k && !I)) return;
    let e = _(),
      a = r();
    if (a && !e) return void setTimeout(oe, a);
    let c = (me?.unparsed && A < 4) || (M && A > 3),
      d =
        (l || M || c) &&
        ((2 !== A && 5 !== A) || M) &&
        !Y &&
        !W() &&
        !T() &&
        !(() => {
          try {
            return (
              performance.mark(f),
              !performance.getEntriesByName(f, "mark")[0]
            );
          } catch {
            return !0;
          }
        })() &&
        (function () {
          if (n()) return "unloading";
          if (
            typeof document < "u" &&
            document.documentElement?.hasAttribute("data-artifact-composed")
          )
            return "host_owned";
          let e,
            t = Date.now();
          try {
            if (!window.sessionStorage) return "no_storage";
            e = i(window.sessionStorage, t);
          } catch {
            return "no_storage";
          }
          return e.some((e) => t - e < 1e4)
            ? "spacing"
            : typeof document < "u" && "hidden" === document.visibilityState
              ? "hidden"
              : e.length >= 3
                ? "capped"
                : "allow";
        })() === (e ? "hidden" : "allow") &&
        (!e ||
          (l &&
            navigator.onLine &&
            !w() &&
            navigator.userAgentData &&
            !/claude/i.test(navigator.userAgent) &&
            !re(s) &&
            !re(o)));
    if (!(N = e && !d)) {
      if (d && (K || (K = v() + 2e3), v() < K))
        return ((B = 0), void setTimeout(oe, K - v()));
      ((I = !1),
        (k = !0),
        d &&
        (function () {
          try {
            let e = Date.now(),
              t = [];
            try {
              t = i(window.sessionStorage, e);
            } catch {}
            let n = [...t, e].slice(-3);
            return (sessionStorage.setItem(o, JSON.stringify(n)), !0);
          } catch {
            return !1;
          }
        })()
          ? (setTimeout(te, 8e3), t(), G(c ? 5 : 2))
          : te());
    }
  }
  function ie() {
    if (S()) return void Z();
    if (void 0 !== l) return void oe();
    if (k || (N = _()) || ue()) return;
    let e = v() - z;
    e >= 6e4
      ? de()
      : e < P
        ? ne(Math.min(P, 6e4) - e)
        : se((e) => {
            ((m = !e),
              e ? ((P = v() - z + 1e4), ie()) : void 0 === l && !ue() && de());
          });
  }
  var ae = () =>
    h.querySelector("script[type=module][src][crossorigin]")?.src ?? "/";
  function se(e) {
    let t = (B = ++O),
      n = new AbortController(),
      r = (n, r) => {
        t === B && ((B = 0), e(n, r));
      };
    (fetch(ae(), { method: "HEAD", cache: "no-store", signal: n.signal }).then(
      (e) => {
        (n.abort(), r(!0, e.ok || 404 === e.status));
      },
      () => r(!1),
    ),
      setTimeout(() => {
        (r(!1), n.abort());
      }, 1e4));
  }
  function ce() {
    ((z = v()), (P = g), (B = 0), ne(g));
  }
  function de() {
    !D && !R && ((I = !0), te());
  }
  var ue = () => !L && "complete" === h.readyState;
  function le(e) {
    _() ||
      (!1 !== l ||
      me?.unparsed ||
      R ||
      B ||
      !("online" === e.type || v() - z > 1e4)
        ? N && ((N = !1), ce(), ie())
        : ((N = !1),
          (z = v()),
          clearTimeout(p),
          se((e, t) => {
            ((m = !e), (M = I = !!t), K < v() && (K = 0), oe());
          })),
      $ ? q() : X());
  }
  try {
    let e = /(^\?|&)attempt=([^&]*)/.exec(location.search);
    e &&
      ((A = Number(e[2])),
      history.replaceState(
        history.state,
        "",
        H(
          location.search
            .replace(e[0], "")
            .replace(/^&(?!\?)|^(?=&)/, "?")
            .replace(/^\?$/, ""),
        ),
      ));
  } catch {}
  var me = window.__bootRecovery;
  me &&
    !window.__ml_hop_pending &&
    ((me.progress = (e) => {
      (e > x && ((x = e), (L = !0), (l = void 0), (M = !1), (m = void 0), Q()),
        !1 !== l && ce());
    }),
    (me.settled = (e, t) => {
      (e > x && ((M = !1), (m = void 0), (B = 0)),
        (x = e),
        (L = !0),
        (l = t),
        Q(),
        oe());
    }),
    ee("addEventListener"),
    addEventListener("error", function e() {
      setTimeout(() => {
        b()
          ? S() &&
            ((C = k = !0),
            y(f)?.remove(),
            (D = !1),
            (B = 0),
            ee("addEventListener"),
            Q(),
            setTimeout(te, r() ? 8e3 : 2e3))
          : removeEventListener("error", e);
      });
    }),
    void 0 !== me.allGood
      ? me.settled(me.failed, me.allGood)
      : me.failed && me.progress(me.failed),
    ne(g),
    setTimeout(Q, g),
    X());
})();
