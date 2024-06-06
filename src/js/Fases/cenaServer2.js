class CenaServer2 extends Phaser.Scene {
    invisibleServer;
    invisibleServer2;
    invisibleServer3;

    constructor() {
        super("cenaserver2");

    }
    preload() {
        this.load.image('bg_servidor1', './src/assets/saladoservidor.png');
        this.load.image('invisible-server', './src/assets/Invisivel.png');
        this.load.image('vision1', './src/assets/vision1.png');
        this.load.image('serverseparadoo' , './src/assets/servidorversaofinaltheend.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('serverseparado2','./src/assets/servidor2222.png');
        this.load.image('invisible-server2','./src/assets/invisible-server2.png');
        this.load.image('serverseparado3','./src/assets/serverseparado3.png');
        this.load.image('invisible-server3','./src/assets/invisible-server3.png');
        this.load.image('okvision', './src/assets/quiz/botaoOkVision.png');
        this.load.image('box5', './src/assets/cloud/box5.png');
        
    }

    create() {
        
        voltarState.cenaAtualServidor2 = (true);
        buttonState.iniciouTelaServidor = (true);
        voltarState.cenaAtualServidor = (true);
        


        //cria os elementos do jogo.
        this.add.image(larguraJogo/2, alturaJogo/2, 'bg_servidor1').setDepth(0);
        this.add.image(1050, 150, 'box5');
        this.add.image(200, 210, 'vision1').setDepth(0).setScale(0.75);

        this.mouseClick = this.sound.add('clickSound', { loop: false });
        
        //botao ok
        this.botaoOk = this.add.image(1600, 200, 'okvision').setScale(0.8);
        this.botaoOk.setInteractive();
        this.botaoOk.on('pointerdown', () => {
            this.scene.start('minigame2')
            this.mouseClick.play();
        });

        this.botaoOk.on('pointerover', () => this.botaoOk.setScale(0.9));
        this.botaoOk.on('pointerout', () => this.botaoOk.setScale(0.8));

        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04);
        this.input.setDefaultCursor('none');

        //NAVEGADOR DE TELAS
        this.add.image( larguraJogo/2, 1220 , 'fundoBarra').setScale(0.5);

        botaoMedalhas = this.add.image(725, 1220 , 'bMedalhas').setScale(0.0398)
        botaoMedalhas.setInteractive()
         botaoMedalhas.on('pointerover', function() {
            botaoMedalhas.setScale(0.043)
        });
        botaoMedalhas.on('pointerout', function () {
            botaoMedalhas.setScale(0.0398)
        });
        botaoMedalhas.on('pointerdown', () => {
            this.scene.start('menuDeMedalhas')
            this.mouseClick.play();
        });

        // Adicioanando o botão de fases
        fasesButton = this.add.image(1215, 1220, 'bMenuDeFases').setScale(0.040);
        fasesButton.setInteractive();
        //botão aumenta qnd encosta o cursor
        fasesButton.on('pointerover', function () {
            
            fasesButton.setScale(0.045);
        });

        fasesButton.on('pointerout', function () {
            // Volte ao tamanho original quando o mouse sair
            fasesButton.setScale(0.040);
        });
        fasesButton.on('pointerdown', () => {
            this.scene.start("MenuDeFases")
            this.mouseClick.play();
        });

        //Botão do Oculoa
        navegador = this.add.image(830, 1220 , 'bInicio' ).setScale(0.14)
        if (buttonState.iniciouTelaInicial == (true)){
            navegador.setInteractive();
            // Se o mouse passar em cima aumenta
            navegador.on('pointerover', function () {
            navegador.setScale(0.16);
            });

            navegador.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            navegador.setScale(0.14);
            });
            navegador.on('pointerdown', () => {
                this.scene.start('TelaInicial');
                this.mouseClick.play();
            });
        };


        //Botão Servidor
        navegador2 = this.add.image(935, 1220 , 'bServidor' ).setScale(0.14)
        navegador2.setInteractive();
        // Se o mouse passar em cima aumenta
        navegador2.on('pointerover', function () {
            navegador2.setScale(0.16);
        });

        navegador2.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            navegador2.setScale(0.14);
        });
        if (buttonState.iniciouTelaServidor == (true)){
            navegador2.on('pointerdown', () => {
                this.scene.start('cenaServer')
                this.mouseClick.play();
            });
        };

        //Botão da Cloud
        navegador3 = this.add.image(1040, 1220 , 'BNuvem' ).setScale(0.04)
        navegador3.setInteractive();
        // Se o mouse passar em cima aumenta
        navegador3.on('pointerover', function () {

            navegador3.setScale(0.046);
           
        });

        navegador3.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            navegador3.setScale(0.04);
            
        });
        if (buttonState.iniciouTelaNuvem == (true)){
            navegador3.on('pointerdown', () => {
                this.scene.start('cenacloud')
                this.mouseClick.play();
            });
        };
        
        //FIM DO NAVEGADOR DE TELAS

        var dialogText = this.add.text(375, 80, 'qqqq', {
            fontFamily: 'Arial',
            fontSize: '35px',
            fill: '#ffffff',
            wordWrap: { width: 1380 }
        });

        //texto a ser exibido gradualmente.
        const fullText = "Uau! você já viu tudo que tinhamos para mostrar aqui, então mudarei nosso cenário, mas para isso preciso que me guie até a sala cloud. Pode me ajudar?"
        var currentText = '';
        var index = 0;
        var speed = 50; //velocidade de digitação em milissegundos.

        //função para animar o texto sendo digitado.
        this.time.addEvent({
            callback: function () {
                if (index < fullText.length) {
                    currentText += fullText[index];
                    dialogText.setText(currentText).setDepth(5);
                    index++;
                }
            },
            callbackScope: this,
            loop: true,
            delay: speed
        });

        
    }

    update() {
        //configuração do cursor personalizado.
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

    }
    
}
