var getEnemy = function (name) {
    if (name == "1")
        return enemy1;
};
var enemy1 = {
    name: "enemy1",
    blood: 500,
    exp: 50,
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
        items: [
            "thing1"
        ]
    },
};
