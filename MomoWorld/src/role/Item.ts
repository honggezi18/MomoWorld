//��Ʒ������
class Item {
    public show:egret.Bitmap;
    public data:any;//��̬���
    private _name:string = "1";
    public isStand:boolean = false;
    public isOver:boolean = false;
    public hadPick:boolean = false;//��ʾ��ǰ�Ƿ��Ѿ�����ʰ
    private originY:number = 0;//��Ʒ��ʼY�����
    public range:number = 25;//��Ʒ���㴥���뾶
    private missTime:number = 500;//��Ʒ��ʧ�ĵȴ�ʱ��

    //构造函数
    constructor(name:string, x:number, y:number) {
        this._name = name;
        this.data = getItem(this._name);
        this.originY = y;
        this.show = Tool.addBitmap(UIManage.target.item, this.data.res, x, y, GameData.bodyWidth, GameData.bodyWidth, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.drop();
    }

    //物品掉落函数
    public drop():void {
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({y: this.originY - 60, rotation: 360 * 3}, 300, egret.Ease.sineIn).call(function () {
            var tw2:egret.Tween = egret.Tween.get(this.show);
            tw2.to({y: this.originY + 10, rotation: 360 * 2}, 300).call(this.stand, this);
        }, this);
    }

    //浮动函数
    public stand():void {
        this.isStand = true;
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({y: this.originY}, 800).call(function () {
            var tw2:egret.Tween = egret.Tween.get(this.show);
            tw2.to({y: this.originY + 10}, 800).call(this.stand, this);
        }, this);
    }

    //被捡拾函数
    public pickUp():void {
        if (this.hadPick || !this.isStand)return;
        this.hadPick = true;
        egret.Tween.removeTweens(this.show);
        var heroX = P2Tool.getEgretNum(Hero.getInstance().body.position[0]);
        var heroY = P2Tool.getEgretY(Hero.getInstance().body.position[1]) - 30;
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({
            x: heroX,
            y: heroY,
            alpha: 0,
            scaleX: 0.5,
            scaleY: 0.5
        }, 400, egret.Ease.backIn).call(this.onRemove, this);
    }

    //皮肤同步函数
    public syncFun():void {
        if (this.isOver)return;
        this.missTime--;
        if (this.missTime < 0) {
            var tw1:egret.Tween = egret.Tween.get(this.show);
            tw1.to({alpha: 0}, 500).call(this.onRemove, this);
        }
    }

    //移除，释放内存函数
    public onRemove(e:egret.Event):void {
        this.isOver = true;
        this.show.visible = false;
        egret.Tween.removeTweens(this.show);
        this.show.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
