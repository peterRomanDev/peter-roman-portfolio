class Element {
    constructor(elementClass, mainAnimationClass, introAnimationClass) {
        this.element = document.querySelector(elementClass);
        this.mainAnimationClass = mainAnimationClass;
        this.introAnimationClass = introAnimationClass;
    }
    // Make an element fade in to the screen by first removing the "not-displayed" class and then removing the "invisible" class
    show() {
        this.element.classList.remove('not-displayed');
        setTimeout(() => this.element.classList.remove('invisible'), 350);
    }
    // Make an element fade away from the screen by first adding the "invisible" class, and once it is done animating, by adding the "not-displayed" class
    hide() {
        this.element.classList.add('invisible');
        setTimeout(() => this.element.classList.add('not-displayed'), 350);
    }
    // Enable an element (e.g. button) by removing the "disabled" attribute from it
    enable() {
        this.element.removeAttribute('disabled');
    }
    // Disable an element (e.g. button) by adding the "disabled" attribute to it
    disable() {
        this.element.setAttribute('disabled', '');
    }
    // Play the main animation of an element (the one occuring during gameplay) by adding the animation class to an element
    playAnimation() {
        this.element.classList.add(this.mainAnimationClass);
    }
    // Play the intro animation of an element (the one occuring during the intro) by adding the animation class to an element
    playIntroAnimation() {
        this.element.classList.add(this.introAnimationClass);
    }
    // Pause the main animation of an element by adding the "animation-paused" class
    pauseAnimation() {
        this.element.classList.add('animation-paused');
    }
    // Resume the main animation of an element by removing the "animation-paused" class
    resumeAnimation() {
        this.element.classList.remove('animation-paused');
    }
    // Remove the main animation class from an element
    endAnimation() {
        this.element.classList.remove(this.mainAnimationClass);
    }
    // Bring an element into focus
    bringToFocus() {
        setTimeout(() => this.element.focus(), 350);
    }
    // Remove the focus from an element
    loseFocus() {
        this.element.blur();
    }
};

class MsgHowToJump extends Element {
    constructor(elementClass) {
        super(elementClass);
        this.msgHowToJump = document.querySelector(elementClass);
    }
    // Set the message on how to jump specifically for devices with and without touchscreens
    setDeviceSpecificMsg() {
        // game.isTouchScreenDevice() ? this.msgHowToJump.innerHTML = 'Tap <strong>Anywhere</strong> To Jump' : this.msgHowToJump.innerHTML = 'Press <strong>SPACE</strong> To Jump';

            this.msgHowToJump.innerHTML = '<strong>Press SPACE</strong> or <br><strong>Tap the Screen</strong> To Jump';
    }
};

class Player extends Element {
    constructor(elementClass, jumpAnimationClass, introAnimationClass) {
        super(elementClass, jumpAnimationClass);
        this.player = document.querySelector(elementClass);
        this.introAnimationClass = introAnimationClass;
    }
    // The player is able to jump
    enableJumping() {
        // game.isTouchScreenDevice() ? document.addEventListener('click', this.jump) : document.addEventListener('keydown', game.spacePressed);

        document.addEventListener('click', this.jump);
        document.addEventListener('keydown', game.spacePressed);
    }
    // The player is unable to jump
    disableJumping() {
        // game.isTouchScreenDevice() ? document.removeEventListener('click', this.jump) : document.removeEventListener('keydown', game.spacePressed);

        document.removeEventListener('click', this.jump)
        document.removeEventListener('keydown', game.spacePressed)
    }
    // The player jumps
    // The message on how to jump fades away
    jump() {
        this.playJumpAnimation();
        msgHowToJump.hide();
    }
    // The jump animation is added to the player
    playJumpAnimation() {
        this.playAnimation();
    }
    // The jump animation is removed from the player
    endJumpAnimation() {
        this.endAnimation();
    }
    // The intro animation of the player is played
    playIntroAnimation() {
        this.endJumpAnimation();
        this.addIntroTransition();
        this.player.classList.add(this.introAnimationClass);
        setTimeout(() => this.removeIntroTransition(), 400);
    }
    // The CSS intro transition is added to the player
    addIntroTransition() {
        this.player.classList.add('player-intro-transition');
    }
    // The CSS intro transition is removed from the player
    removeIntroTransition() {
        this.player.classList.remove('player-intro-transition');
    }
    // The player returns to its initial position (off-screen on the left side) by removing its intro animation class
    resetPosition() {
        this.player.classList.remove(this.introAnimationClass);
        this.addIntroTransition();
    }
};

