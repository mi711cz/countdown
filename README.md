# Countdown Webseite – Eleganter Ticker für automatische Zieldaten

Eine interaktive Webseite mit einem visuellen Countdown zu automatisch berechneten Zieldaten (01.03. und 31.10.). Das Projekt kombiniert moderne Web-Technologien für ein ansprechendes Benutzer­erlebnis.

---

## 🎯 Überblick

Das Projekt zeigt einen **Live-Countdown** mit folgenden Merkmalen:

- **Automatische Zieldatum-Berechnung**: Ziel wechselt zwischen 01.03. und 31.10. je Jahreszeit
- **Echtzeit-Display**: Tage, Stunden, Minuten und Sekunden in Echtzeit
- **Flip-Karten-Animation**: Elegante Kartenflip-Animation beim Zeitwechsel
- **Hintergrund-Crossfade**: Fotos mit sanftem Übergang und Overlay (2700ms Intervall)
- **Zeitzone-Handling**: Automatische Anpassung an Europe/Berlin (inklusive Sommerzeit)
- **Barrierefreiheit**: Screen-Reader-Support mit ARIA-Labels und Text-Status-Updates

**Version:** 1.0.0 | **Lizenz:** MIT

---

## 📁 Projektstruktur

```
countdown/
├── index.html                    # HTML-Struktur, Countdown-Elemente, ARIA-Labels
├── script.js                     # Countdown-Logik, Zeitzone: Europe/Berlin
├── style.css                     # Layout, Flip-Animation (500ms)
├── config.json                   # Zentrale Konfiguration (MASTER-DATEI)
├── scripts/
│   ├── update-readme.js          # README-Generator (Synchronisation)
│   └── validate-config.js        # Validierungsskript
├── img/
│   └── img/20251018_123814.jpg
├── README.md                     # Deutsche Dokumentation (AUTO-GENERIERT)
├── README_EN.md                  # Englische Dokumentation
└── LICENSE                       # MIT-Lizenz
```

> **Wichtig:** Die `config.json` ist die **Master-Konfiguration**. Änderungen dort werden mit `npm run update-readme` in die README übertragen.

---

## 🎯 Countdown-Ziele

Das Projekt zielt automatisch auf folgende Daten ab:

| Zieldatum | Format |
|-----------|--------|
| **1. März** | 01.03. |
| **31. Oktober** | 31.10. |

**Logik:**
```
- Vor 01.03. → Ziel ist 01.03. (dieselbes Jahr)
- Von 01.03. bis vor 31.10. → Ziel ist 31.10. (dieselbes Jahr)
- Ab 31.10. → Ziel ist 01.03. (nächstes Jahr)
```

**Zeitzone:** Europe/Berlin

---

## 🔧 Komponenten im Detail

### `index.html` – Struktur und Semantik

**Hauptelemente:**
- **Sektion "Tage"**: Großes Display für die verbleibenden Tage
- **Flip-Clock**: 6 Flip-Karten für Stunden (HH), Minuten (MM), Sekunden (SS)
- **Hinweiszeile**: Zeigt dynamisch das aktuelle Zieldatum an
- **Hintergrund-Container**: `div.bg-static` mit Pseudo-Elementen für Bild + Overlay

**Barrierefreiheit:**
```html
<p id="srStatus" class="sr-only" aria-live="polite"></p>
<div class="clock" role="group" aria-label="Countdown Uhrzeit">
```
- Screen-Reader-Only-Text mit `aria-live="polite"` für Live-Updates
- Semantisch strukturierte Sektionen mit `aria-label`s
- Reine Dekorationselemente mit `aria-hidden="true"`

---

### `script.js` – Logik und Datenverwaltung

**Kernfunktionen:**

1. **Zieldatum-Berechnung (`computeTarget()` / `getZonedParts()`)**
   - Nutzt `Intl.DateTimeFormat` für korrekte Zeitzone (Europe/Berlin)
   - Automatischer UTC-Offset-Umbruch bei Sommerzeit-Wechseln
   - Logik: *(vor 01.03.)* → 01.03. | *(01.03. bis vor 31.10.)* → 31.10. | *(ab 31.10.)* → 01.03. nächstes Jahr

2. **Countdown-Berechnung (`update()` / `renderCountdown()`)**
   - Berechnet verbleibende Differenz in: Tage, Stunden, Minuten, Sekunden
   - Frame-synchron mit 1000ms-Delay, driftfrei durch `1000 - (Date.now() % 1000)`
   - Aktualisiert Flip-Karten nur bei Wertänderung

3. **Flip-Animation (`setFlip()`)**
   - CSS-Animationen mit `animationend`-Event für präzises Cleanup
   - Respektiert `prefers-reduced-motion` für beeinträchtigte Benutzer
   - Auf `animBot`-Animation hören (verhindert Race-Conditions)

