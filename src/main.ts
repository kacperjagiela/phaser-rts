import * as Phaser from 'phaser';

const sceneConfig: Phaser.Types.Scenes.SettingsConfig = {
    active: false,
    visible: false,
    key: 'Game',
};

export class GameScene extends Phaser.Scene {
    private square: Phaser.GameObjects.Rectangle & { body: Phaser.Physics.Arcade.Body };
    private resourceText: Phaser.GameObjects.Text;
    private wood: number = 0;
    private metal: number = 0;
    private food: number = 0;
    private resourcesConfig: Phaser.Types.Time.TimerEventConfig = {
        delay: 1000,
        loop: true,
        callback: this.generateResources,
        callbackScope: this,
    };

    public generateResources() {
        this.wood += 1;
        this.metal += 1;
        this.food += 1;
    }

    // public collectCoin(player, coin) {
    //     coin.destroy();

    //     this.score += 100;
    //     this.resourceText.setText('Score: ' + this.score);
    // }

    constructor() {
        super(sceneConfig);
    }

    public create() {
        this.square = this.add.rectangle(400, 400, 100, 100, 0xffffff) as any;
        // generating coins
        this.resourcesConfig = this.time.addEvent(this.resourcesConfig);

        this.resourceText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: 'red' });

        this.physics.add.existing(this.square);
        // this.physics.add.overlap(this.square, this.coins, this.collectCoin, null, this);
    }

    public update() {
        // displaying resources
        this.resourceText.setText(`Wood: ${this.wood} Metal: ${this.metal} Food: ${this.food}`);

        // movement
        const cursorKeys = this.input.keyboard.createCursorKeys();

        if (cursorKeys.up.isDown) {
            this.square.body.setVelocityY(-500);
        } else if (cursorKeys.down.isDown) {
            this.square.body.setVelocityY(500);
        } else {
            this.square.body.setVelocityY(0);
        }

        if (cursorKeys.right.isDown) {
            this.square.body.setVelocityX(500);
        } else if (cursorKeys.left.isDown) {
            this.square.body.setVelocityX(-500);
        } else {
            this.square.body.setVelocityX(0);
        }
    }
}

const gameConfig: Phaser.Types.Core.GameConfig = {
    title: 'RTS',
    type: Phaser.AUTO,

    scale: {
        width: window.innerWidth,
        height: window.innerWidth,
    },

    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },

    scene: GameScene,
    parent: 'game',
    backgroundColor: '#000000',
};

export const game = new Phaser.Game(gameConfig);
