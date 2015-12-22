//游戏数据类
class GameData {
    static gameWidth:number = 800;
    static gameHeight:number = 480;
    static scaleSmall:number = 1;

    static mapIndex:number = -1;//标示当前选中的地图
    static difficulty:number = 0;//标示当前的游戏难度

    static welcomeMoveSpeed:number = 5;//欢迎页面中地图移动的速度


    static MapState = [//地图信息
        {//state中0为未开放，1为普通，2为困难，3为地狱
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


    //重置参数
    static reset() {

    }


    //加载数据
    static loadData():void {
        if (Tool.checkLocal("MapState")) {//加载地图
            GameData["MapState"] = JSON.parse(Tool.getLocal("MapState"));
        }
    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        Tool.setLocal("MapState", JSON.stringify(GameData["MapState"]));
    }


}