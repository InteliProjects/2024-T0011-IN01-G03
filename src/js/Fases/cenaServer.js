let botaoMedalhas

class CenaServer extends Phaser.Scene {
    invisibleServer;
    invisibleServer2;
    invisibleServer3;

    constructor() {
        super("cenaServer");
    }

    preload() {
        this.load.image('bg_servidor1', './src/assets/saladoservidor.png');
        this.load.image('invisible-server', './src/assets/Invisivel.png');
        this.load.image('vision1', './src/assets/vision1.png');
        this.load.image('serverseparadoo' , './src/assets/serverseparado1.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('serverseparado2','./src/assets/serverseparado2.png');
        this.load.image('invisible-server2','./src/assets/invisible-server2.png');
        this.load.image('serverseparado3','./src/assets/serverseparado3.png');
        this.load.image('invisible-server3','./src/assets/invisible-server3.png');
        this.load.image('box12', './src/assets/cloud/box5.png');
        this.load.image('bMedalhas' , './src/assets/botaomedalha.png');
    }

    create() {
        //Verificadores de estado
        buttonState.iniciouTelaServidor = (true);
        voltarState.cenaAtualServidor = (true);
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
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
        
        
        //Adiciona as imagens que serão utilizadas na cena.
        this.add.image(larguraJogo/2, alturaJogo/2, 'bg_servidor1').setDepth(0);        

        this.add.image(1050, 150, 'box12');
        this.add.image(200, 210, 'vision1').setDepth(0).setScale(0.75);

        //Muda o cursor do mouse
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

        this.mouseClick = this.sound.add('clickSound', { loop: false });

        //NAVEGADOR DE TELAS
        this.add.image( larguraJogo/2, 1220 , 'fundoBarra').setScale(0.5)

        // Adicionando o botão de fases
        fasesButton = this.add.image(1215, 1220, 'bMenuDeFases').setScale(0.040);
        fasesButton.setInteractive();
        //botão aumenta quando encosta no cursor
        fasesButton.on('pointerover', function () {
            fasesButton.setScale(0.045);
        });

        fasesButton.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            fasesButton.setScale(0.040);
        });
        fasesButton.on('pointerdown', () => {
            this.scene.start("MenuDeFases");
            this.mouseClick.play();
        });

        //Botão que leva ao menu de medalhas
        botaoMedalhas = this.add.image(725, 1220 , 'bMedalhas').setScale(0.0398)
        botaoMedalhas.setInteractive()
         botaoMedalhas.on('pointerover', function() {
             botaoMedalhas.setScale(0.043)
        });
        botaoMedalhas.on('pointerout', function () {
            botaoMedalhas.setScale(0.0398)
        });
        botaoMedalhas.on('pointerdown', () => {
            this.scene.start('menuDeMedalhas');
            this.mouseClick.play();
        });

        //Botão do Óculos
        navegador = this.add.image(830, 1220 , 'bInicio' ).setScale(0.14);

