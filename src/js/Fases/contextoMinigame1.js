class ContextoMinigame1 extends Phaser.Scene {
    constructor () {
        super('contextoMinigame1');
    }

    preload() {
        this.load.image('servidor', './src/assets/minigame/servidorCard2.png');
        this.load.image('box55', './src/assets/cloud/box5.png');
        this.load.image('vision1', './src/assets/vision1.png');
        this.load.audio('minigameMusica', './src/assets/audios/minigame-musica.mp3');
    }

    create() {
        // Cria os elementos do jogo fundo, plataformas, moedas, jogador.
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'servidor');
        
        if (musicState.musicOculos && musicState.musicOculosPlaying) {
            musicState.musicOculos.stop();
            musicState.musicOculosPlaying = false;
        };

        if (!musicState.musicMinigame) {
            musicState.musicMinigame = this.sound.add('minigameMusica', { loop: true });
            musicState.musicMinigame.play();
            musicState.musicMinigamePlaying = true;
        };

        // Cria um overlay semitransparente para "desfocar" o fundo
        this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
        this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos

        this.vision = this.add.image(150, 180, 'vision1').setDepth(6).setScale(0.68);
        this.box = this.add.image(850, 120, 'box55').setDepth(6).setScale(0.75);

        // Cria o texto da fala
        this.dialogText = this.add.text(350, 65, '', {
            fontFamily: 'Arial', 
            fontSize: '35px',
            fill: '#ffffff',
            wordWrap: { width: 1000 }
        })
        this.dialogText.setDepth(6).setVisible(true);

        const fullText = "Opa, algo inesperado ocorreu: nosso servidor está sendo alvo de um ataque de hackers! Vença o minigame a seguir para nos ajudar a reparar o servidor e prosseguir com sua jornada.";
        var currentText = '';
        var index = 0;
        var speed = 30; // Velocidade de digitação em milissegundos.

        // Função para animar o texto sendo digitado.
        this.typingTimer = this.time.addEvent({
            callback: () => {
                if (index < fullText.length) {
                    currentText += fullText[index];
                    this.dialogText.setText(currentText);
                    index++;

                } else {
                    this.time.addEvent({ delay: 3000, callback: this.textComplete, callbackScope: this });
                    }   
                },
            callbackScope: this,
            loop: true,
            delay: speed
        });
    }

    textComplete() {
        this.scene.start('minigame1');
    }
}