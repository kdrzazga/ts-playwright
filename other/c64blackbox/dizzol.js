class Garlic extends Sprite{
    static PATH = "dizzol/garlic.png";

    constructor(canvas,x, y){
        super(canvas, x, y);
        this.name = 'garlic';
        this.picPath = Garlic.PATH;
        this.picLeftPath = Garlic.PATH;
        this.picRightPath = Garlic.PATH;
    }
}

class Vodka extends Sprite{
    static PATH = "dizzol/vodka.png";

    constructor(canvas,x, y){
        super(canvas, x, y);
        this.name = 'vodka';
        this.picPath = Vodka.PATH;
        this.picLeftPath = Vodka.PATH;
        this.picRightPath = Vodka.PATH;
    }
}

class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas, 450, 409);
    	this.picPath = "dizzol/jajoL.png";
    	this.picLeftPath = "dizzol/jajoL.png";
    	this.picRightPath = "dizzol/jajoR.png";
    	this.inventory = [new Vodka()];
    }
}

class Bat extends Sprite{

    constructor(canvas, y, speed){
        super(canvas, 100, y);
    	this.picPath = "dizzol/bat.png";
    	this.picLeftPath = "dizzol/bat.png";
    	this.picRightPath = "dizzol/bat.png";
    	this.speed = speed;
    }

    move() {
        if (this.hp <= 0)
            return;

        this.x += this.speed;
        const minX = 70;
        const maxX = 330;
        const halfWay = (minX + maxX) /2;
        this.y += this.x > halfWay ? 1.3 : -1.3;
        if (this.y <= 9 * C64Blackbox.rowHeight+ this.speed){
            this.y = 9 * C64Blackbox.rowHeight + 2 * this.speed;
        }
        if (this.x > maxX || this.x < minX) {
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

        this.context = canvas.getContext('2d');
        this.loader = new PictureLoader(this.context);
        this.enemyLoader = new PictureLoader(this.context);
        this.garlicLoader = new PictureLoader(this.context);
        this.bats = [];
        this.items = [];
        this.info = '';

        for(let i = 0; i < batsCount; i++){
            const bat = new Bat(canvas, 291 + 39*i, 2 + i);
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
        this.writeRoomInfo();
    }

    writeRoomInfo(){
        this.writeUpperInfo(this.info);
    }

    writeUpperInfo(text){
        const rowHeight = C64Blackbox.rowHeight;
        const cursor = this.c64Blackbox.cursor;
        const y = (2 + 3 * 2) * rowHeight;
        const x = 2*rowHeight;
        this.context.fillStyle = cursor.backgroundColor;
        this.context.fillRect(x - 2, y - rowHeight + 2, 39*cursor.size + 4, cursor.size + 8);
        this.context.fillStyle = cursor.color;
        this.context.fillText(text, x, y);
    }

    drawEnemies(){
       this.bats.filter(enemy => enemy.hp>0).forEach(bat => this.enemyLoader.draw(bat.x, bat.y));
    }

    drawItems(){
        let garlics = this.items.filter(i => 'garlic' === i.name);
        garlics.forEach(item => this.garlicLoader.draw(item.x, item.y));
    }

    animate(){
        if (this.bats.length > 0){

            this.bats.forEach(b => b.move());
            this.draw();
            this.drawItems();
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
        item.y = this.getFloorLevel(x) + 27;
        this.items.push(item);
    }

    setInfo(info){
        this.info = info;
    }

    setC64Blackbox(c64Blackbox){
        this.c64Blackbox = c64Blackbox;
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


    constructor(canvas, c64Blackbox){
        this.canvas = canvas;
        let roomReg = new RoomRegistry();
        this.rooms = roomReg.createRoomSet(canvas, c64Blackbox);
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

        let currentRoom = this.getCurrentRoom();
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

    handleFirePressed() {
        console.log('FIRE !');

        const currentRoom = this.getCurrentRoom();

        currentRoom.writeUpperInfo("You picked " + this.pickGarlic());

        new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        }).then(() => {
            let inventoryInfo = "Inventory: ";
            this.player.inventory.forEach(item => {
                inventoryInfo += (item.name + " ");
            });
            console.log(inventoryInfo);
            currentRoom.writeUpperInfo(inventoryInfo);

            return new Promise((resolve2) => {
                setTimeout(() => {
                    resolve2();
                }, 1000);
            });
        }).then(() => {
            currentRoom.writeRoomInfo();
        });
    }

    pickGarlic(){
        let result = "nothing";
        const room = this.getCurrentRoom();
        const itemsShallowCopy = [...room.items];

        itemsShallowCopy.forEach(item =>{
            console.log("item at " + item.x + " player at " + this.player.x);
            if (item.collide(this.player)){
                console.log("Grabbing " + item.name);
                room.items = room.items.filter(i => i !== item);
                this.player.inventory.push(item);
                result = 'garlic';
            }
        })
        return result;
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

    createRoomSet(canvas, c64Blackbox){
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
        room1.setInfo("1. SCULPTURE");
        const garlic11 = new Garlic(canvas, 500, 300);
        const garlic12 = new Garlic(canvas, 400, 300);
        room1.addItemOnFloor(garlic11);
        room1.addItemOnFloor(garlic12);

        const room2 = new Room(DizzolGame.ROOM2, canvas, "dizzol/2.png", new RoomExit(100, 428), new RoomExit(510, 20.5 * C64Blackbox.rowHeight), room2floorLevels, room2Checkpoint, 0);
        room2.setInfo("2. TOTEM");
        const garlic21 = new Garlic(canvas, 500, 300);
        room2.addItemOnFloor(garlic21);

        const room3 = new Room(DizzolGame.ROOM3, canvas, "dizzol/3.png", new RoomExit(-5, 350), new RoomExit(530, 20.5 * C64Blackbox.rowHeight), room3floorLevels, emptyCheckpoint, 1);
        room3.setInfo("3. BAT CAVE ENTRANCE");
        const room4 = new Room(DizzolGame.ROOM4, canvas, "dizzol/4.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), new RoomExit(530, 350), room4floorLevels, emptyCheckpoint, 0);
        room4.setInfo("4. ANCIENT DRAWINGS");
        const room5 = new Room(DizzolGame.ROOM5, canvas, "dizzol/5.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), new RoomExit(510, 20.5 * C64Blackbox.rowHeight), room1floorLevels, emptyCheckpoint, 3);
        room5.setInfo("5. MAIN BAT LAIR");
        const room6 = new Room(DizzolGame.ROOM6, canvas, "dizzol/6.png", exit6Left, exit67Right, room67floorLevels, emptyCheckpoint, 1);
        room6.setInfo("6. BAT CAVE EXIT");
        const room7 = new Room(DizzolGame.ROOM7, canvas, "dizzol/7.png", exit67Left, exit67Right, room67floorLevels, room2Checkpoint, 0);
        room7.setInfo("7. TWO TOTEMS");
        const room8 = new Room(DizzolGame.ROOM8, canvas, "dizzol/8.png", exit67Left, exit67Right, room67floorLevels, emptyCheckpoint, 0);
        room8.setInfo("8.");
        const room9 = new Room(DizzolGame.ROOM9, canvas, "dizzol/8.png", exit67Left, exit67Right, room67floorLevels, emptyCheckpoint, 0);
        room9.setInfo("9.");

        room6.bats[0].y += 80;

        const allRooms = [room1, room2, room3, room4, room5, room6, room7, room8, room9];
        allRooms.forEach(room => {
            room.read();//read = load background without displaying it
            room.setC64Blackbox(c64Blackbox);
        });

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
