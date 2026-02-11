# QUICK-REFERENCE – Schneller Überblick

Eine kompakte Referenz für die häufigsten Aufgaben.

---

## ⚡ 30-Sekunden Überblick

| Aufgabe | Command |
|---------|---------|
| Zieldaten ändern | Edit `config.json` → `npm run check` |
| Farben ändern | Edit `config.json` + `style.css` → `npm run check` |
| Animation-Tempo | Edit `config.json` + `script.js` → `npm run check` |
| README aktualisieren | `npm run update-readme` |
| Änderungen validieren | `npm run validate` |
| Alles auf einmal (empfohlen) | `npm run check` |

---

## 📋 Checklisten

### Checklist: Zieldaten ändern

```bash
# 1. Konfiguration ändern
nano config.json
# Ändere: countdown.targets[0].{month, day, displayFormat}
#         countdown.targets[1].{month, day, displayFormat}

# 2. Validieren & aktualisieren
npm run check

# 3. Script aktualisieren (OPTIONAL, wenn Logik ändert)
# → Normalerweise NICHT nötig, Ziele werden automatisch erkannt

# 4. Git committen
git add config.json README.md
git commit -m "Zieldaten: von 01.03/31.10 zu XX.XX/YY.YY"
```

### Checklist: Farbschema ändern

```bash
# 1. config.json aktualisieren
nano config.json
# Ändere: ui.colors.{bg, fg, muted, card, ...}

# 2. style.css aktualisieren
nano style.css
# Suche: :root { --bg: ..., --fg: ..., }
# Ersetze mit neuen Werten

# 3. README aktualisieren
npm run check

# 4. Vorschau im Browser
# Öffne index.html oder starte: python -m http.server 8080

# 5. Committen
git add config.json style.css README.md
git commit -m "Farbschema aktualisiert"
```

### Checklist: Animation-Intervall ändern

```bash
# 1. config.json aktualisieren
nano config.json
# Ändere: ui.animation.{bgIntervalMs, flipDurationMs}

# 2. script.js aktualisieren
nano script.js
# Suche: const BG_INTERVAL_MS = ...
# Ersetze mit neuem Wert aus config.json

# 3. README aktualisieren
npm run check

# 4. Committen
git add config.json script.js README.md
git commit -m "Animation-Intervall erhöht auf XXXms"
```

---

## 🎨 Häufige Wert-Änderungen

### Farb-Snippets (für style.css)

```css
/* Dark Mode (aktuell) */
--bg: #070b18;
--fg: #eaf0ff;

/* Light Mode */
--bg: #ffffff;
--fg: #000000;

/* High Contrast */
--bg: #000000;
--fg: #ffff00;

/* Blueish */
--bg: #0a1929;
--fg: #90caf9;
```

### Animation-Snippets (für script.js)

```javascript
// Schnell (1 Sekunde)
const BG_INTERVAL_MS = 1000;

// Normal (2.7 Sekunden, aktuell)
const BG_INTERVAL_MS = 2700;

// Langsam (5 Sekunden)
const BG_INTERVAL_MS = 5000;

// Sehr langsam (10 Sekunden)
const BG_INTERVAL_MS = 10000;

// Deaktiviert (kein Wechsel)
const BG_INTERVAL_MS = Infinity;
```

### Zieldaten-Snippets (für config.json)

```json
// Frühjahr / Herbst (aktuell)
{
  "month": 2,
  "day": 1,
  "label": "01. März",
  "displayFormat": "01.03."
}

// Sommer / Winter
{
  "month": 5,
  "day": 21,
  "label": "21. Juni",
  "displayFormat": "21.06."
}

// Neujahr / Halbjahr
{
  "month": 0,
  "day": 1,
  "label": "01. Januar",
  "displayFormat": "01.01."
}
```

---

## 🔍 Debugging-Commands

```bash
# Nur config.json validieren
npm run validate

# Nur README aktualisieren
npm run update-readme

# Beides zusammen (empfohlen)
npm run check

# Git-Änderungen überprüfen
git diff config.json    # Was hat sich geändert?
git diff README.md      # Was wurde generiert?
git status              # Alle Änderungen?

# Letzten Commit rückgängig machen
git revert HEAD

# Zu vorheriger Version zurück
git checkout config.json README.md
```

---

## ✅ Vor jedem Commit

```bash
# Schritt 1: Validiere
npm run validate
# → Sollte ✅ zeigen, keine ❌

# Schritt 2: Aktualisiere README
npm run update-readme
# → Sollte ✅ zeigen

# Schritt 3: Überprüfe Änderungen
git diff
# → Nur erwartete Dateien geändert?

# Schritt 4: Commit
git add config.json script.js style.css README.md
git commit -m "Aussagekräftige Beschreibung"
```

---

## 🆘 Schnelle Fehlerbehebung

| Problem | Lösung |
|---------|--------|
| ❌ `npm run validate` Fehler | Lese Fehlermeldung, korrigiere `config.json` |
| ⚠️ README.md ist veraltet | `npm run update-readme` ausführen |
| 🔄 Git sagt "config.json wurde geändert" | Es sollte! Das ist normal. Commit es. |
| 😕 Ich weiß nicht, was ich geändert habe | `git diff` oder `git status` prüfen |
| 🚫 README.md zeigt alte Werte | `npm run validate` → `npm run update-readme` → `git add README.md` |

---

## 📞 Weitere Hilfe

- **Größere Fragen?** Lese [ARCHITECTURE.md](ARCHITECTURE.md)
- **Entwickler-Workflow?** Lese [CONTRIBUTING.md](CONTRIBUTING.md)
- **Config-Details?** Lese [CONFIG.md](CONFIG.md)
- **Allgemeine Docs?** Lese [README.md](README.md)

---

## 🎯 Das Wichtigste (TL;DR)

1. **Bearbeite `config.json`** → Master-Datei
2. **Führe `npm run check` aus** → Validiert + aktualisiert README
3. **Committe `config.json` + `README.md`** → Beide Dateien
4. **Fertig!** 🎉

Das war's!
