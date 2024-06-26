const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'absolute';
canvas.style.top = '10px';
canvas.width = 400;
canvas.height = 600;
const ctx = canvas.getContext('2d');

class Pictures {
  private current_pic_index: number;
  private readonly pic_sequence: string[] = ['1', '2', '3', '4', '5', '6', '7', '8'];

  constructor() {
    this.current_pic_index = 0; 
  }

  update() {
	this.current_pic_index = (this.current_pic_index + 1) % this.pic_sequence.length;
	this.draw();
  }

  private draw() {
    const image = new Image();
	image.src = 'resources/' + this.pic_sequence[this.current_pic_index] + '.png';
	ctx.drawImage(image, 0, 0);
  }
  
}

const pic = new Pictures();

let lastRenderTime = 0;
const fps = 9;

function animate(currentTime) {
    const timeSinceLastRender = currentTime - lastRenderTime;

    if (timeSinceLastRender > 1000 / fps) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
		pic.update();
        lastRenderTime = currentTime;
    }
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
