//declaração da classe Fase2, que herda de Phaser.Scene.
let bNavgCursos
class Fase3Um extends Phaser.Scene {
    constructor() {
        super("fase3Um"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        
        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('canalFundo1' , './src/assets/canal2.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bNC' ,  './src/assets/botaoCurso.png');
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
        voltarState.cenaAtualFase3Um = (true);
        voltarState.cenaAtuaLFase3Dois = (false);
        voltarState.cenaAtualFase3Tres = (false);
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
                
        //Adição de imagens e sons da cena
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo');
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2);
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'canalFundo1').setScale(0.75);
        this.mouseClick = this.sound.add('clickSound', { loop: false });
        seta = this.add.sprite(955 , 366 , 'seta')

        //Adição do Botão da navegação de cursos
        bNavgCursos = this.add.image( 1231 , 366, 'bNC').setScale(0.75)
        bNavgCursos.setInteractive()
        bNavgCursos.on('pointerover', function () {

            bNavgCursos.setScale(1);
        });

        bNavgCursos.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bNavgCursos.setScale(0.75);
        });
        bNavgCursos.on('pointerdown', () => {
            this.scene.start('fase3Dois');
            this.mouseClick.play();
        });


        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    

    }

    update() {
        //Ativar animação da seta
        seta.anims.play('fly', true)

        
        //configuração do novo cursor
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