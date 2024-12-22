const config = {
    type: Phaser.AUTO,
    width: Constants.SCREEN_WIDTH,
    height: Constants.SCREEN_HEIGHT,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: Level2Scene
};

const game = new Phaser.Game(config);
/*
Hacking:

game.scene.scenes[0].building.enemies[7].active = false;
game.scene.scenes[0].player.y=0;
*/
