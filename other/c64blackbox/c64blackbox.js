class Globals{
	static runningTime = 0;	
	
    static lightgrayColor = '#b3b3b3';
    static backgroundColor = Globals.lightgrayColor;
	static screenWidth = 520;
	static screenHeight = 512;
    static colors = ['black', 'white', 'red', 'cyan', 'magenta', 'green', 'blue', 'yellow', '#675200', '#c33d00', '#c18178', '#606060', '#8a8a8a', '#b3ec91', '#867ade', Globals.lightgrayColor];
}

class C64Blackbox {
    static rowHeight = 20;
	static currentColorIndex = 7;
	static texture = null;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.delta = 0.006;  
		this.context = null
		this.cursor = null;
		this.game = null;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(Globals.colors[11], 1);
        document.body.appendChild(this.renderer.domElement);

        const canvas = document.createElement('canvas');
        this.context = canvas.getContext('2d');
        canvas.width = Globals.screenWidth;
        canvas.height = Globals.screenHeight;
		this.game = new Game(canvas);

        C64Blackbox.texture = new THREE.CanvasTexture(canvas);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: C64Blackbox.texture });
        this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 12;
		this.drawInitialText(this.context);
        this.scene.add(this.plane);

        this.camera.position.z = 5;

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        requestAnimationFrame(() => this.animate());
    }

    drawInitialText(context) {
		this.cursor = new Cursor(context);
		
        context.fillStyle = Globals.colors[11];
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = Globals.backgroundColor;
        context.fillRect(0, 90, context.canvas.width, context.canvas.height);
        context.fillStyle = Globals.colors[12];
        context.font = '13px c64mono';
        context.fillText('* C-64 BASIC IMPROVED BY BLACK BOX V.3 *', 0, 2 * C64Blackbox.rowHeight);
        context.fillText('64K RAM SYSTEM   38911  BASIC BYTES FREE', 0, 4 * C64Blackbox.rowHeight);
        context.fillStyle = 'black';
        context.fillText('READY.', 0, 6 * C64Blackbox.rowHeight);
        
        C64Blackbox.texture.needsUpdate = true;
    }

    clearOutput() {
        const context = C64Blackbox.texture.image.getContext('2d');
        context.clearRect(0, 0, C64Blackbox.texture.image.width, C64Blackbox.texture.image.height);
        this.drawInitialText(context); 		
		console.log('Output resetted. C64 screen redrawn.');
    }
	
    clearOutputBottom(thresholdY) {
        const context = C64Blackbox.texture.image.getContext('2d');
		context.fillStyle = Globals.backgroundColor;
        context.fillRect(0, thresholdY, C64Blackbox.texture.image.width, C64Blackbox.texture.image.height);
		console.log('Bottom Output resetted.');
    }
	
	handleHelp(){
		console.log("HELP");
		this.clearOutput();
		const context = C64Blackbox.texture.image.getContext('2d');
		context.fillStyle = 'black';

		context.fillText(String.fromCharCode(0xe05f) + 'HELP', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += 2*(this.cursor.size + 2);
		context.fillText('F1, 1, Q - ' +String.fromCharCode(0xe05f) + 'HELP, DISPLAY THIS HELP', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += this.cursor.size + 2;
		context.fillText('F2, 2, 8, U, J - SOFT RESET', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += this.cursor.size + 2;
		context.fillText('F3, 3, 9, I, K - CHANGE BACKGROUND COLOR', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += this.cursor.size + 2;
		context.fillText('F6, 6, 0, =, O, L - ' + String.fromCharCode(0xe05f) + 'K&A+ LOGO', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += this.cursor.size + 2;
		context.fillText('F7, 7, -, P, ; - ' + String.fromCharCode(0xe05f) + 'BRUCE LEE SIMPLE GAME', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += 2*(this.cursor.size + 2);
		context.fillText('READY.', 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.y += this.cursor.size + 2;
	}

    handleF1() {
        console.log('1 or F1 was pressed');
		this.game.reset();
		Globals.backgroundColor = Globals.lightgrayColor;
        this.clearOutput();
    }

    handleF2() {
        console.log('2 or F2 was pressed');
		this.game.reset();
		this.cursor.clear();
		const context = C64Blackbox.texture.image.getContext('2d');
		context.fillStyle = 'black';

		context.fillText('POKE 53281, ' + C64Blackbox.currentColorIndex, 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.x = 15 * this.cursor.size - 3;
		if (C64Blackbox.currentColorIndex < 10){
			this.cursor.position.x -= this.cursor.size;
		}
		C64Blackbox.texture.needsUpdate = true;
		
		const promise = new Promise((resolve) => {
			setTimeout(() => {
				
		Globals.backgroundColor = Globals.colors[C64Blackbox.currentColorIndex];
		C64Blackbox.currentColorIndex = (C64Blackbox.currentColorIndex + 1) % Globals.colors.length;
		console.log(C64Blackbox.currentColorIndex);
		this.clearOutput();
			resolve();
			}, 1000);
		});
    }

    handleF4() {
        console.log('3, 4 or F4 was pressed');
		
		this.game.reset();
		this.clearOutput();	
		this.context.fillStyle = 'black';
        this.context.fillText(String.fromCharCode(0xe05f) + 'K&A+', 0, 7 * C64Blackbox.rowHeight);
        this.context.fillText('READY.', 0, 13 * C64Blackbox.rowHeight + 2);
		this.cursor.position = { x: Math.floor(this.cursor.size / 2) + 1, y: 13.5 * C64Blackbox.rowHeight}
		
		this.loadPicture('logo.png', 0, 8 * C64Blackbox.rowHeight);
    }
	
	handleF6(){
		console.log('F4 was pressed. Simple game');
		this.game.reset();
		this.game.activate();		
		this.clearOutputBottom(Math.floor(5 * Globals.screenHeight / 6));
				
		this.cursor.clear();
		this.context.fillStyle = 'black';
		this.context.fillText(String.fromCharCode(0xe05f) + 'BRUCE LEE', 0, this.cursor.position.y + 4);
		this.cursor.moveDown(2);
		this.context.fillStyle = 'black';
		this.context.fillText('READY.', 0, this.cursor.position.y + 5);
		this.cursor.moveDown(1);
	}
	
	handleMovement(direction) {
		this.clearOutputBottom(Math.floor(5 * Globals.screenHeight / 6));
	
		if (this.game.active) {
			switch (direction) {
				case 'up':
					console.log('UP key was pressed.');
					break;
				case 'down':
					console.log('DOWN key was pressed.');
					break;
				case 'left':
					console.log('LEFT key was pressed.');
					this.game.moveFighterLeft(this.game.player);
					break;
				case 'right':
					console.log('RIGHT key was pressed.');
					this.game.moveFighterRight(this.game.player);
					break;
			}
		}
	}
	
	handleFire(){
		if (this.game.active){
			console.log('FIRE key was pressed.');
			this.clearOutputBottom(Math.floor(5 * Globals.screenHeight / 6));
			this.game.punch(this.game.player);
		}		
	}
	
	loadPicture(fileName, x, y) {
		let pictureLoader = new PictureLoader(this.context);
		pictureLoader.load(fileName, x, y);		
		C64Blackbox.texture.needsUpdate = true;			
	}

    handleKeyDown(event) {
        const keyMapping = {
            help: () => this.handleHelp(),
            'F1': () => this.handleF1(),
            'F2': () => this.handleF2(),
            'F4': () => this.handleF4(),
            'F6': () => this.handleF6(),
            w: () => this.handleMovement('up'),
            s: () => this.handleMovement('down'),
            a: () => this.handleMovement('left'),
            d: () => this.handleMovement('right'),
            fire: () => this.handleFire(),
        };

        const keyTriggers = {
            'help': ['F1', 111, '1', 'q'],
            'F1': ['F2', 112, '2', '8', 'u', 'j'],
            'F2': ['F3', 113, '3', '9', 'i', 'k'],
            'F4': ['F6', 115, '6', '0', '=', 'o', 'l'],
            'F6': ['F7', 117, '7', '-', 'p', ';'],
			'w': ['w', 'ArrowUp'],
			's': ['s', 'ArrowDown'],
			'a': ['a', 'ArrowLeft'],
			'd': ['d', 'ArrowRight'],
			'fire' : ['Control', 17, 'Space', 32, 'Enter', 13]
        };

        for (const [key, values] of Object.entries(keyTriggers)) {
            if (values.includes(event.key) || values.includes(event.keyCode)) {
                keyMapping[key]();
                break;
            }
        }
    }

    blinkCursor() {
		this.cursor.blinkCursor();        
        C64Blackbox.texture.needsUpdate = true;
    }
	
    conditionalRotationReset() {
        if (Math.abs(this.plane.rotation.y) > 0.80 * Math.PI / 2) {
            this.delta *= -1;
        }
    }

    animate() {
        Globals.runningTime++;
        this.plane.rotation.y += this.delta;
        this.blinkCursor();
        this.conditionalRotationReset();
        this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(() => this.animate());
    }
}

class Cursor{
	
	 static blinkInterval = 100;
	
	constructor(context){
		this.context = context;
		this.size = C64Blackbox.rowHeight - 7;
        this.position = { x: Math.floor(this.size / 2) + 1, y: 6.5 * C64Blackbox.rowHeight }
		this.visible = true;
	}
	
	moveDown(times){
		this.position.y += times * this.size;
	}
	
	clear(){		
        var x = this.position.x - this.size / 2;
        var y = this.position.y - this.size / 2;
		
		this.context.fillStyle = Globals.backgroundColor;
        this.context.fillRect(x, y, this.size, this.size);	
	}
	
    blinkCursor() {
        if (Globals.runningTime % Cursor.blinkInterval == Math.floor(Cursor.blinkInterval / 2)) {
            this.visible = true;
        } else if (Globals.runningTime % Cursor.blinkInterval == 0) {
            this.visible = false;
        }
        var x = this.position.x - this.size / 2;
        var y = this.position.y - this.size / 2;
        
        this.context.clearRect(x, y, this.size, this.size);
        
        if (this.visible) {
            this.context.fillStyle = 'black';
            this.context.fillRect(x, y, this.size, this.size);
        } else {
			this.clear();
        }
	}
}

class PictureLoader{
	
	constructor(context){
		this.context = context;
	}
	
	load(fileName, x, y) {
		const textureLoader = new THREE.TextureLoader();
	
		textureLoader.load(fileName, (texture) => {
			
			const tmpCanvas = document.createElement('canvas');
			const tmpCtx = tmpCanvas.getContext('2d');
			
			tmpCanvas.width = this.context.canvas.width;
			tmpCanvas.height = this.context.canvas.height;
			
			tmpCtx.drawImage(this.context.canvas, 0, 0);
			
			tmpCtx.drawImage(texture.image, x, y);
			
			this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
			this.context.drawImage(tmpCanvas, 0, 0);
			
			//console.log('Picture loaded and displayed at', x, y);
		}, undefined, (error) => {
			console.error('An error occurred while loading the texture:', error);
		});
	}
	
}

class Fighter{
	constructor(canvas){
		this.speed = 3;
		this.hp = 4;
		this.x = 0;
		this.y = Globals.screenHeight - 75;
		this.name = "fighter";
		this.canvas = canvas;
		this.picPath = "";
		this.punchPicPath = "";
		this.punching = false;
		this.punchAudio = new PunchAudio("punch.mp3");
	}
	
	moveRight(){
		if (this.hp > 0){
			this.x += this.speed;
		}
	}
	
	moveLeft(){
		if (this.hp > 0){
			this.x -= this.speed;
		}
	}
	
	draw(){
		let context = this.canvas.getContext('2d');
		let pictureLoader = new PictureLoader(context);
		pictureLoader.load(this.picPath, this.x, this.y);        
        C64Blackbox.texture.needsUpdate = true;
	}
	
	punch(){
		console.log('PUNCH');
		let tempPicPath = this.picPath;
		this.picPath = this.punchPicPath;
		this.draw();
		this.punchAudio.enable();
		this.punchAudio.playAudio();
		
		this.punching = true;
		
		new Promise((resolve) => {
			setTimeout(() => {				
				this.picPath = tempPicPath;
				this.draw();
				this.punching = false;
				resolve();
			}, 500);
		});
		
	}
	
	checkIfDead(){
		if (this.hp <= 0){
			console.log(this.name + " is dead.\n\n\n");
			c64.loadPicture('gameover.png', 8 * C64Blackbox.rowHeight, 4.75 * C64Blackbox.rowHeight);
			new Promise((resolve) => {
				setTimeout(() => {
					location.reload();
					resolve();		
				}, 4000);
			});
		}
	}
	
}

class Player extends Fighter{
	constructor(canvas){
		super(canvas);		
		this.x = Math.floor(Globals.screenWidth / 2);
		this.name = "player";
		this.picPath = "fatman.png";
		this.punchPicPath = "fatmanPunch.png";
	}
}

const Direction = Object.freeze({
    LEFT: 'left',
    RIGHT: 'right'
});

class Enemy extends Fighter{
	constructor(canvas){
		super(canvas);		
		this.x = 10;		
		this.name = "enemy";
		this.picPath = "blee.png";
		this.direction = Direction.RIGHT;
	}
	
	move(){
		if (this.direction == Direction.LEFT){
			if (this.x < 10){
				this.direction = Direction.RIGHT;
			}
			else{
				this.moveLeft();
			}
		}
		else {
			if (this.x > Globals.screenWidth - 100){
				this.direction = Direction.LEFT;
			}
			else{
				this.moveRight();
			}			
		}
		const context = C64Blackbox.texture.image.getContext('2d');
		context.fillStyle = Globals.backgroundColor;
        context.fillRect(0, Math.floor(5 * Globals.screenHeight / 6), C64Blackbox.texture.image.width, C64Blackbox.texture.image.height);
	}
}

class Game{
	
	static hitDistance = 50;
	
	constructor(canvas){
		this.canvas = canvas;
		this.reset();
	}
	
	activate(){
		this.reset();
		this.active = true;
		console.log("Game started.");
		this.draw();
		this.startMainLoop();
	}
	
    startMainLoop() {
        if (this.active) {
            this.mainLoop();
            setInterval(() => {
                if (this.active) {
                    this.mainLoop();
                }
            }, 30);
        }
    }

    mainLoop() {
        this.enemy.move();
        this.draw();
    }
	
	moveFighterLeft(fighter){
		fighter.moveLeft();
		this.draw();
	}
	
	moveFighterRight(fighter){
		fighter.moveRight();
		this.draw();		
	}
	
	punch(fighter){
		var hit = false;
		if (!fighter.punching){
			fighter.punch();
		}		
			this.draw();
			var anotherFighter = this.getFighters().filter(f => f !== fighter)[0]
			if (this.checkHitDistance(fighter, anotherFighter)){
				if (anotherFighter.hp > 0){
					anotherFighter.hp--;
				}
				else {
					anotherFighter.checkIfDead();
				}
			}
	}
	
	checkHitDistance(attackingFighter, receivingFighter){
		var distance = Math.abs(attackingFighter.x - receivingFighter.x);
		
		if (attackingFighter instanceof Player && receivingFighter instanceof Enemy) {
			console.log("Attacker = Player. Enemy under attack. Distance =" + distance);
		}
		else{
			console.log("Attacker = Enemy. Player under attack.. Distance =" + distance);
		}
		
		return distance < Game.hitDistance;
	}
	
	reset(){
		this.active = false;
		this.player = new Player(this.canvas);
		this.enemy = new Enemy(this.canvas);
		
		console.log("Game reset.");
	}
	
	draw(){		
		this.player.draw();
		this.enemy.draw();
	}
	
	getFighters(){
		return [this.player, this.enemy];
	}
}

class PunchAudio {
    constructor(audioFile) {
        this.audio = new Audio(audioFile);
        this.audio.preload = 'auto';
		this.playback = false;
    }
	
	enable(){
		this.playback = true;
	}

    playAudio() {
        this.audio.play();
		this.playback = false;
    }
}

const c64 = new C64Blackbox();
