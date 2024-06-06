class MiniGame2 extends Phaser.Scene {
    
    platforms;
    clouds;
    door;
    
    constructor() {
        super('minigame2');
    }
  
        init() {
            // cria variável jogador e atribui alguns atributos
            this.player = {
                width: 400,
                height: 500,
                obj: null
            };
    
            // controles da rodada
            this.gameControls = {
                over: false,
                //score: 0,
                restartBt: null,
                //scoreText: '',
                cursors: null,
                overlapDetected: false,
                win: false
            };
        }
    
        preload () {
    
            // carrega no jogo o fundo, a plataforma, a moeda, o carro e a sprite do jogador
            this.load.image('bg', './src/assets/minigame2/miniGame2Fundo.png');
            this.load.image('ground2', './src/assets/minigame2/chaoNuvem.png');
            this.load.image('cloud222', './src/assets/minigame2/cloudPlatform.png');
            this.load.image('cloudDoor', './src/assets/minigame2/portaNuvem.png');
            
            this.load.spritesheet('visionSpritesheet', './src/assets/minigame/spritesheetvision.png', 
            { frameWidth: this.player.width, frameHeight: this.player.height });

            this.load.image('medalhavisionjump', './src/assets/medalhas/medalhavisionjump.png');
            this.load.image('restart', './src/assets/minigame/reset.png');
            this.load.audio('jumpSound1', './src/assets/sound-effect/jump.mp3');
            this.load.audio('cloudMusica', './src/assets/audios/music_cloud.mp3');
        }
    
        create() {
            this.direcionais = this.add.sprite(1800, 100, 'direcionais');
            this.anims.create({
                key: 'pulsar',
                frames: this.anims.generateFrameNumbers('direcionais', { start: 0, end: 2 }),
                frameRate: 3,
                repeat: -1
            });
            this.direcionais.anims.play('pulsar', true).setDepth(9).setScale(0.2);
            this.time.addEvent({ delay: 5000, callback: this.direcionaisTimer, callbackScope: this });
            
            medalhaState.bmVisionNuvem = (true)
            gameState.iniciouEscadaNuvem = (true)

            this.gameWInSound = this.sound.add('winSound', { loop: false });
            this.mouseClick = this.sound.add('clickSound', { loop: false });
            this.jumpSound = this.sound.add('jumpSound1', { volume: 1.6, loop: false });

            if (musicState.musicOculos && musicState.musicOculosPlaying) {
                musicState.musicOculos.stop();
                musicState.musicOculosPlaying = false;
            };

            if (!musicState.musicCloud) {
                musicState.musicCloud = this.sound.add('cloudMusica', { loop: true });
                musicState.musicCloud.play();
                musicState.musicOculosPlaying = true;
            };

            // cria no jogo o fundo, a plataforma, a moeda
            this.add.image(larguraJogo / 2, alturaJogo / 2, 'bg');
    
            this.platforms = this.physics.add.staticGroup(); // adiciona a platforma e a coloca física
            this.clouds = this.physics.add.staticGroup(); // adiciona as nuvens e coloca física a ela

            let platform = this.platforms.create(larguraJogo / 2, alturaJogo - 150, 'ground2');
            platform.body.setSize(platform.width * 0.8, platform.height * 0.5, true); // Ajusta para 80% da largura e 50% da altura

            const cloudPositions = [
                { x: 960, y: 385 },
                { x: 650, y: 655 },
                { x: 550, y: 950 },
                { x: 950, y: 850 },
                { x: 1350, y: 750 },
                { x: 1750, y: 650 },
                { x: 1350, y: 520 }
              ];
            
                cloudPositions.forEach(pos => {
                let cloud = this.clouds.create(pos.x, pos.y, 'cloud222');
                // Aqui ajustamos o tamanho da hitbox para ser 80% da largura e 50% da altura da imagem original da 'cloud'
                cloud.body.setSize(cloud.width * 0.7, cloud.height * 0.2);
              });
    
            // cria a sprite do player e a adiciona física
            this.player.obj = this.physics.add.sprite(this.player.width - 200, this.player.height, 'visionSpritesheet').setScale(0.2);
    
            this.player.obj.setBounce(0.2); // adiciona um leve valor de ressalto quando o player é carregado no jogo
            this.player.obj.setCollideWorldBounds(true); // faz o player colidir com os limites da tela
    
            // cria as sprites 'esquerda', 'direita' e 'pular'
            this.anims.create({
                key: 'left',
                frames: this.anims.generateFrameNumbers('visionSpritesheet', { start: 4, end: 4 }),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create({
                key: 'right',
                frames: this.anims.generateFrameNumbers('visionSpritesheet', { start: 1, end: 1 }),
                frameRate: 10,
                repeat: -1
            });
    
            this.anims.create({
                key: 'turn',
                frames: this.anims.generateFrameNumbers('visionSpritesheet', { start: 6, end: 8 }),
                frameRate: 2,
                repeat: -1
            });
    
            //adiciona colisão com o jogador e a plataforma
            this.physics.add.collider(this.player.obj, this.platforms);
    
    
            // adiociona a colisão entre a 'coin' e plataforma
            this.physics.add.collider(this.player.obj, this.clouds);

            // adiciona a porta e adiciona colisão entre ela e a nuvem
            this.door = this.physics.add.sprite(larguraJogo / 2, 100, 'cloudDoor').setDepth(3);
            this.physics.add.collider(this.clouds, this.door);

            // adiciona overlap entre a porta e o player e o detecta 
            this.physics.add.overlap(this.player.obj, this.door, function() {
                this.gameWin();
                this.gameWInSound.play();
                this.player.obj.setPosition(200, 400);
                this.player.obj.setVisible(false)
            }, null, this);

            // adiciona o coursour do mouse
            this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(8);
            this.input.setDefaultCursor('none');
    
        }
    
        update() {
            
            // atribui valor a variável 'cursors', que verifica se o botão do teclado foi pressionado
            this.gameControls.cursors = this.input.keyboard.createCursorKeys();
            
            // estabelece as condições para quando os botões são pressionados e assim realizar uma função
            if (this.gameControls.cursors.left.isDown)
            {
                this.player.obj.setVelocityX(-160);
                this.player.obj.anims.play('left', true);
            }
    
            else if (this.gameControls.cursors.right.isDown)
            {
                this.player.obj.setVelocityX(160);
                this.player.obj.anims.play('right', true);
            }
    
            else 
            {
                this.player.obj.setVelocityX(0);
                this.player.obj.anims.play('turn',true);
            }
    
            if (this.gameControls.cursors.up.isDown && this.player.obj.body.touching.down)
            {
                this.jumpSound.play();
                this.player.obj.setVelocityY(-330);
            }

            //configuração do novo cursor
            this.mouse.x = this.input.x;
            this.mouse.y = this.input.y;
        }
    
    
        // Função chamada ao vencer o jogo  
        gameWin()
        {
            // Ação ao vencer o jogo
            this.physics.pause();
            this.gameControls.over = false;
            this.add.image(larguraJogo / 2, alturaJogo / 2, 'medalhavisionjump').setScale(0.8).setDepth(6);

            
            // cria o botão next que ao ser clicado o usuário avança para a outra cena 
            let nextBT = this.add.image(larguraJogo / 2, alturaJogo / 2 + 300, 'nextBT4').setInteractive().setScale(0.5).setDepth(6);
            nextBT.on('pointerdown', () => {
                this.mouseClick.play();
                this.scene.start('cenacloud');
            },this);

            this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
            this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos
        }

        //Função para chamar no timer do AddEvent do phaser e desligar o pulsar dos direcionais
        direcionaisTimer() {
            this.direcionais.setVisible(false);
        }
}


