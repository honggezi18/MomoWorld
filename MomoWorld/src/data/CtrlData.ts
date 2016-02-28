//操作层数据类

var daily = {
    date: "0001",//记录当前游戏日期
    items: [
        {icon: "daily_icon1_png", detail: "任务1", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "daily_icon2_png", detail: "任务2", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "daily_icon3_png", detail: "任务3", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "daily_icon4_png", detail: "任务4", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "daily_icon5_png", detail: "任务5", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"}
    ]
};

var achievement = {
    date: "0001",//记录当前游戏日期
    items: [
        {icon: "achievement_icon1_png", detail: "成就1", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "achievement_icon2_png", detail: "成就2", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "achievement_icon3_png", detail: "成就3", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "achievement_icon4_png", detail: "成就4", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"},
        {icon: "achievement_icon5_png", detail: "成就5", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go"}
    ]
};

var ability = {
    skill1: [//图标，相连的技能，技能名，简介，当前状态
        {icon: "ability_skill1_1_png", skill: "技能1", name: "单攻技能1", intruction: "单攻技能1简介"},
        {icon: "ability_skill1_2_png", skill: "技能2", name: "单攻技能2", intruction: "单攻技能2简介"},
        {icon: "ability_skill1_3_png", skill: "技能3", name: "单攻技能3", intruction: "单攻技能3简介"},
        {icon: "ability_skill1_4_png", skill: "技能4", name: "单攻技能4", intruction: "单攻技能4简介"},
        {icon: "ability_skill1_5_png", skill: "技能5", name: "单攻技能5", intruction: "单攻技能5简介"},
    ],
    skill2: [
        {icon: "ability_skill2_1_png", skill: "技能1", name: "群攻技能1", intruction: "群攻技能1简介"},
        {icon: "ability_skill2_2_png", skill: "技能2", name: "群攻技能2", intruction: "群攻技能2简介"},
        {icon: "ability_skill2_3_png", skill: "技能3", name: "群攻技能3", intruction: "群攻技能3简介"},
        {icon: "ability_skill2_4_png", skill: "技能4", name: "群攻技能4", intruction: "群攻技能4简介"},
        {icon: "ability_skill2_5_png", skill: "技能5", name: "群攻技能5", intruction: "群攻技能5简介"},
    ],
    data: [
        {icon: "ability_boold", type: "血量", name: "血量", intruction: "血量简介"},
        {icon: "ability_power", type: "法力", name: "法力", intruction: "法力简介"},
        {icon: "ability_attack", type: "普攻", name: "普攻", intruction: "普攻简介"},
        {icon: "ability_defense1_", type: "物抗", name: "物抗", intruction: "物抗简介"},
        {icon: "ability_defense2_", type: "法抗", name: "法抗", intruction: "法抗简介"},
    ]
};

var drupShop = [0, 0, 0, 0, 1];
var weaponShop = [0, 0, 0, 0];

var heroState = {//保存Icon应有的坐标，以及装备对应的ID，方便显示详细信息时使用
    ring: [
        {x: 44, y: 55, id: -1},
        {x: 44, y: 110, id: -1},
        {x: 44, y: 163, id: -1},
        {x: 44, y: 218, id: -1},
        {x: 44, y: 273, id: -1},
        {x: 44, y: 330, id: -1}],
    hat: {x: 151, y: 55, id: -1},
    clothes: {x: 151, y: 218, id: -1},
    trouser: {x: 151, y: 273, id: -1},
    shoe: {x: 151, y: 330, id: -1},
    weapon: {x: 97, y: 218, id: -1},
    shield: {x: 257, y: 218, id: -1},
    earring: {x: 205, y: 163, id: -1},
    cloak: {x: 257, y: 273, id: -1},//
    glove: {x: 205, y: 273, id: -1},//
};