4. **Hintergrund-Crossfade (`crossfadeTo()`)**
   - CSS-Variablen für zwei Hintergrund-Layer (A und B)
   - Wechsel alle **2700ms** zwischen Bild und dunkler Variante
   - Layer-Rotation für nahtlose Übergänge

**State-Management:**
- `state` Map: Speichert aktuelle Werte der Flip-Karten
- `currentTarget`: Zwischengespeichertes Zieldatum, wird neu berechnet wenn erreicht
- CSS-Variablen: `--bg-image-a`, `--bg-image-b`, `--bg-a-opacity`, `--bg-b-opacity`

---

### `style.css` – Design und Animationen

**Farbschema (Dark Mode):**
```css
:root {
  --bg: #070b18              /* Bg */
--fg: #eaf0ff              /* Fg */
--muted: #aab6d6              /* Muted */
--card: #0f1733              /* Card */
--card2: #0b122a              /* Card2 */
--line: #1f2a55              /* Line */
--shadow: 0 12px 40px rgba(0,0,0,.35)
}
```

**Responsive Design:**
- `clamp()` für fluid Typography
- Flex-Layout mit `gap` für flexibles Spacing
- Mobile-first: `96vw` maximale Breite
- Max-Width: `1100px`

**Flip-Karten-Animation:**
- Position-basiert: `position: relative` für Container
- 3D-Effekt mit CSS `transform` und `perspective`
- Zwei animierte Layer (`.animTop`, `.animBot`) für Flip-Effekt
- Duration: **500ms**

**Hintergrund-System:**
- `.bg-static::before`: Bild-Layer (via CSS-Variablen)
- `.bg-static::after`: Gradient-Overlay (Dunkelung + Vignette)
- Top-Layer: Radiale Gradienten mit `rgba()` für Fokus-Effekt
- Transition für 500ms Crossfade zwischen Bildern

---

## 🚀 Installation & Nutzung

### Schnellstart (Datei öffnen)
1. Alle Dateien in einen Ordner kopieren
2. `index.html` doppelt im Browser anklicken
3. Fertig!

### Mit lokalem Webserver (empfohlen)

**Python 3:**
```bash
cd countdown
python -m http.server 8080
# Oder: python3 -m http.server 8080
```

**Node.js (http-server):**
```bash
npm install -g http-server
cd countdown
http-server -p 8080
```

**Öffnen im Browser:**
```
http://localhost:8080
```

---

## ⚙️ Konfiguration & Änderungen

> **WICHTIG:** Alle Konfigurationen erfolgen zentral in `config.json` !

### Zieldaten ändern

**In `config.json`:**
```json
"countdown": {
  "targets": [
    { "month": 0, "day": 1, "label": "01. Januar", "displayFormat": "01.01." },
    { "month": 5, "day": 30, "label": "30. Juni", "displayFormat": "30.06." }
  ]
}
```

Dann README aktualisieren:
```bash
npm run update-readme
```

### Farbschema anpassen

**In `config.json`:**
```json
"ui": {
  "colors": {
    "bg": "#1a1a1a",
    "fg": "#ffffff",
    "card": "#333333"
  }
}
```

README aktualisieren:
```bash
npm run update-readme
```

### Animation-Intervalle ändern

**In `config.json`:**
```json
"ui": {
  "animation": {
    "bgIntervalMs": 5000,    // Hintergrund-Wechsel-Intervall
    "flipDurationMs": 600    // Flip-Animation-Dauer
  }
}
```

---

## 🔄 Automatische README-Synchronisation

### Manuell aktualisieren:

```bash
npm run update-readme
```

### Im Git Pre-Commit Hook (optional):

Erstelle `.git/hooks/pre-commit`:
```bash
#!/bin/bash
npm run update-readme
git add README.md
```

### Validierung:

```bash
npm run validate-config
```

---

## ♿ Barrierefreiheit

Das Projekt beachtet WCAG-Standards:

- ARIA-Labels für Screen-Reader
- aria-live für Live-Updates
- Reduced Motion Support
- Semantisches HTML

**Test mit Screen-Reader:**
- NVDA (Windows, kostenlos)
- JAWS (Windows, kostenpflichtig)
- VoiceOver (macOS, iOS, kostenlos)

---

## 🔐 Sicherheit & Performance

**Performance:**
- Driftfreie Timer-Berechnung
- Minimal DOM-Manipulationen
- CSS-Animationen (GPU-beschleunigt)
- Event-Delegation

**Sicherheit:**
- Keine externen Abhängigkeiten
- Vanilla JavaScript
- Keine User-Input-Verarbeitung

---

## 📝 Lizenz

MIT-Lizenz. Frei nutzbar und anpassbar.

---

## 📞 Support & Weitere Infos

Siehe auch:
- [config.json](config.json) – Zentrale Konfiguration
- [README_EN.md](README_EN.md) – English version
- [LICENSE](LICENSE) – Lizenztext

> **Hinweis:** Diese README wurde mit `scripts/update-readme.js` generiert. Änderungen direkt in dieser Datei gehen verloren!
