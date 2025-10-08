let secretWord = "";
let mistakes = 0;
let words = [];
let language;
let difficulty;

function startGame(){
    language = document.getElementById('langue').value;
    difficulty = document.getElementById('difficulty').value;

    sessionStorage.setItem('language', language);
    sessionStorage.setItem('difficulty', difficulty);

    window.location.href = './game/index.html';
}

window.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('guessWord')) {
        language = sessionStorage.getItem('language');
        difficulty = sessionStorage.getItem('difficulty');

        let path = "";
        if (language === "french"){
            switch (difficulty){
                case "easy": path = "./french/easy.txt"; break;
                case "medium": path = "./french/medium.txt"; break;
                case "hard": path = "./french/hard.txt"; break;
            }
        }else if (language === "english"){
            switch (difficulty){
                case "easy": path = "./english/easy.txt"; break;
                case "medium": path = "./english/medium.txt"; break;
                case "hard": path = "./english/hard.txt"; break;
            }
        }

        initGame(path);
    }
});

async function initGame(path){
    words = await loadWords(path);
    secretWord = randomWord(words).toUpperCase();
    setupWordDisplay();

}

async function loadWords(path) {
    const res =await fetch(path, { cache: 'no-store' });
    if (!res.ok) console.error('No such words found!');

    const text = await res.text();
    return text
        .split(/\r?\n/)
        .map(w => w.trim())
        .filter(Boolean);
}

function randomWord(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}

function setupWordDisplay() {
    let container = document.getElementById('guessWord');

    for (let i = 0; i < secretWord.length; i++) {
        let letterSpan = document.createElement('span');

        if (i === 0 ){
            letterSpan.textContent = secretWord[i].toUpperCase();
        }else{
            letterSpan.textContent = ' ';
        }

        letterSpan.classList.add('letter');
        container.appendChild(letterSpan);
    }
}

function getGuess() {
    let inputGuess = document.getElementById('guessInput');
    let input = inputGuess.value.toUpperCase();

    if (input.length === 1 && input.match(/[A-Z]/)) {
        checkGuess(input);
    }

    inputGuess.value = '';
}

function checkGuess(input) {
    let mot = false;

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord[i];
        if ("éèê".toUpperCase().includes(letter)) letter = "E";
        if ("ü".toUpperCase().includes(letter)) letter = "U";
        if ("ä".toUpperCase().includes(letter)) letter = "A";
        if ("îï".toUpperCase().includes(letter)) letter = "I";

        if (input === letter) {
            let letterSpan = document.getElementsByClassName('letter')[i];
            letterSpan.textContent = input;
            mot = true;
        }
    }

    if (mot) return;

    mistakes++;
    drawing();
}

function drawing(){
    let arr = [null, drawGallows1, drawGallows2, drawGallows3, drawGallows4,
        drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

    if (mistakes > 0 && mistakes <= 10) {
        arr[mistakes]();
    }
}
