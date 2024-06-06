class Flashcard1 extends Phaser.Scene {
    constructor() {
        super("flashcard1");
        cenaAtual = 'flashcard1'

    }

    preload() {
        this.load.image('flash_card', './src/assets/flashCard.png');
    }

    create() {

        this.add.image(larguraJogo / 2, alturaJogo / 2, 'flash_card');

        //NAVEGADOR TELA INICIAL
        navegador = this.add.image(1600, 1200 , 'navegador');

        if (buttonState.iniciouTelaInicial == (true)){
        navegador.setInteractive();
        // Se o mouse passar em cima aumenta
        navegador.on('pointerover', function () {
            navegador.setScale(1.5);
        });

        navegador.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
            navegador.setScale(1);
        });
        navegador.on('pointerdown', () => this.scene.start('TelaInicial'));
        };


        //NAVEGADOR TELA DOS SERVIDORES
        navegador2 = this.add.image(1700, 1200 , 'navegador');

        

        //imagem do botão.
        this.botaoCard = this.add.image(750, 100, "botao").setScale(0.02);
        this.botaoCard2 = this.add.image(750, 100, "botao").setScale(0.02);

        //botao2 invisivel.
        this.botaoCard2.setVisible(false);


        //indica que a imagem é interativa.
        this.botaoCard.setInteractive();


        //imagem do card.
        this.card = this.add.image(larguraJogo / 2, alturaJogo / 2, 'card');
        this.card.setVisible(false);

        //configurar o que o botão deve fazer ao ser clicado (abrir card).
        this.botaoCard.on('pointerdown', () => this.scene.start('quiz'));



    }
    
    //o que fazer quando o botão de jogar é apertado.
    apertouBotaoCard() {
        //desabilitar interações com os botões.
        this.botaoCard.disableInteractive();

        //card e botao2 aparece. 
        this.card.setVisible(true);
        this.botaoCard2.setVisible(true);
    }

}







