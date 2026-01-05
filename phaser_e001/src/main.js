import Phaser from "Phaser"

console.log(Phaser);
//most_simple_phaser_scene_config();
// add_text_scene();
//change_scene_sample();
// test_update_scene();
// get_user_input();
// background_tile_add();
add_sprite_sheet();

function add_sprite_sheet() {
    class GameScene extends Phaser.Scene {
        constructor() {
            super('GameScene');
        }

        preload() {
            this.faces = [
                'face_box_tiled',
                'face_circle_tiled',
                'face_hexagon_tiled',
                'face_triangle_tiled'
            ];

            this.faces.forEach(key => {
                this.load.spritesheet(key, `asset/${key}.png`, {
                    frameWidth: 32,
                    frameHeight: 32
                });
            });

            this.load.spritesheet('banana_tiled', 'asset/banana_tiled.png', {
                frameWidth: 33,
                frameHeight: 35
            });
        }

        create() {
            this.faces.forEach(key => {

                this.anims.create({
                    key: `${key}_anim`,
                    frames: this.anims.generateFrameNumbers(key, {
                        start: 0,
                        end: 1
                    }),
                    frameRate: 8,
                    repeat: -1
                });
            });

            this.input.on('pointerdown', (pointer) => {
                console.log('x:', pointer.worldX, 'y:', pointer.worldY);
                console.log('screen x:', pointer.x, 'screen y:', pointer.y);

                // ✅ if we clicked on ANY interactive game object → do nothing
                const clickedSprite = this.input.hitTestPointer(pointer)[0];
                if (clickedSprite) {
                    console.log(clickedSprite);
                    return;
                }

                const randomFace = Phaser.Utils.Array.GetRandom(this.faces);
                const sprite = this.add.sprite(pointer.worldX, pointer.worldY, randomFace);
                sprite.setInteractive();
                sprite.play(`${randomFace}_anim`, true);
            });

            this.anims.create({
                key: 'circle_anim',
                frames: this.anims.generateFrameNumbers('face_circle_tiled', {
                    start: 0,
                    end: 1
                }),
                frameRate: 8,
                repeat: -1
            });

            this.anims.create({
                key: 'banana_anim',
                frames: this.anims.generateFrameNumbers('banana_tiled', {
                    start: 0,
                    end: 7
                }),
                frameRate: 8,
                repeat: -1
            });

            const face_circle_tiled = this.add.sprite(200, 200, 'face_circle_tiled');
            const banana_tiled = this.add.sprite(400, 200, 'banana_tiled');

            banana_tiled.play('banana_anim');

            face_circle_tiled.on('animationstart', (anim) => {
                console.log('start:', anim.key);
            });

            face_circle_tiled.on('animationstop', (anim) => {
                console.log('stopped:', anim.key);
            });

            face_circle_tiled.on('animationpause', (anim, frame) => {
                console.log('paused:', anim.key, 'at frame', frame.index);
            });

            face_circle_tiled.on('animationresume', (anim, frame) => {
                console.log('resumed:', anim.key, 'from frame', frame.index);
            });

            face_circle_tiled.on('animationcomplete', (anim) => {
                console.log('done:', anim.key);
            });

            face_circle_tiled.setInteractive();

            face_circle_tiled.on('pointerdown', () => {
                console.log('CLICK');

                if (face_circle_tiled.anims.isPlaying) {
                    face_circle_tiled.anims.stop();
                    // face_circle_tiled.anims.pause();
                } else {
                    face_circle_tiled.play('circle_anim', true);
                    // face_circle_tiled.play('circle_anim');
                    // face_circle_tiled.anims.resume();
                }
            });
        }

        update(time, delta) {
            super.update(time, delta);
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        backgroundColor: '#888888',
        scene: [GameScene]
    };

    const game = new Phaser.Game(config);
}

function background_tile_add() {
    class GameScene extends Phaser.Scene {
        constructor() {
            super('GameScene');
        }

        preload() {
            this.load.image('grass_tile', 'asset/background_grass.png');
        }

        create() {
            const gameWidth = this.sys.game.config.width;
            const gameHeight = this.sys.game.config.height;

            console.log(gameWidth, gameHeight);

            const background = this.add.tileSprite(
                gameWidth / 2,
                gameHeight / 2,
                gameWidth,
                gameHeight,
                'grass_tile'
            );

            this.backgroundTileSprite = background;

            console.log('Background grass tile added successfully.');
        }

        update(time, delta) {
            // super.update(time, delta);
            this.backgroundTileSprite.tilePositionX += 0.05;
        }
    }

    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [GameScene]
    };

    const game = new Phaser.Game(config);
}

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