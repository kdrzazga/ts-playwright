class ThreeDScene {
	static backgroundColor = '#979797';
	static rowHeight = 20;
	
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer();
        this.delta = 0.006;
        this.runningTime = 0;
        this.blinkInterval = 100;
        this.cursorSize = 10;
        this.cursorPosition = { x: Math.floor(this.cursorSize / 2) + 1, y: 256 };
		this.cursorVisible = true;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x494949, 1);
        document.body.appendChild(this.renderer.domElement);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;

        context.fillStyle = '#494949';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = ThreeDScene.backgroundColor;
        context.fillRect(0, 90, canvas.width, canvas.height);
        context.fillStyle = '#979797';
        context.font = '20px Arial';
        context.fillText('* C-64 BASIC IMPROVED BY BLACK BOX V.3 *', 0, 2 * ThreeDScene.rowHeight);
        context.fillText('64K RAM SYSTEM   38911   BASIC BYTES FREE', 0, 4 * ThreeDScene.rowHeight);
        context.fillStyle = 'black';
        context.fillText('READY.', 0, 120);

        this.texture = new THREE.CanvasTexture(canvas);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: this.texture });
        this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 12;
        this.scene.add(this.plane);

        this.camera.position.z = 5;

        this.animate();
    }

    blinkCursor() {
		if (this.runningTime % this.blinkInterval == Math.floor(this.blinkInterval / 2)){
			this.cursorVisible = true;
		}

		else if (this.runningTime % this.blinkInterval == 0){
			this.cursorVisible = false;
		}

        const context = this.texture.image.getContext('2d');
		
		var x = this.cursorPosition.x - this.cursorSize / 2
		var y = this.cursorPosition.y - this.cursorSize / 2
		
        context.clearRect(x, y, this.cursorSize, this.cursorSize);
		
		
        if (this.cursorVisible) {
			console.log('curr visible')
            context.fillStyle = 'black';
            context.fillRect(x, y, this.cursorSize, this.cursorSize);
        }
		else {
            context.fillStyle = ThreeDScene.backgroundColor;
            context.fillRect(x, y, this.cursorSize, this.cursorSize);			
		}
        this.texture.needsUpdate = true;
    }

    conditionalReset() {
        if (this.plane.rotation.y < -0.80 * Math.PI / 2 || this.plane.rotation.y > 0.80 * Math.PI / 2) {
            this.delta = -this.delta;
        }
    }

    animate() {
        this.runningTime++;
        requestAnimationFrame(this.animate.bind(this));
        this.plane.rotation.y += this.delta;

        this.blinkCursor();
        this.conditionalReset();

        this.renderer.render(this.scene, this.camera);
    }
}

const myScene = new ThreeDScene();
