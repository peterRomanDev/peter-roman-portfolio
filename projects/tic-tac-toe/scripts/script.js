const formEnterNames = document.querySelector('.form-enter-names');
const inputPlayerOneUsername = document.querySelector('.playerOne-name');
const inputPlayerTwoUsername = document.querySelector('.playerTwo-name');
const checkA = document.querySelector('.check-a');
const checkB = document.querySelector('.check-b');
const checkC = document.querySelector('.check-c');
const checkD = document.querySelector('.check-d');

const introText = document.querySelector('.intro-text');
const msgField = document.querySelector('.msg');

const grid = document.querySelector('.grid');

const col1 = document.querySelector('.col1');
const col2 = document.querySelector('.col2');
const col3 = document.querySelector('.col3');
const col4 = document.querySelector('.col4');
const col5 = document.querySelector('.col5');
const col6 = document.querySelector('.col6');
const col7 = document.querySelector('.col7');
const col8 = document.querySelector('.col8');
const col9 = document.querySelector('.col9');

const displayScore = document.querySelector('.score');
const displayScorePlayerOne = document.querySelector('.scorePlayerOne');
const displayScorePlayerTwo = document.querySelector('.scorePlayerTwo');

const btnStartGame = document.querySelector('.btn-start-game');
const btnPlayAgain = document.querySelector('.btn-play-again');
const btnResetScore = document.querySelector('.btn-reset-score');
const btnBackToMenu = document.querySelector('.btn-back-to-menu');

// Players have their own usernames, symbols, score and each can be the current player
class Player {
    constructor(username, playerSymbol, score, isCurrentPlayer) {
        this.username = username;
        this.symbol = playerSymbol;
        this.score = score;
        this.isCurrentPlayer = isCurrentPlayer;
    }
};

let playerOne = new Player(null, null, null, null);
let playerTwo = new Player(null, null, null, null);












// Determine the username for playerOne
const playerOneUsername = () => playerOne.username = inputPlayerOneUsername.value.trim();

// Determine the username for playerTwo
const playerTwoUsername = () => playerTwo.username = inputPlayerTwoUsername.value.trim();

// Determine the symbol for playerOne
const playerOneSymbol = () => {
    let symbol;
    
    if (checkA.checked) {
        symbol = 'X';
    } else if (checkB.checked) {
        symbol = 'O';
    }
    playerOne.symbol = symbol;
};

// Determine the symbol for playerTwo
const playerTwoSymbol = () => {
    let symbol;
    
    if (checkC.checked) {
        symbol = 'X';
    } else if (checkD.checked) {
        symbol = 'O';
    }
    playerTwo.symbol = symbol;
};

// Reset all the properties of both players
const resetPlayers = () => {
    playerOne.username = null;
    playerOne.symbol = null;
    playerOne.score = null;
    playerOne.isCurrentPlayer = null;
    
    playerTwo.symbol = null;
    playerTwo.username = null;
    playerTwo.score = null;
    playerTwo.isCurrentPlayer = null;
};

// Set the score of playerOne and playerTwo to 0
const resetScore = () => {
    playerOne.score = 0;
    playerTwo.score = 0;
};

// Determine which player is the current one to make a turn
const currentPlayer = () => {
    if(playerOne.isCurrentPlayer === true) {
        return playerOne;
    } else if (playerTwo.isCurrentPlayer === true) {
        return playerTwo;
    }
};

// If playerOne is the current player, make playerTwo the current player
// If playerTwo is the current player, make playerOne the current player
const switchCurrentPlayer = () => {
    if (playerOne.isCurrentPlayer === true) {
        playerOne.isCurrentPlayer = false;
        playerTwo.isCurrentPlayer = true;
    } else if (playerTwo.isCurrentPlayer === true) {
        playerTwo.isCurrentPlayer = false;
        playerOne.isCurrentPlayer = true;
    }
};

