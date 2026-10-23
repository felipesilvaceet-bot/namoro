/* ====== PERSONALIZE AQUI ====== */
const CONFIG = {
  nomeDela: "Alice",          // o nome dela
  seuNome: "Felipe",            // o seu nome
  inicio: "2026-05-27",       // data que começaram a namorar
  legendas: ["Nossa primeira foto", "Melhor dia", "Dia especial", "O dia da aliança"],
fotos: ["img/foto1.jpg", "img/foto2.png", "img/foto3.jpg", "img/foto4.jpg"]
};
/* =============================== */

document.getElementById("to").textContent = "Para " + CONFIG.nomeDela + ",";
document.getElementById("from").textContent = "Com amor, " + CONFIG.seuNome;

// Polaroids
const rots = [-4, 3, -2, 5];
const string = document.getElementById("string");
CONFIG.legendas.forEach((cap, i) => {
  const fig = document.createElement("figure");
  fig.className = "polaroid";
  fig.style.setProperty("--r", rots[i % rots.length] + "deg");
  fig.style.margin = "0";
  const btn = document.createElement("button");
  btn.className = "slot";
  btn.type = "button";
  btn.setAttribute("aria-label", "Escolher foto: " + cap);
  btn.innerHTML = "<span>♥ Adicionar foto</span>";
  if (CONFIG.fotos && CONFIG.fotos[i]) {
  const img = new Image();
  img.src = CONFIG.fotos[i];
  img.alt = cap;
  btn.innerHTML = "";
  btn.appendChild(img);
}
  const input = document.createElement("input");
  input.type = "file"; input.accept = "image/*"; input.hidden = true;
  btn.addEventListener("click", () => input.click());
  input.addEventListener("change", () => {
    const f = input.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { btn.innerHTML = ""; const img = new Image(); img.src = r.result; img.alt = cap; btn.appendChild(img); };
    r.readAsDataURL(f);
  });
  const fc = document.createElement("figcaption");
  fc.textContent = cap;
  fig.append(btn, input, fc);
  string.appendChild(fig);
});

// Contador
const start = new Date(CONFIG.inicio + "T00:00:00");
const now = new Date();
const diff = Math.floor((new Date(now.getFullYear(), now.getMonth(), now.getDate()) - start) / 86400000);
document.getElementById("days").textContent = Math.max(diff, 0);
document.getElementById("daysLabel").textContent = diff === 1 ? "dia juntos" : "dias juntos";

// Carta + corações
function hearts(n) {
  for (let i = 0; i < n; i++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "♥";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (14 + Math.random() * 26) + "px";
    h.style.animationDuration = (3 + Math.random() * 3) + "s";
    h.style.animationDelay = (Math.random() * 1.2) + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 7500);
  }
}
document.getElementById("open").addEventListener("click", () => {
  const l = document.getElementById("letter");
  l.classList.add("open");
  hearts(28);
  l.scrollIntoView({ behavior: "smooth", block: "center" });
});
