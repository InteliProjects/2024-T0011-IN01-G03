//declaração da classe Fase2, que herda de Phaser.Scene.
let bCriarCanal
class Fase3Tres extends Phaser.Scene {
    constructor() {
        super("fase3Tres"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        
        //carrega imagens e spritesheets.
        this.load.image('vision1' , './src/assets/vision1.png');
        this.load.image('fundooo' , './src/assets/servidorCard.jpg');
        this.load.image('oCard' , './src/assets/flashcardCerto.png');
        this.load.image('canalFundo4' , './src/assets/canal4.png');
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png');
        this.load.image('bInicio' , './src/assets/botãooculos.png');
        this.load.image('bServidor' , './src/assets/botãoservidor.png');
        this.load.image('BNuvem' , './src/assets/botaofase4.png');
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png');
        this.load.image('bCC2' ,  './src/assets/botaoCriarCanal.png');
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
        voltarState.cenaAtualFase3Tres = (true);
        voltarState.cenaAtualNuvem = (false);
        voltarState.cenaAtualFase4 = (false);
        voltarState.cenaAtualFase4Um = (false);
        voltarState.cenaAtualFase4Dois = (false);
        
        //Adição de imagens da cena e som de clique
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo')
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2)
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'canalFundo4').setScale(0.75)
        this.mouseClick = this.sound.add('clickSound', { loop: false });
      

        //Botão criarCanal
        bCriarCanal = this.add.image( larguraJogo/2-70 , alturaJogo/2 - 50, 'bCC2').setScale(1.3)
        bCriarCanal.setInteractive()
        bCriarCanal.on('pointerover', function () {

            bCriarCanal.setScale(1.5);
        });

        bCriarCanal.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            bCriarCanal.setScale(1.3);
        });

        bCriarCanal.on('pointerdown', () => {
            this.scene.start('puzzle');
            this.mouseClick.play();
        });


        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

    }

    update() {
            
        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

       
}
}