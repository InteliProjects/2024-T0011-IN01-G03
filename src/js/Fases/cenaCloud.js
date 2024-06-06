class CenaCloud extends Phaser.Scene {
    invisibleServer;

    constructor() {
        super("cenacloud");

    }
    preload() {
        this.load.image('salacloud', './src/assets/cloud/salacloudsemcloud3.png');
        this.load.image('vision1', './src/assets/cloud/Vision3.0.png');
        this.load.image('servidorcloudinvisivel', './src/assets/cloud/servidorcloudinvisivel.png');
        this.load.image('servidoroutline', './src/assets/cloud/recortadooutline.png');
        this.load.image('camadacloud', './src/assets/cloud/nuvenscamada.png');
        this.load.image('boxvision', './src/assets/cloud/box.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
    }

    create() {
        //Início dos verificadores de estado
        serverState.servidorLivre = (true);
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (false);
        voltarState.cenaAtualFase1Dois = (false);
        voltarState.cenaAtualFase2 = (false);
        voltarState.cenaAtualFase2Um = (false);
        voltarState.cenaAtualFase2Dois = (false);
        voltarState.cenaAtualFase3 = (false);
        voltarState.cenaAtualFase3Um = (false);
        voltarState.cenaAtuaLFase3Dois = (false);
        voltarState.cenaAtualFase3Tres = (false);
        voltarState.cenaAtualNuvem = (true);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
        buttonState.iniciouTelaNuvem = (true);
        //Fim dos verificadores

        
        this.add.image(larguraJogo/2, alturaJogo/2, 'salacloud').setDepth(0);//Fundo da sala
        
        
        //NAVEGADOR DE TELAS
        this.add.image( larguraJogo/2, 1220 , 'fundoBarra').setScale(0.5);
        this.mouseClick = this.sound.add('clickSound', { loop: false });//som do clique

        // Adicioanando o botão de fases
        fasesButton = this.add.image(1215, 1220, 'bMenuDeFases').setScale(0.040);
        fasesButton.setInteractive();

        //botão aumenta quando encosta no cursor
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
            // Se o mause passar em cima aumenta
            navegador.on('pointerover', function () {
            navegador.setScale(0.16);
            });

            navegador.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
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
        
        // Aumenta o tamanho do botão ao passar o mouse 
        navegador2.on('pointerover', function () {
            navegador2.setScale(0.16);
        });

        navegador2.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
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
        
        //Se o mouse passar em cima aumenta
        navegador3.on('pointerover', function () {

            navegador3.setScale(0.046);
           
        });

        navegador3.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
            navegador3.setScale(0.04);
            
        });

        if (buttonState.iniciouTelaNuvem == (true)){
            navegador3.on('pointerdown', () => {
                this.scene.start('cenacloud')
                this.mouseClick.play();
            });
        };

        //FIM DO NAVEGADOR DE TELAS
        this.add.image(larguraJogo/2, alturaJogo/2, 'camadacloud').setDepth(1);
        this.add.image(200, 210, 'vision1').setDepth(3).setScale(0.75);
        this.add.image(830, 160, 'boxvision').setDepth(3).setScale(0.65);
        

        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

        //Formatação do texto da Vision
        var dialogText = this.add.text(400, 60, '', {
            fontFamily: 'Arial',
            fontSize: '36px',
            fill: '#000000',
            wordWrap: { width: 890 }
        });
        

        nuvemState.servidorFase4 = true;
        if (nuvemState.servidorFase4 = true && nuvemState.servidorLivree == false) {
        
            //texto a ser exibido gradualmente.
            const fullText = "Uau! Muito obrigada pela sua ajuda! Agora estamos na minha sala favorita, a Sala Cloud, onde todas as informações estão armazenadas. Vamos clicar no primeiro servidor para aprender como funciona o processo de criação de contas na Oracle Academy!"//INSERIR O TEXTO DA VISION AQUI
            var currentText = '';
            var index = 0;
            var speed = 30; //velocidade de digitação em milissegundos.

            var timerEvent = this.time.addEvent({
                callback: () => {
                    if (index < fullText.length) {
                    currentText += fullText[index];
                    dialogText.setText(currentText).setDepth(5);
                    index++;
                    } 
                    if (index == fullText.length) {
                        nuvemState.textServidorFase4 = true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (nuvemState.textServidorFase4) {
                        this.invisibleServer = this.add.image(690, 460, 'servidorcloudinvisivel').setScale(1.03);
                        this.invisibleServer.setInteractive();
                        this.invisibleServer.on("pointerover", () => this.invisibleServer.setTexture('servidoroutline'));
                        this.invisibleServer.on("pointerout", () => {
                            this.invisibleServer.setTexture('servidorcloudinvisivel')
                        });

                        this.invisibleServer.on('pointerdown', () => {
                            this.scene.start("fase4");
                            this.mouseClick.play();
                        });
                       
                    }},

                callbackScope: this,
                loop: true,
                delay: speed
            });
        };

        if (nuvemState.servidorLivree) {
        //texto a ser exibido gradualmente.
            const fullText = "Livre"
            var currentText = '';
            var index = 0;
            var speed = 50; //velocidade de digitação em milissegundos.

            var timerEvent = this.time.addEvent({
                callback: () => {
                    if (index < fullText.length) {
                    currentText += fullText[index];
                    dialogText.setText(currentText).setDepth(5);
                    index++;
                    } 
                    if (index == fullText.length) {
                        nuvemState.textservidorLivree = true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (nuvemState.textservidorLivree) {
                        this.invisibleServer = this.add.image(690, 460, 'servidorcloudinvisivel').setScale(1.03);
                        this.invisibleServer.setInteractive();
                        this.invisibleServer.on("pointerover", () => this.invisibleServer.setTexture('servidoroutline'));
                        this.invisibleServer.on("pointerout", () => {
                            this.invisibleServer.setTexture('servidorcloudinvisivel')
                        });

                        this.invisibleServer.on('pointerdown', () => {
                            this.scene.start("fase4");
                            this.mouseClick.play();
                        });
                       
                    }},
                callbackScope: this,
                loop: true,
                delay: speed
            });
        }


        
    }
    

    update() {
        //configuração do cursor personalizado.
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

    }
    
}
