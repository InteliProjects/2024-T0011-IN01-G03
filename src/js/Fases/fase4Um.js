let bSolicitar
//declaração da classe Fase2, que herda de Phaser.Scene.
class Fase4Um extends Phaser.Scene {
    constructor() {
        super("fase4Um"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        //carrega imagens e spritesheets.
        
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundoo' , './src/assets/salacloudcloudblur.png');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem2' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('nuvem2' , './src/assets/cloud2.png');
        this.load.image('bSol' , './src/assets/botaoSolicitar.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        

    }

    create() {
        //Verificadores de estado
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
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (true);
        voltarState.cenaAtualFase4Dois = (false);
        gameState.iniciouFase1 = (true);
        
        
        //Adicionar sprite, imagens e sons
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundoo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'nuvem2').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
        seta = this.add.sprite(150 , 950 , 'seta');

        //Adicionar Botão solicitar
        bSolicitar = this.add.image( 616 , 950, 'bSol').setScale(0.74);
        bSolicitar.setInteractive()
        bSolicitar.on('pointerover', function () {

            bSolicitar.setScale(0.85);
        });

        bSolicitar.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bSolicitar.setScale(0.74);
        });
        bSolicitar.on('pointerdown', () => {
            this.scene.start('fase4Dois')
            this.mouseClick.play();
        });



        //NAVEGADOR DE TELAS
        this.add.image( larguraJogo/2, 1220 , 'fundoBarra').setScale(0.5);

        botaoMedalhas = this.add.image(725, 1220 , 'bMedalhas').setScale(0.0398);
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

        // Adicionando o botão de fases
        fasesButton = this.add.image(1215, 1220, 'bMenuDeFases').setScale(0.040);
        fasesButton.setInteractive();
        //botão aumenta quando encosta o cursor
        fasesButton.on('pointerover', function () {
            
            fasesButton.setScale(0.045);
        });

        fasesButton.on('pointerout', function () {
            // Volte ao tamanho original quando o mouse sair
            fasesButton.setScale(0.040);
        });
        fasesButton.on('pointerdown', () => {
            this.scene.start("MenuDeFases");
            this.mouseClick.play();
        });

        //Botão do Óculos
        navegador = this.add.image(830, 1220 , 'bInicio' ).setScale(0.14);
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
                this.scene.start('TelaInicial')
                this.mouseClick.play();
            });
        };


        //Botão Servidor
        navegador2 = this.add.image(935, 1220 , 'bServidor' ).setScale(0.14);
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
        navegador3 = this.add.image(1040, 1220 , 'BNuvem' ).setScale(0.04);
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
                this.scene.start('')
                this.mouseClick.play();
            });
        };
        //FIM DO NAVEGADOR DE TELAS

        //Trocar cursor
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');


    }

    update() {
     
        seta.anims.play('fly', true);

        
        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
        });
    };
}