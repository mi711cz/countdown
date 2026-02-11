# CONTRIBUTING – Workflow für README-Synchronisation

Diese Dokumentation beschreibt, wie das Projekt strukturiert ist und wie Sie Änderungen vornehmen, ohne die README manuell zu aktualisieren.

## 🎯 Übersicht des Systems

Das Projekt verwendet ein **konfigurationsgesteuertes System**, bei dem:

1. **`config.json`** ist die **Master-Datei** für alle Konfigurationen
2. **`scripts/update-readme.js`** generiert die README basierend auf `config.json`
3. **Quelldateien** (`script.js`, `style.css`, `index.html`) enthalten Kommentare, die auf `config.json` verweisen
4. **Die README wird nicht manuell bearbeitet** – Änderungen gehen verloren!

---

## 📋 Workflow für Änderungen

### Szenario 1: Countdown-Ziele ändern

**Ziel:** Von „01.03. / 31.10." auf „01.01. / 30.06." ändern

**Schritte:**

1. **Öffne `config.json`**
   ```json
   "countdown": {
     "targets": [
       {
         "month": 0,              // Januar (0=Jan, 1=Feb, ..., 11=Dez)
         "day": 1,
         "label": "01. Januar",
         "displayFormat": "01.01."
       },
       {
         "month": 5,              // Juni
         "day": 30,
         "label": "30. Juni",
         "displayFormat": "30.06."
       }
     ]
   }
   ```

2. **Validiere die Konfiguration:**
   ```bash
   npm run validate
   ```

3. **Aktualisiere die README:**
   ```bash
   npm run update-readme
   ```

4. **Überprüfe die Änderungen:**
   ```bash
   git diff README.md
   ```

5. **Commit:**
   ```bash
   git add config.json README.md
   git commit -m "Zieldaten geändert: 01.01. / 30.06."
   ```

---

### Szenario 2: Farbschema ändern

**Ziel:** Hintergrundbild und Farben anpassen

**Schritte:**

1. **Öffne `config.json`**
   ```json
   "ui": {
     "colors": {
       "bg": "#1a1a1a",           // Hintergrund
       "fg": "#ffffff",           // Text
       "muted": "#999999",        // Gedimmte Farben
       "card": "#333333",         // Karten
       "card2": "#2a2a2a",
       "line": "#555555",
       "shadow": "0 12px 40px rgba(0,0,0,.5)"
     }
   }
   ```

2. **Änderungen in `style.css`:**
   - Die CSS-Variablen in `:root` müssen **manuell** angepasst werden
   - Sie entsprechen den Werten aus `config.json`

   ```css
   :root {
     --bg: #1a1a1a;
     --fg: #ffffff;
     /* ... etc ... */
   }
   ```

3. **Aktualisiere die README:**
   ```bash
   npm run update-readme
   ```

4. **Commit:**
   ```bash
   git add config.json style.css README.md
   git commit -m "Farbschema aktualisiert"
   ```

---

### Szenario 3: Animation-Parameter ändern

**Ziel:** Hintergrund-Wechsel-Intervall von 2700ms auf 5000ms ändern

**Schritte:**

1. **Öffne `config.json`**
   ```json
   "ui": {
     "animation": {
       "bgIntervalMs": 5000,      // War: 2700
       "flipDurationMs": 500      // Unverändert
     }
   }
   ```

2. **Änderung in `script.js`:**
   - Update die Zeile hier:
   ```javascript
   const BG_INTERVAL_MS = 5000;    // Aus config.json → ui.animation.bgIntervalMs
   ```

3. **Aktualisiere die README:**
   ```bash
   npm run update-readme
   ```

4. **Commit:**
   ```bash
   git add config.json script.js README.md
   git commit -m "Hintergrund-Intervall erhöht: 5000ms"
   ```

---

## 📝 Dateien-Zuständigkeiten

