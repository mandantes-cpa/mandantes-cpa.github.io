# GitHub Pages Readiness and Interaction Test Report

## Scope

The standalone `github-pages` folder was served over a local HTTP server and opened in a browser on August 26, 2026. The intent was to validate the same relative-path static package that will be placed at a GitHub repository root.

| Check | Result | Notes |
| --- | --- | --- |
| `index.html` loads | Pass | The page title was shown as “Mandantes Bookkeeping \| Let’s organize your books.” |
| Local CSS and JavaScript paths | Pass | The one-page layout and browser enhancement controls were available from the root preview. |
| Local image paths | Pass | The local logo, hero illustration, work-sample illustration, and contact illustration loaded from `assets/images/`. |
| Required section order | Pass | Home, About, Services, Work Samples, Testimonials, Work With Us, and Footer were present in a single scrollable document. |
| Services anchor navigation | Pass | Selecting Services changed the URL fragment to `#services` and positioned the Services heading beneath the sticky header. |
| Service disclosure | Pass | Cleanup Bookkeeping was visible on page load and the native disclosure controls were present for all three published services. |
| Missing-thumbnail state | Pass | Both work-sample cards are configured to show a nonblank JPEG-thumbnail fallback until the owner uploads the exact local image files. |
| Claims boundary | Pass | The delivered content did not add pricing, telephone number, service area, invented results, or a fake form. |
| Work Samples anchor navigation | Pass | Selecting Work Samples changed the URL fragment to `#work-samples` and showed both visible work-sample card placeholders. |
| Testimonials anchor navigation | Pass | Selecting Testimonials changed the URL fragment to `#testimonials` and positioned the authorized testimonial in its labeled panel. |
| Testimonial controls | Pass | The published source provides one testimonial, so previous/next buttons are truthfully disabled and labeled as unavailable. No fabricated slides or reviews were added. |
| Browser console | Pass | No console output or JavaScript errors were reported after anchor navigation and prior fallback handling. |
| Mobile menu behavior | Pass | The menu button changed `aria-expanded` from `false` to `true` when opened, added the open state, updated its accessible label, and returned to the closed state after Escape. |
| Copy-email feedback | Pass | Activating Copy email displayed the live-status message “Email address copied to your clipboard.” |
| JavaScript syntax | Pass | `node --check script.js` completed without a syntax error. |
| Relative paths | Pass | Required site files and local images were present, and no root-relative `src` or `href` values were found in the HTML. |
| Static-hosting boundary | Pass | The package contains no Canva runtime reference, pricing copy, telephone link, client form, or external runtime dependency. |
| Canva thumbnail placeholders | Pass | Both cards displayed the JPEG upload path and “Canva link awaiting URL” state when local images and public links were absent. |
| Placeholder click safety | Pass | Selecting an unfinished presentation card left the visitor on the page rather than opening the placeholder Canva URL. |
| Revised static audit | Pass | JavaScript syntax passed; the active site contains no PDF controls or PDF references; both local JPEG paths, public Canva URL placeholders, and relative paths were verified. |
| Testimonial CSV load | Pass | The existing authorized Patricia B. testimonial loaded from `assets/data/testimonials.csv` into the visible carousel. |
| CSV schema and hooks | Pass | The exact four-column CSV header, one published source entry, CSV fetch path, JavaScript syntax, Previous/Next controls, and left/right keyboard support were verified. |
| Multiple-testimonial behavior | Ready | The carousel cycles multiple `published` CSV rows without autoplay. Only one source-authorized testimonial is currently included, so controls remain correctly disabled until another authorized row is added. |
| Work-sample CSV empty state | Pass | With no published work-sample rows, the page presented a clear instruction to edit `assets/data/work-samples.csv`, disabled presentation and navigation controls, and did not show a thumbnail or PDF workflow. |
| Work-sample CSV runtime | Pass | The draft-only work-sample CSV loaded without a console error, and the carousel remained in its intentionally noninteractive empty state. |
| Work-sample CSV schema and safety | Pass | The required four-column header, draft entries, local CSV fetch path, carousel controls, left/right keyboard support, `http`/`https` URL validation, and safe new-tab presentation link were verified. |
| Obsolete work-sample workflow removal | Pass | Active HTML and JavaScript contain no PDF preview, download control, thumbnail, or prior Canva-view placeholder code. |
| Supported-software CSV render | Pass | The About-section carousel loaded the two published source-supported platforms, QuickBooks Online and Xero, from the local CSV and displayed text fallbacks while their owner-supplied PNGs were absent. |
| Missing-logo fallback | Pass | All missing local PNG image elements were hidden after their load failure and their intentional text fallback marks became visible. |
| Automatic software motion | Pass | The carousel’s `scrollLeft` value decreased from 75 to 60 over 700 ms, confirming continuous left-to-right visual movement when motion is permitted. |
| Software carousel keyboard browsing | Pass | After the carousel received focus, the Right Arrow key advanced its scroll position from 162 to 294 while focus remained on the carousel. |
| Software carousel dragging | Implemented | Pointer-down, move, up, and cancel handling provide sideways mouse and touch dragging; automatic motion pauses during an active drag and resumes afterward. |
| Software carousel static audit | Pass | JavaScript syntax, CSV schema, local PNG filename validation, drag hooks, reduced-motion support, About-section markup, and removal of legacy thumbnail references were verified. |

## Remaining package inputs

The owner-supplied thumbnails and public Canva view URLs are intentionally not included. Before publication, add reviewed and redacted `assets/images/work-samples/quickbooks-online-thumbnail.jpg` and `assets/images/work-samples/xero-thumbnail.jpg`, then replace the two Canva URL placeholders in `index.html`. The README contains the exact process and static-hosting limitations.
