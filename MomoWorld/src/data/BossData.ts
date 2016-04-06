//怪物Boss相关信息文件

//获取特定Boss信息的函数
var getBoss = function (index) {
    return window["boss" + index];
};

//具体数据，这里使用boss1作为参数数据
var boss1 = {
    name: "黑暗大魔王",//boss名字
    blood: 5000,//用于的血量
    exp: 500,//击败本boss后，游戏角色可以获得的经验值
    dropItem: [//击败本boss后，可能获得物品数组,如药品，装备等
        //这里是可能获得一个装备，装备的ID为100，获得本装的可能性为50%
        {type: "Equipment", id: 100, change: 0.5},
    ],

    //boss处于站立状态时的相关参数
    stand: {
        offsetX: -15,//boss站立动画相对于怪物中心点所做的X轴偏移值
        offsetY: -25,//boss站立动画相对于怪物中心点所做的X轴偏移值
        halfWidth: 65,//boss站立时的身体宽度
        halfHeight: 100,//boss站立时的身体高度
        powerBase: 5,//boss站立时，游戏主角碰到它后受到的基础伤害
        powerSpace: 2,//boss站立时，游戏主角碰到它后受到的伤害的浮动值
        baseTime: 200,//boss站立过程所经历的基本时间
        spaceTime: 200,//boss站立过程所经历的时间的浮动值
    },

    //boss处于行走状态时的相关参数
    walk: {
        offsetX: -15,//行走动画的X轴偏移值
        offsetY: -25,//行走动画的Y轴偏移值
        speed: 1,//boss的行走速度
        baseTime: 200,//boss行走过程所经历的基本时间
        spaceTime: 200,//boss行走过程所经历的时间的浮动值
    },

    //boss处于攻击状态时的相关参数
    attack: {
        offsetX: -85,//攻击动画的X轴偏移值
        offsetY: -50,//攻击动画的Y轴偏移值
        powerBase: 100,//游戏主角该攻击后受到的基础伤害
        powerSpace: 30,//游戏主角该攻击后受到的伤害的浮动值
        range: 200//该攻击的攻击范围
    },

    //boss处于受到伤害状态时的相关参数
    hit: {
        offsetX: -15,//boss受到动画的X轴偏移值
        offsetY: -35,//boss受到动画的Y轴偏移值
        CD: 50//boss受到伤害后的无敌时间
    },

    //boss死亡时的相关参数
    die: {
        offsetX: -30,//boss死亡动画的X轴偏移值
        offsetY: -35,//boss死亡动画的Y轴偏移值
    },
};