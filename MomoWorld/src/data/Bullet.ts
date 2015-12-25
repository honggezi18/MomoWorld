//�ӵ����͹���
class Bullet {
    public show:egret.Bitmap;
    public data:any;//��̬����
    private _name:string = "1";
    private speed:number = 0;//�ƶ��ٶ�
    private toward:number = 1;//��ǰ�ĳ���,����1Ϊ����-1Ϊ����
    public isOver:boolean = false;

    //���캯��
    constructor(name:string, speed:number, toward:number, x:number, y:number) {
        this._name = name;
        this.speed = speed;
        this.toward = toward;
        this.data = getBullet(this._name);
        this.show = Tool.addBitmap(UIManage.target, this.data.name + "_png", x, y, 0, 0, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.scaleX = this.toward;
    }


    //ͬ������
    public syncFun():void {
        this.show.x -= this.speed * this.toward;
        if (this.show.x < this.show.width || this.show.x > this.show.width + UIManage.target.tureWidth)this.isOver = true;
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
