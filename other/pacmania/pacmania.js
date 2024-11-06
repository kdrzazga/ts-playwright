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
}

class Game {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(5, 5, 10);
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

        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.player.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();
