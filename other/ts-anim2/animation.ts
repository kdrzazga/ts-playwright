const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

class Pictures {
  private current_pic: string;

  constructor() {
    this.current_pic = 'pic.png';
  }

  private draw() {
    const image = new Image();
	image.src = this.current_pic;
			ctx.drawImage(image, 0, 0);
  }

  update() {
	this.current_pic = 'pic.png';
	this.draw();
  }
}

const pic = new Pictures();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  pic.update();
}

animate();
