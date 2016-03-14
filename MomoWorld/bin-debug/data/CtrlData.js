//操作层数据类
var daily = {
    date: "0001",
    items: [
        { icon: "daily_icon1_png", detail: "任务1", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "daily_icon2_png", detail: "任务2", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "daily_icon3_png", detail: "任务3", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "daily_icon4_png", detail: "任务4", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "daily_icon5_png", detail: "任务5", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" }
    ]
};
var achievement = {
    date: "0001",
    items: [
        { icon: "achievement_icon1_png", detail: "成就1", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", detail: "成就2", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", detail: "成就3", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", detail: "成就4", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" },
        { icon: "achievement_icon5_png", detail: "成就5", gift: "奖励", type: "奖励类型", num: 30, ques: 5, state: "go" }
    ]
};
var ability = {
    skill1: [
        { icon: "ability_skill1_1_png", skill: "技能1", name: "单攻技能1", intruction: "单攻技能1简介" },
        { icon: "ability_skill1_2_png", skill: "技能2", name: "单攻技能2", intruction: "单攻技能2简介" },
        { icon: "ability_skill1_3_png", skill: "技能3", name: "单攻技能3", intruction: "单攻技能3简介" },
        { icon: "ability_skill1_4_png", skill: "技能4", name: "单攻技能4", intruction: "单攻技能4简介" },
        { icon: "ability_skill1_5_png", skill: "技能5", name: "单攻技能5", intruction: "单攻技能5简介" },
    ],
    skill2: [
        { icon: "ability_skill2_1_png", skill: "技能1", name: "群攻技能1", intruction: "群攻技能1简介" },
        { icon: "ability_skill2_2_png", skill: "技能2", name: "群攻技能2", intruction: "群攻技能2简介" },
        { icon: "ability_skill2_3_png", skill: "技能3", name: "群攻技能3", intruction: "群攻技能3简介" },
        { icon: "ability_skill2_4_png", skill: "技能4", name: "群攻技能4", intruction: "群攻技能4简介" },
        { icon: "ability_skill2_5_png", skill: "技能5", name: "群攻技能5", intruction: "群攻技能5简介" },
    ],
    data: [
        { icon: "ability_boold", type: "血量", name: "血量", intruction: "血量简介" },
        { icon: "ability_power", type: "法力", name: "法力", intruction: "法力简介" },
        { icon: "ability_attack", type: "普攻", name: "普攻", intruction: "普攻简介" },
        { icon: "ability_defense1_", type: "物抗", name: "物抗", intruction: "物抗简介" },
        { icon: "ability_defense2_", type: "法抗", name: "法抗", intruction: "法抗简介" },
    ]
};
var drupShop = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    20, 21, 22, 23, 24, 25];
var weaponShop = [
    100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
    200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211,
    300, 301, 302, 303, 304, 305, 306, 307, 308, 309, 310, 311,
    400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411,
    500, 501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511,
    600, 601, 602, 603, 604, 605, 606, 607, 608, 609, 610, 611,
    700, 701, 702, 703, 704, 705, 706, 707, 708, 709, 710, 711,
    800, 801, 802, 803, 804, 805, 806, 807, 808, 809, 810, 811,
    900, 901, 902, 903, 904, 905, 906, 907, 908, 909, 910, 911,
    1000, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011,
];
var heroState = {
    ring: [
        { x: 44, y: 55, id: -1 },
        { x: 44, y: 110, id: -1 },
        { x: 44, y: 163, id: -1 },
        { x: 44, y: 218, id: -1 },
        { x: 44, y: 273, id: -1 },
        { x: 44, y: 330, id: -1 }],
    hat: { x: 151, y: 55, id: -1 },
    clothes: { x: 151, y: 218, id: -1 },
    trouser: { x: 151, y: 273, id: -1 },
    shoe: { x: 151, y: 330, id: -1 },
    weapon: { x: 97, y: 218, id: -1 },
    shield: { x: 257, y: 218, id: -1 },
    earring: { x: 205, y: 163, id: -1 },
    cloak: { x: 257, y: 273, id: -1 },
    glove: { x: 205, y: 273, id: -1 },
};
