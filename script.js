const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let numberOfCardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

//globally declare so they can hold the value for longer than scope of click function
//can create conditionals that check, eg. if both vals are undefined, add what was 
//clicked to card1 variable. if only first has value, add what was just clicked
//and compare cards

// TODO: Implement this function!
function handleCardClick(event) {
  if (noClicking) return;
  //has to be at the top the way JS reads it. Once, noClicking has a value, it will not allow the user to 
  //continue to click
  // if (event.target.classList.contains("flipped")) return;
  //if the clicked card is "flipped", keeps the matching cards up. 


  let clickedCard = event.target;
  //the clicked card is the event.target (which element that is clicked)
  clickedCard.style.backgroundColor = clickedCard.classList[0];
  //the clicked card's background color becomes the first class (color);



  if (!card1 && !card2) {
    //if card1 or card 2 have no value,
    // clickedCard.classList.add("flipped");
    //clickedCard gets assigned class of "flipped"
    card1 = clickedCard;
    // console.log(`card 1 is ${card1.classList[0]}`);
    // console.log(`card 2 is ${card2}`);
  } else if (card1 && !card2) {
    // clickedCard.classList.add("flipped");
    //else if card 1 has a value and card 2 is null,
    card2 = clickedCard;
    //card2 becomes the new clickedCard
    // card1.removeEventListener("click", handleCardClick);
    // card2.removeEventListener("click", handleCardClick);
    console.log(`card 1 is ${card1.classList[0]}`);
    console.log(`card 2 is ${card2.classList[0]}`);
  }
  if (card1 && card2) {
    //if both cards have values, the user cannot click anywhere else (noClicking becomes true)
    noClicking = true;
    if (card1.classList[0] === card2.classList[0]) {
      //if the card's color classes are equal, the game is won, and they cannot click anymore
      numberOfCardsFlipped += 2;
      console.log(numberOfCardsFlipped);
      card1.removeEventListener("click", handleCardClick);
      //what does this do?
      card2.removeEventListener("click", handleCardClick);
      //what does this do?
      card1 = null;
      card2 = null;
      noClicking = false;
      //resets so user can continue clicking and matching colors


    } else if (card1.classList[0] !== card2.classList[0]) {
      setTimeout(() => {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        // card1.classList.remove("flipped");
        // card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 1000);
    };
  };
  if (numberOfCardsFlipped === COLORS.length) {
    setTimeout(() => {
      alert('you fucking win, you beautiful bitch!');
    }, 50);
  }

}

createDivsForColors(shuffledColors);

/* */