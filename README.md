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
python3 -m http.server 8000 --bind 0.0.0.0
```
