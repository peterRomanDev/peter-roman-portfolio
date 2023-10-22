const btnsNums = document.querySelector('.btns-nums');
const btnPlus = document.querySelector('.btn-plus');
const btnMinus = document.querySelector('.btn-minus');
const btnTimes = document.querySelector('.btn-times');
const btnDivided = document.querySelector('.btn-divided');
const btnEquals = document.querySelector('.btn-equals');
const btnC = document.querySelector('.btn-c');
const btnMusic = document.querySelector('.btn-music');

const soundEffect1 = document.querySelector('.sound-effect-1');
const soundEffect2 = document.querySelector('.sound-effect-2');

const displayNumField = document.querySelector('.display-num-field');
const displayMsgField = document.querySelector('.display-msg-field');

// The numbers that are being collected as the user clicks on Buttons 0-9
let arrOfNums = [];

// The collection of numbers that the user typed by clicking on Buttons 0-9
let currentNum = null;

// The operator that was clicked on
let currentOperator = null;

// Final number
let finalNum = null;

// The type of button that was clicked
let btnLastClicked = null;

// The status of the sound effect (is it turned on or not)
let audioActive = false;










// Add a number to the Array of Numbers
const addToArrOfNums = num => arrOfNums.push(num);

// Clear the individual numbers that are being collected
const resetArrOfNums = () => arrOfNums = [];

// Combine the numbers in the array into a single Current Number
const saveCurrentNum = () => currentNum = Number(arrOfNums.join(''));

// Clear the value of the Current Number
const resetCurrentNum = () => currentNum = null;

// Add the Current Number to the Final Number
// const add = () => finalNum += currentNum;
const add = () => {
    finalNum += currentNum;
    checkFinalNum();
};

// Subtract the Current Number from the Final Number
const subtract = () => {
    finalNum -= currentNum;
    checkFinalNum();
};

// Multiply the Final Number by the Current Number
const multiply = () => {
    finalNum *= currentNum;
    checkFinalNum();
};

// Divide the Final Number by the Current Number
const divide = () => {
    finalNum /= currentNum
    checkFinalNum();
};

// If the Final Number consists of more than 14 digits, it will be shortened to 14 digits
const checkFinalNum = () => {
    if(String(finalNum).length > 14) {
        let updatedFinalNum = Number(finalNum.toFixed(5));
        finalNum = updatedFinalNum;
    }
};

// Clear the value of the Final Number
const resetFinalNum = () => finalNum = null;

// Set the Current Operator to whatever value is passed into the function
const setOperator = operator => currentOperator = operator;

// Reset the Current Operator
const resetOperator = () => currentOperator = null;

// Set the button that was last clicked
const clicked = type => btnLastClicked = type;










// Display whatever number that is passed into the function in the Display Field
const display = displayedContent => displayNumField.textContent += displayedContent;

// Clear the Display Field of any numbers
const resetDisplayNumField = () => displayNumField.textContent = null;

// Make the Display Field disappear and reappear for a split-second
const flickerDisplayNumField = () => {
    displayNumField.classList.add('d-none');
    setTimeout(() => {
        displayNumField.classList.remove('d-none');
    }, 50);
};

// Make the musical note crossed out or not
const toggleMusicIcon = () => btnMusic.classList.toggle('text-decoration-line-through');

// Turn on/off the sound effects 
const toggleAudio = () => {
    if (audioActive === false) {
        audioActive = true;
    } else if (audioActive === true) {
        audioActive = false;
    }
};

// Play the sound effect when the audio gets turned on
const turnedOnAudio = soundEffect => {
    if (audioActive === false) {
        soundEffect.play();
    }
};

// Play the given sound effect
const playAudio = soundEffect => {
    if (audioActive === true) {
        soundEffect.play();
    }
};

// Make the messages 'Sound On' and 'Sound Off' display on the screen
const toggleMsg = () => {
    if (audioActive === true) {
        displayMsgField.textContent = 'Sound On';
    } else if (audioActive === false) {
        displayMsgField.textContent = 'Sound Off';
    }
    displayNumField.classList.add('d-none');
    displayMsgField.classList.remove('d-none');
    setTimeout(() => {
        displayNumField.classList.remove('d-none');
        displayMsgField.classList.add('d-none');
    }, 500);
};










