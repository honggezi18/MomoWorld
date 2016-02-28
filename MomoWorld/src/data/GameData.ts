//游戏数据类
class GameData {
    //固态数据///////////////////////////////
    static gameWidth:number = 800;
    static gameHeight:number = 480;
    static scaleSmall:number = 1;
    static bodyWidth:number = 25;//所有角色的刚体宽度

    //暂存数据///////////////////////////////
    static mapIndex:number = -1;//标示当前选中的地图
    static difficulty:number = 0;//标示当前的游戏难度

    static itemArray = [];//物品数组
    static enemyArray = [];//敌人数组
    static bulletArray = [];//子弹数组


    //动态数据，需保存的数据///////////////////////////////
    static goldNum:number = 500;//用户剩余的金币
    static diamondNum:number = 500;//用户剩余的金币
    static skillNum:number = 50;//剩余的技能点数
    static bodyNum:number = 50;//剩余的技能点数
    static heroIndex:number = 1;//选择的角色


    //能力面板数据
    //主角属性,保存格式，当前值+“。”+最大值
    static skill1State = [1.25, 0.30, 0.30, 0.30, 0.30];
    static skill2State = [1.25, 0.30, 0.30, 0.30, 0.30];
    static abilityState = [0.30, 0.30, 0.30, 0.30, 0.30];
    static skill1Index:number = 0;//技能下标一
    static skill2Index:number = 0;//技能下标一

    //背包面板数据,通过ID进行物品的索引    保存格式：ID号+“。”+物品数量
    static bag_Equipment = [0, 0, 0, 0];
    static bag_Piece = [0.0, 0.0, 0.0, 0.0,];
    static bag_Item = [0.0, 0.0,];
    static bag_Drup = [0.0, 0.0, 1.0, 0.0,];
    static bag_BooldId:number = -1;//携带的红瓶ID
    static bag_PowerId:number = -1;//携带的蓝瓶ID

    //玩家信息
    static data_Equipment = {//携带的装备ID
        cloak: 100,//披风
        clothes: 200,//上衣
        earring: 300,//耳环
        glove: 400,//右边武器
        hat: 500,//帽子
        ring: [600, 600, 600, 600, 600, 600],//戒指
        shield: 700,//右边武器
        shoe: 800,//鞋子
        trouser: 900,//裤子
        weapon: 1000,//左边武器
    };

    //state中0为未开放，1为普通，2为困难，3为地狱
    //static MapState:Array<number> = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];//10个
    static MapState:Array<number> = [3, 2, 1, 0, 0, 0, 0, 0, 0, 0];//10个


    //重置参数
    static reset() {

    }


    //加载数据
    static loadData():void {
        console.log("loadData");
        //return;
        if (Tool.checkLocal("MapState"))GameData["MapState"] = JSON.parse(Tool.getLocal("MapState"));//加载地图

        //加载能力面板数据
        if (Tool.checkLocal("skill1State"))GameData["skill1State"] = JSON.parse(Tool.getLocal("skill1State"));//加载地图
        if (Tool.checkLocal("skill2State"))GameData["skill2State"] = JSON.parse(Tool.getLocal("skill2State"));//加载地图
        if (Tool.checkLocal("abilityState"))GameData["abilityState"] = JSON.parse(Tool.getLocal("abilityState"));//加载地图
        if (Tool.checkLocal("skillNum"))GameData["skillNum"] = JSON.parse(Tool.getLocal("skillNum"));//加载地图
        if (Tool.checkLocal("bodyNum"))GameData["bodyNum"] = JSON.parse(Tool.getLocal("bodyNum"));//加载地图
        if (Tool.checkLocal("skill1Index"))GameData["skill1Index"] = JSON.parse(Tool.getLocal("skill1Index"));//加载地图
        if (Tool.checkLocal("skill2Index"))GameData["skill2Index"] = JSON.parse(Tool.getLocal("skill2Index"));//加载地图

        //加载我的背包数据
        //if (Tool.checkLocal("bag_Equipment"))GameData["bag_Equipment"] = JSON.parse(Tool.getLocal("bag_Equipment"));//加载地图
        //if (Tool.checkLocal("bag_Piece"))GameData["bag_Piece"] = JSON.parse(Tool.getLocal("bag_Piece"));//加载地图
        //if (Tool.checkLocal("bag_Item"))GameData["bag_Item"] = JSON.parse(Tool.getLocal("bag_Item"));//加载地图
        //if (Tool.checkLocal("bag_Drup"))GameData["bag_Drup"] = JSON.parse(Tool.getLocal("bag_Drup"));//加载地图
        //if (Tool.checkLocal("goldNum"))GameData["goldNum"] = parseInt(Tool.getLocal("goldNum"));//加载地图
        //if (Tool.checkLocal("diamondNum"))GameData["diamondNum"] = parseInt(Tool.getLocal("diamondNum"));//加载地图
        //if (Tool.checkLocal("bag_BooldId"))GameData["bag_BooldId"] = parseInt(Tool.getLocal("bag_BooldId"));//加载地图
        //if (Tool.checkLocal("bag_PowerId"))GameData["bag_PowerId"] = parseInt(Tool.getLocal("bag_PowerId"));//加载地图
    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
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
        Tool.setLocal("goldNum", GameData["goldNum"]);
        Tool.setLocal("diamondNum", GameData["diamondNum"]);
        Tool.setLocal("bag_BooldId", GameData["bag_BooldId"]);
        Tool.setLocal("bag_PowerId", GameData["bag_PowerId"]);

    }


}