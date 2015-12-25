var getEnemy = function (name) {
    if (name == "1")return enemy1;
};


var enemy1 = {
    name: "enemy1",

    stand: {
        offsetX: -15,
        offsetY: -25,
        halfWidth: 65,//碰撞碰撞攻击的半径
        halfHeight: 100,
    },

    walk: {
        offsetX: -15,//显示移动皮肤时的X轴偏移值
        offsetY: -25,//显示移动皮肤时的Y轴偏移值
        moveSpeed: 2,//移动的速度
        moveMinTime: 200,//走路最短时间
        moveMaxTime: 400,//走路最长时间
    },

    attack: {
        offsetX: -85,
        offsetY: -50
    },

    hit: {
        offsetX: -15,
        offsetY: -35,
        hitTime: 30
    },

    die: {
        offsetX: -30,
        offsetY: -35,
        dieTime: 60
    },
};