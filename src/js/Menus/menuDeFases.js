//criando variaveis
let cenaAtual;

let botaoFaseUm;
let botaoQuizz;
let botaoVirus;

let botaoFaseDois;
let botaoMemoria;

let botaoFaseTres;
let botaoConect;
let botaoEscadaNuvem;

let botaoFaseQuatro;
let botaoFaseCinco;

let voltar;
let textF1;
let textF2;
let textF3;
let textF4;
let textF5;


//Criando e nomeando uma classe (cena)
class MenuDeFases extends Phaser.Scene {

    constructor() {
        super("MenuDeFases")
    }

    //Carregando e nomenado imagens
    preload() {
        this.load.image("fundo5", "./src/assets/telainiciallogolessblur2.png");
        this.load.image("botUm" , "./src/assets/botaoFum.png");
        this.load.image("botDois" , "./src/assets/botaofase2.png");
        this.load.image("botTres" , "./src/assets/botaoCanal.png");
        this.load.image("botQuatro" , "./src/assets/botão nuvem.png");
        this.load.image("botCinco" , "./src/assets/botaofase5.png");
        this.load.image("bVoltar", "./src/assets/botaodevoltar.png");
        this.load.image("bQuizz", "./src/assets/botaoquiz.png");
        this.load.image("bVirus" , "./src/assets/botaovirus.png");
        this.load.image("bMemoria" , "./src/assets/botaojogodamemoria.png");
        this.load.image("bConect" , "./src/assets/conectarcards.png");
        this.load.image("bNuvem" , "./src/assets/visionpulo.png");
    }


    create() {
        //Imagem de fundo
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundo5');

        this.mouseClick = this.sound.add('clickSound', { loop: false }); // cria o efeito sonoro de clique

        //Mudando o Mouse
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.04).setOrigin(0.15, 0.04).setDepth(10);
        this.input.setDefaultCursor('none');

        //INICIO: CRIANDO TEXTO DOS BOTÕES DE FASES
        textF1 = this.add.text(445, 292, 'FASE 1', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#ffffff' });
        textF1.setVisible(false)

        textF2 = this.add.text(680, 838, 'FASE 2', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#ffffff' });
        textF2.setVisible(false)

        textF3 = this.add.text(900, 292, 'FASE 3', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#ffffff' });
        textF3.setVisible(false)

        textF4 = this.add.text(1135, 838, 'FASE 4', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#ffffff' });
        textF4.setVisible(false)

        textF5 = this.add.text(1360, 292, 'FASE 5', { fontFamily: 'Comic Sans MS', fontSize: 35, color: '#ffffff' });
        textF5.setVisible(false)
    
        //FIM: CRIANDO TEXTO DOS BOTÕES DE FASES

        //INICIO BOTÃO VOLTAR
        // Cria um botão de voltar
        voltar = this.add.image(215, 230, 'bVoltar').setScale(0.048)
        voltar.setInteractive();
        // Se o mause passar em cima aumenta
        voltar.on('pointerover', function () {

            voltar.setScale(0.058);
        });

        voltar.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            voltar.setScale(0.048);
        });


        function voltarParaFaseAnterior(contexto) {

        { if (voltarState.cenaAtualServidor == (true)){
            contexto.scene.start('cenaServer'); 
        }}
        { if (voltarState.cenaAtualServidor2 == (true)){
            contexto.scene.start('cenaServer2'); 
        }}
        { if (voltarState.cenaAtualFase1 == (true)){
            contexto.scene.start('fase1');
        }}
        {if (voltarState.cenaAtualFase1Um == (true)){
            contexto.scene.start('fase1Um');
        }}
        {if (voltarState.cenaAtualFase1Dois == (true)){
            contexto.scene.start('Fase1Dois');
        }}
        {if (voltarState.cenaAtualFase2 == (true)){
            contexto.scene.start('fase2');
        }}
        {if (voltarState.cenaAtualFase2Um == (true)){
            contexto.scene.start('fase2Um');
        }}
        {if (voltarState.cenaAtualFase2Dois == (true)){
            contexto.scene.start('fase2Dois');
        }}
        {if (voltarState.cenaAtualFase3 == (true)){
            contexto.scene.start('fase3');
        }}
        {if (voltarState.cenaAtualFase3Um == (true)){
            contexto.scene.start('fase3Um');
        }}
        {if (voltarState.cenaAtuaLFase3Dois == (true)){
            contexto.scene.start('fase3Dois');
        }}       
        {if (voltarState.cenaAtualFase3Tres == (true)){
            contexto.scene.start('fase3Tres');
        }}
        {if (voltarState.cenaAtualFase4 == (true)){
            contexto.scene.start('fase4');
        }}
        {if (voltarState.cenaAtualFase4Um == (true)){
            contexto.scene.start('fase4Um');
        }}
        {if (voltarState.cenaAtualFase4Dois == (true)){
            contexto.scene.start('fase4Dois');
        }}
        }  
        voltar.on('pointerdown', () => {
            voltarParaFaseAnterior(this)
            this.mouseClick.play();
        });
        //FIM BOTÃO VOLTAR


       
    
       //Criando,posicionando, ajustando o tamanho e tornando interativo o botão 
    
        botaoFaseUm = this.add.image(505, 445, 'botUm').setScale(0.074).setVisible(false);
        botaoFaseUm.setInteractive();
        botaoFaseUm.on('pointerover', function () {
            // Se o mouse passar em cima aumenta
            botaoFaseUm.setScale(0.09);
            textF1.setVisible(true)
            
        });
        botaoFaseUm.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoFaseUm.setScale(0.074);
            textF1.setVisible(false)
        });
        botaoFaseUm.on('pointerdown', () => {
            this.scene.start('fase1')
            this.mouseClick.play();
        });

