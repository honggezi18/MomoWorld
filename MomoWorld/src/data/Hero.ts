//��ͼѡ��ҳ��
class Hero extends egret.DisplayObjectContainer {
    static instance;
    private body:p2.Body;//��ɫ����
    private show:egret.MovieClip;//��ɫƤ��

    private moveSpeed:number = 2;//��ɫ�ƶ����ٶ�
    private heroState:string = "";//��ʾ��ɫ��ǰ״̬

    public static getInstance():Hero {
        if (Hero.instance == null)Hero.instance = new Hero();
        return Hero.instance;
    }

    constructor() {
        super();
        if (Hero.instance == null)UIManage.instance = this;
        else throw new Error("Hero had been Instanced");
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        this.show = Tool.addMoveClip(this, "hero_stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 50, 50, this.show.measuredWidth, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //ͬ������
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);

        //���������ƶ�
        if (this.heroState == "Left")this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed);
        else if (this.heroState == "Right")this.body.position[0] += P2Tool.getP2Num(this.moveSpeed);

        //ͬ������
        var parent = <WelcomeScene>this.show.parent;
        var DistanceX:number = this.show.x - this.parent.x;
        var DistanceY:number = this.show.x - this.parent.x;
        if (DistanceX > parent.width / 2)parent.x = this.show.x + parent.width / 2;
    }

    //��ɫ���ƶ�
    public move(type:string):void {
        this.heroState = type;
    }

    public onRemove(e:egret.Event):void {

        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
