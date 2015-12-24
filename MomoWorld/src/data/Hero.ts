//��ͼѡ��ҳ��
class Hero extends egret.DisplayObjectContainer {
    static instance;
    private body:p2.Body;//��ɫ����
    private show:egret.MovieClip;//��ɫƤ��
    private moveSpeed:number = 8;//��ɫ�ƶ����ٶ�
    private jumpPower:number = 5;//������
    private jumpState:string = "";//��ʾ��ɫ��ǰ��Ծ��״̬
    private heroState:string = "";//��ʾ��ɫ��ǰ״̬
    private oldType:string = "";//��һ������ָ��

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

    //��ʼ����Դ
    public init():void {
        this.show = Tool.addMoveClip(this, "hero_stand", "hero_stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, this.show.measuredHeight / 2, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //ͬ������
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);


        //�������������ƶ�
        if (this.show.x < this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(this.show.width / 2);
        if (this.show.x > UIManage.target.tureWidth - this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - this.show.width / 2);
        if (this.heroState == "LeftDown")this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed);
        if (this.heroState == "RightDown")this.body.position[0] += P2Tool.getP2Num(this.moveSpeed);

        //ͬ������
        var parent = UIManage.target;
        if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;

        //���hero���½�
        if (this.body.velocity[1] < 0 && this.jumpState == "up")this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.heroState != "stop")this.setMoveClip("hero_walk");
            else this.setMoveClip("hero_stand");
            this.jumpState = "enpty";
        }
    }

    //��ɫ���ƶ�
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

        //����Ƿ�����ͼ
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }

    }

    //����Ƥ���������л�
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
