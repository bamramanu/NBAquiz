
const quiz = [
    {
        question: "4× NBA Champion, played for the Heat and Lakers, known as 'King James'",
        answers: ["LeBron James", "Kevin Durant", "Kobe Bryant", "Stephen Curry"],
        correct: 0
    },
    {
        question: "Known for 3-point shooting, plays for Golden State, 2× MVP",
        answers: ["Klay Thompson", "Stephen Curry", "Damian Lillard", "James Harden"],
        correct: 1
    },
    {
        question: "Chicago Bulls legend, 6× champion, often called the GOAT",
        answers: ["Magic Johnson", "Kobe Bryant", "Michael Jordan", "Larry Bird"],
        correct: 2
    },
    {
        question: "Greek player known as the 'Greek Freak', plays for Milwaukee",
        answers: ["Nikola Jokic", "Giannis Antetokounmpo", "Joel Embiid", "Luka Doncic"],
        correct: 1
    },
    {
        question: "Denver Nuggets star, MVP, known for elite passing as a center",
        answers: ["Nikola Jokic", "Anthony Davis", "Shaquille O'Neal", "Karl-Anthony Towns"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;
let quizStarted = false;

function loadQuestion() {
    answered = false;

    document.getElementById("feedback").innerText = "";

    const q = quiz[currentQuestion];
    document.getElementById("question").innerText = q.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");

        button.onclick = () => selectAnswer(index, button);

        answersDiv.appendChild(button);
    });
}

function resetToStartScreen() {
    document.querySelector("header").style.display = "block";
    document.getElementById("question").innerText = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("score").innerText = "";
    document.getElementById("startBtn").style.display = "inline-block";
    document.getElementById("nextBtn").style.display = "none";
}

function startQuiz() {
    quizStarted = true;
    document.querySelector("header").style.display = "block";
    document.getElementById("startBtn").style.display = "none";
    document.getElementById("nextBtn").style.display = "inline-block";
    document.getElementById("score").innerText = "";
    loadQuestion();
}

function selectAnswer(index, button) {
    if (answered) return;
    answered = true;

    const buttons = document.querySelectorAll(".btn");
    const correctIndex = quiz[currentQuestion].correct;
    const feedback = document.getElementById("feedback");

    buttons.forEach((btn, i) => {
        if (i === correctIndex) {
            btn.style.backgroundColor = "green";
            btn.style.color = "white";
        } else if (i === index) {
            btn.style.backgroundColor = "red";
            btn.style.color = "white";
        }
        btn.disabled = true;
    });

    if (index === correctIndex) {
        score++;
        feedback.innerText = "✅ Correct!";
        feedback.className = "correct";
    } else {
        feedback.innerText = "❌ Wrong!";
        feedback.className = "wrong";
    }
}

function nextQuestion() {
    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < quiz.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    quizStarted = false;
    document.querySelector("header").style.display = "none";
    document.getElementById("question").innerText = "Quiz Complete!";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("feedback").innerText = "";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("startBtn").style.display = "none";

    document.getElementById("score").innerHTML = `
        Your Score: ${score} / ${quiz.length} <br><br>
        <button onclick="restartQuiz()" class="btn">Restart Quiz</button>
    `;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    startQuiz();
}

// Show start button first; quiz begins on user click.
resetToStartScreen();
