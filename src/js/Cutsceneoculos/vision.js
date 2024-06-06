class Vision extends Phaser.Scene {
    constructor() {
        super("vision");

    }

    create() {
        //imagem óculos grande
        this.add.image(larguraJogo/2, alturaJogo/2,'sala4').setScale(0.8).setDepth(2);

        //Trocar cursor
        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(3);
        this.input.setDefaultCursor('none');                    

        //delay para ir para proxima cena
        this.time.addEvent({ delay: 5000, callback: this.onEvent4, callbackScope: this });

        //efeito de fadein
        this.cameras.main.fadeIn(1000, 49, 46, 43);
    }

    update() {   //seguir o cursor real
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    }

    onEvent4() {
        //função que inicia próxima cena
        this.scene.start("cadastro");
    }
}