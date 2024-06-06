//declaração da classe Fase2, que herda de Phaser.Scene.
let bRegistrar

class Fase2Dois extends Phaser.Scene {
    constructor() {
        super("fase2Dois"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {

        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('cursoFundo3' , './src/assets/curso3.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bReg' , './src/assets/botaoRegistrar.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        

    }

    create() {  
        //Verificadores de estados
        serverState.servidorFase3 = (true);  
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (false);
        voltarState.cenaAtualFase1Dois = (false);
        voltarState.cenaAtualFase2 = (false);
        voltarState.cenaAtualFase2Um = (false);
        voltarState.cenaAtualFase2Dois = (true);
        voltarState.cenaAtualFase3 = (false);
        voltarState.cenaAtualFase3Um = (false);
        voltarState.cenaAtuaLFase3Dois = (false);
        voltarState.cenaAtualFase3Tres = (false)
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
        
        //Imagens usadas na cena
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cursoFundo3').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      
        //Criação da seta
        seta = this.add.sprite(1370 , 816 , 'seta');

        //Botão de registro
        bRegistrar = this.add.image( 1558 , 816, 'bReg').setScale(0.75);
        bRegistrar.setInteractive();
        bRegistrar.on('pointerover', function () {

            bRegistrar.setScale(1);
        });

        bRegistrar.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bRegistrar.setScale(0.75);
        });
        bRegistrar.on('pointerdown', () => {
            this.mouseClick.play();
            this.scene.start('memory_game')}
        );

        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    

    }

    update() {
        
        //animação da seta
        seta.anims.play('fly', true);

        
        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
    })
}
}