// Special conditions for the 0-9 Buttons
const btnNumSpecialConditions = e => {

    // If the + or X Button was the last button clicked, the display is reset and 0 is displayed
    if (btnLastClicked === 'btnPlus' || btnLastClicked === 'btnMinus' || btnLastClicked === 'btnTimes' || btnLastClicked === 'btnDivided') {
        resetDisplayNumField();
        display(0);
    }
    // If the = Button was the last button clicked, everything is resetted
    else if (btnLastClicked === 'btnEquals') {
        resetOperator();
        resetCurrentNum();
        resetDisplayNumField();
        display(0);
        resetFinalNum();
        clicked(null);
    }

    // If the number 0 is displayed, it is removed if a Button 0-9 is clicked
    if (displayNumField.textContent === '0') {
        resetDisplayNumField();
    }

    // The value of the button that was clicked on is added to the Array of Numbers and is displayed
    if (arrOfNums.length < 7) {
        addToArrOfNums(e.target.textContent);
        display(e.target.textContent);
    }
};

// Special conditions for the . Button
const btnDotSpecialConditions = e => {
    
    // If the + Button was the last button clicked, the display is reset and 0 is displayed
    if (btnLastClicked === 'btnPlus' || btnLastClicked === 'btnMinus' || btnLastClicked === 'btnTimes' || btnLastClicked === 'btnDivided') {
        resetDisplayNumField();
        display(0);
    }
    // If the = Button was the last button clicked, everything is resetted
    else if (btnLastClicked === 'btnEquals') {
        resetOperator();
        resetCurrentNum();
        resetDisplayNumField();
        display(0);
        resetFinalNum();
        clicked(null);
    }

    // If the Array of Numbers doesn't yet include a '.', a '.' is added to it and is displayed
    if (arrOfNums.includes('.') === false) {
        addToArrOfNums(e.target.textContent);
        display(e.target.textContent);
    }
    // If the Array of Numbers already includes a '.', a '.' is NOT added to it and is NOT displayed
};

// Special conditions for the + Button
const btnPlusSpecialContitions = () => {
        
        // If the . Button was the last button clicked, add a 0 at the end of the Array of Numbers
        if (btnLastClicked === 'btnDot') {
            addToArrOfNums('0');
        }

        // If the = Button was the last button clicked, the Final Number is displayed
        if (currentOperator === '=') {
            display(finalNum);
        }
        // If the - Button was the last button clicked, the Current number is Subtracted from the Final Number
        else if (currentOperator === '-') {
            // If anything else (Buttons 0-9) was the last button clicked, subtraction is performed
            if (btnLastClicked !== 'btnMInus') {
                saveCurrentNum();
                subtract();
            }
        }
        // If the X Button was the last button clicked, the Final Number is multiplied by the Current Number
        else if (currentOperator === 'x') {
            // If anything else (Buttons 0-9) was the last button clicked, multiplication is performed
            if (btnLastClicked !== 'btnTimes' && currentNum !== 0) {
                saveCurrentNum();
                multiply();
            }
        }
        // If the ÷ Button was the last button clicked, the Final Number is divided by the Current Number
        else if (currentOperator === '÷') {
            // If anything else (Buttons 0-9) was the last button clicked, division is performed
            if (btnLastClicked !== 'btnDivided' && currentNum !== 0) {
                saveCurrentNum();
                divide();
            }
        }
        // If anything else (the + Button or Buttons 0-9) was the last button clicked, or no button button was the last button clicked at all, the Current Number is saved and addition is performed
        else {
            saveCurrentNum();
            add();
        }

        resetDisplayNumField();
        display(finalNum);
};

