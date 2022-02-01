/**
 * TODO:

 * en text-input för varje bokstav i ordet
 * vid rätt bokstav - (blinka grönt) gå vidare till nästa input
 * vid fel bokstav - (blinka rött) infoga bildanimering och töm input
 * uppdatera figur svg array, för varje fel bokstav så visas index 0 till 4
 * Input med tangentbord, bara gissa på en bokstav i taget
 * "Du vann" overlay
 * "Du förlorade" overlay
 
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


const wordArray = ['dog', 'apple', 'laptop'];


let correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];



document.getElementById("guesses-remain").innerHTML = guessesLeft;



for (i = 0; i < correctAnswer.length; i++) {
  currentWord.push("_");
}
document.getElementById("active-word").innerHTML = currentWord.join(" ");

function wordLetters(letter) {
  let letterPosition = new Array();
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

document.onkeyup = function(event) {
  if ((event.keyCode >= 65 && event.keyCode <= 90) || event.keyCode >= 97 && event.keyCode <= 122) {
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
      guessesLeft = 5;
      document.getElementById("guesses-remain").innerHTML = guessesLeft;

      document.getElementById("letters-guessed").innerHTML = lettersReset;

      correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];

      currentWord = [];
      pastLetters = [];
      for (i = 0; i < correctAnswer.length; i++) {
        currentWord.push("_");
      }
      document.getElementById("active-word").innerHTML = currentWord.join(" ");
    }

    //YOU LOSE OVERLAY
    if (guessesLeft === 0) {
      guessesLeft = 5;
      document.getElementById("guesses-remain").innerHTML = guessesLeft;

      document.getElementById("letters-guessed").innerHTML = lettersReset;

      correctAnswer = wordArray[Math.floor(Math.random() * wordArray.length)];

      currentWord = [];
      pastLetters = [];
      for (i = 0; i < correctAnswer.length; i++) {
        currentWord.push("_");
      }
      document.getElementById("active-word").innerHTML = currentWord.join(" ");
    }
  }
}