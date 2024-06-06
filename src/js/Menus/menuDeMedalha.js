let mQuizz1;
let mVirus;
let mJogoDaMemoria;
let mConect;
let mVisionNuvem;
let mQquizz2;



class MenuDeMedalhas extends Phaser.Scene {

    constructor() {
        super("menuDeMedalhas")
    }

    preload() {
        this.load.image('fundoMed' , './src/assets/medalhasescuras.png');
        this.load.image('mQuizz1' , './src/assets/quiz1medalha.png');
        this.load.image('mVirus' , './src/assets/medalhavirus.png');
        this.load.image('mJogoDaMemoria' , './src/assets/jogodamemoriamedalha.png');
        this.load.image('mConect' , './src/assets/puzzlemedalha.png');
        this.load.image('mVisionNuvem' , './src/assets/medalhavisionjump.png');
        this.load.image('mQquizz2' , './src/assets/quiz2medalha.png');
        this.load.image("bVoltar", "./src/assets/botaodevoltar.png");


    }

    create() {
        this.add.image(larguraJogo / 2, alturaJogo / 2, 'fundoMed');

        this.mouse = this.add.image(480, 240, 'mouse').setScale(0.04).setOrigin(0.15, 0.04).setDepth(10);
        this.input.setDefaultCursor('none');

        this.mouseClick = this.sound.add('clickSound', { loop: false }); // adição do efeito sonoro de click
        
        mQuizz1 = this.add.image(490 , 450, 'mQuizz1').setScale(0.45).setVisible(false);

        mVirus = this.add.image(960 , 450, 'mVirus').setScale(0.45).setVisible(false);

        mJogoDaMemoria =  this.add.image(1440, 450, 'mJogoDaMemoria').setScale(0.45).setVisible(false);

        mConect = this.add.image(490 , 800, 'mConect').setScale(0.45).setVisible(false);

        mVisionNuvem = this.add.image(960 , 800, 'mVisionNuvem').setScale(0.45).setVisible(false);

        mQquizz2 = this.add.image(1440 , 800, 'mQquizz2').setScale(0.45).setVisible(false);


        
        if (medalhaState.bmQuizz1 == true){
            mQuizz1.setVisible(true)
        }
        else{mQuizz1.setVisible(false)}

        if(medalhaState.bmVirus == true){
            mVirus.setVisible(true)
        }
        else{mVirus.setVisible(false)}

        if(medalhaState.bmJogoDaMemoria == true){
            mJogoDaMemoria.setVisible(true)
        }
        else{mJogoDaMemoria.setVisible(false)}
        
        if(medalhaState.bmConect == true){
            mConect.setVisible(true)
        }
        else{mConect.setVisible(false)}
        
        if(medalhaState.bmVisionNuvem == true){
            mVisionNuvem.setVisible(true)
        }
        else{mVisionNuvem.setVisible(false)}

        if(medalhaState.bmQquizz2 == true){
            mQquizz2.setVisible(true)
        }
        else{mQquizz2.setVisible(false)}

        voltar = this.add.image(215, 230, 'bVoltar').setScale(0.048);
        voltar.setInteractive();
        // Se o mouse passar em cima aumenta
        voltar.on('pointerover', function () {

            voltar.setScale(0.058);
        });

        voltar.on('pointerout', function () {
            // Voltar ao tamanho original quando o mouse sair
            voltar.setScale(0.048);
        });


        function voltarParaFaseAnterior(contexto) {

        { if (voltarState.cenaAtualServidor == (true)){
            contexto.scene.start('cenaServer'); 
        }}
        { if (voltarState.cenaAtualServidor2 == (true)){
            contexto.scene.start('cenaServer2'); 
        }}
        { if (voltarState.cenaAtualFase1 == (true)){
            contexto.scene.start('fase1');
        }}
        {if (voltarState.cenaAtualFase1Um == (true)){
            contexto.scene.start('fase1Um');
        }}
        {if (voltarState.cenaAtualFase1Dois == (true)){
            contexto.scene.start('Fase1Dois');
        }}
        {if (voltarState.cenaAtualFase2 == (true)){
            contexto.scene.start('fase2');
        }}
        {if (voltarState.cenaAtualFase2Um == (true)){
            contexto.scene.start('fase2Um');
        }}
        {if (voltarState.cenaAtualFase2Dois == (true)){
            contexto.scene.start('fase2Dois');
        }}
        {if (voltarState.cenaAtualFase3 == (true)){
            contexto.scene.start('fase3');
        }}
        {if (voltarState.cenaAtualFase3Um == (true)){
            contexto.scene.start('fase3Um');
        }}
        {if (voltarState.cenaAtuaLFase3Dois == (true)){
            contexto.scene.start('fase3Dois');
        }}       
        {if (voltarState.cenaAtualFase3Tres == (true)){
            contexto.scene.start('fase3Tres');
        }}
        {if (voltarState.cenaAtualFase4 == (true)){
            contexto.scene.start('fase4');
        }}
        {if (voltarState.cenaAtualFase4Um == (true)){
            contexto.scene.start('fase4Um');
        }}
        {if (voltarState.cenaAtualFase4Dois == (true)){
            contexto.scene.start('fase4Dois');
        }}
        }  
        voltar.on('pointerdown', () => {
            voltarParaFaseAnterior(this);
            this.mouseClick.play();
        });
        //FIM BOTÃO VOLTAR

    }

    update() {
        this.mouse.x = this.input.x;
        this.mouse.y = this.input.y;

    }
}