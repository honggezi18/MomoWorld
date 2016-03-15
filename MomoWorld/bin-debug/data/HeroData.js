var getHero = function (name) {
    if (name == "1")
        return hero1;
};
//主角模式
var hero1 = {
    name: "hero1",
    blood: 500,
    power: 200,
    exp: 155,
    expSpace: 200,
    stand: {
        offsetX: -10,
        offsetY: -17.5
    },
    walk: {
        offsetX: 5,
        offsetY: -22,
        moveSpeed: 1.5,
    },
    jump: {
        offsetX: 10,
        offsetY: -17.5
    },
    attack: {
        offsetX: -12,
        offsetY: -17.5,
        powerBase: 50,
        powerSpace: 20,
        speed: 10,
        CD: 30 //冷却时间
    },
    hit: {
        offsetX: -13,
        offsetY: -20,
        CD: 50,
        hitMove: 1,
    },
    die: {
        offsetX: 0,
        offsetY: -6
    },
    levelUp: {
        offsetX: 0,
        offsetY: -80
    },
    skill0: {
        offsetX: -2,
        offsetY: -22.5,
        skillOffsetX: -12,
        skillOffsetY: -17.5,
        powerBase: 50,
        powerSpace: 20,
        cost: 10,
        speed: 20,
        CD: 10,
        range: [
            {},
            {},]
    },
    skill1: {
        offsetX: -2,
        offsetY: -22.5,
        skillOffsetX: -12,
        skillOffsetY: -17.5,
        powerBase: 50,
        powerSpace: 20,
        cost: 10,
        speed: 15,
        CD: 20,
        range: [
            {},
            {},]
    },
    skill2: {
        offsetX: -2,
        offsetY: -22.5,
        skillOffsetX: -12,
        skillOffsetY: -17.5,
        powerBase: 100,
        powerSpace: 50,
        cost: 20,
        speed: 15,
        CD: 30,
        range: [
            {},
            {},]
    },
};
