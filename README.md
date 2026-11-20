# Extracted clone

Serve or open `index.html` as before. It is generated from four source files in `assets/`:

- `index.template.html` — markup and placeholders that control where each section goes.
- `scripts.js` — inline JavaScript, separated by named `clone-section` comments.
- `styles.css` — inline CSS, separated by named `clone-section` comments.
- `data.json` — named inline JSON bodies stored as arrays of lines for readability.

Edit the four source files, then regenerate the root `index.html` and the files under `assets/runtime/`. The browser loads the generated JavaScript and CSS through ordinary `<script src>` and `<link rel="stylesheet">` tags. They stay in their original document order rather than being bundled into one script or stylesheet. Inline JSON stays in the HTML because the captured page expects it to be available synchronously in the DOM.

```sh
python3 tools/split-clone.py build  # regenerate index.html and assets/runtime/
python3 tools/split-clone.py check  # verify generated files match their sources
```

To extract from a fresh standalone capture, first replace `index.html` with that capture, then run `python3 tools/split-clone.py split` and rebuild. Do not use `split` on the generated, linked entry point. The extractor is designed for this capture's markup, not as a general-purpose HTML parser.

## Local preview

```sh
python3 tools/serve.py
```

## Mock endpoints

The local preview server and `render.yaml` route the exact extensionless API
paths to static JSON files without redirecting. Query strings don't select
separate fixtures. For an existing Render Static Site that isn't managed by
this Blueprint, add these as **Rewrite** rules under Redirects/Rewrites:

| Source | Destination |
| --- | --- |
| `/edge-api/bootstrap` | `/edge-api/bootstrap.json` |
| `/edge-api/bootstrap/00000000-0000-4000-8000-000000000002/app_start` | `/edge-api/bootstrap.json` |
| `/edge-api/client-health/check` | `/edge-api/client-health/check.json` |

`bootstrap-prefetch.js` parses JSON but doesn't validate its schema. The
bootstrap fixture follows the supplied response example's account, membership,
organization, and model-config structure, using a fictional demo identity. The
public anonymous response was also checked with `growthbook_format=sdk` and
`statsig_hashing_algorithm=djb2`. The fixture mirrors its top-level fields,
using empty feature, copy, and gated payloads rather than live configuration.
Unlike the anonymous response, the fixture includes the demo account. The
authenticated response contract and external app startup remain unverified.
Model entries are display metadata, not working inference.

`session-check.js` accepts `{"control":null}` without taking action. It only
calls `/edge-api/client-health/reload-request` if a reload is requested, so that
endpoint is not mocked. No real accounts, authentication, or chat API are provided.

The organization-scoped bootstrap route reuses the demo fixture only for the
fixture organization UUID. It is not a general organization API. User access,
privacy-consent, referral, and eligibility endpoints are not mocked.
