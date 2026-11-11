# Mariamlisa website

One-page site for Mariamlisa, Malaysian cellist. Static: `index.html` + `tokens.css` + `assets/`. No build step, no backend; all content and images are hardcoded.

- Run: `npx serve .` (the dialog and photos work from file:// too).
- Design: styled after the Auren template's system (dark, DM Sans light headings, "/ Label" eyebrows, rounded photo tiles, stacked sticky cards). Values are Mariamlisa's own (gold `#c8a46e`, her photos and copy).
- Tokens: `tokens.css` is the one source for colours, type, space, radius, motion. `index.html` uses only these variables, never raw hex. `replica/design/tokens.json` holds the same values plus the contrast pairs: change both together, then run `node replica/design/contrast.mjs replica/design/tokens.json` (must report 0 failing AA).
- Component specs: `replica/design/components.md`. Visual test page for every component: `replica/design/index.html` (noindex).
- Sections, in order: hero (wordmark + 3 photo tiles, poster in the centre), About, Live, Recordings, Press + Management, Watch (2 videos), Rates, gallery marquee, Book, footer. List items are plain `<li>` rows, so add or remove entries by copying a line.
- Rates: three stacked sticky cards (Solo, Duo, Sound system) plus an "All details" button that opens `<dialog id="details">` (package breakdowns, sound system kit, song list). Prices appear in both the cards and the dialog, so change both together. Any `[data-open="id"]` button opens the dialog with that id.
- Photos in `assets/`: `hero.jpg` (poster, 4:5, also the share image), `walk.jpg` (hero, left tile), `electric.jpg` (gallery), `portrait.jpg`, `band.jpg`, `stage-mono.jpg`, `stage-colour.jpg`, `book.jpg`. Tiles crop to 4:5 with `object-position: 50% 25%` so faces stay in frame. Keep `width`/`height` attributes in step with each file.
- Videos in `assets/video/`: `wedding.mp4` (3:18) and `stage.mp4` (1:00), portrait 576×1024, with `.jpg` poster frames. The originals are HEVC (doesn't play in Firefox or many Windows browsers), so they were converted to H.264. To add or replace one: `ffmpeg -i IN.MP4 -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 27 -maxrate 700k -bufsize 1400k -preset slow -c:a aac -b:a 96k -movflags +faststart OUT.mp4`, then grab a poster with `ffmpeg -ss 10 -i OUT.mp4 -frames:v 1 OUT.jpg`. `preload="metadata"` keeps them from downloading until played; never autoplay (they have sound).
- Booking: the WhatsApp button in `#book` opens wa.me/601121039596 (011-2103 9596) with a pre-typed message.

Rules: dark background, no taglines or helper text, phone width (~375px) with no horizontal scroll, visible focus rings, keep `prefers-reduced-motion` working (no marquee, no sticky stacking, no reveals).
