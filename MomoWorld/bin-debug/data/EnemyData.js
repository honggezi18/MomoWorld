var getEnemy = function (index) {
    return window["enemy" + index];
};
var enemy1 = {
    name: "enemy1",
    blood: 500,
    exp: 50,
    dropItem: [
        { type: "Item", id: 0, change: 0.5 },
        { type: "Item", id: 1, change: 0.5 },
        { type: "Item", id: 2, change: 0.5 },
        { type: "Item", id: 3, change: 0.5 },
        { type: "Item", id: 4, change: 0.5 },
        { type: "Item", id: 5, change: 0.5 },
        //{type: "Item", id: 6, change: 0.5},
        //{type: "Item", id: 7, change: 0.5},
        //{type: "Item", id: 8, change: 0.5},
        //{type: "Item", id: 9, change: 0.5},
        //{type: "Item", id: 10, change: 0.5},
        //{type: "Item", id: 11, change: 0.5},
        //{type: "Item", id: 12, change: 0.5},
        { type: "Drup", id: 0, change: 0.5 },
    ],
    stand: {
        offsetX: -15,
        offsetY: -25,
        halfWidth: 65,
        halfHeight: 100,
        powerBase: 5,
        powerSpace: 2,
        baseTime: 200,
        spaceTime: 200,
    },
    walk: {
        offsetX: -15,
        offsetY: -25,
        speed: 1,
        baseTime: 200,
        spaceTime: 200,
    },
    attack: {
        offsetX: -85,
        offsetY: -50,
        powerBase: 10,
        powerSpace: 5,
        range: 200
    },
    hit: {
        offsetX: -15,
        offsetY: -35,
        CD: 50
    },
    die: {
        offsetX: -30,
        offsetY: -35,
    },
};
