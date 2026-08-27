# Managing credentials

The About-section credentials list reads `credentials.csv` in the visitor’s browser. Each `published` row becomes a numbered credential entry. A compact verification link appears only when a safe public verification URL is present.

## CSV columns

| Column | Required | Accepted value | Purpose |
| --- | --- | --- | --- |
| `status` | Yes | `published` or `draft` | Only `published` rows appear publicly. |
| `title` | Yes | Approved credential title | The bold credential name. |
| `detail` | Yes | Approved supporting detail | The smaller credential description. |
| `verification_url` | No | Complete public `https://` or `http://` URL | Shows a verification link in a new tab when present. |
| `verification_label` | No | Short approved CTA label | Replaces the default `Verify credential` label. |

The row order is the display order. Use `draft` to hide a credential without deleting it, or delete its row to remove it. Save as **CSV UTF-8** with the header row unchanged. Blank or invalid verification URLs intentionally show no button.
