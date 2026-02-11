#!/usr/bin/env node

/**
 * README Generator für Countdown-Projekt
 * Synchronisiert README.md mit config.json und Quelldateien
 * 
 * Verwendung: node scripts/update-readme.js
 * 
 * Dieses Skript:
 * - Liest Konfiguration aus config.json
 * - Scannt Quelldateien auf Kommentaren
 * - Generiert README.md mit aktuellen Informationen
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, '../config.json');
const README_PATH = path.join(__dirname, '../README.md');
const SCRIPT_PATH = path.join(__dirname, '../script.js');
const STYLE_PATH = path.join(__dirname, '../style.css');

// Konfiguration laden
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// Hilfsfunktionen
const formatTargets = () => {
  return config.countdown.targets
    .map(t => `| **${t.day}. ${['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'][t.month]}** | ${t.displayFormat} |`)
    .join('\n');
};

const formatColors = () => {
  return Object.entries(config.ui.colors)
    .map(([key, value]) => {
      if (key === 'shadow') return `--${key}: ${value}`;
      return `--${key}: ${value}              /* ${key.charAt(0).toUpperCase() + key.slice(1)} */`;
    })
    .join('\n');
};

const generateReadme = () => {
  const targets = config.countdown.targets;
  const targetDates = targets.map(t => t.displayFormat).join(' und ');
  
  const readme = `# ${config.project.name} – ${config.project.description}

Eine interaktive Webseite mit einem visuellen Countdown zu automatisch berechneten Zieldaten (${targetDates}). Das Projekt kombiniert moderne Web-Technologien für ein ansprechendes Benutzer­erlebnis.

---

## 🎯 Überblick

Das Projekt zeigt einen **Live-Countdown** mit folgenden Merkmalen:

- **Automatische Zieldatum-Berechnung**: Ziel wechselt zwischen ${targetDates} je Jahreszeit
- **Echtzeit-Display**: Tage, Stunden, Minuten und Sekunden in Echtzeit
- **Flip-Karten-Animation**: Elegante Kartenflip-Animation beim Zeitwechsel
- **Hintergrund-Crossfade**: Fotos mit sanftem Übergang und Overlay (${config.ui.animation.bgIntervalMs}ms Intervall)
- **Zeitzone-Handling**: Automatische Anpassung an ${config.countdown.timezone} (inklusive Sommerzeit)
- **Barrierefreiheit**: Screen-Reader-Support mit ARIA-Labels und Text-Status-Updates

**Version:** ${config.project.version} | **Lizenz:** ${config.project.license}

---

## 📁 Projektstruktur

