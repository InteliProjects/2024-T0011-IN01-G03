const larguraJogo = 1920; //largura do jogo.
const alturaJogo = 1280; //altura do jogo.


// Declaração de variáveis globais para o sistema de eventos e música
var music;

// variavel gameState para o menuDeFases
var gameState = {
    iniciouFase1: false,
    iniciouQuizz: false,

    iniciouVirus: false,
    iniciouFase2: false,
    iniciouJogoDaMemoria: false,
    
    iniciouFase3: false,
    iniciouConector: false,

    iniciouEscadaNuvem: false,
    iniciouFase4: false,

    iniciouFase5: false
};
// variável gameState para a barra de progresso 
var buttonState = {
    iniciouTelaInicial: true,
    iniciouTelaServidor: false,
    iniciouTelaNuvem: false,
};

// variável gameState para o botão voltar do menu de fases
var voltarState = {
    cenaAtualServidor: false,
    cenaAtualServidor2: false,
    cenaAtualFase1: false,
    cenaAtualFase1Um: false,
    cenaAtualFase1Dois: false,
    cenaAtualFase2: false,
    cenaAtualFase2Um: false,
    cenaAtualFase2Dois: false,
    cenaAtualFase3: false,
    cenaAtualFase3Um: false,
    cenaAtuaLFase3Dois: false,
    cenaAtualFase3Tres: false,
    cenaAtualNuvem: false,
    cenaAtualFase4: false,
    cenaAtualFase4Um: false,
    cenaAtualFase4Dois: false,
}

var serverState = {
    servidorFase1: false,
    textServidorFase1: false,

    servidorFase2: false,
    textServidorFase2: false,

    servidorFase3: false,
    textServidorFase3: false,

    servidorLivre: false,
    textServidoLivre: false, 

    fake: false,
}

var medalhaState = {
    bmQuizz1: false,
    bmVirus: false,
    bmJogoDaMemoria: false,
    bmConect: false,
    bmVisionNuvem: false,
    bmQquizz2: false,
}

var nuvemState = {
    servidorFase4: false,
    textServidorFase4: false,

    servidorLivree: false,
    textservidorLivree: false,
}

var musicState = {

    musicSoundPlaying: false,
    musicSound: null,
    musicOculosPlaying: false,
    musicOculos: null,
    musicCloudPlaying: false,
    musicCloud: null,
    musicMinigame: null,
    musicMinigamePlaying: false
};




window.onload = function () {

    let gameConfig =
    {
        type: Phaser.AUTO,
        scale: {
            mode: Phaser.Scale.FIT,
            width: larguraJogo,
            height: alturaJogo,
            autoCenter: Phaser.Scale.CENTER
        },
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 400 },
                debug:false
            }
        },

        backgroundColor: '#000000',//fundo padrão

        scene: [TelaInicial, TelaTransicao1, Cadastro, Vision, CenaServer, CenaServer2, CenaCloud, Puzzle, Fase1, Flashcard1, Quiz, Quiz2, Quiz3, Quiz4, MiniGame1, ContextoMinigame1, MiniGame2, MemoryGame, TelaFinal, MenuConfig, MenuDeFases, Fase1Um, Fase1Dois, Fase2, Fase2Um, Fase2Dois, Fase3, Fase3Um, Fase3Dois, Fase3Tres, Fase4, Fase4Um, Fase4Dois, MenuDeMedalhas, Creditos],//fases e menus

        parent: 'game',
        dom: {
            createContainer: true
        },
    };
    game = new Phaser.Game(gameConfig);

    window.focus();
}

//função para fazer com que qualquer botão alterne entre duas texturas se o mouse estiver em cima.
function botaoHover(botao, textura1, textura2) {
    botao.on("pointerover", () => botao.setTexture(textura2));
    botao.on("pointerout", () => botao.setTexture(textura1));
}


