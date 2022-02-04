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

let correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];
document.querySelector('.correct-word').innerHTML = `Correct word was ${correctAnswer}`;

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
const startingSeconds = 59;
let time = startingSeconds * 1;

const countdownEl = document.getElementById('time-left');

const updateCountdown = () => {
  let seconds = time % 60;

  countdownEl.innerHTML = 'Time left: ' + seconds;
  if (seconds < 11) {countdownEl.style.color ="red"};
  if (seconds < 1) {
    overlayLose.classList.toggle('show-lose');
    clearInterval(Interval);
    document.querySelector('input').disabled = true;
  }
  seconds = time--;
};

const Interval= setInterval (updateCountdown, 1000);

for (let i = 0; i < correctAnswer.length; i++) {
  currentWord.push('_');
};

document.getElementById('active-word').innerHTML = currentWord.join(' ');

function wordLetters(letter) {
  let letterPosition = [];
  for (let i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] === letter)
      letterPosition.push(i);
  } return letterPosition;
};

function lettersToGuess() {
  let toGuess = 0;
  for (let i in currentWord) {
    if (currentWord[i] === '_')
      toGuess++;
  } return toGuess;
};

document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key >= 'a' && event.key <= 'z') {
    let letter = event.key.toLowerCase();
    let lettersGuessed = letter;
    let letterPosition = wordLetters(lettersGuessed);

    if (letterPosition.length) {
      for (let i = 0; i < letterPosition.length; i++) {
        currentWord[letterPosition[i]] = lettersGuessed;
      } 
      if (lettersToGuess() == 0) {
      overlayWin.classList.toggle('show-win');
      clearInterval(Interval);
      document.querySelector('input').disabled = true; }
      document.getElementById('active-word').innerHTML = currentWord.join(' ');

    } else if (!pastLetters.includes(letter)) {
        pastLetters.push(letter);
        document.getElementById('letters-guessed').innerHTML += lettersGuessed + ' ';
        guessesLeft--;
        document.querySelector('figure').classList.add(livesLeft[guessesLeft]);
        if (guessesLeft === 0) {
          overlayLose.classList.toggle('show-lose');
          clearInterval(Interval);
          document.querySelector('input').disabled = true;
        }
    }
  }
});