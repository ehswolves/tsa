# Eastlake TSA

The website for the Eastlake High School chapter of the Technology Student
Association — the chapter information that used to live on Canvas, in one
place: announcements, competitive events, files, and who to contact.

## Running it

There is no build step. The site is plain HTML, CSS, and JSX compiled in the
browser by Babel, so any static file server works:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Layout

| Path | What it is |
| --- | --- |
| `index.html` | Page shell; loads React, Babel, and the scripts below |
| `components.jsx` | Icons, buttons, header, footer |
| `app.jsx` | Page content and the client-side routing between tabs |
| `events.js` | Generated data for the 45 high school competitive events |
| `assets/` | Stylesheets, logos, and event photos |
| `files/` | Rubrics, schedules, and the TSA competitive events guide |

`assets/colors_and_type.css` holds the color and typography tokens. Prefer
changing a token there over hard-coding a value in `site.css`.

## Event content

The Events tab mirrors the high school event listings from
[Washington TSA](https://www.washingtontsa.org/high-school-events) so members
can browse them in the chapter's own layout. Each event links back to its
official page, which stays authoritative for rules and deadlines.

`events.js` is generated, not hand-written. To pick up changes from Washington
TSA, re-scrape the source and regenerate the file rather than editing it.

## Notes

The site is unofficial and maintained by chapter officers. Questions go to the
officer team or the chapter advisor.
