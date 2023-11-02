# Jump Over Cacti!

![Jump Over Cacti! preview](images/readme/jump-over-cacti-laptop.jpg)

## Table Of Contents

* [Description](#description)
* [How To Play The Game](#how-to-play-the-game)
* [Code](#code)
* [Feedback](#feedback)
* [Author](#author)

## Description

Jump Over Cacti! is an endless runner browser video game that was inspired by the Dinosaur Game, which runs in Google Chrome when there is no internet connection.

The gameplay is straightforward, your job is to jump over as many cacti as possible and get as many points as you can.

Have fun and remember to jump over the cacti!


## How To Play The Game

To play Jump Over Cacti!, all you have to do is to click the following link <https://peterroman.codes/jump-over-cacti>, which takes you directly to the game.

When you're in the game's main menu, you can start the game by pressing the "Start Game" button. To toggle sound effects, you can press the "Sound Off/On" button anytime throughout the game.

When the game starts, it prompts you with a short message explaining the controls. They are not complicated at all. In order to jump, you have to either:
* press the SPACE key on your keyboard 
* tap the screen anywhere on touchscreen devices
* alternatively, you can also click anywhere on the screen on desktop devices

As your character starts running, after a few moments you will notice cacti spawning on the right side of the screen, and getting closer to you, because the character is running towards them. Your job is to jump over as many of these cacti as possible.

Every time you successfully jump over a cactus, you get 1 extra point, and the cactus eventually goes away from the screen on the left side. If you happen to touch a cactus, it is game over, and your character fades away. You can start a new game by pressing the "Play Again" button. When you do so, the cacti on screen disappear, and the score and the timer reset.

During the gameplay, it is also possible to pause the game either by:
* pressing the ESC key
* pressing the "Pause Game" button

When you're ready to continue playing, press the "Resume Game" button.

## Code

Technologies used:
* HTML
* CSS
* JavaScript
* Howler.js
* GarageBand

Concepts applied:

* CSS
    * transitions
    * animations
    * pseudo-classes
    * pseudo-elements
    * variables
    * media queries
* JavaScript
    * control flow
    * web APIs
    * object-oriented programming
    * adding and removing event listeners

### Features

Current features:

* animations
    - [x] clouds intro animation (they move from the bottom of the screen to the top)
    - [x] clouds gameplay animation (they move from the right side of the screen to the left)
    - [x] character intro animation (it appears on screen from the left side as if it was running)
    - [x] character jump animation (it goes up and down again)
    - [x] character shadow jump animation (it resizes as the character goes up and down)
    - [x] character blink animation (occasionally, the character blinks)
    - [x] cacti animation (they move from the right to the left side of the screen)
    - [x] scoreboard animation (every time you get 1 extra point, the scoreboard increases its size and decreases again)
    - [x] fade in and fade out animations (present on many different elements throughout the game)
- [x] starting the game
- [x] pausing the game
- [x] resuming the game
- [x] starting a new game when it is game over
- [x] incrementing the score
- [x] timer running
- [x] ability to toggle sound effects
- [x] ability to jump
- [x] collision with the cacti
- [x] generating new cacti all the time
* responsive design
    - [x] the game adapts to all screen sizes and is fully playable on all devices

Future features:

* no future features are currently planned

### Bugs And Issues (Work In Progress)

* the gameplay experience isn't the same across all screen sizes
    * while the game is fully responsive and fully playable on all devices, the experience isn't the same
    * the character's jump has the same duration across all screen sizes, but the cacti move slower on smaller screen sizes, and faster on larger screen sizes
    * the players have to time their jumps very differently

## Feedback

In case you would like to provide feedback on this project, feel free to contact me at peter.roman24[at]gmail.com.

Any feedback is appreciated as I am always trying to improve my skills and work.

## Author

This project is created and maintained by me, Peter Roman.

Connect with me:
* [GitHub](https://github.com/peterRomanDev)
* [LinkedIn](https://www.linkedin.com/in/proman2/)
