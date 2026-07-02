# Frederic's Upholstery — website redesign concept

An unsolicited redesign concept for **Frederic's Upholstery** — a 5.0-rated, master-craftsman
auto, marine, furniture, and commercial upholstery shop in Gonzales, Louisiana.

> This is a spec-built concept pitch, not an official site and not affiliated with the business.
> It's meant to show what a modern, on-brand web presence could look like.

## Why a redesign

The business currently lives **only on Facebook** — no standalone website. That means:

- **Not discoverable** on Google the way a real site would be; no SEO footprint of its own.
- **No clear services page** — a prospective customer can't see at a glance that the shop does
  auto interiors, boat/marine seating, furniture reupholstery, cushions, and commercial work.
- **No easy way to request a quote** — a high-ticket custom shop is leaving inquiries on the table
  without a simple "here's my project" form and a one-tap call button.
- **A 5.0 rating from ~22 reviews is buried** instead of being front and center as social proof.

This concept fixes all four: a fast, mobile-first, single-page site with a real quote request
form, click-to-call, a clear services breakdown, and the reputation up top.

## What's in here

- `index.html` · `styles.css` · `script.js` — fully static, no build step, no CDN dependencies
  besides one Google Fonts `<link>`.
- `assets/photos/` — drop-folder for real photos (see `DROP-PHOTOS-HERE.md`). The shop's images
  are Facebook-only and can't be downloaded, so the site ships with tasteful on-brand
  material/texture placeholders (marked `<!-- IMG-NEEDED -->`) until real photos are added.

## Design

Craft / artisan-workshop aesthetic — warm heritage tones (deep tan, oxblood, charcoal), a Fraunces
+ Archivo type pairing, subtle linen/leather CSS texture, and varied editorial sections (alternating
image/text rows, numbered process steps, a drag-to-compare before/after, pull-quote reviews) rather
than a grid of generic icon cards. Animated shrink-on-scroll nav, scroll-reveal, and a real mobile
menu — all respecting `prefers-reduced-motion`.

## Real data used

- Name, address (43469 Cannon Rd, Ste B, Gonzales, LA 70737), phone **(225) 644-3535**.
- Hours: Mon–Thu 8am–5pm, Fri 8am–12pm, closed Sat/Sun.
- 5.0 rating from ~22 reviews.
- Service list (auto / marine / furniture / commercial) confirmed via business directories and a
  BoatPlanet marine listing.
- Review quotes are **representative/paraphrased** of the 5.0 rating pending verbatim access
  (marked with a `TODO` comment).

## How to view

Open `index.html` in any browser (double-click it), or serve the folder statically. No install needed.
