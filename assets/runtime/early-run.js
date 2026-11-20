"use strict";
(() => {
  var e,
    r = "__earlyRun",
    s = "entry_eval:start",
    t =
      /^\/(new|task\/new|recents|projects|(chat|project)\/[\w-]+|(code|epitaxy|cowork)(\/[\w-]+)*)(\?coldLaunch=1)?$/,
    a = /change|focus|blur|line$|storage|resize/,
    n = /^(run|steps|everywhere|control)(_unfinished)?$/,
    o = document,
    d = window;
  function i(r) {
    try {
      let s =
        t.test(location.pathname + location.search) &&
        !location.hash &&
        d.top === d &&
        !o.hidden &&
        !o.prerendering &&
        !d.__ml_hop_pending &&
        !/handoff/.test(o.head.getAttributeNames().join()) &&
        "full" === o.documentElement.dataset.documentVariant &&
        localStorage.getItem(r);
      if (!s || !n.test(s) || ("steps" === s && "/new" !== location.pathname))
        return;
      if (!s.includes("_")) {
        localStorage.setItem(r, s + "_unfinished");
        let t = () => {
          try {
            localStorage.setItem(r, s);
          } catch {}
        };
        (d.addEventListener("pagehide", t),
          (e = () => d.removeEventListener("pagehide", t)),
          o.addEventListener("DOMContentLoaded", e));
      }
      return s;
    } catch {
      return;
    }
  }
  function l(e) {
    new Document().adoptNode(e);
  }
  function h(e) {
    return !0 === e || !(!e || !e.capture);
  }
  var c = i("spa:cai_crispy_balloon"),
    j = c && !c.startsWith("control") ? void 0 : i("spa:cai_zany_breeze");
  if (j || c) {
    let t = { arm: j, stepsArm: c, files: 0, ran: new Set(), ms: 0 };
    ((d[r] = t),
      (("run" === j && !location.pathname.startsWith("/code")) ||
        "steps" === c ||
        "everywhere" === c) &&
        (function (t, n) {
          let i,
            c = EventTarget.prototype,
            { addEventListener: j, removeEventListener: p } = c,
            { setTimeout: m, queueMicrotask: f } = d,
            [u, v, ...w] =
              "72 https://assets-proxy.anthropic.com/claude-ai/v2/assets/v1/ index-CQowLlRO.js web-main-_FgGJAgF.js index-hpVCYkag.js web-main-wItOAyqF.js rolldown-runtime-DW3lKVXF.js vendor-zod-CurtTR4t.js preload-helper-DhpmabVq.js vendor-frame-D71wU5Bt.js shared-frame-boot-ChpbdOKr.js shared-frame-BPG2iEy9.js vendor-query-Cbdj3dsh.js vendor-all-l-p-m-w-0--IjqGe3w.js shared-l-p-m-w-0-CYWGWBN7.js vendor-datadog-BMET_gkb.js vendor-flags-dg2tE_Db.js vendor-router-CTvUzDYl.js shared-l-p-m-w-1-_v7OWhrB.js shared-l-p-m-w-8-DR2OKi4p.js vendor-intl-CwLVo2DF.js shared-l-p-m-w-2-wSVyGyYw.js shared-l-p-m-w-3-B4C68nX-.js shared-l-p-m-w-4-B2Sgj9xI.js vendor-base-ui-CNZsuFPN.js shared-l-p-m-w-5-BAxjymQH.js shared-l-m-0-gVJ-qtXZ.js shared-p-m-w-0-CurWcRTK.js shared-p-m-0-7cseKB1p.js shared-m-0-CgwKt81A.js vendor-motion-DjPvcrft.js shared-m-w-0-Ba6BBGak.js shared-m-4-xNNfsUpI.js shared-p-m-1-3pr2lPV-.js shared-m-1-D16TVlHw.js vendor-prosemirror-DLktkV69.js vendor-tiptap-bvYwCQSX.js shared-m-2-DRGjOS08.js shared-m-8-3ea-Ov8L.js shared-l-0-Dj4tJfQ0.js shared-w-0-R3hnmORV.js shared-p-1-5edi4Fvi.js shared-0-C3HNel8D.js shared-p-0-DBtprDbE.js shared-1-O4AujlfY.js vendor-all-0-Ca-c3fA_.js shared-3-D5jbyaVR.js shared-29-CCDdO18Q.js shared-4-si1c8Rmw.js shared-styles-DnKmq6uj.js shared-31-CW_OLTaE.js vendor-markdown-fdDJC6vz.js shared-5-CG-mO38g.js vendor-utils-l89SpAeH.js shared-37-CVSx__NM.js shared-33-CcVNlAnh.js shared-m-10-CRtmB6yB.js shared-41-C-8vzMVz.js shared-6-FeQTLWLm.js shared-36-nydwZTVx.js shared-8-BnoERJ0y.js shared-9-Dxf__mGk.js shared-38-CLK_xAt3.js shared-frame-pager-CgPMaMsP.js shared-39-Du1Gk2eX.js shared-12-BJ8hsxKv.js shared-40-C4rfQ4wS.js shared-80-z_gUR3zQ.js shared-100-C623fYV9.js shared-140-C4TZL7wv.js shared-160-S3azouyf.js shared-18-ww1O1ll7.js shared-19-C7N6tciG.js shared-20-zibe6ILf.js shared-59-BzZ6Hjkw.js shared-21-BHQaVsJH.js shared-22-Dd7z3Fdz.js shared-23-DuRyajUn.js shared-46-Ctls_1cD.js".split(
                " ",
              ),
            g = w.map((e) => new URL(v + e, location.origin).href),
            C = g.splice(0, 4),
            y = new Set(),
            E = new AbortController(),
            _ = new AbortController(),
            D = [],
            L = [],
            b = [],
            B = [],
            V = !1,
            O = !1,
            k = !1,
            z = !1,
            R = !1,
            x = 1 / 0,
            A = () => {
              ((z = !0),
                E.abort(),
                n && (b.splice(0).forEach(l), (O = k)),
                t.defer || ((t.enter = void 0), _.abort()));
            },
            S = (...[e, r, s, t]) =>
              B.find(
                (a) =>
                  a[0] === e && a[1] === r && a[2] === s && h(a[3]) === h(t),
              );
          function T(e, r, s) {
            let t = this ?? d;
            if (
              R &&
              "test" !== e &&
              [d, o, d.navigation, navigator.connection].includes(t)
            ) {
              let n = [t, e, r, s];
              if (S(...n)) return;
              (B.push(n),
                a.test(e) &&
                  j.call(t, e, (e) => L.push([n, e]), {
                    capture: h(s),
                    signal: _.signal,
                  }));
            } else j.call(t, e, r, s);
          }
          function F(e, r, s) {
            let t = this ?? d,
              a = S(t, e, r, s);
            ((B = B.filter((e) => e !== a)), p.call(t, e, r, s));
          }
          let G = (e, r = 0, ...s) => {
              if (!R) return m(e, r, ...s);
              let t = d.setInterval(
                () => {
                  performance.now() - x >= (+r || 0) &&
                    (clearInterval(t), e(...s));
                },
                r / 8 + 16,
              );
              return t;
            },
            N = (e) => (R ? D.push(() => f(e)) : f(e)),
            I = (e, r) =>
              i.call(
                performance,
                e === s && t.defer ? "entry_eval:early" : e,
                r,
              );
          function M(e, r, s, t = (e) => e()) {
            let a = e[r];
            ((e[r] = s),
              D.push(() =>
                t(() => {
                  e[r] === s && (e[r] = a);
                }),
              ));
          }
          function q() {
            ((i = performance.mark),
              M(performance, "mark", I),
              M(c, "addEventListener", T),
              M(c, "removeEventListener", F, f),
              M(d, "setTimeout", G),
              M(d, "queueMicrotask", N),
              (t.defer = (e) => D.push(e)),
              (t.enter = (e) => {
                if (!O || !e) return Q();
                (t.ran.add(e),
                  R || ((R = k = !0), (t.ms -= performance.now()), f(K)));
              }));
          }
          function K() {
            R && ((R = !1), (t.ms += performance.now()));
          }
          function Q() {
            (K(), (t.defer = t.enter = void 0), A(), (x = performance.now()));
            for (let [e, r] of L)
              f(() => {
                let [s, t, a, n] = e,
                  { once: d, signal: i } = n ?? {};
                B.includes(e) &&
                  !i?.aborted &&
                  t !== (o.hasFocus() ? "blur" : "focus") &&
                  (d && F.call(s, t, a, n),
                  "function" == typeof a ? a.call(s, r) : a?.handleEvent(r));
              });
            for (let e of [
              ...B.map(
                ([e, ...r]) =>
                  () =>
                    j.apply(e, r),
              ),
              ...D,
            ])
              try {
                e();
              } catch (e) {
                reportError(e);
              }
            performance.mark(s);
          }
          function W() {
            if (z || O || !V) return;
            let e = g[t.files];
            t.files < +u && !g.every((e) => y.has(e))
              ? y.has(e) &&
                (t.files || q(),
                (O = !0),
                (k = !1),
                import(e).then(() => {
                  ((O = !1), (t.files += +!!t.enter), W());
                }, A))
              : A();
          }
          t.enter = A;
          let H = { capture: !0, signal: E.signal };
          (o.addEventListener(
            "load",
            (e) => {
              (y.add(e.target.href), W());
            },
            H,
          ),
            d.addEventListener(
              "error",
              (e) => {
                (e instanceof ErrorEvent && O && k && !R && (z || !n) && Q(),
                  A());
              },
              { capture: !0, signal: _.signal },
            ),
            o.addEventListener("visibilitychange", A, H),
            o.addEventListener(
              "readystatechange",
              n
                ? function () {
                    let s = [...o.scripts].find(({ src: e }) => C.includes(e));
                    if (z || O || !s) return;
                    let a = C[C.indexOf(s.src)],
                      n = (e) => {
                        let r = o.createElement("script");
                        return (
                          (r.type = "module"),
                          (r.async = !1),
                          (r.nonce = s.nonce),
                          e(r),
                          s.before(r),
                          r
                        );
                      };
                    (q(),
                      (O = !0),
                      (t.stepEnded = () => {
                        ((k = !1),
                          (t.files = t.ran.size),
                          b.shift(),
                          (z || !b.length) && A());
                      }));
                    for (let e = 0; e < +u; e += 8)
                      b.push(
                        n((s) => {
                          s.text =
                            g
                              .slice(e, Math.min(e + 8, +u))
                              .map((e) => `import"${e}";`)
                              .join("") +
                            r +
                            ".stepEnded()";
                        }),
                      );
                    (n((r) => {
                      ((r.crossOrigin = ""),
                        (r.src = a),
                        (r.onload = r.onerror = e));
                    }),
                      o.removeEventListener("DOMContentLoaded", e),
                      (s.src = a),
                      l(s));
                  }
                : () =>
                    requestAnimationFrame(() =>
                      m(() => {
                        ((V = !0), W());
                      }),
                    ),
              H,
            ));
        })(t, !j));
  }
})();
