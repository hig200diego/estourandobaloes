var timerId = null; // Variável que armazena a chamada da função timeout

// Ao iniciar o body, essa função será chamada.
function iniciaJogo() {

    //Pega o nível do jogo
    var url = window.location.search; // Pega a partir da ?

    // Pega apenas o o nível do jogo sem a string "?"
    var nivel_jogo = url.replace("?", ""); // Substitui o "?" por nada
    
    var tempo_segundos = 0;

    if (nivel_jogo == 1) {
        tempo_segundos = 120;
    }

    if (nivel_jogo == 2) {
        tempo_segundos = 60;
    }

    if (nivel_jogo == 3) {
        tempo_segundos = 30;
    }

    // Inserir os segundos na SPAN
    document.getElementById("cronometro").innerHTML = tempo_segundos;

    // Quantidade de balões
    var qtd_baloes = 80;
    cria_baloes(qtd_baloes);

    document.getElementById("baloes_inteiros").innerHTML = qtd_baloes; // Imprimir a quantidade de balões inteiros
    
    document.getElementById("baloes_estourados").innerHTML = 0; // Imprimir a quantidade de balões estourados

    contagemTempo(tempo_segundos + 1);
}

// Função que decrementa dos segundos
function contagemTempo(segundos) {
   segundos = segundos - 1; // Decrementando os segundos
   if (segundos == -1){
       clearTimeout(timerId); // Interrompe a execução da função setTimeout
       gameOver();
       return false;
   }
   document.getElementById("cronometro").innerHTML = segundos;
   timerId =  setTimeout("contagemTempo("+segundos+")", 1000);
}

function gameOver() {
    removeEventos();
    alert("Fim de jogo, você não conseguiu estourar os balões a tempo!");
}

// Função para criar balões
function cria_baloes(qtd_baloes){

    for (var i = 1; i <= qtd_baloes; i++) {
        var balao  = document.createElement("img");
        balao.src = 'imagens/balao_azul_pequeno.png';
        balao.style.margin = "10px";
        balao.id = 'b'+ i; // Adciona IDs diferentes
        balao.onclick = function() { estourar(this); }

        document.getElementById("cenarioJogo").appendChild(balao);

        
    }

   

}

function estourar(e) {
    var id_balao = e.id; // Pega o id criado em 'balao.id'
    document.getElementById(id_balao).setAttribute("onclick", "");
    document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
    pontuacao(-1);

}

function pontuacao(acao) {
    var baloes_inteiros = document.getElementById("baloes_inteiros").innerHTML; // Recupera os valores da tela
    var baloes_estourados = document.getElementById("baloes_estourados").innerHTML; // Recupera os valores da tela;

    baloes_inteiros = parseInt(baloes_inteiros);
    baloes_estourados = parseInt(baloes_estourados);

    baloes_inteiros = baloes_inteiros + acao;
    baloes_estourados = baloes_estourados - acao;

    document.getElementById("baloes_inteiros").innerHTML = baloes_inteiros;
    document.getElementById("baloes_estourados").innerHTML = baloes_estourados;

    situacaoJogo(baloes_inteiros);
}

function situacaoJogo(baloes_inteiros) {
    
    if (baloes_inteiros == 0){
        alert("PARABÉNS, VOCÊ ESTOUROU TODOS OS BALÕES!");
        pararJogo();
    }

}

function pararJogo() {
    clearTimeout(timerId);
}

function removeEventos() {
    var i = 1; // contador para recuperar balões por id.
    // percorre os elementos de acordo com o id, e só irá sair do laço quando:
    while (document.getElementById('b'+ i)) {
        document.getElementById('b' + i).onclick = '';
        i++;
    }

}