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
        console.log("loadData");
        //return;
        if (Tool.checkLocal("MapState"))
            GameData["MapState"] = JSON.parse(Tool.getLocal("MapState")); //加载地图
        //加载能力面板数据
        if (Tool.checkLocal("skill1State"))
            GameData["skill1State"] = JSON.parse(Tool.getLocal("skill1State")); //加载地图
        if (Tool.checkLocal("skill2State"))
            GameData["skill2State"] = JSON.parse(Tool.getLocal("skill2State")); //加载地图
        if (Tool.checkLocal("abilityState"))
            GameData["abilityState"] = JSON.parse(Tool.getLocal("abilityState")); //加载地图
        if (Tool.checkLocal("skillNum"))
            GameData["skillNum"] = JSON.parse(Tool.getLocal("skillNum")); //加载地图
        if (Tool.checkLocal("bodyNum"))
            GameData["bodyNum"] = JSON.parse(Tool.getLocal("bodyNum")); //加载地图
        if (Tool.checkLocal("skill1Index"))
            GameData["skill1Index"] = JSON.parse(Tool.getLocal("skill1Index")); //加载地图
        if (Tool.checkLocal("skill2Index"))
            GameData["skill2Index"] = JSON.parse(Tool.getLocal("skill2Index")); //加载地图
        //加载我的背包数据
        //if (Tool.checkLocal("bag_Equipment"))GameData["bag_Equipment"] = JSON.parse(Tool.getLocal("bag_Equipment"));//加载地图
        //if (Tool.checkLocal("bag_Piece"))GameData["bag_Piece"] = JSON.parse(Tool.getLocal("bag_Piece"));//加载地图
        //if (Tool.checkLocal("bag_Item"))GameData["bag_Item"] = JSON.parse(Tool.getLocal("bag_Item"));//加载地图
        //if (Tool.checkLocal("bag_Drup"))GameData["bag_Drup"] = JSON.parse(Tool.getLocal("bag_Drup"));//加载地图
    };
    //保存数据//角色数据//基本数据（金币数）
    GameData.saveData = function () {
        console.log("saveData");
        //return;
        Tool.setLocal("MapState", JSON.stringify(GameData["MapState"]));
        //保存能力面板数据
        Tool.setLocal("skill1State", JSON.stringify(GameData["skill1State"]));
        Tool.setLocal("skill2State", JSON.stringify(GameData["skill2State"]));
        Tool.setLocal("abilityState", JSON.stringify(GameData["abilityState"]));
        Tool.setLocal("skillNum", JSON.stringify(GameData["skillNum"]));
        Tool.setLocal("bodyNum", JSON.stringify(GameData["bodyNum"]));
        Tool.setLocal("skill1Index", JSON.stringify(GameData["skill1Index"]));
        Tool.setLocal("skill2Index", JSON.stringify(GameData["skill2Index"]));
        //保存我的背包数据
        Tool.setLocal("bag_Equipment", JSON.stringify(GameData["bag_Equipment"]));
        Tool.setLocal("bag_Piece", JSON.stringify(GameData["bag_Piece"]));
        Tool.setLocal("bag_Item", JSON.stringify(GameData["bag_Item"]));
        Tool.setLocal("bag_Drup", JSON.stringify(GameData["bag_Drup"]));
    };
    //固态数据///////////////////////////////
    GameData.gameWidth = 800;
    GameData.gameHeight = 480;
    GameData.scaleSmall = 1;
    GameData.bodyWidth = 25; //所有角色的刚体宽度
    //暂存数据///////////////////////////////
    GameData.mapIndex = -1; //标示当前选中的地图
    GameData.difficulty = 0; //标示当前的游戏难度
    GameData.itemArray = []; //物品数组
    GameData.enemyArray = []; //敌人数组
    GameData.bulletArray = []; //子弹数组
    //动态数据，需保存的数据///////////////////////////////
    GameData.goldNum = 500; //用户剩余的金币
    GameData.diamondNum = 500; //用户剩余的金币
    GameData.skillNum = 50; //剩余的技能点数
    GameData.bodyNum = 50; //剩余的技能点数
    GameData.heroIndex = 1; //选择的角色
    //能力面板数据
    //主角属性,保存格式，当前值+“。”+最大值
    GameData.skill1State = [1.25, 0.30, 0.30, 0.30, 0.30];
    GameData.skill2State = [1.25, 0.30, 0.30, 0.30, 0.30];
    GameData.abilityState = [0.30, 0.30, 0.30, 0.30, 0.30];
    GameData.skill1Index = 0; //技能下标一
    GameData.skill2Index = 0; //技能下标一
    //背包面板数据,通过ID进行物品的索引    保存格式：ID号+“。”+物品数量
    GameData.bag_Equipment = [0.0, 0.0, 0.0, 0.0,];
    GameData.bag_Piece = [0.0, 0.0, 0.0, 0.0,];
    GameData.bag_Item = [0.0, 0.0,];
    GameData.bag_Drup = [0.0, 0.0, 0.0, 0.0,];
    //state中0为未开放，1为普通，2为困难，3为地狱
    //static MapState:Array<number> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];//10个
    GameData.MapState = [3, 2, 1, 0, 0, 0, 0, 0, 0, 0]; //10个
    return GameData;
})();
egret.registerClass(GameData,"GameData");
