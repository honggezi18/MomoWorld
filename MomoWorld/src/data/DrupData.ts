//物品类，用于存放所有物品信息。如：武器，消耗品，掉落品
//资源名，物品名字,价值属性，价格，描述，材料等级等级，
//等级分类0：绿色，1：蓝色，2：紫色


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
    func: "boold"//药品的功能
};