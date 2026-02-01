// Countdown-Ziel wechselt automatisch zwischen:
// - 01. März 00:00:00 (Europe/Berlin)
// - 31. Oktober 00:00:00 (Europe/Berlin)
// Jahr für Jahr ohne manuelle Anpassung.
//
// Hinweis: Wir verwenden Intl.DateTimeFormat, um den UTC-Offset für Europe/Berlin
// zum jeweiligen Datum zu ermitteln (wichtig für Sommerzeit-Umstellungen).

const TIME_ZONE = "Europe/Berlin";

const daysEl = document.getElementById("daysValue");
const hintEl = document.getElementById("hint");
const wrap = document.querySelector(".wrap");
const srStatusEl = document.getElementById("srStatus");

// Flip-Karten initial aufbauen
const flips = [...document.querySelectorAll(".flip")];
const state = new Map(); // key -> lastValue
const flipByKey = new Map(flips.map(el => [el.dataset.key, el]));

/** Liefert den Offset in Minuten des given timeZone zur gegebenen UTC-Zeit. */
function tzOffsetMinutes(date, timeZone) {
  // Beispiel timeZoneName: "GMT+1" / "GMT+2"
  const dtf = new Intl.DateTimeFormat("en-US", { timeZone, timeZoneName: "shortOffset" });
  const parts = dtf.formatToParts(date);
  const tzName = parts.find(p => p.type === "timeZoneName")?.value || "GMT";
  const m = tzName.match(/GMT([+-])(\d{1,2})(?::?(\d{2}))?/);
  if (!m) return 0;
  const sign = m[1] === "-" ? -1 : 1;
  const hh = parseInt(m[2], 10);
  const mm = m[3] ? parseInt(m[3], 10) : 0;
  return sign * (hh * 60 + mm);
}

/**
 * Baut ein Date-Objekt für eine lokale Zeit in einer IANA-Zeitzone.
 * monthIndex ist 0-basiert (0=Jan, 2=März, 9=Oktober).
 */
function makeZonedDate(year, monthIndex, day, hour = 0, minute = 0, second = 0, ms = 0) {
  // Start mit UTC-Grobwert
  let utcMillis = Date.UTC(year, monthIndex, day, hour, minute, second, ms);
  let d = new Date(utcMillis);

  // Offset für diese Zone bestimmen und auf "UTC = local - offset" umrechnen
  let off1 = tzOffsetMinutes(d, TIME_ZONE);
  utcMillis = Date.UTC(year, monthIndex, day, hour, minute, second, ms) - off1 * 60 * 1000;
  d = new Date(utcMillis);

  // Noch einmal prüfen (wichtig an DST-Grenzen, z.B. wenn Offset sich ändert)
  const off2 = tzOffsetMinutes(d, TIME_ZONE);
  if (off2 !== off1) {
    utcMillis = Date.UTC(year, monthIndex, day, hour, minute, second, ms) - off2 * 60 * 1000;
    d = new Date(utcMillis);
  }
  return d;
}

function getZonedParts(date, timeZone) {
  // en-CA ergibt zuverlässig YYYY-MM-DD und 24h Zeit (mit formatToParts)
  const dtf = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = dtf.formatToParts(date);
  const obj = {};
  for (const p of parts) {
    if (p.type !== "literal") obj[p.type] = p.value;
  }
  return {
    year: Number(obj.year),
    month: Number(obj.month), // 1-12
    day: Number(obj.day),
    hour: Number(obj.hour),
    minute: Number(obj.minute),
    second: Number(obj.second)
  };
}

function pad2(n) { return String(n).padStart(2, "0"); }
function pad3(n) { return String(n).padStart(3, "0"); } // (nicht genutzt, aber belassen)

/** Nächstes Ziel (01.03. oder 31.10.) basierend auf dem aktuellen Zeitpunkt. */
function computeTarget(now = new Date()) {
  const { year } = getZonedParts(now, TIME_ZONE);

  const march1 = makeZonedDate(year, 2, 1, 0, 0, 0, 0);
  const oct31 = makeZonedDate(year, 9, 31, 0, 0, 0, 0);

  if (now.getTime() < march1.getTime()) {
    return { date: march1, label: `01.03.${year}` };
  }
  if (now.getTime() < oct31.getTime()) {
    return { date: oct31, label: `31.10.${year}` };
  }
  const nextMarch = makeZonedDate(year + 1, 2, 1, 0, 0, 0, 0);
  return { date: nextMarch, label: `01.03.${year + 1}` };
}

function buildCard(el, initial = "0") {
  el.innerHTML = `
    <div class="top"><div class="digit">${initial}</div></div>
    <div class="bot"><div class="digit">${initial}</div></div>
    <div class="divider" aria-hidden="true"></div>
  `;
}

for (const el of flips) {
  buildCard(el, "0");
  state.set(el.dataset.key, "0");
}