class PlayerEye extends Element {
    constructor(elementClass, blinkAnimationClass) {
        super(elementClass, blinkAnimationClass);
        this.playerEye = document.querySelector(elementClass);
        this.blinkAnimation;
    }
    // The player is able to blink (the blinking interval is set)
    enableBlinking() {
        this.blinkAnimation = setInterval(this.blink.bind(this), 5000);
    }
    // The player is unable to blink (the blinking interval is cleared)
    disableBlinking() {
        clearInterval(this.blinkAnimation);
    }
    // The player blinks
    blink() {
        this.playBlinkAnimation();
    }
    // The blinking animation is added to playerEye
    playBlinkAnimation() {
        this.playAnimation();
    }
    // The blinking animation is removed from playerEye
    endBlinkAnimation() {
        this.endAnimation();
    }
};

class Cloud extends Element {
    constructor(elementClass, toPositionOffScreenLeftClass, positionOffScreenRightClass, positionGameplayClass) {
        super(elementClass, toPositionOffScreenLeftClass, positionGameplayClass);
        this.cloud = document.querySelector(elementClass);
        this.toPositionOffScreenLeft = toPositionOffScreenLeftClass;
        this.positionOffScreenRight = positionOffScreenRightClass;
    }
    // The cloud returns to its position (off-screen on the right side) by replacing the main animation class (toPositionOffScreenLeft class) with the "toPositionOffScreenRight" class
    resetPosition() {
        this.cloud.classList.replace(this.toPositionOffScreenLeft, this.positionOffScreenRight);
    }
    // The cloud's animation from left to right is played again (by adding the "toPositionOffScreenLeft" class)
    playAgainRightToLeftAnimation() {
        this.resetPosition();
        setTimeout(() => this.playAnimation(), 150);
    }
};

