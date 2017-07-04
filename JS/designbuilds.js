var canvasFooter = document.getElementById("canvasFooter");
var ctxFooter = canvasFooter.getContext("2d");

var prediosDesign = [];



function switchOn(){

<<<<<<< HEAD
  for (var k=0; k < prediosDesign.length; k++ ){
=======
    for (var k=0; k < prediosDesign.length; k++ ){
>>>>>>> Anderson2.0
    var linhas = Math.floor(prediosDesign[k].sizeY/6);
    var colunas = Math.floor(prediosDesign[k].sizeX/8);

    var posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;
    var posicaoColunas = prediosDesign[k].positionX+3;
    for (var j = 1; j < colunas; j++){

<<<<<<< HEAD
      for (var i = 1; i < linhas; i++){
        ctxFooter.fillStyle = "#FFFF00";
        ctxFooter.fillRect(posicaoColunas,posicaoLinhas,6,3);
        posicaoLinhas += 6;

      }
      posicaoColunas += 9;
      posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;

    }

  }
=======
    for (var i = 1; i < linhas; i++){
     ctxFooter.fillStyle = "#FFFF00";
    ctxFooter.fillRect(posicaoColunas,posicaoLinhas,6,3);
     posicaoLinhas += 6;

    }
    posicaoColunas += 9;
    posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;

    }

    }
>>>>>>> Anderson2.0


}

function switchOff(){

<<<<<<< HEAD
  for (var k=0; k < prediosDesign.length; k++ ){
=======
    for (var k=0; k < prediosDesign.length; k++ ){
>>>>>>> Anderson2.0
    var linhas = Math.floor(prediosDesign[k].sizeY/6);
    var colunas = Math.floor(prediosDesign[k].sizeX/8);

    var posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;
    var posicaoColunas = prediosDesign[k].positionX+3;
    for (var j = 1; j < colunas; j++){

<<<<<<< HEAD
      for (var i = 1; i < linhas; i++){
=======
    for (var i = 1; i < linhas; i++){
>>>>>>> Anderson2.0
        ctxFooter.fillStyle = "#cccccc";
        ctxFooter.fillRect(posicaoColunas,posicaoLinhas,6,3);
        posicaoLinhas += 6;
      }
      posicaoColunas += 9;
      posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;

    }
<<<<<<< HEAD

  }


}
=======
    posicaoColunas += 9;
    posicaoLinhas= canvasFooter.height - prediosDesign[k].sizeY+3;

    }

    }
>>>>>>> Anderson2.0


}



<<<<<<< HEAD

function buildsDesign (){


  var totalwidth = 0;
  var positionX = 0;
  var sizeX=0;
  var indexDesign =0;

  while (totalwidth < canvasFooter.width){
=======


function buildsDesign (){
var totalwidth = 0;
var positionX = 0;
var sizeX=0;
var indexDesign =0;

while (totalwidth < canvasFooter.width){
>>>>>>> Anderson2.0
    var predioDesign = {
      positionX :0 ,
      positionY :0,
      sizeX:0 ,
      sizeY:0
    };



    sizeX = (Math.floor(Math.random() * (80 - 20))+20);
    sizey = (Math.floor(Math.random() * (60 - 20))+20);
    ctxFooter.fillStyle = "#002040";
    ctxFooter.fillRect(positionX,canvasFooter.height - sizey,sizeX,sizey);
    predioDesign.positionX = positionX;
    predioDesign.positionY = canvasFooter.height - sizey;
    predioDesign.sizeX = sizeX;
    predioDesign.sizeY = sizey;
    prediosDesign[indexDesign] = predioDesign;

    var linhas = Math.floor(sizey/6);
    var colunas = Math.floor(sizeX/8);

    var posicaoLinhas= canvasFooter.height - sizey+3;
    var posicaoColunas = positionX+3;
    for (var j = 1; j < colunas; j++){

<<<<<<< HEAD
      for (var i = 1; i < linhas; i++){
=======
    for (var i = 1; i < linhas; i++){
>>>>>>> Anderson2.0
        ctxFooter.fillStyle = "#cccccc";
        ctxFooter.fillRect(posicaoColunas,posicaoLinhas,6,3);
        posicaoLinhas += 6;
      }
      posicaoColunas += 9;
      posicaoLinhas= canvasFooter.height - sizey+3;

    }
<<<<<<< HEAD
=======
    posicaoColunas += 9;
    posicaoLinhas= canvasFooter.height - sizey+3;

    }
>>>>>>> Anderson2.0

    totalwidth += sizeX;
    positionX+= sizeX + 3;
    indexDesign++;
  }
}
<<<<<<< HEAD
=======
}
>>>>>>> Anderson2.0





buildsDesign();
