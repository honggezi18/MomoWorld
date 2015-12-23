//怪物页面
class Enemy extends egret.DisplayObjectContainer {
    public show:egret.MovieClip;//角色皮肤
    private body:p2.Body;//角色刚体
    private moveSpeed:number = 8;//角色移动的速度
    private state:string = "";//标示角色当前状态
    private oldType:string = "";//上一个操作指令


    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        this.show = Tool.addMoveClip(this, "enemy1", "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, this.show.measuredWidth, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //同步函数
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);

        //设置人物左右移动
        //if (this.show.x < this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(this.show.width / 2);
        //if (this.show.x > UIManage.target.tureWidth - this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - this.show.width / 2);

        //同步场景
        //var parent = UIManage.target;
        //if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;

    }

    //角色的移动
    public move(type:string):void {

    }

    //设置皮肤动画的切换
    public setMoveClip(type:string, time:number = -1):void {
        var scaleX = this.show.scaleX;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, "enemy1", type, 0, 0, 1, time, true);
        this.show.scaleX = scaleX;
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
