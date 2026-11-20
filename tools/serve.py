#!/usr/bin/env python3
"""Serve the clone locally with the same fixture rewrites as Render."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
REWRITES = {
    '/api/organizations/00000000-0000-4000-8000-000000000002/library/mine': '/api/fixtures/library-mine.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/kyc_status': '/api/fixtures/kyc-status.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/notification/preferences': '/api/fixtures/notification-preferences.json',
    '/api/oauth/organizations/00000000-0000-4000-8000-000000000002/oauth_tokens': '/api/fixtures/oauth-tokens.json',
    '/api/team-signup/voucher-eligible': '/api/fixtures/voucher-eligibility.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/user_artifacts': '/api/fixtures/user-artifacts.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/user_artifacts/count': '/api/fixtures/user-artifacts-count.json',
    '/api/account/raven_eligible': '/api/fixtures/account-eligibility.json',
    '/api/account/ss_enterprise_eligible': '/api/fixtures/account-eligibility.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/sync/github/auth': '/api/fixtures/github-auth.json',
    '/new': '/index.html',
    '/api/organizations/00000000-0000-4000-8000-000000000002/projects/count': '/api/fixtures/projects-count.json',
    '/api/claude_code/organizations/00000000-0000-4000-8000-000000000002/user_settings': '/api/fixtures/claude-code-user-settings.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/chat_conversations_v2': '/api/fixtures/chat-conversations.json',
    '/api/account_profile': '/api/fixtures/account-profile.json',
    '/api/organizations/discoverable': '/api/fixtures/discoverable-organizations.json',
    '/api/organizations/00000000-0000-4000-8000-000000000002/activation/chorus_free/tasks': '/api/fixtures/activation-tasks.json',
    '/v1/privacy-consents': '/v1/privacy-consents.json',
    '/edge-api/bootstrap/00000000-0000-4000-8000-000000000002/app_start': '/edge-api/app-start.json',
    '/api/bootstrap/00000000-0000-4000-8000-000000000002/current_user_access': '/edge-api/current-user-access.json',
    '/onboarding': '/index.html',
    '/edge-api/bootstrap': '/edge-api/bootstrap.json',
    '/edge-api/client-health/check': '/edge-api/client-health/check.json',
}


BILLING_PREFIX = '/api/billing/00000000-0000-4000-8000-000000000002/'
PRICING_PATHS = {BILLING_PREFIX + endpoint for endpoint in (
    'consumer_pricing', 'cw_pricing', 'individual_plan_pricing/v2',
    'ss_enterprise_pricing',
)}


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.json': 'application/json',
        '.ico': 'image/x-icon',
    }

    def translate_path(self, path):
        return super().translate_path(REWRITES.get(urlsplit(path).path, path))


    def do_POST(self):
        if urlsplit(self.path).path not in PRICING_PATHS:
            self.send_error(501, 'Unsupported POST endpoint')
            return
        body = (b'{"type":"error","error":{"type":"not_implemented",'
                b'"message":"Pricing is unavailable in this demo."}}\n')
        self.close_connection = True
        self.send_response(501)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Content-Length', str(len(body)))
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Connection', 'close')
        self.end_headers()
        self.wfile.write(body)

    def send_error(self, code, message=None, explain=None):
        if (code == 404 and self.command == 'GET'
                and urlsplit(self.path).path != '/'
                and self.headers.get('Sec-Fetch-Mode') == 'navigate'
                and self.headers.get('Sec-Fetch-Dest') == 'document'):
            body = (ROOT / '404.html').read_bytes()
            self.send_response(404)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return
        super().send_error(code, message, explain)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, default=8000)
    args = parser.parse_args()
    handler = partial(Handler, directory=str(ROOT))
    with ThreadingHTTPServer(('0.0.0.0', args.port), handler) as server:
        server.serve_forever()


if __name__ == '__main__':
    main()