class Cactus {
    constructor(element) {
        this.cactus = null;
        this.cactusFlower = null;
        this.collisionDetection = null;
        this.element = element;
    }
    // The HTML of the cactus is created and injected into the level
    create() {
        this.cactus = document.createElement('div');
        this.cactusFlower = document.createElement('div');

        this.cactus.classList.add('cactus');
        this.cactusFlower.classList.add('cactus-flower');

        this.enableReachedLeftSide();
        
        this.cactus.appendChild(this.cactusFlower);

        level.appendChild(this.cactus);

        this.cactus.cactus = this;
    }
    // The cactus is removed from the DOM
    delete() {
        this.element.classList.add('invisible');
        setTimeout(() => {
            this.element.classList.add('not-displayed')
            this.element.remove()
        }, 350);
    }
    // The main animation (off-screen right to off-screen left) is played by adding the "cactus-to-position-off-screen-left" class
    playAnimation() {
        this.cactus.classList.add('cactus-to-position-off-screen-left');
    }
    // Pause the main animation of an element by adding the "animation-paused" class
    pauseAnimation() {
        this.element.classList.add('animation-paused');
    }
    // Resume the main animation of an element by removing the "animation-paused" class
    resumeAnimation() {
        this.element.classList.remove('animation-paused');
    }
    // THe cactus is able to detect a collision with the player
    enableCollisionDetection() {
        this.collisionDetection = setInterval(() => this.detectCollision(this.cactus), 50);
    }
    // The cactus is unable to detect a collision with the player
    disableCollisionDetection() {
        clearInterval(this.collisionDetection);
    }
    // The cactus detects whether it has collided with the player
    detectCollision(element) {
        const player = document.querySelector('.player');
        
        const playerPosition = player.getBoundingClientRect();
        const cactusPosition = element.getBoundingClientRect();

        const playerMiddleOfX = playerPosition.x + playerPosition.width/2;
        const playerMiddleOfY = playerPosition.y + playerPosition.height/2;
        const cactusMiddleOfX = cactusPosition.x + cactusPosition.width/2;
        const cactusMiddleOfY = cactusPosition.y + cactusPosition.height/2;

        // The distance from the middle of player (circle) to the middle of a cactus (also circle) is calculated using Pythagorean theorem
        const distancePlayerCactusX = playerMiddleOfX - cactusMiddleOfX;
        const distancePlayerCactusY = playerMiddleOfY - cactusMiddleOfY;
        const distancePlayerCactus = Math.sqrt(Math.pow(distancePlayerCactusX, 2) + Math.pow(distancePlayerCactusY, 2));
        
        // If the distance is smaller than half of the player's width and half of the cactus' width combined, then they must collide
        if (distancePlayerCactus < playerPosition.width / 2 + cactusPosition.width / 2) {
            if(game.audio) {
                audioGameOver.play();
            }
            this.collision();
        }
    }
    // The player and a cactus collide
    collision() {
        const cacti = document.querySelectorAll('.cactus');
        const cactusShadows = document.querySelectorAll('.cactus-shadow');
        
        game.disablePauseGame();
        game.disableElementsAnimationEnd();
        game.disableCactusGeneration();
        player.disableJumping();
        playerEye.disableBlinking();
        stopwatch.disableTimer();

        player.pauseAnimation();
        playerEye.pauseAnimation();
        playerShadow.pauseAnimation();
        cloudTop.pauseAnimation();
        cloudCenter.pauseAnimation();
        cloudBottom.pauseAnimation();
        cacti.forEach(cactus => new Cactus(cactus).pauseAnimation());
        cactusShadows.forEach(cactusShadow => new Cactus(cactusShadow).pauseAnimation());

        player.hide();
        playerShadow.hide();

        btnResumeGame.disable();
        btnResumeGame.hide();

        btnPauseGame.disable();
        btnPauseGame.hide();

        msgHowToJump.hide();

        bgDark.hide();
        
        setTimeout(() => {
            game.disablePauseGame();
            game.disableElementsAnimationEnd();
            game.disableCactusGeneration();
            player.disableJumping();
            player.endJumpAnimation();
            playerEye.disableBlinking();
            stopwatch.disableTimer();

            headingGameOver.show();

            btnPlayAgain.enable();
        }, 500);
        
        setTimeout(() => {
            player.resumeAnimation();
            player.endJumpAnimation();
            playerEye.resumeAnimation();
            playerShadow.resumeAnimation();
            player.endJumpAnimation();
            playerShadow.endJumpAnimation();
            player.disableJumping();
            
            btnPlayAgain.show();
            btnPlayAgain.bringToFocus();
        }, 600);
    }
    // Enable listening to when a cactus has gone fully off-screen on the left side (finished animating)
    enableReachedLeftSide() {
        this.cactus.addEventListener('animationend', this.reachedLeftSide.bind(this));
    }
    // Disable listening to when a cactus has gone fully off-screen on the left side (finished animating)
    disableReachedLeftSide() {
        this.cactus.removeEventListener('animationend', this.reachedLeftSide.bind(this));
    }
    // A cactus has gone fully off-screen on the left side (finished animating)
    reachedLeftSide() {
        if(game.audio) {
            audioIncreaseScore.play();
        }
        this.cactus.remove();
        scoreCounter.increaseScore();
        this.disableReachedLeftSide();
    }
};

class CactusShadow {
    constructor() {
        this.cactusShadow = null;
    }
    // The HTML of the cactus shadow is created and injected into the level
    create() {
        this.cactusShadow = document.createElement('div');

        this.cactusShadow.classList.add('cactus-shadow');

        this.enableReachedLeftSide();

        level.appendChild(this.cactusShadow);
    }
    // The main animation (off-screen right to off-screen left) is played by adding the "cactus-to-position-off-screen-left" class
    playAnimation() {
        this.cactusShadow.classList.add('cactus-to-position-off-screen-left');
    }
    // Enable listening to when a cactus shadow has gone fully off-screen on the left side (finished animating)
    enableReachedLeftSide() {
        this.cactusShadow.addEventListener('animationend', this.reachedLeftSide.bind(this));
    }
    // Disable listening to when a cactus shadow has gone fully off-screen on the left side (finished animating)
    disableReachedLeftSide() {
        this.cactusShadow.removeEventListener('animationend', this.reachedLeftSide.bind(this));
    }
    // A cactus shadow has gone fully off-screen on the left side (finished animating)
    reachedLeftSide() {
        this.cactusShadow.remove();
        this.disableReachedLeftSide();
    }
};

