//Es una variable que guarda informacion o datos, en este caso en especifico guarda una direccion(url) de una pagina web que entrega datos de digimones API.
const URL_BASE = 'https://digimon-api.vercel.app/api/digimon';
//Variable que muestra la informacion de URL_BASE y suma los caracteres siguientes, esta operacion se llama concatenacion. 
const URL_CHARACTERS = URL_BASE + '/name';
//Declaro una variable de nombre digimonList.
let digimonList;
let cartabuscarpersonaje;
let dataImg;

//Asi como existen variables y tienen un nombre, las funciones tambien pueden tener.
//Pero que es una funcion? una funcion es un bloque de codigo que puedo ocupar incontables veces dentro de un script o programa.
//Las funciones pueden o no tener nombre y pueden o no tener argumentos/parametros, tambien pueden o no retornar informacion.
//La sintaxis de las funciones es:
// palabra clave o reservada function, nombre de la funcion (si tiene), parentisis y dentro de ellos los argumentos/parametros. Una funcion puede tener ninguno o varios parametros, ellos se separan por una coma (,). Despues se escriben las llave {} y dentro de ellas todo el bloque o cuerpo de la funcion. Recuerda que puede o no llevar la palabra resevada return para entregar un dato.
// function nombreDeLaFuncion(argumento, argumento2) {
//      Cuerpo o Bloque de la funcion.  
//};

//Declaro una funcion de nombre generadorDeFilasParaLaTablaHtml 
function generadorDeFilasParaLaTablaHtml(digimones) {

    //Al interior de la etiqueta selecciona en la linea 36 voy a darle un contenido vacio.
    digimonList.innerHTML = "";

    //Va a iterar sobre digimones uno a uno para modificar la etiqueta html seleccionada por el id
    for (let digimon of digimones) {
        //Dentro de la etiqueta html va a escribir las siguientes etiquetas.
        digimonList.innerHTML +=
            `
            <tr>
                <th scope="row">${digimon.name}</ th> 
                <td><img width="100px" height="100px" src="${digimon.img}"></td> 
                <td>${digimon.level}</td>
            </tr> 
            `;
    };
};

function capturaDato() {
    let nombrePersonaje = document.getElementById("dato").value;
    nombrePersonaje = nombrePersonaje.toLowerCase();
    document.getElementById("tabla_principal").style.display = "none";
    document.getElementById("galeria").style.display = "none";
    document.getElementById("carta").style.display = "block";

    fetch(URL_CHARACTERS + '/' + nombrePersonaje)
        .then(response => response.json())
        .then(datos => {
            console.log(datos);
            tarjeta(datos);
        });
}

function tarjeta(data) {
    carta.innerHTML = "";

    for (let temp of data) {
        carta.innerHTML += ` 
          <div id="tarjSola" class="card mb-3 container" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${temp.img}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">"NOMBRE: ${temp.name}"</h5>
          <p class="card-text">ESPECIE: "${temp.level}"</p>
         </div>
      </div>
    </div>
  </div>
     `
    }
}

function mostrarImagen() {
    let img = document.getElementById("galeria");
    document.getElementById("tabla_principal").style.display = "none";
    document.getElementById("carta").style.display = "none";
    document.getElementById("galeria").style.display = "block";
    

    img.innerHTML = "";
    for (let temp of dataImg) {
        img.innerHTML += ` 
         <div id="card" class="card">
        <img src="${temp.img}" class="card-img-top" alt=" imagen ${temp.name}">
        <div class="card-body">
          <h6 class="card-title">${temp.name}</h6>
          <p class="card-text">${temp.level}</p>
        </div>
      </div>
          
  `
    }
}




$(document).ready(function () {
    //Guardo los datos de la etiqueta, seleccionada mediante su id, llamada digimon-list. Esto genera un nexo entre la etiqueta html mencionada y la variable digimonList en el archivo js.
    digimonList = document.querySelector("#digimon-list");


    // carta = document.getElementById("carta");

    //Busca la direccion de la URL_BASE
    //Hace una solicitud de datos a la URL_BASE y nos responde con una promesa.
    fetch(URL_BASE)
        //Nos da la respuesta de la API, esta la transformamos a un json para que podamos trabajar con ella
        .then(response => response.json())
        //Ya podemos alcanzar los datos y manipularlos.
        .then(datos => {
            console.log(datos)
            //Ejecuto la funcion declarada en la linea 18 
            generadorDeFilasParaLaTablaHtml(datos);
             dataImg = datos;
        });
});



