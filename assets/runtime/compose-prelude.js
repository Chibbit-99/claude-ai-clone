("number" == typeof Error.stackTraceLimit &&
  Error.stackTraceLimit < 30 &&
  (Error.stackTraceLimit = 30),
  (function () {
    try {
      var e = globalThis.crashReport,
        t =
          globalThis.desktopManagedConfig || globalThis.desktopEnterpriseConfig;
      if (
        !e ||
        "function" != typeof e.initialize ||
        (t && t.disableEssentialTelemetry)
      )
        return;
      var r = !1,
        o = "first_script",
        n = 0,
        a = 0,
        i = 0,
        c = 0,
        l = document.hidden ? 1 : 0,
        s = performance.getEntriesByType("navigation")[0],
        u = function () {
          try {
            r &&
              e.set(
                "boot",
                [
                  o,
                  Math.round(performance.now()),
                  n,
                  a,
                  i,
                  s
                    ? document.prerendering || s.activationStart > 0
                      ? "prerender"
                      : s.type
                    : "",
                  l,
                  c,
                  "",
                ].join("."),
              );
          } catch (e) {}
        },
        d = function (e) {
          ((o = e), u());
        },
        m = function (e) {
          var t = e.target;
          if ("modulepreload" === t.rel) {
            for (
              var r = performance.getEntriesByName(t.href), o = 0, c = 0, l = 0;
              l < r.length;
              l++
            )
              if (r[l].transferSize > 300) {
                o = 1;
                for (var s = 0; s < r[l].serverTiming.length; s++)
                  "dcz_on" === r[l].serverTiming[s].name && (c = 1);
              }
            (n++, (a += o), (i += c), u());
          }
        };
      ((globalThis.__crashReportBoot = {
        ready: e.initialize(1024).then(
          function () {
            r = !0;
            try {
              var t = localStorage.getItem("persisted.build-seen"),
                o = document.documentElement.dataset;
              c = t ? (t.indexOf('"b":"' + o.buildId + '"') < 0 ? 1 : 2) : 0;
              var n =
                "app" === o.entryDocument &&
                localStorage.getItem("crash-report-device");
              if (n) {
                var a = +/\d*$/.exec(n)[0] + 1;
                a > 5 ||
                navigator.globalPrivacyControl ||
                "ionGpcDetected" in document.head.dataset
                  ? localStorage.removeItem("crash-report-device")
                  : ((n = n.replace(/\d*$/, a)),
                    e.set("device", n),
                    localStorage.setItem("crash-report-device", n));
              }
            } catch (e) {}
            return (u(), !0);
          },
          function () {
            return !1;
          },
        ),
        note: d,
        forget: function () {
          ((c = 0), u());
        },
      }),
        document.addEventListener("load", m, !0),
        document.addEventListener(
          "readystatechange",
          function () {
            "first_script" === o && d("html_parsed");
          },
          { once: !0 },
        ));
      var f = performance.mark,
        p = !0,
        h = function (e) {
          return (
            p &&
              "entry_eval:start" === e &&
              ((p = !1),
              performance.mark === h && (performance.mark = f),
              document.removeEventListener("load", m, !0),
              d("scripts_running")),
            f.apply(performance, arguments)
          );
        };
      performance.mark = h;
    } catch (e) {}
  })(),
  void 0 === globalThis.process &&
    (globalThis.process = {
      env: {},
      cwd: function () {
        return "/";
      },
    }),
  void 0 === globalThis.global && (globalThis.global = globalThis),
  "function" != typeof URL.parse &&
    (URL.parse = function (e, t) {
      try {
        return new URL(e, t);
      } catch (e) {
        return null;
      }
    }),
  "function" != typeof URL.canParse &&
    (URL.canParse = function (e, t) {
      try {
        return (new URL(e, t), !0);
      } catch (e) {
        return !1;
      }
    }),
  (function () {
    function e(e) {
      if ("symbol" != typeof Symbol[e])
        try {
          Object.defineProperty(Symbol, e, {
            value: Symbol.for("Symbol." + e),
          });
        } catch (e) {}
    }
    (e("dispose"), e("asyncDispose"));
  })(),
  (function () {
    var e = Array.prototype.slice;
    function t(e, t) {
      if ("function" != typeof Array.prototype[e])
        try {
          Object.defineProperty(Array.prototype, e, {
            value: t,
            writable: !0,
            configurable: !0,
          });
        } catch (e) {}
    }
    (t("toSorted", function (t) {
      return e.call(this).sort(t);
    }),
      t("toReversed", function () {
        return e.call(this).reverse();
      }),
      t("toSpliced", function () {
        var t = e.call(this);
        return (t.splice.apply(t, arguments), t);
      }));
  })());
try {
  var desktopBootPlaceholder =
    globalThis.desktopBootFeatures &&
    globalThis.desktopBootFeatures.bootPlaceholder;
  desktopBootPlaceholder &&
    "supported" === desktopBootPlaceholder.status &&
    (document.documentElement.setAttribute("data-desktop-boot-placeholder", ""),
    setTimeout(function e(t, r) {
      var o = document.documentElement,
        n = document.getElementById("root"),
        a = n && n.firstElementChild,
        i = performance.now();
      if (
        ((t = t || i + 2e4),
        (!r && a) || !(i < t) || document.getElementById("boot-recovery"))
      ) {
        if (!o.hasAttribute("data-boot-ui-ready")) {
          if (o.hasAttribute("data-boot-ui-hold")) {
            o.setAttribute("data-boot-ui-revealing", "");
            var c = function () {
                o.removeAttribute("data-boot-ui-revealing");
              },
              l = setTimeout(c, 2e3);
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                (clearTimeout(l), (l = setTimeout(c, 200)));
              });
            });
          }
          o.setAttribute("data-boot-ui-ready", "timeout");
        }
      } else {
        var s = a ? Math.min(1e4, t - i) : 100;
        setTimeout(e, s, t, !a);
      }
    }, 1e4));
} catch (e) {}
