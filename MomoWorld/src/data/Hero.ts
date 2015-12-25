//��ͼѡ��ҳ��
class Hero extends egret.DisplayObjectContainer {
    static instance;
    private body:p2.Body;//��ɫ����
    private show:egret.MovieClip;//��ɫƤ��
    public data:any;//��̬����

    private offsetX:number = 0;//��ǰƤ����ƫ��ֵ
    private offsetY:number = 0;
    private toward:number = 1;//��ǰ�ĳ���,����1Ϊ����-1Ϊ����
    private hitTime:number = 0;//������ʱ����ȴʱ��
    private dieTime:number = 0;//���������������Ĵ���ʱ��
    private moveSpeed:number = 8;//��ɫ�ƶ����ٶ�
    private jumpPower:number = 5;//������

    private _name:string = "1";
    private jumpState:string = "";//��ʾ��ɫ��ǰ��Ծ��״̬
    private actionType:string = "";//�˶�״̬

    private isDie:boolean = false;//��ʾ�Ƿ��Ѿ�����
    private isWalking:boolean = false;//��ʾ��ǰ�Ƿ����ڱ���
    private isHitting:boolean = false;//��ʾ��ǰ�Ƿ����ڱ�����
    private isMissing:boolean = false;//��ʾ��ǰ�Ƿ�����״̬,����������Ķ����޵�


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
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;
        this.body.shapes[0].collisionMask = 1;
        this.action("stand");
    }

    //ͬ������
    public syncFun():void {
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
            this.hitTime--;
            if (this.hitTime < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitTime < -80) this.isMissing = false;

        }

        //����ʱ�Ĵ���
        if (this.isDie) {
            this.dieTime--;
            if (this.dieTime < 0)this.dieOver();
        }

    }

    //��ⱻ����
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

    //������Ĳ���
    public dieOver():void {
        console.log("dieOver");
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }

    //��ɫ�Ķ���
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


        //����Ƿ�����ͼ
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }

    }

    //����Ƥ���������л�
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
