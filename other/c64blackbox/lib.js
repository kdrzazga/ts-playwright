const Direction = Object.freeze({
    LEFT: 'left',
    RIGHT: 'right',
	UP: 'up',
	DOWN: 'down'
});

class Sprite{
    constructor(canvas){
    	this.speed = 3;
    	this.hp = 4;
    	this.x = 0;
    	this.name = "sprite";
    	this.canvas = canvas;
    	this.picPath = "";
    	this.picLeftPath = "";
    	this.picRightPath = "";
    }

	moveRight(){
		if (this.hp > 0){
			this.x += this.speed;
			this.picPath = this.picRightPath;
			this.direction = Direction.RIGHT;
		}
	}

	moveLeft(){
		if (this.hp > 0){
			this.x -= this.speed;
			this.picPath = this.picLeftPath;
			this.direction = Direction.LEFT;
		}
	}

	draw(){
		let context = this.canvas.getContext('2d');
		let pictureLoader = new PictureLoader(context);
		pictureLoader.load(this.picPath, this.x, this.y);
		//don't forget to update the texture in derived class
	}
}

class PictureLoader {
    constructor(context) {
        this.context = context;
        this.textureLoader = new THREE.TextureLoader();
        this.fileName = "";
        this.texture = null;
    }

    load(fileName, x, y) {
        this.fileName = fileName;
        this.read().then(texture => {
            this.texture = texture;
            this.draw(x, y);
        }).catch(error => {
            console.error('Failed to load picture:', error);
        });
    }

    read() {
        return new Promise((resolve, reject) => {
            this.textureLoader.load(
                this.fileName,
                (texture) => {
                    resolve(texture);
                },
                undefined,
                (error) => {
                    console.error('An error occurred while loading the texture:', error);
                    reject(error);
                }
            );
        });
    }

    draw(x, y) {
        const tmpCanvas = document.createElement('canvas');
        const tmpCtx = tmpCanvas.getContext('2d');

        tmpCanvas.width = this.context.canvas.width;
        tmpCanvas.height = this.context.canvas.height;

        tmpCtx.drawImage(this.context.canvas, 0, 0);
        tmpCtx.drawImage(this.texture.image, x, y);

        this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.drawImage(tmpCanvas, 0, 0);
    }
}