class ScoreCounter extends Element {
    constructor(elementClass, resizeAnimationClass) {
        super(elementClass, resizeAnimationClass);
        this.scoreCounter = document.querySelector(elementClass);
        this.points = null;
    }
    // The score-counter becomes slightly bigger and smaller again
    resize() {
        this.playResizeAnimation();
        setTimeout(() => this.endResizeAnimation(), 300);
    }
    // The score-counter resize animation is played (added)
    playResizeAnimation() {
        this.playAnimation();
    }
    // The score-counter resize animation is removed
    endResizeAnimation() {
        this.endAnimation();
    }
    // The score is increased by 1, updated and resized
    increaseScore() {
        this.points++;
        this.updateScore();
        this.resize();
    }
    // The score is reset to 0 and updated
    resetScore() {
        this.points = 0;
        this.updateScore();
    }
    // The score is updated (the text content of the score-counter is changed)
    updateScore() {
        this.scoreCounter.textContent = `Score: ${this.points}`;
    }
};

class Stopwatch extends Element {
    constructor(elementClass) {
        super(elementClass);
        this.stopwatch = document.querySelector(elementClass);
        this.s = null;
        this.min = null;
        this.timer;
    }
    // The seconds are incereases by 1
    increaseS() {
        this.s++;
    }
    // The seconds are set to 0
    resetS() {
        this.s = '00';
    }
    // The minutes are incereases by 1
    increaseMin() {
        this.min++;
    }
    // The minutes are set to 0
    resetMin() {
        this.min = '00';
    }
    // The timer starts running (the timer interval is set)
    enableTimer() {
        this.timer = setInterval(this.runTimer.bind(this), 1000);
    }
    // The timer stops running (the timer interval is cleared)
    disableTimer() {
        clearInterval(this.timer);
    }
    runTimer() {
        // Every second, the amount of seconds increases by 1
        this.increaseS();
        
        // When the minutes reach the number of 60, they are reset
        if(this.min === 60) {
            this.resetMin();
        }
        // When the seconds reach the number of 60, they are reset and the amount of minutes increases by 1
        else if(this.s === 60) {
            this.resetS();
            this.increaseMin();
        }
        
        this.updateTimer();
    }
    // The timer is reset
    resetTimer() {
        this.resetMin();
        this.resetS();
        this.updateTimer();
    }
    // The timer is updated (the text content of the stopwatch is changed)
    updateTimer() {
        if(this.s <= 9 && this.min <= 9) {
            this.s = this.s.toString().padStart(2, '0');
            this.min = this.min.toString().padStart(2, '0');
        }
        else if(this.s <= 9) {
            this.s = this.s.toString().padStart(2, '0');
        }
        else if(this.min <= 9) {
            this.min = this.min.toString().padStart(2, '0');
        }

        this.stopwatch.textContent = `Time: ${this.min}:${this.s}`;
    }
};

