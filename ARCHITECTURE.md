# ARCHITECTURE – Systemdesign & Datenfluss

Dieses Dokument beschreibt die Architektur des Countdown-Projekts und wie alle Komponenten miteinander verbunden sind.

---

## 🏗️ Systemübersicht

```
┌─────────────────────────────────────────────────────────────┐
│                      MASTER CONFIGURATION                    │
│                        config.json                           │
│  (Zieldaten, Farben, Animation, Responsive-Werte)          │
└────────────┬────────────────────────────┬────────────────────┘
             │                            │
      ┌──────▼─────────┐          ┌──────▼──────────┐
      │   Validierung   │          │  Dokumentation   │
      │ validate-       │          │  update-readme.js│
      │ config.js       │          │                 │
      └──────┬─────────┘          └──────┬──────────┘
             │                            │
      ┌──────▼─────────┐          ┌──────▼──────────┐
      │ ✅ / ❌ Status  │          │   README.md      │
      │ (Konsistenz)   │          │ (AUTO-GENERIERT) │
      └────────────────┘          └──────┬──────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │                     │                     │
          ┌─────────▼────────┐  ┌────────▼──────────┐  ┌──────▼────────┐
          │   Quelldateien   │  │  package.json     │  │  Dokumentation│
          │  manuell anpassen│  │  (npm Scripts)    │  │  CONTRIBUTING │
          │                  │  │                   │  │  CONFIG.md    │
          │ - script.js      │  │ - update-readme   │  │  (Guideline)  │
          │ - style.css      │  │ - validate        │  │               │
          │ - index.html     │  │ - check           │  │               │
          └──────────────────┘  └───────────────────┘  └───────────────┘
```

---

## 📊 Datenfluss für Änderungen

### Szenario 1: Zieldaten-Änderung

```
1. Person bearbeitet config.json
   └─ "countdown.targets" ändern

2. Person führt aus: npm run validate
   └─ Überprüft Konsistenz
   └─ ✅ ODER ❌ Fehler zeigen

3. Person führt aus: npm run update-readme
   ├─ Liest config.json
   ├─ Generiert README.md mit neuen Werten
   └─ Speichert README.md

4. Person commitet:
   ├─ config.json (Master-Datei)
   ├─ README.md (Auto-generiert)
   └─ Optional: script.js (wenn Logik-Änderungen nötig)

5. Quelldateien (script.js) erkennen Ziele AUTOMATISCH
   └─ Keine weitere Änderung nötig (TIME_ZONE ist hartkodiert)
```

### Szenario 2: Farbschema-Änderung

```
1. Person bearbeitet config.json
   └─ "ui.colors" ändern

2. Person aktualisiert style.css MANUELL
   └─ CSS-Variablen in :root anpassen

3. Person führt aus: npm run update-readme
   └─ README zeigt neue Farb-Dokumentation

4. Person commitet:
   ├─ config.json
   ├─ style.css
   └─ README.md
```

---

## 📁 Datei-Abhängigkeiten

```
config.json (MASTER)
│
├─► script.js
│   └─ TIME_ZONE (hartkodiert)
│   └─ BG_INTERVAL_MS (hartkodiert)
│   └─ Liest keine Werte direkt aus config.json!
│
├─► style.css
│   └─ CSS-Variablen --bg, --fg, etc. (hartkodiert)
│   └─ Liest keine Werte direkt aus config.json!
│
├─► README.md (AUTO-GENERIERT)
│   └─ Generiert von scripts/update-readme.js
│   └─ NICHT manuell bearbeiten!
│
├─► package.json
│   └─ enthält Skript-Referenzen
│
└─► scripts/
    ├─ update-readme.js
    │  └─ Liest config.json
    │  └─ Schreibt README.md
    │
    └─ validate-config.js
       └─ Validiert config.json Struktur
```

---

## 🔄 Update-Prozess (npm run update-readme)

