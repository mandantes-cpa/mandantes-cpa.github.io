# Mandantes Bookkeeping — GitHub Pages Website

This folder is a **complete static website** for Mandantes Bookkeeping. It is intentionally built with plain HTML, CSS, and JavaScript so it can run directly on GitHub Pages with no installation, build step, database, API key, account login, or server-side software.

> **Publish path:** upload the *contents* of this `github-pages` folder to the **root (`/`) of the `main` branch** of your GitHub repository. `index.html` must sit at that root.

## What this project contains

| File or folder | Purpose |
| --- | --- |
| `index.html` | The complete one-page site: Home, About, Services, Work Samples, Testimonials, Work With Us, and Footer. |
| `styles.css` | The responsive Ledger Parade design system, layout, visual details, focus states, and reduced-motion rules. |
| `script.js` | Progressive enhancements for the mobile menu, active navigation, page reveals, email copying, and safe PDF previews. |
| `404.html` | A branded page displayed if a visitor reaches an unavailable URL. |
| `assets/images/` | The local logo, favicon, and original illustrations used by the page. |
| `assets/data/work-samples.csv` | The owner-editable, browser-loaded work-sample carousel data file. |
| `assets/data/supported-software.csv` | The owner-editable, browser-loaded supported-software logo data file. |
| `assets/data/testimonials.csv` | The owner-editable, browser-loaded testimonial data file. |

The project has no dependency files because it does not need Node.js, a package manager, a build command, environment variables, or a backend.

## Download and preserve the structure

Download the provided ZIP file, then extract it. You should see the files and folders listed above in the extracted `github-pages` folder. **Do not move `index.html` into another subfolder** and do not rename `assets`, `assets/images`, or `assets/work-samples`; the website uses relative paths that depend on this structure.

The final expected structure is:

```text
YOUR_REPOSITORY_NAME/
├── index.html
├── styles.css
├── script.js
├── 404.html
└── assets/
    ├── images/
    │   ├── mandantes-balancing-mark.png
    │   ├── mandantes-hero-ledger.jpg
    │   ├── mandantes-work-sample.jpg
    │   └── mandantes-contact-ledger.jpg
    └── data/
        └── testimonials.csv
        └── work-samples.csv
        └── supported-software.csv
    └── images/software/
        └── your-software-logo.png
```

## Preview it locally

For a quick visual check, double-click `index.html`. Most of the site will work. For the most accurate preview—including thumbnail fallbacks and copy-to-clipboard—open the folder with a simple local web server instead. On a computer with Python installed, open a terminal in this folder and run:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000/` in your browser. Stop the preview with `Ctrl+C` in the terminal.

## Publish on GitHub Pages

1. Sign in to [GitHub](https://github.com/) and select **New repository**. Name it, for example, `mandantes-bookkeeping`.
2. Choose **Public** if you want the usual free public GitHub Pages setup, then create the repository.
3. In the repository, select **Add file** → **Upload files**.
4. Open the extracted `github-pages` folder, select **everything inside it**—including `assets`, `index.html`, `styles.css`, `script.js`, `404.html`, and `README.md`—and upload it. Do **not** upload the outer folder itself as a nested `github-pages` folder.
5. Commit the upload to the default `main` branch.
6. Open **Settings** → **Pages**. Under **Build and deployment**, choose **Deploy from a branch**.
7. Select the **`main` branch** and the **`/ (root)` folder**, then select **Save**.
8. Wait for GitHub’s deployment notice, then visit `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY_NAME/`.

For this package, the exact GitHub Pages configuration is **Branch: `main`; Folder: `/ (root)`**. If your default branch is named `master`, use `master` instead. Do not select `/docs`, because this package is not stored in a `docs` directory.

## Add or remove work samples from CSV

The Work Samples carousel reads **`assets/data/work-samples.csv`**. Each published row provides the title, description, and public presentation link; no PDF or thumbnail file is used.

| Column | Required | Public-site behavior |
| --- | --- | --- |
| `status` | Yes | `published` shows the entry; `draft` hides it without deleting the row. |
| `title` | Yes | Displays as the work-sample heading. |
| `description` | Yes | Displays as the supporting description. |
| `presentation_url` | Yes | Opens the full public `https://` or `http://` presentation in a new tab. |

To publish an entry, set its status to `published`, add the approved title and description, and paste the complete public presentation link. To remove it from the public site, change its status to `draft` or delete its row. Save as **CSV UTF-8** with the header row unchanged. Quotes containing commas must remain in double quotation marks. See `assets/data/WORK-SAMPLES-README.md` for examples and safe-editing guidance.

Before publishing, review the title, description, presentation URL, presentation title, slide notes, linked files, and sharing permissions. Redact or remove client names, account numbers, bank information, email addresses, tax identification data, passwords, and any other confidential material. Confirm that each public presentation opens in a private browser window.

## Update content, images, colors, and links

