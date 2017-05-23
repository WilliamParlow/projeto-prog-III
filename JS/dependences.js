/* imagens para seleção de jogador*/
var opcaoPlayer1;
var opcaoPlayer2;
var preencheArray = function(src){ //função que preenche os vetores opcoes/imagePlayers e imageProjeteis
  var img = new Image();
    img.src   = src;
    return img;
};
var opcoes = []; // vetor que armazena imagens das opcoes de jogadores
opcoes.push(preencheArray('img/select_obama.jpg'));
opcoes.push(preencheArray('img/select_kim.jpg'));
opcoes.push(preencheArray('img/select_elizabeth.jpg'));
opcoes.push(preencheArray('img/select_trump.png'));
opcoes.push(preencheArray('img/select_lula.jpg'));
opcoes.push(preencheArray('img/select_dilma.jpg'));
opcoes.push(preencheArray('img/select_putin.jpg'));
opcoes.push(preencheArray('img/select_justin.jpg'));

var imagePlayers = []; //vetor de imagens dos personagens ingame
imagePlayers.push(preencheArray('img/ingame_obama.png'));
imagePlayers.push(preencheArray('img/ingame_kim.png'));
imagePlayers.push(preencheArray('img/ingame_elizabeth.png'));
imagePlayers.push(preencheArray('img/ingame_trump.png'));
imagePlayers.push(preencheArray('img/ingame_lula.png'));
imagePlayers.push(preencheArray('img/ingame_dilma.png'));
imagePlayers.push(preencheArray('img/ingame_putin.png'));
imagePlayers.push(preencheArray('img/ingame_justin.png'));

var imageProjeteis = []; // imagens dos projeteis de cada personagem
imageProjeteis.push(preencheArray('img/projetil_obama.png'));
imageProjeteis.push(preencheArray('img/projetil_kim.png'));
imageProjeteis.push(preencheArray('img/projetil_elizabeth.png'));
imageProjeteis.push(preencheArray('img/projetil_trump.png'));
imageProjeteis.push(preencheArray('img/projetil_lula.png'));
imageProjeteis.push(preencheArray('img/projetil_dilma.png'));
imageProjeteis.push(preencheArray('img/projetil_putin.png'));
imageProjeteis.push(preencheArray('img/projetil_justin.png'));



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
var image = new Image();

var hipotenusa;
/*
projectil.js dependences
*/
var frameRate = 1/80; // Seconds
var frameDelay = frameRate * 2500; // ms
var numeroJogada = 0;
var projectilPosIniX;
var projectilPosIniY;
var num; //define o numero do player na frase "vez do player x"
var projectilAngle = 0; // angulo da imagem do projetil.

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
