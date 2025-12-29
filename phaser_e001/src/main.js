import Phaser from "Phaser"

console.log(Phaser);
//most_simple_phaser_scene_config();
add_text_scene();

function add_text_scene(){
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
        this.add.text(250,300,'GAME TEXT',{
            font:'32px Arial',
            fill:'#0f0',
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