var getHero = function (name) {
    if (name == "1")return hero1;
};

//主角模式
var hero1 = {
    name: "hero1",
    blood: 500,
    power: 200,
    exp: 155,
    expSpace: 200,//ÿ��������ӵľ�������
    stand: {
        offsetX: -10,
        offsetY: -17.5
    },

    walk: {
        offsetX: 5,//��ʾ�ƶ�Ƥ��ʱ��X��ƫ��ֵ����ֵͼƬ��ǰ
        offsetY: -22,//��ʾ�ƶ�Ƥ��ʱ��Y��ƫ��ֵ����ֵ��
        moveSpeed: 1.5,//�ƶ����ٶ�
    },

    jump: {
        offsetX: 10,
        offsetY: -17.5
    },

    attack: {//normalAttack
        offsetX: -12,
        offsetY: -17.5,
        powerBase: 50,//baseAttackValue
        powerSpace: 20,//
        speed: 10,//弓箭速度
        CD: 30//冷却时间
    },

    skill: {
        offsetX: -2,
        offsetY: -22.5,
        powerBase: 50,//��ײ�����Ļ���ֵ
        powerSpace: 20,//����ֵ
    },

    hit: {
        offsetX: -13,
        offsetY: -20,
        CD: 50,
        hitMove: 1,//����������󵯵�Ч��
    },

    die: {
        offsetX: 0,
        offsetY: -6
    },

    levelUp: {
        offsetX: 0,
        offsetY: -80
    },
};