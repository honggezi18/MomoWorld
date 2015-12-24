//地图选择页面
class Hero extends egret.DisplayObjectContainer {
    static instance;
    private body:p2.Body;//角色刚体
    private show:egret.MovieClip;//角色皮肤
    private moveSpeed:number = 8;//角色移动的速度
    private jumpPower:number = 5;//弹跳力
    private jumpState:string = "";//标示角色当前跳跃的状态
    private heroState:string = "";//标示角色当前状态
    private oldType:string = "";//上一个操作指令

    public static getInstance():Hero {
        if (Hero.instance == null)Hero.instance = new Hero();
        return Hero.instance;
    }

    constructor() {
        super();
        if (Hero.instance == null)Hero.instance = this;
        else throw new Error("Hero had been Instanced");
        this.init();
    }

    //初始化资源
    public init():void {
        this.show = Tool.addMoveClip(this, "hero_stand", "hero_stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, this.show.measuredHeight / 2, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //同步函数
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);


        //设置人物左右移动
        if (this.show.x < this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(this.show.width / 2);
        if (this.show.x > UIManage.target.tureWidth - this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - this.show.width / 2);
        if (this.heroState == "LeftDown")this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed);
        if (this.heroState == "RightDown")this.body.position[0] += P2Tool.getP2Num(this.moveSpeed);

        //同步场景
        var parent = UIManage.target;
        if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;

        //检测hero的下降
        if (this.body.velocity[1] < 0 && this.jumpState == "up")this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.heroState != "stop")this.setMoveClip("hero_walk");
            else this.setMoveClip("hero_stand");
            this.jumpState = "enpty";
        }
    }

    //角色的移动
    public move(type:string):void {
        if (this.oldType == type)return;
        console.log("type  " + type);
        this.oldType = type;
        if (type == "LeftDown" || type == "RightDown" || type == "stop") {
            if (type != "stop")this.setMoveClip("hero_walk");
            else this.setMoveClip("hero_stand");
            this.heroState = type;
        }
        if (type == "RightDown")this.show.scaleX = -1;
        else if (type == "LeftDown")this.show.scaleX = 1;
        else if (type == "JumpDown") {
            this.setMoveClip("hero_jump");
            this.jumpState = "up";
            this.body.velocity[1] = this.jumpPower;
        }

        //检测是否进入地图
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }

    }

    //设置皮肤动画的切换
    public setMoveClip(type:string, time:number = -1):void {
        var scaleX = this.show.scaleX;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, type, type, 0, 0, 1, time, true);
        this.show.scaleX = scaleX;
    }

    public onRemove(e:egret.Event):void {

        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
