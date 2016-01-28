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

    //state中0为未开放，1为普通，2为困难，3为地狱
    static MapState:Array<number> = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0];//10个


    //重置参数
    static reset() {

    }


    //加载数据
    static loadData():void {
        console.log("loadData");
        if (Tool.checkLocal("MapState")) {//加载地图
            GameData["MapState"] = JSON.parse(Tool.getLocal("MapState"));
        }
    }

    //保存数据//角色数据//基本数据（金币数）
    static saveData():void {
        console.log("saveData");
        Tool.setLocal("MapState", JSON.stringify(GameData["MapState"]));
    }


}