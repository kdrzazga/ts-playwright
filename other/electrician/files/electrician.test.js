const { Floor, Ladder, Building, PowerLine } = require('./classdef.js');

describe('Floor Class', () => {
    let floor;
    let mockPhysics;

    beforeEach(() => {
        floor = new Floor();
        mockPhysics = {
            add: {
                sprite: jest.fn().mockReturnValue({ x: 0, y: 0 }) // Mock sprite object
            }
        };
        floor.init(mockPhysics);
    });

    test('Floor1: should initialize with the correct ID and level', () => {
        expect(floor.id).toBe(0); // Check initial ID
        expect(floor.floorLevel).toBe(0); // Initial floor level
    });

    test('Floor2: calculateFloorLevel should set floorLevel correctly', () => {
        Floor.COUNT = 3; // Simulate 3 floors created
        floor.calculateFloorLevel();
        expect(floor.floorLevel).toBe(334); // 500 / 3 * 2= ~334
        expect(floor.sprite.y).toBe(floor.floorLevel); // Check that sprite y is set correctly
    });

    test('Floor3: onFloor should return false for y outside of floor boundaries', () => {
        floor.floorLevel = 100;
        Floor.WIDTH = 200; // Setting the width for test
        const result = floor.onFloor(250, 100); // X is outside
        expect(result).toBe(false);
    });

    test('Floor4: onFloor should warn on invalid y argument', () => {
        console.warn = jest.fn(); // Mock console.warn
        floor.onFloor(50, 'invalid');
        expect(console.warn).toHaveBeenCalledWith('Wrong argument');
    });
});

describe('Ladder Class', () => {
    let ladder;
    let mockPhysics;

    beforeEach(() => {
        ladder = new Ladder();
        mockPhysics = {
            add: {
                sprite: jest.fn().mockReturnValue({ x: 0 }) // Mock sprite object
            }
        };
        ladder.init(mockPhysics);
    });

    test('Ladder1: should correctly identify if an x position is on the ladder', () => {
        ladder.sprite.x = 100; // Set the ladder position
        expect(ladder.onLadder(100)).toBe(true); // Exact match
        expect(ladder.onLadder(129)).toBe(true); // Inside
        expect(ladder.onLadder(60)).toBe(false); // Outside
    });
});

describe('Building Class', () => {
    let building;
    let mockPhysics;

    beforeEach(() => {
        mockPhysics = {
            add: {
                sprite: jest.fn().mockReturnValue({ x: 0 })
            }
        };
        building = new Building();
        building.init(3, mockPhysics); // Create a building with 3 floors
    });

    test('Building1: should create floors and ladder correctly', () => {
        expect(building.floors.length).toBe(3);
        expect(building.ladder.sprite.x).toBe(Ladder.WIDTH/2);
    });

    test('Building2: should have a unique wire connecting each pair of consecutive floors', () => {
        const pairsSet = new Set();

        building.wires.forEach((wire) => {
            const floorPair = `${building.floors.indexOf(wire.floor1)}-${building.floors.indexOf(wire.floor2)}`;
            if (pairsSet.has(floorPair)) {

                throw new Error(`Duplicate wire found between floor ${wire.floor1} and floor ${wire.floor2}`);
            } else {
                pairsSet.add(floorPair);
            }
        });

        expect(pairsSet.size).toBe(wires.length);
    });
});

