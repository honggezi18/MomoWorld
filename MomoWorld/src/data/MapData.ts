//地图数据类
//地图背景资源，地图名，玩家的推进进入等级
//掉落物品
//怪物种类，数量，出现方式，出现坐标，//Momo
//Boss种类，出现概率
//难度系数，对应所在地图的状态//Momo
//同时在场怪物数

/////////////
//把物品掉落的信息放在怪物信息中

//获取相应资源及对资源的整理
var getMap = function (index) {
    //获取enemy掉落物品信息
    var data = window["mapData" + index];
    for (var i = 0; i < data.enemy.length; i++) {
        var enemy = getEnemy(data.enemy[i].id);
        for (var a = 0; a < enemy.dropItem.length; a++) {
            data.dropItem.push(window["get" + enemy.dropItem[a].type](enemy.dropItem[a].id));
        }
    }
    return data;
};

//实际数据，最终转化为字符串来标示
var mapData0 = {
    name: "圣  地",
    res: "map_shengdi_png",
    level: "01~05",
    enemyNum: 10,
    dropItem: [],
    enemy: [{id: 1, num: 15}],
    boss: [{id: 1, chance: 0.2}]
};



