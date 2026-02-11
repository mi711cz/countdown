# Countdown Webseite – Eleganter Ticker für Zieldaten

Eine interaktive Webseite mit einem visuellen Countdown zu automatisch berechneten Zieldaten (01. März und 31. Oktober). Das Projekt kombiniert moderne Web-Technologien für ein ansprechendes Benutzer­erlebnis.

---

## 🎯 Überblick

Das Projekt zeigt einen **Live-Countdown** mit folgenden Merkmalen:

- **Automatische Zieldatum-Berechnung**: Ziel wechselt zwischen 01.03. und 31.10. je Jahreszeit
- **Echtzeit-Display**: Tage, Stunden, Minuten und Sekunden in Echtzeit
- **Flip-Karten-Animation**: Elegante Kartenflip-Animation beim Zeitwechsel
- **Hintergrund-Crossfade**: Fotos mit sanftem Übergang und Overlay
- **Zeitzone-Handling**: Automatische Anpassung an Europe/Berlin (inklusive Sommerzeit)
- **Barrierefreiheit**: Screen-Reader-Support mit ARIA-Labels und Text-Status-Updates

---

## 📁 Projektstruktur

```
countdown/
├── index.html                 # HTML-Struktur, Countdown-Elemente, ARIA-Labels
├── script.js                  # Countdown-Logik, Zeitzone-Handling, Animationen
├── style.css                  # Layout, Styling, Flip-Animation, Hintergrund-Management
├── img/
│   └── 20251018_123814.jpg   # Hintergrundbild
├── README.md                  # Deutsche Dokumentation
├── README_EN.md               # Englische Dokumentation
└── LICENSE                    # Lizenzinformationen
```

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
   - Wechsel alle 2700ms zwischen Bild und dunkler Variante
   - Layer-Rotation für nahtlose Übergänge

**State-Management:**
- `state` Map: Speichert aktuelle Werte der Flip-Karten
- `currentTarget`: Zwischengespeichertes Zieldatum, wird neu berechnet wenn erreicht
- CSS-Variablen: `--bg-image-a`, `--bg-image-b`, `--bg-a-opacity`, `--bg-b-opacity`

---

### `style.css` – Design und Animationen

**Farbschema (Dark Mode):**
```css
--bg: #070b18              /* Tiefes Dunkelblau */
--fg: #eaf0ff              /* Helles Weiß-Blau */
--muted: #aab6d6           /* Gedimmte Farbtöne */
--card: #0f1733 / #0b122a  /* Kartenhintergrund */
--line: #1f2a55            /* Trennlinien */
```

**Responsive Design:**
- `clamp()` für fluid Typography: z.B. `clamp(46px, 8vw, 92px)` für Tages-Wert
- Flex-Layout mit `gap` für flexibles Spacing
- Mobile-first: `96vw` maximale Breite, Padding-Anpassungen

**Flip-Karten-Animation:**
- Position-basiert: `position: relative` für Container
- 3D-Effekt mit CSS `transform` und `perspective`
- Zwei animierte Layer (`.animTop`, `.animBot`) für Flip-Effekt
- Shadow-Effekt über `--shadow` Variable

**Hintergrund-System:**
- `.bg-static::before`: Bild-Layer (via CSS-Variablen)
- `.bg-static::after`: Gradient-Overlay (Dunkelung + Vignette)
- Top-Layer: Radiale Gradienten mit `rgba()` für Fokus-Effekt
- Transition für 500ms Crossfade zwischen Bildern

---

## 🎲 Zieldatum-Logik

**Automatische Berechnung** basierend auf aktuellem Datum:

| Zeitraum | Zieldatum |
|----------|----------|
| **1. Jan – 28. Feb** | 01.03. (dieselbes Jahr) |
| **1. März – 30. Okt** | 31.10. (dieselbes Jahr) |
| **31. Okt – 31. Dez** | 01.03. (nächstes Jahr) |

**Implementierung in `computeTarget()`:**
- Nutzt lokale Zeitzone Europe/Berlin für alle Vergleiche
- Die Funktion wird bei jedem Update aufgerufen, um Übergänge zu erkennen
- `ensureTarget()` aktualisiert die UI und setzt `wrap.classList` bei Zielreichung

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

> **Warum ein Server?** Einige Browser blockieren `file://`-Pfade bei modernen JavaScript-Features. Ein lokaler Server vermeidet diese Probleme.

---

