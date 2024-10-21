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

    constructor(){
        this.currentRoomId = 1;
        this.rooms = new RoomRegistry().createRoomSet();
    }

}

class RoomRegistry{
    createRoomSet(){
        const room1 = new Room(1, "dizzol/1.png");
        const room2 = new Room(2, "dizzol/2.png");

        return [room1, room2];
    }
}