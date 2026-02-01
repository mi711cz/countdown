# Countdown Website (March 1st / October 31st automatically)

This small website displays a countdown (**days / hours / minutes / seconds**).

**Special feature:**  
The target date is **not static**. It is calculated automatically and switches every year without any manual changes:

- **before March 1st** → target is **March 1st (this year)**
- **from March 1st** → target switches to **October 31st (this year)**
- **from October 31st** → target switches to **March 1st (next year)**

Additionally, the current target date is shown **dynamically next to “Countdown”**.

---

## Project Structure

Recommended:

```
/project-folder
│── index.html
│── style.css
│── script.js
│── 20251018_123814.jpg
└── README.md
```

> Note: If you move the image into a subfolder (e.g. `/img/`), you must update the path in the CSS accordingly.

---

## Files

### `index.html`

- Contains the page structure
- Includes:
  - countdown elements
  - hint line `Countdown <target date>`
  - background container (photo + overlay)

Important for the dynamic target date:

```html
<div class="hint" id="hint">
  Countdown <span id="targetDate"></span>
</div>
```

---

### `style.css`

- Defines layout and styling
- The background is **permanently active**:
  - photo as base layer
  - dark overlay layer for better readability

Example (background layers):

```css
.bg-static::before{
  background: url("20251018_123814.jpg") center/cover no-repeat;
}

.bg-static::after{
  background:
    radial-gradient(ellipse at 50% 35%, rgba(0,0,0,0.20), rgba(0,0,0,0.85) 70%),
    linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0.65));
}
```

---

### `script.js`

The script:

- automatically determines the current target date (March 1st or Oct 31st)
- updates the countdown every second
- writes the target date dynamically into the HTML (`#targetDate`)
- uses the **Europe/Berlin** time zone (DST-safe)

---

## Target Date Logic

There are two possible countdown targets:

- **March 1st (00:00)**
- **October 31st (00:00)**

Automatic logic:

| Current date | Target |
|---|---|
| before March 1st | March 1st (this year) |
| March 1st to before Oct 31st | Oct 31st (this year) |
| from Oct 31st | March 1st (next year) |

---

## Installation / Usage

1. Copy all files into one folder:
   - `index.html`
   - `style.css`
   - `script.js`
   - background image (e.g. `20251018_123814.jpg`)
2. Open `index.html` in your browser.

---

## Optional: Local Web Server (recommended)

A small web server can be helpful (for browser restrictions, relative paths, etc.):

### Python

```bash
python -m http.server 8080
```

Then open in your browser:

```
http://localhost:8080
```

---

## Customization

### Change the background image

In `style.css`:

```css
background: url("YOUR_IMAGE.jpg") center/cover no-repeat;
```

If you use a subfolder:

```css
background: url("img/YOUR_IMAGE.jpg") center/cover no-repeat;
```

---

### Change the countdown dates

If you want different target dates than March 1st / Oct 31st, you need to adjust the target date logic in the script (month/day).

---

## License

Free to use / modify.
