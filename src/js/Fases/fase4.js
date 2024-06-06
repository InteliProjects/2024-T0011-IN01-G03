let bRecursos
//declaração da classe Fase2, que herda de Phaser.Scene.
class Fase4 extends Phaser.Scene {
    constructor() {
        super("fase4"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        //carrega imagens e spritesheets.
        
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundoo5' , './src/assets/salacloudcloudblur.png');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('nuvem1' , './src/assets/cloud1.png');
        this.load.image('bRec' , './src/assets/botaoRecursos.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        this.add.image( larguraJogo/2, 1220 , 'fundoBarra').setScale(0.5);

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
        voltarState.cenaAtualFase4 = (true);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
        buttonState.iniciouTelaNuvem = (true);
        gameState.iniciouFase1 = (true);
        gameState.iniciouFase2 = (true);
        gameState.iniciouFase3 = (true);
        gameState.iniciouFase4 = (true);
       
        
        
        //Adição de cenas
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundoo5');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'nuvem1').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
        seta = this.add.sprite(150 , 655 , 'seta');

        //Botão recursos
        bRecursos = this.add.image( 350 , 655, 'bRec').setScale(0.6);
        bRecursos.setInteractive();
        bRecursos.on('pointerover', function () {

            bRecursos.setScale(0.8);
        });

        bRecursos.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bRecursos.setScale(0.6);
        });
        bRecursos.on('pointerdown', () => {
            this.scene.start('fase4Um');
            this.mouseClick.play();
        });



        //Botão de medalhas
        botaoMedalhas = this.add.image(725, 1220 , 'bMedalhas').setScale(0.0398);
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

        // Adicioanando o botão de fases
        
        fasesButton = this.add.image(1215, 1220, 'bMenuDeFases').setScale(0.040);
        fasesButton.setInteractive();
        //botão aumenta quando encosta o cursor
        fasesButton.on('pointerover', function () {
            
            fasesButton.setScale(0.045);
        });

        fasesButton.on('pointerout', function () {
            // Volta ao tamanho original quando o mouse sair
            fasesButton.setScale(0.040);
        });
        fasesButton.on('pointerdown', () => {
            this.scene.start("MenuDeFases");
            this.mouseClick.play();
        });

        //Botão do Óculos
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
                this.scene.start('TelaInicial')
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
        };

        //Botão da Cloud
        navegador3 = this.add.image(1040, 1220 , 'BNuvem' ).setScale(0.04)
        navegador3.setInteractive();
        //Se o mouse passar em cima aumenta
        navegador3.on('pointerover', function () {

            navegador3.setScale(0.046);
           
        });

        navegador3.on('pointerout', function () {
            //Voltar ao tamanho original quando o mouse sair
            navegador3.setScale(0.04);
            
        });
        if (buttonState.iniciouTelaNuvem == (true)){
            navegador3.on('pointerdown', () => {
                this.scene.start('cenacloud');
                this.mouseClick.play();
            });
        }

        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');


    }

    update() {
        

        //Ativação da seta
        seta.anims.play('fly', true)

        //Configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    
        //Criar animação da seta
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
    })
}
}