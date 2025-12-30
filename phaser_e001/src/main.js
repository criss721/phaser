import Phaser from "Phaser"

console.log(Phaser);
//most_simple_phaser_scene_config();
// add_text_scene();
//change_scene_sample();
// test_update_scene();
get_user_input();

function get_user_input() {
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

    new Phaser.Game(config);

    function preload() {
    }

    function create() {
        this.key = this.input.keyboard.createCursorKeys();
        this.keyA = this.input.keyboard.addKey('A');

        this.input.on('pointerdown', (pointer) => {
            console.log(pointer.x, pointer.y);
        });
    }

    function update(time, delta) {
        if (this.key.left.isDown) {
            console.log('key left down', this.key);
        }
        if (this.keyA.isDown) {
            console.log('A');
        }
    }
}

function test_update_scene() {
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
        this.load.image('ic_launcher', 'asset/ic_launcher.png');
    }

    function create() {
        this.ic_launcher = this.add.image(0, 0, 'ic_launcher').setOrigin(0, 0);
    }

    function update(time, delta) {
        console.log(time, delta);
        console.info(this.scale.width, this.cameras.main.width);
        this.ic_launcher.x += 100 * (delta / 1000);
        this.ic_launcher.x = this.ic_launcher.x > 800 ? 0 : this.ic_launcher.x;
    }
}

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