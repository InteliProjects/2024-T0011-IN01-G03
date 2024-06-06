let botaoMHm;


class Fase1Dois extends Phaser.Scene{
    constructor() {
        super('Fase1Dois'); //chama o construtor da classe pai.
    }

    preload() {
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('cadastro3' , './src/assets/botões/cadastro3.png');
        this.load.image('bCC' , './src/assets/botaoCriarConta.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 })
        
    }

    create() {
        
        //Verificadores de estado
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (false);
        voltarState.cenaAtualFase1Dois = (true);
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

        //Adição das imagens que são utilizadas na cena
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cadastro3').setScale(1);
        
        //Adição do som de clique
        this.mouseClick = this.sound.add('clickSound', { loop: false });

        //Adição da seta
        seta1 = this.add.sprite(larguraJogo/2 - 360 , 970 , 'seta');


        //Botão Mhm
        botaoMHm = this.add.image(larguraJogo/2 + 20 , 970, 'bCC');
        botaoMHm.setInteractive()
        botaoMHm.on('pointerover', function () {

            botaoMHm.setScale(1.25);
        });

        botaoMHm.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
            botaoMHm.setScale(1);
        });
        botaoMHm.on('pointerdown', () => {
            this.mouseClick.play();
            this.scene.start('quiz');
        });


        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    }

    update() {
        //animação da seta é tocada
        seta1.anims.play('fly2', true);
        
        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        //criação da animação da seta
        this.anims.create({
            key: 'fly2',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
        });
       
    }
}