//物品类，用于存放所有物品信息。如：武器，消耗品，掉落品
//资源名，物品名字,价值属性，价格，描述，材料等级等级，
//等级分类0：绿色，1：蓝色，2：紫色
//装备中的Boss掉落可以在详细信息中备注显示
var getEquipment = function (index) {
    return window["equipmentData" + index];
};
//实际数据，最终转化为字符串来标示
var equipmentData0 = {
    res: "item_equipment0_png",
    name: "itme0",
    type: "gold",
    cost: 25,
    info: "itme0",
    grade: 1
};