// When playerOne is the winner, playerTwo will become the current player
// When playerTwo is the winner, playerOne will become the current player
const setNewCurrentPlayer = () => {
    if (playerOne.isCurrentPlayer === 'winner') {
        playerOne.isCurrentPlayer = false;
        playerTwo.isCurrentPlayer = true;
    } else if (playerTwo.isCurrentPlayer === 'winner') {
        playerTwo.isCurrentPlayer = false;
        playerOne.isCurrentPlayer = true;
    } else {
        playerOne.isCurrentPlayer = true;
        playerTwo.isCurrentPlayer = false;
    }
};










// Make the Main Menu appear on screen
const showMenu = () => formEnterNames.classList.remove('d-none');

// Make the Main Menu disappear from the screen
const hideMenu = () => formEnterNames.classList.add('d-none');

// Show the paragraphs in the main menu explaining the game
const showIntroText = () => introText.classList.remove('d-none');

// Show the paragraphs in the main menu explaining the game
const hideIntroText = () => introText.classList.add('d-none');

// Make the Start Game button appear on screen
const showStartGameBtn = () => btnStartGame.classList.remove('d-none');

// Make the Start Game button disappear from the screen
const hideStartGameBtn = () => btnStartGame.classList.add('d-none');

// Make all of the tiles empty
const showGrid = () => grid.classList.remove('d-none');

// Hide the game grid where symbols are placed
const hideGrid = () => grid.classList.add('d-none');

// Hide buttons with options on what to do next
const showEndGameBtns = () => {
    btnPlayAgain.classList.remove('d-none');
    btnResetScore.classList.remove('d-none');
};

// Show buttons with options on what to do next
const hideEndGameBtns = () => {
    btnPlayAgain.classList.add('d-none');
    btnResetScore.classList.add('d-none');
};

// Show Back to Menu button
const showBackToMenuBtn = () => btnBackToMenu.classList.remove('d-none');

// Hide Back to Menu button
const hideBackToMenuBtn = () => btnBackToMenu.classList.add('d-none');










// Make the Start Game button clickable
const enableStartGameBtn = () => btnStartGame.classList.remove('disabled');

// Make the Start Game button NOT clickable
const disableStartGameBtn = () => btnStartGame.classList.add('disabled');

// Update the message showing up on top of the screen
const updateMsg = msg => msgField.textContent = msg;

// Update the score on the scoreboard
const updateScore = () => {
    displayScorePlayerOne.textContent = `${playerOne.username}: ${playerOne.score}`;
    displayScorePlayerTwo.textContent = `${playerTwo.username}: ${playerTwo.score}`;
};

// Clear all of the players' symbols from the grid
const resetGrid = () => {
    col1.textContent = '';
    col2.textContent = '';
    col3.textContent = '';
    col4.textContent = '';
    col5.textContent = '';
    col6.textContent = '';
    col7.textContent = '';
    col8.textContent = '';
    col9.textContent = '';
};

// Clear the values of the input fields for playerOne and playerTwo
// Clear the symbols for both players
const resetMenu = () => {
    formEnterNames.reset();
    checkA.removeAttribute('checked');
    checkB.removeAttribute('checked');
    checkC.removeAttribute('checked');
    checkD.removeAttribute('checked');
};










