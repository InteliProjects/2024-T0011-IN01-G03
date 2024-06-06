const config = {
    width:1489,
    height: 907,
    

// Configurações de física do jogo
physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 300 },   // Gravidade aplicada ao mundo do jogo
        debug: false    // Modo de visualização de colisões
    }
}
}

class MiniGame1 extends Phaser.Scene {
    //Definir variáveis de classe
    platforms;
    coins;
    virus;
    btNext;

    constructor() {
        super({
            key: 'minigame1',
        });
    }

    // Inicializa variáveis
    init() {
        //Cria a variável jogador e atribui alguns atributos
        this.player = {
            width : 400,
            height: 500,
            obj: null

        };
        //controles da rodada
       this.gameControls = {
        over: false,
        //score: 0,
        restartBt: null,
        //scoreText: '',
        cursors: null,
        btNext: null,
        win: false
       };
    }

    // Carrega os recursos
    preload() {
      // Carrega no jogo o fundo, a plataforma, a moeda, o carro e a sprite do jogador
      this.load.image('servidor', './src/assets/minigame/servidorCard2.png');
      this.load.image('servidorbug', './src/assets/minigame/servidorbug9.png');
      this.load.image('ground', './src/assets/minigame/ground.png');
      this.load.image('coin', './src/assets/minigame/coin3.png');
      this.load.image('virus', './src/assets/minigame/virus2.png');
      this.load.spritesheet('visionspritesheet', './src/assets/minigame/spritesheetvision.png', { frameWidth: this.player.width, frameHeight: this.player.height });
      this.load.image('restart', './src/assets/minigame/reset.png');
      this.load.image('gameOver2', './src/assets/minigame/gameOver3.png');
      this.load.image('medalhavirus', './src/assets/medalhas/medalhavirus.png');
      this.load.image('btNext', './src/assets/minigame/btNext.png');
      this.load.audio('coinSound1', './src/assets/sound-effect/coletar-coin.wav');
      this.load.audio('gameOver_virus', './src/assets/sound-effect/gameOver-virus.wav');
    }

    // Configura o cenário do jogo
    create() {
        this.direcionais = this.add.sprite(1740, 1140, 'direcionais');
        this.anims.create({
            key: 'pulsar',
            frames: this.anims.generateFrameNumbers('direcionais', { start: 0, end: 2 }),
            frameRate: 3,
            repeat: -1
        });
        this.direcionais.anims.play('pulsar', true).setDepth(9).setScale(0.3).setVisible(true);
        this.time.addEvent({ delay: 5000, callback: this.direcionaisTimer, callbackScope: this });
        
        medalhaState.bmVirus = (true)
        gameState.iniciouVirus = (true)
        
        this.mouseClick = this.sound.add('clickSound', { loop: false });
        this.coinSound = this.sound.add('coinSound1', { loop: false });
        this.gameWInSound = this.sound.add('winSound', { loop: false });
        this.gameOverVirus = this.sound.add('gameOver_virus', { loop: false });
        
        // Cria os elementos do jogo fundo, plataformas, moedas, jogador.
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'servidor');   
        this.add.image(larguraJogo / 2 , alturaJogo / 2 , 'card2');
        this.add.image(larguraJogo / 2.01 , alturaJogo / 2 , 'servidorbug').setScale(0.52);
        
        this.platforms = this.physics.add.staticGroup();  // Adiciona a platforma e a coloca física
        let numPlat = 0;  // Inicializa a variável numPlat com o valor 0, que será usado como contador
        for (let _ of Array(14)) {     // Loop forEach que irá executar 10 vezes, criando um elemento de array para cada iteração
            this.platforms.create(1590 - 98 * numPlat, 970, 'ground').setScale(0.8);   // Cria uma plataforma com base na posição calculada usando o contador numPlat
            numPlat++;     //incrementa o contador numPlat para a próxima iteração
        }
        
        // cria a sprite do player e a adiciona física
        this.player.obj = this.physics.add.sprite(this.player.width, this.player.height, 'visionspritesheet').setScale(0.17);
        this.player.obj.setBounce(0.2);    // Adiciona um leve valor de ressalto quando o player é carregado no jogo
        this.player.obj.setCollideWorldBounds(true);   // Faz o player colidir com os limites da tela
        
        // Cria as sprites 'esquerda', 'direita' e 'pular'
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('visionspritesheet', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: 1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('visionspritesheet', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 1
        });
        
        this.anims.create({
            key: 'turn',
            frames: this.anims.generateFrameNumbers('visionspritesheet', { start: 6, end: 8 }),
            frameRate: 2,
            repeat: 1
        });
        
        //Adiciona colisão com o jogador e a plataforma
        this.physics.add.collider(this.player.obj, this.platforms);
        
