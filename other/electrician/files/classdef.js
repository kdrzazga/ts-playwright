class Constants{
    static SCREEN_WIDTH = 800;
    static SCREEN_HEIGHT = 600;
}

class Floor {
    static COUNT = 0;
    static BUILDING_HEIGHT = Constants.SCREEN_HEIGHT - 100;
    static WIDTH;
    static HEIGHT;

    constructor() {
        this.id = Floor.COUNT;
        Floor.COUNT++;
        this.floorLevel = 0;
    }

    init(physics){
        this.sprite = physics.add.sprite(Constants.SCREEN_WIDTH/2 + Ladder.WIDTH/2 - 20, Constants.SCREEN_HEIGHT/this.id, 'floor' + this.id)
    }

    calculateFloorLevel(){
        //should be called only after all floors are created
        this.floorLevel = Math.ceil((this.id + 1) * Floor.BUILDING_HEIGHT / (Floor.COUNT));
        this.sprite.y = this.floorLevel;
        console.log(`Floor ${this.id} is on level = ${this.floorLevel}`);
    }

    onFloor(x, y) {
        y += Floor.HEIGHT - 30;
        if (typeof y !== 'number')
            console.warn('Wrong argument'); //defensive programming makes sense in this particular place

        const tolerance = this.floorLevel * 0.05;
        const lowerBoundY = this.floorLevel;
        const upperBoundY = this.floorLevel + tolerance;

        const lowerBoundX = this.getLeftPosition();
        const upperBoundX = lowerBoundX + Floor.WIDTH;
        return x > lowerBoundX && x < upperBoundX  && y >= lowerBoundY && y <= upperBoundY;
    }

    getLeftPosition(){
        return this.sprite.x - Floor.WIDTH/2;
    }

}

class Ladder {
    static WIDTH = 60;

    constructor() {
    }

    init(physics){
        this.sprite = physics.add.sprite(Ladder.WIDTH/2, Constants.SCREEN_HEIGHT/2, 'ladder');
    }

    onLadder(x1){
        const edge1 = this.sprite.x - Ladder.WIDTH /2;
        const edge2 = this.sprite.x + Ladder.WIDTH /2;
        return x1 > edge1 && x1 < edge2;
    }

}

class Building {
    init(floorCount, physics){
       this.ladder = new Ladder();
       this.ladder.init(physics);

       this.floors = [];
       this.wires = [];
       for (let i = 0; i < floorCount; i++) {
           const floor = new Floor();
           this.floors.push(floor);
       }

       this.floors.forEach(f => {
            f.init(physics);
            f.calculateFloorLevel();
       });

       for (let w = 0; w < floorCount; w++) {
            const aboveFloor = this.floors[w] || null;
            const belowFloor = this.floors[w - 1] || null;
            const wire = new Wire(w, physics, belowFloor, aboveFloor);
            this.wires.push(wire);
       }

       this.createWireInfoToInfoFrame();

       this.leftPowerLine = new PowerLine();
       this.leftPowerLine.init(physics, 'left');
       this.rightPowerLine = new PowerLine();
       this.rightPowerLine.init(physics, 'right');
    }

    createWireInfoToInfoFrame(){
        const infoFrameWebElement = document.getElementById('connection-status');
        for (let i = 0; i < this.wires.length; i++) {
            let wireDiv = document.createElement('div');
            wireDiv.name = 'wire-info';
            wireDiv.id = 'wire' + i;
            wireDiv.style = 'font-size: 1em; color: yellow;';
            wireDiv.innerText = 'no power';
            infoFrameWebElement.appendChild(wireDiv);
        }
    }

    getCurrentFloor(player){
        if (player == null)
            return -1;

        const floorLevels = this.floors.map(floor => floor.floorLevel);
        for (let f = 0; f < floorLevels.length; f++){
            const tolerance = 50;
            if (Math.abs(Math.abs(floorLevels[f] - player.y) - 28) < tolerance)
                return f;
        }

        return -1;
    }

    drawWire(player){
        const currentFloorNumber = this.getCurrentFloor(player);
        if (currentFloorNumber < 0)
            return;

        const currentFloor = this.floors[currentFloorNumber];

        if (currentFloor.onFloor(player.x, player.y)){
            console.log(`Draw wire over floor ${currentFloorNumber}`);
            this.wires[currentFloorNumber].place(currentFloor, player);
        }
    }
}

class PowerLine {
    init(physics, type){
        const objectName = 'power-line-' + type;
        const x = type === 'left' ? Ladder.WIDTH + 30 : Ladder.WIDTH + Floor.WIDTH + 60;
        this.sprite = physics.add.sprite(x, Constants.SCREEN_HEIGHT/2, objectName);
    }
}

class Wire {//connects PowerLine to Floor
    static SIZE = 20;

    constructor(id, physics, floor1, floor2){
        this.id = id;
        this.physics = physics;
        const y2 = floor2 == null ? 0 : floor2.sprite.y;
        const y1 = floor1 == null ? 0 : floor1.sprite.y;
        this.x = floor1 ? floor1.sprite.x : 0;
        this.y = (y1 + y2) / 2;

        this.slots = [];
        this.sprites = [];
        for (var i = 0; i < Floor.WIDTH/Wire.SIZE; i++){
            this.slots.push(false);
        }
        console.log(`Created ${this.slots.length} wire slots in wire.`);
    }

    place(floor, sprite){
        const extraInfoDiv = document.getElementById('extra-info');
        extraInfoDiv.innerText = floor.id + " " + floor.floorLevel ;
        const y = this.y;

        const index = Math.floor((sprite.x - floor.getLeftPosition()) / Wire.SIZE);

        if (!this.slots[index]){
            const x = floor.getLeftPosition() + index * Wire.SIZE;
            this.slots[index] = true;
            this.physics.add.sprite(x, y, 'wire-section');
            console.log(`Placing wire: [${x}, ${y}]. Index = ${index}`);
            this.updateWiringInfo();
        }
    }

    updateWiringInfo(){
        const total = this.slots.length;
        const trueSlots = this.slots.filter(field => field);
        const wireDiv = document.getElementById('wire' + this.id);
        const percentage = Math.ceil(trueSlots.length / total * 100);
        const statusText = percentage == 100 ? 'CONNECTED' : "" + percentage + " %";
        wireDiv.innerText = statusText;
    }
}

module.exports = { Constants, Floor, Ladder, Building, PowerLine, Wire};
