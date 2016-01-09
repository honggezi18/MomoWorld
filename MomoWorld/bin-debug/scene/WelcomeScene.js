//游戏欢迎页面
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        _super.call(this);
        this.absoluteX = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.absoluteY = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.tureWidth = 0;
        this.tureHeight = 0;
        this.init();
    }
    var d = __define,c=WelcomeScene;p=c.prototype;
    //初始化资源
    p.init = function () {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this._name = "欢迎页面";
        this.background = Tool.addBitmap(this, "map_welcome_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        var tempPlane = P2Tool.createPlane(World.P2World, 0, -555, 0);
        tempPlane.shapes[0].collisionMask = 3; //设置当前碰撞组，即只与这些类型的发送碰撞
        this.showBody = [];
        this.addChild(Hero.getInstance());
        this.y = -180;
    };
    //同步素材
    p.syncDisplay = function () {
        for (var i = 0; i < this.showBody.length; i++)
            P2Tool.syncDisplay(this.showBody[i]);
        Hero.getInstance().syncFun();
    };
    //触屏按下
    p.onTouchStart = function (e) {
        this.absoluteX = e.stageX - this.x;
        this.absoluteY = e.stageY - this.y;
        if (175 < this.absoluteX && this.absoluteX < 245 && 200 < this.absoluteY && this.absoluteY < 280)
            CtrlScene.getInstance().ctrlDaily("show");
        if (315 < this.absoluteX && this.absoluteX < 350 && 190 < this.absoluteY && this.absoluteY < 280)
            CtrlScene.getInstance().ctrlAhievement("show");
        if (480 < this.absoluteX && this.absoluteX < 540 && 135 < this.absoluteY && this.absoluteY < 250)
            CtrlScene.getInstance().ctrlAbility("show");
        if (110 < this.absoluteX && this.absoluteX < 175 && 325 < this.absoluteY && this.absoluteY < 395)
            CtrlScene.getInstance().ctrlWeaponShop("show");
        if (245 < this.absoluteX && this.absoluteX < 305 && 325 < this.absoluteY && this.absoluteY < 395)
            CtrlScene.getInstance().ctrlDrupShop("show");
        if (165 < this.absoluteX && this.absoluteX < 220 && 470 < this.absoluteY && this.absoluteY < 550)
            console.log("select   武器升级");
        if (5 < this.absoluteX && this.absoluteX < 100 && 425 < this.absoluteY && this.absoluteY < 550)
            console.log("select   我的储物箱");
    };
    //触屏松开
    p.onTouchEnd = function (e) {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);e
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
            Hero.getInstance().action(msg);
        }
        else if (msg == "RightUp" || msg == "LeftUp" || msg == "UpUp" || msg == "DownUp" || msg == "AttackUp" || msg == "SkillUp" || msg == "GetUp") {
            Hero.getInstance().action("stand");
        }
        else if (msg == "JumpUp") {
            Hero.getInstance().action("other");
        }
        else if (msg == "JumpDown") {
            Hero.getInstance().action("JumpDown");
        }
        else if (msg == "AttackDown") {
        }
        else if (msg == "SkillDown") {
        }
        else if (msg == "GetDown") {
        }
    };
    return WelcomeScene;
})(egret.DisplayObjectContainer);
egret.registerClass(WelcomeScene,"WelcomeScene");
