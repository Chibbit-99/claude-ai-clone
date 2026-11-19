# Extracted clone

Serve or open `index.html` as before. It is generated from four source files in `assets/`:

- `index.template.html` — markup and placeholders that control where each section goes.
- `scripts.js` — inline JavaScript, separated by named `clone-section` comments.
- `styles.css` — inline CSS, separated by named `clone-section` comments.
- `data.json` — named inline JSON bodies stored as arrays of lines for readability.

The JavaScript and CSS files are build inputs, not bundles to load in the browser. Keep the section markers and the blank line after each section. The build restores each section to its original tag, so script order, CSS placement, and inline data access are unchanged. The source files were formatted automatically.

```sh
python3 tools/split-clone.py build  # rebuild index.html
python3 tools/split-clone.py check  # verify index.html matches the four sources
```

To extract again from a fresh capture, replace `index.html` and run `python3 tools/split-clone.py split`. Extraction preserves the input formatting; it does not run a formatter. The extractor is designed for this capture's markup, not as a general-purpose HTML parser.

## Local preview

```sh
python3 -m http.server 8000 --bind 0.0.0.0
```
