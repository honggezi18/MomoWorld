//游戏数据类
class GameData {
    static gameWidth:number = 480;
    static gameHeight:number = 800;
    static scaleSmall:number = 1;


    static MapState = [//地图信息
        {
            "name": "map1",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map2",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map3",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map4",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map5",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map6",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map7",
            "state": "common",
            "item": [""],
        },
        {
            "name": "map8",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map9",
            "state": "disable",
            "item": [""],
        },
        {
            "name": "map10",
            "state": "disable",
            "item": [""],
        },
    ];


    //重置参数
    static reset() {

    }


    //加载数据
    static loadData():void {
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {//若本地端有保存数据
                GameData[nameList[i]] = JSON.parse(Tool.getLocal(nameList[i]));
            }
        }


    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        var nameList = ["Hero1", "Hero2", "Hero3"];//角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], JSON.stringify(GameData[nameList[i]]));
    }


}