## ⚙️ Konfiguration & Anpassungen

### Hintergrundbild ändern

**In `script.js` die Array `bgImages` anpassen:**
```javascript
const bgImages = [
  "url('img/DEIN_BILD.jpg')",
  "url('img/ANDERES_BILD.jpg')",
];
```

**Oder nur Bild in CSS aktualisieren** (für statische Version ohne Rotation):
- In `style.css` → `.bg-static::before` den `background-image`-Wert ändern

### Countdown-Termine ändern

In `script.js`, Funktion `computeTarget()`:
```javascript
const march1 = makeZonedDate(year, 2, 1, 0, 0, 0, 0);  // 0=Jan, 2=März
const oct31 = makeZonedDate(year, 9, 31, 0, 0, 0, 0);   // 9=Oktober
```

Beispiel für 01.01. und 30.06.:
```javascript
const jan1 = makeZonedDate(year, 0, 1, 0, 0, 0, 0);    // Monat 0 = Januar
const jun30 = makeZonedDate(year, 5, 30, 0, 0, 0, 0);   // Monat 5 = Juni
```

### Farbschema anpassen

In `style.css` oben die CSS-Variablen im `:root`-Selektor ändern:
```css
:root {
  --bg: #1a1a1a;           /* Hintergrund */
  --fg: #ffffff;           /* Text */
  --card: #333333;         /* Kartenhintergrund */
  /* ... */
}
```

### Hintergrund-Wechsel-Intervall ändern

In `script.js`:
```javascript
const BG_INTERVAL_MS = 2700;  // 2.7 Sekunden (ändern auf z.B. 5000 = 5 Sekunden)
```

---

## ♿ Barrierefreiheit

Das Projekt beachtet WCAG-Standards:

- **ARIA-Labels** für Screen-Reader (`aria-label`, `aria-hidden`, `aria-live`)
- **Text-Äquivalente** für Animationen (hidden `<p id="srStatus">`)
- **Reduced Motion Support** (`prefers-reduced-motion: reduce`)
- **Semantisches HTML** (Sektionen, Gruppen, Rollen)
- **Farb­kontrast**: Helles Text auf dunklem Hintergrund

**Test mit Screen-Reader:**
- NVDA (Windows, kostenlos)
- JAWS (Windows, kostenpflichtig)
- VoiceOver (macOS, iOS, kostenlos)

---

## 🔐 Sicherheit & Performance

**Performance:**
- Driftfreie Timer-Berechnung (keine `setInterval`-Drift)
- Event-Delegation: Ein `animationend`-Listener pro Karte
- Minimal DOM-Manipulationen (nur Wert-Updates)
- CSS-Animationen statt JavaScript-Animationen (GPU-beschleunigt)

**Sicherheit:**
- Keine externen Abhängigkeiten (vanilla JavaScript)
- Keine User-Input-Verarbeitung (keine Injection-Risiken)
- Sichere Zeitberechnung (keine Client-abhängigen Daten)

---

## 📄 Dateien-Übersicht

| Datei | Größe (ca.) | Funktion |
|-------|------------|----------|
| `index.html` | 1.5 KB | Struktur, Semantik |
| `script.js` | 9 KB | Countdown-Logik, Animationen |
| `style.css` | ~300 Zeilen | Layout, Styling, Flip-Animation |
| `img/20251018_123814.jpg` | ~1-3 MB | Hintergrundbild |
| `README.md` | ~ | Deutsche Dokumentation |
| `README_EN.md` | ~ | Englische Dokumentation |

---

## 📝 Lizenz

Frei nutzbar und anpassbar. Siehe [LICENSE](LICENSE) für Details.

---

## 🤝 Erweiterungsmöglichkeiten

Ideen für Anpassungen:
- **Verschiedene Countdown-Varianten**: Unterschiedliche Terminkombinationen
- **Sound-Feedback**: Audio-Cue beim Zielenerreichen
- **Lokalisierung**: Mehrsprachige Interface-Texte
- **Mobile-Optimierung**: Touch-Gestures für Terminauswahl
- **Statistik-Tracking**: Erfassung von Besucherzahlen
- **Dark/Light-Mode Toggle**: Optional helles Design-Schema

---

## 📞 Support & Weitere Infos

Siehe auch:
- [README_EN.md](README_EN.md) – English version
- [LICENSE](LICENSE) – Lizenztext
- HTML-Kommentare in den Sourcen für technische Details
