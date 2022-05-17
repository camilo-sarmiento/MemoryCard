const cols = 4;
const rows = 30;

const gamePlace = document.getElementById("game");


const correctCardPlace = document.getElementById("cardCorrectPlace");
const mistakePlace = document.getElementById("errorPlace");
const maxWrong = 5;

let mistakes = 0;
let errorCounter=[];
let cardSelected = [];
var iconos = [];
var card = [];
let cardCorrect = [];


console.log(mistakePlace.childElementCount != 0)
console.log(mistakePlace.childElementCount != 0)
function reset() {

  setTimeout(() => {
    for (let i = 0; correctCardPlace.childElementCount > 0; i++) {
    document.getElementById("cardCorrect").remove();
  }
  errorCounter=[];
  mistakes = 0;
  cardSelected = [];
  iconos = [];
  card = [];

  gamePlace.style.backgroundImage = 'none';

  mistakesCount();
  cargarIconos();
  createCard();
  }, 5000);
  
}

mistakesCount();
cargarIconos();

function mistakesCount() {
  for (let i = 0; i < maxWrong; i++) {
    errorCounter.push(`
    <button class="mistake" id="mistake${i}">
      
  </button>`);
    const element = document.createElement("button");
    element.className = "mistake";
    element.id = "mistake" + i;
    mistakePlace.appendChild(element);
    mistakePlace.innerHTML = errorCounter.join(' ')
  }
}

function cargarIconos() {
  iconos = ["1", "2", "3", "4", "5", "6", "7"];
  imgList = [];
}

function createCard() {
  for (let i = 0; i < cols; i++) {
    imgList.push(`btn ${i}.png`);

    card.push(`
    <div class="card-area" id="card-area${i}" onclick="cardSelect(${i})">
      <div class="card" id="card ${i}" >
          <div class="face Front" id="front${i}">
           </div>
          <div class="face Back" id="back${i}"><div class= "border"></div>
          <div class= "label">${iconos[0]}</div><img src="img/${imgList[0]}" alt=""></div>
      </div>
  </div>`);
    if (i % 2 == 1) {
      imgList.splice(0, 1);
      iconos.splice(0, 1);
    }
    card.sort(() => Math.random() - 0.5);
    gamePlace.innerHTML = card.join(" ");
  }
}

function cardSelect(i) {
  const cardElement = document.getElementById("card " + i);

  if (cardElement.style.transform != "rotateY(180deg)") {
    cardElement.style.transform = "rotateY(180deg)";

    cardSelected.push(i);
  }

  if (cardSelected.length === 2) {
    deselected(cardSelected, i);
    cardSelected = [];
  }
}

function deselected(cardSelected, i) {
  const backElement1 = document.getElementById("back" + cardSelected[0]);
  const backElement2 = document.getElementById("back" + cardSelected[1]);
  const frontElement1 = document.getElementById("front" + cardSelected[0]);
  const frontElement2 = document.getElementById("front" + cardSelected[1]);
  console.log(backElement1.innerHTML != backElement2.innerHTML);
  setTimeout(() => {
    if (backElement1.innerHTML != backElement2.innerHTML) {
      document.getElementById("card " + cardSelected[0]).style.transform =
        "rotateY(0deg)";
      document.getElementById("card " + cardSelected[1]).style.transform =
        "rotateY(0deg)";

      //sound Error

      if (mistakes < maxWrong) {
        const audioError = new Audio("Audio/ErrorCard.wav");
        audioError.play();

        document.getElementById("mistake" + mistakes).id = "errorCreate";
        mistakes++;
      } else if (mistakes === maxWrong) {
        const audioLose = new Audio("Audio/lose.wav");
        audioLose.play();
        reset();
      }
    } else {
      
      const audioCorrectCard = new Audio("Audio/CorrectCard.wav");
      audioCorrectCard.play();

      if (i % 2 == 0) {
        correctCardPlace.appendChild(document.getElementById("card-area" + i));
        document.getElementById("card-area" + i).id = "cardCorrect";

        document.getElementById("card-area" + (i + 1)).style.display = "none";
      } else {
        correctCardPlace.appendChild(document.getElementById("card-area" + i));
        document.getElementById("card-area" + i).id = "cardCorrect";

        document.getElementById("card-area" + (i - 1)).style.display = "none";
      }
      

      if(correctCardPlace.childElementCount === cols/2){
        const audioWin = new Audio('Audio/win.wav');
        audioWin.play()
        gamePlace.style.backgroundImage = 'url(Video/Win_animation.gif)';
        gamePlace.style.backgroundSize = 'contain';
        gamePlace.style.backgroundPosition = 'center';
        reset()
      }
    }
  }, 1000);
}

createCard();
