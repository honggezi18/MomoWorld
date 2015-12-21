//游戏欢迎页面
class WelcomeScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//欢迎页面背景
    private ground:p2.Body;//场景的地板刚体
    private showBody:Array<p2.Body>;//需要同步数据的刚体


    private absoluteX:number = 0;//标示点击的绝对坐标，即相对于背景的坐标
    private absoluteY:number = 0;//标示点击的绝对坐标，即相对于背景的坐标

    constructor() {
        super();
        this.init();

    }

    //初始化资源
    public init():void {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this.background = Tool.addBitmap(this, "welcome_background_png", 0, 0, 0, 0, true);
        P2Tool.createPlane(World.P2World, 0, -550, 0);
        this.showBody = [];
    }

    //界面刷新函数
    public flashGame():void {

    }

    //同步素材
    public syncDisplay():void {
        for (var i = 0; i < this.showBody.length; i++)P2Tool.syncDisplay(this.showBody[i]);
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

        this.showBody.push(P2Tool.createBox(this, World.P2World, this.absoluteX, this.absoluteY, 30, 30, "testColor_png", false));
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
            this.removeEventListener(egret.Event.ENTER_FRAME, this.flashGame, this);
        }
        else {
            e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    }


}
