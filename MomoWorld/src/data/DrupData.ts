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
        if (id == index) {
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
    name: "劣质红色药水",
    type: "gold",
    cost: 5,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 10//补充的能量值
};

var drupData1 = {
    res: "item_drup1_png",
    name: "劣质蓝色药水",
    type: "gold",
    cost: 5,
    info: "劣质恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 10//补充的能量值
};

var drupData2 = {
    res: "item_drup2_png",
    name: "普通红色药水",
    type: "gold",
    cost: 10,
    info: "恢复生命值20点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 20//补充的能量值
};

var drupData3 = {
    res: "item_drup3_png",
    name: "普通蓝色药水",
    type: "gold",
    cost: 10,
    info: "恢复魔法值20点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 20//补充的能量值
};

var drupData4 = {
    res: "item_drup4_png",
    name: "高级红色药水",
    type: "gold",
    cost: 20,
    info: "恢复生命值50点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 50//补充的能量值
};

var drupData5 = {
    res: "item_drup5_png",
    name: "高级蓝色药水",
    type: "gold",
    cost: 20,
    info: "恢复魔法值50点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 50//补充的能量值
};

var drupData6 = {
    res: "item_drup6_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 2,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData7 = {
    res: "item_drup7_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 2,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData8 = {
    res: "item_drup8_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData9 = {
    res: "item_drup9_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData10 = {
    res: "item_drup10_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData11 = {
    res: "item_drup11_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData12 = {
    res: "item_drup12_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData13 = {
    res: "item_drup13_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData14 = {
    res: "item_drup14_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData15 = {
    res: "item_drup15_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData16 = {
    res: "item_drup16_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData17 = {
    res: "item_drup17_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData18 = {
    res: "item_drup18_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData19 = {
    res: "item_drup19_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData20 = {
    res: "item_drup20_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData21 = {
    res: "item_drup21_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData22 = {
    res: "item_drup22_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData23 = {
    res: "item_drup23_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData24 = {
    res: "item_drup24_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复生命值10点",
    grade: 1,
    func: "blood",//药品的功能类别
    funcNum: 100//补充的能量值
};

var drupData25 = {
    res: "item_drup25_png",
    name: "劣质红色药水",
    type: "gold",
    cost: 25,
    info: "恢复魔法值10点",
    grade: 1,
    func: "power",//药品的功能类别
    funcNum: 100//补充的能量值
};
