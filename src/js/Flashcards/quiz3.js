// criação da classe Quiz para a cena do jogo de quiz
class Quiz3 extends Phaser.Scene {
    // declaração das variáveis da cena

    quizButton2;
    quizButton3;
    nextBT;
    resetContent;

    constructor() {
        super({
            key: 'quiz3'
        });
    }

    // inicialização dos controles do quiz
    init() {
        // controle de estado do jogo
        this.gameControls = {
            over: false,
            resetOverBT: null,
            resetWinBT: null,
            cursors: null,
            win: false
        };
    }

    // pré-carregamento das imagens do jogo
    preload() {

        this.load.image('server-bg', './src/assets/servidorCard.jpg');
        this.load.image('oCard1','./src/assets/flashcardCerto.png');
        this.load.image('verdadeiro','./src/assets/quiz/verdade.png');
        this.load.image('falso','./src/assets/quiz/falso.png');
        this.load.image('sequenciaquiz5','./src/assets/quiz/quiz55.png');
        this.load.image('enunciado','./src/assets/quiz/pergunta22.png');
        this.load.image('quizblur','./src/assets/quiz/quizborrado.png');
    }

    // criação dos elementos da cena
    create() {
        // background com a pergunta 
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'oCard1').setDepth(1);
        this.sequenciaquiz = this.add.image(larguraJogo / 2, 650, 'sequenciaquiz5').setDepth(1).setScale(0.7);
        this.enunciado = this.add.image(larguraJogo / 2, 370, 'enunciado').setDepth(2).setScale(0.8);

        // server borrado
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoo5').setDepth(0);

        this.gameWInSound = this.sound.add('winSound', { loop: false });
        this.wrongSound = this.sound.add('erroQuiz', { loop: false });

        // cria os botões que contém as alternativas
        this.quizButton2 = this.add.image(1420, 930, 'falso').setScale(1.4).setDepth(2);
        this.quizButton3 = this.add.image(500, 930, 'verdadeiro').setScale(1.4).setDepth(2);
        
        // Efeitos ao passar o mouse sobre os botões
        this.quizButton2.on('pointerover', () => this.quizButton2.setScale(1.6));
        this.quizButton2.on('pointerout', () => this.quizButton2.setScale(1.4));
        this.quizButton3.on('pointerover', () => this.quizButton3.setScale(1.6));
        this.quizButton3.on('pointerout', () => this.quizButton3.setScale(1.4));

        this.mouseClick = this.sound.add('clickSound', { loop: false });
        this.gameWInSound = this.sound.add('winSound', { loop: false });

        // adiciona interação
        this.quizButton2.setInteractive();
        this.quizButton3.setInteractive();

        // adiciona o cursor do mouse
        this.mouse = this.add.image(larguraJogo / 2 + 80, alturaJogo / 3 + 40, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(7);
        this.input.setDefaultCursor('none');

        //adiciona o placar e botão de reset
        this.gameControls.resetOverBT = this.add.image(larguraJogo / 2, alturaJogo / 2, 'gameOverBt').setScale(1.8).setInteractive().setVisible(false).setDepth(6);
        this.gameControls.resetWinBT = this.add.image(larguraJogo / 2, alturaJogo / 2 + 300, 'resetContent1').setScale(1.7).setInteractive().setVisible(false).setDepth(6);

         // Eventos de clique para reset
        this.gameControls.resetOverBT.on('pointerdown', function () {
            this.mouseClick.play();
            this.gameControls.over = false;
            this.gameControls.win = false;
            this.scene.restart();
        }, this);

        this.gameControls.resetWinBT.on('pointerdown', function () {
            this.mouseClick.play();
            this.gameControls.over = false;
            this.gameControls.win = false;
            this.scene.restart();
        }, this);

        // configuração dos eventos de clique nos botões do quiz
        this.quizButton2.on('pointerdown', function () {
            this.mouseClick.play();
            if (!this.gameControls.win) {
                if (!this.gameControls.over) {
                    this.gameControls.over = true;
                    this.wrongAnswer();
                }
            }
        }, this);

        this.quizButton3.on('pointerdown', function () {
            this.mouseClick.play();
            if (!this.gameControls.over) {
                this.rightAnswer();
            }
        }, this);
    }

    
    // atualização da cena
    update() {
        // atualização da posição do cursor personalizado
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    }

    // função chamada quando a resposta está errada
    wrongAnswer() {
        this.gameControls.over = true;
        this.gameControls.resetOverBT.visible = true;

        this.wrongSound.play();

        this.resetContent = this.add.image(larguraJogo / 2, alturaJogo/ 2 + 300, 'resetContent2').setScale(1.7).setInteractive().setVisible(true).setDepth(6);
        this.resetContent.on('pointerdown', () => this.scene.start('fase4'));

        this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
        this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos
    }

    // função chamada quando a resposta está correta
    rightAnswer() {
        this.gameControls.over = false;
        this.gameControls.win = true;
        this.gameControls.resetWinBT.visible = true;

        this.gameWInSound.play();

        this.nextBT = this.add.image(larguraJogo / 2, alturaJogo / 2, 'gameWinBt').setScale(2.0).setInteractive().setVisible(true).setDepth(6);
        this.nextBT.on('pointerdown', () => {
            this.scene.start('quiz4');
            this.mouseClick.play();
        });

        this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
        this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos

    }
}
