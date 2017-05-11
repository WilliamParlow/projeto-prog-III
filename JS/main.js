// Função ao mover o mouse
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


// Função ao precionar o mouse
$('#canvasTeste').mousedown(function(e){ // coordenadas do click sobre o canvas
  mouseclick = {
    x : e.pageX - this.offsetLeft,
    y : e.pageY - this.offsetTop
  };
  clicado = true;
});


// Função ao soltar o botão do mouse
$('#canvasTeste').mouseup(function(e){
  clicado = false;
  teste.clearRect(0,0,canvasteste.width,canvasteste.height);
intervaloJogada = setInterval(loop, frameDelay);
  if(isPlayer1){
    isPlayer1 = false;
    projectilPlayer1.velocity.y = (mouseclick.y - mousePos.y) /40;
    projectilPlayer1.velocity.x = (mouseclick.x ) / 40;
  }else{
    isPlayer1 = true;
    projectilPlayer2.velocity.y = (mouseclick.y - mousePos.y) /40;
    projectilPlayer2.velocity.x = (mouseclick.x ) / 40;
  }
  }
);
