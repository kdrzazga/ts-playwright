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
        this.board = new Board(this.scene);
        this.keyState = {};

        this.infoFrame = document.getElementById('infoFrame');

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

        this.board.move(deltaX, deltaZ);

        this.updateInfoFrame();
    }

    getPlayerIdPosition(){
        const boardPos = this.board.mesh.position;
        const playerPos = this.player.mesh.position;
        const pId = this.player.id;

        return {[pId] : [boardPos.x, playerPos.y, boardPos.z]};
    }

    getAnimalIdPositions(){
        const boardPos = this.board.mesh.position;
        let idPositions = [];
        this.board.animals.forEach(animal =>{
                    let xA = boardPos.x - animal.mesh.position.x;
                    let yA = animal.mesh.position.y;
                    let zA = boardPos.z - animal.mesh.position.z;
                    const json = {[animal.id] : [xA, yA, zA]};
                    idPositions.push(json);
                });
        return idPositions;
    }

    updateInfoFrame() {
        const animalIdPos = this.getAnimalIdPositions();
        const playerIdPos = this.getPlayerIdPosition();

        const playerId = Object.keys(playerIdPos)[0];
        let caption = `Player Position: <br>`
            + `${playerId}: [${playerIdPos[playerId][0].toFixed(2)}, ${playerIdPos[playerId][1].toFixed(2)}, ${playerIdPos[playerId][2].toFixed(2)}]<br>`
            + `Animals Position: <br>`;

        animalIdPos.forEach(animal =>{
            const animalId = Object.keys(animal)[0];
            const positions = animal[animalId];
            caption += `${[animalId]}: [${positions[0].toFixed(2)}, ${positions[1].toFixed(2)}`
            + `, ${positions[2].toFixed(2)}]<br>`;
        });
        this.infoFrame.innerHTML = caption;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.update();
        this.player.update();
        this.board.update();
        this.renderer.render(this.scene, this.camera);
    }
}

new Game();
