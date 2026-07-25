# PRD — Elian Voss Portfolio (Static Site for GitHub Pages)

## Original Problem Statement
Create files to upload to GitHub Pages for a fully functional Portfolio/Professional website to display photos, audio files, and blog-type posts/articles. Have a message box for communication. Sleek and minimalist, white/black with forest-green and/or lavender accents. Include scroll fading, micro-interactions, and page transitions.

## User Choices
- Contact: Formspree
- Brand: placeholder name (currently "Elian Voss" — user to swap)
- Content: placeholder/sample
- Theme: Light (white bg, black text)
- Sections: Home, Bio, Music, Science, Contact

## Architecture / Tech
- 100% static site (no backend) for GitHub Pages: `/app/site/`
  - `index.html`, `style.css`, `app.js`, `assets/audio/track1-3.mp3`, `.nojekyll`, `README.md`
- Motion: GSAP + ScrollTrigger (CDN), Lenis smooth scroll (CDN)
- Fonts: Cormorant Garamond (serif) + Outfit (sans), Google Fonts
- Design tokens per `/app/design_guidelines.json`

## Implemented (2026-06)
- Page-load curtain transition + signature hero masked line-by-line reveal
- Lenis momentum scrolling; ScrollTrigger fade/translate reveals on every section
- Hero: kinetic type, lavender/green blurred parallax, magnetic CTA, scroll cue
- Bio: asymmetric grid, drop cap, B&W portrait with clip-path reveal + parallax, facts table
- Marquee divider (outlined kinetic text, GSAP loop)
- Music: dark surface, custom HTML/JS audio player (play/pause, seek, autoplay-next, durations), cursor-follow lavender bloom
- Science: numbered manifesto chapters (01–03) with forest-green outlined numbers
- Contact: massive "Let's talk", minimalist Formspree form with AJAX submit + demo-mode fallback
- Micro-interactions: custom cursor, magnetic buttons, animated underlines, scroll progress bar
- Responsive (desktop/tablet/mobile) + mobile menu; respects prefers-reduced-motion
- All interactive elements have data-testid

## Verified
- Static server 200 on index/css/js/audio
- Screenshots: all 5 sections render correctly; hero reveal fixed (GSAP px/yPercent bug)
- Audio player play tested (playing=true, now-playing updates)

## Notes / Placeholders
- Formspree action = `YOUR_ENDPOINT` (form runs in friendly demo mode until user adds their ID)
- Brand name, bio, tracks, articles, social links are swappable placeholders (see README)

## Backlog (P1/P2)
- P1: Real content swap by user (name, photos, audio masters, essays)
- P2: Dedicated per-article pages / expandable essays; lightbox photo gallery; dark-mode toggle
- P2: Waveform visualization for audio player
