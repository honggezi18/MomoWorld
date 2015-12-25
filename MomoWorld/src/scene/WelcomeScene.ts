//游戏欢迎页面
class WelcomeScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//欢迎页面背景
    private ground:p2.Body;//场景的地板刚体
    private showBody:Array<p2.Body>;//需要同步数据的刚体

    public absoluteX:number = 0;//标示点击的绝对坐标，即相对于背景的坐标
    public absoluteY:number = 0;//标示点击的绝对坐标，即相对于背景的坐标
    public tureWidth:number = 0;
    public tureHeight:number = 0;

    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;

        this.background = Tool.addBitmap(this, "map_welcome_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        P2Tool.createPlane(World.P2World, 0, -555, 0);
        this.showBody = [];
        this.addChild(Hero.getInstance());
        this.y = -180;
    }

    //同步素材
    public syncDisplay():void {
        for (var i = 0; i < this.showBody.length; i++)P2Tool.syncDisplay(this.showBody[i]);
        Hero.getInstance().syncFun();
    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {
        console.log("stageX  " + e.stageX + "   stageY  " + e.stageY + "  nowX    " + (e.stageX - this.x) + " nowY  " + (e.stageY - this.y));
        this.absoluteX = e.stageX - this.x;
        this.absoluteY = e.stageY - this.y;
        if (175 < this.absoluteX && this.absoluteX < 245 && 200 < this.absoluteY && this.absoluteY < 280)console.log("select   每日任务");
        if (315 < this.absoluteX && this.absoluteX < 350 && 190 < this.absoluteY && this.absoluteY < 280)console.log("select   达成成就");
        if (480 < this.absoluteX && this.absoluteX < 540 && 135 < this.absoluteY && this.absoluteY < 250)console.log("select   技能升级");
        if (110 < this.absoluteX && this.absoluteX < 175 && 325 < this.absoluteY && this.absoluteY < 395)console.log("select   武器商店");
        if (245 < this.absoluteX && this.absoluteX < 305 && 325 < this.absoluteY && this.absoluteY < 395)console.log("select   药水商店");
        if (165 < this.absoluteX && this.absoluteX < 220 && 470 < this.absoluteY && this.absoluteY < 550)console.log("select   武器升级");
        if (5 < this.absoluteX && this.absoluteX < 100 && 425 < this.absoluteY && this.absoluteY < 550)console.log("select   我的储物箱");

        //this.showBody.push(P2Tool.createBox(this, World.P2World, this.absoluteX, this.absoluteY, 30, 30, "testColor_png", false));
    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);e
    }

    public onRemove(e:egret.Event):void {
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
    }

    //键盘按钮的响应函数
    private control(msg) {
        //console.log("control    " + msg);
        if (msg == "DownDown" || msg == "LeftDown" || msg == "RightDown" || msg == "UpDown") {
            Hero.getInstance().action(msg);
        }
        else if (msg == "RightUp" || msg == "LeftUp" || msg == "UpUp" || msg == "DownUp") {
            Hero.getInstance().action("stop");
        }
        else if (msg == "JumpUp") {
            Hero.getInstance().action("other");
        }
        else if (msg == "JumpDown") {
            Hero.getInstance().action("JumpDown");
        }
    }



}
