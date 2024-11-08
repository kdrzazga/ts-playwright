class Player {

    static SIZE = 32;

    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(0.3, Player.SIZE, Player.SIZE);
        this.material = new THREE.MeshBasicMaterial({ color: 0xbbbb00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }

    update() {
        this.mesh.position.y = Math.sin(Date.now() * 0.002) * 0.4 + 0.68;
    }
}

class Maze {
    constructor(scene) {
        this.geometry = new THREE.PlaneGeometry(10, 40);
        this.material = new THREE.MeshBasicMaterial({
            color: 0x00aa00,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.9,
            depthWrite: false,
            map: this.createGridTexture()
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;
        scene.add(this.mesh);
    }

    createGridTexture() {
        const size = 10 * Player.SIZE;
        const gridColor = new THREE.Color(0x999999);
        const backgroundColor = new THREE.Color(0x00aa00);

        const canvas = this.createOffscreenCanvas(size);
        const context = canvas.getContext('2d');

        context.fillStyle = `rgba(${backgroundColor.r * 255}, ${backgroundColor.g * 255}, ${backgroundColor.b * 255}, 1)`;
        context.fillRect(0, 0, size, size);

        const squareSize = (Player.SIZE);
        context.strokeStyle = `rgba(${gridColor.r * 255}, ${gridColor.g * 255}, ${gridColor.b * 255}, 1)`;
        context.lineWidth = 2;

        for (let i = 0; i <= 10; i++) {
            context.beginPath();
            context.moveTo(0, i * squareSize);
            context.lineTo(size, i * squareSize);
            context.stroke();
        }

        for (let i = 0; i <= 10; i++) {
            context.beginPath();
            context.moveTo(i * squareSize, 0);
            context.lineTo(i * squareSize, size);
            context.stroke();
        }

        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        return texture;
    }

    createOffscreenCanvas(size){
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        return canvas;
    }

    move(deltaX, deltaZ) {
        if (deltaX == 0 && deltaZ== 0)
            return;
        let movementSpeed = 0.02;
        if (deltaX !== 0 && deltaZ !== 0)
            movementSpeed *= Math.SQRT1_2;

        console.log(deltaX, deltaZ);

        this.mesh.position.x += deltaX * movementSpeed;
        this.mesh.position.z += deltaZ * movementSpeed;
    }
}

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(3, 2, 7.5);
        this.camera.lookAt(0, 0, 0);
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        this.player = new Player(this.scene);
        this.maze = new Maze(this.scene);
        this.keyState = {};

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('keyup', (event) => this.handleKeyUp(event));
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));

        this.animate();
    }

    handleKeyDown(event) {
        this.keyState[event.key] = true;
    }

    handleKeyUp(event) {
        this.keyState[event.key] = false;
    }

    update(){
        let deltaX = 0;
        let deltaZ = 0;

        if (this.keyState['w'] || this.keyState['ArrowUp']) {
            deltaZ = 1;
        }
        if (this.keyState['s'] || this.keyState['ArrowDown']) {
            deltaZ = -1;
        }
        if (this.keyState['a'] || this.keyState['ArrowLeft']) {
            deltaX = 1;
        }
        if (this.keyState['d'] || this.keyState['ArrowRight']) {
            deltaX = -1;
        }

        this.maze.move(deltaX, deltaZ);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.player.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();
