// cria o senário
function buildscenario(context){ //função responsável pela construção do cenário como um todo, enquanto o canvas não for completamente preenchido por prédios a função continua criando-os. Esta função também é responsável pelo posicionamento dos players
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
  // trecho de código que manipula o campo que indica qual usuario está ativo no inicio do jogo
  $("#warn-container").removeClass('hide');
  if (isPlayer1) {
    $(playersUI[0]).addClass('player-active')
    $(playersUI[1]).removeClass('player-active');
  } else {
    $(playersUI[1]).addClass('player-active');
    $(playersUI[0]).removeClass('player-active');
  }

}

// Cria os predios, pintando-os, e armazenando-os em um array, assim fica mais fácil de manipula-los depois quando for necessário criar os danos causados pelos projéteis
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

// Cria a flecha que aponta a direção para lançar o objeto, não ocorre se estiver em tela de loading/restart ou seleção
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

// Cria o texto do valor do ângulo e força. Se algum player escolher o personagem "lula" ele não mosta os dados, substituindo-os por caracteres fixos
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
  if((isPlayer1 && opcaoPlayer1 ===6)||(!isPlayer1 && opcaoPlayer2 ===6)){
    text = "Pauer: ##";
  }
  context.fillText(text,click.x+20,click.y-20);
  text = "";
  text = text.concat("Degrees: ");
  text = text.concat(  calculaAngulo(click,posicao).x.toString());
  if((isPlayer1 && opcaoPlayer1 ===6)||(!isPlayer1 && opcaoPlayer2 ===6)){
    text = "Decriez: ??";
  }

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

// Cria os objetos dos players 1 e 2. A função desenha as imagens dos players nos locais indicados pela função buildscenario. Cria também os objetos dos projeteis de cada jogador.
function criaPlayer(numPlayer, canvas,altura, largura){
  switch (numPlayer){
    case 1:
    var player = new Image();
    player.src = opcoes[opcaoPlayer1-1].ingame.src;
    player.onload = function(){
      player1.image = player;
      canvas.drawImage(player, 20, altura-104, 40,104); // tamanho em px do icone do player
      $('#player1-image').css("background-image", `url(${player.src})`);
      projectilPlayer1.image.src = opcoes[opcaoPlayer1-1].projetil.src;
      player1.posicao.x = 20;
      player1.posicao.y = altura-104;
      player1.tamanho.width = 40;
      player1.tamanho.height = 104;
      projectilPlayer1.position.x = player1.posicao.x + 5;
      projectilPlayer1.position.y = player1.posicao.y - 24;
      skills(opcaoPlayer1,player1,projectilPlayer1);
    }

    break;
    case 2:
    var player = new Image();
    player.src = opcoes[opcaoPlayer2-1].ingame.src;
    player.onload = function(){
      player2.image = player;
      canvas.drawImage(player, largura, altura-104,40,104); // tamanho em px do icone do player
      $('#player2-image').css("background-image", `url(${player.src})`);
      projectilPlayer2.image.src = opcoes[opcaoPlayer2-1].projetil.src;
      player2.posicao.x = largura;
      player2.posicao.y = altura-104;
      player2.tamanho.width = 40;
      player2.tamanho.height = 104;
      projectilPlayer2.position.x = player2.posicao.x;
      projectilPlayer2.position.y = player2.posicao.y;
      skills(opcaoPlayer2, player2,projectilPlayer2);
    }

    playercriado = true;
    break;
  }

}
// Essa é uma das principais funções do game, é ela quem trata cada click e chama as funções de acão de acordo com as coordenas e do estado em que o game se encontra (tela de restart/tela de selecao/durante uma jogada, etc.) As funções em si eu vou explicar melhor nó próprio codigo
function acaoclick(coordenadas){
  if(!isRestart){
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
        windForce = map(Math.random() * 1000, 0, 1000, -0.035, 0.035);
        changeWindIntensityStyle(windForce);
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
  }
  else {
    if(coordenadas.x>360 && coordenadas.x<640 && coordenadas.y>390&& coordenadas.y<470)
    {
      context.clearRect(0,0,1000,600);
      contextoTemporario.clearRect(0,0,1000,600);
      window.clearInterval(intervaloJogada); //impede que jogada rode enquanto está na tela de seleção de personagem depois do restart.
      start();
    }
  }

}