        botaoQuizz = this.add.image(570, 550, 'bQuizz').setScale(0.03).setVisible(false)
        botaoQuizz.setInteractive();
        botaoQuizz.on('pointerover', function () {
            botaoQuizz.setScale(0.046)
        })
        botaoQuizz.on('pointerout', function() {
            botaoQuizz.setScale(0.03)
        })
        botaoQuizz.on('pointerdown', () => {
            this.scene.start('quiz')
            this.mouseClick.play();
        });

        this.load.image("bVirus" , "./src/assets/botaovirus.png");
        botaoVirus = this.add.image(645, 635, 'bVirus').setScale(0.03).setVisible(false)
        botaoVirus.setInteractive();
        botaoVirus.on('pointerover', function () {
            botaoVirus.setScale(0.046)
        })
        botaoVirus.on('pointerout', function() {
            botaoVirus.setScale(0.03)
        })
        botaoVirus.on('pointerdown', () => {
            this.scene.start('minigame1')
            this.mouseClick.play();
        });


        //Criando,posicionando, ajustando o tamanho e tornando interativo o botão 
        botaoFaseDois = this.add.image(735, 735, 'botDois').setScale(0.072).setVisible(false);
        botaoFaseDois.setInteractive();
        botaoFaseDois.on('pointerover', function () {
            // Se o mouse passar em cima aumenta
            botaoFaseDois.setScale(0.09);
            textF2.setVisible(true)
        });

