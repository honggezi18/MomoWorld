var getHero = function (name) {
    if (name == "1")return hero1;
};

var hero1 = {
    name: "hero1",
    blood: 50,
    stand: {
        offsetX: -10,
        offsetY: -17.5
    },

    walk: {
        offsetX: 5,//显示移动皮肤时的X轴偏移值，正值图片往前
        offsetY: -22,//显示移动皮肤时的Y轴偏移值，正值下
        moveSpeed: 2,//移动的速度
    },

    jump: {
        offsetX: 10,
        offsetY: -17.5
    },

    attack: {
        offsetX: -12,
        offsetY: -17.5,
        powerBase: 50,//碰撞攻击的基本数值
        powerSpace: 20,//浮动值
        speed: 20,//普通攻击的移动速度
        CD:25
    },

    skill: {
        offsetX: -2,
        offsetY: -22.5,
        powerBase: 50,//碰撞攻击的基本数值
        powerSpace: 20,//浮动值
    },

    hit: {
        offsetX: -13,
        offsetY: -20,
        CD: 30,
        hitMove: 1,//被攻击后往后弹的效果
    },

    die: {
        offsetX: 0,
        offsetY: -6
    },
};