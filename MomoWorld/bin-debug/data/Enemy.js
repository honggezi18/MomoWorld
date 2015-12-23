//����ҳ��
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
        this.moveSpeed = 8; //��ɫ�ƶ����ٶ�
        this.state = ""; //��ʾ��ɫ��ǰ״̬
        this.oldType = ""; //��һ������ָ��
        this.init();
    }
    var d = __define,c=Enemy;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        this.show = Tool.addMoveClip(this, "enemy1", "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, this.show.measuredWidth, this.show.measuredHeight / 2, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    };
    //ͬ������
    p.syncFun = function () {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]);
        this.show.y = P2Tool.getEgretY(this.body.position[1]);
        //�������������ƶ�
        //if (this.show.x < this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(this.show.width / 2);
        //if (this.show.x > UIManage.target.tureWidth - this.show.width / 2)this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - this.show.width / 2);
        //ͬ������
        //var parent = UIManage.target;
        //if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;
    };
    //��ɫ���ƶ�
    p.move = function (type) {
    };
    //����Ƥ�𶯻����л�
    p.setMoveClip = function (type, time) {
        if (time === void 0) { time = -1; }
        var scaleX = this.show.scaleX;
        if (this.show != null && this.show.parent != null)
            this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, "enemy1", type, 0, 0, 1, time, true);
        this.show.scaleX = scaleX;
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Enemy;
})(egret.DisplayObjectContainer);
egret.registerClass(Enemy,"Enemy");
