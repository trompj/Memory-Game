//Justin Tromp
//Date: 12/19/2018
//Udacity Front End Web Development - Matching Game

/* Cards array holds all cards in deck */
const card = document.getElementsByClassName('card');
let cards = [...card];

//Stars array to add and remove stars
const star = document.getElementsByClassName('stars');
let starsArray = star[0].getElementsByClassName('fa');

//Set resetButton variable to restart class
const reset = document.getElementsByClassName('restart');

//Card variables and move counter variable
let selectionCount = 0;
let selectionOne, selectionTwo;
let selectionOneNode, selectionTwoNode;

//Move counter variables to control move counter.
let moveCount = 0;
let moveCounter = document.getElementsByClassName('moves')

//Counter to watch for win condition
let cardMatchCounter = 0;

//modalPopUp variable to control pop up.
let modalPopUp = document.getElementsByClassName('modal-popup');

//Variables for timer
let startTime = Date.now();
let endTime = 0;
let timeElapsed = 0;
let timeMinDisplay = document.getElementsByClassName('time-min')[0];
let timeSecDisplay = document.getElementsByClassName('time-sec')[0];

//Variable to add stars to modal
let starModalNum = document.getElementsByClassName('stars-modal')[0];


//Function to get time elapsed for end of game and add to html
function timeElapsedFunc() {
let timeElapsedMin = 0;
let timeElapsedSec = 0;
    endTime = Date.now();
    
    //Converts ms time to seconds and stores in timeElapsed.
    //Also calculate for Minutes and Seconds
    timeElapsed = (endTime - startTime) * .001;
    timeElapsedMin = parseInt(timeElapsed/60);
    timeElapsedSec = parseInt(timeElapsed%60);
    
    //Add minutes and seconds to end-game modal
    timeMinDisplay.innerHTML = timeElapsedMin + " Minutes";
    timeSecDisplay.innerHTML = timeElapsedSec + " Seconds";
    
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

//Create constant variable deck for .deck
const deck = document.querySelector('.deck');

//Function to shuffle cards and randomly place on board
function gameLoad () {
    //Start timer for time elapsed
    startTime = Date.now();
    endTime = 0;
    
    //Reset move and cardMatch counters
    moveCount = 0;
    moveCounter[0].innerHTML = moveCount;
    moveCounter[1].innerHTML = moveCount;
    cardMatchCounter = 0;
    
    //Reset stars rating
    starsArray[1].style.visibility = 'visible';
    starsArray[2].style.visibility = 'visible';
    starModalNum.innerHTML = "3/3";

    //Reset modal screen
    modalPopUp[0].style.visibility = 'hidden';
    
    let shuffledCardsArray = shuffle(cards);
    //Loop to reset all cards to 'card' without being shown and places cards on board
    for (let count=0; count < shuffledCardsArray.length; count++){
        [].forEach.call(shuffledCardsArray, function(item){ deck.appendChild(item);});
        shuffledCardsArray[count].classList = 'card';
    }
    
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
//Select card and flip it over/check for matches.
function cardSelected() {
    if (this.classList == 'card' && selectionCount < 2) {
        selectionCount += 1;
        this.classList.toggle('open');
        this.classList.toggle('show');
        
        if (selectionCount == 1) {
            selectionOne = this.classList;
            selectionOneNode = this.childNodes;
        }
        if (selectionCount == 2) {
            selectionTwo = this.classList;
            selectionTwoNode = this.childNodes;
        }
                    
    if (selectionCount == 2 && (selectionOneNode[1].classList[1] != selectionTwoNode[1].classList[1])) {
        setTimeout(maxGuesses, 750);
    } else if (selectionOneNode[1].classList[1] === selectionTwoNode[1].classList[1]) {
        cardMatch();
        selectionCount = 0;
        selectionOne.length = null;
        selectionTwo.length = null;
        selectionOneNode.length = null;
        selectionTwoNode.length = null;
    }
    }
    
}

//If two cards are selected without a win, reset selection counter and flip cards back over
function maxGuesses () {
    selectionCount = 0;
    selectionOne.toggle('open');
    selectionOne.toggle('show');        
    selectionTwo.toggle('open');
    selectionTwo.toggle('show');
     
    //Set variables to null to avoid bugs when selecting in secondary rounds.
    selectionOne = null;
    selectionTwo = null;
    selectionOneNode = null;
    selectionTwoNode = null; 

    //Update move counter
    moveCount += 1;
    moveCounter[0].innerHTML = moveCount;    
    
    //Update star rating
    starRating();

}

//If two cards match, then toggle both to match
function cardMatch() {
    selectionOne.toggle('match');
    selectionTwo.toggle('match');
    
    //Update move and cardMatch counters
    moveCount += 1;
    moveCounter[0].innerHTML = moveCount;
    cardMatchCounter += 1;
    //If cardMatch counter is 8, then a win is acheived.
    if (cardMatchCounter == 8) {
        congratulationsScreen();
    }
    
    //Update star rating
    starRating();
}

//Function adjusts star-rating as needed. 3 stars for less than 10 moves, 2 stars for less than 15 moves
//and 1 star for 15 or more moves.
function starRating() {
    if (moveCount == 10) {
        starsArray[2].style.visibility = 'hidden';
        starModalNum.innerHTML = "2/3";
    } if (moveCount == 15) {
        starsArray[1].style.visibility = 'hidden';
        starModalNum.innerHTML = "1/3";
    }
}

function congratulationsScreen() {
    moveCounter[1].innerHTML = moveCount;
    timeElapsedFunc();
    modalPopUp[0].style.visibility = 'visible';
}


//Loop to add event listeners to each card on the board
for (let count=0; count < cards.length; count++) {
    cards[count].addEventListener('click', cardSelected);
}
