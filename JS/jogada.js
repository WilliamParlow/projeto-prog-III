
var jogada = function() {
  // define qual o jogador que está sendo manipulado agora. Se for o primeiro frame da jogada
  // grava as posições iniciais para resetar após a jogada ser finalizada

var projectil;
var player;
  if(!isPlayer1 && numeroJogada === 0){
    projectil = projectilPlayer1;
    projectilPosIniX = projectil.position.x;
    projectilPosIniY = projectil.position.y;
    numeroJogada++;
    num =2;
    player = player2;
  }else{if(!isPlayer1 && numeroJogada>0){
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

  }else{if(isPlayer1 && numeroJogada>0){
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
        projectil.velocity.x += ax*frameRate;
        projectil.velocity.y += ay*frameRate;

            // Integrate to get position
        projectil.position.x += projectil.velocity.x;
        projectil.position.y += projectil.velocity.y;


    contextoTemporario.beginPath();
    contextoTemporario.clearRect(0,0,canvasTemporario.width,canvasTemporario.height);
    contextoTemporario.closePath();

    // Rotaciona projetil em "projectilAngleº", desenhando ele nas posições x,y e por ultimo, as coordenadas do eixo de rotação
    rotacionaProjetil ( contextoTemporario, projectil.image, projectilAngle*(Math.PI/180), projectil.position.x, projectil.position.y, 15, 12 );
    projectilAngle += 25;

    analisaImpactoPlayer(projectil, player);
    analisaImpactoPredio(projectil);

// identifica se o projetil saiu da tela para resetar tudo, possibilitando nova jogada
    if(projectil.position.x > 1000 || projectil.position.y > 600 || projectil.position.x < 0 ){
      swal({
        title: "Pra fooooooraaaaa!!!",
        timer: 1000,
        showConfirmButton: true,
        type: "error"
      });
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
      swal({
    title: "Você acertou, motherfucker!",
    timer: 2000,
    showConfirmButton: true,
    type: "success"
  });
      encerraJogada(projetil);
    }
  }
}

function analisaImpactoPredio(projetil){
  for(var i = 0; i< predios.length; i++){
    if(projetil.position.x > predios[i].XInicial && projetil.position.x < predios[i].XFinal){
      if(projetil.position.y > predios[i].YInicial && projetil.position.y < predios[i].YFinal){
        swal({
      title: "Right in the building, loser!",
      timer: 1000,
      showConfirmButton: true,
      type: "error",
    }).then(
  function () {},
  // handling the promise rejection
  function (dismiss) {
    if (dismiss === 'timer') {
    }
  }
);
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
  console.log("Player " + num);
window.clearInterval(intervaloJogada);
}
