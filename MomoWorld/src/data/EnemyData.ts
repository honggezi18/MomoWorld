var getEnemy = function (name) {
    if (name == "1")return enemy1;
};


var enemy1 = {
    name: "enemy1",
    blood: 500,
    exp: 50,//当前怪物的经验值

    stand: {
        offsetX: -15,
        offsetY: -25,
        halfWidth: 65,//碰撞碰撞攻击的半径
        halfHeight: 100,
        powerBase: 5,//碰撞攻击的基本数值
        powerSpace: 2,//浮动值
        baseTime: 200,//等待最短时间
        spaceTime: 200,//等待最长时间
    },

    walk: {
        offsetX: -15,//显示移动皮肤时的X轴偏移值
        offsetY: -25,//显示移动皮肤时的Y轴偏移值
        speed: 1,//移动的速度
        baseTime: 200,//等待最短时间
        spaceTime: 200,//等待最长时间
    },

    attack: {
        offsetX: -85,
        offsetY: -50,
        powerBase: 10,//碰撞攻击的基本数值
        powerSpace: 5,//浮动值
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