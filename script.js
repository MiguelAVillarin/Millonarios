const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let totalDinero;
// Vector para almacenar los usuarios
let userList = [];

class Usuario {
  constructor(name, money) {
    this.name = name;
    this.money = money;
  }
}
// Función que obtiene de la API un nombre aleatorio,
// genera una cantidad de dinero aleatoria cuyo máximo es 1.000.000
// y añade al usuario con ambos datos
async function getRandomUser() {
  let res = await fetch('https://randomuser.me/api');
  let data = await res.json();
  let user = data.results[0];
  // TODO: Crea un objeto usuario (newUser) que tenga como atributos: name y money
  
  let newUser=new Usuario(user.name.first,Math.floor(Math.random() * 1000001));
  addData(newUser);
}

// TODO: Función que añade un nuevo usuario (objeto) al listado de usuarios (array)
function addData(obj) {
  userList.push(obj);
  updateDOM();
}

// TODO: Función que dobla el dinero de todos los usuarios existentes
function doubleMoney() {
  // TIP: Puedes usar map()
  userList.forEach(element => {
    element.money=element.money*2;
  });
  updateDOM();
}

// TODO: Función que ordena a los usuarios por la cantidad de dinero que tienen
function sortByRichest() {
  // TIP: Puedes usar sort()
  userList.sort(comparar);
  updateDOM();
}

function comparar( a, b ) {
  if ( a.money < b.money ){
    return 1;
  }
  if ( a.money > b.money ){
    return -1;
  }
  return 0;
}

// TODO: Función que muestra únicamente a los usuarios millonarios (tienen más de 1.000.000)
function showMillionaires() {
  // TIP: Puedes usar filter()
  userList = userList.filter((user) => user.money >= 1000000);
  updateDOM();
}

// TODO: Función que calcula y muestra el dinero total de todos los usuarios
function calculateWealth() {
  // TIP: Puedes usar reduce ()
  totalDinero=0

  userList.forEach(element => {
    totalDinero+=element.money;
  });

  let totalDiv=document.createElement("div");
  totalDiv.innerHTML=`<h3 class="total">
  <strong>Dinero total:</strong> ${formatMoney(totalDinero)}
  </h3>`;
  main.appendChild(totalDiv);
}

// TODO: Función que actualiza el DOM
function updateDOM() {
  // TIP: Puedes usar forEach () para actualizar el DOM con cada usuario y su dinero

  let personasArray = Array.prototype.slice.call(document.getElementsByClassName("person"), 0);
  
  for(element of personasArray){
    element.remove();
  }

  userList.forEach(userAux => {
    let div=document.createElement("div");
    div.innerHTML=`<div class="person">
    <strong>${userAux.name}</strong> ${formatMoney(userAux.money)}
    </div>`;
    main.appendChild(div);
  });
}

// Función que formatea un número a dinero
function formatMoney(number) {
  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') + '€';
}

// Obtenemos un usuario al iniciar la app
getRandomUser();

// TODO: Event listeners
addUserBtn.addEventListener('click',getRandomUser);
doubleBtn.addEventListener('click',doubleMoney);
showMillionairesBtn.addEventListener('click',showMillionaires);
sortBtn.addEventListener('click',sortByRichest);
calculateWealthBtn.addEventListener('click',calculateWealth);