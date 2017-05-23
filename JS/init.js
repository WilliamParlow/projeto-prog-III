// Init function
constroiObjetosImages();
opcoes[7].select.onload = function(){

    chooseplayers(contextoTemporario);
}

function chooseplayers(canvaschoose){
  canvaschoose.drawImage(opcoes[0].select,0,0);
  canvaschoose.drawImage(opcoes[1].select,250,0);
  canvaschoose.drawImage(opcoes[2].select,500,0);
  canvaschoose.drawImage(opcoes[3].select,750,0);
  canvaschoose.drawImage(opcoes[4].select,0,300);
  canvaschoose.drawImage(opcoes[5].select,250,300);
  canvaschoose.drawImage(opcoes[6].select,500,300);
  canvaschoose.drawImage(opcoes[7].select,750,300);

if(player1selecionado && player2selecionado){
   buildscenario(context);
}

}
