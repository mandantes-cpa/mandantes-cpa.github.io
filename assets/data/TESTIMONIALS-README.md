# Adding testimonials safely

The website reads `testimonials.csv` directly in the visitor’s browser. You can add one testimonial per new row without editing the HTML, JavaScript, or the page design.

## CSV columns

| Column | Required | Accepted value | Purpose |
| --- | --- | --- | --- |
| `status` | Yes | `published` or `draft` | Only `published` entries appear on the public site. |
| `quote` | Yes | The approved testimonial wording | The testimonial shown to visitors. |
| `attribution` | Yes | The approved person or business attribution | For example, `Patricia B.`. |
| `organization` | No | The approved organization or role | For example, `Marketing Agency`. |

## Add a new row

Open `testimonials.csv` in a spreadsheet application or plain-text editor. Append a new row that follows this form:

```csv
published,"Exact approved testimonial wording, including any commas.",Approved attribution,Approved organization or role
```

When a testimonial contains a comma, quotation mark, or line break, keep the whole `quote` value wrapped in double quotation marks. For a double quotation mark inside the testimonial, write it twice: `""`. Save the file as **CSV UTF-8** using the exact filename `testimonials.csv` and retain the header row.

Only add testimonials that you are authorized to publish. Check the wording, attribution, organization name, and any client information before changing `status` to `published`. A `draft` row stays in the file but is not shown to visitors. Do not add ratings, results, client logos, or claims that have not been explicitly approved.
