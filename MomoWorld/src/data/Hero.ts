//地图选择页面
class Hero extends egret.DisplayObjectContainer {
    static instance;
    private body:p2.Body;//角色刚体
    private show:egret.MovieClip;//角色皮肤
    public data:any;//静态数据

    private offsetX:number = 0;//当前皮肤的偏移值
    private offsetY:number = 0;
    private toward:number = 1;//当前的朝向,其中1为向左。-1为向右
    private hitTime:number = 0;//被攻击时的冷却时间
    private dieTime:number = 0;//死亡后其他操作的触发时间
    private moveSpeed:number = 8;//角色移动的速度
    private jumpPower:number = 5;//弹跳力

    private _name:string = "1";
    private jumpState:string = "";//标示角色当前跳跃的状态
    private actionType:string = "";//运动状态

    private isDie:boolean = false;//标示是否已经死亡
    private isWalking:boolean = false;//标示当前是否正在奔跑
    private isHitting:boolean = false;//标示当前是否正在被攻击
    private isMissing:boolean = false;//标示当前是否闪避状态,即被攻击后的短暂无敌


    public static getInstance():Hero {
        if (Hero.instance == null)Hero.instance = new Hero(GameData.heroIndex);
        return Hero.instance;
    }

    constructor(name) {
        super();
        if (Hero.instance == null)Hero.instance = this;
        else throw new Error("Hero had been Instanced");
        this.init(name);
    }

    //初始化资源
    public init(name):void {
        this._name = name;
        this.data = getHero(this._name);
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;
        this.body.shapes[0].collisionMask = 1;
        this.action("stand");
    }

    //同步函数
    public syncFun():void {
        //设置被攻击检测
        this.checkHit();

        //同步人物皮肤
        P2Tool.syncDisplay(this.body);
        var bodyX = P2Tool.getEgretNum(this.body.position[0]);
        var bodyY = P2Tool.getEgretY(this.body.position[1]);
        this.show.x = bodyX + this.offsetX * this.toward;
        this.show.y = bodyY + this.offsetY;

        //设置人物左右移动
        if (this.body.position[0] < P2Tool.getP2Num(25))this.body.position[0] = P2Tool.getP2Num(25);
        if (this.body.position[0] > P2Tool.getP2Num(UIManage.target.tureWidth - 25))this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - 25);
        if (this.isWalking == true)this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed) * this.toward;

        //同步场景
        var parent = UIManage.target;
        if (bodyX > GameData.gameWidth / 2 && bodyX < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - bodyX;

        //检测hero的跳跃
        if (this.body.velocity[1] < 0 && this.jumpState == "up")this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.isWalking)this.setMoveClip("walk");
            else this.action("stand");
            this.jumpState = "empty";
        }

        //被攻击时的处理
        if (this.isMissing) {
            this.hitTime--;
            if (this.hitTime < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitTime < -80) this.isMissing = false;

        }

        //死亡时的处理
        if (this.isDie) {
            this.dieTime--;
            if (this.dieTime < 0)this.dieOver();
        }

    }

    //检测被攻击
    public checkHit():void {
        if (this.isMissing)return;
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var temp:Enemy = GameData.enemyArray[i];
            if (temp.isDie)return;

            var direction1 = Math.abs(temp.show.x - P2Tool.getEgretNum(this.body.position[0]));
            if (direction1 < temp.data.stand.halfWidth) {
                console.log("Touch!!!     direction1    " + direction1);
                this.action("hit");
                return;
            }
        }
    }

    //死亡后的操作
    public dieOver():void {
        console.log("dieOver");
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    //角色的动作
    public action(type:string):void {
        if (this.actionType == type || this.isHitting || this.isDie)return;
        //console.log("type  " + type);
        this.actionType = type;


        if (type == "RightDown" || type == "LeftDown") {
            this.toward = 1;
            this.isWalking = true;
            if (type == "RightDown")this.toward = -1;
            this.setMoveClip("walk");
        }
        else if (type == "AttackDown") {
            this.setMoveClip("attack");
            GameData.bulletArray.push(new Bullet("1", this.data.attack.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2));
        }
        else if (type == "SkillDown") {
            this.setMoveClip("skill");
        }
        else if (type == "JumpDown") {
            this.setMoveClip("jump");
            this.jumpState = "up";
            this.body.velocity[1] = this.jumpPower;
        }
        else if (type == "hit") {
            this.setMoveClip("hit");
            this.isHitting = true;
            this.isMissing = true;
            this.isWalking = false;
            this.hitTime = this.data.hit.hitTime;
            this.body.velocity[0] += this.data.hit.hitMove * this.toward;
            this.body.velocity[1] += this.data.hit.hitMove;
        }
        else if (type == "die") {
            this.isDie = true;
            this.isHitting = false;
            this.isWalking = false;
            this.setMoveClip("die");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
            this.isWalking = false;
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
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, time, true);
        this.show.scaleX = this.toward;

        this.setChildIndex(this.show, this.$children.length - 2);
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