class Game {
    constructor(elementClass) {
        this.game = document.querySelector(elementClass);
        this.cactusGenerator;
        this.collisionDetection;
        this.audio = false;
    }
    // The page is loaded
    load() {
        menu.enableClickingElements();

        gameTitle.show();
        setTimeout(() => {
            btnStartGame.show();
            btnStartGame.bringToFocus();

            btnToggleAudio.show();
        }, 500);
        window.removeEventListener('load', game.load);
    }
    // The first game is started by clicking the Start Game button
    start() {
        this.enableElementsAnimationEnd();
        msgHowToJump.setDeviceSpecificMsg();

        btnStartGame.loseFocus();
        btnStartGame.disable();
        btnStartGame.hide();

        gameTitle.hide();

        cloudTop.playIntroAnimation();
        cloudCenter.playIntroAnimation();
        cloudBottom.playIntroAnimation();

        setTimeout(() => {
            sea.playIntroAnimation();
            ground.playIntroAnimation();
            scoreCounter.resetScore();
            stopwatch.resetTimer();
        }, 800);

        setTimeout(() => {
            this.enableCactusGeneration();
        }, 1300);
        
        setTimeout(() => {
            player.playIntroAnimation();
            playerShadow.playIntroAnimation();
    
            btnPauseGame.show();
            scoreCounter.show();
            stopwatch.show();
            msgHowToJump.show();

            this.enablePauseGame();
        }, 1500);

        setTimeout(() => {
            cloudTop.playAnimation();
            cloudCenter.playAnimation();
            cloudBottom.playAnimation();
            
            playerEye.enableBlinking();
        }, 1700);
        
        setTimeout(() => {
            stopwatch.enableTimer();
        }, 1800);
    
        setTimeout(() => {
            player.enableJumping();
        }, 1900);
    }
    // The game is paused by pressing ESCAPE or by clicking the Pause Game button
    pause() {
        const cacti = document.querySelectorAll('.cactus');
        const cactusShadows = document.querySelectorAll('.cactus-shadow');
        
        cacti.forEach(cactusElement => {
            const cactusInstance = cactusElement.cactus;
            cactusInstance.disableCollisionDetection();
        });
        
        this.disablePauseGame();
        this.disableElementsAnimationEnd();
        this.disableCactusGeneration();
        player.disableJumping();
        playerEye.disableBlinking();
        stopwatch.disableTimer();

        player.pauseAnimation();
        playerEye.pauseAnimation();
        playerShadow.pauseAnimation();
        cloudTop.pauseAnimation();
        cloudCenter.pauseAnimation();
        cloudBottom.pauseAnimation();
        cacti.forEach(cactus => new Cactus(cactus).pauseAnimation());
        cactusShadows.forEach(cactusShadow => new Cactus(cactusShadow).pauseAnimation());

        btnPauseGame.disable();
        btnPauseGame.hide();

        btnResumeGame.enable();
        btnResumeGame.show();
        btnResumeGame.bringToFocus();

        headingPaused.show();

        bgDark.show();
    }
    // The game is resumed by clicking the Resume Game button
    resume() {
        const cacti = document.querySelectorAll('.cactus');
        const cactusShadows = document.querySelectorAll('.cactus-shadow');

        cacti.forEach(cactusElement => {
            const cactusInstance = cactusElement.cactus;
            cactusInstance.enableCollisionDetection();
        });

        btnResumeGame.loseFocus();
        btnResumeGame.disable();
        btnResumeGame.hide();

        this.enableElementsAnimationEnd();

        player.resumeAnimation();
        playerEye.resumeAnimation();
        playerShadow.resumeAnimation();
        cloudTop.resumeAnimation();
        cloudCenter.resumeAnimation();
        cloudBottom.resumeAnimation();
        cacti.forEach(cactus => new Cactus(cactus).resumeAnimation());
        cactusShadows.forEach(cactusShadow => new Cactus(cactusShadow).resumeAnimation());
        
        playerEye.enableBlinking();
        this.enableCactusGeneration();
        stopwatch.enableTimer();

        btnPauseGame.enable();
        btnPauseGame.show();

        headingPaused.hide();

        bgDark.hide();

        setTimeout(() => {
            player.enableJumping();
        }, 50);
        setTimeout(() => this.enablePauseGame(), 500);
    }
    // Every consecutive new game is started by clicking the Play Again button
    playAgain() {
        const cacti = document.querySelectorAll('.cactus');
        const cactusShadows = document.querySelectorAll('.cactus-shadow');

        player.endJumpAnimation();
        
        btnPlayAgain.loseFocus();
        bgDark.hide();

        btnResumeGame.disable();
        btnResumeGame.hide();
        
        this.enableElementsAnimationEnd();
        player.resetPosition();
        playerShadow.resetPosition();

        btnPlayAgain.disable();
        btnPlayAgain.hide();
        headingGameOver.hide();
        scoreCounter.hide();
        stopwatch.hide();
        cacti.forEach(cactus => new Cactus(cactus).delete());
        cactusShadows.forEach(cactusShadow => new Cactus(cactusShadow).delete());

        setTimeout(() => {
            scoreCounter.resetScore();
            stopwatch.resetTimer();

            player.show();
            playerShadow.show();
        }, 350);

        setTimeout(() => {
            this.enableCactusGeneration();
        }, 400);
        
        setTimeout(() => {
            player.playIntroAnimation();
            playerShadow.playIntroAnimation();

            btnPauseGame.enable();
            btnPauseGame.show();
            scoreCounter.show();
            stopwatch.show();
        }, 600);

        setTimeout(() => {
            this.enablePauseGame();
            playerEye.enableBlinking();
            stopwatch.enableTimer();

            cloudTop.resumeAnimation();
            cloudCenter.resumeAnimation();
            cloudBottom.resumeAnimation();
        }, 900);

        setTimeout(() => {
            player.enableJumping();
        }, 1000);
    }
    // Enable listening to when the elements have finished animating
    enableElementsAnimationEnd() {
        this.game.addEventListener('animationend', this.elementsAnimationEnded);
    }
    // Disable listening to when the elements have finished animating
    disableElementsAnimationEnd() {
        this.game.removeEventListener('animationend', this.elementsAnimationEnded);
    }
    elementsAnimationEnded(e) {
        // The player has finished animating (it has jumped and landed on the ground again)
        if(e.target.classList.contains('player')) {
            player.endJumpAnimation();
            playerShadow.endJumpAnimation();
        }
        // The player eye has finished animating (it has blinked - closed and opened itself)
        else if(e.target.classList.contains('player-eye')) {
            playerEye.endBlinkAnimation();
        }
        // The score-counter has finished animating (it has become bigger and small again)
        else if(e.target.classList.contains('score-counter')) {
            scoreCounter.endResizeAnimation();
        }
        // The cloud on the top has finished animating (it has gone fully off-screen on the left side)
        else if(e.target.classList.contains('cloud-top')) {
            cloudTop.playAgainRightToLeftAnimation();
        }
        // The cloud in the center has finished animating (it has gone fully off-screen on the left side)
        else if(e.target.classList.contains('cloud-center')) {
            cloudCenter.playAgainRightToLeftAnimation();
        }
        // The cloud on the bottom has finished animating (it has gone fully off-screen on the left side)
        else if(e.target.classList.contains('cloud-bottom')) {
            cloudBottom.playAgainRightToLeftAnimation();
        }
    }
    // Detect whether the device has a touchscreen or not
    isTouchScreenDevice() {
        navigator.maxTouchPoints > 0;
    }
    // Pausing the game is enabled
    enablePauseGame() {
        document.addEventListener('keydown', this.escapePressed);
    }
    // Pausing the game is disabled
    disablePauseGame() {
        document.removeEventListener('keydown', this.escapePressed);
    }
    // The ESCAPE key is pressed
    escapePressed(e) {
        if (e.key === 'Escape') {
            if(game.audio) {
                audioPauseGame.play();
            }
            game.pause();
        }
    }
    // The SPACE key is pressed
    spacePressed(e) {
        if (e.key === ' ') {
            if(game.audio && !audioJump.playing()) {
                audioJump.play();
            }
            player.jump();
            playerShadow.jump();
        }
    }
    // Generate a random number from a range
    randomNum(from, to) {
        const randomNum = Math.floor(Math.random() * (to - from + 1) + from);
        return randomNum
    }
    // Cactus generation is enabled (an interval is set)
    enableCactusGeneration() {
        this.cactusGenerator = setInterval(this.generateCactus.bind(this), this.randomNum(750, 1500));
    }
    // Cactus generation is disabled (an interval is cleared)
    disableCactusGeneration() {
        clearInterval(this.cactusGenerator);
    }
    // A cactus is generated
    generateCactus() {
        const cactus = new Cactus();
        const cactusShadow = new CactusShadow();

        cactus.create();
        cactusShadow.create();

        setTimeout(() => {
            cactus.playAnimation();
            cactusShadow.playAnimation();
        }, 100);

        cactus.enableCollisionDetection();
        this.disableCactusGeneration();
        this.enableCactusGeneration();
    }
    // If the audio is on, it is set to off and vice-versa, the text content of the btnToggle Audio is adjusted accordingly
    toggleAudio() {
        const btnToggleAudio = document.querySelector('.btn-toggle-audio');

        if(this.audio) {
            this.audio = false;
            btnToggleAudio.textContent = 'Sound Off';
        } else {
            this.audio = true;
            btnToggleAudio.textContent = 'Sound On';
        }
    }
};

