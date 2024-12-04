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
        return (Math.abs(x1 - this.x) > Ladder.WIDTH);
    }
}

module.exports = { Floor, Ladder};
