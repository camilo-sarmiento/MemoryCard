const cols = 14;
const rows = 30;

const gamePlace = document.getElementById("game");
const correctCardPlace = document.getElementById("cardCorrectPlace");

let cardSelected = [];
var iconos = [];
var card = [];

function reset(){
  console.log(correctCardPlace.childElementCount)
  for (let i = 0; correctCardPlace.childElementCount > 0; i++) {
    document.getElementById("cardCorrect").remove();
    
  } 

cardSelected = [];
iconos = [];
card = [];

  cargarIconos();
  createCard();
}
cargarIconos();

function cargarIconos() {
  iconos = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7"
  ];
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
    console.log(cardSelected);
  }
  if (cardSelected.length === 2) {
    deselected(cardSelected, i);
    cardSelected = [];
  }
}
let cardCorrect= [];
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

      //backElement1.style.transform = 'rotateY(0deg)';
      //backElement2.style.transform = 'rotateY(0deg)';
    } else {
      backElement1.style.backgroundColor = "#fff";
      backElement2.style.backgroundColor = "#fff";
      console.log(i)
      
      cardCorrect.push( `
      <div class="card-area" id="card-area${i}" onclick="cardSelect(${i})">
        <div class="card" id="card ${i}" style="transform: rotateY(180deg);" >
            <div class="face Front" id="front${i}">
             </div>
            <div class="face Back" id="back${i}"><div class= "border"></div>
            <div class= "label">${iconos[0]}</div><img src="img/${imgList[0]}" alt=""></div>
        </div>
    </div>`);
    if (i % 2 == 0){
      correctCardPlace.appendChild(document.getElementById("card-area" + i))
      document.getElementById("card-area" + i).id = 'cardCorrect'
      document.getElementById("card-area" + (i + 1)).style.display = 'none'
      
    }else{
      correctCardPlace.appendChild(document.getElementById("card-area" + i))
      document.getElementById("card-area" + i).id = 'cardCorrect'
      document.getElementById("card-area" + (i - 1)).style.display = 'none'
    }
      
    }
  }, 1000);
}


createCard();

let selecciones = [];
