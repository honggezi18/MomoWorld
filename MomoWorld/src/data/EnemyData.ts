var getEnemy = function (name) {
    if (name == "1")return enemy1;
};


var enemy1 = {
    name: "enemy1",

    stand: {
        offsetX: -15,
        offsetY: -25,
        halfWidth: 65,//��ײ��ײ�����İ뾶
        halfHeight: 100,
    },

    walk: {
        offsetX: -15,//��ʾ�ƶ�Ƥ��ʱ��X��ƫ��ֵ
        offsetY: -25,//��ʾ�ƶ�Ƥ��ʱ��Y��ƫ��ֵ
        moveSpeed: 2,//�ƶ����ٶ�
        moveMinTime: 200,//��·���ʱ��
        moveMaxTime: 400,//��·�ʱ��
    },

    attack: {
        offsetX: -85,
        offsetY: -50
    },

    hit: {
        offsetX: -15,
        offsetY: -35,
        hitTime: 30
    },

    die: {
        offsetX: -30,
        offsetY: -35,
        dieTime: 60
    },
};