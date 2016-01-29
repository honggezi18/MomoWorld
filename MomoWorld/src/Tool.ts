//工具类
class Tool {
    static logObj(obj):void {
        console.log("---------------");
        for (var p in obj)console.log("p   " + p + ":" + obj[p]);
    }


    //添加一个显示容器
    static addDisplayContainer(target:any, x:number, y:number, width:number, height:number, isCenter:boolean = false,isScale:boolean = false):egret.DisplayObjectContainer {
        var temp = new egret.DisplayObjectContainer();
        target.addChild(temp);
        temp.x = x;
        temp.y = y;
        temp.width = width;
        temp.height = height;

        if (isCenter) {
            temp.anchorOffsetX = temp.width / 2;
            temp.anchorOffsetY = temp.height / 2;
        }
        if (isScale) {
            temp.scaleX = 0;
            temp.scaleY = 0;
        }

        return temp;
    }

    //释放某对象内存
    static clearItem(obj) {
        if (obj != null && obj.parent != null)obj.parent.removeChild(obj);
        egret.Tween.removeTweens(obj);
        return null;
    }

    //输出当前点击的坐标
    static logPosition(e:egret.TouchEvent):void {
        console.log("localX  " + e.localX + "  localY   " + e.localY + "     stageX " + e.stageX + "  stageY   " + e.stageY);
    }

    //��ȸ�ֵ
    static deepCopy(source) {
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] === 'object' ? Tool.deepCopy(source[key]) : source[key];
        }
        return result;
    }

    //���֡�����ĺ���
    static addMoveClip(target:any, res:string, type:string, x:number = 0, y:number = 0, scale:number = 1, time:number = -1, isCenter:boolean = false):egret.MovieClip {
        var data = RES.getRes(res + "_json");
        var txtr = RES.getRes(res + "_png");
        var mcFactory:egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
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
    }

    //��ȡ�����ľ���
    static getDistance(obj1:any, obj2:any):number {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));//�������ľ���
    }

    //��ȡ����ֵ
    static getRadian(angle:number):number {
        return Math.PI * angle / 180;//�Ƕ�ת��Ϊ����
    }

    //��ȡ�Ƕ�ֵ
    static getAngle(radian:number):number {
        return radian * 180 / Math.PI;//�Ƕ�ת��Ϊ����
    }

    //������м�ʱ��
    static clearTimeout():void {
        var end = setTimeout(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)clearTimeout(i);
        console.log("clearTimer");
    }

    //���ѭ����ʱ��
    static clearInterval():void {
        var end = setInterval(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)clearInterval(i);
        console.log("clearInterval");
    }

    //������ʾЧ��
    static addShowScaleEffect(obj):void {
        obj.visible = true;
        obj.scaleX = 0.3;
        obj.scaleY = 0.3;
        egret.Tween.get(obj).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, egret.Ease.elasticOut);
    }

    //��Ӱ���ʱ�ķŴ���СЧ��
    static addTouchScaleEffect(obj, target, fun:Function):void {
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
    }

    //��Ӱ�ť�ĺ���
    static addBitmap(target:any, res:string, x:number = 0, y:number = 0, width:number = 0, height:number = 0, isButton:boolean = false, isCenter:boolean = false):egret.Bitmap {
        var temp:egret.Bitmap = new egret.Bitmap();
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
            temp.addEventListener(egret.Event.REMOVED_FROM_STAGE, target.onRemove, target);//���Ƴ�ʱ�����Ϣ�ļ���
        }
        if (isCenter) {
            temp.anchorOffsetX = temp.width / 2;
            temp.anchorOffsetY = temp.height / 2;
        }
        return temp;
    }

    //���λͼ���ֵĺ���
    static addBitmapText(target:any, res:string, x:number, y:number, scale:number, text:string):egret.BitmapText {
        var temp:egret.BitmapText = new egret.BitmapText();
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
    }

    //���������
    static addTextField(target:any, x:number, y:number, width:number, height:number, size:number, color:number, text:any):egret.TextField {
        var temp:egret.TextField = new egret.TextField();
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
    }

    //���ñ��ش洢�ı���
    static setLocal(name:string, value:any):void {
        localStorage.setItem(name, value);//����bΪ"isaac"
    }

    //��ȡ���ش洢�ı���
    static getLocal(name:string):any {
        var data = localStorage.getItem(name);//��ȡb��ֵ
        return data;
    }

    //��Ȿ�ش洢�ı���
    static checkLocal(name:string):boolean {
        var b = localStorage.getItem(name);
        if (b == null || b == "")return false;
        else return true;
    }

    //�Զ���ȫλ��,ǰ�油��
    static setZero(num:number, length:number):string {
        var str = "";
        if (num.toString().length > length + 1) {
            for (var i = 0; i < length; i++)str += "9";
            return str;
        }
        else  for (var i = num.toString().length; i < length; i++)str += "0";
        return str + num.toString();
    }

    //ɾ�������е��ض�Ԫ��
    static removeOne(array, index):void {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array.length = array.length - 1;
        }
    }

}