var getHero = function (name) {
    if (name == "1")return hero1;
};

var hero1 = {
    name: "hero1",
    blood: 50,
    stand: {
        offsetX: -10,
        offsetY: -17.5
    },

    walk: {
        offsetX: 5,//��ʾ�ƶ�Ƥ��ʱ��X��ƫ��ֵ����ֵͼƬ��ǰ
        offsetY: -22,//��ʾ�ƶ�Ƥ��ʱ��Y��ƫ��ֵ����ֵ��
        moveSpeed: 2,//�ƶ����ٶ�
    },

    jump: {
        offsetX: 10,
        offsetY: -17.5
    },

    attack: {
        offsetX: -12,
        offsetY: -17.5,
        powerBase: 50,//��ײ�����Ļ�����ֵ
        powerSpace: 20,//����ֵ
        speed: 20,//��ͨ�������ƶ��ٶ�
        CD:25
    },

    skill: {
        offsetX: -2,
        offsetY: -22.5,
        powerBase: 50,//��ײ�����Ļ�����ֵ
        powerSpace: 20,//����ֵ
    },

    hit: {
        offsetX: -13,
        offsetY: -20,
        CD: 30,
        hitMove: 1,//�����������󵯵�Ч��
    },

    die: {
        offsetX: 0,
        offsetY: -6
    },
};