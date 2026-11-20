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
