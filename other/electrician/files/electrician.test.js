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

    test('should initialize with the correct ID and level', () => {
        expect(floor.id).toBe(0); // Check initial ID
        expect(floor.floorLevel).toBe(0); // Initial floor level
    });

    test('calculateFloorLevel should set floorLevel correctly', () => {
        Floor.COUNT = 3; // Simulate 3 floors created
        floor.calculateFloorLevel();
        expect(floor.floorLevel).toBe(334); // 500 / 3 * 2= ~334
        expect(floor.sprite.y).toBe(floor.floorLevel); // Check that sprite y is set correctly
    });

    test('onFloor should return false for y outside of floor boundaries', () => {
        floor.floorLevel = 100;
        Floor.WIDTH = 200; // Setting the width for test
        const result = floor.onFloor(250, 100); // X is outside
        expect(result).toBe(false);
    });

    test('onFloor should warn on invalid y argument', () => {
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

    test('should correctly identify if an x position is on the ladder', () => {
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
                sprite: jest.fn().mockReturnValue({ x: 0 }) // Mock sprite object
            }
        };
        building = new Building();
        building.init(3, mockPhysics); // Create a building with 3 floors
    });

    test('should create floors and ladder correctly', () => {
        expect(building.floors.length).toBe(3); // Should create 3 floors
        expect(building.ladder).toBeInstanceOf(Ladder); // Ensure ladder is present
    });
});

