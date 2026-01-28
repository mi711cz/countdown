// Ziel: 01.03.2026 00:00:00 Europe/Berlin (Offset +01:00)
const target = new Date("2026-03-01T00:00:00+01:00");

const daysEl = document.getElementById("daysValue");
const hintEl = document.getElementById("hint");
const wrap = document.querySelector(".wrap");

// Flip-Karten initial aufbauen
const flips = [...document.querySelectorAll(".flip")];
const state = new Map(); // key -> lastValue

function buildCard(el, initial="0") {
  el.innerHTML = `
    <div class="top">${initial}</div>
    <div class="bot">${initial}</div>
    <div class="divider"></div>
  `;
}

for (const el of flips) {
  buildCard(el, "0");
  state.set(el.dataset.key, "0");
}

function pad2(n){ return String(n).padStart(2,"0"); }

function setFlip(key, value) {
  const el = flips.find(x => x.dataset.key === key);
  if (!el) return;

  const prev = state.get(key);
  if (prev === value) return;

  state.set(key, value);

  const top = el.querySelector(".top");
  const bot = el.querySelector(".bot");

  // Animation-Layer einsetzen
  const animTop = document.createElement("div");
  animTop.className = "animTop";
  animTop.textContent = prev;

  const animBot = document.createElement("div");
  animBot.className = "animBot";
  animBot.textContent = value;

  el.appendChild(animTop);
  el.appendChild(animBot);

  el.classList.add("flipping");

  // Nach Flip: statische Hälften auf neuen Wert setzen, Animationslayer entfernen
  const cleanup = () => {
    top.textContent = value;
    bot.textContent = value;
    el.classList.remove("flipping");
    animTop.remove();
    animBot.remove();
    el.removeEventListener("animationend", cleanup);
  };

  // Wir warten auf das Ende der Bot-Animation (kommt als animationend)
  el.addEventListener("animationend", cleanup);
}

function update() {
  const now = new Date();
  let diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    daysEl.textContent = "0";
    hintEl.textContent = "Ziel erreicht 🎉";
    wrap.classList.add("finished");

    // Alles auf 00:00:00.000 setzen
    ["hh1","hh2","mm1","mm2","ss1","ss2"].forEach(k => setFlip(k,"0"));
    return;
  }

  const sec = diff % 60;
  diff = Math.floor(diff / 60);

  const min = diff % 60;
  diff = Math.floor(diff / 60);

  const hrs = diff % 24;
  const days = Math.floor(diff / 24);

  daysEl.textContent = String(days);

  const HH = pad2(hrs);
  const MM = pad2(min);
  const SS = pad2(sec);

  // Ziffern einzeln flippen
  setFlip("hh1", HH[0]); setFlip("hh2", HH[1]);
  setFlip("mm1", MM[0]); setFlip("mm2", MM[1]);
  setFlip("ss1", SS[0]); setFlip("ss2", SS[1]);

  // Smooth (Millisekunden) — rAF statt setInterval
  setTimeout(update, 1000);
}

update();
