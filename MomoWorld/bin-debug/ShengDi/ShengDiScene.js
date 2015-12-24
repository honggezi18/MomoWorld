//游戏欢迎页面
var ShengDiScene = (function (_super) {
    __extends(ShengDiScene, _super);
    function ShengDiScene() {
        _super.call(this);
        this.showBody = []; //需要同步数据的物体
        this.absoluteX = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.absoluteY = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.tureWidth = 0;
        this.tureHeight = 0;
        this.testTime = 0;
        this.init();
    }
    var d = __define,c=ShengDiScene;p=c.prototype;
    //初始化资源
    p.init = function () {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this.background = Tool.addBitmap(this, "map_shengdi_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        P2Tool.createPlane(World.P2World, 0, -555, 0);
        this.showBody = [];
        this.addChild(Hero.getInstance());
        this.y = -180;
        this.enemy = new Enemy();
        this.showBody.push(this.enemy);
        this.addChild(this.enemy);
    };
    //同步素材
    p.syncDisplay = function () {
        for (var i = 0; i < this.showBody.length; i++)
            this.showBody[i].syncFun();
        Hero.getInstance().syncFun();
    };
    //触屏按下
    p.onTouchStart = function (e) {
        console.log("onTouchStart");
        this.enemy.action("move");
        //this.testTime++;
        //this.testTime %= 5;
        //if (this.testTime == 0)this.enemy.action("stand");
        //else if (this.testTime == 1)this.enemy.action("move");
        //else if (this.testTime == 2)this.enemy.action("hit");
        //else if (this.testTime == 3)this.enemy.action("die");
        //else if (this.testTime == 4)this.enemy.action("attack");
    };
    //触屏松开
    p.onTouchEnd = function (e) {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);
    };
    p.onRemove = function (e) {
        if (e.target == this) {
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }
        else {
            e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    };
    //键盘按钮的响应函数
    p.control = function (msg) {
        //console.log("control    " + msg);
        if (msg == "DownDown" || msg == "LeftDown" || msg == "RightDown" || msg == "UpDown") {
            Hero.getInstance().move(msg);
        }
        else if (msg == "RightUp" || msg == "LeftUp" || msg == "UpUp" || msg == "DownUp") {
            Hero.getInstance().move("stop");
        }
        else if (msg == "JumpUp") {
            Hero.getInstance().move("other");
        }
        else if (msg == "JumpDown") {
            Hero.getInstance().move("JumpDown");
        }
    };
    return ShengDiScene;
})(egret.DisplayObjectContainer);
egret.registerClass(ShengDiScene,"ShengDiScene");