function setFlip(key, value) {
  const el = flipByKey.get(key);
  if (!el) return;

  const prev = state.get(key);
  if (prev === value) return;
  state.set(key, value);

  const animTop = document.createElement("div");
  animTop.className = "animTop";
  animTop.innerHTML = `<div class="digit">${prev}</div>`;

  const animBot = document.createElement("div");
  animBot.className = "animBot";
  animBot.innerHTML = `<div class="digit">${value}</div>`;

  el.appendChild(animTop);
  el.appendChild(animBot);
  el.classList.add("flipping");

  const cleanup = () => {
    el.querySelector(".top .digit").textContent = value;
    el.querySelector(".bot .digit").textContent = value;
    el.classList.remove("flipping");
    animTop.remove();
    animBot.remove();
  };

  // Wichtig: auf animBot hören (damit cleanup nicht “zu früh” passiert)
  animBot.addEventListener("animationend", cleanup, { once: true });

  // Falls Reduced Motion aktiv ist (Animation = none), sofort finalisieren
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (prefersReduced) cleanup();
}

function renderCountdown(days, hrs, min, sec) {
  // Tage
  daysEl.textContent = String(days);

  const HH = pad2(hrs);
  const MM = pad2(min);
  const SS = pad2(sec);

  setFlip("hh1", HH[0]); setFlip("hh2", HH[1]);
  setFlip("mm1", MM[0]); setFlip("mm2", MM[1]);
  setFlip("ss1", SS[0]); setFlip("ss2", SS[1]);

  // Screenreader-Text (einfach lesbar)
  srStatusEl.textContent = `${days} Tage, ${HH} Stunden, ${MM} Minuten, ${SS} Sekunden verbleibend`;
}

let currentTarget = null;

function ensureTarget(now) {
  if (!currentTarget || now.getTime() >= currentTarget.date.getTime()) {
    currentTarget = computeTarget(now);
    const targetDateEl = document.getElementById("targetDate");
    if (targetDateEl) targetDateEl.textContent = currentTarget.label;
    else hintEl.textContent = `Countdown ${currentTarget.label}`;
    wrap.classList.remove("finished");
  }
}

function update() {
  const now = new Date();

  // Ziel ggf. initialisieren / nach Erreichen weiterschalten
  ensureTarget(now);

  let diffMs = currentTarget.date.getTime() - now.getTime();

  // Falls wir exakt "drüber" sind (z.B. Tab war im Hintergrund), sofort neu bestimmen
  if (diffMs <= 0) {
    currentTarget = null;
    ensureTarget(new Date());
    diffMs = currentTarget.date.getTime() - Date.now();
  }

  let diff = Math.max(0, Math.floor(diffMs / 1000));

  const sec = diff % 60; diff = Math.floor(diff / 60);
  const min = diff % 60; diff = Math.floor(diff / 60);
  const hrs = diff % 24;
  const days = Math.floor(diff / 24);

  renderCountdown(days, hrs, min, sec);

  // Driftfrei: auf die nächste volle Sekunde ausrichten
  const delay = 1000 - (Date.now() % 1000);
  setTimeout(update, delay);
}

update();

// ============ Background Crossfade ============

const bgRoot = document.documentElement;

// Beispiel: du kannst mehrere Bilder rotieren lassen
const bgImages = [
  "url('img/20251018_123814.jpg')", // dein Foto (Pfad anpassen!)
  // "url('img/another.jpg')",
];

let bgIndex = 0;
let showingA = true;

// Initial setzen: A zeigt Bild 0, B ist leer
bgRoot.style.setProperty("--bg-image-a", bgImages[0]);
bgRoot.style.setProperty("--bg-image-b", "none");
bgRoot.style.setProperty("--bg-a-opacity", "1");
bgRoot.style.setProperty("--bg-b-opacity", "0");

/**
 * Crossfade auf das nächste Bild.
 * Du kannst auch statt Bildern "none" setzen → dann blendest du zurück auf reines Dunkel.
 */
function crossfadeTo(nextImageCss /* z.B. "url('...')" oder "none" */) {
  if (showingA) {
    bgRoot.style.setProperty("--bg-image-b", nextImageCss);
    bgRoot.style.setProperty("--bg-a-opacity", "0");
    bgRoot.style.setProperty("--bg-b-opacity", "1");
  } else {
    bgRoot.style.setProperty("--bg-image-a", nextImageCss);
    bgRoot.style.setProperty("--bg-a-opacity", "1");
    bgRoot.style.setProperty("--bg-b-opacity", "0");
  }
  showingA = !showingA;
}

/** Beispiel: alle 10s wechseln */
const BG_INTERVAL_MS = 3000;

setInterval(() => {
  bgIndex = (bgIndex + 1) % (bgImages.length + 1);

  // +1 Slot = "dunkel" (kein Foto)
  const next = (bgIndex === bgImages.length) ? "none" : bgImages[bgIndex];
  crossfadeTo(next);
}, BG_INTERVAL_MS);
