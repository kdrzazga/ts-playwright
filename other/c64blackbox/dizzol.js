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

    constructor(number, canvas, picPath, leftExit, rightExit){
        this.number = number;
        this.picPath = picPath;
        this.checkpoints = [];
        this.leftExit = leftExit;
        this.rightExit = rightExit;

        let context = canvas.getContext('2d');
        this.loader = new PictureLoader(context);
    }

    load(){
        this.loader.fileName = this.picPath;
        this.loader.read().then(texture => {
            this.loader.texture = texture;
                this.draw();
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
        this.currentRoomId = 1;
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
        let currentRoom = this.getCurrentRoom();
        currentRoom.draw();
        this.dizzyPicLoader.draw(this.player.x , this.player.y);
    }

    moveFighterLeft(fighter){//fighter only for backward compatibility
        console.log('Dizzy left');
        this.player.moveLeft();
        this.draw();
        this.checkLeftExit();
    }

    moveFighterRight(fighter){//fighter only for backward compatibility
        console.log('Dizzy right');
        this.player.moveRight();
        this.draw();
        this.checkRightExit();
    }

    checkLeftExit(){
        let room = this.getCurrentRoom();
        if (null == room.leftExit){
            console.log("No left exit");
            return;
        }

        if (room.leftExit.contains(this.player)){
            console.log("Player is exiting LEFT.");

            if (this.currentRoomId == 1){
                this.player.x = 500;
                /*
                TODO
                this.activate();
                this.currentRoomId = 2;
                */
            }
        }
    }

    checkRightExit(){
        let room = this.getCurrentRoom();
        if (null == room.rightExit){
            console.log("No right exit");
            return;
        }

        if (room.rightExit.contains(this.player)){
            console.log("Player is exiting RIGHT.");
        }
    }

    getCurrentRoom(){
        return this.rooms.find(room => room.number === this.currentRoomId);
    }
}

class RoomRegistry{

    createRoomSet(canvas){
        const room1 = new Room(1, canvas, "dizzol/1.png", new RoomExit(-5, 20.5 * C64Blackbox.rowHeight), null);
        room1.addCheckpoint(10, 300);
        const room2 = new Room(2, canvas, "dizzol/2.png", new RoomExit(100, 20.5 * C64Blackbox.rowHeight), new RoomExit(230, 20.5 * C64Blackbox.rowHeight));

        return [room1, room2];
    }
}

class RoomExit{
    static size = 15;

    constructor(x, y){
        this.none = false;
        this.x = x;
        this.y = y;
    }

    contains(sprite){
        let distance = Math.sqrt( (this.x - sprite.x) ** 2 + (this.y - sprite.y) ** 2);
        return distance < RoomExit.size;
    }
}
