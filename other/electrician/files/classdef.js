class Floor {
    static COUNT = 0;

    constructor() {
        this.id = Floor.COUNT;
        Floor.COUNT++;
    }
}


class Ladder {
    static WIDTH = 60;

    constructor() {
        this.x = 30;
    }

    onLadder(x1){
        const d = Math.abs(x1 - this.x);
        console.log(`x1 = ${x1} Distance = ${d}`);
        return (d > Ladder.WIDTH);
    }
}

module.exports = { Floor, Ladder};
