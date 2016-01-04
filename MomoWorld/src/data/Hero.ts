//��ͼѡ��ҳ��
class Hero extends egret.DisplayObjectContainer {
    static instance;
    public body:p2.Body;//��ɫ����
    public show:egret.MovieClip;//��ɫƤ��
    public show2:egret.MovieClip;//����Ƥ��
    public data:any;//��̬����

    public bloodMax:number = 1;//��ǰ���Ѫ��
    public blood:number = 1;//Ѫ��
    public powerMax:number = 1;//��ǰ�����ֵ
    public power:number = 1;//����ֵ
    public expMax:number = 1;//��ǰ�����ֵ
    public exp:number = 1;//����ֵ
    public level:number = 1;//��ǰ�ȼ�
    private offsetX:number = 0;//��ǰƤ����ƫ��ֵ
    private offsetY:number = 0;
    private toward:number = 1;//��ǰ�ĳ���,����1Ϊ����-1Ϊ����
    private attackCD:number = 0;//��ͨ��������ȴʱ��
    private hitCD:number = 0;//������ʱ����ȴʱ��
    private moveSpeed:number = 8;//��ɫ�ƶ����ٶ�
    private jumpPower:number = 5;//������

    private _name:string = "1";
    private jumpState:string = "";//��ʾ��ɫ��ǰ��Ծ��״̬
    private actionType:string = "";//�˶�״̬
    private mcType:string = "";//��ʾ��ǰ����������

    private isDie:boolean = false;//��ʾ�Ƿ��Ѿ�����
    private isLevelUp:boolean = false;//��ʾ��������
    private isWalking:boolean = false;//��ʾ��ǰ�Ƿ����ڱ���
    private isHitting:boolean = false;//��ʾ��ǰ�Ƿ����ڱ�����
    private isMissing:boolean = false;//��ʾ��ǰ�Ƿ�����״̬,����������Ķ����޵�
    private isAttack:boolean = false;//��ʾ��ǰ�Ƿ����ڹ���״̬


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

    //��ʼ����Դ
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

    //ͬ������
    public syncFun():void {
        if (this.blood < 0 && !this.isDie)this.action("die");

        //���ñ��������
        this.checkHit();

        //ͬ������Ƥ��
        P2Tool.syncDisplay(this.body);
        var bodyX = P2Tool.getEgretNum(this.body.position[0]);
        var bodyY = P2Tool.getEgretY(this.body.position[1]);
        this.show.x = bodyX + this.offsetX * this.toward;
        this.show.y = bodyY + this.offsetY;

        //�������������ƶ�
        if (this.body.position[0] < P2Tool.getP2Num(25))this.body.position[0] = P2Tool.getP2Num(25);
        if (this.body.position[0] > P2Tool.getP2Num(UIManage.target.tureWidth - 25))this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - 25);
        if (this.isWalking == true)this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed) * this.toward;
        if (this.isLevelUp) {//����ʱ��Ƥ��ͬ��
            this.show2.y = P2Tool.getEgretY(this.body.position[1]) + this.data.levelUp.offsetY;
            this.show2.x = P2Tool.getEgretNum(this.body.position[0]) + this.data.levelUp.offsetX;
        }

        //ͬ������
        var parent = UIManage.target;
        if (bodyX > GameData.gameWidth / 2 && bodyX < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - bodyX;

        //���hero����Ծ
        if (this.body.velocity[1] < 0 && this.jumpState == "up")this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.isWalking)this.setMoveClip("walk");
            else this.action("stand");
            this.jumpState = "empty";
        }

        //������ʱ�Ĵ���
        if (this.isMissing) {
            this.hitCD--;
            if (this.hitCD < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitCD < -80) this.isMissing = false;

        }

        //���й���ʱ�Ĵ���
        if (this.isAttack) {
            this.attackCD--;
            if (this.attackCD < 0) {
                this.attackCD = this.data.attack.CD;
                GameData.bulletArray.push(new Bullet("1", this.data.attack.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2));
            }
        }

    }

    //�����ײ
    public checkHit():void {
        //����ʰ��Ʒ
        for (var i = 0; i < GameData.itemArray.length; i++) {
            var tempItem:Item = GameData.itemArray[i];
            if (Math.abs(P2Tool.getEgretNum(this.body.position[0]) - tempItem.show.x) < tempItem.range)tempItem.pickUp();
        }

        //��ⱻ����
        if (this.isMissing || this.isDie)return;
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var temp:Enemy = GameData.enemyArray[i];
            if (temp.isDie)return;

            if (temp.isSkill == false) {//��ͨ��ײ�ļ��
                var direction1 = Math.abs(temp.show.x - P2Tool.getEgretNum(this.body.position[0]));
                if (direction1 < temp.data.stand.halfWidth) {
                    this.action("hit");
                    var power:number = temp.data.stand.powerBase + Math.floor(Math.random() * temp.data.stand.powerSpace);
                    this.blood -= power;
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }
            else {//���ܹ����ļ��
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

    //��ɫ�Ķ���
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
        else if (type == "levelUp") {//����
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

        //����Ƿ�����ͼ������
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }

    }

    //�������Ž���
    public mcOver():void {
        if (this.mcType == "die") {
            World.P2World.removeBody(this.body);
        }
    }

    //����Ƥ���������л�
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
