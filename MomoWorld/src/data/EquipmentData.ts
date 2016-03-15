//物品类，用于存放所有物品信息。如：武器，消耗品，掉落品
//资源名，物品名字,价值属性，价格，描述，材料等级等级，
//等级分类0：绿色，1：蓝色，2：紫色
//装备中的Boss掉落可以在详细信息中备注显示

var getEquipment = function (index) {
    //console.log("index    " + index);
    return window["equipmentData" + index];
};

//实际数据，最终转化为字符串来标示
var equipmentData0 = {
    res: "item_equipment0_png",
    name: "itme0",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};

var equipmentData100 = {
    res: "item_equipment100_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData101 = {
    res: "item_equipment101_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData102 = {
    res: "item_equipment102_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData103 = {
    res: "item_equipment103_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData104 = {
    res: "item_equipment104_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData105 = {
    res: "item_equipment105_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData106 = {
    res: "item_equipment106_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData107 = {
    res: "item_equipment107_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData108 = {
    res: "item_equipment108_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData109 = {
    res: "item_equipment109_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData110 = {
    res: "item_equipment110_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};
var equipmentData111 = {
    res: "item_equipment111_png",
    name: "披风",
    type: "gold",
    cost: 300,
    info: "帅气的披风，增加物抗10点",
    grade: 1,
    _type: "cloak"//武器类型
};


var equipmentData200 = {
    res: "item_equipment200_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData201 = {
    res: "item_equipment201_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData202 = {
    res: "item_equipment202_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData203 = {
    res: "item_equipment203_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData204 = {
    res: "item_equipment204_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData205 = {
    res: "item_equipment205_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData206 = {
    res: "item_equipment206_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData207 = {
    res: "item_equipment207_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData208 = {
    res: "item_equipment208_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData209 = {
    res: "item_equipment209_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData210 = {
    res: "item_equipment210_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};
var equipmentData211 = {
    res: "item_equipment211_png",
    name: "上衣",
    type: "gold",
    cost: 300,
    info: "结实的上衣，增加魔抗10点",
    grade: 1,
    _type: "clothes"//武器类型
};


var equipmentData300 = {
    res: "item_equipment300_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData301 = {
    res: "item_equipment301_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData302 = {
    res: "item_equipment302_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData303 = {
    res: "item_equipment303_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData304 = {
    res: "item_equipment304_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData305 = {
    res: "item_equipment305_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData306 = {
    res: "item_equipment306_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData307 = {
    res: "item_equipment307_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData308 = {
    res: "item_equipment308_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData309 = {
    res: "item_equipment309_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData310 = {
    res: "item_equipment310_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};
var equipmentData311 = {
    res: "item_equipment311_png",
    name: "漂亮的耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "earring"//武器类型
};


var equipmentData400 = {
    res: "item_equipment400_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData401 = {
    res: "item_equipment401_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData402 = {
    res: "item_equipment402_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData403 = {
    res: "item_equipment403_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData404 = {
    res: "item_equipment404_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData405 = {
    res: "item_equipment405_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData406 = {
    res: "item_equipment406_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData407 = {
    res: "item_equipment407_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData408 = {
    res: "item_equipment408_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData409 = {
    res: "item_equipment409_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData410 = {
    res: "item_equipment410_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};
var equipmentData411 = {
    res: "item_equipment411_png",
    name: "手套",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "glove"//武器类型
};


var equipmentData500 = {
    res: "item_equipment500_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData501 = {
    res: "item_equipment501_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData502 = {
    res: "item_equipment502_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData503 = {
    res: "item_equipment503_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData504 = {
    res: "item_equipment504_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData505 = {
    res: "item_equipment505_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData506 = {
    res: "item_equipment506_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData507 = {
    res: "item_equipment507_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData508 = {
    res: "item_equipment508_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData509 = {
    res: "item_equipment509_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData510 = {
    res: "item_equipment510_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};
var equipmentData511 = {
    res: "item_equipment511_png",
    name: "帽子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "hat"//武器类型
};


var equipmentData600 = {
    res: "item_equipment600_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData601 = {
    res: "item_equipment601_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData602 = {
    res: "item_equipment602_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData603 = {
    res: "item_equipment603_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData604 = {
    res: "item_equipment604_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData605 = {
    res: "item_equipment605_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData606 = {
    res: "item_equipment606_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData607 = {
    res: "item_equipment607_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData608 = {
    res: "item_equipment608_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData609 = {
    res: "item_equipment609_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData610 = {
    res: "item_equipment610_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};
var equipmentData611 = {
    res: "item_equipment611_png",
    name: "耳环",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "ring"//武器类型
};


var equipmentData700 = {
    res: "item_equipment700_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData701 = {
    res: "item_equipment701_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData702 = {
    res: "item_equipment702_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData703 = {
    res: "item_equipment703_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData704 = {
    res: "item_equipment704_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData705 = {
    res: "item_equipment705_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData706 = {
    res: "item_equipment706_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData707 = {
    res: "item_equipment707_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData708 = {
    res: "item_equipment708_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData709 = {
    res: "item_equipment709_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData710 = {
    res: "item_equipment710_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};
var equipmentData711 = {
    res: "item_equipment711_png",
    name: "盾牌",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shield"//武器类型
};


var equipmentData800 = {
    res: "item_equipment800_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData801 = {
    res: "item_equipment801_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData802 = {
    res: "item_equipment802_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData803 = {
    res: "item_equipment803_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData804 = {
    res: "item_equipment804_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData805 = {
    res: "item_equipment805_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData806 = {
    res: "item_equipment806_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData807 = {
    res: "item_equipment807_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData808 = {
    res: "item_equipment808_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData809 = {
    res: "item_equipment809_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData810 = {
    res: "item_equipment810_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};
var equipmentData811 = {
    res: "item_equipment811_png",
    name: "鞋子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "shoe"//武器类型
};


var equipmentData900 = {
    res: "item_equipment900_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData901 = {
    res: "item_equipment901_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData902 = {
    res: "item_equipment902_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData903 = {
    res: "item_equipment903_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData904 = {
    res: "item_equipment904_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData905 = {
    res: "item_equipment905_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData906 = {
    res: "item_equipment906_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData907 = {
    res: "item_equipment907_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData908 = {
    res: "item_equipment908_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData909 = {
    res: "item_equipment909_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData910 = {
    res: "item_equipment910_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};
var equipmentData911 = {
    res: "item_equipment911_png",
    name: "裤子",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "trouser"//武器类型
};

var equipmentData1000 = {
    res: "item_equipment1000_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1001 = {
    res: "item_equipment1001_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1002 = {
    res: "item_equipment1002_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1003 = {
    res: "item_equipment1003_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1004 = {
    res: "item_equipment1004_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1005 = {
    res: "item_equipment1005_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1006 = {
    res: "item_equipment1006_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1007 = {
    res: "item_equipment1007_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1008 = {
    res: "item_equipment1008_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1009 = {
    res: "item_equipment1009_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1010 = {
    res: "item_equipment1010_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
var equipmentData1011 = {
    res: "item_equipment1011_png",
    name: "武器",
    type: "gold",
    cost: 300,
    info: "增加法抗100点",
    grade: 1,
    _type: "weapon"//武器类型
};