class Menu {
    constructor(elementClass) {
        this.menu = document.querySelector(elementClass);
    }
    // Enable clicking elements in the menu
    enableClickingElements() {
        this.menu.addEventListener('click', this.elementsClicked);
    }
    elementsClicked(e) {
        // Start Game button clicked
        if(e.target.classList.contains('btn-start-game')){
            if(game.audio) {
                audioClickButton.play();
            }
            game.start();
        }
        // Pause Game button clicked
        else if(e.target.classList.contains('btn-pause-game')) {
            if(game.audio) {
                audioPauseGame.play();
            }
            game.pause();
        }
        // Resume Game button clicked
        else if(e.target.classList.contains('btn-resume-game')) {
            if(game.audio) {
                audioClickButton.play();
            }
            game.resume();
        }
        // Play Again button clicked
        else if(e.target.classList.contains('btn-play-again')) {
            if(game.audio) {
                audioClickButton.play();
            }
            game.playAgain();
        }
        // Toggle Audio button clicked
        else if(e.target.classList.contains('btn-toggle-audio')){
            game.toggleAudio();
            if(game.audio) {
                audioClickButton.play();
            }
        }
    }
};

const game = new Game('.game');
const menu = new Menu('.menu');
const btnToggleAudio = new Element('.btn-toggle-audio');

