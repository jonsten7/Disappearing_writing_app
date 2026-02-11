const textarea = document.getElementById("writer");
const timerDisplay = document.getElementById("timer");
const wordCountDisplay = document.getElementById("word-count");
const speedDisplay = document.getElementById("speed");

let timeout;
let countdown;
const delay = 5000;
let timeLeft = 5;

let keystrokes = [];

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

            // Reset speed after full vanish
            keystrokes = [];
            speedDisplay.textContent = "0";
            return;
        }

        text = text.slice(0, -1);
        textarea.value = text;
        updateWordCount();

    }, 30);
}

function updateWordCount() {
    const words = textarea.value
        .trim()
        .split(/\s+/)
        .filter(word => word.length > 0);

    wordCountDisplay.textContent = words.length;
}


function updateSpeed() {
    const now = Date.now();

    // Remove keystrokes older than 10 seconds
    keystrokes = keystrokes.filter(time => now - time <= 10000);

    const charsLast10Sec = keystrokes.length;
    const words = charsLast10Sec / 5;
    const wpm = Math.round(words * 6);

    speedDisplay.textContent = wpm;
}

textarea.addEventListener("input", () => {
    clearTimeout(timeout);
    clearInterval(countdown);

    updateWordCount();

    // Track typing speed
    keystrokes.push(Date.now());
    updateSpeed();

    startCountdown();
});
