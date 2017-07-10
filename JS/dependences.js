/* menu*/
var selecionado = false; // verifica se foi selecinada a opção
var selecionando = false; // status que fica true quando a tela de seleção está aberta
var loadingScreen;
var isRestart = false; // status que fica true quando a tela de restart (tela final) fica aberta
var optionSelectedtemp = undefined; // armazena temporariamente a opção selecionada
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
var opcaoPlayer1; //armazena opção selecionada do player1
var opcaoPlayer2; // armazena opção selecionada do player2
var opcoes = []; // vetor que armazena todas as imagens das opcoes de jogadores
var politicians =["obama","elizabeth","trump","justin","putin","lula","dilma","kim"]; // opções possiveis, dessa forma fica fácil alterar algum personagem se quisermos
var player1selecionado = false;//variavel de controle
var player2selecionado = false;


/*
Construct.js dependences
*/


var predios = new Array(); //array de todos os prédios inteiros
var indicePredios = 0;
/*
Main.js dependences
*/
var canvas  =  document.querySelector("#canvasGame");
var canvasTemporario = document.querySelector("#canvasTemporario");
var context = canvas.getContext('2d'); // contexto principal, onde é desenhado o fundo e outras coisas mais fixas
var contextoTemporario =  canvasTemporario.getContext('2d'); // contexto secundário, é nele que elementos que surgem rapidamente na tela são desenhados
var mousePos; //posição do mouse
var mouseclick; // posição do click do mouse
var clicado = false; // variavel controle'
var playercriado =false; // variavel controle
var isPlayer1 = true; // variavel importante! é baseada nela que sabemos de quem é a vez de jogar, quem perde vida, quem pode ser destruido, de onde o projetil sai, etc.
var hipotenusa; // hipotenusa :D

/*
jogada.js dependences
*/
var frameRate = 1/500; // Seconds
var frameDelay = frameRate * 2500; // ms
var numeroJogada = 0; // indica que é a primeira jogada de um player
var projectilPosIniX; //posição inicial do projetil em x
var projectilPosIniY; // em y
var num; //define o numero do player na frase "vez do player x"
var projectilAngle = 0; // angulo da imagem do projetil.
var windForce; // recebe o valor da força do vento

var projectilPlayer1 = { // objeto do projetil
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

var player1 = { // objeto do player
  name: 'Player 1',
  tamanho : { },
  posicao : { },
  vida:3,
  image : new Image()
};

var player2 = { // objeto do player
  name: 'Player 2',
  tamanho : { },
  posicao : { },
  vida:3,
  image : new Image()
};

var damages = []; // salva todos os danos, de todos os prédios