        botaoFaseDois.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoFaseDois.setScale(0.072);
            textF2.setVisible(false)
        });
        botaoFaseDois.on('pointerdown', () => {
            this.scene.start('fase2')
            this.mouseClick.play();
        });

        botaoMemoria = this.add.image(850, 590, 'bMemoria').setScale(0.03).setVisible(false)
        botaoMemoria.setInteractive();
        botaoMemoria.on('pointerover', function () {
            botaoMemoria.setScale(0.046)
        })
        botaoMemoria.on('pointerout', function() {
            botaoMemoria.setScale(0.03)
        })
        botaoMemoria.on('pointerdown', () => {
            this.scene.start('memory_game')
            this.mouseClick.play();
        });

        //Criando,posicionando, ajustando o tamanho e tornando interativo o botão 
        botaoFaseTres = this.add.image(960, 445, 'botTres').setScale(0.072).setVisible(false);
        botaoFaseTres.setInteractive();
        botaoFaseTres.on('pointerover', function () {
            // Se o mouse passar em cima aumenta
            botaoFaseTres.setScale(0.09);
            textF3.setVisible(true)
        });

        botaoFaseTres.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoFaseTres.setScale(0.072);
            textF3.setVisible(false)
        });
        botaoFaseTres.on('pointerdown', () => {
            this.scene.start('fase3')
            this.mouseClick.play();
        });

        botaoConect = this.add.image(1035, 550, 'bConect').setScale(0.03).setVisible(false)
        botaoConect.setInteractive();
        botaoConect.on('pointerover', function () {
            botaoConect.setScale(0.046)
        })
        botaoConect.on('pointerout', function() {
            botaoConect.setScale(0.03)
        })
        botaoConect.on('pointerdown', () => {
            this.scene.start('puzzle')
            this.mouseClick.play();
        });

        botaoEscadaNuvem = this.add.image(1107, 635, 'bNuvem').setScale(0.03).setVisible(false)
        botaoEscadaNuvem.setInteractive();
        botaoEscadaNuvem.on('pointerover', function () {
            botaoEscadaNuvem.setScale(0.046)
        })
        botaoEscadaNuvem.on('pointerout', function() {
            botaoEscadaNuvem.setScale(0.03)
        })
        botaoEscadaNuvem.on('pointerdown', () => {
            this.scene.start('minigame2');
            this.mouseClick.play();
        });




        //Criando,posicionando, ajustando o tamanho e tornando interativo o botão 
        botaoFaseQuatro = this.add.image(1190, 735, 'botQuatro').setScale(0.28).setVisible(false);
        botaoFaseQuatro.setInteractive();
        botaoFaseQuatro.on('pointerover', function () {
            // Se o mouse passar em cima aumenta

            botaoFaseQuatro.setScale(0.33);
            textF4.setVisible(true)
            
        });

        botaoFaseQuatro.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoFaseQuatro.setScale(0.28);
            textF4.setVisible(false)
            
        });
        botaoFaseQuatro.on('pointerdown', () => {
            this.scene.start('fase4')
            this.mouseClick.play();
        });


        //Criando, posicionando, ajustando o tamanho e tornando interativo o botão 
        botaoFaseCinco = this.add.image(1415, 445, 'botCinco').setScale(0.072).setVisible(false);
        botaoFaseCinco.setInteractive();
        botaoFaseCinco.on('pointerover', function () {
            // Se o mouse passar em cima aumenta

            botaoFaseCinco.setScale(0.09);
            textF5.setVisible(true)
        });

        botaoFaseCinco.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoFaseCinco.setScale(0.072);
            textF5.setVisible(false)
        });
        

 
        if (gameState.iniciouFase1 == (true)){
            botaoFaseUm.setVisible(true)
        }

        else {botaoFaseUm.setVisible(false)
        }

        if(gameState.iniciouQuizz == (true)){
            botaoQuizz.setVisible(true)
        }
        else{botaoQuizz.setVisible(false)}

        if(gameState.iniciouVirus == (true)){
            botaoVirus.setVisible(true)
        }
        else{botaoVirus.setVisible(false)}


        if (gameState.iniciouFase2 == (true)){
            botaoFaseDois.setVisible(true)
        }
        else {botaoFaseDois.setVisible(false)
        }

        if(gameState.iniciouJogoDaMemoria == (true)){
            botaoMemoria.setVisible(true)
        }
        else{botaoMemoria.setVisible(false)
        }


        if (gameState.iniciouFase3 == (true)){
            botaoFaseTres.setVisible(true)
        }
        else {botaoFaseTres.setVisible(false)
        }

        if(gameState.iniciouConector == (true)){
            botaoConect.setVisible(true)
        }
        else{botaoConect.setVisible(false)
        }

        if(gameState.iniciouEscadaNuvem == (true)){
            botaoEscadaNuvem.setVisible(true)
        }
        else{botaoEscadaNuvem.setVisible(false)}

        if (gameState.iniciouFase4 == (true)){
            botaoFaseQuatro.setVisible(true)
        }
        else {botaoFaseQuatro.setVisible(false)
        }


        if (gameState.iniciouFase5 == (true)){
            botaoFaseCinco.setVisible(true)
        }

        else {botaoFaseCinco.setVisible(false)
        }
    }

    update() {
        // adicionando a função de mouse ao novo mouse
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

    }

}