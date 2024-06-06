let botaoMH;
let botaoSH;
let seta1;

class Fase1Um extends Phaser.Scene{
    constructor() {
        super('fase1Um'); //chama o construtor da classe pai.
    }

    preload() {
        
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('cadastro2' , './src/assets/cadastro2.png');
        this.load.image('bMH' , './src/assets/botaoMemberHub.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        
    }

    create() {
        
        //Verificadores de estado
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (true);
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
             
        
        //Adição de imagens da cena
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cadastro2').setScale(1);
        seta1 = this.add.sprite(1000 , 340 , 'seta');
        this.mouseClick = this.sound.add('clickSound', { loop: false });
        
        //Botão MH
        botaoMH = this.add.image(1262, 344, 'bMH')
        botaoMH.setInteractive()
        botaoMH.on('pointerover', function () {

            botaoMH.setScale(1.25);
        });

        botaoMH.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoMH.setScale(1);
        });
        botaoMH.on('pointerdown', () => {
            this.mouseClick.play();
            this.scene.start("Fase1Dois")
        });

        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    }

    update() {
        
        //Atualização do verificador
        gameState.iniciouFase1 = (true);
        
        //Adição da animação da seta
        seta1.anims.play('fly1', true);

        //Configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        //Criação da animação da seta
        this.anims.create({
            key: 'fly1',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
        })
    }
}