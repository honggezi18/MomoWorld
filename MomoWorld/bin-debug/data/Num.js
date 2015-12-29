//��ֵ��,������ʾ��ֵ��ʾ
var Num = (function () {
    //���캯��
    function Num(name, x, y, text, tip) {
        if (tip === void 0) { tip = false; }
        if (text > 0)
            this.show = Tool.addBitmapText(UIManage.target, name + "_fnt", x, y, 0.8, text + "");
        else
            this.show = Tool.addBitmapText(UIManage.target, name + "_fnt", x, y, 0.8, "m");
        this.show.anchorOffsetX += this.show.measuredWidth / 2;
        this.show.anchorOffsetY += this.show.measuredHeight / 2;
        var tw = egret.Tween.get(this.show);
        tw.to({ alpha: 0.5, y: this.show.y - 100 }, 800).call(function () {
            this.show.parent.removeChild(this.show);
            this.show = null;
        }, this);
        if (tip || name == "num3") {
            this.tip = Tool.addBitmap(UIManage.target, "num_title_png", 0, 0, 0, 0, false);
            this.tip.x = this.show.x - this.show.width / 2 - this.tip.width / 3;
            this.tip.y = this.show.y - this.show.height / 2 - this.tip.height / 2;
            this.show.parent.setChildIndex(this.show, 99);
            var tw2 = egret.Tween.get(this.tip);
            tw2.to({ alpha: 0.5, y: this.tip.y - 100 }, 800).call(function () {
                this.tip.parent.removeChild(this.tip);
                this.tip = null;
            }, this);
        }
    }
    var d = __define,c=Num;p=c.prototype;
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Num;
})();
egret.registerClass(Num,"Num");
