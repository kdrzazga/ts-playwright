class CylinderScene {
    constructor() {
        this.initializeScene();
        this.createCylinder();
        this.createPlane();
        this.setupEventListeners();
        this.animate();
    }

    initializeScene() {
        this.scene = new THREE.Scene();

        this.textureLoader = new THREE.TextureLoader();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.z = 20;

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.renderer.domElement);
    }

    createCylinder() {
        const radius = 9;
        const height = 23;
        const radialSegments = 128;
        const cylinderGeometry = new THREE.CylinderGeometry(radius, radius, height, radialSegments);

        this.textureLoader.load('cylinderPic.jpg', (texture) => {
            const cylinderMaterial = new THREE.MeshBasicMaterial({ map: texture });
            this.cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
            this.scene.add(this.cylinder);
        });
    }

    createPlane() {
        const planeMaterial = new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load('pic.png'), side: THREE.DoubleSide });
        const planeGeometry = new THREE.PlaneGeometry(1, 1);
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);

        plane.position.z = 15.001;
        this.scene.add(plane);
    }

    setupEventListeners() {
        window.addEventListener('keydown', (event) => this.handleKeyDown(event));
        window.addEventListener('resize', () => this.onWindowResize());
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
    }

    handleKeyDown(event) {
        const movementSpeed = 0.05;

        switch (event.key) {
            case 'ArrowLeft':
                this.cylinder.rotation.y += movementSpeed/5;
                break;
            case 'ArrowRight':
                this.cylinder.rotation.y -= movementSpeed/5;
                break;
            case 'ArrowUp':
                this.cylinder.position.y -= movementSpeed*5;
                break;
            case 'ArrowDown':
                this.cylinder.position.y += movementSpeed*5;
                break;
            case '+':
                this.camera.position.z -= movementSpeed;
                break;
            case '-':
                this.camera.position.z += movementSpeed;
                break;
        }
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

const cylinderScene = new CylinderScene();
