const { Floor, Ladder } = require('./classdef');

describe('Floor Class', () => {
    beforeEach(() => {
        Floor.COUNT = 0; // Reset the static COUNT before each test
    });

    test('should create a Floor instance with a unique id', () => {
        const floor1 = new Floor();
        const floor2 = new Floor();

        expect(floor1.id).toBe(0);
        expect(floor2.id).toBe(1);
    });

    test('should increment the static COUNT correctly', () => {
        const floor1 = new Floor();
        const floor2 = new Floor();
        const floor3 = new Floor();

        expect(Floor.COUNT).toBe(3);
    });
});

describe('Ladder Class', () => {
    let ladder;

    beforeEach(() => {
       ladder = new Ladder();
    });

    test('should be initialized with correct x position', () => {
        expect(ladder.x).toBe(30);
    });

    test('should report if a given x position is on the ladder', () => {
        expect(ladder.onLadder(0)).toBe(false); // Outside WIDTH (30 - 60)
        expect(ladder.onLadder(100)).toBe(false); // Outside WIDTH (30 + 60)
        expect(ladder.onLadder(30)).toBe(true); // Exact position
        expect(ladder.onLadder(45)).toBe(true); // Within WIDTH (30 + 30)
    });

    test('should correctly handle different x positions for being on the ladder', () => {
        expect(ladder.onLadder(90)).toBe(false); // Way outside
        expect(ladder.onLadder(29)).toBe(true); // Just inside
        expect(ladder.onLadder(31)).toBe(true); // Just inside
    });
});
