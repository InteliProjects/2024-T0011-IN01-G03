class Cadastro extends Phaser.Scene {//construção de uma nova cena.

    constructor() {
        super({
            key: 'cadastro',
        });
    }

    preload() {
        //carregamento das imagens e sprites que serão utilizadas no jogo.

        this.load.image('bg_cadastro', './src/assets/telaCadastro.png');
        this.load.html("form", "./src/form/form.html");
        this.load.image('vision1', './src/assets/vision1.png');
        this.load.image('box55', './src/assets/cloud/box5.png');
        this.load.image('oCard2' , './src/assets/cloud/box.png');
        this.load.html("form", "./src/form/form.html");
        this.load.audio('oculosMusica', './src/assets/audios/music-oculos.mp3');
    }

    create() {
        //Adição de imagens
        this.add.image( larguraJogo / 2, alturaJogo / 2, 'bg_cadastro').setDepth(0);//adiciona o background
        this.add.image(200, 250, 'vision1').setDepth(0).setScale(0.75); //adiciona a vision
        this.cursors = this.input.keyboard.createCursorKeys(); //libera o uso dos cursores para input
        this.returnKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);//enter para enviar o input da caixa de texto.
        this.nomeInserido = false;//variável que contém a informação se um nome foi inserido.
        this.add.image(larguraJogo/2 , alturaJogo/2 + 200  , 'oCard2').setScale(0.6);
        this.mouseClick = this.sound.add('clickSound', { lopp: false });

       //Verificação de música
        if (musicState.musicSoundPlaying && musicState.musicSound) {
            musicState.musicSound.stop();
            musicState.musicSoundPlaying = false;//Caso a música esteja tocando ela é parada        
        };

        if (!musicState.musicOculos) {
            musicState.musicOculos = this.sound.add('oculosMusica', { loop: true });
            musicState.musicOculos.play();
            musicState.musicOculosPlaying = true;
        };
        
        //Inserção do texto
        this.add.image(1100, 190, 'box55').setScale(1);
        var text = { height: 45, padding: 15, content: '' }
        this.message = this.add.text(
            this.game.config.width / 2,
            this.game.config.height / 2 - text.padding * 2 - text.height,//posição do texto.
            text.content, {
            color: "#dbdbdc",//cor.
            fontSize: 40,//tamanho da letra.
            fontStyle: "bold"//fonte.
            }
        ).setOrigin(0.5);

        //Botão de enviar nome
        var inputSize = { width: 270, height: -300, padding: 15 };//posição/tamanho da barra de nome.
        var inputButton = { width: 20, height: 3 };
        var inputCoords = {
            xposition: (this.game.config.width - inputSize.width) / 3 - inputButton.width,
            yposition: (this.game.config.height - inputSize.height - inputSize.padding * 2) / 2,
        };


        //texto da caixa de diálogo.
        var dialogText = this.add.text(430, 128, '', {
            fontFamily: 'Arial',
            fontSize: '37px',
            fill: '#ffffff',
            wordWrap: { width: 1350 }
        });

        //texto a ser exibido gradualmente.
        const fullText = "Olá! Que bom que você veio! Eu sou a Vision, serei sua assistente virtual! Irei te guiar durante suas aventuras no site da Oracle Academy, mas antes preciso te conhecer melhor… como eu posso te chamar?"
        var currentText = '';
        var index = 0;
        var speed = 30; //velocidade de digitação em milissegundos.

        //função para animar o texto sendo digitado.
        this.time.addEvent({
            callback: function () {
                if (index < fullText.length) {
                    currentText += fullText[index];
                    dialogText.setText(currentText);
                    index++;
                }
            },
            callbackScope: this,
            loop: true,
            delay: speed
        });

        this.inputName = this.add.dom(inputCoords.xposition+100, inputCoords.yposition).createFromCache('form').setOrigin(0, 0);

        //Configurações da InputBox
        this.nameOkTextButton = this.add.text(
            inputCoords.xposition + inputSize.width + 348 ,
            inputCoords.yposition + inputButton.height + 16.3, ">", {
            backgroundColor: "#d25207",//cor de fundo
            fontSize: 45,//fonte
            padding: 25,
        }
        );
        this.nameOkTextButton.setInteractive();

        this.returnKey.on("down", event => this.scene.start("cenaServer"));
        this.nameOkTextButton.on('pointerdown', () => {this.scene.start("cenaServer");
        this.mouseClick.play();
        });

        // troca do cursor do mouse
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(5);
        this.input.setDefaultCursor('none');

        this.cameras.main.fadeIn(4000, 49, 46, 43);
    }

    checarNome(inputNameElement) {
        let name = inputNameElement.getChildByName("name");
        if (name.value != "") {//caso nome seja digitado avançar a página.
            this.message.setText("");
            this.botaoFase1.setVisible(true);//mensagem a ser mostrada contendo o nome do jogador.
        }
    }

    update() {
        // atualização da posição do cursor personalizado
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    }
}