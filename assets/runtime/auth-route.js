try {
  (/^\/(log(in|out|ged-in)|magic-link|sso-callback|oauth|connect(or(-consent)?)?|device-code-verify|join|referral|invites|artifacts\/invite|org-discovery|no-organization|onboarding|create|(up|down)grade|team-promo|offers|perks|aws_marketplace|enterprise(-tos)?|lti|setup-(2fa|desktop-3p)|age-verification|idv-complete|unauthorized|us-govt-system-warning|desktop\/(approve|connected|tutorial)|(cli|desktop)_landing|code\/onboarding|claude-code(-install)?|chrome\/installed)(\/|$)/i.test(
    location.pathname,
  ) ||
    "on" ===
      (JSON.parse(localStorage.getItem("LSS-persisted.kind-breeze")) || 0)
        .value) &&
    document.documentElement.setAttribute("data-cds-contrast", "more");
} catch (e) {}
