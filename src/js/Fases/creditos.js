class Creditos extends Phaser.Scene {
    constructor() {
        super({ 
            key:'creditos',
        });
    }
    preload() {
        this.load.image('background5', 'src/assets/salacloudcloudblur.png');
        this.load.image('logo', 'src/assets/logoGrupo.png');
        this.load.image('logo2', 'src/assets/visionLogo.png');
        this.load.image('logo3', 'src/assets/logoInteli.png');
        this.load.image('logo4', 'src/assets/logoOracle.png');
    }

    // criação dos elementos da cena
    create() {
        const larguraJogo = this.sys.game.config.width;
        const alturaJogo = this.sys.game.config.height;
    
        // Adiciona o background
        const background = this.add.image(larguraJogo / 2, alturaJogo / 2, 'background5');

        // características do texto
        const estiloTitulo = { fontFamily: 'Georgia', fontSize: 65, color: '#000000' };
        const estiloTexto = { fontFamily: 'Georgia', fontSize: 45, color: '#000000' };

        // Container para o texto dos créditos
        const containerTexto = this.add.container(larguraJogo / 2, alturaJogo / 2);

        // Configura o tamanho do contêiner
        const larguraContainer = 1920;
        const alturaContainer = 1280;
        containerTexto.setSize(larguraContainer, alturaContainer);

        // Adiciona a imagem do logo
        const logo = this.add.image(larguraJogo / -2 + 260, alturaContainer / 1.2, 'logo').setScale(0.6);
        containerTexto.add(logo);
       
        const logo2 = this.add.image(larguraJogo / 2.2 - 250, alturaContainer / 1.2, 'logo2').setScale(0.6);
        containerTexto.add(logo2);

        const logo3 = this.add.image(larguraJogo / -2 + 260, alturaContainer / 0.8, 'logo3').setScale(0.6);
        containerTexto.add(logo3);

        const logo4 = this.add.image(larguraJogo / 2.2 - 250, alturaContainer / 0.8, 'logo4').setScale(0.6);
        containerTexto.add(logo4);


        // nomes dos créditos
        const nomesCreditos = [
            { nome: 'Tri-Database', estilo: estiloTitulo },
            'Eduardo Faris Libutti Salles',
            'João Victor de Sousa Campos',
            'Lucas Paiva Brasil',
            'Lucas Cozzolino Tort',
            'Mariella Sayumi Mercado Kamezawa',
            'Nicolas Ramon da Silva',
            'Rafaela Silva de Oliveira Lima',
            
        ];

        const professores = [
            { nome: 'Professores:', estilo: estiloTitulo },
            'André Godoi',
            'Bruna Mayer',
            'Julia Stateri',
            'Kizzy Terra',
            'Renato Penha',

        ];

        // Posição inicial dos créditos 
        let posicaoY = 670; 

        nomesCreditos.forEach(item => {
            const nome = (typeof item === 'string') ? item : item.nome;
            const estilo = (typeof item === 'string') ? estiloTexto : item.estilo;
            const textoCredito = this.add.text(0, posicaoY, nome, estilo).setOrigin(0.5, 0.5);
            containerTexto.add(textoCredito);
            posicaoY += 90; // Aumenta o espaçamento entre as linhas
        });

        professores.forEach(item => {
            const nome = (typeof item === 'string') ? item : item.nome;
            const estilo = (typeof item === 'string') ? estiloTexto : item.estilo;
            const textoCredito = this.add.text(0, posicaoY, nome, estilo).setOrigin(0.5, 0.5);
            containerTexto.add(textoCredito);
            posicaoY += 90; // Aumenta o espaçamento entre as linhas
        });


        // Animação para rolar os créditos
        this.tweens.add({
            targets: containerTexto,
            y: '-=5000', // Move o contêiner para cima
            duration: 30000, // Duração da animação em milissegundos
            ease: 'Linear',
            delay: 1000, // Delay antes de iniciar a animação (1 segundo neste caso)
        });

        this.time.addEvent({ delay: 18000, callback: this.timerTelainicial, callbackScope: this });//Função para enviar a tela inicial
        
    }

    // atualização da cena
    update() {

    }

    timerTelainicial() { //Função para chamar no timer do AddEvent do phaser e levar de volta para tela inicial
        this.scene.transition({
            target: 'TelaInicial', duration: 1000, 
        });
    }
}
