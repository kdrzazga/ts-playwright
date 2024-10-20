
class PictureLoader{

	constructor(context){
		this.context = context;
		this.textureLoader = new THREE.TextureLoader();
	}

	load(fileName, x, y) {

		this.textureLoader.load(fileName, (texture) => {

			const tmpCanvas = document.createElement('canvas');
			const tmpCtx = tmpCanvas.getContext('2d');

			tmpCanvas.width = this.context.canvas.width;
			tmpCanvas.height = this.context.canvas.height;

			tmpCtx.drawImage(this.context.canvas, 0, 0);

			tmpCtx.drawImage(texture.image, x, y);

			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
			this.context.drawImage(tmpCanvas, 0, 0);

			//console.log('Picture loaded and displayed at', x, y);
		}, undefined, (error) => {
			console.error('An error occurred while loading the texture:', error);
		});
	}

}
