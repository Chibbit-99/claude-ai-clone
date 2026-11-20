"use strict";
(() => {
  var e = { failed: 0 };
  ((window.__bootRecovery = e),
    (function (e) {
      let r = (e) => {
          try {
            e();
          } catch {}
        },
        t =
          "link[rel=modulepreload][crossorigin],script[type=module][src][crossorigin]",
        n = "spa_boot_refetch",
        o = new WeakMap(),
        s = 0,
        a = "",
        i = !0,
        c = !1,
        l = [],
        d = 0,
        f = 0,
        u = [],
        m = (e) => e.href || e.src,
        p = () => [...document.querySelectorAll(t)],
        h = (e, r) => p().some((t) => e.startsWith(m(t)?.split(r, 1)[0])),
        y = (e) =>
          fetch(m(e), {
            mode: "cors",
            credentials: "same-origin",
            cache: "reload",
          })
            .then((e) =>
              e.arrayBuffer().then(() => (e.ok ? 2 : 404 === e.status ? 1 : 0)),
            )
            .catch(() => 0),
        g = () => performance.getEntriesByName("entry_eval:start", "mark")[0],
        v = (e) => {
          try {
            let r = JSON.parse(sessionStorage.getItem(n) ?? "");
            return (
              (e ? h(r[4]) : r[4]) && r[2] && Math.abs(Date.now() - r[0]) < 6e5
            );
          } catch {
            return !1;
          }
        },
        w = (t, n) =>
          r(() => {
            let r = e?.endingOf?.(t) ?? 0;
            n
              ? ((d |= 1 << r), u.length < 5 && u.push(r + t))
              : (f = (1 << r) | 1);
          });
      function S() {
        if (a || !v())
          try {
            sessionStorage.setItem(
              n,
              JSON.stringify([
                Date.now(),
                s,
                i,
                Math.round(performance.now()),
                a,
                d || f,
                u,
              ]),
            );
          } catch {}
      }
      function _() {
        if (!s) return;
        let t = 0;
        for (let e of p()) {
          let r = o.get(e);
          ((1 === r || (a && (0 === r || (void 0 === r && e.src)))) &&
            (o.set(e, (r = 2)),
            y(e).then((r) => {
              (i && (i = 0 !== r), (c = 2 === r), o.set(e, 3), _());
            })),
            (void 0 === r || 2 === r) && t++);
        }
        g() ||
          (c && l.splice(0).forEach(y),
          t || (r(() => e?.settled?.(s, i, i && !!a)), S()));
      }
      function E(n) {
        let d = n.target,
          f = d instanceof Element,
          u = f && !d.matches(t);
        if (
          (u &&
            "error" === n.type &&
            d.matches(
              "link[rel=preload][crossorigin],link[data-entry-stylesheet]",
            ) &&
            l.push(d),
          !u ||
            (e?.progress &&
              !d.matches("[fetchpriority=low],[data-route-file]")))
        ) {
          if (g()) return void k("removeEventListener");
          if (u) return void r(() => e?.progress?.(s));
          if (f) {
            if (o.has(d)) return;
            let e = +(
              "error" === n.type &&
              (s > 0 || "complete" !== document.readyState)
            );
            (o.set(d, e), (s += e), c && (c = !e), e && w(m(d), d.href));
          } else {
            if (
              !(
                !a &&
                n.error instanceof SyntaxError &&
                "fromAsync" in Array &&
                h(n.filename, "?")
              ) ||
              window.__earlyRun?.ran.has(n.filename)
            )
              return;
            if (v(!0))
              return (s++, (i = c = !1), void r(() => e?.settled?.(s, !1, !0)));
            ((a = n.filename), s++, (c = !1), w(a), S());
          }
          (_(), r(() => e?.progress?.(s)));
        }
      }
      function k(e) {
        (window[e]("error", E, !0), document[e]("load", E, !0));
      }
      k("addEventListener");
    })({
      progress(r) {
        (r > e.failed && (e.allGood = void 0), (e.failed = r), e.progress?.(r));
      },
      settled(r, t, n) {
        ((e.failed = r),
          (e.allGood = t),
          e.unparsed || (e.unparsed = n),
          e.settled?.(r, t));
      },
      endingOf: function (e) {
        let r = performance.getEntriesByName(e, "resource"),
          {
            responseStatus: t,
            deliveryType: n,
            transferSize: o,
            encodedBodySize: s,
            serverTiming: a,
          } = r.find((e) => e.responseStatus) ?? r[0] ?? {},
          i = a?.some((e) => "dcz_on" === e.name);
        return t
          ? t > 399
            ? 4
            : "cache" === n || (s && !o)
              ? 3
              : s
                ? i
                  ? 9
                  : 7
                : o
                  ? i
                    ? 1
                    : 2
                  : 6
          : 0 === t
            ? 5
            : 8;
      },
    }));
})();
