let plantsPlanted = 0;
let currentDialog = 0;
let isTyping = false;
let backgroundMusic = null;

const dialogs = [
  {
    speaker: "Ian",
    text: "Welcome to our little garden, my love! 🌱 Today isn’t just your birthday—it’s a celebration of *you*: your late-night study sessions, your unwavering heart, and the promise you’ll soon make as an incredible nurse. Plant seeds wherever you feel called… just as you planted joy in my life the day we met. 🎉",
  },
  {
    speaker: "Ian",
    text: "Every seed you touch blooms with pride—*my* pride in *you*. The way you care for others, your resilience, and your gentle strength… it’s truly inspiring. 💉",
  },
  {
    speaker: "Ian",
    text: "I am endlessly amazed and so proud of all you’ve accomplished these past few years. Here’s to many more years together, my lovely! 😚",
  },
  {
    speaker: "Ian",
    text: "Look at what you’ve grown! Each flower is a testament to your strength, your kindness, and your ability to balance caring for patients and putting up with my antics. The garden shines because you do. ✨",
  },
  {
    speaker: "Ian",
    text: "One more step, Nurse. You’ve turned every challenge into a victory—even when life gave you ‘difficult veins,’ you made it work. This garden will always remind me: with you, beautiful things grow. (And yes, I mean the flowers… ) 🌷",
  },
  {
    speaker: "Ian",
    text: "**YOU DID IT!** 🎉✨ Every petal here celebrates *you*—the Nurse who stole my heart long before she’ll steal hospital supplies (kidding… mostly). Happy birthday, my nurse. No oath could ever compare to the honor of loving you. 👩🏼‍⚕️⚕️",
  },
];

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameContainer").style.display = "flex";
  showDialog();
}

function plantSeed(spotIndex) {
  if (isTyping) return;

  const spots = document.querySelectorAll(".plant-spot");
  const spot = spots[spotIndex];

  if (spot.classList.contains("planted")) return;

  spot.classList.add("planted");
  plantsPlanted++;

  playSound("plant");

  updateProgress();

  if (plantsPlanted <= 4) {
    setTimeout(() => {
      currentDialog = plantsPlanted;
      showDialog();
    }, 500);
  }

  if (plantsPlanted === 5) {
    setTimeout(() => {
      showCelebration();
      currentDialog = 5;
      showDialog();
    }, 1000);
  }
}

function updateProgress() {
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");

  const percentage = (plantsPlanted / 5) * 100;
  progressFill.style.width = percentage + "%";
  progressText.textContent = `${plantsPlanted}/5 Plants`;
}

function showDialog() {
  const dialog = dialogs[currentDialog];
  const dialogBox = document.getElementById("dialogBox");
  const dialogHeader = document.getElementById("dialogHeader");
  const dialogText = document.getElementById("dialogText");

  dialogHeader.textContent = dialog.speaker;
  dialogBox.classList.add("show");

  typeWriter(dialog.text, dialogText);
}

function typeWriter(text, element) {
  isTyping = true;
  element.textContent = "";
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, 50);
    } else {
      isTyping = false;
    }
  }

  type();
}

function nextDialog() {
  if (isTyping) return;
  document.getElementById("dialogBox").classList.remove("show");
}

function showCelebration() {
  playSound("ending");
  playSound("fireworks");
  const celebration = document.getElementById("celebration");

  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement("div");
      confetti.className = "confetti";
      confetti.style.left = Math.random() * 100 + "%";
      confetti.style.animationDelay = Math.random() * 3 + "s";
      celebration.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }, i * 100);
  }
}

function playSound(type) {
  const audio = new Audio(`assets/audio/${type}.wav`);
  audio.play().catch((e) => console.log("Audio play failed:", e));
}

function initBackgroundMusic() {
  backgroundMusic = document.getElementById("backgroundMusic");
  if (backgroundMusic) {
    backgroundMusic.volume = 0.4;
    backgroundMusic.muted = false;

    backgroundMusic.play().catch((e) => {
      console.log("Autoplay blocked, will start on user interaction");
      document.addEventListener(
        "click",
        function playOnFirstClick() {
          backgroundMusic.play();
          document.removeEventListener("click", playOnFirstClick);
        },
        { once: true }
      );
    });
  }
}

window.addEventListener("load", () => {
  initBackgroundMusic();
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );
});
