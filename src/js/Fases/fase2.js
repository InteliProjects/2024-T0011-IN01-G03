let bCurriculo;
//declaração da classe Fase2, que herda de Phaser.Scene.
class Fase2 extends Phaser.Scene {
    constructor() {
        super("fase2"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        
        //verificador de estado
        gameState.iniciouFase1 = (true);
        gameState.iniciouFase2 = (true);
        
        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png')
        this.load.image('fundooo' , './src/assets/servidorCard.jpg')
        this.load.image('oCard' , './src/assets/flashcardCerto.png')
        this.load.image('cursoFundo' , './src/assets/Curso1.png')
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png')
        this.load.image('bInicio' , './src/assets/botãooculos.png')
        this.load.image('bServidor' , './src/assets/botãoservidor.png')
        this.load.image('BNuvem' , './src/assets/botaofase4.png')
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png')
        this.load.image('bCrr' , './src/assets/botaoCurriculo.png')
        this.load.audio('oculosMusica2', './src/assets/audios/music-oculos.mp3');
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 })
        

    }

    create() {      
        
        //Verificador de músicas tocando
        if (musicState.musicMinigame && musicState.musicMinigamePlaying) {
            musicState.musicMinigame.stop();
            musicState.musicMinigamePlaying = false;
        };

        if (musicState.musicOculos) {
            musicState.musicOculos = this.sound.add('oculosMusica2', { loop: true });
            musicState.musicOculos.play();
            musicState.musicOculosPlaying = true;
        };
        
        //Verificadores de estado
        voltarState.cenaAtualServidor = (false)
        voltarState.cenaAtualFase1 = (false)
        voltarState.cenaAtualFase1Um = (false)
        voltarState.cenaAtualFase1Dois = (false)
        voltarState.cenaAtualFase2 = (true)
        voltarState.cenaAtualFase2Um = (false)
        voltarState.cenaAtualFase2Dois = (false)
        voltarState.cenaAtualFase3 = (false)
        voltarState.cenaAtualFase3Um = (false)
        voltarState.cenaAtuaLFase3Dois = (false)
        voltarState.cenaAtualFase3Tres = (false)
        voltarState.cenaAtualNuvem = (false)
        voltarState.cenaAtualFase4 = (false)
        voltarState.cenaAtualFase4Um = (false)
        voltarState.cenaAtualFase4Dois = (false)
        
        //Adição de imagens que serão utilizadas 
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo')
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2)
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cursoFundo').setScale(0.75)
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      
        //Adição da seta
        seta = this.add.sprite(245 , 320 , 'seta')

        //Adição Botão currículo
        bCurriculo = this.add.image( 427 , 320, 'bCrr').setScale(0.75)
        bCurriculo.setInteractive()
        bCurriculo.on('pointerover', function () {

            bCurriculo.setScale(1);
        });

        bCurriculo.on('pointerout', function () {
            // Volter ao tamanho original quando o mouse sair
            bCurriculo.setScale(0.75);
        });
        bCurriculo.on('pointerdown', () => {
            this.mouseClick.play();
            this.scene.start('fase2Um')});


        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    }

    update() {
        
        //animação da seta
        seta.anims.play('fly', true)

        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

        //criação da animação da seta
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
    })
}
}