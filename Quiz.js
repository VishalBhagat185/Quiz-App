const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Lion", correct: false },
    ],
  },
  {
    question: "Which is the cleanest country?",
    answers: [
      { text: "China", correct: false },
      { text: "Russia", correct: false },
      { text: "Switzerland", correct: true },
      { text: "India", correct: false },
    ],
  },
  {
    question: "Which country is known for religious diversity?",
    answers: [
      { text: "China", correct: false },
      { text: "Russia", correct: false },
      { text: "India", correct: true },
      { text: "Pakistan", correct: false },
    ],
  },
  {
    question: "Which country has the best food?",
    answers: [
      { text: "China", correct: true },
      { text: "Russia", correct: false },
      { text: "India", correct: true },
      { text: "Pakistan", correct: false },
    ],
  },
  {
    question: "Which is the best country in the world?",
    answers: [
      { text: "China", correct: false },
      { text: "Russia", correct: false },
      { text: "India", correct: false },
      { text: "Switzerland", correct: true },
    ],
  },
];

const questionElem = document.getElementById("question");
const answerContainer = document.getElementById("ansQuestion");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let score = 0;

function startQuiz() {
  currentIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();

  const currentQuestion = questions[currentIndex];
  questionElem.innerHTML = `${currentIndex + 1}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerContainer.appendChild(button);
  });
}

function resetState() {
  nextBtn.style.display = "none";
  while (answerContainer.firstChild) {
    answerContainer.removeChild(answerContainer.firstChild);
  }
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = "green";
    score++;
  } else {
    button.style.backgroundColor = "red";
  }

  Array.from(answerContainer.children).forEach((btn) => {
    btn.disabled = true;
    if (questions[currentIndex].answers.find(a => a.text === btn.innerHTML).correct) {
      btn.style.backgroundColor = "green";
    }
  });

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElem.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextBtn.innerHTML = "Play Again";
  nextBtn.style.display = "block";
  nextBtn.addEventListener("click", startQuiz);
}

startQuiz();
