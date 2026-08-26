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
| `assets/work-samples/` | The location for the two publication-ready PDF work samples. |

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
    └── work-samples/
        ├── quickbooks-online.pdf
        └── xero.pdf
```

## Preview it locally

For a quick visual check, double-click `index.html`. Most of the site will work. For the most accurate preview—including PDF detection and copy-to-clipboard—open the folder with a simple local web server instead. On a computer with Python installed, open a terminal in this folder and run:

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

## Add the work-sample PDFs safely

The website expects these exact local filenames:

| Work sample | Required path | Card label |
| --- | --- | --- |
| QuickBooks Online | `assets/work-samples/quickbooks-online.pdf` | Recent work on QuickBooks Online |
| Xero | `assets/work-samples/xero.pdf` | Recent work output on Xero |

Before publishing, review every page, filename, document title, author, subject, keywords, embedded attachments, comments, and metadata. Remove or redact client names, account numbers, bank information, email addresses, tax identification data, passwords, and any other confidential material. You are responsible for confirming that each PDF is safe to publish.

When the two files exist at the exact paths above, the page attempts to load them in inline previews. The **Open PDF** control opens a file in a new tab; **Download PDF** requests a download. If a browser cannot render a PDF inline, the visible fallback and the two links remain available. If you rename a PDF, update every matching `href` and `data-pdf` value in `index.html`.

## Update content, images, colors, and links

| What you want to change | Where to edit |
| --- | --- |
| Business copy and section text | `index.html` |
| Email address | Search `index.html` for `mandantesv@gmail.com` and update both the `mailto:` links and the `data-email` value. |
| Calendly or LinkedIn destination | Search `index.html` for the current URL and replace every occurrence. |
| Colors, spacing, outlines, buttons, and responsive rules | `styles.css`, starting in the `:root` design tokens. |
| Logo, favicon, or illustrations | Replace files in `assets/images/` using the same filename, or update every matching image reference in `index.html`. |
| Page title, description, sharing image, and canonical URL | The `<head>` of `index.html`. Replace `YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME` in the canonical URL after publishing. |
| Testimonials | The `#testimonials` section in `index.html`. Only publish wording and attribution you are authorized to use. |

The design uses standard local system font stacks instead of remote web fonts, so it remains self-contained and avoids loading proprietary fonts. The display stack is `Arial Narrow`, `Helvetica Neue`, and Arial; the supporting text stack is `Trebuchet MS` and Arial; metadata uses the visitor’s system monospace font. These are system-provided fallbacks rather than redistributed font files.

## What is genuinely interactive

The browser-based features are real: same-page smooth anchor scrolling; sticky navigation with active-section highlighting; a keyboard-accessible mobile navigation menu with Escape handling and focus containment; native accessible service expanders; a transparent one-testimonial carousel state with disabled previous/next controls because only one authorized testimonial is published; lazy inline PDF previews with clear missing-file fallbacks; working Open/Download controls; email copying when the browser permits it; visible keyboard focus states; hover/pressed states; and reduced-motion support.

GitHub Pages is static hosting. It **cannot** send a contact form submission, store client records, authenticate users, schedule Calendly itself, generate PDFs, or hide private content. This site deliberately uses the reliable `mailto:`, Calendly, and LinkedIn links rather than a fake form. Add a real backend or a properly configured third-party form service only if you later need form processing.

## Troubleshooting

| Problem | Likely cause and solution |
| --- | --- |
| A blank or unstyled page | Confirm that `index.html`, `styles.css`, and `script.js` are all in the repository root, not nested inside another folder. Confirm the stylesheet link still reads `styles.css`. |
| Images do not appear | Confirm that the `assets/images/` folder was uploaded with the HTML file and that filenames match the image paths exactly. GitHub Pages is case-sensitive. |
| A PDF fallback says it is awaiting a file | Add the actual PDF at the exact required local path, commit it, then wait for the GitHub Pages deployment to finish. |
| The PDF opens but does not preview | Some browsers or browser privacy settings block inline PDF rendering. The Open PDF and Download PDF controls should still work. |
| Links appear to work locally but not on GitHub Pages | Keep `assets/...`, `styles.css`, and `script.js` as relative paths. Do not change them to paths beginning with `/`, which may fail under a repository subdirectory. |
| Navigation or copy interaction does not work | Check that `script.js` remains next to `index.html`, then open browser developer tools and review the Console for an error. Navigation links still function without JavaScript. |
| GitHub Pages still shows an old version | Confirm the commit is on the selected branch and folder, then allow several minutes for deployment. Hard-refresh the browser or open the site in a private window. |
| The published URL returns a 404 page | Confirm the Pages settings are `main` + `/ (root)` and that `index.html` is in that exact published location. |

## Custom domain later

After the default GitHub Pages address works, open the repository’s **Settings** → **Pages** and enter your domain in **Custom domain**. Follow GitHub’s DNS records instructions through your domain registrar, wait for DNS to propagate, then enable HTTPS when GitHub makes that option available. Update the canonical URL in `index.html` after the custom domain is working.

## Editable placeholders and outstanding files

The only required placeholders are the two PDFs (`quickbooks-online.pdf` and `xero.pdf`) and the canonical URL placeholders (`YOUR_GITHUB_USERNAME` and `YOUR_REPOSITORY_NAME`). The included illustrations and logo are local packaged assets. No telephone number, service area, pricing, policies, or additional testimonials have been added because they were not supplied as supported source content.
