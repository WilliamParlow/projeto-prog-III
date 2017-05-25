// Init function
constroiObjetosImages();
opcoes[7].select.onload = function(){



    music();
    telaCarregamento();
    loadingScreen=setInterval(criaMenuSelect,5000);


}

function telaCarregamento(){
  contextoTemporario.fillStyle = "#FFF";
  contextoTemporario.font = "50px 'Press Start 2P'";
  contextoTemporario.fillText("Undefined",300,100);
  contextoTemporario.fillText("Best game Ever!",150,200);
  contextoTemporario.fillText("Carregando... ",300,500);

}
