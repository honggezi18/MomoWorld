//子弹类型对象的相关信息文件

//获取特定的子弹对象信息
var getBullet = function (index) {
    return window["bullet" + index];
};

//子弹类型一
var bullet1 = {
    name: "普通弓箭",//子弹名
    range: 350,//射程
};

//子弹类型二
var bullet2 = {
    id: 2,//子弹ID，用于索引图标信息
    name: "加速箭",//子弹名
    range: 500,//射程
    offsetX: 30,//击中目标动画的X轴偏移值
    offsetY: 10,//击中目标动画的Y轴偏移值
    scale: 0.8//击中目标动画缩放大小
};