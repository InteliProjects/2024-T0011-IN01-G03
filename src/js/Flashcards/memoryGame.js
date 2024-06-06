    //criação da cena Memory Game
    class MemoryGame extends Phaser.Scene {

        // Variáveis para as cartas viradas no jogo. Potencialmente para uso futuro com mais cartas.
        turnCard1;
        turnCard2;
        turnCard3;
        turnCard4;
        turnCard5;
        turnCard6;
        turnCard7;
        turnCard8;
        

        constructor() {
            super({
                key: 'memory_game',
            });
        }

        preload () {
            // Carrega os ativos necessários para o jogo.
            this.load.image('bg4', './src/assets/memory_game/servidorCard_1_.png');
            this.load.image('flash_card10', './src/assets/memory_game/flashcardCerto.png');

            for (let i = 1; i <= 4; i++) {
                this.load.spritesheet(`turnCard${i}`, `./src/assets/memory_game/turnCard${i}.png`, { frameWidth: 219, frameHeight: 311 });
            }

            // Carrega imagens adicionais para o cenário e elementos interativos.
            this.load.image('vision1', './src/assets/vision1.png');
            this.load.image('jogodamemoriamedalha', './src/assets/medalhas/memoria.png');
            this.load.image('nextBT4', './src/assets/minigame/btNext.png');
            this.load.image('box55', './src/assets/cloud/box5.png');
            this.load.audio('flipSound1', './src/assets/sound-effect/flipcard.mp3');
        }

        create() {
            medalhaState.bmJogoDaMemoria = (true);
            gameState.iniciouJogoDaMemoria = (true);

            // Configuração inicial do cenário, adicionando imagens de fundo e elementos gráficos.
            this.add.image(larguraJogo / 2, alturaJogo / 2, 'bg4').setDepth(0).setScale(1);
            this.add.image(larguraJogo / 2, alturaJogo / 2 + 50, 'flash_card10').setScale(1);
            this.add.image(150, 180, 'vision1').setDepth(0).setScale(0.68);
            this.add.image(850, 120, 'box55').setScale(0.75);

            this.mouseClick = this.sound.add('clickSound', { loop: false });
            this.gameWInSound = this.sound.add('winSound', { loop: false });
            this.flipSound = this.sound.add('flipSound1', { volume: 1.2, loop: false });

            // Cria e configura a caixa de diálogo para exibir o texto gradativamente.
            var dialogText = this.add.text(350, 65, '', {
                fontFamily: 'Arial',
                fontSize: '32px',
                fill: '#ffffff',
                wordWrap: { width: 1000 }
            }).setDepth(3);
    
            //texto a ser exibido gradualmente.
            const fullText = "Agora que você aprendeu como se inscrever e navegar pelos cursos da Oracle Academy, conclua o jogo da memória abaixo que contempla alguns dos cursos disponibilizados na plataforma!"
            var currentText = '';
            var index = 0;
            var speed = 50; //velocidade de digitação em milissegundos.
    
            //função para animar o texto sendo digitado.
            this.time.addEvent({
                callback: function () {
                    if (index < fullText.length) {
                        currentText += fullText[index];
                        dialogText.setText(currentText).setDepth(5);
                        index++;
                    }
                },
                callbackScope: this,
                loop: true,
                delay: speed
            });
    
            this.flippedCards = []; // Armazena as cartas que foram viradas.
            this.matchesFound = 0; // Contador de pares encontrados.
            this.canFlip = true; // Controla se o jogador pode virar uma carta.
            
            // Define posições iniciais das cartas de forma aleatória.
            let positions = [
                { x: 450, y: 490 }, { x: 800, y: 490 }, { x: 1150, y: 490 }, { x: 1500, y: 490 },
                { x: 450, y: 870 }, { x: 800, y: 870 }, { x: 1150, y: 870 }, { x: 1500, y: 870 }, 
            ];

            Phaser.Utils.Array.Shuffle(positions); // Embaralha as posições das cartas.

            // Cria as cartas com base nas posições embaralhadas.
            positions.forEach((pos, index) => {
                // Cria as cartas e as posiciona com base nas posições embaralhadas
                let card = this.add.sprite(pos.x, pos.y, `turnCard${Math.floor(index / 2) + 1}`, 0).setInteractive().setScale(0.9)
                card.cardID = Math.floor(index / 2) // Atribui um ID baseado no par
                card.on('pointerdown', () => {
                 // Adiciona evento para virar a carta
                    this.flipCard(card);
                    this.flipSound.play(); // adiciona efeito sonoro ao virar a carta 
                });
            });

            // adiciona o cursor do mouse
            this.mouse = this.add.image(larguraJogo / 2 + 80, alturaJogo / 3 + 40, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(9);
            this.input.setDefaultCursor('none');

        }

        // atualização da cena
        update() {
            // atualização da posição do cursor personalizado
            this.mouse.x = this.input.x;
            this.mouse.y = this.input.y;
        }
    
        flipCard(card) {

             // Verifica se a carta pode ser virada e se não é a mesma carta clicada anteriormente.
            if (!this.canFlip || this.flippedCards.includes(card)) return;
            
            this.canFlip = false;
            card.setFrame(1); // Muda o quadro da carta para exibir a face.

            if (this.flippedCards.length === 0) {
                // Se é a primeira carta virada, permite que outra carta seja virada.
                this.flippedCards.push(card);
                this.canFlip = true;
            } else {
                // Se é a segunda carta virada, adiciona a carta e verifica se formam um par.
                this.flippedCards.push(card);
                this.checkForMatch();
            }
        }

        checkForMatch() {
            // Verifica se as duas cartas viradas formam um par.
            if (this.flippedCards[0].cardID === this.flippedCards[1].cardID) {
                // Se formam um par, aumenta o contador de pares encontrados.
                this.matchesFound++;
                this.flippedCards = []; // Limpa as cartas viradas.
                if(this.matchesFound === 4) {
                    // Se todos os pares foram encontrados, exibe a imagem de vitória e o botão para avançar.

                    this.gameWInSound.play();                       

                    // Cria um overlay semitransparente para "desfocar" o fundo
                    this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
                    this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos
                    
                    this.add.image(larguraJogo / 2, alturaJogo / 2, 'jogodamemoriamedalha').setScale(0.8).setDepth(6);
                    let nextBT4 = this.add.image(larguraJogo / 2, alturaJogo / 2 + 300, 'nextBT4').setInteractive().setScale(0.5).setDepth(6);
                    nextBT4.on('pointerdown', () => {
                        this.mouseClick.play();
                        // Quando o jogador clica no botão, a cena é alterada para a próxima.
                        this.scene.start('cenaServer');
                    },this);
                }
                this.canFlip = true;
                   
            } else {
                // Se as cartas viradas não formam um par, aguarda um segundo e as vira de volta.
                this.time.delayedCall(1000, () => {
                    this.flippedCards.forEach(card => card.setFrame(0)); // Volta as cartas para a face oculta.
                    this.flippedCards = []; // Limpa as cartas viradas.
                    this.canFlip = true; // Permite que novas cartas sejam viradas novamente.
                });
            }
        }
    }