| What you want to change | Where to edit |
| --- | --- |
| Business copy and section text | `index.html` |
| Email address | Search `index.html` for `mandantesv@gmail.com` and update both the `mailto:` links and the `data-email` value. |
| Calendly or LinkedIn destination | Search `index.html` for the current URL and replace every occurrence. |
| Colors, spacing, outlines, buttons, and responsive rules | `styles.css`, starting in the `:root` design tokens. |
| Logo, favicon, or illustrations | Replace files in `assets/images/` using the same filename, or update every matching image reference in `index.html`. |
| Work samples | Add, edit, hide, or remove rows in `assets/data/work-samples.csv`; do not edit the work-sample HTML structure. |
| Supported software | Add a PNG to `assets/images/software/`, then add or update its matching row in `assets/data/supported-software.csv`. |
| Page title, description, sharing image, and canonical URL | The `<head>` of `index.html`. Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` in the canonical URL after publishing. |
| Testimonials | Add or update rows in `assets/data/testimonials.csv`. Only `published` entries appear; `draft` entries remain private to the file. Do not edit the testimonial HTML structure. |

The design uses standard local system font stacks instead of remote web fonts, so it remains self-contained and avoids loading proprietary fonts. The display stack is `Arial Narrow`, `Helvetica Neue`, and Arial; the supporting text stack is `Trebuchet MS` and Arial; metadata uses the visitor’s system monospace font. These are system-provided fallbacks rather than redistributed font files.

## What is genuinely interactive

The browser-based features are real: same-page smooth anchor scrolling; sticky navigation with active-section highlighting; a keyboard-accessible mobile navigation menu with Escape handling and focus containment; native accessible service expanders; a client-side testimonial carousel that reads the local CSV, supports previous/next buttons and left/right arrow keys, and does not autoplay; a client-side work-sample carousel that reads the local CSV, supports the same accessible controls, and opens the selected public presentation in a new tab; email copying when the browser permits it; visible keyboard focus states; hover/pressed states; and reduced-motion support.

The About section also includes a **Supported Software** logo carousel. It reads `assets/data/supported-software.csv`, displays only `published` rows with valid local PNG filenames, automatically moves left to right when more than one platform is published, pauses during pointer and keyboard interaction, can be dragged sideways with a mouse or touch pointer, and honours reduced-motion preferences by disabling automatic movement.

GitHub Pages is static hosting. It **cannot** send a contact form submission, store client records, authenticate users, schedule Calendly itself, generate PDFs, or hide private content. This site deliberately uses the reliable `mailto:`, Calendly, and LinkedIn links rather than a fake form. Add a real backend or a properly configured third-party form service only if you later need form processing.

## Troubleshooting

| Problem | Likely cause and solution |
| --- | --- |
| A blank or unstyled page | Confirm that `index.html`, `styles.css`, and `script.js` are all in the repository root, not nested inside another folder. Confirm the stylesheet link still reads `styles.css`. |
| Images do not appear | Confirm that the `assets/images/` folder was uploaded with the HTML file and that filenames match the image paths exactly. GitHub Pages is case-sensitive. |
| No work samples are visible | Confirm a row has `status` set to exactly `published`, title and description are not blank, and `presentation_url` is a complete public `https://` or `http://` URL. Save the file as UTF-8 CSV at `assets/data/work-samples.csv`, commit it, then wait for GitHub Pages to update. |
| A work-sample button does not open the presentation | Confirm that the `presentation_url` cell has the full public presentation URL, with no quotation mark or trailing space accidentally included, then test it in a private browser window. |
| A software logo does not appear | Confirm the row has `status` set to `published`, uses the exact `.png` filename in `logo_filename`, and that its file exists in `assets/images/software/`. The text fallback is expected until the matching local PNG is uploaded. |
| Links appear to work locally but not on GitHub Pages | Keep `assets/...`, `styles.css`, and `script.js` as relative paths. Do not change them to paths beginning with `/`, which may fail under a repository subdirectory. |
| Navigation or copy interaction does not work | Check that `script.js` remains next to `index.html`, then open browser developer tools and review the Console for an error. Navigation links still function without JavaScript. |
| GitHub Pages still shows an old version | Confirm the commit is on the selected branch and folder, then allow several minutes for deployment. Hard-refresh the browser or open the site in a private window. |
| The published URL returns a 404 page | Confirm the Pages settings are `main` + `/ (root)` and that `index.html` is in that exact published location. |
| A new testimonial does not appear | Confirm its `status` field is exactly `published`, its quote and attribution are not blank, the CSV header row remains unchanged, and the file is saved as UTF-8 CSV at `assets/data/testimonials.csv`. Then commit the change and wait for GitHub Pages to update. |

## Custom domain later

After the default GitHub Pages address works, open the repository’s **Settings** → **Pages** and enter your domain in **Custom domain**. Follow GitHub’s DNS records instructions through your domain registrar, wait for DNS to propagate, then enable HTTPS when GitHub makes that option available. Update the canonical URL in `index.html` after the custom domain is working.

## Editable placeholders and outstanding files

The required editable placeholders are future published work-sample rows in `assets/data/work-samples.csv`, future authorized testimonial rows in `assets/data/testimonials.csv`, supported-software PNG files and their published rows in `assets/data/supported-software.csv`, and the canonical URL placeholders (`YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME`). The included illustrations and logo are local packaged assets. No telephone number, service area, pricing, or policies have been added because they were not supplied as supported source content.