const endOfTurn = () => {
    // If either playerOne or playerTwo fulfils the vicotry conditions, the winner function is called and the End Menu appears
    if (col1.textContent === currentPlayer().symbol && col2.textContent === currentPlayer().symbol && col3.textContent === currentPlayer().symbol ||
        col4.textContent === currentPlayer().symbol && col5.textContent === currentPlayer().symbol && col6.textContent === currentPlayer().symbol ||
        col7.textContent === currentPlayer().symbol && col8.textContent === currentPlayer().symbol && col9.textContent === currentPlayer().symbol ||
        col1.textContent === currentPlayer().symbol && col4.textContent === currentPlayer().symbol && col7.textContent === currentPlayer().symbol ||
        col2.textContent === currentPlayer().symbol && col5.textContent === currentPlayer().symbol && col8.textContent === currentPlayer().symbol ||
        col3.textContent === currentPlayer().symbol && col6.textContent === currentPlayer().symbol && col9.textContent === currentPlayer().symbol ||
        col1.textContent === currentPlayer().symbol && col5.textContent === currentPlayer().symbol && col9.textContent === currentPlayer().symbol ||
        col3.textContent === currentPlayer().symbol && col5.textContent === currentPlayer().symbol && col7.textContent === currentPlayer().symbol) {
        victory();
    } 
    // If all of the tiles have a sign but none of the players managed to place three of them in a line, it is a tie
    else if (col1.textContent.length !== 0 && col2.textContent.length !== 0 && col3.textContent.length !== 0 &&
        col4.textContent.length !== 0 && col5.textContent.length !== 0 && col6.textContent.length !== 0 &&
        col7.textContent.length !== 0 && col8.textContent.length !== 0 && col9.textContent.length !== 0 &&
        playerOne.isCurrentPlayer !== 'winner' && playerTwo.isCurrentPlayer !== 'winner') {
        tie();
    // If none of the players won and it is not a tie, the players switch around and the game carries on
    } else {
        switchCurrentPlayer();
        updateMsg(`${currentPlayer().username}, it is your turn`);
    }
}

// The winner gets 1 point, the scoreboard is updated, the message is updated and the winner stops being the current player
const victory = () => {
    showEndGameBtns();
    currentPlayer().score++;
    updateScore();
    updateMsg(`${currentPlayer().username} is the winner!`);
    currentPlayer().isCurrentPlayer = 'winner';
};

// If none of the two players managed to place 3 symbols in a line
const tie = () => {
    showEndGameBtns();
    updateMsg("It's a tie!");
};










// Menu
formEnterNames.addEventListener('input', () => {
    if (checkA.checked) {
        checkC.removeAttribute('checked');
        checkD.setAttribute('checked', 'true');
    } else if (checkB.checked) {
        checkD.removeAttribute('checked');
        checkC.setAttribute('checked', 'true');
    }
    
    if (inputPlayerOneUsername.value.length === 0 || inputPlayerTwoUsername.value.length === 0) {
        disableStartGameBtn();
    } else if (inputPlayerOneUsername.value.length > 0 && inputPlayerTwoUsername.value.length > 0 && checkA.checked || inputPlayerOneUsername.value.length > 0 && inputPlayerTwoUsername.value.length > 0 && checkB.checked) {
        enableStartGameBtn();
    }
});

// Start Game button
btnStartGame.addEventListener('click', () => {
    hideIntroText();
    hideMenu();
    hideStartGameBtn();
    showGrid();
    showBackToMenuBtn();

    playerOneUsername();
    playerOneSymbol();
    playerTwoUsername();
    playerTwoSymbol();
    setNewCurrentPlayer();
    resetScore();
    
    updateScore();
    updateMsg(`${currentPlayer().username}, it is your turn`);
});

// Grid
grid.addEventListener('click', e => { 
    if (e.target.classList.contains('col')) {
        if (playerOne.isCurrentPlayer === true && e.target.textContent.length === 0) {
            e.target.textContent = playerOne.symbol;
            endOfTurn();
        } else if (playerTwo.isCurrentPlayer === true && e.target.textContent.length === 0){
            e.target.textContent = playerTwo.symbol;
            endOfTurn();
        }
    }
});

// Play Again button
btnPlayAgain.addEventListener('click', () => {
    hideEndGameBtns();
    resetGrid();
    setNewCurrentPlayer();
    updateMsg(`${currentPlayer().username}, it is your turn`);
});

// Reset Score button
btnResetScore.addEventListener('click', () => {
    resetScore();
    updateScore();
});

// Back to Menu button
btnBackToMenu.addEventListener('click', () => {
    hideEndGameBtns();
    hideBackToMenuBtn();
    resetGrid();
    hideGrid();
    resetPlayers();
    resetMenu();
    showMenu();
    showIntroText();
    disableStartGameBtn();
    showStartGameBtn();
    updateMsg("Let's play Tic-Tac-Toe!");
});