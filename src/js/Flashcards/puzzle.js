class Puzzle extends Phaser.Scene {
    constructor() {
      super({ key: "puzzle" })
    }
    preload() {
      this.load.image("polaroid1", "./src/assets/puzzle/canal_1.png");
      this.load.image("polaroid2", "./src/assets/puzzle/canal_2.png");
      this.load.image("polaroid3", "./src/assets/puzzle/canal_3.png");
      this.load.image("number1", "./src/assets/puzzle/dropzone_branco_1.png");
      this.load.image("number2", "./src/assets/puzzle/dropzone_branco_2.png");
      this.load.image("number3", "./src/assets/puzzle/dropzone_branco_3.png"); 
      this.load.image("bg444", "./src/assets/puzzle/servidorCard.png");
      this.load.image('flashcard_fundo', './src/assets/puzzle/flashcardCerto.png');
      this.load.image('medalha3', './src/assets/puzzle/puzzlemedalha.png');
      this.load.image('next', './src/assets/puzzle/botao_next.png');
      this.load.image('box122', './src/assets/puzzle/flashcard_texto_puzzle.png');
      this.load.image('borda1', './src/assets/puzzle/bordaverde1.png');
      this.load.image('borda2', './src/assets/puzzle/bordaverde2.png');
      this.load.image('borda3', './src/assets/puzzle/bordaverde3.png');
      this.load.audio('erro', './src/assets/sound-effect/erro-puzzle.mp3');
    }
    create() {
      // Configura a cena, adicionando imagens de fundo, zonas de soltura, polaroides, e instruções de texto.
      this.add.image(380, 225, 'box122').setDepth(4).setScale(0.4);
      
      // Adicionando os efeitos sonoros do puzzle
      this.mouseClick = this.sound.add('clickSound', { loop: false });
      this.gameWInSound = this.sound.add('winSound', { loop: false });
      this.gameOverPuzzle = this.sound.add('erro', { loop: false }); 
      this.rightPuzzle = this.sound.add('acertoPuzzle', { volume: 1.5, loop: false });

      // Efeito de fade in ao iniciar a cena.
      this.cameras.main.fadeIn(400, 0, 0, 0);

      // Inicializa arrays para armazenar zonas de soltura, polaroides, e gráficos das zonas.
      this.zones = [];
      this.polaroids = [];
      this.graphics = [];
      this.polaroidPositions = [
        {x: 350, y: 530 },
        {x: 950, y: 530 },
        {x: 1550, y: 530 },
      ];
      
      // Chama métodos auxiliares para configurar a cena.
      this.addDropzone();
      this.addPolaroid();
      this.addInput();

      // Inicializa variáveis para controle de progresso no jogo.
      this.matches = 0
      this.totalPolaroids = 3

      // Adiciona imagens de fundo e texto instrutivo.
      this.add.image(larguraJogo / 2, alturaJogo / 2, 'bg444');
      this.add.image(larguraJogo / 2, alturaJogo / 2, 'flashcard_fundo').setScale(1.2).setDepth(0);
      this.add.text(200, 200, 'Ligue as Imagens', { fontFamily: 'Rockwell', fontSize: 42, color: '#ffffff', fontStyle: 'Bold' }).setDepth(5)  
      this.add.text(710, 200, 'Arraste as figuras para as suas descrições correspondentes', { fontFamily: 'Rockwell', fontSize: 36, color: '#ffffff' }).setDepth(5);

      // adiciona o cursor do mouse
      this.mouse = this.add.image(larguraJogo / 2 + 80, alturaJogo / 3 + 40, 'mouse').setScale(0.1).setOrigin(0.15, 0.04).setDepth(9999);
      this.input.setDefaultCursor('none');
    }
    
    update() {
        // atualização da posição do cursor personalizado
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    }
    addDropzone() {

      // Cria zonas de soltura para as polaroides e adiciona gráficos para visualização.
      for (let i = 0; i < 3; i++) {
          let zone = this.add.zone(350 + i * 600, 950, 400, 400).setRectangleDropZone(400, 400)
          this.zones.push(zone)
          this.add.image(350 + i * 600, 950, `number${i + 1}`).setScale(0.25).setDepth(3)
      }
    }
    addPolaroid() {

        // Cria e posiciona as imagens de polaroides na cena, tornando-as arrastáveis.
        this.polaroidPositions.forEach((position, index) => {
          let polaroid = this.add.sprite(position.x, position.y, `polaroid${index + 1}`).setInteractive().setDepth(3).setScale(0.46);
          this.polaroids.push(polaroid);
          this.input.setDraggable(polaroid);
        });
      }
    addInput() {
      // Adiciona lógica de entrada para arrastar e soltar polaroides nas zonas de soltura.
      this.input.on("drag", (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX
        gameObject.y = dragY
      })
      this.input.on("drop", (pointer, gameObject, dropZone) => {
          let polaroidIndex = this.polaroids.findIndex(polaroid => polaroid === gameObject)
          let zoneIndex = this.zones.indexOf(dropZone)
          if (polaroidIndex === zoneIndex) { 
          gameObject.x = dropZone.x
          gameObject.y = dropZone.y
          gameObject.input.enabled = false
          this.rightPuzzle.play();
          // Adiciona aqui a lógica para quando uma correspondência é bem-sucedida
          this.matches += 1
          this.add.image(dropZone.x, dropZone.y, `borda${zoneIndex + 1}`).setScale(0.25).setDepth(3);
          //}
          if (this.matches === this.totalPolaroids) {
            this.win();
          }
        } else {  
          // Adicione aqui a lógica para quando não há correspondência
          gameObject.x = gameObject.input.dragStartX
          gameObject.y = gameObject.input.dragStartY

          // Adicona o som de arro no puzzle
          this.gameOverPuzzle.play()

        }
      });
    }
    win()  { //Função chamada ao ganhar

      this.gameWInSound.play()
      
      // Adicionar a imagem da medalha
      this.add.image(950, 500, 'medalha3').setScale(0.8).setDepth(5);
      
       // Adicionar o botão para passar para a próxima fase
      let nextButton = this.add.image(950, 750, 'next').setInteractive().setScale(0.4).setDepth(5);
      // Adicionar um evento de clique para o botão
      nextButton.on('pointerdown', function() {
        this.mouseClick.play()
        // Coloque aqui a lógica para avançar para a próxima fase
        this.scene.start('cenaserver2');
      }, this);
      
    }
  }