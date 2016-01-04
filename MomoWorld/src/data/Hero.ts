//地图选择页面
class Hero extends egret.DisplayObjectContainer {
    static instance;
    public body:p2.Body;//角色刚体
    public show:egret.MovieClip;//角色皮肤
    public show2:egret.MovieClip;//辅助皮肤
    public data:any;//静态数据

    public bloodMax:number = 1;//当前最大血量
    public blood:number = 1;//血量
    public powerMax:number = 1;//当前最大法力值
    public power:number = 1;//法力值
    public expMax:number = 1;//当前最大经验值
    public exp:number = 1;//经验值
    public level:number = 1;//当前等级
    private offsetX:number = 0;//当前皮肤的偏移值
    private offsetY:number = 0;
    private toward:number = 1;//当前的朝向,其中1为向左。-1为向右
    private attackCD:number = 0;//普通攻击的冷却时间
    private hitCD:number = 0;//被攻击时的冷却时间
    private moveSpeed:number = 8;//角色移动的速度
    private jumpPower:number = 5;//弹跳力

    private _name:string = "1";
    private jumpState:string = "";//标示角色当前跳跃的状态
    private actionType:string = "";//运动状态
    private mcType:string = "";//标示当前动画的类型

    private isDie:boolean = false;//标示是否已经死亡
    private isLevelUp:boolean = false;//标示正在升级
    private isWalking:boolean = false;//标示当前是否正在奔跑
    private isHitting:boolean = false;//标示当前是否正在被攻击
    private isMissing:boolean = false;//标示当前是否闪避状态,即被攻击后的短暂无敌
    private isAttack:boolean = false;//标示当前是否正在攻击状态


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
        this.bloodMax = this.data.blood;
        this.blood = this.data.blood;
        this.powerMax = this.data.power;
        this.power = this.data.power;
        this.expMax = this.data.exp;
        this.exp = 0;
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;
        this.body.shapes[0].collisionMask = 1;
        this.action("stand");
    }

    //同步函数
    public syncFun():void {
        if (this.blood < 0 && !this.isDie)this.action("die");

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
        if (this.isLevelUp) {//升级时的皮肤同步
            this.show2.y = P2Tool.getEgretY(this.body.position[1]) + this.data.levelUp.offsetY;
            this.show2.x = P2Tool.getEgretNum(this.body.position[0]) + this.data.levelUp.offsetX;
        }

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
            this.hitCD--;
            if (this.hitCD < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitCD < -80) this.isMissing = false;

        }

        //进行攻击时的处理
        if (this.isAttack) {
            this.attackCD--;
            if (this.attackCD < 0) {
                this.attackCD = this.data.attack.CD;
                GameData.bulletArray.push(new Bullet("1", this.data.attack.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2));
            }
        }

    }

    //检测碰撞
    public checkHit():void {
        //检测捡拾物品
        for (var i = 0; i < GameData.itemArray.length; i++) {
            var tempItem:Item = GameData.itemArray[i];
            if (Math.abs(P2Tool.getEgretNum(this.body.position[0]) - tempItem.show.x) < tempItem.range)tempItem.pickUp();
        }

        //检测被攻击
        if (this.isMissing || this.isDie)return;
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var temp:Enemy = GameData.enemyArray[i];
            if (temp.isDie)return;

            if (temp.isSkill == false) {//普通碰撞的检测
                var direction1 = Math.abs(temp.show.x - P2Tool.getEgretNum(this.body.position[0]));
                if (direction1 < temp.data.stand.halfWidth) {
                    this.action("hit");
                    var power:number = temp.data.stand.powerBase + Math.floor(Math.random() * temp.data.stand.powerSpace);
                    this.blood -= power;
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }
            else {//技能攻击的检测
                var direction1 = (P2Tool.getEgretNum(temp.body.position[0]) - P2Tool.getEgretNum(this.body.position[0])) * temp.toward;
                if (direction1 < temp.data.attack.range && direction1 > 0) {
                    this.action("hit");
                    var power:number = temp.data.attack.powerBase + Math.floor(Math.random() * temp.data.attack.powerSpace);
                    this.blood -= power;
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }

        }
    }

    //角色的动作
    public action(type:string):void {
        if (this.actionType == type || this.isHitting || this.isDie)return;
        this.actionType = type;


        if (type == "RightDown" || type == "LeftDown") {
            this.toward = 1;
            this.isAttack = false;
            this.isWalking = true;
            if (type == "RightDown")this.toward = -1;
            this.setMoveClip("walk");
        }
        else if (type == "AttackDown") {
            this.attackCD = 0;
            this.isAttack = true;
            this.isWalking = false;
            this.setMoveClip("attack");
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
            this.hitCD = this.data.hit.CD;
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
            this.isAttack = false;
            this.isWalking = false;
        }
        else if (type == "levelUp") {//升级
            this.isLevelUp = true;
            this.level++;
            this.power = this.powerMax;
            this.blood = this.bloodMax;
            this.expMax += this.data.expSpace;
            this.show2 = Tool.addMoveClip(this, "hero_levelUp", "hero_levelUp", 0, 0, 1, 1, true);
            this.show2.y = P2Tool.getEgretY(this.body.position[1]) + this.data.levelUp.offsetY;
            this.show2.x = P2Tool.getEgretNum(this.body.position[0]) + this.data.levelUp.offsetX;
            this.show2.addEventListener(egret.Event.COMPLETE, function () {
                this.removeChild(this.show2);
                this.isLevelUp = false;
                this.show2 = null;
            }, this);
        }

        //检测是否进入地图传输门
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }

    }

    //动画播放结束
    public mcOver():void {
        if (this.mcType == "die") {
            World.P2World.removeBody(this.body);
        }
    }

    //设置皮肤动画的切换
    public setMoveClip(type:string):void {
        this.mcType = type;
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, -1, true);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        this.show.addEventListener(egret.Event.LOOP_COMPLETE, this.mcOver, this);
        this.show.scaleX = this.toward;
    }
}
