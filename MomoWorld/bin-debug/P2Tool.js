//Egret提供的用于物理引擎的工具类
var P2Tool = (function () {
    function P2Tool() {
    }
    var d = __define,c=P2Tool;p=c.prototype;
    //设置初始信息，世界的形状和转化因子
    P2Tool.initSpace = function (factor, rectWorld) {
        this.factor = factor;
        this.worldShape = rectWorld;
    };
    //清除物理世界内容
    P2Tool.clearWorld = function (world) {
        if (world == null)
            return;
        for (var i = 0; i < world.bodies.length; i++)
            world.removeBody(world.bodies[0]);
        world.clear();
    };
    //创建矩形刚体
    P2Tool.createBox = function (target, world, x, y, w, h, resid, hadM) {
        var tempBody = new p2.Body({
            mass: 1,
            position: P2Tool.getP2Pos(x, y)
        });
        var tempBox = new p2.Box({ width: P2Tool.getP2Num(w), height: P2Tool.getP2Num(h) });
        if (resid != "") {
            var tempBitmap = Tool.addBitmap(target, resid, x, y, w, h, false);
            tempBitmap.anchorOffsetX = tempBitmap.width / 2;
            tempBitmap.anchorOffsetY = tempBitmap.height / 2;
            tempBody.displays = [tempBitmap]; //为刚体绑定皮肤
        }
        tempBody.updateMassProperties();
        tempBody.addShape(tempBox);
        if (hadM)
            tempBox.material = new p2.Material(); //设置刚体材质
        world.addBody(tempBody);
        P2Tool.syncDisplay(tempBody);
        return tempBody;
    };
    //创建圆形刚体
    P2Tool.createCircle = function (target, world, x, y, radius, resid, hadM) {
        var tempBody = new p2.Body({
            mass: 1,
            position: P2Tool.getP2Pos(x, y),
        });
        var tempBox = new p2.Circle({ radius: P2Tool.getP2Num(radius) });
        if (resid != "") {
            var tempBitmap = Tool.addBitmap(target, resid, x, y, radius * 2, radius * 2, false);
            tempBitmap.anchorOffsetX = tempBitmap.width / 2;
            tempBitmap.anchorOffsetY = tempBitmap.height / 2;
            tempBody.displays = [tempBitmap]; //为刚体绑定皮
        }
        tempBody.addShape(tempBox);
        if (hadM)
            tempBox.material = new p2.Material(); //设置刚体材质
        world.addBody(tempBody);
        P2Tool.syncDisplay(tempBody);
        return tempBody;
    };
    //创建墙面
    P2Tool.createPlane = function (world, width, height, angle) {
        var body = new p2.Body();
        var plane = new p2.Plane();
        body.addShape(plane);
        body.type = p2.Body.STATIC;
        body.position[0] = P2Tool.getP2Num(width); //设置X坐标
        body.position[1] = P2Tool.getP2Num(height); //设置Y坐标
        body.angle = Tool.getRadian(angle);
        console.log("angle   " + Tool.getRadian(angle));
        world.addBody(body);
        return body;
    };
    //设置角度
    P2Tool.setAngle = function (body, angle) {
        var radian = (3.14 * (0 - angle)) / 180;
        if (body.fixedRotation == true) {
            body.fixedRotation = false;
            body.angle = radian;
            body.fixedRotation = true;
        }
        else
            body.angle = radian;
        P2Tool.syncDisplay(body);
    };
    //数据同步，同步刚体的皮肤位置
    P2Tool.syncDisplay = function (body) {
        if (body.displays == null)
            return;
        var disp = body.displays[0];
        var loc = P2Tool.getEgretPos(body); //获取刚体在Egret世界的位置
        disp.x = loc[0];
        disp.y = loc[1];
        disp.rotation = 360 - body.angle * 180 / Math.PI;
    };
    //从物理大小转化到Egret的大小
    P2Tool.getEgretNum = function (extentP2) {
        return extentP2 * this.factor;
    };
    //从物Egret大小转化到物理大小
    P2Tool.getP2Num = function (extentEgret) {
        return extentEgret / this.factor;
    };
    //获取物体在P2中的的Y坐标
    P2Tool.getP2Y = function (yEgret) {
        return (this.worldShape.height - yEgret) / this.factor;
    };
    //获取物体在Egret中的Y坐标
    P2Tool.getEgretY = function (yP2) {
        return this.worldShape.height - yP2 * this.factor;
    };
    //将Egret坐标转化到P2坐标,可以看到Egret坐标系和P2坐标系的Y轴走向是相反的。所以不能用在基本的大小运算
    P2Tool.getP2Pos = function (xEgret, yEgret) {
        var temp = [xEgret / this.factor, (this.worldShape.height - yEgret) / this.factor];
        return temp;
    };
    //将P2坐标转化到Egret坐标
    P2Tool.getEgretPos = function (body) {
        var xP2 = body.position[0];
        var yP2 = body.position[1];
        return [xP2 * this.factor, this.worldShape.height - yP2 * this.factor];
    };
    //获取两刚体中心点的距离
    P2Tool.getDistance = function (obj1, obj2) {
        return Math.sqrt(Math.pow(P2Tool.getEgretNum(obj1.position[0]) - P2Tool.getEgretNum(obj2.position[0]), 2) + Math.pow(P2Tool.getEgretNum(obj1.position[1]) - P2Tool.getEgretNum(obj2.position[1]), 2)); //求两点间的距离
    };
    return P2Tool;
})();
egret.registerClass(P2Tool,"P2Tool");
