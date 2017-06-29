function criaMenuEsboco(canvaschoose){
  contextoTemporario.clearRect(0,0,1000,600);
  canvaschoose.fillStyle = "#002146";
  roundRect(canvaschoose,70,70,860,460,20,true,false);
  canvaschoose.fillStyle = "#124266";
  roundRect(canvaschoose,80,80,840,440,20,true,false);
}

function criaMenuSelect(){
  context.clearRect(0,0,1000,600);
  contextoTemporario.clearRect(0,0,1000,600);
  criaMenuEsboco(contextoTemporario);
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "50px 'Press Start 2P'";
  if(!selecionando){
  if(player1selecionado && !player2selecionado)
  {
    contextoTemporario.fillText("Select Player 2:",110,170,800);
  } else if(!player1selecionado)
  {
    contextoTemporario.fillText("Select Player 1:",110,170,800);
  }
  for(var i =0;i<opcoes.length;i++){
    if(i>3){
      contextoTemporario.drawImage(opcoes[i].select,i*200-670,360);
    }else{
      contextoTemporario.drawImage(opcoes[i].select,i*200+130,180);
    }

  }

  if(player1selecionado && player2selecionado){
    buildscenario(context);
  }}

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
var musicTrack = new Audio();
function music(){

  let musicOrigins = [
    "musics/Diffrent Strokes 8-bits.mp3",
    "musics/Enter Sandman 8-bits.mp3",
    "musics/Feel Good 8-bits.mp3",
    "musics/Heathens 8-bits.mp3",
    "musics/Mr. Brightside 8-bits.mp3",
    "musics/Sexual 8-bits.mp3",
    "musics/Shape Of You 8-bits.mp3",
    "musics/Sneakin 8-bits.mp3"
  ];

  setMusicConfig( musicTrack, musicOrigins[ Math.round( Math.random() * 7 ) ] )
}

function setMusicConfig(music, origin) {

  music.src = origin;
  music.loop = true;
  music.autoplay = true;
  music.crossOrigin = "8-bit Universe Youtube Channel"; // canal do youtube autor da musica
  music.play();
  music.volume-=0.9;
}

function telaCarregamento(){
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "50px 'Press Start 2P'";
  contextoTemporario.fillText("Undefined",300,100);
  contextoTemporario.fillText("Best game Ever!",150,200);
  contextoTemporario.fillText("Loading... ",300,500);
}

function restartButton(){
  $("#warn-container").addClass('hide');
  context.fillStyle = "#002146";
  roundRect(context,350,380,300,100,20,true,false);
  context.fillStyle = "#124266";
  roundRect(context,360,390,280,80,20,true,false);
  context.fillStyle = "#FFF";
  context.font = "35px 'Press Start 2P'";
  context.fillText("Restart",375,445);
}
