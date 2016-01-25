//������
var Tool = (function () {
    function Tool() {
    }
    var d = __define,c=Tool;p=c.prototype;
    //释放某对象内存
    Tool.clearItem = function (obj) {
        if (obj != null && obj.parent != null)
            obj.parent.removeChild(obj);
        egret.Tween.removeTweens(obj);
        obj = null;
        return null;
    };
    //输出当前点击的坐标
    Tool.logPosition = function (e) {
        console.log("localX  " + e.localX + "  localY   " + e.localY + "stageX " + e.stageX + "  stageY   " + e.stageY);
    };
    //��ȸ�ֵ
    Tool.deepCopy = function (source) {
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? Tool.deepCopy(source[key]) : source[key];
        }
        return result;
    };
    //���֡�����ĺ���
    Tool.addMoveClip = function (target, res, type, x, y, scale, time, isCenter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (scale === void 0) { scale = 1; }
        if (time === void 0) { time = -1; }
        if (isCenter === void 0) { isCenter = false; }
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(type));
        mc.scaleX = scale;
        mc.scaleY = scale;
        target.addChild(mc);
        if (isCenter) {
            mc.anchorOffsetX = mc.measuredWidth / 2;
            mc.anchorOffsetY = mc.measuredHeight / 2;
        }
        mc.play(time);
        return mc;
    };
    //��ȡ�����ľ���
    Tool.getDistance = function (obj1, obj2) {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2)); //�������ľ���
    };
    //��ȡ����ֵ
    Tool.getRadian = function (angle) {
        return Math.PI * angle / 180; //�Ƕ�ת��Ϊ����
    };
    //��ȡ�Ƕ�ֵ
    Tool.getAngle = function (radian) {
        return radian * 180 / Math.PI; //�Ƕ�ת��Ϊ����
    };
    //������м�ʱ��
    Tool.clearTimeout = function () {
        var end = setTimeout(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)
            clearTimeout(i);
        console.log("clearTimer");
    };
    //���ѭ����ʱ��
    Tool.clearInterval = function () {
        var end = setInterval(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)
            clearInterval(i);
        console.log("clearInterval");
    };
    //������ʾЧ��
    Tool.addShowScaleEffect = function (obj) {
        obj.visible = true;
        obj.scaleX = 0.3;
        obj.scaleY = 0.3;
        egret.Tween.get(obj).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, egret.Ease.elasticOut);
    };
    //��Ӱ���ʱ�ķŴ���СЧ��
    Tool.addTouchScaleEffect = function (obj, target, fun) {
        obj.touchEnabled = true;
        obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function () {
            egret.Tween.get(obj).to({
                scaleX: 0.8,
                scaleY: 0.8
            }, 50);
        }, target);
        obj.addEventListener(egret.TouchEvent.TOUCH_END, function () {
            egret.Tween.get(obj).to({
                scaleX: 1,
                scaleY: 1
            }, 50).call(fun, target);
        }, target);
        obj.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, function () {
            egret.Tween.get(obj).to({
                scaleX: 1,
                scaleY: 1
            }, 50).call(fun, target);
        }, target);
    };
    //��Ӱ�ť�ĺ���
    Tool.addBitmap = function (target, res, x, y, width, height, isButton, isCenter) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        if (isButton === void 0) { isButton = false; }
        if (isCenter === void 0) { isCenter = false; }
        var temp = new egret.Bitmap();
        temp.texture = RES.getRes(res);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        target.addChild(temp);
        if (isButton) {
            temp.touchEnabled = true;
            temp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, target.onTouchStart, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, target.onTouchEnd, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_END, target.onTouchEnd, target);
            temp.addEventListener(egret.Event.REMOVED_FROM_STAGE, target.onRemove, target); //���Ƴ�ʱ�����Ϣ�ļ���
        }
        if (isCenter) {
            temp.anchorOffsetX = temp.width / 2;
            temp.anchorOffsetY = temp.height / 2;
        }
        return temp;
    };
    //���λͼ���ֵĺ���
    Tool.addBitmapText = function (target, res, x, y, scale, text) {
        var temp = new egret.BitmapText();
        temp.font = RES.getRes(res);
        if (scale != 0) {
            temp.scaleX = scale * GameData.scaleSmall;
            temp.scaleY = scale * GameData.scaleSmall;
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        temp.text = text;
        target.addChild(temp);
        return temp;
    };
    //���������
    Tool.addTextField = function (target, x, y, width, height, size, color, text) {
        var temp = new egret.TextField();
        temp.fontFamily = "Microsoft YaHei";
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.textAlign = egret.HorizontalAlign.CENTER;
        temp.textColor = color;
        temp.bold = true;
        temp.size = Math.floor(size * GameData.scaleSmall);
        temp.text = text + "";
        target.addChild(temp);
        return temp;
    };
    //���ñ��ش洢�ı���
    Tool.setLocal = function (name, value) {
        localStorage.setItem(name, value); //����bΪ"isaac"
    };
    //��ȡ���ش洢�ı���
    Tool.getLocal = function (name) {
        var data = localStorage.getItem(name); //��ȡb��ֵ
        return data;
    };
    //��Ȿ�ش洢�ı���
    Tool.checkLocal = function (name) {
        var b = localStorage.getItem(name);
        if (b == null || b == "")
            return false;
        else
            return true;
    };
    //�Զ���ȫλ��,ǰ�油��
    Tool.setZero = function (num, length) {
        var str = "";
        if (num.toString().length > length + 1) {
            for (var i = 0; i < length; i++)
                str += "9";
            return str;
        }
        else
            for (var i = num.toString().length; i < length; i++)
                str += "0";
        return str + num.toString();
    };
    //ɾ�������е��ض�Ԫ��
    Tool.removeOne = function (array, index) {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array.length = array.length - 1;
        }
    };
    return Tool;
})();
egret.registerClass(Tool,"Tool");
