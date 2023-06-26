const gameContainer = document.getElementById("game");
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
let matchCount = COLORS.length;
let revealedCount = 0;
let activeTile = null;
let awaitingEnd = false;



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
    newDiv.classList.add('tile');
    newDiv.setAttribute('data-color', color)
    newDiv.setAttribute('data-revealed', 'false');

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", function(e){
      const revealed = newDiv.getAttribute('data-revealed');
      
      if (awaitingEnd || revealed === 'true' || newDiv === activeTile){
        return;
      }

        newDiv.style.backgroundColor = color;
        // adds the color attribute to the style background color so the color is displayed when clicked
        if(!activeTile){
          activeTile = newDiv;
          return;
        }
        const colorToMatch = activeTile.getAttribute('data-color');

        if(colorToMatch === color){
          activeTile.setAttribute('data-revealed', 'true');
          newDiv.setAttribute('data-revealed', 'true');

          activeTile = null;
          awaitingEnd = false;
          revealedCount += 2;

          if (revealedCount === matchCount){
            alert('You Win! refresh to replay')
          }
          return;
        }
        // when revealed count = matchcount all of the tiles have been matched and the game is over

        awaitingEnd = true;
        setTimeout(function(){
          newDiv.style.backgroundColor = null;
          activeTile.style.backgroundColor = null;

          awaitingEnd = false;
          activeTile = null;
        }, 1000)
// if awaitning end is true (meaning they have been flipped) reset the background color of both tiles. This happens after the 1 sec set timeout. 
    });

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  console.log("you just clicked", event.target);
}



// when the DOM loads
createDivsForColors(shuffledColors);
