const cols = 6;
const rows = 30;

const gamePlace = document.getElementById("game");

let cardSelected = [];
var iconos = [];
var card = [];

cargarIconos();

function cargarIconos() {
  iconos = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "ñ", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
}

function createCard() {
  for (let i = 0; i < cols; i++) {
    card.push(`
    <div class="card-area" id="card-area${i}" onclick="cardSelect(${i})">
      <div class="card" id="card ${i}" >
          <div class="face Front" id="front${i}"></div>
          <div class="face Back" id="back${i}">${iconos[0]}</div>
      </div>
  </div>`);
    if (i % 2 == 1) {
      iconos.splice(0, 1);
    }
    card.sort(() => Math.random() - 0.5);
    gamePlace.innerHTML = card.join(" ");
  }
}

function cardSelect(i){
  const cardElement = document.getElementById("card " + i);
  if(cardElement.style.transform != "rotateY(180deg)"){
    cardElement.style.transform = 'rotateY(180deg)';
    cardSelected.push(i)
    console.log(cardSelected)
  }
  if(cardSelected.length === 2){
    deselected(cardSelected, cardElement);
    cardSelected = [];
  }
}
function deselected(cardSelected,cardElement){
  const backElement1 = document.getElementById('back' + cardSelected[0])
  const backElement2 = document.getElementById('back' + cardSelected[1])
  const frontElement1 = document.getElementById('front' + cardSelected[0])
  const frontElement2 = document.getElementById('front' + cardSelected[1])
  console.log(backElement1.innerHTML != backElement2.innerHTML)
setTimeout(() => {
  if (backElement1.innerHTML != backElement2.innerHTML){
  document.getElementById("card " + cardSelected[0]).style.transform = 'rotateY(0deg)'
  document.getElementById("card " + cardSelected[1]).style.transform = 'rotateY(0deg)'
 
  //backElement1.style.transform = 'rotateY(0deg)';
  //backElement2.style.transform = 'rotateY(0deg)';
  }else{
    backElement1.style.backgroundColor = '#fff'
    backElement2.style.backgroundColor = '#fff'
  }
}, 1000);
}
createCard();

let selecciones = [];