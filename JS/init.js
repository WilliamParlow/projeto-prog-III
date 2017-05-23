// Init function
opcoes[7].onload = function(){
    chooseplayers(contextoTemporario);
}

function chooseplayers(canvaschoose){
  canvaschoose.drawImage(opcoes[0],0,0);
  canvaschoose.drawImage(opcoes[1],250,0);
  canvaschoose.drawImage(opcoes[2],500,0);
  canvaschoose.drawImage(opcoes[3],750,0);
  canvaschoose.drawImage(opcoes[4],0,300);
  canvaschoose.drawImage(opcoes[5],250,300);
  canvaschoose.drawImage(opcoes[6],500,300);
  canvaschoose.drawImage(opcoes[7],750,300);
  
if(player1selecionado && player2selecionado){
   buildscenario(context);
}

}
