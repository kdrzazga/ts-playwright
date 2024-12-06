class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        this.floors = [];
        this.ladder = new Ladder();
        this.spriteCanJump = true;
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
        this.conditionalFallDown();
    }

    jump(direction) {
        if (!this.spriteCanJump) return;

        this.spriteCanJump = false;
        const jumpHeight = 45;
        const duration = 750;

        const jumpTween = {
            targets: this.sprite,
            y: this.sprite.y - jumpHeight, // Move up
            duration: duration / 2, // Up for half the duration
            ease: 'Linear',
            onComplete: () => {

                const comeDownTween = {
                    targets: this.sprite,
                    y: this.sprite.y + jumpHeight, // Move down
                    duration: duration / 2,
                    ease: 'Linear',
                    onComplete: () => {
                        // Re-enable jumping after 1 second
                        this.spriteCanJump = true;
                    }
                };
                this.tweens.add(comeDownTween);
            }
        }

        this.tweens.add(jumpTween);

        if (direction === 'left') {
            this.sprite.setVelocityX(-160);
        } else if (direction === 'right') {
            this.sprite.setVelocityX(160);
        } else {
            this.sprite.setVelocityX(0); // No horizontal movement if just jumping
        }
    }

    conditionalFallDown(){
        let flrs = ""

        if (this.ladder.onLadder(this.sprite.x)){
            return; //Ladder prevents from falling;
        }

        let velocity = 160;

        this.building.floors.forEach(f => {
            flrs += " " + f.floorLevel;

            if (f.onFloor(this.sprite.y) && !this.ladder.onLadder(this.sprite.x)){
                console.log('Floor met on y= ' + this.sprite.y);
                velocity = 0; //Floor under feet prevents from falling
                return;
            }
        });

        this.sprite.setVelocityY(velocity);
        console.log("Fall down y = ", this.sprite.y, " FloorLevels = " + flrs);
    }

    handleMovement() {
        let velocityX = 0;
        let velocityY = 0;

        if (this.cursors.left.isDown) {
            velocityX = -160;
            if (this.cursors.up.isDown) {
                this.jump('left');
            }
        } else if (this.cursors.right.isDown) {
            velocityX = 160;
            if (this.cursors.up.isDown) {
                this.jump('right');
            }
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
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: MainScene
};

const game = new Phaser.Game(config);
