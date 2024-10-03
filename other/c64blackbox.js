class ThreeDScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
		this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer();
        this.delta = 0.006;
        this.cursorBlinkTime = 0;
        this.blinkInterval = 500;
        this.isCursorVisible = false;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setClearColor(0x494949, 1)
        document.body.appendChild(this.renderer.domElement);

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 512;
        canvas.height = 512;

        context.fillStyle = '#494949';
        context.fillRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = '#979797';
        context.fillRect(0, 90, canvas.width, canvas.height);
        context.fillStyle = '#979797';
        context.font = '20px Arial';
        context.fillText('* C-64 BASIC IMPROVED BY BLACK BOX V.3 *', 0, 40);
        context.fillText('64K RAM SYSTEM   38911   BASIC BYTES FREE', 0, 80);
        context.fillStyle = 'black';
		context.fillText('READY.', 0, 120);

        const texture = new THREE.CanvasTexture(canvas);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: texture });
        this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 12;
        this.scene.add(this.plane);

        this.camera.position.z = 5;

        this.createCursor();
        this.animate();
    }

    createCursor() {
        const cursorSize = 0.1;
        const cursorGeometry = new THREE.PlaneGeometry(cursorSize, cursorSize);
        const cursorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
        this.cursor = new THREE.Mesh(cursorGeometry, cursorMaterial);
        this.cursor.visible = false;
        this.scene.add(this.cursor);
    }

    blinkCursor() {
        this.cursorBlinkTime += this.delta * 1000;

        if (this.cursorBlinkTime >= this.blinkInterval) {
            this.cursor.visible = this.isCursorVisible = !this.isCursorVisible;
            this.cursorBlinkTime = 0;
        }

        this.cursor.position.set(0, 0, 0.1);
        this.cursor.lookAt(this.camera.position);
    }

    conditionalReset() {
        if (this.plane.rotation.y < -0.98 * Math.PI / 2 || this.plane.rotation.y > 0.98 * Math.PI / 2) {
            this.delta = -this.delta;
        }
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.plane.rotation.y += this.delta;

        this.blinkCursor();
        this.conditionalReset();

        this.renderer.render(this.scene, this.camera);
    }
}

const myScene = new ThreeDScene();
