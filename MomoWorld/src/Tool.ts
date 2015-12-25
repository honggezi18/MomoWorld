//工具类
class Tool {

    //深度赋值
    static deepCopy(source) {
        var result = {};
        for (var key in source) {
            result[key] = typeof source[key] ==='object'? Tool.deepCopy(source[key]) : source[key];
        }
        return result;
    }

    //添加帧动画的函数
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

    //获取两点间的距离
    static getDistance(obj1:any, obj2:any):number {
        return Math.sqrt(Math.pow(obj1.x - obj2.x, 2) + Math.pow(obj1.y - obj2.y, 2));//求两点间的距离
    }

    //获取弧度值
    static getRadian(angle:number):number {
        return Math.PI * angle / 180;//角度转化为弧度
    }

    //获取角度值
    static getAngle(radian:number):number {
        return radian * 180 / Math.PI;//角度转化为弧度
    }

    //清除所有计时器
    static clearTimeout():void {
        var end = setTimeout(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)clearTimeout(i);
        console.log("clearTimer");
    }

    //清除循环计时器
    static clearInterval():void {
        var end = setInterval(function () {
        }, 1);
        var start = (end - 100) > 0 ? end - 100 : 0;
        for (var i = start; i <= end; i++)clearInterval(i);
        console.log("clearInterval");
    }

    //弹框显示效果
    static addShowScaleEffect(obj):void {
        obj.visible = true;
        obj.scaleX = 0.3;
        obj.scaleY = 0.3;
        egret.Tween.get(obj).to({
            scaleX: 1,
            scaleY: 1
        }, 1000, egret.Ease.elasticOut);
    }

    //添加按下时的放大缩小效果
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

    //添加按钮的函数
    static addBitmap(target:any, res:string, x:number, y:number, width:number, height:number, isButton:boolean):egret.Bitmap {
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
            temp.addEventListener(egret.Event.REMOVED_FROM_STAGE, target.onRemove, target);//被移除时消除消息的监听
        }
        return temp;
    }

    //添加位图文字的函数
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

    //添加文字行
    static addTextField(target:any, x:number, y:number, width:number, height:number, size:number, color:number, text:string):egret.TextField {
        var temp:egret.TextField = new egret.TextField();
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
        temp.text = text;
        target.addChild(temp);
        return temp;
    }

    //设置本地存储的变量
    static setLocal(name:string, value:any):void {
        localStorage.setItem(name, value);//设置b为"isaac"
    }

    //获取本地存储的变量
    static getLocal(name:string):any {
        var data = localStorage.getItem(name);//获取b的值
        return data;
    }

    //检测本地存储的变量
    static checkLocal(name:string):boolean {
        var b = localStorage.getItem(name);
        if (b == null || b == "")return false;
        else return true;
    }

    //自动补全位数,前面补零
    static setZero(num:number, length:number):string {
        var str = "";
        if (num.toString().length >= length) {
            for (var i = 0; i < length; i++)str += "9";
            return str;
        }
        else  for (var i = num.toString().length; i < length; i++)str += "0";
        return str + num.toString();
    }

    //删除数组中的特定元素
    static removeOne(array, index):void {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array.length = array.length - 1;
        }
    }

}