        if (buttonState.iniciouTelaInicial == (true)){

            navegador.setInteractive();
            // Se o mouse passar em cima aumenta o tamanho
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
                this.scene.start('cenaServer');
                this.mouseClick.play();
            });
        }

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
                this.scene.start('cenacloud');
                this.mouseClick.play();
            });
        }
        //FIM DO NAVEGADOR DE TELAS

        var dialogText = this.add.text(380, 70, '', {
            fontFamily: 'Arial',
            fontSize: '38px',
            fill: '#ffffff',
            wordWrap: { width: 1350 }
        });
        //função para animar o texto sendo digitado.

       
        //INICIO SERVER_STATE
        //Fase 1
        serverState.servidorFase1 = true;
        if (serverState.servidorFase1 = true && serverState.servidorFase2 == false) {
        //texto a ser exibido gradualmente.
            const fullText = "Bem-vindo à sala de servidores da Oracle Academy, onde cada detalhe é armazenado. Vou começar mostrando a você um servidor muito especial. Aqui, você poderá acompanhar todo o processo de cadastro de professores na plataforma. Está pronto? Então clique no primeiro servidor.";
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
                        serverState.textServidorFase1 = true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (serverState.textServidorFase1) {
                        this.invisibleServer = this.add.image(770, 615, 'invisible-server2').setScale(1);
                        this.invisibleServer.setInteractive();
                        this.invisibleServer.on("pointerover", () => this.invisibleServer.setTexture('serverseparadoo'));
                        this.invisibleServer.on("pointerout", () => {
                            this.invisibleServer.setTexture('invisible-server')
                        });
                        this.invisibleServer.on('pointerdown', () => {
                            this.scene.start("fase1");
                            this.mouseClick.play();
                        });
                       
                    }},
                callbackScope: this,
                loop: true,
                delay: speed
            });
        }

        //Fase 2 com vírus
        if(serverState.servidorFase2 && serverState.servidorFase3 == false) {

            
            
            //texto a ser exibido gradualmente.
            const fullText = "Parabéns! Agora você certamente sabe como se cadastrar em nossa plataforma. Gostaria de lhe mostrar algo igualmente interessante. Que tal descobrir como funciona a inscrição nos cursos da Oracle Academy? Então clique no segundo servidor para começarmos nossa segunda aventura.";
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
                        serverState.textServidorFase2 = true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (serverState.textServidorFase2) {
                     
                        this.invisibleServer2 = this.add.image(990, 605, 'invisible-server2').setScale(1.6);
                        this.invisibleServer2.setInteractive();
                        this.invisibleServer2.on("pointerover", () => this.invisibleServer2.setTexture('serverseparado2').setScale(1));
                        this.invisibleServer2.on("pointerout", () => {
                            this.invisibleServer2.setTexture('invisible-server2')
                        });
                        this.invisibleServer2.on('pointerdown', () => {
                            this.scene.start("contextoMinigame1");
                            this.mouseClick.play();
                        });
                    }},
                callbackScope: this,
                loop: true,
                delay: speed
            });            
        }
        
        //fase 3
        if(serverState.servidorFase3 && serverState.servidorLivre == false){
            
            //texto a ser exibido gradualmente.
            const fullText = "Você já imaginou criar seu próprio canal dentro da Oracle Academy? Nesta seção do site, vamos aprender a fazer exatamente isso. Clique no servidor 3 para começarmos.";
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
                        serverState.textServidorFase3 = true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (serverState.textServidorFase3) {                        
                        this.invisibleServer3 = this.add.image(1183, 593, 'invisible-server3').setScale(1);
                        this.invisibleServer3.setInteractive();
                        this.invisibleServer3.on("pointerover", () => this.invisibleServer3.setTexture('serverseparado3').setScale(1));
                        this.invisibleServer3.on("pointerout", () => {
                            this.invisibleServer3.setTexture('invisible-server3')
                        });
                        
                        this.invisibleServer3.on('pointerdown', () => {
                            this.scene.start("fase3");
                            this.mouseClick.play();
                        });
                    }},
                callbackScope: this,
                loop: true,
                delay: speed
            });          
        }
        //servidor livre
        if(serverState.servidorLivre && serverState.fake == false) {
            const fullText = "Agora que eu já te apresentei todas as cenas, sinta-se livre para explorar e relembrar por conta própria!";
            var currentText = '';
            var index = 0;
            var speed = 30;

            var timerEvent = this.time.addEvent({
                callback: () => {
                    if (index < fullText.length) {
                    currentText += fullText[index];
                    dialogText.setText(currentText).setDepth(5);
                    index++;
                    } 
                    if (index == fullText.length) {
                        serverState.textServidoLivre= true;
                        // Desativa o loop do evento de tempo quando todo o texto for exibido
                        timerEvent.remove(false);
                    }
                    if (serverState.textServidoLivre) {
                        this.invisibleServer = this.add.image(770, 615, 'invisible-server2').setScale(1);
                        this.invisibleServer.setInteractive();
                        this.invisibleServer.on("pointerover", () => this.invisibleServer.setTexture('serverseparadoo'));
                        this.invisibleServer.on("pointerout", () => {
                            this.invisibleServer.setTexture('invisible-server')
                        });
                        
                        this.invisibleServer2 = this.add.image(990, 605, 'invisible-server2').setScale(1.6);
                        this.invisibleServer2.setInteractive();
                        this.invisibleServer2.on("pointerover", () => this.invisibleServer2.setTexture('serverseparado2').setScale(1));
                        this.invisibleServer2.on("pointerout", () => {
            
                            this.invisibleServer2.setTexture('invisible-server2')
                        });                      

                        this.invisibleServer3 = this.add.image(1183, 593, 'invisible-server3').setScale(1);
                        this.invisibleServer3.setInteractive();
                        this.invisibleServer3.on("pointerover", () => this.invisibleServer3.setTexture('serverseparado3').setScale(1));
                        this.invisibleServer3.on("pointerout", () => {
                  
                            this.invisibleServer3.setTexture('invisible-server3')
                        });
                        this.invisibleServer.on('pointerdown', () => { 
                            this.scene.start("fase1");
                            this.mouseClick.play();
                        });
                        this.invisibleServer2.on('pointerdown', () => {
                            this.scene.start("fase2")
                            this.mouseClick.play();
                        });

                        this.invisibleServer3.on('pointerdown', () => {
                            this.scene.start("fase3");
                            this.mouseClick.play();
                        });
                         
                    }
                },
                callbackScope: this,
                loop: true,
                delay: speed
            });          
        }
        //FIM SERVERSTATE
    }

    update() {
        //configuração do cursor personalizado.
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

    }
    
}
