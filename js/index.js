/**
 * TODO:
 * 
 * uppdatera figur svg array, för varje fel bokstav så visas index 0 till 4
 * Input med tangentbord, bara gissa på en bokstav i taget
 * Gömma input fält
 * 
 * 
 * Nedräkning på 1 min
 */


/**
 För att toggla SVG:en
 document.querySelector('figure').classList.add('scaffold')
 document.querySelector('figure').classList.add('head')
 document.querySelector('figure').classList.add('body')
 document.querySelector('figure').classList.add('arms')
 document.querySelector('figure').classList.add('legs')

*/



let currentWord = [];
let answerWord = [];
let pastLetters = [];
let lettersReset = '';
let i;
let guessesLeft = 5;
document.getElementById("guesses-remain").innerHTML = guessesLeft;


const wordArray = ['dog', 'apple', 'laptop', 'croiassant'];
const overlayWin = document.querySelector('.overlay-win');
const overlayLose = document.querySelector('.overlay-lose');
const resetWinBtn = document.querySelector('.reset-button-win');
const resetLoseBtn = document.querySelector('.reset-button-lose');
const closeOverlayWin = document.querySelector('.close-win');
const closeOverlayLose = document.querySelector('.close-lose');

let correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];

let alwaysFocusedInput = document.getElementById( 'activeFocus' ); //Fokus på input fält

//BUTONS
resetLoseBtn.addEventListener('click', () => {location.reload()});
resetWinBtn.addEventListener('click', () => {location.reload()});

closeOverlayWin.addEventListener('click', ()=> closeWin());
closeOverlayLose.addEventListener('click', ()=> closeLose());

function closeWin() {
    overlayWin.classList.toggle('show-win')
}
function closeLose() {
    overlayLose.classList.toggle('show-lose');
}

alwaysFocusedInput.addEventListener( 'blur',() => { //Fokus på input fält
    setTimeout(() => {
      alwaysFocusedInput.focus();
    }, 0);
  });


for (i = 0; i < correctAnswer.length; i++) {
  currentWord.push("_");
}
document.getElementById("active-word").innerHTML = currentWord.join(" ");


function wordLetters(letter) {
  let letterPosition = [];
  for (i = 0; i < correctAnswer.length; i++) {
    if (correctAnswer[i] === letter)
      letterPosition.push(i);
  }
  return letterPosition;
}

function lettersToGuess() {
  let i;
  let toGuess = 0;
  for (i in currentWord) {
    if (currentWord[i] === "_")
      toGuess++;
  }
  return toGuess;
}

document.querySelector('input').addEventListener('keydown', (event) => {
  if (event.key >= 'a' && event.key <= 'z') {
    let letter = event.key.toLowerCase();
    let lettersGuessed = letter;
    let i;
    let letterPosition = wordLetters(lettersGuessed);

    if (letterPosition.length) {
      for (i = 0; i < letterPosition.length; i++) {
        currentWord[letterPosition[i]] = lettersGuessed;
      }
      document.getElementById("active-word").innerHTML = currentWord.join(" ");
    } else {
      if (!pastLetters.includes(letter)) {
        pastLetters.push(letter);
        document.getElementById("letters-guessed").innerHTML += lettersGuessed + " ";
        guessesLeft--;
        document.getElementById("guesses-remain").innerHTML = guessesLeft;
      }
    }

    // YOU WIN OVERLAY


    if (lettersToGuess() == 0) {
        overlayWin.classList.toggle('show-win');
    }

    //YOU LOSE OVERLAY
    if (guessesLeft === 0) {
        overlayLose.classList.toggle('show-lose');
    }
  }
});