```
┌──────────────────────────────────────┐
│  scripts/update-readme.js startet    │
└──────────────┬───────────────────────┘
               │
        ┌──────▼──────────┐
        │  Lese config.json│
        │  (JSON.parse)    │
        └──────┬───────────┘
               │
        ┌──────▼────────────────────────┐
        │  Extrahiere Werte:              │
        │  - countdown.targets            │
        │  - countdown.timezone           │
        │  - ui.colors                    │
        │  - ui.animation                 │
        │  - ui.responsive                │
        │  - features (A11y, Perf, Sec)  │
        └──────┬───────────────────────────┘
               │
        ┌──────▼────────────────┐
        │  Formatiere Werte:     │
        │  - Tabellen generieren │
        │  - Listen formatieren  │
        │  - Code-Blöcke erzeugen│
        └──────┬────────────────┘
               │
        ┌──────▼──────────────┐
        │  Generiere Template:  │
        │  - Section 1: Intro  │
        │  - Section 2: Struktur│
        │  - Section 3: Komponenten
        │  - Section 4: Config │
        │  - Section 5: Install│
        │  ... usw.           │
        └──────┬─────────────┘
               │
        ┌──────▼──────────────────┐
        │  Schreibe README.md      │
        │  (fs.writeFileSync)      │
        └──────┬──────────────────┘
               │
        ┌──────▼────────────────────────┐
        │  ✅ Erfolgsmeldung ausgeben    │
        └─────────────────────────────────┘
```

---

## 🔐 Konsistenz-Garantien

| Datei | Source | Manuell | Auto | Validiert |
|-------|--------|---------|------|-----------|
| config.json | – | ✏️ | – | ✅ |
| script.js | config | ✏️ | – | ⚠️ |
| style.css | config | ✏️ | – | ⚠️ |
| README.md | config | ❌ | ✅ | – |
| index.html | – | ✏️ | – | – |

**Legende:**
- ✏️ Manuelle Änderungen
- ✅ Auto-generiert / validiert
- ⚠️ Manuell zu aktualisieren basierend auf config.json
- ❌ Nicht manuell bearbeiten!

---

## 🎯 Best Practices nach Architektur

1. **config.json ist Quelle der Wahrheit**
   - Alle Konfigurationen dort definieren
   - Niemals in mehreren Dateien duplizieren

2. **Quelldateien sind Logik**
   - script.js, style.css, index.html: Implementierung
   - Hartkodierte Werte aus config.json einfügen (nicht automatisch gelesen!)

3. **README ist Dokumentation**
   - AUTO-GENERIERT aus config.json
   - Nicht manuell bearbeiten
   - Mit `npm run update-readme` aktualisieren

4. **Validierung vor dem Commit**
   - `npm run validate` ausführen
   - Fehler beheben
   - `npm run update-readme` ausführen

5. **Version-Kontrolle**
   - config.json committen (Master)
   - README.md committen (generiert)
   - scripts/ committen (Generator)

---

## 🔍 Debugging & Troubleshooting

### Problem: README ist veraltet

**Ursache:** `npm run update-readme` wurde nicht ausgeführt

**Lösung:**
```bash
npm run check  # Validiert + aktualisiert README
```

### Problem: config.json ist ungültig

**Ursache:** Syntax-Fehler oder ungültige Werte

**Lösung:**
```bash
npm run validate  # Zeigt Fehler an
```

### Problem: script.js / style.css stehen nicht im Sync mit config.json

**Ursache:** Werte wurden in config.json geändert, aber nicht in Quelldateien

**Lösung:**
```bash
# 1. In config.json gewünschte Werte eintragen
# 2. In script.js/style.css die entsprechenden Zeilen suchen und aktualisieren
# 3. npm run update-readme
# 4. Commit
```

### Problem: README.md wurde überschrieben/hat Konflikte

**Ursache:** README.md wurde manuell bearbeitet ODER Git-Merge-Konflikt

**Lösung:**
```bash
git checkout HEAD -- README.md  # Verwache letzte Version
npm run update-readme           # Regeneriere
```

---

## 📈 Zukünftige Erweiterungen

Mögliche Verbesserungen zu diesem System:

1. **Git Pre-Commit Hook**
   - Automatisches `npm run check` vor Commit
   - Verhindert veraltete README

2. **GitHub Actions**
   - CI/CD für Validierung
   - Automatischer Commit von aktualisierter README

3. **Datei-Watcher**
   - Automatisches `npm run update-readme` bei config.json-Änderungen
   - Mit `npm run watch`

4. **Config-Validator erweitern**
   - TypeScript/JSON-Schema für strikte Validierung
   - Automatische Fix-Vorschläge

5. **README-Fragmentierung**
   - Separate Dateien für config, features, etc.
   - Modularer Aufbau

---

## 📚 Weitere Ressourcen

- **[config.json](config.json)** – Konfiguration (mit Beispielen)
- **[CONFIG.md](CONFIG.md)** – Konfigurationsdokumentation
- **[CONTRIBUTING.md](CONTRIBUTING.md)** – Entwicklungs-Workflow
- **[scripts/](scripts/)** – Automatisierungs-Skripte
- **[README.md](README.md)** – Hauptdokumentation (AUTO-GENERIERT)
