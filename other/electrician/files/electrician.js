class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.floors = [];
        this.ladder = new Ladder();
    }

    preload() {
        this.load.image('sprite', 'files/electrician.png');
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600);

        this.building = new Building(3);

        this.sprite = this.physics.add.sprite(100, 400, 'sprite');
        this.sprite.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.handleMovement();
    }

    handleMovement() {
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown) {
            velocityX = -160;
        } else if (this.cursors.right.isDown) {
            velocityX = 160;
        }

        if (velocityX === 0 && this.ladder.onLadder(this.sprite.x)) {
            if (this.cursors.up.isDown) {
                velocityY = -160;
            } else if (this.cursors.down.isDown) {
                velocityY = 160;
            }
        }

        this.sprite.setVelocityX(velocityX);
        this.sprite.setVelocityY(velocityY);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade', // Enable Arcade Physics
        arcade: {
            gravity: { y: 0 }, // No gravity (set to 0 to keep the sprite grounded)
            debug: false // Set to true to see physics bodies and debug information
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
