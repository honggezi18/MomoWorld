//子弹模型

var getBullet = function (index) {
    return window["bullet" + index];
};

var bullet1 = {
    name: "bullet1",
    range: 350,//射程

};

var bullet2 = {
    id: 2,
    name: "bullet2",
    range: 500,//射程

    offsetX: 30,//击中目标动画的偏移值
    offsetY: 10,
    scale: 0.8//动画缩放大小
};