# Mariamlisa website

One-page site for Mariamlisa, Malaysian cellist. Everything is in `index.html` (HTML, CSS in `<style>`, a few lines of JS). No build step.

- Run: `npx serve .` or open `index.html` directly.
- Colours and fonts: `:root` tokens at the top of the `<style>` block.
- Sections, in order: hero, About, Live, Recordings, Press, Management, Rates, Book, footer. Each is a `<section id="...">`; list items are plain `<li>` rows, so add or remove entries by copying a line.
- Rates: price cards plus one "All details" button that opens `<dialog id="details">` (package breakdowns, sound system, song list). Prices appear in both the cards and the dialog, so change both together. Any `[data-open="id"]` button opens the dialog with that id.
- Photos in `assets/`: `hero.jpg` (opening screen, also the share image; its name text is baked in, so the `<h1>` is screen-reader only), `portrait.jpg` (About), `stage-mono.jpg` + `band.jpg` + `stage-colour.jpg` (Live; one row of three, each cropped to 4:5), `book.jpg` (Book). To swap one, replace the file and keep the `width`/`height` attributes in step with its size.
- Booking: the `.btn` in `#book` opens WhatsApp (wa.me/601121039596, i.e. 011-2103 9596) with a pre-typed message.

Rules: black background, no taglines or helper text, phone width (~400px) with no horizontal scroll, keep `prefers-reduced-motion` working.
