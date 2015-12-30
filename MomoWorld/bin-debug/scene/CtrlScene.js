//操作层页面
var CtrlScene = (function (_super) {
    __extends(CtrlScene, _super);
    function CtrlScene() {
        _super.call(this);
        this.isTop = false; //标示是否显示顶部
        if (CtrlScene.instance == null)
            CtrlScene.instance = this;
        else
            throw new Error("CtrlScene had been Instanced");
        World.instance.addChild(this);
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
    }
    var d = __define,c=CtrlScene;p=c.prototype;
    CtrlScene.getInstance = function () {
        if (CtrlScene.instance == null)
            CtrlScene.instance = new CtrlScene();
        return CtrlScene.instance;
    };
    //清除所有元素
    p.removeAll = function () {
        this.removeChildren();
        this.topBackgorund = null;
        this.bloodBar = null;
        this.powerBar = null;
        this.expBar = null;
        this.level = null;
        this.map = null;
    };
    //显示顶部层
    p.showTop = function () {
        this.isTop = true;
        this.topBackgorund = Tool.addBitmap(this, "ctrl_topBackground_png", 0, 0, this.width, 80);
        Tool.addBitmap(this, "ctrl_barBackground_png", 200 - 5, 35 - 5, 120 + 10, 30 + 10);
        Tool.addBitmap(this, "ctrl_barBackground_png", 350 - 5, 35 - 5, 120 + 10, 30 + 10);
        Tool.addBitmap(this, "ctrl_barBackground_png", 500 - 5, 35 - 5, 120 + 10, 30 + 10);
        this.bloodBar = Tool.addBitmap(this, "ctrl_bloodBar_png", 200, 35, 120, 30);
        this.powerBar = Tool.addBitmap(this, "ctrl_powerBar_png", 350, 35, 120, 30);
        this.expBar = Tool.addBitmap(this, "ctrl_expBar_png", 500, 35, 120, 30);
        this.bloodText = Tool.addTextField(this, 200, 10, 0, 0, 15, 0x000000, "血量:" + Hero.getInstance().blood + " / " + Hero.getInstance().bloodMax);
        this.powerText = Tool.addTextField(this, 350, 10, 0, 0, 15, 0x000000, "法力:" + Hero.getInstance().power + " / " + Hero.getInstance().powerMax);
        this.expText = Tool.addTextField(this, 500, 10, 0, 0, 15, 0x000000, "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax);
        this.level = Tool.addTextField(this, 20, 20, 0, 0, 30, 0x000000, "LEVEL:" + Hero.getInstance().level);
        this.map = Tool.addTextField(this, 700, 20, 0, 0, 30, 0x000000, UIManage.target._name);
    };
    //同步函数
    p.syncFun = function () {
        if (this.isTop) {
        }
    };
    //触屏按下
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
    };
    //触屏松开
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return CtrlScene;
})(egret.DisplayObjectContainer);
egret.registerClass(CtrlScene,"CtrlScene");
