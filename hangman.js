let secretWord = "";
let mistakes = 0;
let words = [];

initGame()

async function initGame(){
    words = await loadWords('words.txt');
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

    checkGuess(input);

    inputGuess.value = '';
}

function checkGuess(input) {
    let mot = false;

    for (let i = 0; i < secretWord.length; i++) {
        let letter = secretWord[i];
        if ("éèê".includes(letter)) letter = "e";
        if ("ü".includes(letter)) letter = "u";
        if ("ä".includes(letter)) letter = "a";
        if ("îï".includes(letter)) letter = "i";

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

function letterNotValidBox(){
    let letterNotValid = document.getElementById('letterNotValid');
    let letterSpan = document.createElement('span');

    letterSpan.textContent = letterNotValid.toUpperCase();
    letterNotValid.appendChild(letterSpan);
}

function drawing(){
    let arr = [null, drawGallows1, drawGallows2, drawGallows3, drawGallows4,
        drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

    if (mistakes > 0 && mistakes <= 10) {
        arr[mistakes]();
    }
}