| Datei | Masterquelle | Änderungen | Automatisch aktualisiert |
|-------|-------------|-----------|--------------------------|
| `config.json` | – | ✏️ Manuell | – |
| `script.js` | `config.json` | ✏️ Manuell (Logik) | ❌ Nein |
| `style.css` | `config.json` | ✏️ Manuell (Logik) | ❌ Nein |
| `README.md` | `config.json` | ❌ Auto-generiert | ✅ Ja |
| `index.html` | – | ✏️ Manuell | – |

---

## 🔧 Verfügbare npm-Befehle

```bash
# README von config.json aktualisieren
npm run update-readme

# Konfiguration validieren
npm run validate

# Beide Befehle hintereinander
npm run check
```

---

## ✅ Checkliste für Änderungen

Bevor Sie committen:

- [ ] **`config.json`** wurde aktualisiert (falls Konfiguration geändert wurde)
- [ ] **`npm run validate`** wird ohne Fehler ausgeführt
- [ ] **`npm run update-readme`** wurde ausgeführt
- [ ] **Quelldateien** (`script.js`, `style.css`) wurden aktualisiert (wenn nötig)
- [ ] **README.md** wird nicht manuell bearbeitet (nur generiert!)
- [ ] **`git diff`** überprüft, dass nur erwartete Dateien geändert wurden

---

## 🚫 Häufige Fehler

### ❌ Fehler: README.md manuell bearbeitet
**Problem:** Direkte Änderungen an README.md werden beim nächsten `npm run update-readme` überschrieben.

**Lösung:**
1. Änderungen rückgängig machen: `git checkout README.md`
2. Stattdessen `config.json` bearbeiten
3. `npm run update-readme` ausführen

### ❌ Fehler: config.json aktualisiert, aber README nicht
**Problem:** Die README ist veraltet, obwohl `config.json` Änderungen enthält.

**Lösung:**
```bash
npm run update-readme
git add README.md
```

### ❌ Fehler: Ungültige Konfiguration
**Problem:** `npm run validate` gibt Fehler aus.

**Lösung:**
1. Fehler lesen: `npm run validate`
2. `config.json` korrigieren
3. `npm run validate` erneut ausführen

---

## 📚 Pre-Commit Hook (optional)

Richten Sie einen Git Pre-Commit Hook ein, um die README automatisch zu aktualisieren:

**`.git/hooks/pre-commit`:**
```bash
#!/bin/bash

# Validiere config.json
if ! npm run validate > /dev/null 2>&1; then
  echo "❌ config.json ist ungültig!"
  exit 1
fi

# Aktualisiere README
npm run update-readme

# Füge aktualisierte README hinzu
git add README.md
```

**Aktivieren:**
```bash
chmod +x .git/hooks/pre-commit
```

---

## 🔄 GitHub Actions (optional)

Für CI/CD können Sie eine GitHub Action einrichten:

**`.github/workflows/validate.yml`:**
```yaml
name: Validate & Update README

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm run validate
      - run: npm run update-readme
      - name: Check for changes
        run: |
          if ! git diff --quiet README.md; then
            echo "❌ README.md ist nicht synchronisiert!"
            git diff README.md
            exit 1
          fi
```

---

## 💡 Best Practices

1. **Immer `config.json` als Quelle der Wahrheit verwenden**
   - Alle Konfigurationen gehören hier herein

2. **Quellen-Kommentare aktuell halten**
   - In `script.js` und `style.css` Kommentare hinzufügen, die auf `config.json` verweisen

3. **Validieren vor dem Commit**
   - `npm run validate` ausführen
   - `npm run update-readme` ausführen

4. **README als Dokumentation ansehen**
   - NUR für Lesern/Dokumentation
   - NICHT für Änderungen bearbeiten

5. **Dokumentation in Kommentaren**
   - Komplexe Logik in Quelldateien kommentieren
   - Auf `config.json` verweisen

---

## 📞 Fragen & Support

Falls Sie Fragen zum Workflow haben:
1. Überprüfen Sie dieses CONTRIBUTING.md
2. Lesen Sie die inline-Kommentare in `config.json`
3. Überprüfen Sie die Quelldateien auf Dokumentation
