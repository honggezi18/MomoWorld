//游戏欢迎页面
class ShengDiScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//欢迎页面背景
    private ground:p2.Body;//场景的地板刚体
    private showBody = [];//需要同步数据的物体

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

        this.background = Tool.addBitmap(this, "map_shengdi_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        P2Tool.createPlane(World.P2World, 0, -555, 0);
        this.showBody = [];
        this.addChild(Hero.getInstance());
        this.y = -180;

        var tempEnemy = new Enemy();
        this.showBody.push(tempEnemy);
        this.addChild(new Enemy());

    }

    //同步素材
    public syncDisplay():void {
        for (var i = 0; i < this.showBody.length; i++)this.showBody[i].syncFun();
        Hero.getInstance().syncFun();
    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {

    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);
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
    }


}
