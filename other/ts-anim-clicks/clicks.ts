import * as PIXI from './pixi.js';

class AnimationApp {
  private app: PIXI.Application;
  private container: PIXI.Container;

  constructor() {
    this.app = new PIXI.Application({
      width: 800,
      height: 600,
      backgroundColor: 0x1099A7,
    });
    this.createRectangle();
    document.body.appendChild(this.app.view);
  }

  private createRectangle() {
    const rectangle = new PIXI.Graphics();
    rectangle.beginFill(0x666666);
    rectangle.drawRect(0, 0, 500, 300);
    rectangle.endFill();
    this.container = new PIXI.Container();
    this.container.addChild(rectangle);
    this.app.renderer.view.style.position = 'relative';
    this.app.renderer.view.style.left = '50%';
    this.app.renderer.view.style.top = '50%';
    this.app.renderer.view.style.transform = 'translate(-50%, -50%)';
  }

  private createCircle() {
    const circle = new PIXI.Graphics();
    circle.beginFill(0xFF69B4);
    circle.drawCircle(0, 0, 20);
    circle.endFill();
    return circle;
  }

  private animate() {
    const circle1 = this.createCircle();
    circle1.position.x = Math.random() * (500 - 20);
    circle1.position.y = Math.random() * (300 - 20);
    this.container.addChild(circle1);

    const circle2 = this.createCircle();
    circle2.position.x = Math.random() * (500 - 20);
    circle2.position.y = Math.random() * (300 - 20);
    this.container.addChild(circle2);

    const circle3 = this.createCircle();
    circle3.position.x = Math.random() * (500 - 20);
    circle3.position.y = Math.random() * (300 - 20);
    this.container.addChild(circle3);

    setTimeout(() => {
      this.container.removeChild(circle1);
      this.container.removeChild(circle2);
      this.container.removeChild(circle3);
      this.animate();
    }, 5000);
  }

  private handleClick(event: PIXI.InteractionEvent) {
    if (event.target instanceof PIXI.Graphics) {
      this.animate();
    }
  }

  private init() {
    this.app.renderer.view.addEventListener('click', this.handleClick.bind(this));
  }

  public start() {
    this.init();
  }
}

new AnimationApp().start();