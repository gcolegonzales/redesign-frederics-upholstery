# Drop real photos here

Frederic's Upholstery is **Facebook-only** for imagery, and Facebook/Instagram photos
are token-blocked — they cannot be downloaded programmatically. So the live site currently
ships with tasteful, on-brand material/texture placeholders (marked `<!-- IMG-NEEDED -->`
in `index.html`) instead of real photos.

To swap in the real thing, drop images into this folder and wire them into the CSS/HTML
where the matching `data-photo="…"` comment sits.

## Photos that would make the biggest difference

| Slot | Where it goes | Suggested filename |
|------|---------------|--------------------|
| Hero | `.hero-visual` swatch panel | `hero.jpg` — a finished custom auto interior or the workbench |
| Auto interior | Work row 01 | `auto.jpg` |
| Boat / marine | Work row 02 | `marine.jpg` |
| Furniture | Work row 03 | `furniture.jpg` |
| Commercial | Work row 04 | `commercial.jpg` |
| Before / After | `#baWidget` | `before.jpg` + `after.jpg` |
| Shop / storefront | Visit map plate | `shop.jpg` |

## How to get them (all owner-authorized, web-accessible sources)

- Ask the owner for a Dropbox/Drive folder or a handful of texts — fastest and cleanest.
- Save the best shots straight off the Frederic's Upholstery Facebook page (owner does this,
  not automated).
- Google Business Profile "Photos" tab, if the owner uploads there.

Landscape 3:2 or 16:9 shots work best; 1600px wide is plenty. Keep files under ~400 KB
(re-export as JPG at ~75% quality) so the site stays fast.