const audioIncreaseScore = new Howl({
    src: 'projects/jump-over-cacti/sound-effects/audio-increase-score.mp3',
    autoplay: false
});
const audioClickButton = new Howl({
    src: 'projects/jump-over-cacti/sound-effects/audio-clicked-btn.mp3',
    autoplay: false
});
const audioJump = new Howl({
    src: 'projects/jump-over-cacti/sound-effects/audio-jump.mp3',
    autoplay: false
});
const audioGameOver = new Howl({
    src: 'projects/jump-over-cacti/sound-effects/audio-game-over.mp3',
    autoplay: false
});
const audioPauseGame = new Howl({
    src: 'projects/jump-over-cacti/sound-effects/audio-pause-game.mp3',
    autoplay: false
});
const btnPauseGame = new Element('.btn-pause-game');

const scoreCounter = new ScoreCounter('.score-counter', 'text-resize');
const stopwatch = new Stopwatch('.stopwatch');

const gameTitle = new Element('.game-title');
const headingPaused = new Element('.heading-paused');
const headingGameOver = new Element('.heading-game-over');
const btnStartGame = new Element('.btn-start-game');
const btnResumeGame = new Element('.btn-resume-game');
const btnPlayAgain = new Element('.btn-play-again');
const msgHowToJump = new MsgHowToJump('.msg-how-to-jump');

const level = document.querySelector('.level');
const cloudTop = new Cloud('.cloud-top', 'cloud-top-to-position-off-screen-left', 'cloud-top-position-off-screen-right', 'cloud-top-position-gameplay');
const cloudCenter = new Cloud('.cloud-center', 'cloud-center-to-position-off-screen-left', 'cloud-center-position-off-screen-right', 'cloud-center-position-gameplay');
const cloudBottom = new Cloud('.cloud-bottom', 'cloud-bottom-to-position-off-screen-left', 'cloud-bottom-position-off-screen-right', 'cloud-bottom-position-gameplay');
const sea = new Element('.sea', null, 'sea-position-gameplay');
const ground = new Element('.ground', null, 'ground-position-gameplay');
const player = new Player('.player', 'player-jump', 'player-position-gameplay');
const playerEye = new PlayerEye('.player-eye', 'player-eye-blink');
const playerShadow = new Player('.player-shadow', 'player-shadow-resize', 'player-shadow-position-gameplay');

const bgDark = new Element('.bg-dark');


window.addEventListener('load', game.load);