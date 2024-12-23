class Creator {

    static LOW_FLOOR_LEVEL = 438;
    static HIGH_FLOOR_LEVEL = 104;

    static create3storeBuilding(physics) {
       let building = new Building();
       building.init(physics); // Initializes ladder and power lines

       const floorBuilder1 = new FloorBuilder();
       building.floors.push(floorBuilder1.withName('attic').withBottomConnector(3).withBottomConnector(11)
           .withCeilingConnector(5).withCeilingConnector(25).withBottomConnector(28).build());

       const floorBuilder2 = new FloorBuilder();
       building.floors.push(floorBuilder2.withName('living room').withCeilingConnector(2).withCeilingConnector(29)
           .withLampInCenter().withTVInCenterLeft().build());

       const kitchenBuilder = new FloorBuilder();
       building.floors.push(kitchenBuilder.withName('kitchen').withFridgeOnLeft().withLampInCenter().withKitchenSegmentOnRight().build());

       building.floors.forEach(floor => floor.init(physics));
       building.floors.forEach(floor => floor.calculateFloorLevel());

       const connectionPointsCounts = [2, 6, 5];
       building.wires = building.floors.map((floor, index) => {
           const aboveFloor = building.floors[index] || null;
           const belowFloor = building.floors[index - 1] || null;
           return new Wire(index, physics, belowFloor, aboveFloor, connectionPointsCounts[index]);
       });

        building.includeWiresInInfoFrame();
        const MID_FLOOR_LEVEL = 328 - Floor.HEIGHT / 2;

        const ratsData = [
            { id: 1, active: true, y: Building.GROUND_FLOOR_LEVEL },
            { id: 2, active: true, y: Building.GROUND_FLOOR_LEVEL, minX:  Floor.WIDTH / 2, maxX: 2 * Floor.WIDTH / 3, velocity: { x : 3} },
            { id: 3, active: true, y: Building.GROUND_FLOOR_LEVEL, velocity: { x: 1.4 } },
            { id: 4, active: true, y: Creator.LOW_FLOOR_LEVEL, velocity: { x: 0.7 }, wireId: 2},
            { id: 5, active: true, y: MID_FLOOR_LEVEL, minX: 2 * Floor.WIDTH / 4, maxX: 1.15*Floor.WIDTH, velocity: { x: 1.4 }, wireId: 1 },
            { id: 6, active: true, y: MID_FLOOR_LEVEL, minX: 2 * Ladder.WIDTH, velocity: { x: 0.85}, wireId: 1 },
            { id: 7, active: true, y: Creator.HIGH_FLOOR_LEVEL, minX: Floor.WIDTH / 3 + 30, maxX: 1.15*Floor.WIDTH, wireId: 0 }
        ];

        const batsData = [
            { id: 0, active: true, speed: -0.017 },
            { id: 1, active: true, currentAngle: Math.PI / 2, /*speed: 0.001*/ }
        ];

        const createEnemy = (EnemyClass, data, physics, positionAdjustment = 0) => {
            const enemy = new EnemyClass(data.id);
            enemy.active = data.active;
            const y = EnemyClass === Rat ? data.y : 555 + 7 * data.id + positionAdjustment;
            enemy.init(physics, y);

            Object.assign(enemy, {
                minX: data.minX || enemy.minX,
                maxX: data.maxX || enemy.maxX,
                angularSpeed: data.speed || enemy.angularSpeed,
                currentAngle: data.currentAngle || enemy.currentAngle,
                wireId: EnemyClass === Rat ? data.wireId : undefined
            });

            if (EnemyClass === Bat) {
                enemy.centerX = Constants.SCREEN_WIDTH / 2 + 50 - 39 * data.id;
            }

            if (data.velocity) enemy.sprite.velocity = data.velocity;

            return enemy;
        };

        const rats = ratsData.map(data => createEnemy(Rat, data, physics));
        const bats = batsData.map(data => createEnemy(Bat, data, physics));

        building.enemies.push(...rats, ...bats);

        return building;
    }

    static createOfficeGymGarage(physics){
        let building = new Building();
        building.init(physics); // Initializes ladder and power lines

        const officeBuilder = new FloorBuilder();
        building.floors.push(officeBuilder.withName('office').withBottomConnector(5).withBottomConnector(9)
            .withBottomConnector(13).withBottomConnector(16).withBottomConnector(19).withBottomConnector(26)
            .withCeilingConnector(5).withCeilingConnector(12).withCeilingConnector(20).withCeilingConnector(26).build());

       const gymBuilder = new FloorBuilder();
       building.floors.push(gymBuilder.withName('gym').withCeilingConnector(7).withCeilingConnector(23)
        .build());

       const garageBuilder = new FloorBuilder();
       building.floors.push(garageBuilder.withName('garage').withCeilingConnector(5).withCeilingConnector(22)
        .build());

       building.floors.forEach(floor => floor.init(physics));
       building.floors.forEach(floor => floor.calculateFloorLevel());

       const connectionPointsCounts = [4, 8, 2];
       building.wires = building.floors.map((floor, index) => {
           const aboveFloor = building.floors[index] || null;
           const belowFloor = building.floors[index - 1] || null;
           return new Wire(index, physics, belowFloor, aboveFloor, connectionPointsCounts[index]);
       });

        building.includeWiresInInfoFrame();

        return building;
    }
}
