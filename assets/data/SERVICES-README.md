# Managing services

The Services accordion reads `services.csv` in the visitor’s browser. Each `published` row becomes one accordion item, so you can add, update, reorder, hide, or remove services without editing HTML or JavaScript.

## CSV columns

| Column | Required | Accepted value | Purpose |
| --- | --- | --- | --- |
| `status` | Yes | `published` or `draft` | Only `published` rows appear publicly. |
| `title` | Yes | Approved service title | Appears in the accordion header. |
| `description` | Yes | Approved service description | Appears when the accordion item is opened. |

## Add, edit, or remove a service

Open `services.csv` in a spreadsheet application or a plain-text editor. Add one service per row using this form:

```csv
published,Approved service title,"Approved description, including commas if needed."
```

The row order is the display order. Use `draft` to hide a service without deleting it, or remove the entire row to delete it from the public site. Keep the first header row unchanged and save the file as **CSV UTF-8**. When a title or description contains a comma, quotation mark, or line break, keep that field within double quotation marks; write an internal double quotation mark as `""`.

Publish only accurate, approved service descriptions. Do not include pricing, guarantees, regulated advice, confidential information, or unsupported claims. Confirm that the first `published` row is the service you want open by default.
