function criaMenuEsboco(canvaschoose){
  contextoTemporario.clearRect(0,0,1000,600);
  canvaschoose.fillStyle = "#002146";
  roundRect(canvaschoose,70,70,860,460,20,true,false);
  canvaschoose.fillStyle = "#124266";
  roundRect(canvaschoose,80,80,840,440,20,true,false);
}

function criaMenuSelect(){

  criaMenuEsboco(contextoTemporario);
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "50px 'Press Start 2P'";
  if(player1selecionado && !player2selecionado)
  {
    contextoTemporario.fillText("Selecione o Player 2:",110,170,800);
  }

  if(!player1selecionado)
  {
    contextoTemporario.fillText("Selecione o Player 1:",110,170,800);
  }
  for(var i =0;i<opcoes.length;i++){
    if(i>3){
      contextoTemporario.drawImage(opcoes[i].select,i*200-670,360);
    }else{
      contextoTemporario.drawImage(opcoes[i].select,i*200+130,180);
    }

  }
window.clearInterval(loadingScreen);

if(player1selecionado && player2selecionado){
   buildscenario(context);
}

}


function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = {tl: radius, tr: radius, br: radius, bl: radius};
  } else {
    var defaultRadius = {tl: 0, tr: 0, br: 0, bl: 0};
    for (var side in defaultRadius) {
      radius[side] = radius[side] || defaultRadius[side];
    }
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius.br, y + height);
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }

}

function music(){
  var music = new Audio();
  music.src = "Heathens 8-bits.MP3";
  music.loop = true;
  music.autoplay = true;
  music.crossOrigin = "8-bit Universe Youtube Channel"; // canal do youtube autor da musica
  music.play();
  music.volume-=0.9;

}
