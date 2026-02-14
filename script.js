const maze = document.getElementById("maze");
const contador = document.getElementById("contador");

const recuerdo = document.getElementById("recuerdo");
const texto = document.getElementById("texto");

const trivia = document.getElementById("trivia");
const pregunta = document.getElementById("pregunta");
const opcionesDiv = document.getElementById("opciones");

const imagen = document.getElementById("imagen");
const video = document.getElementById("video");
const btnContinuar = document.getElementById("btnContinuar");

let recolectados = 0;
let corazonActual = null;

/* MAPA ZIG ZAG */
const mapa = [
  [1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,0,1],
  [1,0,0,0,0,0,1],
  [1,0,1,1,1,1,1],
  [1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1]
];

let jugador = { x: 1, y: 1 };
let meta = { x: 5, y: 5 };

let corazones = [
  {
    x:2,y:1,
    pregunta:"¿Cuál es el nombre de nuestro primer hijo?",
    opciones:["Pancho","René","Emilio"],
    correcta:1,
    text:"Dos adolescentes de 15 años con miradas mutuas, no hay mejor manera de comenzar <3",
    video:"recuerdos/r1.mp4"
  },
  {
    x:4,y:1,
    pregunta:"¿Qué alimento prefieres no comer, pero yo sí?",
    opciones:["Mayonesa","Catsup","Crema"],
    correcta:2,
    text:"Alex, en nuestro primer San Valentín juntos quiero decirte que ese amor especial sigue vigente",
    video:"recuerdos/r2.mp4"
  },
  {
    x:5,y:2,
    pregunta:"¿Quién dijo 'te amo' primero?",
    opciones:["Tú","Yo","Los dos"],
    correcta:0,
    text:"Te aprecio, te adoro, te quiero, te amo, y todos los tés que te puedas imaginar ✨",
    video:"recuerdos/r3.mp4"
  },
  {
    x:3,y:3,
    pregunta:"¿Qué canción de enjambre representa nuestra relación?",
    opciones:["Vínculo","Elemento","La duda"],
    correcta:0,
    text:"Adoro abrazarte, eres mi refugio, mi lugar preferido 🤍",
    video:"recuerdos/r4.mp4"
  },
  {
    x:1,y:3,
    pregunta:"¿Cuál es nuestra fecha de noviazgo?",
    opciones:["02/agosto/2026","02/septiembre/2025","02/agosto/2025"],
    correcta:2,
    text:"Estoy tan feliz y agradecida de tener la fortuna de amarte y ser amada por ti. Algo bien hice en mis otras vidas",
    video:"recuerdos/r5.mp4"
  },
  {
    x:1,y:4,
    pregunta:"¿Cuál regalo crees que es mi favorito?",
    opciones:["Correspondencia","Cámara","Tus cartas"],
    correcta:2,
    text:"Tal vez ya fuímos gatitos 🐱❤️🐱💫 y nos amamos en nuestras 7 vidas",
    video:"recuerdos/r6.mp4"
  },
  {
    x:1,y:5,
    pregunta:"¿Qué nos une?",
    opciones:["El pasado","El presente","Pollo-Man"],
    correcta:2,
    text:"Por nuestra complicidad💕",
    video:"recuerdos/r7.mp4"
  },
  {
    x:3,y:5,
    pregunta:"¿Qué momento fue el comienzo de nuestra relación?",
    opciones:["Mexcaltitan","1ra vez en tu casa","Concierto enjambre"],
    correcta:0,
    text:"Por tu amor, compañia, por los detalles mutuos ",
    video:"recuerdos/r8.mp4"
  },
  {
    x:4,y:5,
    pregunta:"¿Cuál es nuestro sabor de frappe?",
    opciones:["Mocha","Matcha","Caramelo"],
    correcta:1,
    text:"Por el grandioso y amoroso chico que me acompaña en mi vida.  ",
    img:"recuerdos/r9.jpg"
  },
  {
    x:5,y:5,
    pregunta:"¿Lo nuestro tiene un fin?",
    opciones:["Esta no es la respuesta","No","Esta tampoco"],
    correcta:1,
    text:"Míranos, dos adultos de 27 años que se aman, sin duda, conocerte es una de las mejores cosas que han pasado en mi vida. No me imagino sin tí. Volvería a hablar de Pollo-Man en todos los universos, volvería a ser tu compañera de baile, volvería a ser tu confidente, ser tu amiga y todo lo que tu vida necesite ❤️TE AMO ALEX RODRÍGUEZ❤️",
    img:"recuerdos/r10.jpg"
  }
];

function dibujar() {
  maze.innerHTML = "";
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      const c = document.createElement("div");
      c.className = "cell " + (mapa[y][x] ? "wall" : "path");

      if (jugador.x === x && jugador.y === y) c.classList.add("player-img");
      if (meta.x === x && meta.y === y) c.classList.add("goal-img");

      corazones.forEach(h => {
        if (h.x === x && h.y === y) {
          c.innerHTML = "❤️";
          c.classList.add("heart");
        }
      });

      maze.appendChild(c);
    }
  }
}

document.addEventListener("keydown", e => {
  if (!recuerdo.classList.contains("hidden")) return;

  let nx = jugador.x;
  let ny = jugador.y;

  if (e.key === "ArrowUp") ny--;
  if (e.key === "ArrowDown") ny++;
  if (e.key === "ArrowLeft") nx--;
  if (e.key === "ArrowRight") nx++;

  if (mapa[ny][nx] === 0) {
    jugador = { x: nx, y: ny };
    revisarCorazon();
    dibujar();
  }
});

function revisarCorazon() {
  corazones.forEach((h, i) => {
    if (h.x === jugador.x && h.y === jugador.y) {
      corazonActual = h;
      corazones.splice(i, 1);
      mostrarTrivia();
    }
  });
}

function mostrarTrivia() {
  recuerdo.classList.remove("hidden");
  trivia.classList.remove("hidden");
  texto.classList.add("hidden");
  btnContinuar.classList.add("hidden");
  imagen.classList.add("hidden");
  video.classList.add("hidden");

  pregunta.textContent = corazonActual.pregunta;
  opcionesDiv.innerHTML = "";

  corazonActual.opciones.forEach((op, i) => {
    const btn = document.createElement("button");
    btn.textContent = op;
    btn.onclick = () => validarRespuesta(i);
    opcionesDiv.appendChild(btn);
  });
}

function validarRespuesta(i) {
  if (i === corazonActual.correcta) {
    mostrarRecuerdo();
  } else {
    alert("💚 Casi… intenta otra vez");
  }
}

function mostrarRecuerdo() {
  trivia.classList.add("hidden");
  texto.textContent = corazonActual.text;
  texto.classList.remove("hidden");

  if (corazonActual.img) {
    imagen.src = corazonActual.img;
    imagen.classList.remove("hidden");
  }

  if (corazonActual.video) {
    video.src = corazonActual.video;
    video.muted = true;
    video.classList.remove("hidden");
    video.play();
  }

  recolectados++;
  contador.textContent = recolectados;
  btnContinuar.classList.remove("hidden");
}

btnContinuar.onclick = () => {
  recuerdo.classList.add("hidden");
  texto.classList.add("hidden");
  imagen.classList.add("hidden");
  video.classList.add("hidden");
  video.pause();
};

dibujar();