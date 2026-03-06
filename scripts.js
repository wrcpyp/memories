const quizData = [
    { question: "เราเจอกันครั้งแรกที่ไหน?", answer: "โรงเรียน" },
    {
        question: "วันที่เราเริ่มคบกัน(ปี/เดือน/วัน)?",
        answer: "25/05/2020",
    },
    { question: "เราไปกินอะไรด้วยกันครั้งแรก?", answer: "เชสเตอร์" },
    { question: "เราไปเที่ยวต่างจังหวัดที่ไหนด้วยกันครั้งแรก?", answer: "เกาะล้าน" },
];

let current = 0;

// สร้าง Effect หัวใจลอยด้านหลัง
function createFloatingHearts() {
    const container = document.getElementById("bg-hearts");
    for (let i = 0; i < 15; i++) {
        let heart = document.createElement("div");
        heart.innerHTML = "❤";
        heart.classList.add("heart");
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.animationDuration = Math.random() * 5 + 5 + "s";
        heart.style.fontSize = Math.random() * 20 + 10 + "px";
        container.appendChild(heart);
    }
}

function showQuestion() {
    const qEl = document.getElementById("question");
    qEl.style.opacity = 0;

    setTimeout(() => {
        qEl.innerText = quizData[current].question;
        qEl.style.opacity = 1;
    }, 300);

    document.getElementById("answer").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("answer").classList.remove("shake");
}

function checkAnswer() {
    const inputEl = document.getElementById("answer");
    const userAnswer = inputEl.value.trim();
    const correctAnswer = quizData[current].answer;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        // ตอบถูก
        document.getElementById("result").innerHTML =
            `<p class="success-msg">✅ ถูกแล้วน้า! ไปข้อถัดไป~</p>`;

        setTimeout(() => {
            current++;
            if (current < quizData.length) {
                showQuestion();
            } else {
                finishQuiz();
            }
        }, 1200);
    } else {
        // ตอบผิด
        inputEl.classList.add("shake");
        document.getElementById("result").innerHTML =
            `<p style="color: #d63384; font-weight: bold;">😅 หึ? ตอบผิดอีแฟนลองใหม่เลยย!</p>`;

        // ลบ class shake ออกหลังจาก animation จบ เพื่อจะได้กดใหม่ได้อีก
        setTimeout(() => {
            inputEl.classList.remove("shake");
        }, 500);
    }
}

function finishQuiz() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("final-screen").style.display = "block";
    launchConfetti();
}

// ฟังก์ชันยิงดอกไม้ไฟ (Confetti)
function launchConfetti() {
    const colors = ["#ff4d6d", "#ffb3c6", "#ff758f", "#ffffff", "#ffc8dd"];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.classList.add("confetti");
        confetti.style.left = Math.random() * 100 + "vw";
        confetti.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = Math.random() * 2 + 2 + "s";
        confetti.style.width = Math.random() * 10 + 5 + "px";
        confetti.style.height = Math.random() * 10 + 5 + "px";
        document.body.appendChild(confetti);

        // ลบ confetti ทิ้งหลังจาก animation จบ
        setTimeout(() => {
            confetti.remove();
        }, 4000);
    }
}

// Initialize
createFloatingHearts();
showQuestion();
