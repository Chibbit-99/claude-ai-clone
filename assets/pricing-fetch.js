"use strict";

// Only intercept the captured display-pricing requests for the demo org.
(() => {
  const originalFetch = window.fetch.bind(window);
  const prefix = "/api/billing/00000000-0000-4000-8000-000000000002/";
  const fixtures = new Map([
    [prefix + "consumer_pricing", "consumer"],
    [prefix + "cw_pricing", "team"],
    [prefix + "individual_plan_pricing/v2", "individual"],
    [prefix + "ss_enterprise_pricing", "enterprise"],
  ]);

  window.fetch = async (input, init) => {
    const request = input instanceof Request ? input : null;
    const method = (init?.method ?? request?.method ?? "GET").toUpperCase();
    const url = new URL(request ? request.url : input, document.baseURI);
    const fixture = method === "POST" && url.origin === location.origin
      ? fixtures.get(url.pathname)
      : undefined;
    if (!fixture) return originalFetch(input, init);

    let payload;
    try {
      if (init?.body !== undefined) payload = JSON.parse(init.body);
      else if (request?.body) payload = await request.clone().json();
    } catch {
      return new Response('{"error":{"message":"Invalid pricing JSON"}}', {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }
    const interval = /^(year|yearly|annual|annually)$/i.test(payload?.billingInterval)
      ? "yearly"
      : "monthly";
    const file = fixture === "individual" ? fixture : `${fixture}-${interval}`;
    return originalFetch(`/api/fixtures/pricing/${file}.json`, {
      method: "GET",
      credentials: "omit",
      signal: init?.signal ?? request?.signal,
    });
  };
})();
