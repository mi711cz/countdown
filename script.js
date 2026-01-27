// Ziel: 01.03.2026 00:00:00 in Europe/Berlin
// Hinweis: JS Date() arbeitet intern in UTC, aber der Konstruktor mit "YYYY-MM-DDTHH:mm:ss+01:00"
// ist eindeutig (inkl. Offset).
const target = new Date("2026-03-01T00:00:00+01:00");

const elDays = document.getElementById("days");
const elTime = document.getElementById("time");
const elHint = document.getElementById("hint");

function pad2(n) { return String(n).padStart(2, "0"); }
function pad3(n) { return String(n).padStart(3, "0"); }

function tick() {
  const now = new Date();
  let diff = target.getTime() - now.getTime();

  if (diff <= 0) {
    elDays.textContent = "0 Tage";
    elTime.textContent = "00:00:00.000";
    elHint.textContent = "Ziel erreicht 🎉";
    return; // Stoppt bei 0
  }

  const ms = diff % 1000;
  diff = Math.floor(diff / 1000);

  const sec = diff % 60;
  diff = Math.floor(diff / 60);

  const min = diff % 60;
  diff = Math.floor(diff / 60);

  const hrs = diff % 24;
  const days = Math.floor(diff / 24);

  elDays.textContent = `${days} Tage`;
  elTime.textContent = `${pad2(hrs)}:${pad2(min)}:${pad2(sec)}.${pad3(ms)}`;

  // Für möglichst flüssige Millisekundenanzeige:
  requestAnimationFrame(tick);
}

tick();
