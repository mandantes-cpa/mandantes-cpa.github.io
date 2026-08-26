# Managing supported-software logos

The About-section logo strip reads `supported-software.csv` in the visitor’s browser. It automatically scrolls the published software logos from left to right and can be dragged sideways with a mouse or touch pointer.

## CSV columns

| Column | Required | Accepted value | Purpose |
| --- | --- | --- | --- |
| `status` | Yes | `published` or `draft` | Only `published` rows appear publicly. |
| `name` | Yes | Approved software name | Used as the visible label and image alternative text. |
| `logo_filename` | Yes | A local `.png` filename only | The exact name of the image in `assets/images/software/`. |

## Add a supported platform

First, place a transparent PNG logo in `assets/images/software/`. Then add one CSV row using this form:

```csv
published,Approved software name,exact-logo-filename.png
```

For example, a file named `example-accounting.png` needs the value `example-accounting.png` in the `logo_filename` column. Keep the header row, use a `.png` filename containing only letters, numbers, periods, underscores, and hyphens, and save the file as **CSV UTF-8**. Use `draft` to hide an entry without deleting it.

Use only logos that you are authorized to publish. Do not use a hosted image URL, a folder path, or a filename with spaces or special characters. Confirm each image is a transparent PNG, has no confidential information, and accurately represents software that is actually supported.
