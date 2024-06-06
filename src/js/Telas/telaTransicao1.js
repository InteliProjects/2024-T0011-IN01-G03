class TelaTransicao1 extends Phaser.Scene {

    constructor() {
        super("telaTransicao1");
    }



    // recarrega os assets música, óculos e cenário
    preload() {
        this.load.image('oculosInterno', 'src/assets/oculosInterno.png'); 
        this.load.image('background', 'assets/telainicial.jpg'); 
    }

    create() {

        // adiciona o cenário
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'background') 
        // Adiciona o óculos
        const objeto = this.add.image(larguraJogo / 2, 840, 'oculosInterno').setScale(0.1); 
     
        // Adiciona um atraso antes de iniciar a animação de zoom do óculos
        this.time.delayedCall(1000, function() {
    
            // Zoom do óculos
            this.tweens.add({
                targets: objeto,
                x: this.cameras.main.centerX, // Centro horizontal da câmera
                y: this.cameras.main.centerY, // Centro vertical da câmera
                scaleX: 1, // Zoom horizontal
                scaleY: 1, // Zoom vertical
                duration: 1000, // Duração da animação em milissegundos
                ease: 'Linear', // Tipo de interpolação

                onComplete: function() {
                    // Adiciona um atraso antes de iniciar a cena "cadastro"
                    this.time.delayedCall(1000, function() {
                        // Transição de cena após o término da animação e do atraso
                        this.scene.start("cadastro");
                    }, [], this);
                },
                onCompleteScope: this // Define o escopo para a função onComplete
            });
        }, [], this);

     
        
        this.mouse = this.add.image(480, 240,'mouse').setScale(0.08).setOrigin(0.15, 0.04).setDepth(3);
        this.input.setDefaultCursor('none');
    }




        
    


    

    update() {
        //modificação mouse 
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;
    } 
}