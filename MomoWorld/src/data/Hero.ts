//地图选择页面
class Hero extends egret.DisplayObjectContainer {
    private body:egret.MovieClip;//角色外形本体

    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        this.body = Tool.addMoveClip(this, "hero_stand_png", 0, 0, 0, -1);
    }


    public onRemove(e:egret.Event):void {

        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
