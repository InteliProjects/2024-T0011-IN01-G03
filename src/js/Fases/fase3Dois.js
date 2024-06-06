//declaração da classe Fase2, que herda de Phaser.Scene.
let bChannels
class Fase3Dois extends Phaser.Scene {
    constructor() {
        super("fase3Dois"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        
        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('canalFundo2' , './src/assets/canal3.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bC' ,  './src/assets/botaoChannel.png');
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
        voltarState.cenaAtuaLFase3Dois = (true);
        voltarState.cenaAtualFase3Tres = (false);
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false); 
        
        //Verificador de cenas
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'canalFundo2').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      
        seta = this.add.sprite(230 , 617 , 'seta')


        bChannels = this.add.image( 408 , 617, 'bC').setScale(0.75);
        bChannels.setInteractive();
        bChannels.on('pointerover', function () {

            bChannels.setScale(1);
        });

        bChannels.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bChannels.setScale(0.75);
        });
        bChannels.on('pointerdown', () => {
            this.scene.start('fase3Tres');
            this.mouseClick.play();
        });


        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    

    }

    update() {
        
        //Ativação da animação da seta
        seta.anims.play('fly', true);

        //Configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        //Criação da Animação da seta
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
    })
}
}