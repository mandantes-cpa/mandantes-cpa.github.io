# Included visual assets

This folder receives the original local visual assets used by the static site package:

- `mandantes-balancing-mark.png` — original balancing-mark logo and favicon.
- `mandantes-hero-ledger.jpg` — hero illustration.
- `mandantes-work-sample.jpg` — work-samples illustration.
- `mandantes-contact-ledger.jpg` — contact-section illustration.

## Supported-software logos

Add owner-supplied PNG files to `assets/images/software/`. For every published row in `assets/data/supported-software.csv`, the `logo_filename` value must exactly match the local PNG filename. Use a transparent **512 × 512 pixel** sRGB PNG where possible and target less than **150 KB** per logo. The carousel preserves each logo’s proportions inside a consistent card and shows a text fallback if a listed logo is missing.


The HTML gracefully hides an individual illustration if it is removed, but do not remove the balancing-mark file unless you also update the favicon and header image references in `index.html`.
