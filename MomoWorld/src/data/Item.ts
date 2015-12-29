//物品掉落类攻击
class Item {
    public show:egret.Bitmap;
    public data:any;//静态数据
    private _name:string = "1";
    public isStand:boolean = false;
    public isOver:boolean = false;
    public hadPick:boolean = false;//标示当前是否已经被捡拾
    private originY:number = 0;//物品初始Y轴坐标
    public range:number = 25;//物品的陪触碰半径
    private missTime:number = 500;//物品消失的等待时间

    //构造函数
    constructor(name:string, x:number, y:number) {
        this._name = name;
        this.data = getItem(this._name);
        this.originY = y;
        this.show = Tool.addBitmap(UIManage.target.item, "item_" + this.data.name + "_png", x, y, GameData.bodyWidth, GameData.bodyWidth, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.drop();
    }

    //掉落动作
    public drop():void {
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({y: this.originY - 60, rotation: 360 * 3}, 300, egret.Ease.sineIn).call(function () {
            var tw2:egret.Tween = egret.Tween.get(this.show);
            tw2.to({y: this.originY + 10, rotation: 360 * 2}, 300).call(this.stand, this);
        }, this);
    }

    //等待动作
    public stand():void {
        this.isStand = true;
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({y: this.originY}, 800).call(function () {
            var tw2:egret.Tween = egret.Tween.get(this.show);
            tw2.to({y: this.originY + 10}, 800).call(this.stand, this);
        }, this);
    }

    //捡拾动作
    public pickUp():void {
        if (this.hadPick || !this.isStand)return;
        this.hadPick = true;
        egret.Tween.removeTweens(this.show);
        var heroX = P2Tool.getEgretNum(Hero.getInstance().body.position[0]);
        var heroY = P2Tool.getEgretY(Hero.getInstance().body.position[1]) - 30;
        var tw1:egret.Tween = egret.Tween.get(this.show);
        tw1.to({x: heroX,y: heroY, alpha: 0, scaleX: 0.5, scaleY: 0.5}, 400, egret.Ease.backIn).call(this.onRemove, this);
    }

    //同步函数
    public syncFun():void {
        if (this.isOver)return;
        this.missTime--;
        if (this.missTime < 0) {
            var tw1:egret.Tween = egret.Tween.get(this.show);
            tw1.to({alpha: 0}, 500).call(this.onRemove, this);
        }
    }

    //清除内容
    public onRemove(e:egret.Event):void {
        this.isOver = true;
        this.show.visible = false;
        egret.Tween.removeTweens(this.show);
        this.show.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
