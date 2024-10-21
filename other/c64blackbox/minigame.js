class Fighter extends Sprite{
	constructor(canvas){
        super(canvas);

    	this.y = Globals.screenHeight - 75;
		this.punchPicPath = "";
		this.punchLeftPicPath = "";
		this.punching = false;
		this.punchAudio = new PunchAudio("punch.mp3");
	}
	
	moveBack(times){
		if (this.direction == Direction.LEFT){
			for (var i = 0; i < times; i++){
				this.moveRight();
			}
		}
		else {
			for (var i = 0; i < times; i++){
				this.moveLeft();
			}
		}
	}
	
	draw(){
		super.draw();
        C64Blackbox.texture.needsUpdate = true;
	}
	
	punch(){
		console.log('PUNCH');
		let tempPicPath = this.picPath;
		this.picPath = (this.direction == Direction.LEFT) ? this.punchLeftPicPath: this.punchPicPath;
		this.draw();
		this.punchAudio.enable();
		this.punchAudio.playAudio();
		
		this.punching = true;
		
		setTimeout(() => {				
			this.picPath = tempPicPath;
			this.draw();
			this.punching = false;
		}, 500);
		
	}
	
	checkIfDead(){
		if (this.hp <= 0){
			console.log(this.name + " is dead.\n\n\n");
			
			let context = this.canvas.getContext('2d');
			let pictureLoader = new PictureLoader(context);
			pictureLoader.load('gameover.png', 8 * C64Blackbox.rowHeight, 4.75 * C64Blackbox.rowHeight);
			C64Blackbox.texture.needsUpdate = true;	
			
			setTimeout(() => {
				location.reload();
			}, 4000);
		}
	}
	
}

class Player extends Fighter{
	constructor(canvas){
		super(canvas);		
		this.x = Math.floor(Globals.screenWidth / 2);
		this.y = Globals.screenHeight - 60;
		this.name = "player";
		this.picPath = "bruce/honda_w1.png";
		this.picRightPath = "bruce/honda_w2.png";
		this.picLeftPath = "bruce/honda_w2L.png";
		this.punchPicPath = "bruce/honda_punch.png";
		this.punchLeftPicPath = "bruce/honda_punchL.png";
	}
}

class Enemy extends Fighter{
	constructor(canvas){
		super(canvas);		
		this.x = 10;		
		this.name = "enemy";
		this.picPath = "bruce/blee.png";
		this.picRightPath = "bruce/blee.png";
		this.picLeftPath = "bruce/bleeL.png";
		this.punchPicPath = "bruce/bleePunch.png";
		this.punchLeftPicPath = "bruce/bleeL.png";
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
		context.fillStyle = C64Blackbox.backgroundColor;
        context.fillRect(0, Math.floor(5 * Globals.screenHeight / 6), C64Blackbox.texture.image.width, C64Blackbox.texture.image.height);
	}
}

class BruceGame{
	
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
		let accidentalPunch = Math.random() < 0.009;
			
		if (accidentalPunch){
			this.punch(this.enemy);
		}
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
					anotherFighter.moveBack(17);
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
		
		return distance < BruceGame.hitDistance;
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
