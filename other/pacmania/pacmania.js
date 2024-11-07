class Player {
    constructor(scene) {
        this.geometry = new THREE.SphereGeometry(0.3, 32, 32);
        this.material = new THREE.MeshBasicMaterial({ color: 0xbbbb00 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        scene.add(this.mesh);
    }

    update() {
        this.mesh.position.y = Math.sin(Date.now() * 0.002) * 0.5 + 1;
    }
}

class Maze {
    constructor(scene) {
        this.geometry = new THREE.PlaneGeometry(10, 10);
        this.material = new THREE.MeshBasicMaterial({ color: 0x00aa00, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.rotation.x = -Math.PI / 2;
        scene.add(this.mesh);
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
