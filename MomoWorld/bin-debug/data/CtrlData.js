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
        { icon: "ability_skill1_1_png", skill: "技能1", name: "单攻技能1", intruction: "单攻技能1简介", level: 0, maxLevel: 25 },
        { icon: "ability_skill1_2_png", skill: "技能2", name: "单攻技能2", intruction: "单攻技能2简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill1_3_png", skill: "技能3", name: "单攻技能3", intruction: "单攻技能3简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill1_4_png", skill: "技能4", name: "单攻技能4", intruction: "单攻技能4简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill1_5_png", skill: "技能5", name: "单攻技能5", intruction: "单攻技能5简介", level: 0, maxLevel: 30 },
    ],
    skill2: [
        { icon: "ability_skill2_1_png", skill: "技能1", name: "群攻技能1", intruction: "群攻技能1简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill2_2_png", skill: "技能2", name: "群攻技能2", intruction: "群攻技能2简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill2_3_png", skill: "技能3", name: "群攻技能3", intruction: "群攻技能3简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill2_4_png", skill: "技能4", name: "群攻技能4", intruction: "群攻技能4简介", level: 0, maxLevel: 30 },
        { icon: "ability_skill2_5_png", skill: "技能5", name: "群攻技能5", intruction: "群攻技能5简介", level: 0, maxLevel: 30 },
    ],
    data: [
        { icon: "ability_boold", type: "血量", name: "血量", intruction: "血量简介", state: 1, level: 0, maxLevel: 30 },
        { icon: "ability_power", type: "法力", name: "法力", intruction: "法力简介", state: 1, level: 0, maxLevel: 30 },
        { icon: "ability_attack", type: "普攻", name: "普攻", intruction: "普攻简介", state: 1, level: 0, maxLevel: 30 },
        { icon: "ability_defense1_", type: "物抗", name: "物抗", intruction: "物抗简介", state: 1, level: 0, maxLevel: 30 },
        { icon: "ability_defense2_", type: "法抗", name: "法抗", intruction: "法抗简介", state: 1, level: 0, maxLevel: 30 },
    ]
};
var drupShop = {
    items: [
        { icon: "achievement_icon1_png", name: "药品1", info: "恢复HP50", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "药品1", info: "恢复HP50", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "药品1", info: "恢复HP50", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "药品1", info: "恢复HP50", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "药品1", info: "恢复HP50", cost: 30, ques: 5, state: "go" },
    ]
};
var weaponShop = {
    items: [
        { icon: "achievement_icon1_png", name: "武器1", info: "攻击力+100", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器2", info: "攻击力+200", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器3", info: "攻击力+300", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
    ]
};
var bag = {
    Equip: [
        { icon: "achievement_icon1_png", name: "武器1", info: "攻击力+100", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器2", info: "攻击力+200", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器3", info: "攻击力+300", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon1_png", name: "武器5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
    ],
    Item: [
        { icon: "achievement_icon2_png", name: "物品1", info: "攻击力+100", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品2", info: "攻击力+200", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品3", info: "攻击力+300", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon2_png", name: "物品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
    ],
    Piece: [
        { icon: "achievement_icon3_png", name: "碎片1", info: "攻击力+100", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片2", info: "攻击力+200", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片3", info: "攻击力+300", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon3_png", name: "碎片5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
    ],
    Use: [
        { icon: "achievement_icon4_png", name: "消耗品1", info: "攻击力+100", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品2", info: "攻击力+200", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品3", info: "攻击力+300", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品4", info: "攻击力+400", cost: 30, ques: 5, state: "go" },
        { icon: "achievement_icon4_png", name: "消耗品5", info: "攻击力+500", cost: 30, ques: 5, state: "go" },
    ],
};
