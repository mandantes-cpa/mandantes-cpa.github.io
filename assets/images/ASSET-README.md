# Included visual assets

This folder receives the original local visual assets used by the static site package:

- `mandantes-balancing-mark.png` — original balancing-mark logo and favicon.
- `mandantes-hero-ledger.jpg` — hero illustration.
- `mandantes-work-sample.jpg` — work-samples illustration.
- `mandantes-contact-ledger.jpg` — contact-section illustration.

## Work-sample thumbnails

Add the two owner-supplied work-sample thumbnails in `assets/images/work-samples/` using these exact names: `quickbooks-online-thumbnail.jpg` and `xero-thumbnail.jpg`. Use **1600 × 900 pixels**, a **16:9 landscape** frame, sRGB JPEG, and a target file size below **500 KB**. The presentation cards are intentionally configured to show a clear fallback until both their local image and public Canva view URL have been added.

The HTML gracefully hides an individual illustration if it is removed, but do not remove the balancing-mark file unless you also update the favicon and header image references in `index.html`.
