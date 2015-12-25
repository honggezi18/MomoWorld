//�ӵ����͹���
var Bullet = (function () {
    //���캯��
    function Bullet(name, speed, toward, x, y) {
        this._name = "1";
        this.speed = 0; //�ƶ��ٶ�
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ������-1Ϊ����
        this.isOver = false;
        this._name = name;
        this.speed = speed;
        this.toward = toward;
        this.data = getBullet(this._name);
        this.show = Tool.addBitmap(UIManage.target, this.data.name + "_png", x, y, 0, 0, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.scaleX = this.toward;
    }
    var d = __define,c=Bullet;p=c.prototype;
    //ͬ������
    p.syncFun = function () {
        this.show.x -= this.speed * this.toward;
        if (this.show.x < this.show.width || this.show.x > this.show.width + UIManage.target.tureWidth)
            this.isOver = true;
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Bullet;
})();
egret.registerClass(Bullet,"Bullet");
