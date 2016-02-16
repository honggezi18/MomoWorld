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
    static skill1Index:number = 0;//技能下标一
    static skill2Index:number = 0;//技能下标一

    //主角属性,保存格式，当前值+“。”+最大值
    static skill1State = [1.25, 0.30, 0.30, 0.30, 0.30];
    static skill2State = [1.25, 0.30, 0.30, 0.30, 0.30];
    static abilityState = [0.30, 0.30, 0.30, 0.30, 0.30];


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

        //保存技能点
        if (Tool.checkLocal("skill1State"))GameData["skill1State"] = JSON.parse(Tool.getLocal("skill1State"));//加载地图
        if (Tool.checkLocal("skill2State"))GameData["skill2State"] = JSON.parse(Tool.getLocal("skill2State"));//加载地图
        if (Tool.checkLocal("abilityState"))GameData["abilityState"] = JSON.parse(Tool.getLocal("abilityState"));//加载地图
        if (Tool.checkLocal("skillNum"))GameData["skillNum"] = JSON.parse(Tool.getLocal("skillNum"));//加载地图
        if (Tool.checkLocal("bodyNum"))GameData["bodyNum"] = JSON.parse(Tool.getLocal("bodyNum"));//加载地图

    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        console.log("saveData");
        //return;
        Tool.setLocal("MapState", JSON.stringify(GameData["MapState"]));
        Tool.setLocal("skill1State", JSON.stringify(GameData["skill1State"]));
        Tool.setLocal("skill2State", JSON.stringify(GameData["skill2State"]));
        Tool.setLocal("abilityState", JSON.stringify(GameData["abilityState"]));
        Tool.setLocal("skillNum", JSON.stringify(GameData["skillNum"]));
        Tool.setLocal("bodyNum", JSON.stringify(GameData["bodyNum"]));
    }


}