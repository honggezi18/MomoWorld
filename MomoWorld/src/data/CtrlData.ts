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
        {icon: "achievement_icon1_png", skill: "技能1", name: "单攻技能1", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能2", name: "单攻技能2", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能3", name: "单攻技能3", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能4", name: "单攻技能4", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能5", name: "单攻技能5", intruction: "简介", stage: 0},
    ],
    skill2: [
        {icon: "achievement_icon1_png", skill: "技能1", name: "群攻技能1", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能2", name: "群攻技能2", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能3", name: "群攻技能3", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能4", name: "群攻技能4", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", skill: "技能5", name: "群攻技能5", intruction: "简介", stage: 0},
    ],
    data: [
        {icon: "achievement_icon1_png", type: "血量", name: "血量", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", type: "法力", name: "法力", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", type: "普攻", name: "普攻", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", type: "物抗", name: "物抗", intruction: "简介", stage: 0},
        {icon: "achievement_icon1_png", type: "法抗", name: "法抗", intruction: "简介", stage: 0},
    ]
};