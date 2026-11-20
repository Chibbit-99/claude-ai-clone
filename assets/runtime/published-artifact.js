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
