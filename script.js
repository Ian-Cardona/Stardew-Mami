let plantsPlanted = 0;
let currentDialog = 0;
let isTyping = false;
let backgroundMusic = null;

const dialogs = [
    {
        speaker: "Papi Ian",
        text: "Welcome to our little garden! I'm so excited to celebrate with you. Click on the brown spots to plant some seeds!"
    },
    {
        speaker: "Papi Ian", 
        text: "Great job! You're doing amazing! Each seed you plant represents how proud I am of your achievements."
    },
    {
        speaker: "Papi Ian",
        text: "Look how beautiful our garden is becoming! Just like how you've grown and accomplished so much."
    },
    {
        speaker: "Papi Ian",
        text: "Almost there! You're absolutely incredible, and I'm so lucky to witness your success."
    },
    {
        speaker: "Papi Ian",
        text: "WOW! You did it! 🎉 Congratulations on everything you've achieved! You're absolutely amazing and I'm so proud of you!"
    }
];

function startGame() {
    // playSound('background-music');
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('gameContainer').style.display = 'flex';
    showDialog();
}

function plantSeed(spotIndex) {
    if (isTyping) return;
    
    const spots = document.querySelectorAll('.plant-spot');
    const spot = spots[spotIndex];
    
    if (spot.classList.contains('planted')) return;
    
    spot.classList.add('planted');
    plantsPlanted++;
    
    // Play planting sound effect (would be actual audio in production)
    playSound('plant');
    
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
            currentDialog = 4;
            showDialog();
        }, 1000);
    }
}

function updateProgress() {
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    const percentage = (plantsPlanted / 5) * 100;
    progressFill.style.width = percentage + '%';
    progressText.textContent = `${plantsPlanted}/5 Plants`;
}

function showDialog() {
    const dialog = dialogs[currentDialog];
    const dialogBox = document.getElementById('dialogBox');
    const dialogHeader = document.getElementById('dialogHeader');
    const dialogText = document.getElementById('dialogText');
    
    dialogHeader.textContent = dialog.speaker;
    dialogBox.classList.add('show');
    
    typeWriter(dialog.text, dialogText);
}

function typeWriter(text, element) {
    isTyping = true;
    element.textContent = '';
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
    document.getElementById('dialogBox').classList.remove('show');
}

function showCelebration() {
    const celebration = document.getElementById('celebration');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 3 + 's';
            celebration.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}

function playSound(type) {
    const audio = new Audio(`assets/audio/${type}.wav`);
    audio.play().catch(e => console.log('Audio play failed:', e));
    
    if (type === 'plant') {
        console.log('Playing plant sound');
    }
}

function initBackgroundMusic() {
    backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5;
        backgroundMusic.muted = false;
        
        backgroundMusic.play().catch(e => {
            console.log('Autoplay blocked, will start on user interaction');
            document.addEventListener('click', function playOnFirstClick() {
                backgroundMusic.play();
                document.removeEventListener('click', playOnFirstClick);
            }, { once: true });
        });
    }
}

window.addEventListener('load', () => {
    initBackgroundMusic();
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
});