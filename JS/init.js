// Init function
constroiObjetosImages();
opcoes[7].select.onload = menuRestart;

function menuRestart(){
    music(); // carrega e da play na musica de fundo do game
    telaCarregamento(); // Mostra a tela inicial durante 5 segundos com uma mensagem de loading que na verdade não acontece
    loadingScreen=setInterval(criaMenuSelect,1000); // espera 5 segundos e executa a função criaMenuSelect que é o menu de seleção de personagens


}
