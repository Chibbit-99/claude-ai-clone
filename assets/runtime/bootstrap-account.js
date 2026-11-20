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
