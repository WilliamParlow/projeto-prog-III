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

buildscenario(context);
$('#canvasTeste').mousemove(function(e){ // coordenadas da posição do mouse sobre o canvas
  mousePos = {
    x : e.pageX - this.offsetLeft,
    y : e.pageY - this.offsetTop
  };
  if(clicado){
    canvas_arrow(teste,mousePos.x,mousePos.y,mouseclick.x,mouseclick.y);
    canvas_text(teste,mouseclick,mousePos);
  }
});

$('#canvasTeste').mousedown(function(e){ // coordenadas do click sobre o canvas
  mouseclick = {
    x : e.pageX - this.offsetLeft,
    y : e.pageY - this.offsetTop
  };
  clicado = true;
});

$('#canvasTeste').mouseup(function(e){
  clicado = false;
  teste.clearRect(0,0,canvasteste.width,canvasteste.height);

  /*if (isPlayer1) {
    isPlayer1 = false;

    teste.drawImage(projectilPlayer1.image, projectilPlayer1.position.x, projectilPlayer1.position.y);
  } else {
    teste.drawImage(projectilPlayer2.image, projectilPlayer2.position.x, projectilPlayer2.position.y);
    isPlayer1 = true;
  }
*/

loopTimer = setInterval(loop(projectilPlayer1), frameDelay);

setInterval(loop(projectilPlayer1), 1000);
});
