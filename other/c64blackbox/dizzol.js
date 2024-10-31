class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/jajo.png";
    	this.picLeftPath = "dizzol/jajo.png";
    	this.picRightPath = "dizzol/jajo.png";
    	this.x = 450;
    	this.y = 409;
    }
}

class Bat extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/bat.png";
    	this.picLeftPath = "dizzol/bat.png";
    	this.picRightPath = "dizzol/bat.png";
    	this.x = 100;
    	this.y = 260;
    	this.speed = 1;
    }

    move() {
        this.x += this.speed;
        if (this.x > 330 || this.x < 70) {
            this.speed = -this.speed;
        }
    }
}

class Room{

    constructor(number, canvas, picPath, leftExit, rightExit, floorLevels, checkpoint, batsCount){
        this.number = number;
        this.picPath = picPath;
        this.leftExit = leftExit;
        this.rightExit = rightExit;
		this.floorLevels = floorLevels;
		this.checkpoint = checkpoint;

        let context = canvas.getContext('2d');
        this.loader = new PictureLoader(context);
        this.enemyLoader = new PictureLoader(context);
        this.bat = null;

        if (batsCount == 1){
            this.bat = new Bat(canvas);
            console.log('Created a bat in Room ' + this.number);
        }
    }

    load(){
        this.read();
        this.draw();
    }

    read(){
        this.loader.fileName = this.picPath;
        this.loader.read().then(texture => {
            this.loader.texture = texture;
        }).catch(error => {
            console.error('Failed to load picture:', error);
        });

        if (this.bat != null){
            this.enemyLoader.fileName = this.bat.picPath;
            this.enemyLoader.read().then(texture => {
                this.enemyLoader.texture = texture;
            }).catch(error => {
                console.error('Failed to load picture:', error);
            });
        }
    }

    draw(){
        this.loader.draw(0, 9 * C64Blackbox.rowHeight);
    }

    drawEnemies(){
       if (this.bat != null){
            this.enemyLoader.draw(this.bat.x, this.bat.y);
       }
    }

    animate(){
        if (this.bat != null){
            this.bat.move();
            this.draw();
            this.drawEnemies();
        }
    }

	getFloorLevel(x) {
        for (let { range, level } of this.floorLevels) {
            if (x >= range[0] && x <= range[1]) {
                return level;
            }
        }
        return null;
    }
}

class DizzolGame{

    static ROOM1 = 1;
    static ROOM2 = 2;
    static ROOM3 = 3;
    static ROOM4 = 4;
    static NO_ROOM = 999999999;

    static roomTransitionsLeft = {
                [DizzolGame.ROOM1]: {nextRoom: DizzolGame.ROOM2, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM2]: {nextRoom: DizzolGame.ROOM3, resetCheckpoint: true, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM3]: {nextRoom: DizzolGame.ROOM4, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM4]: {nextRoom: DizzolGame.NO_ROOM, resetCheckpoint: false, nextRoomPlayerPos: 500}
            };

    static roomTransitionsRight = {
                [DizzolGame.ROOM1]: {nextRoom: DizzolGame.NO_ROOM, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM2]: {nextRoom: DizzolGame.ROOM1, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM3]: {nextRoom: DizzolGame.ROOM2, nextRoomPlayerPos: 100},
                [DizzolGame.ROOM4]: {nextRoom: DizzolGame.ROOM3, resetCheckpoint: true, nextRoomPlayerPos: 5}
            };


    constructor(canvas){
        this.canvas = canvas;
        let roomReg = new RoomRegistry();
        this.rooms = roomReg.createRoomSet(canvas);
        this.player = new Dizzy(canvas);

        let context = canvas.getContext('2d');
        this.dizzyPicLoader = new PictureLoader(context);
        this.reset();
        this.startAnimationLoop();
    }

    reset(){
        this.active = false;
        this.currentRoomId = DizzolGame.ROOM1;
    }

	activate(){
		this.reset();
		this.active = true;
		console.log("Dizzol Game started.");

        let currentRoom = this.rooms.find(room => room.number === this.currentRoomId);
        currentRoom.load();
        this.dizzyPicLoader.load(this.player.picPath, this.player.x, this.player.y);
	}

    startAnimationLoop() {
        setInterval(() => {
            if (!this.active)
                return;
            const currentRoom = this.getCurrentRoom();
            this.player.draw();
            currentRoom.animate();
        }, 8);
    }

    draw(){
        const currentRoom = this.getCurrentRoom();
        currentRoom.draw();
        currentRoom.drawEnemies();
        this.dizzyPicLoader.draw(this.player.x , this.player.y);
    }

    moveFighterLeft(fighter){//fighter only for backward compatibility
        this.player.moveLeft();
        const currentRoom = this.getCurrentRoom();
        this.player.y = currentRoom.getFloorLevel(this.player.x);
        this.draw();
        this.checkExit(Direction.LEFT);
    }

