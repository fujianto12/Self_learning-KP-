const questions = [
    { question: "Berapa hasil dari 2 + 2?", answers: ["3", "4", "5", "6"], correct: 1 },
    { question: "Apa ibu kota Prancis?", answers: ["Berlin", "Madrid", "Paris", "Lisbon"], correct: 2 },
    { question: "Planet terbesar di tata surya?", answers: ["Mars", "Bumi", "Jupiter", "Venus"], correct: 2 },
    { question: "Siapa penulis 'Hamlet'?", answers: ["Shakespeare", "Hemingway", "Tolkien", "Austen"], correct: 0 }
];

const startButton = document.getElementById("start-btn");
const quizContainer = document.querySelector(".quiz");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timer;


startButton.addEventListener("click", () => {
    document.getElementById("confirm-modal").style.display = "flex";
});

document.getElementById("yes-btn").addEventListener("click", () => {
    document.getElementById("confirm-modal").style.display = "none";
    startQuiz();
});

document.getElementById("no-btn").addEventListener("click", () => {
    window.history.back();
});

nextButton.addEventListener("click", handleNextButton);

function startQuiz() {
    startButton.style.display = "none";
    quizContainer.style.display = "block";
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 100;
    nextButton.innerHTML = "Selanjutnya";
    nextButton.style.display = "none";
    startTimer();
    showQuestion();
}

function startTimer() {
    updateTimerDisplay();
    timer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            timerElement.innerHTML = "Waktu habis! Kuis selesai!";
            showScore();
        }
    }, 1000);
}

function updateTimerDisplay() {
    if (timeLeft >= 3600) {
        let jam = Math.floor(timeLeft / 3600);
        let menit = Math.floor((timeLeft % 3600) / 60);
        let detik = timeLeft % 60;
        timerElement.innerHTML = `Sisa Waktu: ${jam}j ${menit}m ${detik}d`;
    } else if (timeLeft >= 60) {
        let menit = Math.floor(timeLeft / 60);
        let detik = timeLeft % 60;
        timerElement.innerHTML = `Sisa Waktu: ${menit}m ${detik}d`;
    } else {
        timerElement.innerHTML = `Sisa Waktu: ${timeLeft}d`;
    }
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerHTML = answer;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, index));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(button, index) {
    const correctIndex = questions[currentQuestionIndex].correct;
    if (index === correctIndex) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach((btn, idx) => {
        if (idx === correctIndex) {
            btn.classList.add("correct");
        }
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    clearInterval(timer);
    resetState();
    questionElement.innerHTML = `Skor Anda: ${score} dari ${questions.length}! 🎉`;
    nextButton.innerHTML = "Main Lagi";
    nextButton.style.display = "block";
}

function handleNextButton() {
    if (nextButton.innerHTML === "Main Lagi") {
        resetToStart();
    } else {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showScore();
        }
    }
}

function resetToStart() {
    quizContainer.style.display = "none";
    startButton.style.display = "block";
    timerElement.innerHTML = "";
    nextButton.innerHTML = "Selanjutnya"; 
}

