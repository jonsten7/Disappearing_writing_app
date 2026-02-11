const textarea = document.getElementById("writer");
const timerDisplay = document.getElementById("timer");
const wordCountDisplay = document.getElementById("word-count");

let timeout;
let countdown;
const delay = 5000;
let timeLeft = 5;

function startCountdown() {
    timeLeft = 5;
    timerDisplay.textContent = timeLeft;

    countdown = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            vanishText();
        }
    }, 1000);
}

function vanishText() {
    let text = textarea.value;
    let vanishInterval = setInterval(() => {
        if (text.length === 0) {
            clearInterval(vanishInterval);
            return;
        }
        text = text.slice(0, -1);
        textarea.value = text;
        updateWordCount();
    }, 30);
}

function updateWordCount() {
    const words = textarea.value.trim().split(/\s+/).filter(word => word.length > 0);
    wordCountDisplay.textContent = words.length;
}

textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    clearInterval(countdown);

    updateWordCount();
    startCountdown();
});