    moveFighterRight(fighter){//fighter only for backward compatibility
        this.player.moveRight();
        const currentRoom = this.getCurrentRoom();
        this.player.y = currentRoom.getFloorLevel(this.player.x);
        this.draw();
        this.checkExit(Direction.RIGHT);
    }

    checkExit(direction) {
        const room = this.getCurrentRoom();
        const exit = direction === Direction.LEFT ? room.leftExit : room.rightExit;
        const roomTransitions = direction === Direction.LEFT ? DizzolGame.roomTransitionsLeft : DizzolGame.roomTransitionsRight;

        if (DizzolGame.NO_ROOM == exit) {
            console.log("No exit on " + direction);
            return;
        }


        if (exit !=null && exit.contains(this.player)) {
            console.log("Player is exiting " + direction);

            const transition = roomTransitions[this.currentRoomId];
            if (transition) {
                if (transition.resetCheckpoint) {
                    room.checkpoint.reset();
                }

                this.player.x = transition.nextRoomPlayerPos;
                this.currentRoomId = transition.nextRoom;
                console.log('Moved to room ' + this.currentRoomId);
            }
        } else if (room.checkpoint.contains(this.player)) {
            room.checkpoint.action();
        }
    }

    getCurrentRoom(){
        return this.rooms.find(room => room.number === this.currentRoomId);
    }
}

class RoomRegistry{

    createRoomSet(canvas){
		const room1floorLevels = [
            { range: [0, 120], level: 419 },
            { range: [121, 152], level: 415 },
            { range: [152, 200], level: 411 },
            { range: [201, 250], level: 405 },
            { range: [251, 310], level: 410 },
            { range: [311, 440], level: 402 },
            { range: [441, Infinity], level: 409 }
        ];

		const room2floorLevels = [
            { range: [0, 120], level: 420 },
            { range: [121, 200], level: 420 },
            { range: [200, 280], level: 405 },
            { range: [281, 314], level: 410 },
            { range: [311, 379], level: 412 },
            { range: [308, Infinity], level: 415 }
        ];

		const room3floorLevels = [
            { range: [0, 120], level: 355 },
            { range: [121, 200], level: 365 },
            { range: [200, 280], level: 380 },
            { range: [281, 314], level: 390 },
            { range: [311, 379], level: 400 },
            { range: [308, Infinity], level: 420 }
        ];

        const room4floorLevels = [
            { range: [0, 120], level: 420 },
            { range: [121, 200], level: 410 },
            { range: [200, 270], level: 400 },
            { range: [271, 300], level: 390 },
            { range: [301, 369], level: 380 },
            { range: [370, 400], level: 370 },
            { range: [401, 490], level: 365 },
            { range: [491, Infinity], level: 355 }
        ];

        const room1Sfx = new SfxEvent("dizzol/huu.mp3");
        const room1Checkpoint = new Checkpoint(310, 411, room1Sfx);
        const room2Sfx = new SfxEvent("dizzol/totem.mp3");
        const room2Checkpoint = new Checkpoint(315, 411, room2Sfx);

        const emptyCheckpoint = new Checkpoint(0, 0, null);

        const room1 = new Room(DizzolGame.ROOM1, canvas, "dizzol/1.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), null, room1floorLevels, room1Checkpoint, 0);
        const room2 = new Room(DizzolGame.ROOM2, canvas, "dizzol/2.png", new RoomExit(100, 20.5 * C64Blackbox.rowHeight), new RoomExit(510, 20.5 * C64Blackbox.rowHeight), room2floorLevels, room2Checkpoint, 0);
        const room3 = new Room(DizzolGame.ROOM3, canvas, "dizzol/3.png", new RoomExit(-5, 350), new RoomExit(530, 20.5 * C64Blackbox.rowHeight), room3floorLevels, emptyCheckpoint, 1);
        const room4 = new Room(DizzolGame.ROOM4, canvas, "dizzol/4.png", null, new RoomExit(530, 350), room4floorLevels, emptyCheckpoint, 0);

        const allRooms = [room1, room2, room3, room4];
        allRooms.forEach(room => room.read());//read = load background without displaying it

        return allRooms;
    }
}

class RoomExit{
    static size = 15;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    contains(sprite){
        const distance = Math.sqrt( (this.x - sprite.x) ** 2 + (this.y - sprite.y) ** 2);
        return distance < RoomExit.size;
    }
}

class Checkpoint extends RoomExit{

    constructor(x, y, sfxEvent){
        super(x,y);
        this.sfxEvent = sfxEvent;
    }

    action(){
         if (this.sfxEvent != null)
            this.sfxEvent.playOnce();
    }

    reset(){
        if (this.sfxEvent != null)
            this.sfxEvent.reset();
    }
}

class SfxEvent{

    constructor(soundPath){
        this.soundPath = soundPath;
        this.active = true;
        this.audio = new Audio(soundPath);
    }

    reset(){
        this.active = true;
    }

    playOnce(){
        if (!this.active){
            return;
        }

        this.audio.play();
        this.active = false;
    }
}
