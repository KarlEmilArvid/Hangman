/**
 * TODO:
 * Nedräkning på 1 min
*/

let currentWord = [];
let answerWord = [];
let pastLetters = [];
let lettersReset = '';
let guessesLeft = 5;


const wordArray = ['dog', 'apple', 'laptop', 'croiassant'];
const livesLeft = { 4: 'scaffold', 3: 'head', 2: 'body', 1: 'arms', 0: 'legs'};
const overlayWin = document.querySelector('.overlay-win');
const overlayLose = document.querySelector('.overlay-lose');
const playAgainBtn = document.querySelector('#play-again');
const rematchBtn = document.querySelector('#rematch');
const timerBtn = document.querySelector('#timer-button');

let correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];

//Fokus på input fält
let alwaysFocusedInput = document.getElementById('activeFocus');
alwaysFocusedInput.addEventListener( 'blur',() => {
  setTimeout(() => {
    alwaysFocusedInput.focus();
  }, 0);
});

//BUTTONS
playAgainBtn.addEventListener('click', () => {location.reload()});
rematchBtn.addEventListener('click', () => {location.reload()});

//TIMER
const startingSeconds = 5;
let time = startingSeconds * 1;

const countdownEl = document.getElementById('time-left')

setInterval(updateCountdown, 1000);

function updateCountdown() {
  let seconds = time % 60;

  //seconds = seconds < 60 ? + seconds : seconds;
  countdownEl.innerHTML = `${'Time left:'}${seconds}`
  if(seconds >= 0) {
    seconds = time--;
    if(seconds < 1) {
      clearInterval(setInterval);
      overlayLose.classList.toggle('show-lose');
      document.querySelector('input').disabled = true;
    }
  }
};

function closeWin() { overlayWin.classList.toggle('show-win'); }
function closeLose() { overlayLose.classList.toggle('show-lose'); }

for (let i = 0; i < correctAnswer.length; i++) {
  currentWord.push('_');
}
document.getElementById('active-word').innerHTML = currentWord.join(' ');

function wordLetters(letter) {
  let letterPosition = [];
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] === letter)
      letterPosition.push(i);
  } return letterPosition;
}

function lettersToGuess() {
  let toGuess = 0;
  for (let i in currentWord) {
    if (currentWord[i] === '_')
      toGuess++;
  } return toGuess;
}

document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key >= 'a' && event.key <= 'z') {
    let letter = event.key.toLowerCase();
    let lettersGuessed = letter;
    let letterPosition = wordLetters(lettersGuessed);

    if (letterPosition.length) {
      for (let i = 0; i < letterPosition.length; i++) {
        currentWord[letterPosition[i]] = lettersGuessed;
      } 
      if (lettersToGuess() == 0) { overlayWin.classList.toggle('show-win'); document.querySelector('input').disabled = true; }
      document.getElementById('active-word').innerHTML = currentWord.join(' ');

    } else if (!pastLetters.includes(letter)) {
        pastLetters.push(letter);
        document.getElementById('letters-guessed').innerHTML += lettersGuessed + ' ';
        guessesLeft--;
        document.querySelector('figure').classList.add(livesLeft[guessesLeft]);
        if (guessesLeft === 0) {
          overlayLose.classList.toggle('show-lose');
          document.querySelector('input').disabled = true;
        }
    }
  }
});