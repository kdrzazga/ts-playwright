class Floor {
    static COUNT = 0;
    static BUILDING_HEIGHT = 500;
    static WIDTH;
    static HEIGHT;

    constructor() {
        this.id = Floor.COUNT;
        Floor.COUNT++;
        this.floorLevel = 0;
    }

    init(physics){
        this.sprite = physics.add.sprite(800/2 + Ladder.WIDTH/2 - 20, 600/this.id, 'floor' + this.id)
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

        const lowerBoundX = this.sprite.x - Floor.WIDTH/2;
        const upperBoundX = lowerBoundX + Floor.WIDTH;
        return x > lowerBoundX && x < upperBoundX  && y >= lowerBoundY && y <= upperBoundY;
    }

}

class Ladder {
    static WIDTH = 60;

    constructor() {
    }

    init(physics){
        this.sprite = physics.add.sprite(Ladder.WIDTH/2, 600/2, 'ladder');
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

       for (let w = 0; w < floorCount - 1; w++){
            const wire = new Wire(physics, this.floors[w], this.floors[w+1]);
            this.wires.push(wire);
       }

       this.leftPowerLine = new PowerLine();
       this.leftPowerLine.init(physics, 'left');
       this.rightPowerLine = new PowerLine();
       this.rightPowerLine.init(physics, 'right');

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
        this.wires[0].place(player.x, player.y);
    }
}

class PowerLine {
    init(physics, type){
        const objectName = 'power-line-' + type;
        const x = type === 'left' ? Ladder.WIDTH + 30 : Ladder.WIDTH + Floor.WIDTH + 60;
        this.sprite = physics.add.sprite(x, 600/2, objectName);
    }
}

class Wire {//connects PowerLine to Floor

    constructor(physics, floor1, floor2){
        this.physics = physics;
        const y2 = floor2 == null ? 0 : floor2.sprite.y;
        this.x = floor1.sprite.x;
        this.y = (floor1.sprite.y + y2) / 2;

        this.fields = [];
        this.sprites = [];
        for (var i = 0; i < 40; i++){
            this.fields.push(false);
        }
    }

    place(spriteX, spriteY){
        this.physics.add.sprite(spriteX, this.y, 'wire-section');
    }
}

module.exports = { Floor, Ladder, Building, PowerLine, Wire};