        // Adiciona a moeda e física a ela
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 12,
            setXY: { x: 280, y: 0, stepX: 110 }
        });
        
        this.coins.children.iterate(function (child){     // Coloca 'coin' na função child para o player capturar o item
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });
        
        // Adiociona a colisão entre a 'coin' e plataforma
        this.physics.add.collider(this.coins, this.platforms);
        
        // Verifica se o jogador se sobrepõe a uma estrela ou não
        this.physics.add.overlap(this.player.obj, this.coins, this.collectCoin, null, this);
        
        // Adiciona o placar e botão reset
        this.gameControls.restartBt = this.add.image( 870, 700, 'restart').setScale(0.1).setOrigin(0, 0).setInteractive().setVisible(false);
        
        
        // Sistema de reset
        this.gameControls.restartBt.on('pointerdown', function () {
            this.mouseClick.play();
            if (this.gameControls.over) {
                this.gameControls.over = false;
                //this.gameControls.score = 0;
                this.scene.restart();
            }
        }, this);
        
        // Adiciona um grupo para os carros, coloca física e colisão entre eles, o player e as plataformas
        this.virus = this.physics.add.group();
        this.physics.add.collider(this.virus, this.platforms);
        this.physics.add.collider(this.player.obj, this.virus, this.hitBomb, null, this);
        
        // Inicializa os controles do jogo
        this.gameControls.cursors = this.input.keyboard.createCursorKeys();
        
        //Trocar cursor.
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(8);
        this.input.setDefaultCursor('none');
        this.mouse.setVisible(false);
        
        // Configurando o as bordas do flashcard
        this.physics.world.setBounds(200, 0, larguraJogo / 1.30, alturaJogo / 1.15);

    }

    // Atualiza o estado do jogo
    update() {
        // Atribui valor a variável 'cursors', que verifica se o botão do teclado foi pressionado
        this.gameControls.cursors = this.input.keyboard.createCursorKeys();

        // Estabelece as condições para quando os botões são pressionados e assim realizar uma função
        if (this.gameControls.cursors.left.isDown){
            this.player.obj.setVelocityX(-160);
            this.player.obj.anims.play('left', true);
        }

        else if (this.gameControls.cursors.right.isDown){
            this.player.obj.setVelocityX(160);
            this.player.obj.anims.play('right', true);
        }

        else {
            this.player.obj.setVelocityX(0);
            this.player.obj.anims.play('turn',true);
        }

        if (this.gameControls.cursors.up.isDown && this.player.obj.body.touching.down){
            this.player.obj.setVelocityY(-330);
        }

        //configuração do novo cursor
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
        
    }

    // Adicionamos a função collectCoin para o jogador coletar as moedas e também contabilizar no placar
    collectCoin(player, coin) {
        coin.disableBody(true, true);

        this.coinSound.play();

        // Verifica quantas 'coin' sobraram vivas e se não tiver mais nenhuma esses itens reiniciam 
        if(this.coins.countActive(true) === 0){
            this.gameWin();
        }

        // Cria os carros 
        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(600,1000);

        var virus = this.virus.create(x, 16, 'virus').setScale(0.15)
        virus.setBounce(1);
        virus.setCollideWorldBounds(true);
        virus.setVelocity(Phaser.Math.Between(-200, 200), 20);
    }

    // cria a função hitBomb para quando o jogador bater no carro o jogo para e ele ser pinatdo de vermelho
    hitBomb(player, virus) {
        player.anims.play('turn');
        this.gameOver();
    }

    // Função chamada ao vencer o jogo
    gameWin() {

        this.gameWInSound.play();

        this.mouse.setVisible(true);

        // Ação ao vencer o jogo
        this.physics.pause();
        this.gameControls.over = false;
        this.gameControls.win = true;
        this.add.image(950, 600, 'medalhavirus').setScale(0.8).setDepth(6);
        this.btNext = this.add.image(950, 850, 'btNext').setInteractive().setVisible(true).setScale(0.5).setDepth(6);
        
        this.btNext.on('pointerdown', () => {
            this.scene.start('fase2');
            this.mouseClick.play();
        });


        this.blurOverlay = this.add.rectangle(0, 0, this.cameras.main.width, this.cameras.main.height, 0x000000, 1.8).setOrigin(0);
        this.blurOverlay.setDepth(5); // Garante que o overlay esteja acima de todos os outros objetos
        
    }

    // Função chamada ao perder o jogo
    gameOver() {

        this.gameOverVirus.play();

        this.mouse.setVisible(true);

        // Ação ao perder o jogo
        this.physics.pause();
        this.player.obj.setTint(0xff0000);
        this.gameControls.over = true;
        this.add.image(930, 550, 'gameOver2').setScale(.60);
        this.gameControls.restartBt.visible = true;

    }

    direcionaisTimer() { //Função para chamar no timer do AddEvent do phaser e desligar o pulsar dos direcionais
        this.direcionais.setVisible(false);
    }
}