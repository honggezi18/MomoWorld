//����ҳ��
class Enemy extends egret.DisplayObjectContainer {
    public show:egret.MovieClip;//��ɫƤ��
    private body:p2.Body;//��ɫ����
    private moveSpeed:number = 8;//��ɫ�ƶ����ٶ�
    private state:string = "";//��ʾ��ɫ��ǰ״̬
    private oldType:string = "";//��һ������ָ��


    constructor() {
        super();
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        this.show = Tool.addMoveClip(this, "enemy1", "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, this.show.measuredWidth, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    }

    //ͬ������
    public syncFun():void {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);

        //�������������ƶ�
        //if (this.show.x < this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(this.show.width / 2);
        //if (this.show.x > UIManage.target.tureWidth - this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - this.show.width / 2);

        //ͬ������
        //var parent = UIManage.target;
        //if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;

    }

    //��ɫ���ƶ�
    public move(type:string):void {

    }

    //����Ƥ���������л�
    public setMoveClip(type:string, time:number = -1):void {
        var scaleX = this.show.scaleX;
        if (this.show != null && this.show.parent != null)this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, "enemy1", type, 0, 0, 1, time, true);
        this.show.scaleX = scaleX;
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
