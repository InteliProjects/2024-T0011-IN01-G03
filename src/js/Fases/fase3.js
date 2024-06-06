//declaração da classe Fase2, que herda de Phaser.Scene.
let bMeusAlunos
class Fase3 extends Phaser.Scene {
    constructor() {
        super("fase3"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        //verificadores de estado
        gameState.iniciouFase1 = (true);
        gameState.iniciouFase2 = (true);
        gameState.iniciouFase3 = (true);
        
        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('canalFundo' , './src/assets/canal1.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bMA' ,  './src/assets/botaoMeusAlunos.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        

    }

    create() { 
        
        //Verificador de estado
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (false);
        voltarState.cenaAtualFase1Dois = (false);
        voltarState.cenaAtualFase2 = (false);
        voltarState.cenaAtualFase2Um = (false);
        voltarState.cenaAtualFase2Dois = (false);
        voltarState.cenaAtualFase3 = (true);
        voltarState.cenaAtualFase3Um = (false);
        voltarState.cenaAtuaLFase3Dois = (false);
        voltarState.cenaAtualFase3Tres = (false);
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false) ;    
        
        //Adição das imagens e clique do mouse
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'canalFundo').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      
        //Adição da seta
        seta = this.add.sprite(955 , 325 , 'seta');

        //Botão bma
        bMeusAlunos = this.add.image( 1152 , 325, 'bMA').setScale(0.75);
        bMeusAlunos.setInteractive();
        bMeusAlunos.on('pointerover', function () {

            bMeusAlunos.setScale(1);
        });

        bMeusAlunos.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bMeusAlunos.setScale(0.75);
        });
        bMeusAlunos.on('pointerdown', () => {
            this.scene.start('fase3Um');
            this.mouseClick.play();
        });

        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    }

    update() {
        
        //ativar animação da seta
        seta.anims.play('fly', true);

        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        //criar animação da seta
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
    })
}
}