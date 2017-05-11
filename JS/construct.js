// cria o senário
function buildscenario(context){
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
  // Cria o bloco do prédio
  context.fillStyle="#555";
  context.fillRect(larguraTotal,altura,largura,canvas.height - altura);
  predio.XFinal = largura;
  predio.XInicial = larguraTotal;
  predio.YFinal = canvas.height - altura;
  predio.YInicial = altura;

  //  predios = predios.push(predio);

  // Cria as janelas do prédio.
  var qtdJanelaLinha = largura/15;
  var qtdJanelaColuna = (canvas.height-altura)/25;
  for(var i = 1 ; i<(qtdJanelaLinha); i++){
    for(var j = 1; j < (qtdJanelaColuna); j++){
      if((i*25)<(largura -20)){ // serve para não haver colunas de janelas depois que o prédio terminou
        context.fillStyle="#CC0";
        context.fillRect(larguraTotal+(i*25),altura + (j*25),10,20);
      }
    }
  }
}

// Cria a flecha que aponta a direção para lançar o objeto
function canvas_arrow(context, fromx, fromy, tox, toy){
  context.beginPath();
  context.clearRect(0,0,canvasteste.width,canvasteste.height);

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
    player.src = 'img/obama.png';
    player.onload = function(){
      canvas.drawImage(player, 20, altura-104); // tamanho em px do icone do player
      projectilPlayer1.image.src = "img/mexicano.png";
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
    player.src = 'img/trump.png';
    player.onload = function(){
      canvas.drawImage(player, largura, altura-97); // tamanho em px do icone do player
      projectilPlayer2.image.src = "img/tijolo.png";
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
