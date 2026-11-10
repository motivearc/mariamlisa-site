# Components

The system is measured from the Auren template. Everything else is Mariamlisa's own: the content, the photos and the gold accent. Nothing here uses Auren's copy, images, logo or exact brand colour. DM Sans is an open font (SIL OFL) on Google Fonts.

Plain HTML and CSS with `tokens.css`, no Tailwind and no build step. The site is one static page and a build step would add more than it gives. Classes below are the names the build should use.

Section map, Auren pattern → Mariamlisa:

| Auren | Mariamlisa |
|---|---|
| Wordmark hero + 3 tilted photos | Hero: MARIAMLISA wordmark + her 3 photos (hero poster stays the first photo) |
| Intro split + status pill | About (status: "Available for bookings") |
| Full-bleed photo + statement | Statement over the portrait |
| Project cards grid | Live: featured shows as cards (photo where we have one) |
| Stacked sticky service cards | Rates: one sticky card per package |
| Image marquee + "see everything" | Gallery of her 6 photos |
| Journal cards | Press: WM / Nona / Tumit Tinggi |
| Footer with giant wordmark | Footer + Book (WhatsApp) |
| Testimonial slider | Skip: no testimonials yet |
| Intro loader (counter 0–100) | Skip: delays the first view for no information |

---

```
Nav
  layout    fixed top, height --header, 4 links spread edge to edge (sm: name left + Rates, Book)
  tokens    text-xs caps, tracking-caps, weight 500, colour text at 70% → 100% on hover
  states    default, hover, active (1px underline, width of label), focus-visible (2px ring accent, offset 4px)
  a11y      <nav> with <a href="#id">; aria-current="true" on the active section's link
  used on   all
```

```
Eyebrow
  look      "/ Label": slash in accent, label text-sm text-muted
  tokens    text-sm, gap space-2
  a11y      slash is aria-hidden; the label is real text above the heading
  used on   every section heading
```

```
Heading
  sizes     xl (section), 2xl (statement), display (wordmark)
  tokens    weight 300, tracking-tight, leading 1–1.05; display weight 600, uppercase
  a11y      one h1 (the wordmark), h2 per section, h3 in cards
```

```
Text link (arrow)
  look      → arrow in accent, label text-base weight 500, 1px underline in text-muted (7.8:1; border-strong fails 3:1)
  states    default, hover (underline turns text, arrow moves 4px right, dur-fast), focus-visible ring
  a11y      real <a>; arrow is aria-hidden
  used on   About ("Book a date"), Gallery, Press
```

```
Button
  variants  primary (bg accent, text on-accent), outline (1px text border, transparent)
  sizes     md 48px tall, padding 0 space-8, radius pill, text-sm weight 500
  states    default, hover (primary: lighten 8%; outline: fills text, label bg), active (scale .98),
            focus-visible (2px ring accent, offset 3px), disabled (40% opacity, no pointer)
  a11y      <a> for WhatsApp (it navigates), <button> for the details dialog
  used on   Rates ("All details"), Book ("Book on WhatsApp")
```

```
Status pill
  look      gold dot (8px) + text-sm label, bg surface-raised, 1px border, radius pill, padding 6px 14px
  states    static; the dot pulses (opacity 1 → .4, 2s) unless reduced motion
  a11y      plain text; the dot is aria-hidden
  used on   About
```

```
Photo tile
  look      radius md, object-fit cover, aspect 4:5 (hero trio) or 3:2 (cards)
  states    hover on linked tiles: image scales 1.04 over dur-slow inside its clipped frame
  a11y      every <img> has alt text describing the photo; width/height set to stop layout shift
  used on   Hero, Live, Gallery
```

```
Card
  look      bg surface, radius lg, padding space-3 (image inset) then space-6 body
  parts     photo tile, meta row (eyebrow left, detail right, text-sm), title (lg, weight 300)
  states    default, hover (border-strong outline, photo zoom), focus-within ring when it holds a link
  a11y      <article>; title is h3
  used on   Live, Press
```

```
Stacked card (sticky)
  look      full-width surface card, radius lg, 1px border; each card sticks at top: header + space-6 * index,
            so later cards slide over earlier ones and leave a thin edge of each showing
  parts     number eyebrow (/ 01), title (2xl), detail lines, price in accent
  states    static; reduced motion: plain stacked list, no sticking
  a11y      ordinary <article> list; sticking is visual only, reading order unchanged
  used on   Rates
```

```
Dialog (All details)
  look      bg surface, radius lg, max-width 920px, backdrop black 75% + blur 6px
  states    opening (fade + 16px rise, dur-base), open, closing (Esc, ×, backdrop click)
  a11y      native <dialog> with showModal (focus trap and Esc built in); aria-labelledby the first heading;
            × is a <button aria-label="Close">; page scroll locked while open
  used on   Rates
```

```
Marquee row
  look      two rows of photo tiles drifting in opposite directions, 40s loop, edges fade to bg
  states    pauses on hover; reduced motion: static row that scrolls sideways by hand
  a11y      duplicated tiles are aria-hidden; the first set keeps alt text
  used on   Gallery
```

```
Footer
  parts     statement (lg), link list, socials, © line (text-sm muted), giant wordmark (display, clipped at bottom)
  a11y      <footer>; wordmark is aria-hidden (the name is already the h1)
  used on   all
```

## States the template skips that the build must add

- `:focus-visible` rings on every link and button (Auren shows none).
- Reduced motion: no marquee, no sticky stacking, no reveal transforms.
- Missing image: tiles keep their aspect ratio on a `surface` background.
- No JavaScript: every section visible. Reveals only hide content when `html.js` is set.
