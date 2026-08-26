# Managing work samples

The Work Samples section reads `work-samples.csv` in the visitor’s browser. Each eligible row becomes a slide in the Work Samples carousel; no thumbnail image is needed.

## CSV columns

| Column | Required | Accepted value | Purpose |
| --- | --- | --- | --- |
| `status` | Yes | `published` or `draft` | Only `published` rows appear on the public website. |
| `title` | Yes | Short work-sample title | For example, `QuickBooks Online`. |
| `description` | Yes | Brief approved description | The supporting sentence visible on the slide. |
| `presentation_url` | Yes | A complete public `https://` or `http://` URL | The public presentation link that opens in a new tab. |

## Add or remove a work sample

Open `work-samples.csv` in a spreadsheet application or plain-text editor. Add one row per work sample. Use this format:

```csv
published,Approved work-sample title,"Approved brief description, including commas if needed.",https://your-public-presentation-link
```

To show the entry, set `status` to `published`. To hide it without deleting the row, set `status` to `draft`. Keep the header row and exact filename. Save the file as **CSV UTF-8**. Use only public presentation links that you have confirmed open in a private browser window.

Do not include client names, account numbers, bank information, tax information, passwords, or confidential details in the title, description, presentation, or presentation link. Review every entry before publishing it.
