//物品类，用于存放所有物品信息。如：武器，消耗品，掉落品
//资源名，物品名字,价值属性，价格，描述，材料等级等级，
//等级分类0：绿色，1：蓝色，2：紫色

///通过ID获取玩家拥有的药品数量
var getDrupNum = function (index:number):number {
    for (var i = GameData.bag_Drup.length - 1; i > -1; i--) {
        var id = Math.floor(GameData.bag_Drup[i]);
        if (id == index) {
            return Math.floor((GameData.bag_Drup[i] - id) * 100);
        }
    }
    return 0;
};

//设置玩家药品数量,并返回改变后的药品数量
var setDrupNum = function (index:number, num:number) {
    for (var i = GameData.bag_Drup.length - 1; i > -1; i--) {
        var id = Math.floor(GameData.bag_Drup[i]);
        if (id == index){
            GameData.bag_Drup[i] += num * 0.01;
            return Math.floor((GameData.bag_Drup[i] - id) * 100);
        }
    }
};

//通过ID获取药品信息
var getDrup = function (index) {
    console.log("getDrup");
    return window["drupData" + index];
};


//实际数据，最终转化为字符串来标示
var drupData0 = {
    res: "item_drup0_png",
    name: "drup0",
    type: "gold",
    cost: 25,
    info: "drup0",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData1 = {
    res: "item_drup1_png",
    name: "drup0",
    type: "gold",
    cost: 25,
    info: "drup0",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};