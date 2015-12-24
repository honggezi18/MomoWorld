//����ҳ��
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        _super.call(this);
        this.moveSpeed = 1; //��ɫ�ƶ����ٶ�
        this.moveTime = 0; //���ߵ�ʱ��
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ������-1Ϊ����
        this.state = ""; //��ʾ��ɫ��ǰ״̬
        this.oldType = ""; //��һ������ָ��
        this.offsetX = 0;
        this.offsetY = 0;
        this.init();
    }
    var d = __define,c=Enemy;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        this.show = Tool.addMoveClip(this, "enemy1", "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 400, 50, 20, 20, "testColor_png", false);
        this.setChildIndex(this.show, 99);
    };
    //ͬ������
    p.syncFun = function () {
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward; //���������������ҵĲ�ͬ�ı�����������ƫ��ֵ
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        if (this.state == "move") {
            this.moveTime--;
            this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed * this.toward);
            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }
        //ͬ������
        //var parent = UIManage.target;
        //if (this.show.x > GameData.gameWidth / 2 && this.show.x < parent.measuredWidth - GameData.gameWidth / 2) parent.x = GameData.gameWidth / 2 - this.show.x;
    };
    //��ɫ���ƶ�
    p.action = function (type) {
        console.log("type  " + type);
        this.state = type;
        this.offsetX = enemy1[type].offsetX;
        this.offsetY = enemy1[type].offsetY;
        var temp = this.body.displays[0];
        this.setChildIndex(temp, 99);
        if (type == "move") {
            this.toward = 1;
            if (Math.random() < 0.5)
                this.toward = -1;
            this.moveTime = Math.floor(Math.random() * (enemy1.move.moveMax - enemy1.move.moveMin)) + enemy1.move.moveMin;
            this.setMoveClip("move");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
        }
        //else if (type == "hit") {
        //    this.setMoveClip("hit");
        //}
        //else if (type == "die") {
        //    this.setMoveClip("die");
        //}
        //else if (type == "attack") {
        //    this.setMoveClip("die");
        //}
    };
    //����Ƥ�𶯻����л�
    p.setMoveClip = function (type, time) {
        if (time === void 0) { time = -1; }
        if (this.show != null && this.show.parent != null)
            this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, "enemy1", type, 0, 0, 1, time, true);
        this.show.scaleX = this.toward;
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Enemy;
})(egret.DisplayObjectContainer);
egret.registerClass(Enemy,"Enemy");
