//�ӵ����͹���
var Bullet = (function () {
    //���캯��
    function Bullet(name, speed, toward, x, y) {
        this._name = "1";
        this.speed = 0; //�ƶ��ٶ�
        this.originX = 0; //��ʼ���룬�����ӵ���X����
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ������-1Ϊ����
        this.isOver = false;
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
    var d = __define,c=Bullet;p=c.prototype;
    //ͬ������
    p.syncFun = function () {
        this.show.x -= this.speed * this.toward;
        var distance = Math.abs(this.show.x - this.originX);
        if (distance > this.data.range - 50)
            this.show.alpha = (this.data.range - distance) / 50;
        if (distance > this.data.range)
            this.isOver = true;
    };
    return Bullet;
})();
egret.registerClass(Bullet,"Bullet");
