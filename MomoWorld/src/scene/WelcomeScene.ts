//游戏欢迎页面
class WelcomeScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//欢迎页面背景

    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        this.width = 800;
        this.height = 480;
    }

    //控制难度选择框的出现和消失
    public ctrlSelect():void {

    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {
    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
