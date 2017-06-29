function map(x, in_min, in_max, out_min, out_max) {
  return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

var jogada = function() {
  // define qual o jogador que está sendo manipulado agora. Se for o primeiro frame da jogada
  // grava as posições iniciais para resetar após a jogada ser finalizada
  playable = false;

  var projectil;
  var player;
  if(!isPlayer1 && numeroJogada === 0){
    projectil = projectilPlayer1;
    projectilPosIniX = projectil.position.x;
    projectilPosIniY = projectil.position.y;
    numeroJogada++;
    num =2;
    player = player2;
  }else{
    if(!isPlayer1 && numeroJogada>0){
      projectil = projectilPlayer1;
      player = player2;
    }
  }

  if(isPlayer1 && numeroJogada === 0){
    projectil = projectilPlayer2;
    projectilPosIniX = projectil.position.x;
    projectilPosIniY = projectil.position.y;
    numeroJogada++;
    num = 1;
    player = player1;

  }else{
    if(isPlayer1 && numeroJogada>0){
      projectil = projectilPlayer2;
      player = player1;
    }
  }


  // parte da física do game

  // Do physics
  // Drag force: Fd = -1/2 * Cd * A * rho * v * v
  var Fx = -0.5 * projectil.Cd * projectil.A * projectil.rho * projectil.velocity.x * projectil.velocity.x * projectil.velocity.x / Math.abs(projectil.velocity.x);
  var Fy = -0.5 * projectil.Cd * projectil.A * projectil.rho * projectil.velocity.y * projectil.velocity.y * projectil.velocity.y / Math.abs(projectil.velocity.y);

  Fx = (isNaN(Fx) ? 0 : Fx);
  Fy = (isNaN(Fy) ? 0 : Fy);

  // Calculate acceleration ( F = ma )
  var ax = Fx / projectil.mass;
  var ay = projectil.ag + (Fy / projectil.mass);
  // Integrate to get velocity
  projectil.velocity.x += ax*frameRate + windForce;
  projectil.velocity.y += ay*frameRate;

  // Integrate to get position
  projectil.position.x += projectil.velocity.x/5;
  projectil.position.y += projectil.velocity.y/5;

  contextoTemporario.beginPath();
  contextoTemporario.clearRect(0,0,canvasTemporario.width,canvasTemporario.height);
  contextoTemporario.closePath();

  // Rotaciona projetil em "projectilAngleº", desenhando ele nas posições x,y e por ultimo, as coordenadas do eixo de rotação
  rotacionaProjetil ( contextoTemporario, projectil.image, projectilAngle*(Math.PI/180), projectil.position.x, projectil.position.y, 15, 12 );
  projectilAngle += 1.5;

  analisaImpactoPlayer(projectil, player);
  analisaImpactoPredio(projectil);

  // identifica se o projetil saiu da tela para resetar tudo, possibilitando nova jogada
  if(projectil.position.x > 1000 || projectil.position.y > 600 || projectil.position.x < 0 ){
    encerraJogada(projectil);
  }


}

function rotacionaProjetil ( context, image, angleInRad , positionX, positionY, axisX, axisY ) {
  context.translate( positionX, positionY );
  context.rotate( angleInRad );
  context.drawImage( image, -axisX, -axisY );
  context.rotate( -angleInRad );
  context.translate( -positionX, -positionY );

}

function limitaVelocidade (){
  var x = (mouseclick.x - mousePos.x) / 20;
  var y = (mouseclick.y - mousePos.y)/20;
  var limite = 15;

  if(x> limite){
    x = limite;
  }
  if(x<(limite-(2*limite))){
    x = limite-(2*limite);
  }
  if(y> limite){
    y = limite;
  }
  if(y<(limite-(2*limite))){
    y= limite-(2*limite);
  }
  return{
    x: x,
    y: y
  }
}

function analisaImpactoPlayer(projetil, player){
  if(projetil.position.x > player.posicao.x && projetil.position.x <(player.posicao.x +player.tamanho.width)){
    if(projetil.position.y > player.posicao.y && projetil.position.y <(player.posicao.y +player.tamanho.height)){
      //se entrar aqui é porque acertou o adversário


      if (isPlayer1) {
        $(player1Life.diamonds[player1Life.index]).addClass('lifeLost');
        player1Life.index--;
      } else {
        $(player2Life.diamonds[player2Life.index]).addClass('lifeLost');
        player2Life.index++;
      }


      player.vida -=1;
      if(player.vida === 0){
        winner(player);
        isRestart = true;
      } else {
        isRestart = false;
      }

      encerraJogada(projetil);
    }
  }
}

function analisaImpactoPredio(projetil){
  for(var i = 0; i< predios.length; i++){
    if(projetil.position.x > predios[i].XInicial && projetil.position.x < predios[i].XFinal){ //testa se está na área de um predio
      if(projetil.position.y > predios[i].YInicial && projetil.position.y < predios[i].YFinal){
        for(var k = 0 ; k<damages.length;k++){ // varre o vetor de damages a fim de se certificar que o projetil está dentro de uma área já destruida
          if(projetil.position.x > damages[k].xin && projetil.position.x < damages[k].xfinal){
            if(projetil.position.y > damages[k].yin && projetil.position.y <  damages[k].yfinal){
              return 0; //se o projetil está em área já destruida, o projetil segue a trajetória.
            }
          }
        }
        // se ele não retornou zero entra aqui, o que significa que acertou o predio
        createDamage(projetil,context);
        encerraJogada(projetil);
      }
    }
  }
}

function encerraJogada(projetil){
  projetil.position.y = projectilPosIniY;
  projetil.position.x = projectilPosIniX;
  numeroJogada=0;
  contextoTemporario.clearRect(0,0,canvasTemporario.width,canvasTemporario.height); //impede que o projetil fique congelado onde o impacto acontece
  window.clearInterval(intervaloJogada);
  if (isPlayer1) {
    $(playersUI[0]).addClass('player-active')
    $(playersUI[1]).removeClass('player-active');
  } else {
    $(playersUI[1]).addClass('player-active');
    $(playersUI[0]).removeClass('player-active');
  }
  playable= true;
}

function createDamage(projetil,context){

  context.clearRect(projetil.position.x-20,projetil.position.y-20,40,40);
  var damage = new Object();
  damage.xin= projetil.position.x-20;
  damage.yin= projetil.position.y-20;
  damage.xfinal = projetil.position.x+20;
  damage.yfinal = projetil.position.y+20;
  damages.push(damage);
}

function winner(player_loser){
  context.clearRect(0,0,1000,600);
  contextoTemporario.clearRect(0,0,1000,600);
  criaMenuEsboco(context);
  var textloser = player_loser.name +" was destroyed!";
  var winner;
  if(player_loser.name ==="Player 1"){
    winner = "Player 2";
  }
  else{
    winner = "Player 1";
  }
  var textWinner = winner +", you rock!";
  context.fillStyle = "#FFF";
  context.font = "40px 'Press Start 2P'";
  context.fillText(textWinner,110,150);
  context.font = "20px'Press Start 2P'";
  context.fillText(textloser,270,300);
  context.fillText("Try harder next time.",290,350);
  restartButton();
}

function gameRestart(){
  $(".diamond").removeClass("lifeLost");
  isRestart = false;
  playable = true;
  opcaoPlayer1;
  opcaoPlayer2;
  player1selecionado = false;
  player2selecionado = false;
  player1Life.index = 2;
  player2Life.index = 0;
  player1.vida = 3;
  player2.vida = 3;
  indicePredios = 0;
  predios = new Array();
  playercriado =false;
  isPlayer1 = true;
  numeroJogada = 0;
  damages = [];
  criaMenuSelect();
}