//Cria o menu de detalhe para cada opção selecionada (aquela com pros e contras). Basicamente faz isso de acordo com as coordenadas do click do usuario.
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
    contextoTemporario.fillText("Pros: ObamaCare give him one more life",350,200,550);
    contextoTemporario.fillText("Cons: He is getting old fast ",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>330 && coordenadas.x<480 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 2;
    contextoTemporario.fillText("Mother of Swan",380,140,550);
    contextoTemporario.fillText("Pros: Wind blows always in her favor",350,200,550);
    contextoTemporario.fillText("Cons:.... her... age(?)",350,300,550); // diminuir potencia
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>530 && coordenadas.x<680 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 3;
    contextoTemporario.fillText("Agent orange",425,140,550);
    contextoTemporario.fillText("Pros: He starts with a wall around him!",350,200,550);
    contextoTemporario.fillText("Cons: The wall doesn't make any difference",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>730 && coordenadas.x<880 && coordenadas.y>177 && coordenadas.y<330) {
    optionSelectedtemp = 4;
    contextoTemporario.fillText("Canadian gentlemen",350,140,550);
    contextoTemporario.fillText("Pros: He apologizes when he hits an enemy",350,200,550);
    contextoTemporario.fillText("Cons: He doesn't want to kill his enemies ",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if(coordenadas.x>130 && coordenadas.x<280 && coordenadas.y>360 && coordenadas.y<510){
    optionSelectedtemp = 5;
    contextoTemporario.fillText("Beberronis Vodkius",360,140,550);
    contextoTemporario.fillText("Pros: He rides a bear!",350,200,550);
    contextoTemporario.fillText("Cons: In Russia the game play you",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>330 && coordenadas.x<480 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 6;
    contextoTemporario.fillText("I know nothing!",380,140,550);
    contextoTemporario.fillText("Pros: He has a Triplex!",350,200,550);
    contextoTemporario.fillText("Cons: Supposedly illiterate",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>530 && coordenadas.x<680 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 7;
    contextoTemporario.fillText("Woman-Sapiens",400,140,550);
    contextoTemporario.fillText("Pros: She \"stores wind\", so she will not be affected by it!",350,200,550);
    contextoTemporario.fillText("Cons: Your game might end sooner.",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  }else if (coordenadas.x>730 && coordenadas.x<880 && coordenadas.y>360 && coordenadas.y<510) {
    optionSelectedtemp = 8;
    contextoTemporario.fillText("Pyng Pong",450,140,550);
    contextoTemporario.fillText("Pros: He has his own country",350,200,550);
    contextoTemporario.fillText("Cons:  His projectile is really tiny",350,300,550);
    contextoTemporario.drawImage(opcoes[optionSelectedtemp-1].ingame,100,100,200,400);
  } else{
    selecionando = false;
    criaMenuSelect();
  }

}


//Função interessante! Apesar de simples ela ajuda muito. Ela constroi o objeto Opcao, que contem a imagem do player durante o jogo, a imagem do projetil desse player e a imagem que aparece na "bolinha" da tela de seleção e la em cima do lado da vida dos jogadores. Ela ajuda demais pois mantendo o padrão de nomes escolhidos, fica fácil incluir novas opções ou alterar as existentes.
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



// Simplesmente padroniza botões de ok e de cancelar
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

// a ideia inicial era que todas as skills de todos os jogadores ficassem aqui, porém apenas 2 puderam ser implementadas no momento da criação do player, as demais tem que ser verificadas em tempo de execução, logo, ficaram espalhadas pelo código, my bad!
function skills(option,player, projetil){
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
