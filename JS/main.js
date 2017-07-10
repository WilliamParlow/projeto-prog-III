// Função ao mover o mouse
$('#canvasTemporario').mousemove(function(e){ // coordenadas da posição do mouse sobre o canvas
  mousePos = {
    x : e.pageX - this.offsetLeft,
    y : e.pageY - this.offsetTop
  };

  if(clicado && playable && !isRestart){

    canvas_arrow(contextoTemporario,mousePos.x,mousePos.y,mouseclick.x,mouseclick.y);
    canvas_text(contextoTemporario,mouseclick,mousePos);
  }
});


// Função ao precionar o mouse
$('#canvasTemporario').mousedown(function(e){ // coordenadas do click sobre o canvas
  mouseclick = {
    x : e.pageX - this.offsetLeft,
    y : e.pageY - this.offsetTop
  };
  if(player1selecionado && player2selecionado && playable){
    clicado = true;
  }

});


// Função ao soltar o botão do mouse
$('#canvasTemporario').mouseup(function(e){

  if (playable) {

    if(player1selecionado && player2selecionado){
      clicado = false;
      contextoTemporario.clearRect(0,0,canvasTemporario.width,canvasTemporario.height);
      intervaloJogada = setInterval(jogada, frameDelay);
      if(isPlayer1){
        isPlayer1 = false;
        projectilPlayer1.velocity.y = limitaVelocidade().y;
        projectilPlayer1.velocity.x = limitaVelocidade().x;
      }else{
        isPlayer1 = true;
        projectilPlayer2.velocity.y = limitaVelocidade().y;
        projectilPlayer2.velocity.x = limitaVelocidade().x;
      }
    }

    acaoclick(mouseclick);
  }

});
