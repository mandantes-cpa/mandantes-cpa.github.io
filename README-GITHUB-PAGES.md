# Val Mandantes CPA — GitHub Pages Upload Guide

## Publish this folder directly

This folder contains the finished, self-contained static website. It includes the compiled HTML, CSS, JavaScript, and the four branded image files. You do **not** need Node.js, Canva, or any build command to publish it.

| Step | Action |
| --- | --- |
| 1 | Create a new repository on GitHub. A name such as `val-mandantes-bookkeeping` is suitable. |
| 2 | Upload every item inside this folder, keeping the `assets/` and `images/` folders intact. The `index.html` file must remain at the repository’s top level. |
| 3 | Open the repository’s **Settings** tab and select **Pages** in the left sidebar. |
| 4 | Under **Build and deployment**, choose **Deploy from a branch**. Select the `main` branch and choose the **`/(root)`** folder. Save. |
| 5 | Wait for GitHub to publish the site, then return to the Pages settings panel to open its public URL. |

> The site uses relative links and local images, so it will work as either a GitHub user site or a project site. No code changes are required before first publication.

## Before sharing the site

The original Canva page did not make a public email address or booking URL available. The main “Let’s organize your books” button is deliberately a safe placeholder that returns visitors to the home section. Before you share the site, add your contact destination by editing the compiled JavaScript file in `assets/`, or use the editable source project archive to change `client/src/pages/Home.tsx` and rebuild it.

## What each folder contains

| Item | Purpose |
| --- | --- |
| `index.html` | The page entry point GitHub Pages opens. |
| `assets/` | The website’s compiled styles and interaction code. |
| `images/` | The locally hosted hero, workspace, background, and logo artwork. |
| `README-GITHUB-PAGES.md` | This upload guide. |

## Optional custom domain

After the Pages URL works, GitHub’s **Settings → Pages** panel lets you add a custom domain. Follow GitHub’s on-screen DNS instructions for the domain provider you use; this archive does not require any domain-specific configuration.
