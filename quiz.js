
document.addEventListener("DOMContentLoaded", () => {
  const questions = [
    {
      question: "Who discovered the cell in 1665?",
      options: ["Charles Darwin", "Robert Hooke", "Gregor Mendel", "Louis Pasteur"],
      answer: "Robert Hooke",
      explanation: "Robert Hooke observed cork and introduced the term cell in 1665."
    },
    {
      question: "Which organelle produces most of the cell's ATP?",
      options: ["Nucleus", "Ribosome", "Mitochondria", "Golgi apparatus"],
      answer: "Mitochondria",
      explanation: "Mitochondria are the main site of cellular respiration."
    },
    {
      question: "What is the basic unit of life?",
      options: ["Organ", "Cell", "Tissue", "Atom"],
      answer: "Cell",
      explanation: "The cell is the basic structural and functional unit of life."
    },
    {
      question: "Which part controls cell activities?",
      options: ["Nucleus", "Cell wall", "Vacuole", "Cytoplasm"],
      answer: "Nucleus",
      explanation: "The nucleus contains DNA and helps control cell activities."
    },
    {
      question: "Which blood cells carry oxygen?",
      options: ["White blood cells", "Platelets", "Red blood cells", "Plasma"],
      answer: "Red blood cells",
      explanation: "Red blood cells contain hemoglobin, which carries oxygen."
    },
    {
      question: "What is the largest organ of the human body?",
      options: ["Heart", "Skin", "Liver", "Brain"],
      answer: "Skin",
      explanation: "The skin is the largest organ of the human body."
    },
    {
      question: "Which molecule stores genetic information?",
      options: ["Glucose", "DNA", "Water", "ATP"],
      answer: "DNA",
      explanation: "DNA stores hereditary information in living organisms."
    },
    {
      question: "What is the function of ribosomes?",
      options: ["Protein synthesis", "Energy storage", "Photosynthesis", "Digestion"],
      answer: "Protein synthesis",
      explanation: "Ribosomes are responsible for making proteins."
    },
    {
      question: "Which organ pumps blood throughout the body?",
      options: ["Lungs", "Kidneys", "Heart", "Stomach"],
      answer: "Heart",
      explanation: "The heart pumps blood through the circulatory system."
    },
    {
      question: "What is the process plants use to make food?",
      options: ["Respiration", "Photosynthesis", "Digestion", "Fermentation"],
      answer: "Photosynthesis",
      explanation: "Plants use light energy, water, and carbon dioxide to produce glucose."
    }
  ];

  const quizContainer = document.querySelector("#quizContainer");
  if (!quizContainer) {
    console.warn("Quiz container #quizContainer was not found.");
    return;
  }

  let currentQuestion = 0;
  let score = 0;
  let answered = false;

  quizContainer.innerHTML = `
    <div class="quiz-progress">
      <p id="quizProgress">Question 1 of ${questions.length}</p>
      <div class="quiz-progress-bar">
        <div id="quizProgressFill"></div>
      </div>
    </div>
    <h2 id="questionText"></h2>
    <div id="answerOptions"></div>
    <div id="quizFeedback" aria-live="polite"></div>
    <button id="nextQuestion" type="button" disabled>Next Question →</button>
    <p id="quizScore">Score: 0</p>
  `;

  const questionText = quizContainer.querySelector("#questionText");
  const answerOptions = quizContainer.querySelector("#answerOptions");
  const feedback = quizContainer.querySelector("#quizFeedback");
  const nextButton = quizContainer.querySelector("#nextQuestion");
  const progressText = quizContainer.querySelector("#quizProgress");
  const progressFill = quizContainer.querySelector("#quizProgressFill");
  const scoreText = quizContainer.querySelector("#quizScore");

  function showQuestion() {
    answered = false;
    const q = questions[currentQuestion];

    questionText.textContent = q.question;
    progressText.textContent =
      `Question ${currentQuestion + 1} of ${questions.length}`;

    progressFill.style.width =
      `${(currentQuestion / questions.length) * 100}%`;

    feedback.textContent = "";
    nextButton.disabled = true;
    nextButton.textContent =
      currentQuestion === questions.length - 1
        ? "See Results →"
        : "Next Question →";

    answerOptions.innerHTML = "";

    q.options.forEach(option => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;

      button.addEventListener("click", () => checkAnswer(button, option));
      answerOptions.appendChild(button);
    });
  }

  function checkAnswer(button, selected) {
    if (answered) return;
    answered = true;

    const q = questions[currentQuestion];
    const correct = selected === q.answer;

    if (correct) {
      score++;
      button.classList.add("correct");
      feedback.textContent = "Correct! 🎉 " + q.explanation;
    } else {
      button.classList.add("incorrect");
      feedback.textContent =
        `Not quite! The correct answer is ${q.answer}. ${q.explanation}`;
    }

    answerOptions.querySelectorAll("button").forEach(option => {
      option.disabled = true;

      if (option.textContent === q.answer) {
        option.classList.add("correct");
      }
    });

    scoreText.textContent = `Score: ${score}`;
    nextButton.disabled = false;
  }

  function showResults() {
    const percentage = Math.round((score / questions.length) * 100);

    quizContainer.innerHTML = `
      <div class="quiz-result">
        <h2>Quiz Completed! 🎊</h2>
        <p>Your Score</p>
        <h1>${score} / ${questions.length}</h1>
        <h2>${percentage}%</h2>
        <p>
          ${
            percentage >= 80
              ? "Excellent work! You're a biology star! 🌟"
              : percentage >= 60
              ? "Great effort! Keep learning! 💛"
              : "Keep practicing! Every scientist starts somewhere! 🧬"
          }
        </p>
        <button id="restartQuiz" type="button">Try Again ↻</button>
      </div>
    `;

    quizContainer.querySelector("#restartQuiz")
      .addEventListener("click", () => {
        currentQuestion = 0;
        score = 0;
        showQuestion();
      });
  }

  nextButton.addEventListener("click", () => {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  });

  showQuestion();
});
