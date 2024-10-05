class Globals{
	static runningTime = 0;	
	
    static lightgrayColor = '#b3b3b3';
    static backgroundColor = Globals.lightgrayColor;
    static colors = ['black', 'white', 'red', 'cyan', 'magenta', 'green', 'blue', 'yellow', '#675200', '#c33d00', '#c18178', '#606060', '#8a8a8a', '#b3ec91', '#867ade', Globals.lightgrayColor];
}

class C64Blackbox {
    static rowHeight = 20;
	static currentColorIndex = 7;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.delta = 0.006;   
        this.texture = null;
		this.context = null
		this.cursor = null;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(Globals.colors[11], 1);
        document.body.appendChild(this.renderer.domElement);

        const canvas = document.createElement('canvas');
        this.context = canvas.getContext('2d');
        canvas.width = 520;
        canvas.height = 512;

        this.texture = new THREE.CanvasTexture(canvas);
        const planeMaterial = new THREE.MeshBasicMaterial({ map: this.texture });
        this.plane = new THREE.Mesh(this.planeGeometry, planeMaterial);
        this.plane.rotation.x = -Math.PI / 12;
		this.drawInitialText(this.context);
        this.scene.add(this.plane);

        this.camera.position.z = 5;

        window.addEventListener('keydown', this.handleKeyDown.bind(this));
        requestAnimationFrame(() => this.animate());
    }

    drawInitialText(context) {;
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
        
        this.texture.needsUpdate = true;
    }

    clearOutput() {
        const context = this.texture.image.getContext('2d');
        context.clearRect(0, 0, this.texture.image.width, this.texture.image.height);
        this.drawInitialText(context); 
        this.texture.needsUpdate = true;		
		console.log('Output resetted. C64 screen redrawn.');
    }

    handleF1() {
        console.log('1 or F1 was pressed');
		Globals.backgroundColor = Globals.lightgrayColor;
        this.clearOutput();
    }

    handleF2() {
        console.log('2 or F2 was pressed');
		this.cursor.clear();
		const context = this.texture.image.getContext('2d');
		context.fillStyle = 'black';

		context.fillText('POKE 53281, ' + C64Blackbox.currentColorIndex, 0, this.cursor.position.y + Math.floor(this.cursor.size / 2));
		this.cursor.position.x = 15 * this.cursor.size - 3;
		if (C64Blackbox.currentColorIndex < 10){
			this.cursor.position.x -= this.cursor.size;
		}
		this.texture.needsUpdate = true;
		
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
		
		this.cursor.clear();		
		this.context.fillStyle = 'black';
        this.context.fillText(String.fromCharCode(0xe05f) + 'K&A+', 0, 7 * C64Blackbox.rowHeight);
        this.context.fillText('READY.', 0, 13 * C64Blackbox.rowHeight);
		this.cursor.position = { x: Math.floor(this.cursor.size / 2) + 1, y: 13.5 * C64Blackbox.rowHeight }
		
		this.loadPicture('logo.png', 0, 8 * C64Blackbox.rowHeight);
    }
	
	loadPicture(fileName, x, y) {
		let pictureLoader = new PictureLoader(this.context);
		pictureLoader.load(fileName, x, y);		
		this.texture.needsUpdate = true;			
	}

    handleKeyDown(event) {
        const keyMapping = {
            'F1': this.handleF1.bind(this),
            'F2': this.handleF2.bind(this),
            'F4': this.handleF4.bind(this)
        };

        const keyTriggers = {
            'F1': ['F1', 112, '1', 'q', 'a', 'z'],
            'F2': ['F2', 113, '2', 'w', 's', 'x'],
            'F4': ['F4', 115, '3', '4', 'e', 'd', 'c']
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
        this.texture.needsUpdate = true;
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
			
			
			console.log('Picture loaded and displayed at', x, y);
		}, undefined, (error) => {
			console.error('An error occurred while loading the texture:', error);
		});
	}
	
}

const c64 = new C64Blackbox();
