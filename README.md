# WDI-Project-I
## blackJack
simple blackjack game

## User Stories
1. As a user, I want to be able to start a new game by pressing a button.
2. As a user, I want to be able to see my cards.
3. As a user, I want to be able to 'hit' and see my new card.
4. As a user, I want to be able to be told if I bust.
5. As a user, I want to be able to be told if I win.

##About the project...
###technologies used
- html5: Structure
- css3: Style
- javascript: Function
- jquery: DOM manipulation
- google fonts: import font
- git: version control
- gitHub: remote version control and hosting
- html validator (html5.validator.nu): check validity of html
- css validator (jigsaw.w3.org/css-validator/): check validity of css

###approach taken
1. Write user stories to define MVP
2. Meet MVP with jquery soup
3. Refactor into model and view objects
4. Add betting

###installation instructions
1. Written and tested in Chrome - will likely need more work for cross-browser compatibility

###unsolved problems
1. Will allow player to start a hand if an attempt to bet has been made. Should actually require a bet to be made
2. No payout multipliers
3. Should have a player constructor rather than holding properties in the model (first step toward multiplayer)
4. Dealer's hole card not actually hidden, text-color just changed to white (problems with alignment when hidding elements)
5. Needs delay as cards are delt (or not)
6. Could improve aesthetics