// Special conditions for the - Button
const btnMinusSpecialContitions = () => {

    // If the . Button was the last button clicked, add a 0 at the end of the Array of Numbers
    if (btnLastClicked === 'btnDot') {
        addToArrOfNums(0);
    }

    // If the = Button was the last button clicked, the Final Number is displayed
    if (currentOperator === '=') {
        display(finalNum);
    }
    // If the + Button was the last button clicked, the Current number is Added to the Final Number
    else if (currentOperator === '+') {
        // If anything else (Buttons 0-9) was the last button clicked, addition is performed
        if (btnLastClicked !== 'btnPlus') {
            saveCurrentNum();
            add();
        }
    }
    // If the X Button was the last button clicked, the Final Number is multiplied by the Current Number
    else if (currentOperator === 'x') {
        // If anything else (Buttons 0-9) was the last button clicked, multiplication is performed
        if (btnLastClicked !== 'btnTimes') {
            saveCurrentNum();
            multiply();
        }
    }
    // If the ÷ Button was the last button clicked, the Current number is Added to the Final Number
    else if (currentOperator === '÷') {
        // If anything else (Buttons 0-9) was the last button clicked, division is performed
        if (btnLastClicked !== 'btnDivided') {
            saveCurrentNum();
            divide();
        }
    }
    // If anything else (the X Button or Buttons 0-9) was the last button clicked, or no button button was the last button clicked at all, the Current Number is saved
    else {
        // If the Final Number has a value of null (e.g. at the very beginning when no operation was performed prior), the Current Number is ADDED to the Final Number
        if(finalNum === null) {
            saveCurrentNum();
            add();
        }
        // If the X Button was the last button clicked (if the X button keeps getting pressed), then nothing happens
        // If anything else (Buttons 0-9) was the last button clicked, subtraction is performed
        else if (btnLastClicked !== 'btnMinus') {
            saveCurrentNum();
            subtract();
        }
    }
    
    resetDisplayNumField();
    display(finalNum);
};

// Special conditions for the X Button
const btnTimesSpecialConditions = () => {

    // If the . Button was the last button clicked, add a 0 at the end of the Array of Numbers
    if (btnLastClicked === 'btnDot') {
        addToArrOfNums(0);
    }

    // If the = Button was the last button clicked, the Final Number is displayed
    if (currentOperator === '=') {
        display(finalNum);
    }
    // If the + Button was the last button clicked, the Current number is Added to the Final Number
    else if (currentOperator === '+') {
        // If anything else (Buttons 0-9) was the last button clicked, addition is performed
        if (btnLastClicked !== 'btnPlus') {
            saveCurrentNum();
            add();
        }
    }
    // If the - Button was the last button clicked, the Current Number is subtracted from the Final Number
    else if (currentOperator === '-') {
        // If anything else (Buttons 0-9) was the last button clicked, division is performed
        if (btnLastClicked !== 'btnMinus' && currentNum !== 0) {
            saveCurrentNum();
            subtract();
        }
    }
    // If the ÷ Button was the last button clicked, the Current number is Added to the Final Number
    else if (currentOperator === '÷') {
        // If anything else (Buttons 0-9) was the last button clicked, division is performed
        if (btnLastClicked !== 'btnDivided') {
            saveCurrentNum();
            divide();
        }
    }
    // If anything else (the X Button or Buttons 0-9) was the last button clicked, or no button button was the last button clicked at all, the Current Number is saved
    else {
        // If the Final Number has a value of null (e.g. at the very beginning when no operation was performed prior), the Current Number is ADDED to the Final Number
        if (finalNum === null) {
            saveCurrentNum();
            add();
        }
        // If the X Button was the last button clicked (if the X button keeps getting pressed), then nothing happens
        // If anything else (Buttons 0-9) was the last button clicked, multiplication is performed
        else if (btnLastClicked !== 'btnTimes') {
            saveCurrentNum();
            multiply();
        }
    }

    resetDisplayNumField();
    display(finalNum);
};

