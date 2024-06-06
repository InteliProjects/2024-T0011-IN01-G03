//variaveis.
let startButton;
let fasesButton;
let navegador;
let navegador2;
let navegador3;
let mouseClick;
class TelaInicial extends Phaser.Scene {

    constructor() {
        super("TelaInicial");
        
    }

    preload() {
        //carregamento das imagens e sprites que serão utilizadas no jogo.

        this.load.image("logo", "./src/assets/logoG3.png");
        this.load.image('mouse', './src/assets/cursor.png');
        this.load.image('start-button', './src/assets/botões/start-1.png');
        this.load.image('volume-button-1', './src/assets/botões/volume-1.png');
        this.load.image('volume-button-1.1', './src/assets/botões/volume-1.1.png');
        this.load.image('volume-button-2', './src/assets/botões/volume-2.png');
        this.load.image('volume-button-2.1', './src/assets/botões/volume-2.1.png');
        this.load.image('oculosOff', './src/assets/Teste1.0.png');
        this.load.image('oculosOn', './src/assets/Oculosbrilho.png');
        this.load.image('inicio', './src/assets/inicio.png');
        this.load.image('fundo', './src/assets/telaCadastro.png');
        this.load.audio('music-sound', './src/assets/audios/music_sound.wav');
        this.load.image('navegador' , './src/assets/botao-de-progresso.png');
        this.load.audio('clickSound', './src/assets/sound-effect/mouse-click.wav');
        this.load.audio('winSound', './src/assets/sound-effect/winSound1.wav');
        this.load.spritesheet('direcionais', './src/assets/direcionaissprite.png', 
            { frameWidth: 981, frameHeight: 634 });
        this.load.audio('erroQuiz', './src/assets/sound-effect/erro-quiz.mp3');
        this.load.audio('acertoPuzzle', './src/assets/sound-effect/acerto-puzzle.wav');
    }

    create() {
        serverState.servidorFase1 = (true)
        //Definindo a cenaAtual
        cenaAtual = 'TelaInicial'
        
        this.mouseClick = this.sound.add('clickSound', { loop: false });

        //background.
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'inicio').setScale(1).setDepth(0);


        //modificação mouse
        this.mouse = this.add.image(485 ,240, 'mouse').setScale(0.08).setOrigin(0.15,0.04).setDepth(3);
        this.input.setDefaultCursor('none');


        if (musicState.musicCloud && musicState.musicCloudPlaying) {
            musicState.musicCloud.stop();
            musicState.musicCloudPlaying = false;
        };
        
        if (!musicState.musicPlaying) {
            musicState.musicSound = this.sound.add('music-sound', { loop: true });
            musicState.musicSound.play();
            musicState.musicSoundPlaying = true;
        };

        //botão start.
        startButton = this.add.image(larguraJogo / 2, alturaJogo / 1.6 + 45, "oculosOff").setScale(0.04);
        startButton.setInteractive();
        startButton.on('pointerdown', () => {

            this.scene.transition({
                target: 'telaTransicao1', duration: 1000, 
            });
            
            this.mouseClick.play();

        });
        
        //mudar cor dos botões quando o mouse passar por cima.
        botaoHover(startButton, 'oculosOff', 'oculosOn')

        //fade in.
        this.cameras.main.fadeIn(4000, 49, 46, 43);

    }

    update() {
        // configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    }
}
