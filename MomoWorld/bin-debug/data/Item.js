//��Ʒ�����๥��
var Item = (function () {
    //���캯��
    function Item(name, x, y) {
        this._name = "1";
        this.isStand = false;
        this.isOver = false;
        this.hadPick = false; //��ʾ��ǰ�Ƿ��Ѿ�����ʰ
        this.originY = 0; //��Ʒ��ʼY������
        this.range = 25; //��Ʒ���㴥���뾶
        this.missTime = 500; //��Ʒ��ʧ�ĵȴ�ʱ��
        this._name = name;
        this.data = getItem(this._name);
        this.originY = y;
        this.show = Tool.addBitmap(UIManage.target.item, "item_" + this.data.name + "_png", x, y, GameData.bodyWidth, GameData.bodyWidth, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        this.drop();
    }
    var d = __define,c=Item;p=c.prototype;
    //���䶯��
    p.drop = function () {
        var tw1 = egret.Tween.get(this.show);
        tw1.to({ y: this.originY - 60, rotation: 360 * 3 }, 300, egret.Ease.sineIn).call(function () {
            var tw2 = egret.Tween.get(this.show);
            tw2.to({ y: this.originY + 10, rotation: 360 * 2 }, 300).call(this.stand, this);
        }, this);
    };
    //�ȴ�����
    p.stand = function () {
        this.isStand = true;
        var tw1 = egret.Tween.get(this.show);
        tw1.to({ y: this.originY }, 800).call(function () {
            var tw2 = egret.Tween.get(this.show);
            tw2.to({ y: this.originY + 10 }, 800).call(this.stand, this);
        }, this);
    };
    //��ʰ����
    p.pickUp = function () {
        if (this.hadPick || !this.isStand)
            return;
        this.hadPick = true;
        egret.Tween.removeTweens(this.show);
        var heroX = P2Tool.getEgretNum(Hero.getInstance().body.position[0]);
        var heroY = P2Tool.getEgretY(Hero.getInstance().body.position[1]) - 30;
        var tw1 = egret.Tween.get(this.show);
        tw1.to({ x: heroX, y: heroY, alpha: 0, scaleX: 0.5, scaleY: 0.5 }, 400, egret.Ease.backIn).call(this.onRemove, this);
    };
    //ͬ������
    p.syncFun = function () {
        if (this.isOver)
            return;
        this.missTime--;
        if (this.missTime < 0) {
            var tw1 = egret.Tween.get(this.show);
            tw1.to({ alpha: 0 }, 500).call(this.onRemove, this);
        }
    };
    //��������
    p.onRemove = function (e) {
        this.isOver = true;
        this.show.visible = false;
        egret.Tween.removeTweens(this.show);
        this.show.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Item;
})();
egret.registerClass(Item,"Item");
