//怪物页面
class Enemy extends egret.DisplayObjectContainer {
    public show:egret.MovieClip;//角色皮肤
    private body:p2.Body;//角色刚体

    private moveSpeed:number = 1;//角色移动的速度
    private moveTime:number = 0;//行走的时间


    private toward:number = 1;//当前的朝向,其中1为向左。-1为向右


    private state:string = "";//标示角色当前状态

    private oldType:string = "";//上一个操作指令

    private offsetX:number = 0;
    private offsetY:number = 0;


    constructor() {
        super();
        this.init();
    }


    //初始化资源
    public init():void {
        this.show = Tool.addMoveClip(this, "enemy1", "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 400, 50, 20, 20, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //同步函数
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;//根据向左还是向右的不同改变各个动作的偏移值
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;

        if (this.state == "move") {
            this.moveTime--;
            //设置行走约束
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward;
            //if (this.show.x < )this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed * this.toward);

            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }


        //同步场景
        //var parent = UIManage.target;
        //if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;

    }

    //角色的移动
    public action(type:string):void {
        console.log("type  " + type);

        this.state = type;
        this.offsetX = enemy1[type].offsetX;
        this.offsetY = enemy1[type].offsetY;
        var temp:egret.Bitmap = <egret.Bitmap>this.body.displays[0];
        this.setChildIndex(temp, 99);

        if (type == "move") {
            this.toward = 1;
            if (Math.random() < 0.5)this.toward = -1;
            this.moveTime = Math.floor(Math.random() * (enemy1.move.moveMaxmTime - enemy1.move.moveMinTime)) + enemy1.move.moveMinTime;
            this.setMoveClip("move");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
        }
        //else if (type == "hit") {
        //    this.setMoveClip("hit");
        //}
        //else if (type == "die") {
        //    this.setMoveClip("die");
        //}
        //else if (type == "attack") {
        //    this.setMoveClip("die");
        //}


    }

    //设置皮肤动画的切换
    public setMoveClip(type:string, time:number = -1):void {
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, "enemy1", type, 0, 0, 1, time, true);
        this.show.scaleX = this.toward;
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
