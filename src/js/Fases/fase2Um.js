let bNavegador


class Fase2Um extends Phaser.Scene {

    constructor() {
        super("fase2Um"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        //carrega imagens e spritesheets.
        
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('cursoFundo2' , './src/assets/curso2.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bNvgdr' , './src/assets/botaoNavegador.png');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 });
        

    }

    create() {  
        //Verificador de fases
        voltarState.cenaAtualServidor = (false);
        voltarState.cenaAtualFase1 = (false);
        voltarState.cenaAtualFase1Um = (false);
        voltarState.cenaAtualFase1Dois = (false);
        voltarState.cenaAtualFase2 = (false);
        voltarState.cenaAtualFase2Um = (true);
        voltarState.cenaAtualFase2Dois = (false);
        voltarState.cenaAtualFase3 = (false);
        voltarState.cenaAtualFase3Um = (false);
        voltarState.cenaAtuaLFase3Dois = (false);
        voltarState.cenaAtualFase3Tres = (false);
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);

        //Adição de imagens da cena e som de clique
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cursoFundo2').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      
        //Adição da seta
        seta = this.add.sprite(220 , 388 , 'seta');

        //Botão de navegador
        bNavegador = this.add.image( 417 , 388, 'bNvgdr').setScale(0.75);
        bNavegador.setInteractive()
        bNavegador.on('pointerover', function () {

            bNavegador.setScale(1);
        });

        bNavegador.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bNavegador.setScale(0.75);
        });
        bNavegador.on('pointerdown', () => {
            this.mouseClick.play();
            this.scene.start('fase2Dois')}
        );

        
        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');


    }

    update() {
        
        //Adição da seta
        seta.anims.play('fly', true);

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