\`\`\`
countdown/
├── index.html                    # HTML-Struktur, Countdown-Elemente, ARIA-Labels
├── script.js                     # Countdown-Logik, Zeitzone: ${config.countdown.timezone}
├── style.css                     # Layout, Flip-Animation (${config.ui.animation.flipDurationMs}ms)
├── config.json                   # Zentrale Konfiguration (MASTER-DATEI)
├── scripts/
│   ├── update-readme.js          # README-Generator (Synchronisation)
│   └── validate-config.js        # Validierungsskript
├── img/
│   └── ${config.files.images.background}
├── README.md                     # Deutsche Dokumentation (AUTO-GENERIERT)
├── README_EN.md                  # Englische Dokumentation
└── LICENSE                       # ${config.project.license}-Lizenz
\`\`\`

> **Wichtig:** Die \`config.json\` ist die **Master-Konfiguration**. Änderungen dort werden mit \`npm run update-readme\` in die README übertragen.

---

## 🎯 Countdown-Ziele

Das Projekt zielt automatisch auf folgende Daten ab:

| Zieldatum | Format |
|-----------|--------|
${formatTargets()}

**Logik:**
\`\`\`
- Vor ${targets[0].displayFormat} → Ziel ist ${targets[0].displayFormat} (dieselbes Jahr)
- Von ${targets[0].displayFormat} bis vor ${targets[1].displayFormat} → Ziel ist ${targets[1].displayFormat} (dieselbes Jahr)
- Ab ${targets[1].displayFormat} → Ziel ist ${targets[0].displayFormat} (nächstes Jahr)
\`\`\`

**Zeitzone:** ${config.countdown.timezone}

---

## 🔧 Komponenten im Detail

### \`index.html\` – Struktur und Semantik

**Hauptelemente:**
- **Sektion "Tage"**: Großes Display für die verbleibenden Tage
- **Flip-Clock**: 6 Flip-Karten für Stunden (HH), Minuten (MM), Sekunden (SS)
- **Hinweiszeile**: Zeigt dynamisch das aktuelle Zieldatum an
- **Hintergrund-Container**: \`div.bg-static\` mit Pseudo-Elementen für Bild + Overlay

**Barrierefreiheit:**
\`\`\`html
<p id="srStatus" class="sr-only" aria-live="polite"></p>
<div class="clock" role="group" aria-label="Countdown Uhrzeit">
\`\`\`
- Screen-Reader-Only-Text mit \`aria-live="polite"\` für Live-Updates
- Semantisch strukturierte Sektionen mit \`aria-label\`s
- Reine Dekorationselemente mit \`aria-hidden="true"\`

---

### \`script.js\` – Logik und Datenverwaltung

**Kernfunktionen:**

1. **Zieldatum-Berechnung (\`computeTarget()\` / \`getZonedParts()\`)**
   - Nutzt \`Intl.DateTimeFormat\` für korrekte Zeitzone (${config.countdown.timezone})
   - Automatischer UTC-Offset-Umbruch bei Sommerzeit-Wechseln
   - Logik: *(vor ${targets[0].displayFormat})* → ${targets[0].displayFormat} | *(${targets[0].displayFormat} bis vor ${targets[1].displayFormat})* → ${targets[1].displayFormat} | *(ab ${targets[1].displayFormat})* → ${targets[0].displayFormat} nächstes Jahr

2. **Countdown-Berechnung (\`update()\` / \`renderCountdown()\`)**
   - Berechnet verbleibende Differenz in: Tage, Stunden, Minuten, Sekunden
   - Frame-synchron mit 1000ms-Delay, driftfrei durch \`1000 - (Date.now() % 1000)\`
   - Aktualisiert Flip-Karten nur bei Wertänderung

3. **Flip-Animation (\`setFlip()\`)**
   - CSS-Animationen mit \`animationend\`-Event für präzises Cleanup
   - Respektiert \`prefers-reduced-motion\` für beeinträchtigte Benutzer
   - Auf \`animBot\`-Animation hören (verhindert Race-Conditions)

4. **Hintergrund-Crossfade (\`crossfadeTo()\`)**
   - CSS-Variablen für zwei Hintergrund-Layer (A und B)
   - Wechsel alle **${config.ui.animation.bgIntervalMs}ms** zwischen Bild und dunkler Variante
   - Layer-Rotation für nahtlose Übergänge

**State-Management:**
- \`state\` Map: Speichert aktuelle Werte der Flip-Karten
- \`currentTarget\`: Zwischengespeichertes Zieldatum, wird neu berechnet wenn erreicht
- CSS-Variablen: \`--bg-image-a\`, \`--bg-image-b\`, \`--bg-a-opacity\`, \`--bg-b-opacity\`

---

### \`style.css\` – Design und Animationen

**Farbschema (Dark Mode):**
\`\`\`css
:root {
  ${formatColors()}
}
\`\`\`

**Responsive Design:**
- \`clamp()\` für fluid Typography
- Flex-Layout mit \`gap\` für flexibles Spacing
- Mobile-first: \`${config.ui.responsive.viewportWidth}\` maximale Breite
- Max-Width: \`${config.ui.responsive.maxWidth}\`

**Flip-Karten-Animation:**
- Position-basiert: \`position: relative\` für Container
- 3D-Effekt mit CSS \`transform\` und \`perspective\`
- Zwei animierte Layer (\`.animTop\`, \`.animBot\`) für Flip-Effekt
- Duration: **${config.ui.animation.flipDurationMs}ms**

**Hintergrund-System:**
- \`.bg-static::before\`: Bild-Layer (via CSS-Variablen)
- \`.bg-static::after\`: Gradient-Overlay (Dunkelung + Vignette)
- Top-Layer: Radiale Gradienten mit \`rgba()\` für Fokus-Effekt
- Transition für 500ms Crossfade zwischen Bildern

---

## 🚀 Installation & Nutzung

### Schnellstart (Datei öffnen)
1. Alle Dateien in einen Ordner kopieren
2. \`index.html\` doppelt im Browser anklicken
3. Fertig!

### Mit lokalem Webserver (empfohlen)

**Python 3:**
\`\`\`bash
cd countdown
python -m http.server 8080
# Oder: python3 -m http.server 8080
\`\`\`

**Node.js (http-server):**
\`\`\`bash
npm install -g http-server
cd countdown
http-server -p 8080
\`\`\`

**Öffnen im Browser:**
\`\`\`
http://localhost:8080
\`\`\`

---

## ⚙️ Konfiguration & Änderungen

> **WICHTIG:** Alle Konfigurationen erfolgen zentral in \`config.json\` !

### Zieldaten ändern

**In \`config.json\`:**
\`\`\`json
"countdown": {
  "targets": [
    { "month": 0, "day": 1, "label": "01. Januar", "displayFormat": "01.01." },
    { "month": 5, "day": 30, "label": "30. Juni", "displayFormat": "30.06." }
  ]
}
\`\`\`

Dann README aktualisieren:
\`\`\`bash
npm run update-readme
\`\`\`

### Farbschema anpassen

**In \`config.json\`:**
\`\`\`json
"ui": {
  "colors": {
    "bg": "#1a1a1a",
    "fg": "#ffffff",
    "card": "#333333"
  }
}
\`\`\`

README aktualisieren:
\`\`\`bash
npm run update-readme
\`\`\`

### Animation-Intervalle ändern

**In \`config.json\`:**
\`\`\`json
"ui": {
  "animation": {
    "bgIntervalMs": 5000,    // Hintergrund-Wechsel-Intervall
    "flipDurationMs": 600    // Flip-Animation-Dauer
  }
}
\`\`\`

---

## 🔄 Automatische README-Synchronisation

### Manuell aktualisieren:

\`\`\`bash
npm run update-readme
\`\`\`

### Im Git Pre-Commit Hook (optional):

Erstelle \`.git/hooks/pre-commit\`:
\`\`\`bash
#!/bin/bash
npm run update-readme
git add README.md
\`\`\`

### Validierung:

\`\`\`bash
npm run validate-config
\`\`\`

---

## ♿ Barrierefreiheit

Das Projekt beachtet WCAG-Standards:

${config.features.accessibility.map(f => `- ${f}`).join('\n')}

**Test mit Screen-Reader:**
- NVDA (Windows, kostenlos)
- JAWS (Windows, kostenpflichtig)
- VoiceOver (macOS, iOS, kostenlos)

---

## 🔐 Sicherheit & Performance

**Performance:**
${config.features.performance.map(f => `- ${f}`).join('\n')}

**Sicherheit:**
${config.features.security.map(f => `- ${f}`).join('\n')}

---

## 📝 Lizenz

${config.project.license}-Lizenz. Frei nutzbar und anpassbar.

---

## 📞 Support & Weitere Infos

Siehe auch:
- [config.json](config.json) – Zentrale Konfiguration
- [README_EN.md](README_EN.md) – English version
- [LICENSE](LICENSE) – Lizenztext

> **Hinweis:** Diese README wurde mit \`scripts/update-readme.js\` generiert. Änderungen direkt in dieser Datei gehen verloren!
`;

  return readme;
};

// README generieren und speichern
try {
  const readme = generateReadme();
  fs.writeFileSync(README_PATH, readme, 'utf8');
  console.log('✅ README.md erfolgreich aktualisiert');
  console.log('📝 Quellen: config.json');
} catch (error) {
  console.error('❌ Fehler beim Generieren der README:', error.message);
  process.exit(1);
}
