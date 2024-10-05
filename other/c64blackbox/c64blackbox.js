class C64Blackbox {
    static backgroundColor = '#979797';
    static lightgrayColor = '#979797';
    static yellowColor = '#ffff00';
    static rowHeight = 20;

    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.planeGeometry = new THREE.PlaneGeometry(5, 5);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.delta = 0.006;
        this.runningTime = 0;
        this.blinkInterval = 100;
        this.cursorSize = C64Blackbox.rowHeight - 7;
        this.cursorVisible = true;
        this.texture = null;
		this.context = null

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

    drawInitialText(context) {
        this.cursorPosition = { x: Math.floor(this.cursorSize / 2) + 1, y: 6.5 * C64Blackbox.rowHeight };
        context.fillStyle = '#494949';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
        context.fillStyle = C64Blackbox.backgroundColor;
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
		C64Blackbox.backgroundColor = C64Blackbox.lightgrayColor;
        this.clearOutput();
    }

    handleF2() {
        console.log('2 or F2 was pressed');
		C64Blackbox.backgroundColor = C64Blackbox.yellowColor;
		this.clearOutput();
    }

    handleF4() {
        console.log('3, 4 or F4 was pressed');
		
		this.clearCursor(this.context);		
		this.context.fillStyle = 'black';
        this.context.fillText(String.fromCharCode(0xe05f) + 'K&A', 0, 7 * C64Blackbox.rowHeight);
        this.context.fillText('READY.', 0, 9 * C64Blackbox.rowHeight);
		this.cursorPosition = { x: Math.floor(this.cursorSize / 2) + 1, y: 9.5 * C64Blackbox.rowHeight }
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
        if (this.runningTime % this.blinkInterval == Math.floor(this.blinkInterval / 2)) {
            this.cursorVisible = true;
        } else if (this.runningTime % this.blinkInterval == 0) {
            this.cursorVisible = false;
        }

        const context = this.texture.image.getContext('2d');
        
        var x = this.cursorPosition.x - this.cursorSize / 2;
        var y = this.cursorPosition.y - this.cursorSize / 2;
        
        context.clearRect(x, y, this.cursorSize, this.cursorSize);
        
        if (this.cursorVisible) {
            context.fillStyle = 'black';
            context.fillRect(x, y, this.cursorSize, this.cursorSize);
        } else {
			this.clearCursor(context);
        }
        
        this.texture.needsUpdate = true;
    }
	
	clearCursor(context){
        var x = this.cursorPosition.x - this.cursorSize / 2;
        var y = this.cursorPosition.y - this.cursorSize / 2;
		
		context.fillStyle = C64Blackbox.backgroundColor;
        context.fillRect(x, y, this.cursorSize, this.cursorSize);			
	}
	
    conditionalRotationReset() {
        if (Math.abs(this.plane.rotation.y) > 0.80 * Math.PI / 2) {
            this.delta *= -1;
        }
    }

    animate() {
        this.runningTime++;
        this.plane.rotation.y += this.delta;
        this.blinkCursor();
        this.conditionalRotationReset();
        this.renderer.render(this.scene, this.camera);
		requestAnimationFrame(() => this.animate());
    }
}

const c64 = new C64Blackbox();