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
