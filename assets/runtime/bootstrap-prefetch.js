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
