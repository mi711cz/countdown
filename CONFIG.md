# CONFIG.JSON – Zentrale Konfigurationsdatei

Diese Datei ist die **Master-Quelle** für alle Projektparameter. Änderungen hier werden mit dem Befehl `npm run update-readme` in die README übertragen.

## 🎯 Struktur

```json
{
  "project": { ... },           // Projektmetadaten
  "countdown": { ... },         // Zieldaten & Zeitzone
  "ui": { ... },                // Farben, Animation, Responsive
  "files": { ... },             // Dateiverweise
  "features": { ... }           // Feature-Listen
}
```

---

## 📝 Countdown-Konfiguration

```json
"countdown": {
  "targets": [
    {
      "month": 2,                    // 0=Januar ... 11=Dezember
      "day": 1,                      // Tag (1-31)
      "label": "01. März",           // Angezeigt in Dokumentation
      "displayFormat": "01.03."      // Format für README
    },
    {
      "month": 9,
      "day": 31,
      "label": "31. Oktober",
      "displayFormat": "31.10."
    }
  ],
  "timezone": "Europe/Berlin"       // IANA-Zeitzone
}
```

### Änderungen vornehmen:

1. **Neue Zieldaten eingeben** (z.B. 01.01. und 30.06.):
   ```json
   "targets": [
     { "month": 0, "day": 1, "label": "01. Januar", "displayFormat": "01.01." },
     { "month": 5, "day": 30, "label": "30. Juni", "displayFormat": "30.06." }
   ]
   ```

2. **Zeitzone ändern** (z.B. New York):
   ```json
   "timezone": "America/New_York"
   ```

3. **README aktualisieren:**
   ```bash
   npm run update-readme
   ```

---

## 🎨 UI-Konfiguration

### Farben

```json
"ui": {
  "colors": {
    "bg": "#070b18",                    // Hintergrundfarbe
    "fg": "#eaf0ff",                    // Vordergrundtext
    "muted": "#aab6d6",                 // Gedimmte Farben
    "card": "#0f1733",                  // Kartenhintergrund
    "card2": "#0b122a",                 // Kartenhintergrund-Variante 2
    "line": "#1f2a55",                  // Trennlinien
    "shadow": "0 12px 40px rgba(0,0,0,.35)"  // Schatten
  }
}
```

> **Wichtig:** Farben müssen auch **manuell in `style.css`** aktualisiert werden! Die README zeigt nur die Werte an.

### Animation

```json
"ui": {
  "animation": {
    "bgIntervalMs": 2700,              // Hintergrund-Wechsel-Intervall (ms)
    "flipDurationMs": 500              // Flip-Animation-Dauer (ms)
  }
}
```

> **Wichtig:** `bgIntervalMs` muss auch **manuell in `script.js`** aktualisiert werden!

### Responsive Design

```json
"ui": {
  "responsive": {
    "maxWidth": "1100px",              // Max-Breite des Containers
    "viewportWidth": "96vw"            // Viewport-Breite
  }
}
```

---

## 📁 Dateien-Konfiguration

```json
"files": {
  "images": {
    "background": "img/20251018_123814.jpg",  // Hintergrundbild-Pfad
    "size": "~1-3 MB"                         // Geschätzte Größe
  }
}
```

---

## ✨ Features-Listen

```json
"features": {
  "accessibility": [
    "ARIA-Labels für Screen-Reader",
    "aria-live für Live-Updates",
    "Reduced Motion Support",
    "Semantisches HTML"
  ],
  "performance": [
    "Driftfreie Timer-Berechnung",
    "Minimal DOM-Manipulationen",
    "CSS-Animationen (GPU-beschleunigt)",
    "Event-Delegation"
  ],
  "security": [
    "Keine externen Abhängigkeiten",
    "Vanilla JavaScript",
    "Keine User-Input-Verarbeitung"
  ]
}
```

Diese Listen werden automatisch in der README aufgelistet.

---

## 🔄 Workflow nach Änderungen

```bash
# 1. config.json bearbeiten
# (Beliebiger Editor)

# 2. Konfiguration validieren
npm run validate

# 3. README aktualisieren
npm run update-readme

# 4. Quelldateien manuell anpassen (falls nötig)
# - script.js: bgIntervalMs, TIME_ZONE
# - style.css: CSS-Variablen in :root
# - index.html: Strukturelle Änderungen

# 5. Git-Commits
git add config.json script.js style.css README.md
git commit -m "Beschreibung der Änderungen"
```

---

## 📋 Checkliste für häufige Änderungen

### ✅ Zieldaten ändern
- [ ] `countdown.targets` in `config.json` aktualisieren
- [ ] `npm run validate`
- [ ] `npm run update-readme`
- [ ] Fertig – Script.js erkennt neue Ziele automatisch!

### ✅ Farbschema ändern
- [ ] `ui.colors` in `config.json` aktualisieren
- [ ] `style.css` → `:root { --bg, --fg, ... }` anpassen
- [ ] `npm run update-readme`
- [ ] Farbvorschau im Browser überprüfen

### ✅ Animation-Intervall ändern
- [ ] `ui.animation.bgIntervalMs` in `config.json` aktualisieren
- [ ] `script.js` → `const BG_INTERVAL_MS = ...` anpassen
- [ ] `npm run update-readme`
- [ ] Im Browser testen

### ✅ Zeitzone ändern
- [ ] `countdown.timezone` in `config.json` aktualisieren
- [ ] `script.js` → `const TIME_ZONE = ...` anpassen
- [ ] `npm run update-readme`
- [ ] Verschiedene Zeitzonen-Grenzen testen

---

## 📚 Weitere Ressourcen

- **[README.md](README.md)** – Hauptdokumentation (AUTO-GENERIERT)
- **[CONTRIBUTING.md](CONTRIBUTING.md)** – Entwickler-Workflow
- **[package.json](package.json)** – npm-Skripte
- **[scripts/](scripts/)** – Update & Validierungs-Skripte

---

## ❓ Häufig gestellte Fragen

### F: Kann ich die README direkt bearbeiten?
**A:** ❌ Nein! Änderungen werden beim nächsten `npm run update-readme` überschrieben. Bearbeiten Sie stattdessen `config.json`.

### F: Was passiert, wenn ich `config.json` ändere?
**A:** Laufen Sie `npm run update-readme` aus. Die README wird automatisch mit den neuen Werten aktualisiert.

### F: Werden Änderungen in `script.js` / `style.css` in die README übernommen?
**A:** ❌ Nein. Diese Dateien werden separat bearbeitet. Sie müssen:
1. `config.json` aktualisieren
2. `script.js` / `style.css` mit den Werten aus `config.json` aktualisieren
3. `npm run update-readme` ausführen

### F: Was bedeutet der schwarze Punkt (•) nach Werten in config.json?
**A:** Das sind normale JSON-Kommentare. Sie helfen zu verstehen, was jeder Wert bedeutet.

### F: Kann ich eigene Features hinzufügen?
**A:** Ja! Ergänzen Sie die Listen in `"features"`, dann werden sie in der README angezeigt, sobald Sie `npm run update-readme` ausführen.
