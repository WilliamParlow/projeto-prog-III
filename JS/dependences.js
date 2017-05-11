/*
Construct.js dependences
*/
var predio = {
  XInicial:0,
  YInicial:0,
  XFinal:0,
  YFinal:0
};

var predios = new Array();

/*
  Main.js dependences
*/
var canvas  =  document.querySelector("#canvasGame");
var canvasteste = document.querySelector("#canvasTeste");
var context = canvas.getContext('2d');
var teste =  canvasteste.getContext('2d');
var mousePos;
var mouseclick;
var clicado = false;
var playercriado =false;
var isPlayer1 = true;
var image = new Image();

var hipotenusa;
var intervaloJogada;
/*
projectil.js dependences
*/
var frameRate = 1/50; // Seconds
var frameDelay = frameRate * 2500; // ms
var loopTimer = false;

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





/*
player.js dependences
*/
var player1 = {
  tamanho : { },
  posicao : { }
}

var player2 = {
  tamanho : { },
  posicao : { }
}
