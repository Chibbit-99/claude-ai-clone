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
