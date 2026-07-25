# Elian Voss — Portfolio (Static Site for GitHub Pages)

A sleek, minimalist editorial portfolio: **Home · Bio · Music · Science · Contact**.
Built with plain HTML/CSS/JS + GSAP (scroll reveals & motion) + Lenis (smooth scroll).
No build step, no server — perfect for GitHub Pages.

## Files
```
site/
├── index.html          # all content & structure
├── style.css           # all styling / theme tokens
├── app.js              # motion, audio player, form, cursor
├── assets/audio/       # sample tracks (track1/2/3.mp3) — replace with yours
└── .nojekyll           # tells GitHub Pages to serve all files as-is
```

## 1. Deploy to GitHub Pages
1. Create a repo (e.g. `portfolio`).
2. Upload **everything inside the `site/` folder** to the repo root (index.html must be at the top level).
3. Repo **Settings → Pages → Build and deployment → Source: "Deploy from a branch"**, Branch: `main` / `(root)`.
4. Wait ~1 min → your site is live at `https://<username>.github.io/<repo>/`.

## 2. Make the contact form work (Formspree)
1. Sign up free at https://formspree.io and create a form → copy your endpoint (looks like `https://formspree.io/f/abcd1234`).
2. In `index.html` find:
   ```html
   <form ... action="https://formspree.io/f/YOUR_ENDPOINT" method="POST" ...>
   ```
   Replace `YOUR_ENDPOINT` with your ID (e.g. `abcd1234`).
3. Done — submissions arrive in your email. (Until then the form runs in a friendly "demo mode".)

## 3. Swap in your own content
- **Name / brand**: search & replace `Elian Voss` in `index.html` (also the logo & footer). Placeholder — change it.
- **Bio text & facts**: edit the `#bio` section.
- **Photo**: replace the `src` of the image inside `.bio__frame`.
- **Music**: drop your `.mp3` files into `assets/audio/`, then update each `<li class="track" data-src="..." data-title="..." data-meta="...">`.
- **Science / blog posts**: edit the three `<article class="chapter">` blocks (add more by copying one).
- **Social links**: update the `href="#"` links in the footer.

## Notes
- GSAP & Lenis load from a CDN (needs internet, which GitHub Pages users have).
- Motion respects `prefers-reduced-motion`.
- Everything is responsive (desktop / tablet / mobile).
