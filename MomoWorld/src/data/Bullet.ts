//�ӵ����͹���
class Bullet {
    public show:egret.Bitmap;
    public data:any;//��̬����
    private _name:string = "1";
    private speed:number = 0;//�ƶ��ٶ�
    private originX:number = 0;//��ʼ���룬�����ӵ���X����
    private toward:number = 1;//��ǰ�ĳ���,����1Ϊ����-1Ϊ����
    public isOver:boolean = false;

    //���캯��
    constructor(name:string, speed:number, toward:number, x:number, y:number) {
        this._name = name;
        this.speed = speed;
        this.toward = toward;
        this.data = getBullet(this._name);
        this.show = Tool.addBitmap(UIManage.target.item, this.data.name + "_png", x, y, 0, 0, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.scaleX = this.toward;
        this.originX = x;
    }


    //ͬ������
    public syncFun():void {
        this.show.x -= this.speed * this.toward;
        var distance:number = Math.abs(this.show.x - this.originX);
        if (distance > this.data.range - 50)this.show.alpha = ( this.data.range - distance) / 50;
        if (distance > this.data.range)this.isOver = true;
    }
}
