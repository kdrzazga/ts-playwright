class CylinderScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 15;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);

        const radiusTop = 3;
        const radiusBottom = 3;
        const height = 13;
        const radialSegments = 128;
        this.cylinderGeometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, radialSegments);
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load('pic.jpg');

        this.cylinderMaterial = new THREE.MeshBasicMaterial({ map: this.texture });
        this.cylinder = new THREE.Mesh(this.cylinderGeometry, this.cylinderMaterial);
        this.scene.add(this.cylinder);

        this.rotationSpeed = 0.05;
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('resize', () => this.onWindowResize());
        this.animate();
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    handleKeyDown(event) {
        if (event.key === 'ArrowLeft') {
            this.cylinder.rotation.y += this.rotationSpeed;
        } else if (event.key === 'ArrowRight') {
            this.cylinder.rotation.y -= this.rotationSpeed;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

const cylinderScene = new CylinderScene();