// Special conditions for the ÷ Button
const btnDividedSpecialConditions = () => {

    // If the . Button was the last button clicked, add a 0 at the end of the Array of Numbers
    if (btnLastClicked === 'btnDot') {
        addToArrOfNums(0);
    }

    // If the = Button was the last button clicked, the Final Number is displayed
    if (currentOperator === '=') {
        display(finalNum);
    }
    // If the + Button was the last button clicked, the Current number is Added to the Final Number
    else if (currentOperator === '+') {
        // If anything else (Buttons 0-9) was the last button clicked, addition is performed
        if (btnLastClicked !== 'btnPlus') {
            saveCurrentNum();
            add();
        }
    }
    // If the - Button was the last button clicked, the Current Number is subtracted from the Final Number
    else if (currentOperator === '-') {
        // If anything else (Buttons 0-9) was the last button clicked, subtraction is performed
        if (btnLastClicked !== 'btnMinus' && currentNum !== 0) {
            saveCurrentNum();
            subtract();
        }
    }
    // If the X Button was the last button clicked, the Final Number is multiplied by the Current Number
    else if (currentOperator === 'x') {
        // If anything else (Buttons 0-9) was the last button clicked, multiplication is performed
        if (btnLastClicked !== 'btnTimes') {
            saveCurrentNum();
            multiply();
        }
    }
    // If anything else (the X Button or Buttons 0-9) was the last button clicked, or no button button was the last button clicked at all, the Current Number is saved
    else {
        // If the Final Number has a value of null (e.g. at the very beginning when no operation was performed prior), the Current Number is ADDED to the Final Number
        if (finalNum === null) {
            saveCurrentNum();
            add();
        }
        // If the ÷ Button was the last button clicked (if the ÷ button keeps getting pressed), then nothing happens
        // If anything else (Buttons 0-9) was the last button clicked, division is performed
        else if (btnLastClicked !== 'btnDivided') {
            saveCurrentNum();
            divide();
        }
    }

    resetDisplayNumField();
    display(finalNum);
};

// Special conditions for the = Button
const btnEqualsSpecialConditions = () => {

    // If the . Button was the last button clicked, add a 0 at the end of the Array of Numbers
    if (btnLastClicked === 'btnDot') {
        addToArrOfNums(0);
    }

    saveCurrentNum();

    // If the current operator is +, then the Current Number is added to the Final Number
    if (currentOperator === '+') {
        add();
    }
    // If the current operator is -, then the Current Number is subtracted from the Final Number
    else if (currentOperator === '-') {
        subtract();
    }
    // If the current operator is X, then the Final Number is multiplied by the Current Number
    else if (currentOperator === 'x') {
        multiply();
    }
    // If the current operator is /, then the Final Number is divided by the Current Number
    else if (currentOperator === '÷') {
        divide();
    }

    display(finalNum);

    // If Current Number is null (e.g. at the very beginning when nothing was clicked on just yet), the Final Number is assigned the value of the Current Number
    if (finalNum === null) {
        finalNum = currentNum;
        resetDisplayNumField();
        display(finalNum);
    }
};










// . Button clicked or Buttons 0-9 clicked
btnsNums.addEventListener('click', e => {
    
    // . Button clicked
    if (e.target.classList.contains('btn-dot')) {
        flickerDisplayNumField();
        playAudio(soundEffect1);
        btnDotSpecialConditions(e);
        clicked('btnDot');
    }
    // Buttons 0-9 clicked
    else if (e.target.classList.contains('btn-number')) {
        flickerDisplayNumField();
        playAudio(soundEffect1);
        btnNumSpecialConditions(e);
        clicked('btnNum');
    }
});

// + Button clicked
btnPlus.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect1);
    btnPlusSpecialContitions();
    clicked('btnPlus');
    setOperator(btnPlus.textContent);
    resetArrOfNums();
});

// - Button clicked
btnMinus.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect1);
    btnMinusSpecialContitions();
    clicked('btnMinus');
    setOperator(btnMinus.textContent);
    resetArrOfNums();
});

// X Button clicked
btnTimes.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect1);
    btnTimesSpecialConditions();
    clicked('btnTimes');
    setOperator(btnTimes.textContent);
    resetArrOfNums();
});

// ÷ Button clicked
btnDivided.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect1);
    btnDividedSpecialConditions();
    clicked('btnDivided');
    setOperator(btnDivided.textContent);
    resetArrOfNums();
});

// = Button clicked
btnEquals.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect2);
    resetDisplayNumField();
    btnEqualsSpecialConditions();
    clicked('btnEquals');
    setOperator(btnEquals.textContent);
    resetArrOfNums();
});

// C Button clicked
btnC.addEventListener('click', () => {
    flickerDisplayNumField();
    playAudio(soundEffect1);
    resetDisplayNumField();
    display(0);
    resetOperator();
    clicked(null);
    resetArrOfNums();
    resetCurrentNum();
    resetFinalNum();
});

// ♪ Button clicked
btnMusic.addEventListener('click', () => {
    turnedOnAudio(soundEffect2);
    toggleMusicIcon();
    toggleAudio();
    toggleMsg();
});