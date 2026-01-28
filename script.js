// Ziel: 01.03.2026 00:00:00 Europe/Berlin (Offset +01:00)
// Hinweis: Für andere Daten rund um Sommerzeit besser echte TZ-Logik (Temporal/Luxon).
const target = new Date("2026-03-01T00:00:00+01:00");

const daysEl = document.getElementById("daysValue");
const hintEl = document.getElementById("hint");
const wrap = document.querySelector(".wrap");
const srStatusEl = document.getElementById("srStatus");

// Flip-Karten initial aufbauen
const flips = [...document.querySelectorAll(".flip")];
const state = new Map(); // key -> lastValue
const flipByKey = new Map(flips.map(el => [el.dataset.key, el]));

function buildCard(el, initial = "0") {
  el.innerHTML = `
<<<<<<< HEAD
<<<<<<< HEAD
    <div class="top"><div class="digit">${initial}</div></div>
    <div class="bot"><div class="digit">${initial}</div></div>
    <div class="divider" aria-hidden="true"></div>
>>>>>>> debug
  `;
}

for (const el of flips) {
  buildCard(el, "0");
  state.set(el.dataset.key, "0");
}

function pad2(n){ return String(n).padStart(2, "0"); }
function pad3(n){ return String(n).padStart(3, "0"); }

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
<<<<<<< HEAD

=======
>>>>>>> debug

  el.appendChild(animTop);
  el.appendChild(animBot);
  el.classList.add("flipping");

  const cleanup = () => {
    el.querySelector(".top .digit").textContent = value;
    el.querySelector(".bot .digit").textContent = value;
>>>>>>> debug
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

function renderCountdown(days, hrs, min, sec){
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

function update() {
  const now = new Date();
  let diffMs = target.getTime() - now.getTime();

  if (diffMs <= 0) {
    hintEl.textContent = "Ziel erreicht 🎉";
    wrap.classList.add("finished");
    renderCountdown(0, 0, 0, 0);
    srStatusEl.textContent = "Ziel erreicht.";
    return;
  }

  let diff = Math.floor(diffMs / 1000);

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
