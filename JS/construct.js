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

  $("#warn-container").removeClass('hide');
  if (isPlayer1) {
    $(playersUI[0]).addClass('player-active')
    $(playersUI[1]).removeClass('player-active');
  } else {
    $(playersUI[1]).addClass('player-active');
    $(playersUI[0]).removeClass('player-active');
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
  context.strokeStyle = '#FFF';
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
  var text = "Power: ";
  text = text.concat(num);
  context.fillStyle = "#FFF";
  context.font = "20px 'Press Start 2P'";;
  context.fillText(text,click.x+20,click.y-20);
  text = "";
  text = text.concat("Degrees: ");
  text = text.concat(  calculaAngulo(click,posicao).x.toString());


  context.fillText(text,click.x+20,click.y-50);

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
      canvas.drawImage(player, 20, altura-104, 40,104); // tamanho em px do icone do player
      $('#player1-image').css("background-image", `url(${player.src})`);
      projectilPlayer1.image.src = opcoes[opcaoPlayer1-1].projetil.src;
      player1.posicao.x = 20;
      player1.posicao.y = altura-104;
      player1.tamanho.width = 40;
      player1.tamanho.height = 104;
      projectilPlayer1.position.x = player1.posicao.x + 5;
      projectilPlayer1.position.y = player1.posicao.y - 24;
      skills(opcaoPlayer1,player1);
    }

    break;
    case 2:
    var player = new Image();
    player.src = opcoes[opcaoPlayer2-1].ingame.src;
    player.onload = function(){
      canvas.drawImage(player, largura, altura-104,40,104); // tamanho em px do icone do player
      $('#player2-image').css("background-image", `url(${player.src})`);
      projectilPlayer2.image.src = opcoes[opcaoPlayer2-1].projetil.src;
      player2.posicao.x = largura;
      player2.posicao.y = altura-97;
      player2.tamanho.width = 40;
      player2.tamanho.height = 104;
      projectilPlayer2.position.x = player2.posicao.x;
      projectilPlayer2.position.y = player2.posicao.y;
      skills(opcaoPlayer2, player2);
    }

    playercriado = true;
    break;
  }

}

function acaoclick(coordenadas){

  if(selecionando){
    if(coordenadas.x>350 && coordenadas.x<500 && coordenadas.y>380&& coordenadas.y<480){
      opcaoselecionada = optionSelectedtemp;
      selecionando = false;
      selecionado = true;
    }else if(coordenadas.x>560 && coordenadas.x<800 && coordenadas.y>380&& coordenadas.y<480){
      selecionando = false;
      criaMenuSelect(contextoTemporario);
    }
  }else if(!player1selecionado || !player2selecionado){
      detailMenu(coordenadas);
  }

  if(selecionado){

  if(player1selecionado && !player2selecionado){
    player2selecionado = true;
    selecionando = false;
    opcaoPlayer2 = opcaoselecionada;
    selecionado = false;
    buildscenario(context);
  }

  if(!player1selecionado && !player2selecionado){
      player1selecionado = true;
      selecionando = false;
      opcaoPlayer1 = opcaoselecionada;
      selecionado = false;
      criaMenuSelect(contextoTemporario);

}
}
if(isRestart){
  if(coordenadas.x>360 && coordenadas.x<640 && coordenadas.y>390&& coordenadas.y<470)
  {
    context.clearRect(0,0,1000,600);
    contextoTemporario.clearRect(0,0,1000,600);
    window.clearInterval(intervaloJogada); //impede que jogada rode enquanto está na tela de seleção de personagem depois do restart.
    start();
  }
}

}


function detailMenu(coordenadas){
  var opcaoselecionada;
  criaMenuEsboco(contextoTemporario);
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "30px 'Press Start 2P'";
  selecionando = true;
  designButtons();
  // se não foi selecionado nenhum player ainda é feita a seleção de acordo com as coordenadas do click

  if(coordenadas.x>130 && coordenadas.x<280 && coordenadas.y>177 && coordenadas.y<330){
    optionSelectedtemp = 1;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if (coordenadas.x>330 && coordenadas.x<480 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 2;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if (coordenadas.x>530 && coordenadas.x<680 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 3;
    contextoTemporario.fillText("Agent orange",425,140,550);
    contextoTemporario.fillText("Pros: You start with a wall around you!",350,200,550);
    contextoTemporario.fillText("Cons: The wall doesn't make any difference",350,300,550);
  }else if (coordenadas.x>730 && coordenadas.x<880 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 4;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if(coordenadas.x>130 && coordenadas.x<280 && coordenadas.y>360 && coordenadas.y<510){
    optionSelectedtemp = 5;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if (coordenadas.x>330 && coordenadas.x<480 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 6;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if (coordenadas.x>530 && coordenadas.x<680 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 7;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }else if (coordenadas.x>730 && coordenadas.x<880 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 8;
    contextoTemporario.fillText("OBAMACHINE",450,140,550);
    contextoTemporario.fillText("Pros: ObamaCare give you one more life",350,200,550);
    contextoTemporario.fillText("Cons: none yet",350,300,550);
  }
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
}



function constroiObjetosImages(){

  for(var i=0;i<politicians.length;i++){
    var opcao = new Object();
    opcao.select = new Image();
    opcao.projetil = new Image();
    opcao.ingame = new Image();
    opcao.select.src = "img/select_"+politicians[i]+".png";
    opcao.projetil.src = "img/projetil_"+politicians[i]+".png";
    opcao.ingame.src = "img/ingame_"+politicians[i]+".png";
    opcoes.push(opcao);

  }
}

function designButtons(){
  //ok button
  contextoTemporario.fillStyle = "#002146";
  roundRect(contextoTemporario,350,380,150,100,20,true,false);
  contextoTemporario.fillStyle = "#124266";
  roundRect(contextoTemporario,360,390,130,80,20,true,false);
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "35px 'Press Start 2P'";
  contextoTemporario.fillText("Ok",390,445);
  //Cancel button
  contextoTemporario.fillStyle = "#002146";
  roundRect(contextoTemporario,550,380,260,100,20,true,false);
  contextoTemporario.fillStyle = "#124266";
  roundRect(contextoTemporario,560,390,240,80,20,true,false);
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "35px 'Press Start 2P'";
  contextoTemporario.fillText("Cancel",580,445);
}

function skills(option,player){
switch (option){
  case 1:
    player.vida = player.vida +1;
  break;
  case 3:
    var tijolo = new Image();
    tijolo.src = opcoes[option-1].projetil.src;
    for(var i = 0 ; i<21;i++){
      if(i<8){
        context.drawImage(tijolo,player.posicao.x -40,player.posicao.y-30+(i*17)); //desenha 1 coluna
      }else if(i<14){
        context.drawImage(tijolo,player.posicao.x -162+(i*18),player.posicao.y-30); // desenha parte de cima
      }else{
        context.drawImage(tijolo,player.posicao.x +74,player.posicao.y-252+(i*17)); //desenha 1 coluna
      }
    }
  break;

}

}
