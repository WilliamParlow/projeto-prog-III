# ProjetoProg III - Trabalho de aula de programação III - Manipulação de polígonos

## Descrição básica

Desenvolver um game do gênero puzzle, com o objetivo de girar um quadrado com um labirinto desenhado em seu interior, contendo fluidos dentro, onde o mesmo deve passar pelo labirinto e cair por uma parte aberta do quadrado dentro de um tubo de ensaio. A fluido que cai no tubo conta pontos e o que sair fora desconta.

***Integrantes:*** *William Parlow, Willyam Castro, Thiago Andrey Zils, Bianca Quintaes e Anderson Merten*

## Comandos do Git Flow e do bash

* **_cd < diretório >_** - Utilizado para navegar pelas pastas

* **_git clone < link-do-repositorio >_** - utilizado para clonar a pasta do repositorio (baixar). O link é obtido no botão Clone or download na página principal do repositório

* **_git checkout < nome-da-branch >_** - utilizado para mudar de branch. Pode ser quelquer uma existente.

* **_git flow init_** - Inicializa o git flow. Para isso deve estar na branch master. Fazer um _git checkout master_ para entrar na branch master. Para o desenvolvimento do projeto, criamos todas as branches dentro da branch develop.

* **_git flow feature start < nome-da-branch >_** - Inicia uma nova feature do projeto

* **_git flow feature finish < nome-da-branch >_** - Finaliza uma feature do projeto

* **_git add < . >(Ponto final)_** - adiciona os arquivos modificados do projeto para commitar

* **_git commit -m < "comentario" >_** - Utilizado para comitar as mudanças desenvolvidas

* **_git push origin < nome-da-branch >_** - Faz upload das modificações para o repositório do GitHub. Para as features, o comando é _git push origin feature/< nome-da-feature >_

* **_git pull_** - Atualiza as branches com a última versão do git

### OBS: Toda vez que a feature for finalizada, será redirecionado para a branch develop. Após isso acontecer, executar o comando git push origin develop para atualizar a branch no diretório do GitHub
