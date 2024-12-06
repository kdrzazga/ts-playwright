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
        this.sprite = physics.add.sprite(800/2 + Ladder.WIDTH/2 + 20, 600/this.id, 'floor' + this.id)
    }

    calculateFloorLevel(){
        //should be called only after all floors are created
        this.floorLevel = Math.ceil((this.id + 1) * Floor.BUILDING_HEIGHT / (Floor.COUNT)) - Floor.HEIGHT;
        this.sprite.y = this.floorLevel + Floor.HEIGHT;
        console.log(`Floor ${this.id} is on level = ${this.floorLevel}`);
    }

    onFloor(y) {
        if (typeof y !== 'number')
            console.warn('Wrong argument'); //defensive programming makes sense in this particular place

        const tolerance = this.floorLevel * 0.05;
        const lowerBound = this.floorLevel;
        const upperBound = this.floorLevel + tolerance;
        return y >= lowerBound && y <= upperBound;
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

       this.floors = [];
       for (let i = 0; i < floorCount; i++) {
           const floor = new Floor();
           floor.init(physics);

           this.floors.push(floor);
       }
       this.floors.forEach(f => f.calculateFloorLevel());
    }
}

module.exports = { Floor, Ladder, Building};
