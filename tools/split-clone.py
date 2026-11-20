#!/usr/bin/env python3
"""Build the captured page with linked JavaScript and CSS assets."""
import argparse
import json
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
INDEX = ROOT / 'index.html'
SOURCE = ROOT / 'assets'
TEMPLATE = SOURCE / 'index.template.html'
BLOCK = re.compile(rb'(<(script|style)\b(?:"[^"]*"|\'[^\']*\'|[^\'">])*?>)(.*?)(</\2\s*>)', re.I | re.S)
SLOT = re.compile(rb'<!-- asset-section:([a-z0-9/.-]+) -->\n')
SECTION = re.compile(rb'/\* clone-section: ([a-z0-9-]+) \*/\n')
FILES = {'scripts': 'scripts.js', 'styles': 'styles.css', 'data': 'data.json'}
# Names for unlabelled blocks in this capture, in document order.
NAMES = dict(enumerate('page-background equation-counters root-scrollbar mobile-page-background compose-prelude desktop-boot-placeholder head-start restore-guard bootstrap-account cookie-settings locale-preference bootstrap-prefetch published-artifact locale-selection boot-recovery early-run head-preferences language-font theme-mode auth-route dock-layout fizzy-lake fizzy-lake-page-background layer-order static-critical-css static-composer-translations structured-data static-composer-style js-cannot-start static-composer-init boot-recovery-tail icon-font-preload-inline entry-stylesheet-guard js-cannot-start-style session-check pack-files'.split(), 1))


def pack(kind, sections):
    if kind == 'data':
        return (json.dumps({name: body.decode().split('\n') for name, body in sections.items()},
                           ensure_ascii=False, indent=2) + '\n').encode()
    return b''.join(b'/* clone-section: ' + name.encode() + b' */\n' + body + b'\n\n'
                    for name, body in sections.items()).removesuffix(b"\n")


def unpack(kind, contents):
    if kind == 'data':
        return {name: '\n'.join(lines).encode() for name, lines in json.loads(contents).items()}
    prefix, *parts = SECTION.split(contents)
    if prefix or len(parts) % 2:
        raise ValueError(f'Invalid section markers in {FILES[kind]}')
    sections = {}
    for index in range(0, len(parts), 2):
        name, body = parts[index:index + 2]
        if index == len(parts) - 2:
            body += b"\n"
        name = name.decode()
        if name in sections or not body.endswith(b'\n\n'):
            raise ValueError(f'Invalid or duplicate section: {kind}/{name}')
        sections[name] = body[:-2]
    return sections


def flatten(groups):
    return {f'{kind}/{name}': body for kind, sections in groups.items()
            for name, body in sections.items()}


def split(document):
    if SLOT.search(document) or b'"assets/runtime/' in document:
        raise ValueError('Split expects a fresh standalone capture, not generated HTML')
    groups = {kind: {} for kind in FILES}
    count = 0

    def extract(match):
        nonlocal count
        opening, tag, body, closing = match.groups()
        if not body:
            return match[0]
        count += 1
        kind = 'styles' if tag.lower() == b'style' else 'scripts'
        if re.search(rb'\btype="application/(?:ld\+)?json"', opening):
            kind = 'data'
        label = re.search(rb'\bid="([a-z0-9-]+)"|\bdata-([a-z0-9-]+)(?=[\s=>])', opening)
        name = (label[1] or label[2]).decode() if label else NAMES.get(count, f'block-{count}')
        if name in groups[kind]:
            name += f'-{count}'
        groups[kind][name] = body
        path = f'{kind}/{name}'
        return opening + b'<!-- asset-section:' + path.encode() + b' -->\n' + closing

    template = BLOCK.sub(extract, document)
    packed = {kind: pack(kind, sections) for kind, sections in groups.items()}
    assets = flatten({kind: unpack(kind, contents) for kind, contents in packed.items()})
    if assemble(template, assets.__getitem__) != document:
        raise ValueError('Extraction failed its byte-for-byte round-trip check')
    SOURCE.mkdir(parents=True, exist_ok=True)
    for kind, contents in packed.items():
        (SOURCE / FILES[kind]).write_bytes(contents)
    TEMPLATE.write_bytes(template)


def assemble(template, read_asset):
    return SLOT.sub(lambda match: read_asset(match[1].decode()), template)


def link_assets(template, assets):
    outputs = {}

    def link(match):
        opening, tag, body, closing = match.groups()
        slot = SLOT.fullmatch(body)
        if not slot:
            return match[0]
        key = slot[1].decode()
        kind, name = key.split('/')
        if kind == 'data':
            # Existing bootstrap code reads these payloads synchronously from the DOM.
            return opening + assets[key] + closing
        ext = 'js' if kind == 'scripts' else 'css'
        path = f'assets/runtime/{name}.{ext}'
        outputs[ROOT / path] = assets[key] + b'\n'
        url = path.encode()
        if tag.lower() == b'script':
            # A classic script without async/defer stays parser-blocking.
            return opening[:-1] + b' src="' + url + b'">' + closing
        return b'<link rel="stylesheet" href="' + url + b'"' + opening[6:]

    document = BLOCK.sub(link, template)
    if SLOT.search(document):
        raise ValueError('Found an unresolved asset section in the HTML')
    return {INDEX: document, **outputs}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=['split', 'build', 'check'])
    command = parser.parse_args().command
    if command == 'split':
        split(INDEX.read_bytes())
        return
    assets = flatten({kind: unpack(kind, (SOURCE / filename).read_bytes())
                      for kind, filename in FILES.items()})
    outputs = link_assets(TEMPLATE.read_bytes(), assets)
    if command == 'build':
        for path, contents in outputs.items():
            path.parent.mkdir(parents=True, exist_ok=True)
            path.write_bytes(contents)
    else:
        for path, contents in outputs.items():
            if not path.is_file() or path.read_bytes() != contents:
                parser.exit(1, f'{path.relative_to(ROOT)} is out of sync; run build.\n')
        print('index.html and its linked assets match the source files.')


if __name__ == '__main__':
    main()
