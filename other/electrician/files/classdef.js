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
