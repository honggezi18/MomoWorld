//游戏数据类
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    //重置参数
    GameData.reset = function () {
    };
    //加载数据
    GameData.loadData = function () {
        if (Tool.checkLocal("MapState")) {
            GameData["MapState"] = JSON.parse(Tool.getLocal("MapState"));
        }
    };
    //保存数据//角色数据//基本数据（金币数）
    GameData.saveData = function () {
        Tool.setLocal("MapState", JSON.stringify(GameData["MapState"]));
    };
    GameData.gameWidth = 800;
    GameData.gameHeight = 480;
    GameData.scaleSmall = 1;
    GameData.bodyWidth = 25; //所有角色的刚体宽度
    GameData.mapIndex = -1; //标示当前选中的地图
    GameData.difficulty = 0; //标示当前的游戏难度
    GameData.heroIndex = 1; //选择的角色
    GameData.enemyArray = []; //敌人数组
    GameData.bulletArray = []; //子弹数组
    GameData.MapState = [
        {
            "name": "map0",
            "state": 1,
            "item": [""],
        },
        {
            "name": "map1",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map2",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map3",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map4",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map5",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map6",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map7",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map8",
            "state": 0,
            "item": [""],
        },
        {
            "name": "map9",
            "state": 0,
            "item": [""],
        }
    ];
    return GameData;
})();
egret.registerClass(GameData,"GameData");
