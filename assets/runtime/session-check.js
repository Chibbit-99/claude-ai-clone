"use strict";
(() => {
  var e = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function t(t) {
    return "string" == typeof t && e.test(t);
  }
  function n(e, n) {
    let i = /^\/(artifacts\/invite|invitation)\/([^/?&;%#]*)/.exec(
      (function (e) {
        let t = e;
        try {
          t = decodeURIComponent(t);
        } catch {}
        return (
          (t = t.replace(/[\x00-\x1f\x7f]/g, "")),
          t
            .toLowerCase()
            .replace(/\/{2,}/g, "/")
            .replace(/\/+$/, "") || "/"
        );
      })(e),
    );
    if (null === i) return null;
    let [, r, o = ""] = i,
      a = "1" === new URLSearchParams(n).get("report");
    return {
      id: t(o) ? o : void 0,
      address: `/${r}/${encodeURIComponent(o)}${a ? "?report=1" : ""}`,
    };
  }
  !(function () {
    let e = "remote_reload_attempted:",
      t = document.documentElement.dataset.buildTimestamp ?? "",
      i = 0,
      r = 0,
      o = !1,
      a = !1;
    function c() {
      ((a = !0),
        (o = !1),
        clearTimeout(r),
        document.removeEventListener("visibilitychange", u),
        (window.__CLIENT_HEALTH__ = { disabled: !0 }),
        window.dispatchEvent(new Event("clienthealth")));
    }
    function l() {
      return "hidden" === document.visibilityState ? 72e5 : 18e5;
    }
    function u() {
      if ((clearTimeout(r), a)) return;
      let e = Math.min(l(), i + l() - Date.now());
      e > 0 ? (r = window.setTimeout(u, e)) : s();
    }
    function d() {
      let { pathname: e, search: t } = window.location;
      return encodeURIComponent(
        (function (e, t) {
          let i = n(e, t);
          if (null !== i) return void 0 === i.id ? "/" : i.address;
          let r = e + t;
          for (let e = ""; r !== e; ) {
            if (/ainvk/i.test(r)) return "/";
            ((e = r),
              (r = r.replace(/%([0-9a-f]{2})/gi, (e, t) =>
                String.fromCharCode(parseInt(t, 16)),
              )));
          }
          return e + t;
        })(e, t),
      );
    }
    function s() {
      if (a || ((i = Date.now()), u(), o)) return;
      let n = (function (e) {
          let t = document.cookie.match(
            new RegExp("(?:^|; )" + e + "=([^;]*)"),
          );
          if (!t) return "";
          try {
            return decodeURIComponent(t[1]);
          } catch {
            return t[1];
          }
        })("anthropic-device-id"),
        r = document.cookie.match(/(?:^|; )anthropic-device-id=[^;]*/g) ?? [],
        l =
          /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
            n,
          ) && 1 === new Set(r.map((e) => e.replace(/^; /, ""))).size
            ? n
            : n && "unknown";
      fetch(
        "/edge-api/client-health/check?" +
          new URLSearchParams({
            platform: "web",
            bundle: t,
            locale: navigator.language || "en-US",
          }).toString(),
        {
          cache: "no-store",
          credentials: "omit",
          headers: l ? { "anthropic-device-id": l } : {},
        },
      )
        .then((e) => (410 === e.status ? (c(), null) : e.ok ? e.json() : null))
        .then((t) => {
          if (a || !t || "object" != typeof t) return;
          ((window.__CLIENT_HEALTH__ = t),
            window.dispatchEvent(new Event("clienthealth")));
          let n = t.control;
          if (!n) return;
          if ("lockout" === n.type) {
            try {
              sessionStorage.setItem(
                "client_health_lockout",
                JSON.stringify({ message: n.message, cta: n.cta }),
              );
            } catch {}
            return void window.location.replace(
              "/health/update-required?returnTo=" + d(),
            );
          }
          if ("load-shed" === n.type) {
            let e = window.location,
              t = n.retryAfter;
            return void e.replace(
              "/health/unavailable?returnTo=" +
                d() +
                ("number" == typeof t && t > 0 ? "&t=" + t : ""),
            );
          }
          if ("reload" !== n.type) return;
          let i = n.id;
          if ("string" == typeof i && /^[A-Za-z0-9_-]{1,64}$/.test(i)) {
            try {
              if (null !== sessionStorage.getItem(e + i)) return;
            } catch {
              return;
            }
            ((o = !0), f(i, 0));
          }
        })
        .catch(() => {});
    }
    function f(t, n) {
      if (a || n >= 30) return void (o = !1);
      let i = new AbortController();
      (setTimeout(() => i.abort(), 3e4),
        fetch("/edge-api/client-health/reload-request", {
          cache: "no-store",
          credentials: "omit",
          signal: i.signal,
        })
          .then((n) => {
            if (410 !== n.status) {
              if (!n.ok) throw new Error();
              try {
                sessionStorage.setItem(e + t, String(Date.now()));
              } catch {
                return void (o = !1);
              }
              (location.reload(), (o = !1));
            } else c();
          })
          .catch(() => {
            setTimeout(() => f(t, n + 1), 6e4);
          }));
    }
    (document.addEventListener("visibilitychange", u),
      (r = window.setTimeout(s, 5e3)));
  })();
})();
