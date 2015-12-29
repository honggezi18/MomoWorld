//数值类,用于显示数值显示
class Num {
    public show:egret.BitmapText;
    public tip:egret.Bitmap;

    //构造函数
    constructor(name:string, x:number, y:number, text:number, tip:boolean = false) {
        if (text > 0)this.show = Tool.addBitmapText(UIManage.target, name + "_fnt", x, y, 0.8, text + "");
        else this.show = Tool.addBitmapText(UIManage.target, name + "_fnt", x, y, 0.8, "m");

        this.show.anchorOffsetX += this.show.measuredWidth / 2;
        this.show.anchorOffsetY += this.show.measuredHeight / 2;
        var tw:egret.Tween = egret.Tween.get(this.show);
        tw.to({alpha: 0.5, y: this.show.y - 100}, 800).call(function () {
            this.show.parent.removeChild(this.show);
            this.show = null;
        }, this);

        if (tip || name == "num3") {
            this.tip = Tool.addBitmap(UIManage.target, "num_title_png", 0, 0, 0, 0, false);
            this.tip.x = this.show.x - this.show.width / 2 - this.tip.width / 3;
            this.tip.y = this.show.y - this.show.height / 2 - this.tip.height / 2;
            this.show.parent.setChildIndex(this.show, 99);
            var tw2:egret.Tween = egret.Tween.get(this.tip);
            tw2.to({alpha: 0.5, y: this.tip.y - 100}, 800).call(function () {
                this.tip.parent.removeChild(this.tip);
                this.tip = null;
            }, this);
        }
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
