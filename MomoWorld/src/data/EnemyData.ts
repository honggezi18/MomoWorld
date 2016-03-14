var getEnemy = function (index) {
    return window["enemy" + index];
};


var enemy1 = {
    name: "enemy1",
    blood: 500,
    exp: 50,//经验值
    dropItem: [//掉落的物品,药品，装备
        {type: "Item", id: 0, change: 0.5},
        {type: "Item", id: 0, change: 0.5},
        {type: "Item", id: 0, change: 0.5},

        {type: "Item", id: 0, change: 0.5},
        {type: "Item", id: 0, change: 0.5},
        {type: "Item", id: 0, change: 0.5},

        {type: "Drup", id: 0, change: 0.5},
    ],

    stand: {
        offsetX: -15,
        offsetY: -25,
        halfWidth: 65,//��ײ��ײ�����İ뾶
        halfHeight: 100,
        powerBase: 5,//��ײ�����Ļ���ֵ
        powerSpace: 2,//����ֵ
        baseTime: 200,//�ȴ����ʱ��
        spaceTime: 200,//�ȴ��ʱ��
    },

    walk: {
        offsetX: -15,//��ʾ�ƶ�Ƥ��ʱ��X��ƫ��ֵ
        offsetY: -25,//��ʾ�ƶ�Ƥ��ʱ��Y��ƫ��ֵ
        speed: 1,//�ƶ����ٶ�
        baseTime: 200,//�ȴ����ʱ��
        spaceTime: 200,//�ȴ��ʱ��
    },

    attack: {
        offsetX: -85,
        offsetY: -50,
        powerBase: 10,//��ײ�����Ļ���ֵ
        powerSpace: 5,//����ֵ
        range: 200
    },

    hit: {
        offsetX: -15,
        offsetY: -35,
        CD: 50
    },

    die: {
        offsetX: -30,
        offsetY: -35,
        items: [
            "0"
        ]
    },
};