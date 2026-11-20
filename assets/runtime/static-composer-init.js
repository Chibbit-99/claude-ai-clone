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
