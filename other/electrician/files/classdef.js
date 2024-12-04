class Floor {
    static COUNT = 0;
    static BUILDING_HEIGHT = 500;

    constructor() {
        this.id = Floor.COUNT;
        Floor.COUNT++;
        this.floorLevel = 0;
    }

    calculateFloorLevel(){
        //should be called only after all floors are created
        this.floorLevel = Math.ceil((this.id + 1) * Floor.BUILDING_HEIGHT / (Floor.COUNT + 1));
        console.log(`Floor ${this.id} is on level = ${this.floorLevel}`);
    }
}

class Ladder {
    static WIDTH = 60;

    constructor() {
        this.x = 30;
    }

    onLadder(x1){
        const edge1 = this.x - Ladder.WIDTH /2;
        const edge2 = this.x + Ladder.WIDTH /2;
        return x1 > edge1 && x1 < edge2;
    }
}

class Building {
    constructor(floorCount){
        this.ladder = new Ladder();

       this.floors = [];
       for (let i = 0; i < floorCount; i++) {
           const floor = new Floor();
           this.floors.push(floor);
       }
       this.floors.forEach(f => f.calculateFloorLevel());
    }
}

module.exports = { Floor, Ladder, Building};
