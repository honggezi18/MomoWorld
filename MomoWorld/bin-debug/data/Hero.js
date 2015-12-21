//��ͼѡ��ҳ��
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero() {
        _super.call(this);
        this.moveSpeed = 2; //��ɫ�ƶ����ٶ�
        this.heroState = ""; //��ʾ��ɫ��ǰ״̬
        if (Hero.instance == null)
            UIManage.instance = this;
        else
            throw new Error("Hero had been Instanced");
        this.init();
    }
    var d = __define,c=Hero;p=c.prototype;
    Hero.getInstance = function () {
        if (Hero.instance == null)
            Hero.instance = new Hero();
        return Hero.instance;
    };
    //��ʼ����Դ
    p.init = function () {
        this.show = Tool.addMoveClip(this, "hero_stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 50, 50, this.show.measuredWidth, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    };
    //ͬ������
    p.syncFun = function () {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);
        //���������ƶ�
        if (this.heroState == "Left")
            this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed);
        else if (this.heroState == "Right")
            this.body.position[0] += P2Tool.getP2Num(this.moveSpeed);
        //ͬ������
        var parent = this.show.parent;
        var DistanceX = this.show.x - this.parent.x;
        var DistanceY = this.show.x - this.parent.x;
        if (DistanceX > parent.width / 2)
            parent.x = this.show.x + parent.width / 2;
    };
    //��ɫ���ƶ�
    p.move = function (type) {
        this.heroState = type;
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Hero;
})(egret.DisplayObjectContainer);
egret.registerClass(Hero,"Hero");
