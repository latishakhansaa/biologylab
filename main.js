// ===================================
// BIOLOGY LAB — MAIN JAVASCRIPT
// Created by Khansa Latisha
// ===================================

document.addEventListener("DOMContentLoaded", () => {

  // READING PROGRESS BAR
  const progressBar = document.createElement("div");

  progressBar.id = "reading-progress";
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 5px;
    width: 0%;
    background: #ff3e9d;
    z-index: 9999;
    transition: width 0.1s linear;
  `;

  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollable =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollable > 0
      ? (window.scrollY / scrollable) * 100
      : 100;

    progressBar.style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateProgress);
  updateProgress();

  // SAVE COMPLETED LESSONS
  const currentPage = location.pathname.split("/").pop();

  const lessonPages = [
    "biologi-dasar.html",
    "sel.html",
    "organel.html",
    "jenis-sel.html",
    "jaringan-organ.html",
    "sistem-organ.html",
    "peredaran-darah.html"
  ];

  if (lessonPages.includes(currentPage)) {
    window.addEventListener("scroll", () => {
      const reachedBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50;

      if (reachedBottom) {
        let completed = JSON.parse(
          localStorage.getItem("biologyCompleted") || "[]"
        );

        if (!completed.includes(currentPage)) {
          completed.push(currentPage);

          localStorage.setItem(
            "biologyCompleted",
            JSON.stringify(completed)
          );
        }
      }
    });
  }

});



// ===================================
// INTERACTIVE CELL EXPLORER
// Biology Lab — Khansa Latisha
// ===================================

const cellData = {
  membrane: {
    name: "Cell Membrane — Membran Sel",
    emoji: "🫧",
    function: "Membatasi dan melindungi bagian dalam sel.",
    detail: "Membran sel mengatur keluar masuknya zat dari dan ke dalam sel. Membran ini bersifat selektif permeabel."
  },

  nucleus: {
    name: "Nucleus — Inti Sel",
    emoji: "🧠",
    function: "Menyimpan sebagian besar informasi genetik (DNA).",
    detail: "Inti sel berperan mengatur berbagai aktivitas sel, termasuk ekspresi gen dan pembelahan sel."
  },

  cytoplasm: {
    name: "Cytoplasm — Sitoplasma",
    emoji: "💧",
    function: "Menjadi tempat berbagai proses kimia berlangsung.",
    detail: "Sitoplasma mencakup sitosol dan berbagai struktur yang berada di antara membran sel dan inti sel."
  },

  mitochondria: {
    name: "Mitochondria — Mitokondria",
    emoji: "⚡",
    function: "Menghasilkan sebagian besar ATP melalui respirasi seluler.",
    detail: "Mitokondria merupakan organel penting dalam proses penyediaan energi yang dapat digunakan sel."
  },

  ribosome: {
    name: "Ribosome — Ribosom",
    emoji: "🔬",
    function: "Tempat berlangsungnya sintesis protein.",
    detail: "Ribosom menerjemahkan informasi dari mRNA untuk menyusun rantai asam amino menjadi protein."
  },

  golgi: {
    name: "Golgi Apparatus — Badan Golgi",
    emoji: "📦",
    function: "Memodifikasi, menyortir, dan mengemas protein serta lipid.",
    detail: "Badan Golgi membantu mengirimkan molekul ke lokasi yang tepat di dalam atau di luar sel."
  }
};

const cellButtons = document.querySelectorAll(".cell-button");
const cellInfo = document.getElementById("cellInfo");

cellButtons.forEach(button => {
  button.addEventListener("click", () => {

    const selectedCell = button.dataset.cell;
    const data = cellData[selectedCell];

    if (!data || !cellInfo) return;

    cellInfo.innerHTML = `
      <h3>${data.emoji} ${data.name}</h3>
      <p><strong>MAIN FUNCTION:</strong></p>
      <p>${data.function}</p>
      <p><strong>LEARN MORE:</strong></p>
      <p>${data.detail}</p>
    `;

    cellButtons.forEach(item => {
      item.classList.remove("selected-cell");
    });

    button.classList.add("selected-cell");

  });
});