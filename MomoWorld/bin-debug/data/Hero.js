//��ͼѡ��ҳ��
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Hero;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        this.body = Tool.addMoveClip(this, "hero_stand_png", 0, 0, 0, -1);
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Hero;
})(egret.DisplayObjectContainer);
egret.registerClass(Hero,"Hero");
