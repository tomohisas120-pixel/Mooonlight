# Moonlite — lightweight web demo

Original, responsive demo site using only HTML, CSS, JavaScript, and local SVG illustrations.

## Run locally
Open `index.html` in a modern browser. For best behavior, use a local static server:
- VS Code: install/use Live Server, then choose **Open with Live Server**.
- Or run `python3 -m http.server 8000` in this folder and open `http://localhost:8000`.

## Publish for free with GitHub Pages
1. Create a new GitHub repository.
2. Upload all files and the `assets` folder (keep the structure intact).
3. In repository **Settings → Pages**, choose deployment from the `main` branch and `/ (root)`.
4. Save, then open the published URL shown by GitHub Pages.

## Notes
- Same-origin links are conservatively prefetched on hover (desktop) or keyboard focus (touch devices usually won't prefetch on touch alone).
- Browsers may ignore prefetch hints; they are an optimization hint, not a guarantee.
- `prefers-reduced-motion` disables the scroll image effect.
- No Cloud Moon branding/assets are included.
