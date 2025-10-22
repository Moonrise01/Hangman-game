let secretWord = "";
let mistakes = 0;
let words = [];
let language;
let difficulty;
let nbLettersGuessed = [];


/*The function change the page from start one to the game and store the difficulty and language*/
function startGame(){
    language = document.getElementById('langue').value;
    difficulty = document.getElementById('difficulty').value;

    sessionStorage.setItem('language', language);
    sessionStorage.setItem('difficulty', difficulty);

    window.location.href = './game/game.html';
}


/*When the page change, it set which file must be use for the word and then start the game*/
window.addEventListener('DOMContentLoaded', function() {
    const page = window.location.pathname.split("/").pop();
    if (page === "game.html") {
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


        const guessInput = document.getElementById('guessInput');
        if (guessInput) {
            guessInput.addEventListener('keypress', function(event) {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    getGuess();
                }
            });
        }
    }

    if (page === "end.html"){
        let statut = sessionStorage.getItem('statut');
        if (statut === "win"){
            document.getElementById('statut').textContent = 'You win!';
        }else if (statut === "fail"){
            document.getElementById('statut').textContent = 'You lose!';
            document.getElementById('secretWord').textContent = sessionStorage.getItem('secretWord');

        }
    }
});


/*The function load the word and store it in secretWord*/
async function initGame(path){
    words = await loadWords(path);
    secretWord = randomWord(words).toUpperCase();
    setupWordDisplay();

}


/*The function load the word from the file*/
async function loadWords(path) {
    const res =await fetch(path, { cache: 'no-store' });
    if (!res.ok) console.error('No such words found!');

    const text = await res.text();
    return text
        .split(/\r?\n/)
        .map(w => w.trim())
        .filter(Boolean);
}


/*The function return a random word from the array*/
function randomWord(arr){
    return arr[Math.floor(Math.random() * arr.length)];
}


/*The function display the word in the page*/
function setupWordDisplay() {
    let container = document.getElementById('guessWord');

    for (let i = 0; i < secretWord.length; i++) {
        let letterSpan = document.createElement('span');

        if (i === 0 ){
            letterSpan.textContent = secretWord[i].toUpperCase();
            nbLettersGuessed.push(secretWord[i].toUpperCase());
        }else{
            letterSpan.textContent = ' ';
        }

        letterSpan.classList.add('letter');
        container.appendChild(letterSpan);
    }
}


/*The function check if the guess is correct and display the result*/
function getGuess() {
    let inputGuess = document.getElementById('guessInput');
    let input = inputGuess.value.toUpperCase();

    if (input.length === 1 && input.match(/[A-Z]/)) {
        checkGuess(input);
    }

    inputGuess.value = '';

    if (mistakes === 10) {
        endGame( "fail")
    }else if (nbLettersGuessed.join('') === secretWord){
        endGame("win");
    }
}


/*The function check if the guess is correct, if it is, display the result. If not, display the gallows*/
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
            nbLettersGuessed[i] = input;
        }
    }

    if (mot) return;

    mistakes++;
    drawing();
}


/*The function end the game and display the result*/
function endGame(statut){
    sessionStorage.setItem('statut', statut);
    sessionStorage.setItem('secretWord', secretWord);
    window.location.href = './end.html';
}


/*The function display the gallows*/
function drawing(){
    let arr = [null, drawGallows1, drawGallows2, drawGallows3, drawGallows4,
        drawHead, drawBody, drawLeftArm, drawRightArm, drawLeftLeg, drawRightLeg];

    if (mistakes > 0 && mistakes <= 10) {
        arr[mistakes]();
    }
}


/*The function reset the game*/
function reset(){
    window.location.href = '../index.html';
    sessionStorage.clear();
}


/*The function start over the game*/
function playAgain(){
    window.location.href = './game.html';

}

