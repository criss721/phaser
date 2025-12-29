import Phaser from "Phaser"

console.log(Phaser);
//most_simple_phaser_scene_config();
// add_text_scene();
change_scene_sample();

function change_scene_sample() {
    class SplashScene extends Phaser.Scene {
        constructor() {
            super({key: 'splash_scene'});
        }

        preload() {
            this.load.audio('menu_mp3', 'asset/menu.mp3');
            this.load.image('splash_png', 'asset/splash.png');
        }

        create() {
            this.cameras.main.setBackgroundColor('#1e3c72');
            this.add.image(400, 240, 'splash_png');
            const menu_mp3 = this.sound.add('menu_mp3');
            menu_mp3.play();

            const btn_start = this.add.text(250, 300, 'START GAME', {
                font: '32px Arial',
                fill: '#0f0',
            });

            btn_start.setInteractive();

            btn_start.on('pointerdown', () => {
                this.scene.start('game_scene');
            });
        }

        update() {
        }
    }

    class GameScene extends Phaser.Scene {
        constructor() {
            super({key: 'game_scene'});
        }

        preload() {
            this.load.audio('game_mp3', 'asset/game.mp3');
            this.load.image('mainmenu_png', 'asset/menumap.png');
        }

        create() {
            this.cameras.main.setBackgroundColor('#3b721e');
            this.add.image(0, 0, 'mainmenu_png')
                .setOrigin(0, 0)
                .setDisplaySize(800, 480);
            this.sound.add('game_mp3').play();

            const btn_back = this.add.text(250, 300, 'BACK', {
                font: '32px Arial',
                fill: '#f00',
            });

            btn_back.setInteractive();

            btn_back.on('pointerdown', () => {
                this.scene.start('splash_scene');
            });
        }

        update() {
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [SplashScene, GameScene]
    };

    new Phaser.Game(config);
}

function add_text_scene() {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#DEDEDE',
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload() {
    }

    function create() {
        const btn = this.add.text(250, 300, 'GAME TEXT', {
            font: '32px Arial',
            fill: '#0f0',
        });

        btn.setInteractive();

        btn.on('pointerdown', () => {
            console.log('BTN CLICK');
        });
    }

    function update() {
    }
}

function most_simple_phaser_scene_config() {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

    var game = new Phaser.Game(config);

    function preload() {
    }

    function create() {
    }

    function update() {
    }
}