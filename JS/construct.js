// cria o senário
function buildscenario(context){
  contextoTemporario.clearRect(0,0,1000,600); // apaga a tela de seleção de personagens
  var largTotal = 0; // recebe a largura total já desenhada no cavas, serve de referencia para saber onde deve ser desenhando o proximo prédio
  while(largTotal < canvas.width){
    var altura = Math.floor(Math.random()*300) +200; //altura e largura randomicos
    var largura = Math.floor(Math.random()* 125)+75;
    if(largTotal ===0){
      criaPlayer(1,context,altura, largTotal);
    }
    if(largTotal>600 && largTotal<950&& playercriado === false){
      criaPlayer(2,context,altura, largTotal);
    }
    createBuilding(altura,largura, largTotal);
    largTotal = largTotal + largura +5; // 5px é a margem entre um prédio e outro

  }


}

// Cria os predios
function createBuilding(altura, largura, larguraTotal){
  var predio = {
    XInicial:0,
    YInicial:0,
    XFinal:0,
    YFinal:0
  };
  // Cria o bloco do prédio
  context.fillStyle="#002040";
  context.fillRect(larguraTotal,altura,largura,canvas.height - altura);
  predio.XFinal = largura + larguraTotal;
  predio.XInicial = larguraTotal;
  predio.YFinal = 600;
  predio.YInicial = altura;

  predios[indicePredios] = predio;
  indicePredios++;
  // Cria as janelas do prédio.
  var qtdJanelaLinha = largura;
  var qtdJanelaColuna = (canvas.height-altura)/7;
  for(var i = 1 ; i<(qtdJanelaLinha); i++){
    for(var j = 1; j < (qtdJanelaColuna); j++){
      if((i*20)<(largura -20)){ // serve para não haver colunas de janelas depois que o prédio terminou
        var color = Math.round(Math.random()+1);
        console.log(color);
        switch (color){
          case 1:
          context.fillStyle="#A96733";
          context.fillRect(larguraTotal+(i*20),altura + (j*15),14,7);
          break;
          case 2:
          context.fillStyle="#065F7F";
          context.fillRect(larguraTotal+(i*20),altura + (j*15),14,7);
          break;
        }

      }
    }
  }
}

// Cria a flecha que aponta a direção para lançar o objeto
function canvas_arrow(context, fromx, fromy, tox, toy){
  context.beginPath();
  context.clearRect(0,0,canvasTemporario.width,canvasTemporario.height);

  var headlen = 20;   // length of head in pixels
  var angle = Math.atan2(toy-fromy,tox-fromx);
  context.moveTo(fromx, fromy);
  context.lineTo(tox, toy);
  context.lineTo(tox-headlen*Math.cos(angle-Math.PI/6),toy-headlen*Math.sin(angle-Math.PI/6));
  context.moveTo(tox, toy);
  context.lineTo(tox-headlen*Math.cos(angle+Math.PI/6),toy-headlen*Math.sin(angle+Math.PI/6));
  context.strokeStyle = '#000';
  context.lineWidth = 3;
  context.stroke();

}

// Cria o texto do valor do ângulo e força
function canvas_text(context,click,posicao){
  var num =Math.round(calculaAngulo(click,posicao).h/2.5);
  if(num<0){
    num = num*(-1);
  }
  if(num>100){
    num = 100;
  }
  var text = "Potência: ";
  text = text.concat(num);
  context.strokeText(text,click.x+20,click.y-20);
  text = "";
  text = text.concat("Ângulo: ");
  text = text.concat(  calculaAngulo(click,posicao).x.toString());
  context.font = "30px Calibri";
  context.strokeText(text,click.x+20,click.y-50);

}

// Calcula o ângulo
function calculaAngulo(click,posicao){
  var catetoAdj = (posicao.x-click.x);
  var catetoOps = posicao.y - click.y;
 hipotenusa = Math.sqrt(Math.pow(catetoAdj,2)+ Math.pow(catetoOps,2));
  var angulo = Math.asin(catetoOps/hipotenusa);
  angulo = Math.round(Math.degrees(angulo));
  return {
    x:angulo,
    h:hipotenusa
  }
}


Math.degrees = function(radians) {
  return radians * (180 / 3.14159265359);
};

// Cria os players
function criaPlayer(numPlayer, canvas,altura, largura){
  switch (numPlayer){
    case 1:
    var player = new Image();
    player.src = opcoes[opcaoPlayer1-1].ingame.src;
    player.onload = function(){
      canvas.drawImage(player, 20, altura-104); // tamanho em px do icone do player
      projectilPlayer1.image.src = opcoes[opcaoPlayer1-1].projetil.src;
      player1.posicao.x = 20;
      player1.posicao.y = altura-104;
      player1.tamanho.width = player.width;
      player1.tamanho.height = player.height;
      projectilPlayer1.position.x = player1.posicao.x + 5;
      projectilPlayer1.position.y = player1.posicao.y - 24;
    }
    break;
    case 2:
    var player = new Image();
    player.src = opcoes[opcaoPlayer2-1].ingame.src;
    player.onload = function(){
      canvas.drawImage(player, largura, altura-104); // tamanho em px do icone do player
      projectilPlayer2.image.src = opcoes[opcaoPlayer2-1].projetil.src;
      player2.posicao.x = largura;
      player2.posicao.y = altura-97;
      player2.tamanho.width = player.width;
      player2.tamanho.height = player.height;
      projectilPlayer2.position.x = player2.posicao.x;
      projectilPlayer2.position.y = player2.posicao.y;
    }
    playercriado = true;
    break;
  }

}

function acaoclick(coordenadas){

if(player1selecionado && !player2selecionado){
       opcaoPlayer2= seleciona_opcao(coordenadas);
       player2selecionado = true;
       buildscenario(context);
   }
if(!player1selecionado && !player2selecionado){
  opcaoPlayer1 = seleciona_opcao(coordenadas);
  player1selecionado = true;
}
}


function seleciona_opcao(coordenadas){
  var opcaoselecionada;
   // se não foi selecionado nenhum player ainda é feita a seleção de acordo com as coordenadas do click
    if(coordenadas.x<250 && coordenadas.y<300){
      opcaoselecionada = 1;
    }else if (coordenadas.x<500 && coordenadas.y<300) {
      opcaoselecionada = 2;
    }else if (coordenadas.x<750 && coordenadas.y<300) {
      opcaoselecionada = 3;
    }else if (coordenadas.x<1000 && coordenadas.y<300) {
      opcaoselecionada = 4;
    }else if (coordenadas.x<250 && coordenadas.y<600) {
      opcaoselecionada = 5;
    }else if (coordenadas.x<500 && coordenadas.y<600) {
      opcaoselecionada = 6;
    }else if (coordenadas.x<750 && coordenadas.y<600) {
      opcaoselecionada = 7;
    }else if (coordenadas.x<1000 && coordenadas.y<600) {
      opcaoselecionada = 8;
    }
    console.log(opcaoselecionada);
    return opcaoselecionada;

}

function constroiObjetosImages(){

      for(var i=0;i<politicians.length;i++){
        var opcao = new Object();
        opcao.select = new Image();
        opcao.projetil = new Image();
        opcao.ingame = new Image();
        opcao.select.src = "img/select_"+politicians[i]+".jpg";
        opcao.projetil.src = "img/projetil_"+politicians[i]+".png";
        opcao.ingame.src = "img/ingame_"+politicians[i]+".png";
        opcoes.push(opcao);

  }
}
