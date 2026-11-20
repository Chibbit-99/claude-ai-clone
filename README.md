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
| `/edge-api/bootstrap/00000000-0000-4000-8000-000000000002/app_start` | `/edge-api/app-start.json` |
| `/api/bootstrap/00000000-0000-4000-8000-000000000002/current_user_access` | `/edge-api/current-user-access.json` |
| `/onboarding` | `/index.html` |
| `/edge-api/client-health/check` | `/edge-api/client-health/check.json` |
| `/v1/privacy-consents` | `/v1/privacy-consents.json` |
| `/new` | `/index.html` |
| `/api/claude_code/organizations/00000000-0000-4000-8000-000000000002/user_settings` | `/api/fixtures/claude-code-user-settings.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/chat_conversations_v2` | `/api/fixtures/chat-conversations.json` |
| `/api/account_profile` | `/api/fixtures/account-profile.json` |
| `/api/organizations/discoverable` | `/api/fixtures/discoverable-organizations.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/activation/chorus_free/tasks` | `/api/fixtures/activation-tasks.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/projects/count` | `/api/fixtures/projects-count.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/sync/github/auth` | `/api/fixtures/github-auth.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/user_artifacts` | `/api/fixtures/user-artifacts.json` |
| `/api/organizations/00000000-0000-4000-8000-000000000002/user_artifacts/count` | `/api/fixtures/user-artifacts-count.json` |
| `/api/account/raven_eligible` | `/api/fixtures/account-eligibility.json` |
| `/api/account/ss_enterprise_eligible` | `/api/fixtures/account-eligibility.json` |
| `/api/team-signup/voucher-eligible` | `/api/fixtures/voucher-eligibility.json` |

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

The organization-scoped bootstrap route serves a separate fixture only for the
demo organization UUID. The scoped bootstrap and user-access fixtures use
the uploaded capture as a schema reference, not as deployable account data.
The privacy-consent fixture returns an empty consent list, including for
`?prefix=cookies.`. It does not grant or store consent. The upstream bundle's
full response contract has not been verified. Referral remains unmocked.

## Missing pages

The root `404.html` is the custom error page for Render Static Sites. It sends
top-level visitors back to `/` while keeping the HTTP response a 404. Fetches
and subresources don't execute the redirect script. The local preview serves
this page only for top-level browser navigation to missing paths. Don't add a
catch-all Render rewrite to `/`: that would mask missing API and asset requests.
This does not redirect valid client-side routes or implement onboarding.

The `/new` rewrite serves the same app entry point as `/`. The demo GET
fixtures under `api/fixtures/` provide an empty chat history (including
starred chats), no discoverable organizations or activation tasks, default
Claude Code settings, and a fictional profile. They do not persist state
or implement chat creation. The upstream bundle’s full response contracts
for these fixtures have not been verified.

Both bootstrap fixtures include the captured model selector catalogs and model
metadata, but keep fictional account info and demo model preferences. Plan
restrictions are retained. This is display metadata, not model access. Chat history
is intentionally empty and the project count is zero.

The GitHub auth GET fixture reports a disconnected integration; it does not
perform OAuth. Intercom is unsupported and the demo intentionally supplies no
Intercom credentials. Upstream bundles may still log widget or performance
warnings.

Artifacts and account eligibility are read-only demo fixtures.

The browser intercepts only the four captured same-origin pricing POST requests
for the demo organization and fetches static JSON instead. Consumer and team
fixtures distinguish monthly and yearly requests; individual pricing is a
combined response and enterprise pricing is unavailable (`null`). These are
illustrative USD amounts, not live quotes. No checkout, subscriptions, tax
calculation, or promo validation is implemented. The complete upstream pricing
schema and visual rendering are unverified. Direct POST requests bypass the
browser adapter; the local server returns an explicit JSON `501` for them.
