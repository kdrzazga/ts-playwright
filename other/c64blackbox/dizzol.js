class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/jajo.png";
    	this.picLeftPath = "dizzol/jajo.png";
    	this.picRightPath = "dizzol/jajo.png";
    	this.x = 289;
    }
}

class Room{

    constructor(number, picPath){
        this.number = number;
        this.picPath = picPath;
        this.checkpoints = [];
    }

    addCheckpoint(x, y){
        this.checkpoints.push([x, y]);
    }
}

class DizzolGame{

    constructor(canvas){
        this.canvas = canvas;
        let roomReg = new RoomRegistry();
        this.rooms = roomReg.createRoomSet();
        this.player = new Dizzy(canvas);

        let context = this.canvas.getContext('2d');
        this.bkgndPicLoader = new PictureLoader(context);
        this.dizzyPicLoader = new PictureLoader(context);
        this.reset();
    }

    reset(){
        this.active = false;
        this.currentRoomId = 2;
    }

	activate(){
		this.reset();
		this.active = true;
		console.log("Dizzol Game started.");

        let currentRoom = this.rooms.find(room => room.number === this.currentRoomId);
        console.log(currentRoom.number + " " + currentRoom.picPath);
        this.bkgndPicLoader.load(currentRoom.picPath, 0, 9 * C64Blackbox.rowHeight);
        this.dizzyPicLoader.load(this.player.picPath, 289, 20.5 * C64Blackbox.rowHeight);
	}

    draw(){
        this.bkgndPicLoader.draw(0, 9 * C64Blackbox.rowHeight);
        this.dizzyPicLoader.draw(this.player.x , 20.5 * C64Blackbox.rowHeight);
    }

    moveFighterLeft(fighter){
        console.log('Dizzy left');
        this.player.moveLeft();
        this.draw();
    }

    moveFighterRight(fighter){
        console.log('Dizzy right');
        this.player.moveRight();
        this.draw();
    }

}

class RoomRegistry{

    createRoomSet(){
        const room1 = new Room(1, "dizzol/1.png");
        room1.addCheckpoint(10, 300);
        const room2 = new Room(2, "dizzol/2.png");

        return [room1, room2];
    }
}
