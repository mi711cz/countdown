# 📚 DOKUMENTATION – Übersicht aller Dateien

Leitfaden für schnelle Navigation durch die Dokumentation.

---

## 🗂️ Dokumentations-Struktur

```
countdown/
│
├── 📄 README.md
│   └─ 🔴 HAUPTDOKUMENTATION (AUTO-GENERIERT)
│      Nicht manuell bearbeiten!
│      Beschreibung: Vollständige Projekt-Dokumentation
│      Für: Alle (Benutzer, Entwickler, Vollständigkeit)
│
├── 📄 CONFIG.md  ⭐ START HIER
│   └─ Konfigurationsdokumentation
│      Beschreibung: Wie man config.json bearbeitet
│      Für: Entwickler die Werte ändern wollen
│
├── 📄 CONTRIBUTING.md ⭐ START HIER
│   └─ Entwickler-Workflow
│      Beschreibung: Schritt-für-Schritt Anleitung für Änderungen
│      Für: Entwickler, Änderungen am Projekt vornehmen
│
├── 📄 ARCHITECTURE.md
│   └─ System-Design
│      Beschreibung: Wie alles miteinander funktioniert
│      Für: Entwickler, die das System verstehen wollen
│
├── 📄 QUICK-REFERENCE.md ⭐ START HIER (schnell!)
│   └─ Schneller Überblick
│      Beschreibung: Checklisten und häufige Befehle
│      Für: Schnelle Referenz während der Arbeit
│
├── 📄 LICENSE
│   └─ Lizenztext (MIT)
│
├── 📄 config.json
│   └─ 🔴 MASTER-KONFIGURATION
│      HIER ÄNDERUNGEN VORNEHMEN!
│      Beschreibung: Zentrale Konfigurationsdatei
│      Für: Alle Projekt-Einstellungen
│
├── 📄 package.json
│   └─ NPM-Konfiguration
│      Scripts: update-readme, validate, check
│
├── 📁 scripts/
│   ├── update-readme.js
│   │   └─ Generator für README.md
│   │      Aktion: npm run update-readme
│   │
│   └── validate-config.js
│       └─ Validiert config.json
│          Aktion: npm run validate
│
└── (Andere Dateien: index.html, script.js, style.css, etc.)
```

---

## 🎯 Navigations-Guide nach Aufgabe

### Ich möchte...
| Aufgabe | Start hier... | Dann... |
|---------|---------------|--------|
| 🎨 Farben ändern | [CONFIG.md](CONFIG.md) | [style.css](style.css) bearbeiten |
| 📅 Zieldaten ändern | [QUICK-REFERENCE.md](QUICK-REFERENCE.md) | [CONFIG.md](CONFIG.md) lesen |
| ⚡ Animation anpassen | [CONFIG.md](CONFIG.md) | [script.js](script.js) bearbeiten |
| 🔍 Das System verstehen | [ARCHITECTURE.md](ARCHITECTURE.md) | [CONTRIBUTING.md](CONTRIBUTING.md) lesen |
| 💻 Schnell arbeiten | [QUICK-REFERENCE.md](QUICK-REFERENCE.md) | Checklisten folgen |
| 📝 Änderungen vornehmen | [CONTRIBUTING.md](CONTRIBUTING.md) | Workflow folgen |
| ❓ Fehler beheben | [ARCHITECTURE.md](ARCHITECTURE.md) | „Debugging" Section lesen |

---

## 📖 Dateien-Details

### Für neue Benutzer

**Start-Reihenfolge:**
1. **[README.md](README.md)** – Was ist das Projekt?
2. **[CONFIG.md](CONFIG.md)** – Wie konfiguriere ich es?
3. **[QUICK-REFERENCE.md](QUICK-REFERENCE.md)** – Schnelle Befehle

### Für Entwickler

**Start-Reihenfolge:**
1. **[CONTRIBUTING.md](CONTRIBUTING.md)** – Wie entwickle ich?
2. **[ARCHITECTURE.md](ARCHITECTURE.md)** – Wie funktioniert es?
3. **[CONFIG.md](CONFIG.md)** – Konfigurationsdetails

### Für Automation

**Wichtige Dateien:**
- `config.json` – Master-Konfiguration
- `scripts/update-readme.js` – README-Generator
- `scripts/validate-config.js` – Validator
- `package.json` – npm-Scripts

---

## 🏗️ System-Komponenten

