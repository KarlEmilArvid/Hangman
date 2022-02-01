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


// const wordArray = ['dog', 'apple', 'laptop'];
// const letters = document.getElementById('letters');
// const listItem = document.querySelector('letter');

// let correctWord = '';

 
// function randomWord() {
//     let random = Math.floor(Math.random() * wordArray.length);
//     correctWord = wordArray[random];
//     generateInputText();
//     generateInputField();

//     console.log(correctWord);
// }

// function generateInputField() {
//     for(let i = 0; i < correctWord.length; i++) {
        
//         inputField.innerHTML = `<input type="text" maxlength="1" class="letter">`;
//         inputField.classList.add('letter')
//         letters.append(inputField);
//     }
// }

// function generateInputText() {
//     const generateInputField = correctWord.length;
//     for (let i = 0; i < generateInputField; i++) {
//         const listItem = document.querySelector('ul')
//         listItem.innerHTML = `<li>
//         <input type="text" maxlength="1" class="input">
//     </li>`;
//         listItem.classList.add('letter');
//         letters.append(listItem);
//     }
// }
// generateInputText()
// randomWord();


const letters = document.getElementById('letters');
const wordArray = ['dog', 'apple', 'laptop']
const listItem = document.createElement('li');

let correctWord = '';

function randomWord() {
    let random = Math.floor(Math.random() * wordArray.length);
    correctWord = wordArray[random];
    generateInputText();
    console.log(correctWord);
}

function generateInputText() {
    const generateInputField = correctWord.length;
    for (let i = 0; i < generateInputField; i++) {
        listItem.classList.add('letter');
        listItem.innerHTML = `<input type="text" max-length="1" class="letter>`;
        letters.append(listItem);
    }
}

function compareWord() {

}

randomWord();