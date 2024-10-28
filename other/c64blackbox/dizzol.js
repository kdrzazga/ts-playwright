class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/jajo.png";
    	this.picLeftPath = "dizzol/jajo.png";
    	this.picRightPath = "dizzol/jajo.png";
    	this.x = 389;
    	this.y = 20.5 * C64Blackbox.rowHeight;
    }
}

class Room{

    constructor(number, canvas, picPath, leftExit, rightExit, floorLevels){
        this.number = number;
        this.picPath = picPath;
        this.checkpoints = [];
        this.leftExit = leftExit;
        this.rightExit = rightExit;
		this.floorLevels = floorLevels;

        let context = canvas.getContext('2d');
        this.loader = new PictureLoader(context);
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
    }

    draw(){
        this.loader.draw(0, 9 * C64Blackbox.rowHeight);
    }

    addCheckpoint(x, y){
        this.checkpoints.push([x, y]);
    }
	
	getFloorLevel(x) {
        for (let { range, level } of this.floorLevels) {
            if (x >= range[0] && x <= range[1]) {
                return level;
            }
        }
        // Optional: Return null or an error if x is out of the defined ranges
        return null;
    }
}

class DizzolGame{

    constructor(canvas){
        this.canvas = canvas;
        let roomReg = new RoomRegistry();
        this.rooms = roomReg.createRoomSet(canvas);
        this.player = new Dizzy(canvas);

        let context = canvas.getContext('2d');
        this.dizzyPicLoader = new PictureLoader(context);
        this.reset();
    }

    reset(){
        this.active = false;
        this.currentRoomId = 1; //starting room
    }

	activate(){
		this.reset();
		this.active = true;
		console.log("Dizzol Game started.");

        let currentRoom = this.rooms.find(room => room.number === this.currentRoomId);
        currentRoom.load();
        this.dizzyPicLoader.load(this.player.picPath, this.player.x, this.player.y);
	}

    draw(){
        const currentRoom = this.getCurrentRoom();
        currentRoom.draw();
        this.dizzyPicLoader.draw(this.player.x , this.player.y);
    }

    moveFighterLeft(fighter){//fighter only for backward compatibility
        console.log('Dizzy left');
        this.player.moveLeft();
        const currentRoom = this.getCurrentRoom();
        this.player.y = currentRoom.getFloorLevel(this.player.x);
        this.draw();
        this.checkLeftExit();
    }

    moveFighterRight(fighter){//fighter only for backward compatibility
        console.log('Dizzy right');
        this.player.moveRight();
        const currentRoom = this.getCurrentRoom();
        this.player.y = currentRoom.getFloorLevel(this.player.x);
        this.draw();
        this.checkRightExit();
    }

    checkLeftExit(){
        const room = this.getCurrentRoom();
        if (null == room.leftExit){
            console.log("No left exit");
            return;
        }

        if (room.leftExit.contains(this.player)){
            console.log("Player is exiting LEFT.");

            if (this.currentRoomId == 1){
                this.player.x = 500;
                this.currentRoomId = 2;
            }
        }
    }

    checkRightExit(){
        const room = this.getCurrentRoom();
        if (null == room.rightExit){
            console.log("No right exit");
            return;
        }

        if (room.rightExit.contains(this.player)){
            console.log("Player is exiting RIGHT.");
            if (this.currentRoomId == 2){
                this.player.x = 5;
                this.currentRoomId = 1;
            }

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
            { range: [0, 120], level: 419 },
            { range: [121, 280], level: 405 },
            { range: [281, 310], level: 410 },
            { range: [311, 379], level: 412 },
            { range: [308, Infinity], level: 415 }
        ];
		
        const room1 = new Room(1, canvas, "dizzol/1.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), null, room1floorLevels);
        room1.addCheckpoint(10, 300);
        room1.read();
        const room2 = new Room(2, canvas, "dizzol/2.png", new RoomExit(100, 20.5 * C64Blackbox.rowHeight), new RoomExit(500, 20.5 * C64Blackbox.rowHeight), room2floorLevels);
        room2.read();

        return [room1, room2];
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
