class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.floors = [];
        this.ladder = new Ladder();
    }

    preload() {
        this.load.image('sprite', 'files/electrician.png'); // Load the sprite image
    }

    create() {
        this.physics.world.setBounds(0, 0, 800, 600); // Set the bounds of the physics world

        this.building = this.createBuilding(3);

        this.sprite = this.physics.add.sprite(100, 400, 'sprite'); // Use the loaded sprite image
        this.sprite.setCollideWorldBounds(true); // Prevent sprite from going out of bounds

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        this.handleMovement();
    }

    createBuilding(floorCount) {
        const floors = [];
        for (let i = 0; i < floorCount; i++) {
            const floor = new Floor();
            floors.push(floor);
            // You can draw the visual representation of floors here if needed
        }
        return floors;
    }

    handleMovement() {
        // Move sprite based on cursor input
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-160); // Move left
        } else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(160); // Move right
        } else if (this.cursors.up.isDown && this.ladder.onLadder(this.sprite.x)) {
            this.sprite.setVelocityY(-160); // Move left
        } else if (this.cursors.down.isDown && this.ladder.onLadder(this.sprite.x)) {
            this.sprite.setVelocityY(160); // Move right
        }

         else {
            this.sprite.setVelocityX(0);
        }

        // You can add additional movement for up/down or jumping if needed
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
