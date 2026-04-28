
const quiz = [
    {
        image: "./images/lebron.webp",
        question: "4× NBA Champion, played for the Heat and Lakers, known as 'King James'",
        answers: ["LeBron James", "Kevin Durant", "Kobe Bryant", "Stephen Curry"],
        correct: 0
    },
    {
        image: "./images/rayallen.jpeg",
        question: "One of the greatest shooters ever, Celtics and Heat champion, hit a famous clutch 3 in the 2013 Finals",
        answers: ["Ray Allen", "Reggie Miller", "Klay Thompson", "Steve Nash"],
        correct: 0
    },
    {
        image: "./images/mj.jpeg",
        question: "Chicago Bulls legend, 6× champion, often called the GOAT",
        answers: ["Magic Johnson", "Kobe Bryant", "Michael Jordan", "Larry Bird"],
        correct: 2
    },
    {
        image: "./images/giannis.webp",
        question: "Greek player known as the 'Greek Freak', plays for Milwaukee",
        answers: ["Nikola Jokic", "Giannis Antetokounmpo", "Joel Embiid", "Luka Doncic"],
        correct: 1
    },
    {
        image: "./images/jokic.jpg",
        question: "Denver Nuggets star, MVP, known for elite passing as a center",
        answers: ["Nikola Jokic", "Anthony Davis", "Shaquille O'Neal", "Karl-Anthony Towns"],
        correct: 0
    },
    {
        image: "./images/larybird.jpg",
		question: "Celtics Legend, Best 3-Pointer Shooter of the 1980s, 3x MVP, Former NBA Player, Coach, AND Executive",
		answers: ["Tim Duncan", "Hakeem Olajuwon", "Larry Bird", "Magic Johnson"],
		correct: 2
	},
    {
        image: "./images/klay.webp",
		question: "Top 5 Shooter Of All Time, Scored 60 Points On 11 Dribbles, Cheated on Megan Thee Stallion",
		answers: ["Steph Curry", "Reggie Miller", "Damian Lillard", "Klay Thompson"],
		correct: 3
	},
    {
        image: "./images/stephcurry.webp",
		question: "The Greatest Shooter the world has ever seen, Best Point Guard of Our Generation, 4x NBA Champion",
		answers: ["Magic Johnson", "Steph Curry", "Jason Kidd", "Kyrie Irving"],
		correct: 1
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
    const playerImage = document.getElementById("playerImage");
    if (q.image) {
        playerImage.src = q.image;
        playerImage.alt = `Player image for question ${currentQuestion + 1}`;
        playerImage.style.display = "block";
        playerImage.classList.add("blurred");
    } else {
        playerImage.style.display = "none";
        playerImage.classList.remove("blurred");
    }
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
    const playerImage = document.getElementById("playerImage");
    playerImage.src = "";
    playerImage.style.display = "none";
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
    const playerImage = document.getElementById("playerImage");
    playerImage.classList.remove("blurred");

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
    const playerImage = document.getElementById("playerImage");
    playerImage.src = "";
    playerImage.style.display = "none";
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