```
┌──────────────────────────────────────┐
│     config.json (MASTER)             │
│  (Zieldaten, Farben, Animation)      │
└──────────────┬───────────────────────┘
               │
    ┌──────────┴──────────┐
    │                     │
┌───▼────────────┐   ┌───▼─────────────────┐
│   Quellen-     │   │  Dokumentation &    │
│   dateien      │   │  Automatisierung    │
│                │   │                     │
│ - script.js    │   │ - update-readme.js  │
│ - style.css    │   │ - validate-config.js│
│ - index.html   │   │ - README.md (AUTO)  │
└────────────────┘   └─────────────────────┘
```

---

## ✅ Checkliste: Alles verstanden?

Nach dem Lesen sollten Sie wissen:

- [ ] **README.md**: Was das Projekt macht
- [ ] **CONFIG.md**: Wie man Werte in config.json ändert
- [ ] **CONTRIBUTING.md**: Schritt-für-Schritt Workflow für Änderungen
- [ ] **ARCHITECTURE.md**: Wie die Komponenten zusammenhängen
- [ ] **QUICK-REFERENCE.md**: Schnelle Befehle & Checklisten
- [ ] **package.json**: Verfügbare npm-Scripts (update-readme, validate, check)

---

## 🚀 Schnellstart

```bash
# 1. Änderung vornehmen
nano config.json           # Werte bearbeiten

# 2. Validieren & aktualisieren
npm run check             # = validate + update-readme

# 3. Kontrollieren
git diff                  # Überprüfe Änderungen

# 4. Committen
git add config.json README.md
git commit -m "Beschreibung"
```

---

## 🔔 Wichtige Regeln

| ✅ TUN | ❌ NICHT TUN |
|------|------------|
| ✏️ config.json bearbeiten | ❌ README.md bearbeiten |
| 📤 `npm run update-readme` ausführen | ❌ README.md manuell ändern |
| ✅ Nach Änderungen validieren | ❌ Ohne Validierung committen |
| 📝 Quelldateien aktualisieren | ❌ Werte duplizieren |
| 🔄 Mit config.json synchronisieren | ❌ Veraltete Dokumentation committen |

---

## 📞 FAQ Quick Links

- **„Wie ändere ich X?"** → [CONFIG.md](CONFIG.md)
- **„Welche npm-Befehle gibt es?"** → [QUICK-REFERENCE.md](QUICK-REFERENCE.md)
- **„Ich verstehe das System nicht"** → [ARCHITECTURE.md](ARCHITECTURE.md)
- **„Wie committen?"** → [CONTRIBUTING.md](CONTRIBUTING.md)

---

## 🎓 Lernpfad

```
Anfänger
   ↓
README.md (Was ist es?)
   ↓
CONFIG.md (Wie ändere ich es?)
   ↓
QUICK-REFERENCE (Schnelle Befehle)
   ↓
Fortgeschrittene
   ↓
CONTRIBUTING.md (Detaillierter Workflow)
   ↓
ARCHITECTURE.md (System verstehen)
   ↓
Experte
   ↓
scripts/ (Generator & Validator)
   ↓
config.json (Master-Vision)
```

---

## 💡 Pro-Tipps

1. **Bookmark diese Datei** – Schnelle Navigation zu allen Docs
2. **QUICK-REFERENCE.md in VSCode öffnen** – Während Sie arbeiten
3. **npm run check vor Commit** – Verhindert Fehler
4. **config.json als Single Source of Truth** – Dann wird Dokumentation einfach

---

## 📊 Zusammenfassung

| Datei | Zweck | Status |
|-------|-------|--------|
| **README.md** | Hauptdokumentation | 🔴 AUTO-GENERIERT |
| **config.json** | Konfiguration | 🟢 MASTER-DATEI |
| **CONTRIBUTING.md** | Entwickler-Guide | 🔵 Manuell |
| **ARCHITECTURE.md** | System-Design | 🔵 Manuell |
| **QUICK-REFERENCE.md** | Schnellreferenz | 🔵 Manuell |
| **CONFIG.md** | Konfigurationsanleitung | 🔵 Manuell |
| **scripts/** | Automatisierung | 🟢 Code |
| **package.json** | NPM-Definition | 🟢 Code |

🔴 = Auto-generiert (NICHT manuell ändern)
🔵 = Manuell geschrieben
🟢 = Code/Konfiguration

---

**🎉 Sie sind bereit! Los geht's!**

Starten Sie mit [QUICK-REFERENCE.md](QUICK-REFERENCE.md) für schnelle Befehle oder [CONTRIBUTING.md](CONTRIBUTING.md) für den vollständigen Workflow.
