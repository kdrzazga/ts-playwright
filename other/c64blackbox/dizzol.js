class Dizzy extends Sprite{

    constructor(canvas){
        super(canvas);
    	this.picPath = "dizzol/jajo.png";
    }
}

class Room{

    constructor(number, picPath){
        this.number = number;
        this.picPath = picPath;
    }
}

class DizzolGame{

    constructor(canvas){
        this.canvas = canvas;
        this.currentRoomId = 1;
        let roomReg = new RoomRegistry();
        this.rooms = roomReg.createRoomSet();

        this.dizzy = new Dizzy(canvas);
    }

    draw(){
        let currentRoom = this.rooms.find(room => room.number === this.currentRoomId);

        let context = this.canvas.getContext('2d');
        let pictureLoader = new PictureLoader(context);
        console.log(currentRoom.number + " " + currentRoom.picPath);
        pictureLoader.load(currentRoom.picPath, 0, 9 * C64Blackbox.rowHeight);

        pictureLoader.load(this.dizzy.picPath, 289, 20.5 * C64Blackbox.rowHeight);
    }


}

class RoomRegistry{

    createRoomSet(){
        const room1 = new Room(1, "dizzol/1.png");
        const room2 = new Room(2, "dizzol/2.png");

        return [room1, room2];
    }
}
