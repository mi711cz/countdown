# Countdown Webseite (01.03. / 31.10. automatisch)

Diese kleine Webseite zeigt einen Countdown (**Tage / Stunden / Minuten / Sekunden**) an.

**Besonderheit:**  
Das Zieldatum ist **nicht statisch**, sondern wird automatisch berechnet und wechselt jedes Jahr ohne manuelle Anpassung:

- **vor dem 01.03.** → Ziel ist **01.03. (dieses Jahr)**
- **ab dem 01.03.** → Ziel ist **31.10. (dieses Jahr)**
- **ab dem 31.10.** → Ziel ist **01.03. (nächstes Jahr)**

Zusätzlich wird das aktuelle Zieldatum **dynamisch hinter „Countdown“ angezeigt**.

---

## Projektstruktur

Empfohlen:

```
/projektordner
│── index.html
│── style.css
│── script.js
│── 20251018_123814.jpg
└── README.md
```

> Hinweis: Wenn du das Bild in einen Unterordner legst (z.B. `/img/`), muss der Pfad im CSS entsprechend angepasst werden.

---

## Dateien

### `index.html`

- Enthält die Struktur der Seite
- Enthält:
  - Countdown-Elemente
  - Hinweiszeile `Countdown <Zieldatum>`
  - Hintergrund-Container (Foto + Overlay)

Wichtig für das dynamische Datum:

```html
<div class="hint" id="hint">
  Countdown <span id="targetDate"></span>
</div>
```

---

### `style.css`

- Definiert das Layout / Styling
- Hintergrund ist **permanent aktiv**:
  - Foto als Basis-Layer
  - dunkles Overlay zur besseren Lesbarkeit

Beispiel (Hintergrundlayer):

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

Das Script:

- berechnet automatisch das aktuelle Ziel (01.03. oder 31.10.)
- aktualisiert den Countdown jede Sekunde
- zeigt das aktuelle Ziel-Datum dynamisch im HTML (`#targetDate`) an
- nutzt Zeitzone **Europe/Berlin** (Sommerzeit-sicher)

---

## Zieldatum-Logik

Es existieren zwei mögliche Countdown-Ziele:

- **01. März (00:00 Uhr)**
- **31. Oktober (00:00 Uhr)**

Automatische Logik:

| Aktuelles Datum | Ziel |
|---|---|
| vor 01.03. | 01.03. (dieses Jahr) |
| 01.03. bis vor 31.10. | 31.10. (dieses Jahr) |
| ab 31.10. | 01.03. (nächstes Jahr) |

---

## Installation / Nutzung

1. Dateien in einen Ordner kopieren:
   - `index.html`
   - `style.css`
   - `script.js`
   - Hintergrundbild (z.B. `20251018_123814.jpg`)
2. `index.html` im Browser öffnen.

---

## Optional: Lokaler Webserver (empfohlen)

Ein kleiner Webserver ist hilfreich (z.B. für Browser-Sicherheiten oder relative Pfade):

### Python

```bash
python -m http.server 8080
```

Danach im Browser öffnen:

```
http://localhost:8080
```

---

## Anpassungen

### Hintergrundbild ändern

In `style.css`:

```css
background: url("DEIN_BILD.jpg") center/cover no-repeat;
```

Wenn du ein Unterverzeichnis nutzt, z.B.:

```css
background: url("img/DEIN_BILD.jpg") center/cover no-repeat;
```

---

### Countdown-Termine ändern

Wenn du statt 01.03./31.10. andere Termine willst, müssen im Script die Zieltermine angepasst werden (Monat/Tag).

---

## Lizenz

Frei nutzbar / anpassbar.
