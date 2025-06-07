// Typing animation for greeting
const greetingText = "Hi Jaya! ❤️";
let i = 0;
const greetingElement = document.getElementById("greeting");

function typeGreeting() {
    if (i < greetingText.length) {
        greetingElement.innerHTML += greetingText.charAt(i);
        i++;
        setTimeout(typeGreeting, 150);
    }
}

typeGreeting();

// Page messages
const messages = [
    "You are one of the sweetest people I’ve met. 🌸",
    "Every time we talk, you make my day brighter! ☀️",
    "This small website is just to make you smile today. 😊",
    "Ready for the final surprise? Click next! 🎁"
];

let pageIndex = 0;
const pageMessage = document.getElementById("pageMessage");
const nextButton = document.getElementById("nextButton");
const finalMessage = document.getElementById("finalMessage");

// Play music on button click
const musicButton = document.getElementById("musicButton");
const bgMusic = document.getElementById("bgMusic");

musicButton.addEventListener("click", () => {
    bgMusic.play();
    musicButton.style.display = "none";
});

// Next message button
nextButton.addEventListener("click", () => {
    if (pageIndex < messages.length) {
        pageMessage.innerHTML = messages[pageIndex];
        pageIndex++;
    } else {
        pageMessage.classList.add("hidden");
        nextButton.classList.add("hidden");
        finalMessage.classList.remove("hidden");
        finalMessage.classList.add("show");
        launchConfetti();
    }
});

// Simple confetti
function launchConfetti() {
    const confettiCanvas = document.getElementById("confetti");
    const ctx = confettiCanvas.getContext("2d");

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const confettiCount = 150;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * confettiCanvas.width,
            y: Math.random() * confettiCanvas.height - confettiCanvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            tilt: Math.floor(Math.random() * 10) - 5,
            tiltAngleIncremental: Math.random() * 0.07 + 0.05,
            tiltAngle: 0
        });
    }

    function draw() {
        ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confetti.forEach((confetto, index) => {
            ctx.beginPath();
            ctx.lineWidth = confetto.r;
            ctx.strokeStyle = confetto.color;
            ctx.moveTo(confetto.x + confetto.tilt + confetto.r / 2, confetto.y);
            ctx.lineTo(confetto.x + confetto.tilt, confetto.y + confetto.tilt + confetto.r / 2);
            ctx.stroke();
        });
        update();
    }

    function update() {
        confetti.forEach((confetto, index) => {
            confetto.tiltAngle += confetto.tiltAngleIncremental;
            confetto.y += (Math.cos(confetto.d) + 3 + confetto.r / 2) / 2;
            confetto.x += Math.sin(confetto.d);
            confetto.tilt = Math.sin(confetto.tiltAngle - index / 3) * 15;

            if (confetto.y > confettiCanvas.height) {
                confetti[index] = {
                    x: Math.random() * confettiCanvas.width,
                    y: -20,
                    r: confetto.r,
                    d: confetto.d,
                    color: confetto.color,
                    tilt: confetto.tilt,
                    tiltAngleIncremental: confetto.tiltAngleIncremental,
                    tiltAngle: confetto.tiltAngle
                };
            }
        });
    }

    (function animateConfetti() {
        requestAnimationFrame(animateConfetti);
        draw();
    })();
}
