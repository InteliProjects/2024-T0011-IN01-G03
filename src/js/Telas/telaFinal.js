class TelaFinal extends Phaser.Scene {

    constructor() {
        super("telaFinal");
    }

    create() {
        //Placeholder
        this.add.image(400, 300, 'configPH').setScale(0.25).setDepth(0);


        //Botão para voltar pra fase anterior
        let btnPlay = this.add.image(larguraJogo / 2, alturaJogo / 1.5, "btnPlay").setScale(1.2);
        btnPlay.setInteractive();
        //botão para voltar ao menu
        let btnHome = this.add.image(larguraJogo / 2, alturaJogo / 1.95, "btnVoltar").setScale(0.6);
        btnHome.setInteractive();

        btnPlay.on("pointerdown", () => this.scene.start("Fase1"));//botão apertado leva para Fase1
        btnHome.on("pointerdown", () => this.scene.start("telaInicial"));//botão apertado leva para Telainicial
    }
}

