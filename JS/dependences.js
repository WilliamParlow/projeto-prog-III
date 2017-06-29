/* menu*/
var loadingScreen;
var isRestart = false;

/* Playr life references */

var player1Life = {
  diamonds: $('.player1-life'),
  index: 2
}

var player2Life = {
  diamonds: $('.player2-life'),
  index: 0
}

/* Player UI reference */
var playersUI = $(".player-UI");

/* Referencia de quando o player pode jogar */
var playable = true;

/* imagens para seleção de personagem*/
var opcaoPlayer1;
var opcaoPlayer2;
var opcoes = []; // vetor que armazena todas as imagens das opcoes de jogadores
var politicians =["obama","elizabeth","trump","justin","putin","lula","dilma","kim"];
var player1selecionado = false;
var player2selecionado = false;


/*
Construct.js dependences
*/


var predios = new Array();
var indicePredios = 0;
/*
Main.js dependences
*/
var canvas  =  document.querySelector("#canvasGame");
var canvasTemporario = document.querySelector("#canvasTemporario");
var context = canvas.getContext('2d');
var contextoTemporario =  canvasTemporario.getContext('2d');
var mousePos;
var mouseclick;
var clicado = false;
var playercriado =false;
var isPlayer1 = true;
var hipotenusa;

/*
jogada.js dependences
*/
var frameRate = 1/500; // Seconds
var frameDelay = frameRate * 2500; // ms
var numeroJogada = 0;
var projectilPosIniX;
var projectilPosIniY;
var num; //define o numero do player na frase "vez do player x"
var projectilAngle = 0; // angulo da imagem do projetil.
var windForce; // recebe o valor da força do vento

var projectilPlayer1 = {
  position: {x: 0, y: 0},
  velocity: {x: 10, y: 0},
  mass: 0.1, //kg
  radius: 15, // 1px = 1cm
  restitution: -0.7,
  Cd: 0.47,  // Dimensionless
  rho: 1.22, // kg / m^3
  A: Math.PI * this.radius * this.radius / (10000), // m^2
  ag: 9.81,  // m / s^2
  image: new Image()
};

var projectilPlayer2 = {
  position: {x: 0, y: 0},
  velocity: {x: 0.1, y: 0},
  mass: 0.1, //kg
  radius: 15, // 1px = 1cm
  restitution: -0.7,
  Cd: 0.47,  // Dimensionless
  rho: 1.22, // kg / m^3
  A: Math.PI * this.radius * this.radius / (10000), // m^2
  ag: 9.81,  // m / s^2
  image: new Image()
};

var player1 = {
  name: 'Player 1',
  tamanho : { },
  posicao : { },
  vida:3
};

var player2 = {
  name: 'Player 2',
  tamanho : { },
  posicao : { },
  vida:3
};

var damages = []; // salva todos os danos, de todos os prédios
