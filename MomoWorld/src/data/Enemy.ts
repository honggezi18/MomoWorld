//怪物页面
class Enemy extends egret.DisplayObjectContainer {

    public show:egret.MovieClip;//角色皮肤
    public body:p2.Body;//角色刚体
    public data:any;//静态数据

    private offsetX:number = 0;//当前皮肤的偏移值
    private offsetY:number = 0;
    private moveSpeed:number = 1;//角色移动的速度
    private toward:number = 1;//当前的朝向,其中1为向左。-1为向右

    private moveTime:number = 0;//行走的时间
    private hitTime:number = 0;//被攻击时的冷却时间
    private dieTime:number = 0;//死亡的过程时间

    private actionType:string = "";//标示角色当前状态

    public isDie:boolean = false;//标示是否已经死亡

    private _name:string = "empty";


    constructor(name) {
        super();
        this.init(name);
    }


    //初始化资源
    public init(name):void {
        this._name = name;
        this.data = getEnemy(this._name);
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 400, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;//设置当前所在碰撞组
        this.body.shapes[0].collisionMask = 1;//与那些组发生碰撞
        this.setChildIndex(this.show, 99);
        this.action("stand");
        this.show.addEventListener(MomoEvent.attackTure, this.AT, this);
    }

    public AT():void {
        console.log("AT");
    }

    //同步函数
    public syncFun():void {
        //检测被攻击
        this.checkHit();

        //同步皮肤
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;//根据向左还是向右的不同改变各个动作的偏移值
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;

        //走路动作的实现
        if (this.actionType == "walk") {
            this.moveTime--;
            //设置行走约束
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward;
            var parentWidth = UIManage.target.tureWidth;
            if (this.show.x > tempX && this.show.x < parentWidth - tempX)this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed * this.toward);

            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }
        //被攻击的冷却计时器
        else if (this.actionType == "hit") {
            this.hitTime--;
            if (this.hitTime < 0) this.action("attack");
        }
        //死亡的冷却计时器
        else if (this.actionType == "die") {
            this.dieTime--;
            if (this.dieTime < 0) this.die();
        }

    }

    //检测被攻击
    public checkHit():void {
        for (var i = 0; i < GameData.bulletArray.length; i++) {
            var tempBullet:Bullet = GameData.bulletArray[i];
            if (tempBullet.isOver)return;
            var direction1 = Math.abs(tempBullet.show.x - P2Tool.getEgretNum(this.body.position[0]));
            if (direction1 < this.data.stand.halfWidth) {
                tempBullet.isOver = true;
                this.action("hit");
                return;
            }
        }
    }

    //角色的动作
    public action(type:string):void {
        console.log("type  " + type);

        this.actionType = type;

        var temp:egret.Bitmap = <egret.Bitmap>this.body.displays[0];
        this.setChildIndex(temp, 99);

        if (type == "walk") {
            this.toward = 1;
            if (Math.random() < 0.5)this.toward = -1;
            this.toward = 1;
            this.moveTime = Math.floor(Math.random() * (this.data.walk.moveMaxTime - this.data.walk.moveMinTime)) + this.data.walk.moveMinTime;
            this.setMoveClip("walk");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
        }
        else if (type == "hit") {
            this.hitTime = this.data.hit.hitTime;
            this.setMoveClip("hit");
        }
        else if (type == "attack") {
            this.setMoveClip("attack");
        }
        else if (type == "die") {
            this.setMoveClip("die");
            this.show.play(1);
            this.dieTime = this.data.die.dieTime;
        }


    }

    //死亡函数，回收资源和内存
    public die():void {
        console.log("die");
        this.show = null;
        this.isDie = true;
        this.parent.removeChild(this);
        World.P2World.removeBody(this.body);
    }

    //设置皮肤动画的切换
    public setMoveClip(type:string, time:number = -1):void {
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, time, true);
        this.show.scaleX = this.toward;
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
