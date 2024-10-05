class Globals{
	static runningTime = 0;	
    static backgroundColor = '#979797';
    static yellowColor = '#ffff00';
    static lightgrayColor = '#979797';
}

class C64Blackbox {
    static rowHeight = 20;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.delta = 0.006;        
        this.blinkInterval = 100;
        this.texture = null;
		this.context = null
		this.cursor = null;

        this.init();
    }

    init() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x494949, 1);
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
		
        context.fillStyle = '#494949';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = Globals.backgroundColor;
        context.fillRect(0, 90, context.canvas.width, context.canvas.height);
        context.fillStyle = '#979797';
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
		Globals.backgroundColor = Globals.yellowColor;
		this.clearOutput();
    }

    handleF4() {
        console.log('3, 4 or F4 was pressed');
		
		this.cursor.clear(this.context);		
		this.context.fillStyle = 'black';
        this.context.fillText(String.fromCharCode(0xe05f) + 'K&A', 0, 7 * C64Blackbox.rowHeight);
        this.context.fillText('READY.', 0, 9 * C64Blackbox.rowHeight);
		this.cursor.position = { x: Math.floor(this.cursor.size / 2) + 1, y: 9.5 * C64Blackbox.rowHeight }
    }

    handleKeyDown(event) {
        const keyMapping = {
            'F1': this.handleF1.bind(this),
            'F2': this.handleF2.bind(this),
            'F4': this.handleF4.bind(this)
        };

        const keyTriggers = {
            'F1': ['F1', 112, '1'],
            'F2': ['F2', 113, '2'],
            'F4': ['F4', 115, '3', '4']
        };

        for (const [key, values] of Object.entries(keyTriggers)) {
            if (values.includes(event.key) || values.includes(event.keyCode)) {
                keyMapping[key]();
                break;
            }
        }
    }
    blinkCursor() {
        if (Globals.runningTime % this.blinkInterval == Math.floor(this.blinkInterval / 2)) {
            this.cursor.visible = true;
        } else if (Globals.runningTime % this.blinkInterval == 0) {
            this.cursor.visible = false;
        }

        const context = this.texture.image.getContext('2d');
        
        var x = this.cursor.position.x - this.cursor.size / 2;
        var y = this.cursor.position.y - this.cursor.size / 2;
        
        context.clearRect(x, y, this.cursor.size, this.cursor.size);
        
        if (this.cursor.visible) {
            context.fillStyle = 'black';
            context.fillRect(x, y, this.cursor.size, this.cursor.size);
        } else {
			this.cursor.clear(context);
        }
        
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
	
	constructor(context){
		this.size = C64Blackbox.rowHeight - 7;
        this.position = { x: Math.floor(this.size / 2) + 1, y: 6.5 * C64Blackbox.rowHeight }
		this.visible = true;
	}
	
	clear(context){
		
        var x = this.position.x - this.size / 2;
        var y = this.position.y - this.size / 2;
		
		context.fillStyle = Globals.backgroundColor;
        context.fillRect(x, y, this.size, this.size);	
	}
	
}

const c64 = new C64Blackbox();
