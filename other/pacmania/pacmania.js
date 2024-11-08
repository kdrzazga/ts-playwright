class Player {
    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(0.3, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0xbbbb00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }

    update() {
        this.mesh.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 0.78;
    }
}

class Maze {
    constructor(scene) {
        this.geometry = new THREE.PlaneGeometry(10, 10);
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
        const size = 256;
        const gridColor = new THREE.Color(0x888888);
        const backgroundColor = new THREE.Color(0x00aa00);

        // Create an offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const context = canvas.getContext('2d');

        // Fill the background
        context.fillStyle = `rgba(${backgroundColor.r * 255}, ${backgroundColor.g * 255}, ${backgroundColor.b * 255}, 1)`;
        context.fillRect(0, 0, size, size);

        // Draw the grid lines
        const squareSize = (size / 10); // Assuming 10x10 grid
        context.strokeStyle = `rgba(${gridColor.r * 255}, ${gridColor.g * 255}, ${gridColor.b * 255}, 1)`;
        context.lineWidth = 2;

        // Draw horizontal lines
        for (let i = 0; i <= 10; i++) {
            context.beginPath();
            context.moveTo(0, i * squareSize);
            context.lineTo(size, i * squareSize);
            context.stroke();
        }

        // Draw vertical lines
        for (let i = 0; i <= 10; i++) {
            context.beginPath();
            context.moveTo(i * squareSize, 0);
            context.lineTo(i * squareSize, size);
            context.stroke();
        }

        // Create a texture from the canvas
        const texture = new THREE.Texture(canvas);
        texture.needsUpdate = true;

        return texture;
    }

    move(direction) {
        const movementSpeed = 0.02;
        switch (direction) {
            case 'UP':
                this.mesh.position.z += movementSpeed;
                break;
            case 'DOWN':
                this.mesh.position.z -= movementSpeed;
                break;
            case 'LEFT':
                this.mesh.position.x += movementSpeed;
                break;
            case 'RIGHT':
                this.mesh.position.x -= movementSpeed;
                break;
            default:
                break;
        }
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

        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });

        window.addEventListener('keydown', (event) => this.handleKeyDown(event));

        this.animate();
    }

    handleKeyDown(event){
        if ('w' === event.key || 'ArrowUp' === event.key) {
            console.log('UP');
            this.maze.move('UP');
        } else if ('s' === event.key || 'ArrowDown' === event.key) {
            console.log('DOWN');
            this.maze.move('DOWN');
        } else if ('a' === event.key || 'ArrowLeft' === event.key) {
            console.log('LEFT');
            this.maze.move('LEFT');
        } else if ('d' === event.key || 'ArrowRight' === event.key) {
            console.log('RIGHT');
            this.maze.move('RIGHT');
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.player.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();
