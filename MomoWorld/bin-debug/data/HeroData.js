var getHero = function (name) {
    if (name == "1")
        return hero1;
};
var hero1 = {
    name: "hero1",
    stand: {
        offsetX: -10,
        offsetY: -17.5
    },
    walk: {
        offsetX: 5,
        offsetY: -22,
        moveSpeed: 2,
    },
    jump: {
        offsetX: 10,
        offsetY: -17.5
    },
    attack: {
        offsetX: -12,
        offsetY: -17.5,
        speed: 20 //��ͨ�������ƶ��ٶ�
    },
    skill: {
        offsetX: -2,
        offsetY: -22.5
    },
    hit: {
        offsetX: -13,
        offsetY: -20,
        hitTime: 30,
        hitMove: 1,
    },
    die: {
        offsetX: 0,
        offsetY: -6,
        dieTime: 60
    },
};
