//怪物页面
class Enemy extends egret.DisplayObjectContainer {

    public show:egret.MovieClip;//角色皮肤
    public body:p2.Body;//角色刚体
    public data:any;//静态数据

    private offsetX:number = 0;//当前皮肤的偏移值
    private offsetY:number = 0;
    private blood:number = 1;//血量
    public toward:number = 1;//当前的朝向,其中1为向左。-1为向右

    private moveTime:number = 0;//行走的时间
    private standTime:number = 0;//行走的时间
    private hitCD:number = 0;//被攻击时的冷却时间

    private actionType:string = "";//标示角色当前状态
    private mcType:string = "";//标示当前动画的类型
    private _name:string = "empty";

    public isDie:boolean = false;//标示是否已经死亡
    public isSkill:boolean = false;//标示当前是否在发动技能
    private isAngry:boolean = false;//标示当前是否处于生气状态，即是否被攻击过
    private isMissing:boolean = false;//标示当前是否闪避状态,即被攻击后的短暂无敌


    constructor(name:string, x:number) {
        super();
        this.init(name, x);
    }

    //初始化资源
    public init(name:string, x:number):void {
        this._name = name;
        this.data = getEnemy(this._name);
        this.blood = this.data.blood;
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, x, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;//设置当前所在碰撞组
        this.body.shapes[0].collisionMask = 1;//与那些组发生碰撞
        this.setChildIndex(this.show, 99);
        this.action("stand");
    }

    //同步函数
    public syncFun():void {
        //检测死亡
        if (this.blood < 0 && !this.isDie)this.action("die");
        if (this.isDie)return;

        this.checkHit(); //检测被攻击

        //同步皮肤
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;//根据向左还是向右的不同改变各个动作的偏移值
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;


        //走路动作的实现
        if (this.actionType == "walk") {
            if (this.isAngry) {//处于生气状态，不断行走
                var walk = function () {
                    if (Hero.getInstance().body.position[0] > this.body.position[0] + P2Tool.getP2Num(50))this.toward = -1;
                    else if (Hero.getInstance().body.position[0] < this.body.position[0] - P2Tool.getP2Num(50))this.toward = 1;
                    this.show.scaleX = this.toward;
                    this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);
                }.bind(this);

                if (this.data.attack == null)walk();
                else {//Momo,添加判断，先判断是否在skill攻击范围内。
                    var distance:number = Math.abs(P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0]));
                    if (distance < this.data.attack.range)this.action("attack");
                    else walk();
                }
                return;
            }

            //普通的随机行走
            this.moveTime--;
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward;//设置行走约束
            var parentWidth = UIManage.target.tureWidth;
            if (this.show.x > tempX && this.show.x < parentWidth - tempX)this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);

            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }

        //等待的冷却计时器
        else if (this.actionType == "stand") {
            this.standTime--;
            if (this.standTime == 0)this.action("walk");
        }

        //被攻击的冷却计时器
        else if (this.actionType == "hit") {
            this.hitCD--;
            if (this.hitCD == 0)this.action("walk");
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
                this.isAngry = true;
                var powerSpace:number = Math.floor(Math.random() * Hero.getInstance().data.attack.powerSpace);
                var power:number = Hero.getInstance().data.attack.powerBase + powerSpace;
                this.blood -= power;
                if (powerSpace > Hero.getInstance().data.attack.powerSpace * 0.8)new Num("num3", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                else new Num("num2", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                return;
            }
        }
    }

    //角色的动作
    public action(type:string):void {
        this.actionType = type;
        var temp:egret.Bitmap = <egret.Bitmap>this.body.displays[0];
        this.setChildIndex(temp, 99);

        if (type == "walk") {
            this.toward = 1;
            if (Math.random() < 0.5)this.toward = -1;
            this.moveTime = Math.floor(Math.random() * this.data.walk.spaceTime) + this.data.walk.baseTime;
            this.setMoveClip("walk");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
            this.standTime = Math.floor(Math.random() * this.data.stand.spaceTime) + this.data.stand.baseTime;
        }
        else if (type == "hit" && !this.isMissing) {
            this.isSkill = false;
            this.hitCD = this.data.hit.CD;
            this.setMoveClip("hit");
        }
        else if (type == "attack") {
            this.isMissing = true;
            this.setMoveClip("attack");
        }
        else if (type == "die") {
            this.isDie = true;
            this.setMoveClip("die");
        }


    }

    //动画播放结束
    public mcOver():void {
        if (this.mcType == "attack") {
            this.isMissing = false;
            var distance:number = (P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0])) * this.toward;//判断是否继续攻击，还是移动
            if (distance > this.data.attack.range || distance < 0) {//若距离不足，则切换成走路，否则继续攻击
                this.isSkill = false;
                this.action("walk");
            }
        }
        else if (this.mcType == "die") {
            this.show = null;
            this.parent.removeChild(this);
            World.P2World.removeBody(this.body);
            var random = Math.floor(Math.random() * this.data.die.items.length);
            GameData.itemArray.push(new Item(this.data.die.items[random], P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1])));
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
        this.show.scaleX = this.toward;

        //设置动画的事件侦听
        this.show.addEventListener(egret.Event.LOOP_COMPLETE, this.mcOver, this);
        if (this.mcType == "attack")this.show.addEventListener(egret.MovieClipEvent.FRAME_LABEL, (e:egret.MovieClipEvent)=> {
            if (e.frameLabel == "@attackTure")this.isSkill = true;
        }, this);
    }
}
