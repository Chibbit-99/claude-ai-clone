/* clone-section: compose-prelude */
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

/* clone-section: head-start */
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

/* clone-section: restore-guard */
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

/* clone-section: bootstrap-account */
"use strict";
(() => {
  function e(e) {
    return e?.apart?.id;
  }
  function t(e) {
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
  function r() {
    return t("sessionKeyLC") || t("sessionKeyV3LC") || void 0;
  }
  !(function () {
    let t = { resolve: null };
    try {
      performance.mark?.("rq_cache:preload_start");
      let o = "keyval-store",
        n = "keyval",
        a = "react-query-cache",
        c = "store:chat-draft:chorus-unified-composer",
        s = "__PRELOADED_CHAT_DRAFT_READS__",
        l = "__PRELOADED_CHAT_DRAFT_READS_MARKER__",
        i = "__PRELOADED_CHAT_DRAFT_READS_PLANTED_AT__",
        _ = "__PRELOADED_CHAT_DRAFT_READS_SIGNAL__",
        d = "chat-draft-write-signal",
        u = window.location.pathname,
        D = r();
      if (("/new" === u || "/new/" === u || "/" === u || "/login" === u) && D) {
        let e = window;
        ((e[l] = D), (e[i] = Date.now()));
        try {
          e[_] = localStorage.getItem(d);
        } catch {}
        e[s] = {
          [c]: new Promise((e) => {
            t.resolve = e;
          }),
        };
      }
      let v = new Promise((r) => {
        let s = (e) => {
          ((window.__PRELOADED_IDB_CACHE_SETTLED__ = !0), r(e));
          try {
            performance.mark?.("rq_cache:preload_settled");
          } catch {}
        };
        if (!window.indexedDB) return (t.resolve?.(void 0), void s(void 0));
        let l = indexedDB.open(o);
        ((l.onupgradeneeded = (e) => {
          (l.transaction?.abort(),
            (window.__PRELOADED_IDB_DATABASE_MISSING__ = !0),
            (window.__PRELOADED_IDB_DATA_LOSS__ = e.dataLoss));
        }),
          (l.onerror = () => {
            (t.resolve?.(void 0), s(void 0));
          }),
          (l.onsuccess = () => {
            let r = l.result;
            if (!r.objectStoreNames.contains(n))
              return (
                r.close(),
                indexedDB.deleteDatabase(o),
                t.resolve?.(void 0),
                void s(void 0)
              );
            try {
              let o = r.transaction(n, "readonly"),
                l = o.objectStore(n),
                i = t.resolve;
              if (i) {
                let e = l.get(c);
                ((e.onerror = (e) => {
                  (e.preventDefault(), i(void 0));
                }),
                  (e.onsuccess = () =>
                    i({ v: e.result, t: performance.now() })));
              }
              let _ = null;
              try {
                _ = localStorage.getItem("react-query-cache:apart-id");
              } catch {}
              let d = (e) => {
                  let t = l.get("react-query-cache:apart:" + e);
                  return ((t.onerror = (e) => e.preventDefault()), t);
                },
                u = _ ? d(_) : void 0,
                D = l.get(a);
              D.onerror = () => {
                (r.close(), s(void 0));
              };
              let v = (t) => {
                (r.close(),
                  (function (t, r) {
                    try {
                      let o = t,
                        n = e(t),
                        a = n && r();
                      a &&
                        a.id === n &&
                        a.values.length === o.apart.at.length &&
                        (o.apart.at.forEach(([e, t], r) => {
                          let { state: n } = o.clientState.queries[e];
                          t
                            ? (n.data[t] = a.values[r])
                            : (n.data = a.values[r]);
                        }),
                        (o.buster = o.buster.slice(6)));
                    } catch {}
                  })(D.result, () => t?.result),
                  (window.__PRELOADED_IDB_CACHE_RESULT__ = D.result),
                  s(D.result));
              };
              D.onsuccess = () => {
                let t = e(D.result);
                if (t && t !== _) {
                  let e = d(t);
                  o.oncomplete = o.onabort = () => v(e);
                } else v(u);
              };
            } catch {
              (r.close(), t.resolve?.(void 0), s(void 0));
            }
          }));
      });
      ((window.__PRELOADED_IDB_CACHE__ = v),
        v.catch(() => {
          t.resolve?.(void 0);
        }),
        performance.measure?.("rq_cache:preload_exec", {
          start: "rq_cache:preload_start",
        }));
      try {
        !(function () {
          let e,
            t = window,
            o =
              /^\/chat\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\/?$/i.exec(
                location.pathname,
              ),
            n = o
              ? null
              : /^\/(?:cowork|local_sessions|cowork_sessions)\/(?:session_|cse_)([A-Za-z0-9_]{1,64})\/?$/.exec(
                  location.pathname,
                ),
            a = o ? o[1] : n ? "cowork:cse_" + n[1] : "",
            c = (e) => {
              t.__PRELOADED_CONV_RECORD__ = e;
            },
            s = (e) => c({ uuid: a, skipped: e });
          if (!a) return s("not_chat_path");
          if (!window.indexedDB) return s("no_indexeddb");
          if (!r()) return s("no_marker");
          try {
            let t = localStorage.getItem("spa:rqCacheRetention"),
              r = t && JSON.parse(t)?.conversationStore;
            if (
              !r ||
              !(r.days >= 1) ||
              !(r.max >= 1) ||
              (n &&
                (!Array.isArray(r.products) || !r.products.includes("cowork")))
            )
              return s("store_off");
            if (
              n &&
              (!/claude(nest|gov)?\/[^ ]/i.test(navigator.userAgent) ||
                !window.claudeAppBindings)
            )
              return s("not_desktop_app");
            if (localStorage.getItem("conversation-store:clear-pending"))
              return s("clear_pending");
            e = localStorage.getItem("conversation-store:unsaved:" + a);
          } catch {
            return s("storage_error");
          }
          let l = performance.now();
          t.__PRELOADED_CONV_RECORD_P__ = new Promise((t) => {
            let r,
              o = (r) => {
                (c({
                  uuid: a,
                  record: r,
                  unsaved: e,
                  readMs: performance.now() - l,
                }),
                  t(null !== r));
              };
            try {
              r = indexedDB.open("claude-conversation-store");
            } catch {
              return void o(null);
            }
            ((r.onupgradeneeded = () => {
              r.transaction?.abort();
            }),
              (r.onerror = () => o(null)),
              (r.onsuccess = () => {
                let e = r.result;
                if (
                  ((e.onversionchange = () => e.close()),
                  !e.objectStoreNames.contains("trees"))
                )
                  return (e.close(), void o(null));
                try {
                  let t = e
                    .transaction("trees", "readonly")
                    .objectStore("trees")
                    .get(a);
                  ((t.onsuccess = () => {
                    (e.close(), o(t.result ?? null));
                  }),
                    (t.onerror = () => {
                      (e.close(), o(null));
                    }));
                } catch {
                  (e.close(), o(null));
                }
              }));
          });
        })();
      } catch {}
    } catch {
      t.resolve?.(void 0);
    }
  })();
})();

/* clone-section: cookie-settings */
"use strict";
(() => {
  function t(t) {
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
  function e() {
    return t("sessionKeyLC") || t("sessionKeyV3LC") || void 0;
  }
  try {
    if (!0 !== window.__ml_hop_pending) {
      let t = document.head.dataset.ionDefaultRouteHint,
        { hash: a } = location,
        o =
          (!a || a.startsWith("#visitor_id=")) &&
          /^(?:[?&](?:(?:redirect=claude\.com|via|attempt|utm_\w*|gad_\w*|gclsrc|targetid|gclid|gbraid|wbraid|dclid|fbclid|ttclid|rdt_cid|msclkid|li_fat_id|twclid|cookie_consent|locale|lang|languageid|hl|country|sessionId)(?:=[^?&]*)?)?)*$/.test(
            location.search,
          ),
        i = !t || "new_chat" === t,
        n = location.pathname,
        r =
          "/" === n &&
          e() &&
          (!o ||
            (i &&
              !(function () {
                try {
                  return "1" === localStorage.getItem("spa:rph");
                } catch {
                  return !1;
                }
              })()));
      r || "/new/" === n
        ? (history.replaceState(
            history.state,
            "",
            "/new" + location.search + location.hash,
          ),
          r &&
            "/new" === location.pathname &&
            performance.mark?.("claude:root_path_rewritten"))
        : "/login" === n &&
          o &&
          !a &&
          i &&
          document.head.dataset.ionDefaultRouteHintOutcome &&
          "1" === localStorage.getItem("spa:cai_cheerful_prism") &&
          e() &&
          !sessionStorage.getItem("oauth_return_to") &&
          !(
            Math.abs(
              Date.now() -
                Number(sessionStorage.getItem("__post_login_settle")),
            ) < 6e4
          ) &&
          !/claude(nest|gov)?\/[^ ]/i.test(navigator.userAgent) &&
          (history.replaceState(history.state, "", "/new" + location.search),
          "/new" === location.pathname &&
            performance.mark?.("claude:login_path_rewritten"));
    }
  } catch {}
})();

/* clone-section: locale-preference */
"use strict";
(() => {
  var t = "spa:locale",
    e = { no: "nb", nn: "nb", tl: "fil" };
  function n(t, n = "zh-hans") {
    let a = t.indexOf("-"),
      o = -1 === a ? t : t.slice(0, a);
    return "zh" !== o
      ? Object.hasOwn(e, o)
        ? e[o]
        : o
      : "zh" === t
        ? n
        : /-hans\b/.test(t) || !/-(tw|hk|mo|hant)\b/.test(t)
          ? "zh-hans"
          : "zh-hant";
  }
  function a(t, e) {
    let a,
      o = (t) =>
        e.findLast((e) => e.toLowerCase() === t) ??
        e.find((e) => n(e.toLowerCase()) === t);
    for (let e of t)
      if (e) {
        let t = e.toLowerCase(),
          s = n(t, a);
        ("zh" === t || t.startsWith("zh-")) && (a ?? (a = s));
        let i = o(t) ?? o(s);
        if (i) return i;
      }
  }
  try {
    let e = document.querySelector('meta[name="i18n-catalogs"]')?.dataset
      .i18nReleased;
    if (
      e &&
      !0 !== window.__ml_hop_pending &&
      !window.__SKIP_FIRST_VISIT_LOCALE__ &&
      self === top &&
      !location.pathname.startsWith("/mobile/") &&
      !localStorage.getItem(t)
    ) {
      let n = [
          "en-US",
          "de-DE",
          "fr-FR",
          "ko-KR",
          "ja-JP",
          "es-419",
          "es-ES",
          "it-IT",
          "hi-IN",
          "pt-BR",
          "id-ID",
        ],
        o = navigator.languages || [],
        s = a(o, [...n, ...e.split(",")]);
      s &&
        !n.includes(s) &&
        (localStorage.setItem(t, s),
        (window.__FIRST_VISIT_LOCALE__ = { to: s, from: a(o, n) ?? "en-US" }));
    }
  } catch {}
})();

/* clone-section: bootstrap-prefetch */
"use strict";
(() => {
  function e(e) {
    return document.cookie
      .split(";")
      .map((e) => e.trim())
      .filter((t) => t.startsWith(e + "="));
  }
  function t(t) {
    let n = e(t)[0];
    try {
      return n && decodeURIComponent(n.slice(t.length + 1));
    } catch {}
  }
  function n() {
    if (
      (function (e) {
        try {
          return /^\/+perks\/+[^/]/.test(
            decodeURIComponent(e)
              .replace(/[^ -~\u0080-\uffff]/g, "")
              .toLowerCase(),
          );
        } catch {
          return !0;
        }
      })(window.location.pathname)
    )
      return;
    let e = window,
      n = e.desktopManagedConfig ?? e.desktopEnterpriseConfig;
    if (n?.disableNonessentialTelemetry) return;
    let a = (function (e) {
      let t =
        e.length >= 2 && e.startsWith('"') && e.endsWith('"')
          ? e.slice(1, -1)
          : e;
      return /^[a-zA-Z0-9_.-]{1,128}$/.test(t) ? t : void 0;
    })(t("ajs_anonymous_id") ?? "");
    return (
      a ||
      (s() && "1p" !== n?.deploymentMode
        ? void 0
        : (void 0 === e.__PAGE_ANONYMOUS_ID__ &&
            crypto.randomUUID &&
            (e.__PAGE_ANONYMOUS_ID__ = "claudeai.v1." + crypto.randomUUID()),
          e.__PAGE_ANONYMOUS_ID__))
    );
  }
  var a = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  function o(n) {
    let o = t(n),
      r = e(n);
    if (o) return a.test(o) && new Set(r).size < 2 ? o : "unknown";
  }
  var r = /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]{2,8}){0,3}$/;
  function i(e) {
    let t =
        "en-US" === e
          ? /^en-([a-z]{2})$/i
              .exec(
                (function () {
                  let e = window.desktopPreferredLanguages,
                    t = Array.isArray(e) ? e[0] : void 0;
                  return "string" == typeof t && /^en-[a-z]{2}$/i.test(t)
                    ? t
                    : navigator.language;
                })(),
              )?.[1]
              ?.toUpperCase()
          : void 0,
      n = t && "US" !== t ? "en-" + t + ", en-US;q=0.9" : e,
      a =
        t && "US" !== t
          ? ["en-" + t.toLowerCase(), "en-us"]
          : [e.toLowerCase()];
    for (let e of navigator.languages || []) {
      let t = e.toLowerCase();
      if (!r.test(e) || a.includes(t)) continue;
      if (10 === a.length) break;
      let o = ", " + e + ";q=0." + (10 - a.length);
      if (n.length + o.length > 120) break;
      (a.push(t), (n += o));
    }
    return n;
  }
  function s() {
    let e = navigator.userAgent.toLowerCase();
    return (
      (e.indexOf("claude/") >= 0 ||
        e.indexOf("claudenest/") >= 0 ||
        e.indexOf("claudegov/") >= 0) &&
      !!window.claudeAppBindings
    );
  }
  function c() {
    let e = document.documentElement.dataset,
      t = {
        "anthropic-client-sha": e.gitHash ?? "unknown",
        "anthropic-client-version": e.version ?? "unknown",
        "anthropic-client-build": e.buildTimestamp ?? "unknown",
        "anthropic-client-capabilities":
          "mfa_sms_v1, mfa_email_v1, greeting_timed_line_v1",
        "anthropic-device-id": o("anthropic-device-id") ?? "unknown",
        "anthropic-client-platform": s() ? "desktop_app" : "web_claude_ai",
      },
      a = n();
    a && (t["anthropic-anonymous-id"] = a);
    let r = o("activitySessionId");
    return (r && (t["x-activity-session-id"] = r), t);
  }
  var l = /^\/mobile\/(mcp-app-runtime|web-view-sandbox-runtime|time-limits)\//,
    d = /[?&]platform=([^&#]*)/,
    p = /[?&]appVersion=([^&#]*)/,
    u = /^[0-9A-Za-z][0-9A-Za-z.+-]{0,63}$/;
  function _(e, t) {
    let n = t.exec(e);
    if (null === n) return null;
    try {
      return decodeURIComponent(n[1]);
    } catch {
      return null;
    }
  }
  var h = /^\/(new|recents|chats|chat\/[\w-]{36})\/?$/;
  var f = [
    "en-US",
    "de-DE",
    "fr-FR",
    "ko-KR",
    "ja-JP",
    "es-419",
    "es-ES",
    "it-IT",
    "hi-IN",
    "pt-BR",
    "id-ID",
  ];
  try {
    if (window.__SKIP_BOOTSTRAP_PRELOAD__) throw new Error();
    if (
      (function () {
        if (!l.test(window.location.pathname)) return !1;
        let e = _(window.location.search, d);
        if ("ios" !== e && "android" !== e) return !1;
        let t = _(window.location.search, p);
        return null !== t && u.test(t);
      })()
    )
      throw ((window.__BOOTSTRAP_PRELOAD__ = { wrapperSkip: !0 }), new Error());
    performance.mark?.("bootstrap:preload_start");
    let e,
      {
        path: n,
        headers: o,
        sessionMarker: s,
      } = (function (e = {}) {
        let n = e.apiPrefix ?? "/edge-api",
          o = t("lastActiveOrg"),
          s = t("sessionKeyLC") || t("sessionKeyV3LC") || void 0,
          l = !e.skipOrgPath && s && o && a.test(o) ? o : void 0,
          d =
            "?statsig_hashing_algorithm=djb2&growthbook_format=sdk&cache_bust=1&include_system_prompts=false",
          p = l
            ? n + "/bootstrap/" + l + "/app_start" + d
            : n + "/bootstrap" + d,
          u = c(),
          _ = (function () {
            try {
              let e = localStorage.getItem("spa:locale");
              return e && r.test(e) ? e : void 0;
            } catch {
              return;
            }
          })();
        _ && (u["accept-language"] = i(_));
        let h = _ ?? e.renderedLocale;
        return (
          h && (u["x-app-locale"] = h),
          { path: p, headers: u, sessionMarker: s }
        );
      })({
        renderedLocale: (function (e, t = f) {
          let n = new Map();
          for (let e of t) {
            let t = e.toLowerCase();
            n.set(t, e);
            let a = t.split("-")[0];
            n.has(a) || n.set(a, e);
          }
          for (let t of e)
            if (t) {
              let e = t.toLowerCase(),
                a = n.get(e) ?? n.get(e.split("-")[0]);
              if (a) return a;
            }
          return "en-US";
        })(navigator.languages || []),
      }),
      w = window.__PRELOADED_IDB_CACHE__;
    try {
      let t = /^(\S+) ([\w-]{2562})$/.exec(
        localStorage.getItem("claudeai.gatedHeld.v1") ?? "",
      );
      w &&
        t &&
        t[1] === s &&
        ((e = { digest: t[2], snapshot: w }), (o["x-gated-held"] = t[2]));
    } catch {}
    let g = document.cookie,
      m = fetch(n, { credentials: "include", headers: o });
    window.__BOOTSTRAP_PRELOAD__ = {
      promise: m,
      body: m.then((e) => e.json()).catch(() => null),
      path: n,
      sessionMarker: s,
      cookieHeader: g,
      locale: o["x-app-locale"],
      held: e,
    };
    let v = (e) =>
      performance.mark?.("bootstrap:preload_response", { detail: { ok: e } });
    (m
      .then(
        (e) => v(e.ok),
        () => v(!1),
      )
      .catch(() => {}),
      performance.measure?.("bootstrap:preload_exec", {
        start: "bootstrap:preload_start",
      }));
    let k = (function (e) {
      let t = /bootstrap\/(.{36})\//.exec(e)?.[1];
      return t &&
        window.top === window &&
        h.test(location.pathname) &&
        !/[?&]incognito\b/.test(location.search)
        ? "/api/organizations/" +
            t +
            "/chat_conversations_v2?limit=30&offset=0&archived=false&consistency=eventual"
        : void 0;
    })(n);
    if (k && "1" !== localStorage.getItem("persisted.spa:cai_mossy_shore")) {
      let e = fetch(k, {
        credentials: "include",
        cache: "no-store",
        headers: { ...c(), "Cache-Control": "no-cache", Pragma: "no-cache" },
      }).then(async (e) => [e, await e.text()]);
      (e.catch(() => {}),
        (window.__CHAT_LIST_PRELOAD__ = {
          path: k,
          cookieHeader: g,
          sentAt: Date.now(),
          answer: e,
        }));
    }
  } catch {}
})();

/* clone-section: published-artifact */
"use strict";
(() => {
  function e(e) {
    return `/api/published_artifacts/${e}`;
  }
  function t(e) {
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
  try {
    let r = "([0-9a-fA-F]{8}(?:-[0-9a-fA-F]{4}){3}-[0-9a-fA-F]{12})",
      s = new RegExp(
        "^/(?:public/artifacts/" + r + "(?:/embed)?|share/" + r + ")$",
      ).exec(location.pathname),
      n = s?.[1]
        ? [e(s[1]), e(s[1]) + "/meta"]
        : s?.[2] &&
            void 0 === (t("sessionKeyLC") || t("sessionKeyV3LC") || void 0)
          ? [
              (function (e) {
                return `/api/chat_snapshots/${e}?rendering_mode=messages&render_all_tools=true&renders_source_card=true&renders_tally_table_bars=true`;
              })(s[2]),
            ]
          : void 0;
    if (n) {
      let e = { responses: {} };
      window.__PUBLIC_VIEWER_PRELOAD__ = e;
      for (let t of n)
        (e.responses[t] = fetch(t, { credentials: "include" })).catch(() => {});
    }
  } catch {}
})();

/* clone-section: locale-selection */
"use strict";
(() => {
  var e = "en-US",
    t = [
      "en-US",
      "de-DE",
      "fr-FR",
      "ko-KR",
      "ja-JP",
      "es-419",
      "es-ES",
      "it-IT",
      "hi-IN",
      "pt-BR",
      "id-ID",
    ];
  function n(n, o = t) {
    let r = new Map();
    for (let e of o) {
      let t = e.toLowerCase();
      r.set(t, e);
      let n = t.split("-")[0];
      r.has(n) || r.set(n, e);
    }
    for (let e of n)
      if (e) {
        let t = e.toLowerCase(),
          n = r.get(t) ?? r.get(t.split("-")[0]);
        if (n) return n;
      }
    return e;
  }
  function o(e = r()?.dataset.i18nCatalogs || "") {
    let t = [];
    for (let n of e.split(",")) {
      let e = /^([\w-]+):([\w-]+)\.([\w-]+)$/.exec(n);
      e && t.push(e.slice(1));
    }
    return t;
  }
  function r() {
    try {
      return document.querySelector('meta[name="i18n-catalogs"]');
    } catch {
      return null;
    }
  }
  try {
    let t = (function () {
      let e = null;
      try {
        e = localStorage.getItem("spa:locale");
      } catch {}
      if (!e) return n(navigator.languages);
      let t = e.toLowerCase();
      for (let [e] of o()) if (e.toLowerCase() === t) return e;
      return n([e]);
    })();
    if (
      ((document.documentElement.lang = window.__FIRST_PAINT_LOCALE__ = t),
      (function (e) {
        r()?.dataset.i18nRtl?.split(",")?.includes(e) &&
          (document.documentElement.dir = window.__FIRST_PAINT_DIR__ = "rtl");
      })(t),
      window.__SKIP_I18N_CATALOG_PRELOAD__)
    )
      throw new Error();
    if (t === e) throw new Error();
    performance.mark?.("i18n:catalog_preload_start");
    let a = (function (e) {
        let t = r()?.dataset,
          n = encodeURIComponent(e);
        return (
          (function (e, t = "", n = "") {
            for (let [r, a, l] of o(t))
              if (r === e)
                return {
                  base: "/i18n/" + n + e + ".json?v=" + a,
                  dynamic: "/i18n/dynamic/" + e + ".json?v=" + l,
                };
          })(e, t?.i18nCatalogs, t?.i18nCut) || {
            base: "/i18n/" + n + ".json",
            dynamic: "/i18n/dynamic/" + n + ".json",
          }
        );
      })(t),
      l = {},
      i = {},
      s = {};
    for (let e of [a.base, a.dynamic]) {
      let t = fetch(e),
        n = t.then((e) => (e.ok ? e.json() : void 0));
      (n.then(
        (t) => {
          t && (s[e] = performance.now());
        },
        () => {},
      ),
        (l[e] = t),
        (i[e] = n));
    }
    let c = { locale: t, responses: l, bodies: i, parsedAt: s };
    ((window.__I18N_CATALOG_PRELOAD__ = c),
      performance.measure?.("i18n:catalog_preload_exec", {
        start: "i18n:catalog_preload_start",
      }));
  } catch {}
})();

/* clone-section: boot-recovery */
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

/* clone-section: early-run */
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

/* clone-section: head-preferences */
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

/* clone-section: language-font */
"use strict";
(() => {
  var t = new Set(["tw", "hk", "mo"]);
  function e(e) {
    let [n, ...r] = e.toLowerCase().split(/[-_]/);
    if ("ja" === n) return "ja";
    if ("ko" === n) return "ko";
    if ("zh" !== n && "yue" !== n) return null;
    let u = r.find((t) => 4 === t.length);
    if ("hant" === u) return "zh-hant";
    if ("hans" === u) return "zh-hans";
    let a = r.find((t) => 2 === t.length);
    return (void 0 !== a && t.has(a)) || "yue" === n ? "zh-hant" : "zh-hans";
  }
  try {
    document.documentElement.setAttribute(
      "data-cjk-order",
      (function (t) {
        for (let n of t) {
          let t = e(n);
          if (null !== t) return t;
        }
        return null;
      })(
        (function () {
          let t = window.desktopPreferredLanguages,
            e = Array.isArray(t) ? t.filter((t) => "string" == typeof t) : [];
          return e.length > 0 ? e : navigator.languages;
        })(),
      ) ?? "none",
    );
  } catch {}
})();

/* clone-section: theme-mode */
try {
  let e,
    t = document.documentElement.dataset,
    a = t.mode;
  try {
    ((e = JSON.parse(localStorage.getItem("LSS-userThemeMode"))),
      (e = e.value || e));
  } catch {}
  ("light" === e ||
    "dark" === e ||
    (e =
      "system" === a
        ? a
        : matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"),
    e === a ||
      ((t.mode = e), performance.mark("claude:served_mode", { detail: a })));
} catch {}

/* clone-section: auth-route */
try {
  (/^\/(log(in|out|ged-in)|magic-link|sso-callback|oauth|connect(or(-consent)?)?|device-code-verify|join|referral|invites|artifacts\/invite|org-discovery|no-organization|onboarding|create|(up|down)grade|team-promo|offers|perks|aws_marketplace|enterprise(-tos)?|lti|setup-(2fa|desktop-3p)|age-verification|idv-complete|unauthorized|us-govt-system-warning|desktop\/(approve|connected|tutorial)|(cli|desktop)_landing|code\/onboarding|claude-code(-install)?|chrome\/installed)(\/|$)/i.test(
    location.pathname,
  ) ||
    "on" ===
      (JSON.parse(localStorage.getItem("LSS-persisted.kind-breeze")) || 0)
        .value) &&
    document.documentElement.setAttribute("data-cds-contrast", "more");
} catch (e) {}

/* clone-section: dock-layout */
"use strict";
(() => {
  var t = "new-page-dock-korea-latch";
  var e = 200,
    r = 420;
  function i(t) {
    return Math.min(r, Math.max(e, t));
  }
  var a = { collapsed: !1, sidebarWidth: 288 };
  var n = "data-sidebar-chrome";
  var d = ["classic", "home", "home-raised"];
  var o,
    s = "--prerender-activation-viewport-height",
    l = "data-prerender-headroom-arm";
  try {
    if (
      (((function (t) {
        return "KR" === t.head?.dataset.ionIpCountry;
      })((o = document)) ||
        (function (e) {
          try {
            return "1" === e.defaultView?.localStorage.getItem(t);
          } catch {
            return !1;
          }
        })(o)) &&
        o.documentElement.setAttribute("data-new-page-korea", ""),
      "/new" === window.location.pathname)
    ) {
      !(function (t) {
        !0 === t.prerendering &&
          t.addEventListener(
            "prerenderingchange",
            () => {
              try {
                let e = t.documentElement,
                  r = t.createElement("div");
                ((r.style.cssText = "position:fixed;height:100vh"),
                  e.appendChild(r));
                let i = r.getBoundingClientRect().height;
                if ((r.remove(), !(i > 0))) return;
                (e.style.setProperty(s, i + "px"),
                  e.setAttribute(l, i >= 900 ? "tall" : "short"));
                let a = innerWidth,
                  n = innerHeight,
                  d = () => {
                    let t = innerHeight - n;
                    (innerWidth !== a || t < 0 || t > 150) &&
                      (e.style.setProperty(s, "100vh"),
                      e.removeAttribute(l),
                      removeEventListener("resize", d));
                  };
                (addEventListener("resize", d), requestAnimationFrame(d));
              } catch {}
            },
            { once: !0 },
          );
      })(document);
      let t = document.documentElement;
      t.setAttribute("data-sidebar-chrome-preference", "rail");
      let r = navigator.userAgent,
        o = /claude(nest|gov)?\/[^ ]/i.test(r) && !!window.claudeAppBindings;
      o && t.setAttribute("data-sidebar-desktop-app", "");
      let c = window.localStorage,
        u = window.innerWidth,
        h = c.getItem("dframe-store"),
        p = (function (t) {
          let { collapsed: e, sidebarWidth: r } = (function (t) {
              if (null === t) return a;
              try {
                let e = JSON.parse(t);
                if ("object" != typeof e || null === e) return a;
                let r = e.state;
                if ("object" != typeof r || null === r) return a;
                let n = r;
                return {
                  collapsed: !!n.collapsed,
                  sidebarWidth:
                    "number" == typeof n.sidebarWidth
                      ? i(n.sidebarWidth)
                      : a.sidebarWidth,
                };
              } catch {
                return a;
              }
            })(t.dframeStoreRaw),
            n = (function (t) {
              return Math.max(700, Math.ceil(t) + 330 - 1);
            })(r),
            d = !e && (700 === n || t.viewportWidth > n);
          return { chrome: "rail", showSidebar: d, sidebarWidth: d ? r : null };
        })({ dframeStoreRaw: h, viewportWidth: u }),
        m =
          "hub" === c.getItem("claudeai.lastChatHost.v1") &&
          "classic" !== c.getItem("claudeai.lastChatLook.v1"),
        b =
          !o &&
          ((function (t) {
            let e = t.getItem("app-switcher-wordmark-latch");
            return (
              "1" === e || ("0" !== e && "sso" !== t.getItem("lastLoginMethod"))
            );
          })(c) ||
            m);
      b && t.setAttribute("data-sidebar-app-switcher", "");
      let g = (function (t) {
        return d.includes(t) ? t : null;
      })(c.getItem("new-page-layout-latch"));
      if (
        (null !== g &&
          "classic" !== g &&
          t.setAttribute("data-new-page-layout", g),
        t.setAttribute("data-prepaint-viewport-width", String(u)),
        t.setAttribute(
          "data-prepaint-viewport-height",
          String(window.innerHeight),
        ),
        p.showSidebar)
      ) {
        if ((t.setAttribute(n, p.chrome), null !== p.sidebarWidth)) {
          let r = b ? Math.max(p.sidebarWidth, e + 32) : p.sidebarWidth;
          (t.setAttribute("data-sidebar-width", String(r)),
            t.style.setProperty("--static-sidebar-width", r + "px"));
        }
      } else t.setAttribute(n, "none");
      let w = c.getItem("new-page-control-line-count-latch");
      (w === u + ":1" || w === u + ":2") &&
        t.setAttribute("data-new-page-control-line-count", w.slice(-1));
      let f = (function (t, e) {
        let r = t ?? /"interfaceFont":"([^"]*)"/.exec(e ?? "")?.[1];
        return "system" === r || "dyslexic" === r || "atkinson" === r
          ? r
          : null;
      })(c.getItem("persisted.interface-font"), h);
      f &&
        (t.setAttribute("data-font", "system"),
        t.setAttribute(`data-${f}-font`, ""));
    }
  } catch {}
})();

/* clone-section: fizzy-lake */
document.documentElement.setAttribute(
  "data-cds-fizzy-lake",
  "color panels type",
);

/* clone-section: js-cannot-start */
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

/* clone-section: static-composer-init */
"use strict";
(() => {
  function e() {
    return !(
      "function" == typeof matchMedia &&
      matchMedia("(pointer: coarse)").matches &&
      navigator.maxTouchPoints > 0
    );
  }
  function t() {
    return /win32|win64|windows|wince/i.test(navigator.userAgent) || e();
  }
  var n = ["classic", "marlin"];
  var r = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  function a(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
  }
  function i(e) {
    return (
      Array.isArray(e) &&
      e.every(
        (e) =>
          a(e) && Number.isSafeInteger(e.until) && "string" == typeof e.text,
      )
    );
  }
  function o(e) {
    return (
      a(e) &&
      "string" == typeof e.surface &&
      Array.isArray(e.days ?? []) &&
      (e.days ?? []).every(
        (e) => a(e) && "string" == typeof e.day && i(e.slots),
      ) &&
      i(e.default_slots)
    );
  }
  function s(e) {
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
  var l = "en-US";
  var c = ["classic", "home", "home-raised"],
    d = "data-new-page-layout";
  function u(e) {
    return c.includes(e) ? e : null;
  }
  function m(e, t, n) {
    if (null === e || "object" != typeof e) return "m";
    let { accountUuid: r, sessionMarker: a } = e;
    return "string" == typeof r && r && "string" == typeof a && a
      ? null === t
        ? "o"
        : r !== t
          ? "a"
          : a !== n
            ? "s"
            : null
      : "m";
  }
  function p(e) {
    try {
      let t = window;
      (
        t.__claudeStaticComposerSignals ??
        (t.__claudeStaticComposerSignals = [])
      ).push(e);
    } catch {}
  }
  var f = { kind: "none" };
  function h(e, t, n, r, a) {
    let { id: i } = n,
      o = "page-" + t;
    (e.addEventListener(
      t,
      (e) => {
        document
          .getElementById(i)
          ?.dispatchEvent(new CustomEvent(o, { detail: e }));
      },
      a,
    ),
      n.addEventListener(o, r));
  }
  function g(e, t) {
    return (
      "Enter" === e.key &&
      !e.shiftKey &&
      !e.altKey &&
      !e.isComposing &&
      229 !== e.keyCode &&
      (t || e.metaKey || e.ctrlKey)
    );
  }
  var y = "static-composer-typed-text-carry",
    v = `${y}-written-at`,
    w = 18e5;
  function b(e) {
    return (
      "1" !== e &&
      !(function (e) {
        return /\sClaude\/[\w.+-]+\s*$/.test(e);
      })(navigator.userAgent)
    );
  }
  function S() {
    for (let e of ["sessionKeyLC", "sessionKeyV3LC"]) {
      let t = s(e);
      if (t)
        return '""' === t ||
          RegExp("(sessionKeyLC|" + e + ")=.*\\1=", "s").test(document.cookie)
          ? ""
          : t;
    }
  }
  function A() {
    throw new Error();
  }
  try {
    "1" === localStorage.getItem("spa:cai_warm_music") &&
      (function () {
        let e = window;
        if (!e.setImmediate) {
          let t = (e.__antReactTaskHost = {
            post: (e) => {
              let t = e.channel ?? (e.channel = new MessageChannel());
              ((t.port1.onmessage = e), t.port2.postMessage(null));
            },
          });
          e.setImmediate = (e) => t.post(e);
        }
      })();
  } catch {}
  try {
    "/new" !== location.pathname && A();
    let a = document.head.dataset.ionDefaultRouteHint;
    a &&
      "new_chat" !== a &&
      !(function (e, t, n) {
        return e && t > 0 && n - t > 6e4;
      })(
        (function () {
          let e = performance.getEntriesByType?.("navigation")[0]?.type;
          return e ? "back_forward" === e : 2 === performance.navigation?.type;
        })(),
        Number(document.head.dataset.ionServedAt),
        Date.now(),
      ) &&
      A();
    let i = e(),
      s = document.prerendering,
      c = s && window.__SIGNIN_PRERENDER__,
      k = S() ?? (c ? "" : A()),
      E = new URLSearchParams(location.search.slice(1)),
      C = E.get("surface");
    (([
      "q",
      "attachment",
      "incognito",
      "cold",
      "project",
      "directory-open",
      "modal",
      "server",
      "step",
      "prompt_id",
    ].some((e) => E.has(e)) ||
      (null !== C && "cowork" !== C && "chat" !== C) ||
      "history" === E.get("view")) &&
      A(),
      (function () {
        if (typeof window > "u") return !1;
        try {
          return window.self !== window.top;
        } catch {
          return !0;
        }
      })() && A(),
      !1 === CSS.supports?.("height", "100dvh") && A());
    let _ = document.documentElement;
    (_.hasAttribute("data-sidebar-desktop-app") && (p("ba"), A()),
      b(k) || (p("bm"), A()));
    let x = document.hidden;
    x && !1 === s && (p("bh"), A());
    let I,
      L = !(s || x),
      D = document.getElementById("static-composer") ?? A(),
      N = D.querySelector("textarea") ?? A(),
      T = (e, t) => {
        try {
          return (t ? sessionStorage : localStorage).getItem(e);
        } catch {
          return null;
        }
      },
      R = T("rq-cache-confirmed-account"),
      F = T(v),
      K = window.__FIRST_PAINT_LOCALE__ ?? l,
      M = [
        "en-US",
        "de-DE",
        "fr-FR",
        "ko-KR",
        "ja-JP",
        "es-419",
        "es-ES",
        "it-IT",
        "hi-IN",
        "pt-BR",
        "id-ID",
      ].some((e) => e === K)
        ? K
        : l,
      $ = (e, t) => {
        let n = t(c ? null : T(e), R, k, M, K);
        if ("discard" === n.kind) {
          p(n.signal);
          try {
            localStorage.removeItem(e);
          } catch {}
        }
        return n;
      },
      B = "",
      q = "",
      H = 0,
      O = $("static-composer-draft-data", (e, t, n) =>
        (function (e, t, n, r) {
          if (null === e) return f;
          let a,
            i = { kind: "discard", signal: "dm" };
          try {
            a = JSON.parse(e) ?? {};
          } catch {
            return i;
          }
          let {
              updatedAt: o,
              attachmentCount: s,
              text: l,
              textOmittedReason: c,
              textLastChangedAt: d,
              textOmittedBecauseDraftIsPastTheAgeLimit: u,
            } = a,
            p = "exceeds-capacity" === c;
          if (
            "number" != typeof o ||
            (void 0 !== s && !(Number.isSafeInteger(s) && s >= 0)) ||
            (void 0 !== l && ("string" != typeof l || l.length > 4096)) ||
            (void 0 !== c && !p && "not-plain-text" !== c) ||
            (void 0 !== l) == (void 0 !== c)
          )
            return i;
          let h = m(a, t, n);
          if (null !== h && (n || "s" !== h || !c))
            return { kind: "discard", signal: `d${h}` };
          let g = void 0 === d ? o : d,
            y = "number" == typeof g ? r - g : Number.NaN,
            v = !h && (!(!l || (y > -6e4 && y < 864e5)) || (!0 === u && !p));
          return !v && c
            ? { kind: "bail", signal: p ? "bc" : "bp" }
            : {
                kind: "paint",
                text: v || l.trim().startsWith("/") ? "" : l,
                attachmentCount: s ?? 0,
                signal: v ? "pa" : void 0,
              };
        })(e, t, n, Date.now()),
      );
    if ("bail" === O.kind) (p(O.signal), A());
    else if ("paint" === O.kind) {
      if (((I = O.signal), I && p(I), O.text)) {
        let e = O.text;
        N.value = B = q = e;
        let t = !1;
        (D.setAttribute("data-mirror-draft-painted", R ?? ""),
          N.addEventListener(
            "input",
            () => {
              D.setAttribute("data-mirror-draft-edited", "");
              try {
                localStorage.setItem("draft-edited", "1");
              } catch {}
            },
            { once: !0 },
          ),
          N.addEventListener("beforeinput", (n) => {
            ((t = n.isTrusted && !n.defaultPrevented && N.value === e),
              t &&
                setTimeout(() => {
                  t = !1;
                }));
          }),
          N.addEventListener("input", (n) => {
            ((e = n.isTrusted && t ? N.value : null),
              (t = !1),
              (D.emptiedDraftText = "" === e ? q : ""));
          }));
      }
      ((H = O.attachmentCount),
        H > 0 && D.setAttribute("data-mirror-draft-attachment-count", `${H}`));
    }
    let P = () => {
      let e = I
        ? void 0
        : (function (e, t, n, r) {
            try {
              let a = sessionStorage.getItem(y);
              if (null !== a) {
                sessionStorage.removeItem(y);
                let i = JSON.parse(a),
                  { text: o, pathname: s, writtenAt: l, sessionMarker: c } = i;
                if (o !== r)
                  return "string" == typeof o &&
                    "number" == typeof l &&
                    s === e &&
                    t &&
                    c === t &&
                    b(t) &&
                    n - l < w &&
                    l - n < 6e4 &&
                    (function (e) {
                      return (
                        e.length <= 4096 &&
                        !(function (e) {
                          return "" === e.replace(/\u200B/g, "").trim();
                        })(e)
                      );
                    })(o)
                    ? o
                    : "";
              }
            } catch {}
          })(location.pathname, k, Date.now(), N.value);
      (e &&
        ((N.value = e),
        D.setAttribute("data-mirror-draft-edited", ""),
        (q = "")),
        void 0 !== e && p(e ? "tc" : "tr"));
    };
    if (
      (!c && (s || Math.abs(Date.now() - Number(F)) < w) && P(),
      !c && (s || (x && k)))
    ) {
      let e = () =>
        k && S() === k
          ? (document.hidden && D.isConnected && requestAnimationFrame(e), !0)
          : (D.isConnected &&
              (N.value !== B && p("tr"), B && p("dw"), D.remove()),
            !1);
      (h(document, "prerenderingchange", D, () => {
        (e() && P(), z?.());
      }),
        requestAnimationFrame(e));
    }
    let j =
      (function (e) {
        return n.includes(e) ? e : null;
      })(T("composer-card-latch")) ??
      (function (e) {
        return !e &&
          "function" == typeof matchMedia &&
          matchMedia("(pointer: coarse), (hover: none)").matches &&
          matchMedia("(width < 40rem)").matches
          ? "classic"
          : "marlin";
      })(_.hasAttribute(d));
    D.setAttribute("data-composer-arm", j);
    let U,
      J = () => {
        let e = _.getAttribute(d);
        D.querySelectorAll("[data-page-classes]").forEach((t) => {
          t.className = [
            (e && t.getAttribute("data-layout-" + e + "-classes")) ||
              t.getAttribute("data-page-classes"),
            t.getAttribute("data-" + j + "-classes"),
          ].join(" ");
        });
      };
    J();
    try {
      U = JSON.parse(
        document.getElementById("static-composer-translations")?.textContent ||
          "{}",
      )[K];
    } catch {}
    for (let e of ["placeholder", "aria-label"]) {
      let t = U?.[e];
      "string" == typeof t && t && N.setAttribute(e, t);
    }
    try {
      let e = document.getElementById("static-composer-greeting-text"),
        t = document.getElementById("static-composer-greeting-spark");
      if (e) {
        let n = U?.greeting,
          a = ("string" == typeof n && n) || "You’re here!";
        ((e.textContent = a),
          (e.className = "select-none"),
          t && (t.hidden = !1));
        let i = $("static-composer-greeting-data-v2", function (e, t, n, r, a) {
          if (null === e) return f;
          let i = null;
          try {
            i = JSON.parse(e);
          } catch {}
          let o =
            m(i, t, n) ??
            ("string" == typeof i.locale && i.locale !== r && i.locale !== a
              ? "l"
              : null);
          return null !== o
            ? { kind: "discard", signal: `g${o}` }
            : { kind: "paint", entries: i.entries };
        });
        if ("paint" === i.kind) {
          let t = i.entries.find((e) => "chat" === e.surface)?.timed_line,
            n = Date.now() / 1e3;
          (t && t.shown_from <= n && n < t.shown_until
            ? ((a = t.text), (e.dataset.shownUntil = `${t.shown_until}`))
            : (a =
                (function (e, t, n) {
                  if (
                    !(function (e) {
                      return Array.isArray(e) && e.every(o);
                    })(e)
                  )
                    return;
                  let a = e.find((e) => e.surface === t),
                    i = a?.days?.find((e) => e.day === r[n.getDay()]);
                  return (
                    (i ? i.slots : a?.default_slots)?.find(
                      (e) => n.getHours() < e.until,
                    )?.text || void 0
                  );
                })(i.entries, "chat", new Date()) || a),
            (e.textContent = a));
        }
      }
    } catch {}
    if (
      (function (e) {
        return "KR" === e.head?.dataset.ionIpCountry;
      })(document) &&
      "0" !== T("korea-disclosure-paint-latch")
    ) {
      let e = document.getElementById("static-composer-korea-disclosure");
      e && (e.hidden = !1);
    }
    let W = -1e8;
    (N.addEventListener("compositionstart", () => {
      p("cs");
    }),
      N.addEventListener("compositionend", (e) => {
        ((W = e.timeStamp), p("ce"));
      }));
    let z,
      V,
      G = (e) => {
        (!g(e, !0) || e.metaKey || e.ctrlKey) && (W = -1e8);
      };
    (N.addEventListener("keyup", G),
      N.addEventListener("keydown", (e) => {
        (G(e),
          g(e, t()) &&
            (e.preventDefault(),
            e.timeStamp - W < 500 && /Apple Computer/.test(navigator.vendor)
              ? (W = -1e8)
              : e.repeat || (p(`w${Date.now()}`), p("se"))),
          e.repeat ||
            (p(`k${e.timeStamp}@${performance.now()}`),
            /^(Shift|Control|Alt|Meta)$/.test(e.key) && p("mk")));
      }),
      N.addEventListener("input", () => {
        (p("ed"),
          Object.assign(N, { editedAt: performance.now() }),
          z?.() && N.scrollIntoView({ block: "nearest" }));
      }));
    let Y = (e) => {
      let t = (D.pastedFiles ?? (D.pastedFiles = [])).push(...e);
      D.dataset.keptFiles = D.dataset.mirrorDraftAttachmentCount = `${H + t}`;
    };
    (N.addEventListener("paste", (e) => {
      let t = e.clipboardData;
      t?.files.length && !t.getData("text/plain") && Y(t.files);
    }),
      (function (e, t) {
        for (let n of ["dragenter", "dragover", "drop"])
          h(window, n, e, ({ detail: e }) => {
            let r = e.dataTransfer;
            r?.types.includes("Files") &&
              !e.defaultPrevented &&
              (e.preventDefault(),
              "drop" === n &&
                r.files.length &&
                t(Array.from(r.files, (e) => ((e.dropped = !0), e))));
          });
      })(D, Y),
      (function (e) {
        h(
          window,
          "pointerdown",
          e,
          ({ detail: e }) => {
            e.isTrusted && p("kp");
          },
          !0,
        );
      })(D),
      (function (e, t, n) {
        h(
          window,
          "mouseup",
          e,
          ({ detail: e }) => {
            !e.button &&
              n &&
              t.id &&
              document.activeElement === document.body &&
              !String(getSelection()) &&
              (t.focus({ preventScroll: !0 }),
              (t.selectionStart = t.selectionEnd));
          },
          !0,
        );
      })(D, N, i),
      (D.hidden = !1),
      (N.disabled = !1));
    try {
      let e = () => {
          let e = N.cloneNode();
          ((e.style.cssText =
            "position:absolute;visibility:hidden;height:auto;white-space:normal;overflow:hidden;width:" +
            N.offsetWidth +
            "px"),
            (e.placeholder = e.value = ""),
            N.after(e));
          let t = e.scrollHeight;
          e.value = N.placeholder;
          let n = e.scrollHeight;
          (e.remove(), (N.style.minHeight = n - t > 1 ? n + "px" : ""));
        },
        t = CSS.supports("field-sizing:content"),
        n = [];
      if (
        (h(window, "resize", D, () => {
          n.forEach((e) => e());
        }),
        "marlin" === j)
      ) {
        let r = () => {
          (e(), document.fonts?.ready.then(e), n.push(e));
        };
        L && t ? (V = r) : r();
      }
      t ||
        ((z = () => {
          let e = N.style,
            t = e.height,
            n = D.scrollTop;
          return (
            (e.height = ""),
            (e.height = N.scrollHeight + "px"),
            n && (D.scrollTop = n),
            e.height !== t
          );
        }),
        z(),
        document.fonts?.ready.then(z),
        n.push(z),
        document.fonts
          ?.load("1em " + getComputedStyle(N).fontFamily.replace(/,.*/, ""))
          .then(z, z));
    } catch {}
    if (i) {
      if (N.value) {
        let e = N.value.length;
        N.setSelectionRange(e, e);
      }
      N.focus({ preventScroll: !0 });
    }
    (performance.mark?.("claude:static_composer_ready", {
      detail: { focused: document.activeElement === N },
    }),
      /Apple Computer/.test(navigator.vendor) && getComputedStyle(D).display);
    let Q = () => {
      if (c) {
        let e =
          u(T("signin-prerender:landed", !0)) ?? u(T("new-page-layout-latch"));
        (e && "classic" !== e ? _.setAttribute(d, e) : _.removeAttribute(d),
          J());
      }
    };
    ((L || c) &&
      requestAnimationFrame(() => {
        (D.isConnected || !c) &&
          performance.mark?.("claude:static_composer_painted");
        try {
          (Q(), D.isConnected && V?.());
        } catch {}
      }),
      i &&
        requestAnimationFrame(() => {
          N.value && (N.scrollTop = N.scrollHeight);
        }));
    let X = () => {
      setTimeout(() => {
        let e = D.querySelector("[role=status]"),
          t = U?.loading;
        e && (e.textContent = "string" == typeof t && t ? t : "Loading...");
      }, 4e3);
    };
    c
      ? c.released.then(() => {
          (X(), Q());
        })
      : X();
  } catch {}
})();

/* clone-section: boot-recovery-tail */
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

/* clone-section: icon-font-preload-inline */
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

/* clone-section: entry-stylesheet-guard */
((window.__entryStylesheetGuard = 1),
  performance.mark("claude:entry_css_guard"));

/* clone-section: session-check */
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
