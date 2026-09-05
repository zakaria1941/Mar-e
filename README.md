# MARÉE — skincare storefront demo

A static, dependency-free storefront for a fictional marine-biotech skincare house.
Built as a design demonstration: every product, person, figure and batch record is invented,
and the photography is free stock from Unsplash.

## Run it

Any static server works. With Node installed:

```bash
npx serve . -l 4178
```

Then open <http://localhost:4178>. Opening `index.html` straight from the filesystem works
too.

`serve.json` sets `cleanUrls: false`. Without it `serve` redirects `/product.html` to
`/product` and drops the query string on the way, so every product page would fall back to
the default formulation. Any other static host is fine as-is.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home — hero, the house, the Depth Index, featured serum, timed ritual, panel annex, field notes |
| `shop.html` | Catalogue with purpose filters and sorting |
| `product.html` | Formulation record. Routed by `?sku=` — e.g. `product.html?sku=MR-008` |
| `story.html` | Provenance — the water, the harvest, the laboratory, the people |

## Structure

```
assets/css/main.css   design system + all page styles, in numbered sections
assets/js/data.js     the eight products, journal entries, harvest-site conditions
assets/js/main.js     header, bag, drawer, filters, PDP, reveals
```

There is no build step and no framework. Edit and reload.

## The design

The organising idea is that every formula is filed at the depth its principal active is
harvested from, 0 m to −180 m. That drives the product data, the catalogue sort order, and
the signature section on the home page — the **Depth Index**, whose background attenuates
from surface mist to aphotic black as you scroll it, with the type inverting at the
thermocline where light drops below one percent of the surface.

- **Palette** — abyss `#08171C`, tide `#0E3B44`, current `#2C7A85`, foam `#EDF1F0`,
  saline `#C6D3D2`, and one warm ray, sun `#E4BC63`
- **Type** — Archivo (wide grotesque) for display, Newsreader for body copy,
  Azeret Mono reserved strictly for measured values: depths, pH, batch codes, coordinates
- **Motion** — one orchestrated page-load sequence on the hero, scroll reveals elsewhere,
  all of it disabled under `prefers-reduced-motion`

## Editing the catalogue

Everything shoppable lives in `assets/js/data.js`. A product needs a unique `sku`, a `depth`
in metres, a `family` matching one of the filter chips, and two `images`. The home page
index, the shop grid, the product page and the related-products rail all read from it.

## Notes for the demo

- The bag persists in `localStorage`; checkout is deliberately a dead end that says so.
- Images are hotlinked from Unsplash. **If the demo has to run without wifi**, download them
  into `assets/img/` and point the `IMG()` helper in `data.js` at local paths — otherwise
  every photograph on the site is a blank box.
- Content is deliberately explicit about being fictional (footer, panel-study footnote, and
  a closing note on the Provenance page). Strip those three places when the copy is replaced
  with a real brand's.
