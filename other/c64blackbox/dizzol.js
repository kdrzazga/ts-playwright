class Garlic extends Sprite{
    static PATH = "dizzol/garlic.png";

    constructor(canvas,x, y){
        super(canvas);
        this.name = 'garlic';
        this.picPath = Garlic.PATH;
        this.picLeftPath = Garlic.PATH;
        this.picRightPath = Garlic.PATH;
        this.x = x;
        this.y = y;
    }
}

class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/jajoL.png";
    	this.picLeftPath = "dizzol/jajoL.png";
    	this.picRightPath = "dizzol/jajoR.png";
    	this.x = 450;
    	this.y = 409;
    	this.inventory = [];
    }
}

class Bat extends Sprite{

    constructor(canvas, y, speed){
        super(canvas);
    	this.picPath = "dizzol/bat.png";
    	this.picLeftPath = "dizzol/bat.png";
    	this.picRightPath = "dizzol/bat.png";
    	this.x = 100;
    	this.y = y;
    	this.speed = speed;
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
        this.garlicLoader = new PictureLoader(context);
        this.bats = [];
        this.items = [];

        for(let i = 0; i < batsCount; i++){
            const bat = new Bat(canvas, 260 + 39*i, 2 + i);
            this.bats.push(bat);
            this.bats[0].x = 326;
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

        if (this.bats.length > 0 ){
            this.enemyLoader.fileName = this.bats[0].picPath;
            this.enemyLoader.read().then(texture => {
                this.enemyLoader.texture = texture;
            }).catch(error => {
                console.error('Failed to load bat picture:', error);
            });
        }

        this.garlicLoader.fileName = Garlic.PATH;
        this.garlicLoader.read().then(texture => {
            this.garlicLoader.texture = texture;
        }).catch(error => {
            console.error('Failed to load garlic picture:', error);
        });
    }

    draw(){
        this.loader.draw(0, 9 * C64Blackbox.rowHeight);
    }

    drawEnemies(){
       this.bats.forEach(bat => this.enemyLoader.draw(bat.x, bat.y));
    }

    drawItems(){
        let garlics = this.items.filter(i => 'garlic' === i.name);
        garlics.forEach(item => this.garlicLoader.draw(item.x, item.y));
    }

    animate(){
        if (this.bats.length > 0){

            this.bats.forEach(b => b.move());
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

    addItemOnFloor(item){
        let x = item.x;
        item.y = this.getFloorLevel(x) + this.garlicLoader.context.height;
        this.items.push(item);
    }
}

class DizzolGame{

    static ROOM1 = 1;
    static ROOM2 = 2;
    static ROOM3 = 3;
    static ROOM4 = 4;
    static ROOM5 = 5;
    static ROOM6 = 6;
    static ROOM7 = 7;
    static ROOM8 = 8;
    static ROOM9 = 9;
    static NO_ROOM = 999999999;

    static roomTransitionsLeft = {
                [DizzolGame.ROOM1]: {nextRoom: DizzolGame.ROOM2, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM2]: {nextRoom: DizzolGame.ROOM3, resetCheckpoint: true, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM3]: {nextRoom: DizzolGame.ROOM4, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM4]: {nextRoom: DizzolGame.ROOM5, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM5]: {nextRoom: DizzolGame.ROOM6, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM6]: {nextRoom: DizzolGame.ROOM7, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM7]: {nextRoom: DizzolGame.ROOM8, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM8]: {nextRoom: DizzolGame.ROOM9, resetCheckpoint: false, nextRoomPlayerPos: 500},
                [DizzolGame.ROOM9]: {nextRoom: DizzolGame.ROOM1, resetCheckpoint: false, nextRoomPlayerPos: 500}
            };

    static roomTransitionsRight = {
                [DizzolGame.ROOM1]: {nextRoom: DizzolGame.NO_ROOM, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM2]: {nextRoom: DizzolGame.ROOM1, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM3]: {nextRoom: DizzolGame.ROOM2, nextRoomPlayerPos: 100},
                [DizzolGame.ROOM4]: {nextRoom: DizzolGame.ROOM3, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM5]: {nextRoom: DizzolGame.ROOM4, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM6]: {nextRoom: DizzolGame.ROOM5, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM7]: {nextRoom: DizzolGame.ROOM6, resetCheckpoint: true, nextRoomPlayerPos: 70},
                [DizzolGame.ROOM8]: {nextRoom: DizzolGame.ROOM7, resetCheckpoint: true, nextRoomPlayerPos: 5},
                [DizzolGame.ROOM9]: {nextRoom: DizzolGame.ROOM8, resetCheckpoint: true, nextRoomPlayerPos: 5}
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
        }, 16);
    }

    draw(){
        const currentRoom = this.getCurrentRoom();
        currentRoom.draw();
        currentRoom.drawEnemies();
        this.player.draw();
        currentRoom.drawItems();
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
            { range: [0, 128], level: 425 },
            { range: [129, 200], level: 428 },
            { range: [201, 260], level: 418 },
            { range: [261, 314], level: 410 },
            { range: [311, 379], level: 412 },
            { range: [308, Infinity], level: 415 }
        ];

		const room3floorLevels = [
            { range: [0, 145], level: 362 },
            { range: [146, 175], level: 368 },
            { range: [176, 190], level: 375 },
            { range: [191, 260], level: 380 },
            { range: [261, 290], level: 390 },
            { range: [291, 379], level: 400 },
            { range: [308, Infinity], level: 420 }
        ];

        const room4floorLevels = [
            { range: [-Infinity, 120], level: 420 },
            { range: [121, 200], level: 410 },
            { range: [200, 270], level: 400 },
            { range: [271, 300], level: 390 },
            { range: [301, 369], level: 380 },
            { range: [370, 400], level: 370 },
            { range: [401, 490], level: 365 },
            { range: [491, Infinity], level: 355 }
        ];

        const room67floorLevels = [
            { range: [-Infinity, 120], level: 431 },
            { range: [121, 150], level: 439 },
            { range: [151, 270], level: 446 },
            { range: [238, Infinity], level: 425 }
        ];
        const exit67Left = new RoomExit(-5, 431);
        const exit6Left = new RoomExit(70, 431);
        const exit67Right = new RoomExit(530, 425);

        const room1Sfx = new SfxEvent("dizzol/huu.mp3");
        const room1Checkpoint = new Checkpoint(310, 411, room1Sfx);
        const room2Sfx = new SfxEvent("dizzol/totem.mp3");
        const room2Checkpoint = new Checkpoint(315, 411, room2Sfx);

        const emptyCheckpoint = new Checkpoint(0, 0, null);

        const room1 = new Room(DizzolGame.ROOM1, canvas, "dizzol/1.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), null, room1floorLevels, room1Checkpoint, 0);
        const garlic11 = new Garlic(canvas, 500, 300);
        const garlic12 = new Garlic(canvas, 400, 300);
        room1.addItemOnFloor(garlic11);
        room1.addItemOnFloor(garlic12);

        const room2 = new Room(DizzolGame.ROOM2, canvas, "dizzol/2.png", new RoomExit(100, 428), new RoomExit(510, 20.5 * C64Blackbox.rowHeight), room2floorLevels, room2Checkpoint, 0);
        const garlic21 = new Garlic(canvas, 500, 300);
        room2.addItemOnFloor(garlic21);

        const room3 = new Room(DizzolGame.ROOM3, canvas, "dizzol/3.png", new RoomExit(-5, 350), new RoomExit(530, 20.5 * C64Blackbox.rowHeight), room3floorLevels, emptyCheckpoint, 1);
        const room4 = new Room(DizzolGame.ROOM4, canvas, "dizzol/4.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), new RoomExit(530, 350), room4floorLevels, emptyCheckpoint, 0);
        const room5 = new Room(DizzolGame.ROOM5, canvas, "dizzol/5.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), new RoomExit(510, 20.5 * C64Blackbox.rowHeight), room1floorLevels, emptyCheckpoint, 3);
        const room6 = new Room(DizzolGame.ROOM6, canvas, "dizzol/6.png", exit6Left, exit67Right, room67floorLevels, emptyCheckpoint, 1);
        const room7 = new Room(DizzolGame.ROOM7, canvas, "dizzol/7.png", exit67Left, exit67Right, room67floorLevels, room2Checkpoint, 0);
        const room8 = new Room(DizzolGame.ROOM8, canvas, "dizzol/8.png", exit67Left, exit67Right, room67floorLevels, emptyCheckpoint, 0);
        const room9 = new Room(DizzolGame.ROOM9, canvas, "dizzol/8.png", exit67Left, exit67Right, room67floorLevels, emptyCheckpoint, 0);
        room6.bats[0].y += 80;

        const allRooms = [room1, room2, room3, room4, room5, room6, room7, room8, room9];
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
