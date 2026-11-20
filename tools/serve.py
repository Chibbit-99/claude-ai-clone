#!/usr/bin/env python3
"""Serve the clone locally with the same fixture rewrites as Render."""
import argparse
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
REWRITES = {
    '/edge-api/bootstrap/00000000-0000-4000-8000-000000000002/app_start': '/edge-api/bootstrap.json',
    '/edge-api/bootstrap': '/edge-api/bootstrap.json',
    '/edge-api/client-health/check': '/edge-api/client-health/check.json',
}


class Handler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        '.json': 'application/json',
        '.ico': 'image/x-icon',
    }

    def translate_path(self, path):
        return super().translate_path(REWRITES.get(urlsplit(path).path, path))


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
