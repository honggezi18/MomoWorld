//敌人类
class Enemy extends egret.DisplayObjectContainer {
    public show:egret.MovieClip;//��ɫƤ��
    public hitEffect:egret.MovieClip;//��ɫƤ��
    public body:p2.Body;//��ɫ����
    public data:any;//��̬���

    private offsetX:number = 0;//��ǰƤ����ƫ��ֵ
    private offsetY:number = 0;
    public blood:number = 1;//Ѫ��
    public toward:number = 1;//��ǰ�ĳ���,����1Ϊ����-1Ϊ����

    private moveTime:number = 0;//���ߵ�ʱ��
    private standTime:number = 0;//���ߵ�ʱ��
    private hitCD:number = 0;//������ʱ����ȴʱ��

    private actionType:string = "";//��ʾ��ɫ��ǰ״̬
    private mcType:string = "";//��ʾ��ǰ����������
    private _name:string = "empty";

    public isDie:boolean = false;//��ʾ�Ƿ��Ѿ�����
    public isSkill:boolean = false;//��ʾ��ǰ�Ƿ��ڷ�������
    public isAngry:boolean = false;//��ʾ��ǰ�Ƿ�������״̬�����Ƿ񱻹�����
    private isMissing:boolean = false;//��ʾ��ǰ�Ƿ�����״̬,����������Ķ����޵�


    constructor(name:string, x:number) {
        super();
        this.init(name, x);
    }

    //初始化
    public init(name:string, x:number):void {
        this._name = name;
        this.data = getEnemy(this._name);
        this.blood = this.data.blood;
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, x, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;//���õ�ǰ������ײ��
        this.body.shapes[0].collisionMask = 1;//����Щ�鷢����ײ
        this.setChildIndex(this.show, 99);
        this.action("stand");
    }

    //同步函数
    public syncFun():void {
        //检查死亡
        if (this.isDie)return;

        //this.checkHit(); //检查碰撞

        //ͬ同步皮肤
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;//������������ҵĲ�ͬ�ı����������ƫ��ֵ
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;


        //执行动作
        if (this.actionType == "walk") {
            if (this.isAngry) {//��������״̬����������
                var walk = function () {
                    if (Hero.getInstance().body.position[0] > this.body.position[0] + P2Tool.getP2Num(50))this.toward = -1;
                    else if (Hero.getInstance().body.position[0] < this.body.position[0] - P2Tool.getP2Num(50))this.toward = 1;
                    this.show.scaleX = this.toward;
                    this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);
                }.bind(this);

                if (this.data.attack == null)walk();
                else {//Momo,����жϣ����ж��Ƿ���skill������Χ�ڡ�
                    var distance:number = Math.abs(P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0]));
                    if (distance < this.data.attack.range)this.action("attack");
                    else walk();
                }
                return;
            }

            //��ͨ���������
            this.moveTime--;
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward;//��������Լ��
            var parentWidth = UIManage.target.tureWidth;
            if (this.show.x > tempX && this.show.x < parentWidth - tempX)this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);

            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }

        //�ȴ����ȴ��ʱ��
        else if (this.actionType == "stand") {
            this.standTime--;
            if (this.standTime == 0)this.action("walk");
        }

        //����������ȴ��ʱ��
        else if (this.actionType == "hit") {
            this.hitCD--;
            if (this.hitCD == 0)this.action("walk");
        }
    }

    //检测碰撞
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

    //实现各动作指令
    public action(type:string, other:any = null):void {
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
            this.isAngry = true;
            this.isSkill = false;
            this.hitCD = this.data.hit.CD;
            this.setMoveClip("hit");

            if (other != null && this.hitEffect == null) {
                this.hitEffect = Tool.addMoveClip(this, "attack_hit" + other.id, "attack_hit" + other.id,
                    P2Tool.getEgretNum(this.body.position[0]) - other.offsetX,
                    this.show.y - other.offsetY, other.scale, 1, true);
                this.hitEffect.addEventListener(egret.Event.COMPLETE, this.mcOver.bind(this, "hitEffect"), this);
            }
        }
        else if (type == "attack") {
            this.isMissing = true;
            this.setMoveClip("attack");
        }
        else if (type == "die") {
            this.isDie = true;
            this.setMoveClip("die");
            Hero.getInstance().setData("exp", this.data.exp);
        }


    }

    //动画执行结束后的回调
    public mcOver(type:string = null):void {
        if (type == "hitEffect") {
            this.removeChild(this.hitEffect);
            this.hitEffect.removeEventListener(egret.Event.COMPLETE, this.mcOver.bind(this, "hitEffect"), this);
            this.hitEffect = null;
            return;
        }
        if (this.mcType == "attack") {
            this.isMissing = false;
            var distance:number = (P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0])) * this.toward;//�ж��Ƿ������������ƶ�
            if (distance > this.data.attack.range || distance < 0) {//�����벻�㣬���л�����·����������
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

    //播放动作动画
    public setMoveClip(type:string):void {
        this.mcType = type;
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, -1, true);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        this.show.scaleX = this.toward;

        //���ö������¼�����
        this.show.addEventListener(egret.Event.LOOP_COMPLETE, this.mcOver, this);
        if (this.mcType == "attack")this.show.addEventListener(egret.MovieClipEvent.FRAME_LABEL, (e:egret.MovieClipEvent)=> {
            if (e.frameLabel == "@attackTure")this.isSkill = true;
        }, this);
    }

    //设置人物数值
    public setData(type:string, num:number):number {
        if (type == "blood") {
            this.blood += num;
            if (this.blood < 0 && !this.isDie)this.action("die");
            return this.blood;
        }
    }
}