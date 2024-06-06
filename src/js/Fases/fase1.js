let botaoLogin;
let botaoLogin2;
let seta;

//declaração da classe Fase2, que herda de Phaser.Scene.
class Fase1 extends Phaser.Scene {
    constructor() {
        super("fase1"); //chama o construtor da classe pai.
    }

    //declaração das variáveis para o carrossel e os botões de próxima, anterior e próxima cena.


    preload() {
        //carrega imagens e spritesheets.
        
        this.load.image('vision1' , './src/assets/vision1.png')
        this.load.image('fundooo' , './src/assets/servidorCard.jpg')
        this.load.image('oCard' , './src/assets/flashcardCerto.png')
        this.load.image('fundoBarra' , './src/assets/barraMenuDeCenas.png')
        this.load.image('bInicio' , './src/assets/botãooculos.png')
        this.load.image('bServidor' , './src/assets/botãoservidor.png')
        this.load.image('BNuvem' , './src/assets/botaofase4.png')
        this.load.image('bMenuDeFases' , './src/assets/menudefase.png')
        this.load.image('cadastro' , './src/assets/cadastro.jpg')
        this.load.image('bLogin' , './src/assets/botaoLogin.png')
        this.load.image('bContorno' , './src/assets/contornoBotao1.png')
        this.load.image('bLogin2' , './src/assets/botaoLogin2.png')
        this.load.spritesheet('seta', './src/assets/setavermelha.png', { frameWidth: 191, frameHeight: 100 })
        

    }

    create() {
        
        //Verificadores de estado
        serverState.servidorFase2 = true;
        gameState.iniciouFase1 = (true)
        voltarState.cenaAtualServidor = (false)
        voltarState.cenaAtualFase1 = (true)
        voltarState.cenaAtualFase1Um = (false)
        voltarState.cenaAtualFase1Dois = (false)
        voltarState.cenaAtualFase2 = (false)
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
        
        
        
        //Fundo e imagens que serão usadas na cena
        this.add.image(larguraJogo/2 , alturaJogo/2 , 'fundooo')
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50  , 'oCard').setScale(1.2)
        this.add.image(larguraJogo/2 , alturaJogo/2 - 50 , 'cadastro').setScale(1)
        this.add.image(1380, 232, 'bContorno')
        this.add.image(390, 688, 'bContorno')
        seta = this.add.sprite(1180 , 231 , 'seta')
        this.mouseClick = this.sound.add('clickSound', { loop: false });

        //Adição e Interação do botão de login
        botaoLogin = this.add.image( 400 , 688, 'bLogin2').setScale(0.9)
        botaoLogin.setInteractive()
        botaoLogin.on('pointerover', function () {

            botaoLogin.setScale(1.2);
        });

        botaoLogin.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoLogin.setScale(0.9);
        });
        botaoLogin.on('pointerdown', () => {
            this.scene.start('Fase1Dois');
            this.mouseClick.play();
        });

        botaoLogin2 = this.add.image( 1380 , 231, 'bLogin')
        botaoLogin2.setInteractive()
        botaoLogin2.on('pointerover', function () {

            botaoLogin2.setScale(1.3);
        });

        botaoLogin2.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            botaoLogin2.setScale(1);
        });
        botaoLogin2.on('pointerdown', () => {
            this.scene.start('fase1Um')
            this.mouseClick.play();
        });
            

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

        //criação da animação da seta
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('seta', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
            
         });
}
}