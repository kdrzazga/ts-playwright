const WORLD_WIDTH = 12;
const WORLD_DEPTH = 42;

class MovableObject {
    static SPEED = 0.02;

    constructor(){
        this.width = 1;
    }

    move(deltaX, deltaZ) {
        if (deltaX == 0 && deltaZ== 0)
            return;
        let movementSpeed = MovableObject.SPEED;
        if (deltaX !== 0 && deltaZ !== 0)
            movementSpeed *= Math.SQRT1_2;

        console.log(deltaX, deltaZ);

        this.mesh.position.x += deltaX * movementSpeed;
        this.mesh.position.z += deltaZ * movementSpeed;
    }
}

class Plant extends MovableObject{
    constructor(x, z, filename, height) {
        super();
        this.createMesh(x, z, filename, height);
    }

    createMesh(x, z, filename, height){
        const depth = 0.03;

        const geometry = new THREE.BoxGeometry(this.width, height, depth);

        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load(filename);
        const material = new THREE.MeshBasicMaterial({ map: texture });

        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.set(x, height / 2, z);
    }
}

class Animal extends Plant{
    constructor(x, z, filename, height) {
        super(x, z, filename, height);
        this.speed = 0.07;
        this.dx = this.speed;
        this.dz = this.speed;
    }

    update(){
        this.mesh.position.x += this.dx;
        this.mesh.position.z += this.dz;

        if(this.mesh.position.x < 0 || this.mesh.position.x >= 0.8 * WORLD_WIDTH / 2){
            this.dx *= -1;
        }
        if(this.mesh.position.z < 0 || this.mesh.position.z >= 0.8 * WORLD_DEPTH / 2){
            this.dz *= -1;
        }
    }
}

class Tree extends Plant{
    constructor(x, z){
        super(x, z, 'resources/tree.png', 2);
    }
}

class Mushroom extends Plant{
    constructor(x, z){
        super(x, z, 'resources/mushroom.png', 0.7);
    }
}

class Fox extends Animal{
    constructor(x, z){
        super(x, z, 'resources/fox.png', 0.5);
        this.width = 2;
        this.createMesh(x, z, 'resources/fox.png', 0.5);
    }
}

class Board extends MovableObject{
    constructor(scene) {
        super();
        this.geometry = new THREE.PlaneGeometry(WORLD_WIDTH, WORLD_DEPTH);
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

        this.trees = [];
        this.mushrooms = [];
        this.animals = [];

        const treePositions = [[1, 0], [-3, 3], [4.2, 7.5], [-1.9, 7.5], [3.1, 5.5], [-2.9, -1.5], [-1.1, -.5]
            , [-1.1, -19.5], [3, -15.5], [4.9, -14.5], [-4.9, 14.5]];

        const mushroomPositions = [[1.5, -13], [2, 11], [-4, 5], [5.2, 3.5], [-3.9, 14.35]];

        const foxPositions = [[-2, 2], [ 2, 3]];

        treePositions.forEach(point =>{
            let t = new Tree(point[0], point[1]);
            this.trees.push(t);
        });

        mushroomPositions.forEach(point =>{
            let m = new Mushroom(point[0], point[1]);
            this.mushrooms.push(m);
        });

        foxPositions.forEach(point =>{
            let fox = new Fox(point[0], point[1]);
            this.animals.push(fox);
        });

        scene.add(this.mesh);

        this.trees.forEach(t => scene.add(t.mesh));
        this.mushrooms.forEach(m => scene.add(m.mesh));
        this.animals.forEach(a => scene.add(a.mesh));
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

    update(){
        this.animals.forEach(animal => animal.update());
    }

    //@Override
    move(deltaX, deltaZ) {
        super.move(deltaX, deltaZ);
        this.trees.forEach(t => t.move(deltaX, deltaZ));
        this.mushrooms.forEach(m => m.move(deltaX, deltaZ));
        this.animals.forEach(m => m.move(deltaX, deltaZ));
    }



}
