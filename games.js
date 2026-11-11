
document.addEventListener("DOMContentLoaded", () => {
  const gameContainer = document.querySelector("#gamesContainer");

  if (!gameContainer) {
    console.warn("Games container #gamesContainer was not found.");
    return;
  }

  const games = [
    {
      question: "Mitochondria",
      answer: "Energy production",
      options: [
        "Energy production",
        "Protein synthesis",
        "Controls cell activities"
      ]
    },
    {
      question: "Nucleus",
      answer: "Controls cell activities",
      options: [
        "Stores water",
        "Controls cell activities",
        "Produces oxygen"
      ]
    },
    {
      question: "Ribosome",
      answer: "Protein synthesis",
      options: [
        "Protein synthesis",
        "Energy production",
        "Stores DNA"
      ]
    },
    {
      question: "Cell membrane",
      answer: "Controls what enters and leaves",
      options: [
        "Makes glucose",
        "Controls what enters and leaves",
        "Stores genetic information"
      ]
    },
    {
      question: "Chloroplast",
      answer: "Photosynthesis",
      options: [
        "Photosynthesis",
        "Cellular respiration",
        "Protein synthesis"
      ]
    }
  ];

  let current = 0;
  let score = 0;
  let answered = false;

  gameContainer.innerHTML = `
    <div class="game-header">
      <h2>Match the Organelle! 🧬</h2>
      <p>Choose the correct function for each cell part.</p>
      <p id="gameProgress"></p>
    </div>
    <div id="gameQuestion"></div>
    <div id="gameOptions"></div>
    <p id="gameFeedback" aria-live="polite"></p>
    <button id="gameNext" type="button" disabled>Next →</button>
    <p id="gameScore">Score: 0</p>
  `;

  const question = gameContainer.querySelector("#gameQuestion");
  const options = gameContainer.querySelector("#gameOptions");
  const feedback = gameContainer.querySelector("#gameFeedback");
  const progress = gameContainer.querySelector("#gameProgress");
  const next = gameContainer.querySelector("#gameNext");
  const scoreDisplay = gameContainer.querySelector("#gameScore");

  function renderGame() {
    answered = false;
    const item = games[current];

    progress.textContent = `Round ${current + 1} of ${games.length}`;
    question.innerHTML = `<h3>${item.question}</h3>`;
    options.innerHTML = "";
    feedback.textContent = "";
    next.disabled = true;

    item.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "game-option";
      button.textContent = option;

      button.addEventListener("click", () => {
        if (answered) return;
        answered = true;

        const correct = option === item.answer;

        if (correct) {
          score++;
          button.classList.add("correct");
          feedback.textContent = "Correct! Well done! 🌟";
        } else {
          button.classList.add("incorrect");
          feedback.textContent =
            `Oops! The correct answer is: ${item.answer}`;
        }

        options.querySelectorAll("button").forEach(btn => {
          btn.disabled = true;

          if (btn.textContent === item.answer) {
            btn.classList.add("correct");
          }
        });

        scoreDisplay.textContent = `Score: ${score}`;
        next.disabled = false;
      });

      options.appendChild(button);
    });

    next.textContent =
      current === games.length - 1 ? "See Results →" : "Next →";
  }

  next.addEventListener("click", () => {
    if (!answered) return;

    current++;

    if (current < games.length) {
      renderGame();
    } else {
      showGameResult();
    }
  });

  function showGameResult() {
    gameContainer.innerHTML = `
      <div class="game-result">
        <h2>Game Completed! 🎉</h2>
        <h1>${score} / ${games.length}</h1>
        <p>
          ${
            score === games.length
              ? "Perfect! You know your organelles! 🧬"
              : "Good job! Keep practicing your biology!"
          }
        </p>
        <button id="playAgain" type="button">Play Again ↻</button>
      </div>
    `;

    gameContainer.querySelector("#playAgain")
      .addEventListener("click", () => {
        current = 0;
        score = 0;
        renderGame();
      });
  }

  renderGame();
});
