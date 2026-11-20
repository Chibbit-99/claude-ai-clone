# Claude web UI clone

An unofficial, **UI-only demo** of the Claude web app. It starts from a captured page, loads the upstream frontend assets, and uses local JSON fixtures to give the interface a fictional account. The goal is to explore how the interface looks and behaves without building a full backend.

You can explore the composer and model picker, settings, projects, artifacts, and upgrade screens. The demo can show different plans and illustrative prices, but **it cannot generate AI responses, create real accounts, connect services, or process payments**. Chat history and projects start empty, and most settings are read-only. This is not an Anthropic product or a standalone Claude client.

## Run locally

You’ll need Python 3.9 or later; there are no Python packages or Node dependencies to install.

```sh
git clone https://github.com/Chibbit-99/claude-ai-clone.git
cd claude-ai-clone
python3 tools/serve.py
```

Open **http://localhost:8000/**. Use `python3 tools/serve.py --port 8080` if port 8000 is in use. Run the preview server instead of opening `index.html` directly: the server provides the page and API rewrites the demo needs. Internet access is required for the upstream scripts, styles, and fonts.

## Try another plan

Choose `free`, `pro`, `max`, or `ultra`:

```sh
python3 tools/set-demo-plan.py pro
```

Reload the page after changing the preset. This updates both bootstrap fixtures so the initial load and organization refresh agree. It changes the displayed plan and mock model availability, not actual access or billing.

On GitHub, use **Actions → Set demo plan → Run workflow**, then choose the target branch and plan. The workflow commits changes to the selected branch, so it needs write permission. Redeploy if your host doesn’t automatically pick up that commit.

## How the demo works

| Path | Purpose |
| --- | --- |
| [`assets/`](assets/) | Captured HTML template, extracted JavaScript and CSS, and inline JSON source data. |
| [`index.html`](index.html), [`assets/runtime/`](assets/runtime/) | Generated page and linked assets. The app still loads upstream bundles. |
| [`edge-api/`](edge-api/) | Fictional account, organization, plan, model selector, and access data used during startup. |
| [`api/fixtures/`](api/fixtures/), [`v1/`](v1/) | Static responses for selected requests, including settings, projects, and pricing. |
| [`assets/pricing-fetch.js`](assets/pricing-fetch.js) | Maps four demo pricing POST calls to static JSON GETs. It does not handle checkout. |
| [`tools/serve.py`](tools/serve.py), [`render.yaml`](render.yaml) | Exact-path rewrites for local preview and Render Static Sites. |

## Make changes

Edit the template or the extracted sections in `assets/`, not the generated HTML or runtime copies. Keep the named section markers intact. The build keeps the original script and stylesheet order and puts DOM-read JSON back inline.

```sh
python3 tools/split-clone.py build  # regenerate index.html and assets/runtime/
python3 tools/split-clone.py check  # verify generated files are in sync
```

JSON fixture changes don’t require rebuilding the HTML. When adding an endpoint, update both the local rewrite map in `tools/serve.py` and `render.yaml`. Match the path without the query string. Use fictional data only; don’t commit browser cookies, tokens, or personal account captures.

## Deploy to Render

[`render.yaml`](render.yaml) defines a Render Static Site that publishes the repository root. If your existing site isn’t managed by a Blueprint, copy the `routes` entries into **Redirects/Rewrites** as **Rewrite** rules. These include page routes such as `/new` and API routes that serve JSON. Don’t add a catch-all rewrite to `/`: missing APIs and assets should still return 404 rather than HTML. The custom [`404.html`](404.html) sends top-level visitors back to the homepage.

## Known limitations

- A `200` from a fixture confirms it was served, not that the upstream client accepts its full shape. Some screens may show loading placeholders, and unmocked endpoints may return 404.
- The support widget is unsupported. Intercom warnings can appear because the demo intentionally provides no Intercom credentials.
- Displayed prices are illustrative USD amounts. There is no live pricing, checkout, subscription, or identity-verification service.
- The frontend depends on external bundles, so changes to those assets can affect the demo even when this repository hasn’t changed.
