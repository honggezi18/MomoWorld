//����ҳ��
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name) {
        _super.call(this);
        this.offsetX = 0; //��ǰƤ����ƫ��ֵ
        this.offsetY = 0;
        this.moveSpeed = 1; //��ɫ�ƶ����ٶ�
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ������-1Ϊ����
        this.moveTime = 0; //���ߵ�ʱ��
        this.hitTime = 0; //������ʱ����ȴʱ��
        this.dieTime = 0; //�����Ĺ���ʱ��
        this.actionType = ""; //��ʾ��ɫ��ǰ״̬
        this.isDie = false; //��ʾ�Ƿ��Ѿ�����
        this._name = "empty";
        this.init(name);
    }
    var d = __define,c=Enemy;p=c.prototype;
    //��ʼ����Դ
    p.init = function (name) {
        this._name = name;
        this.data = getEnemy(this._name);
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 400, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2; //���õ�ǰ������ײ��
        this.body.shapes[0].collisionMask = 1; //����Щ�鷢����ײ
        this.setChildIndex(this.show, 99);
        this.action("stand");
        this.show.addEventListener(MomoEvent.attackTure, this.AT, this);
    };
    p.AT = function () {
        console.log("AT");
    };
    //ͬ������
    p.syncFun = function () {
        //���ⱻ����
        this.checkHit();
        //ͬ��Ƥ��
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward; //���������������ҵĲ�ͬ�ı�����������ƫ��ֵ
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        //��·������ʵ��
        if (this.actionType == "walk") {
            this.moveTime--;
            //��������Լ��
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward;
            var parentWidth = UIManage.target.tureWidth;
            if (this.show.x > tempX && this.show.x < parentWidth - tempX)
                this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed * this.toward);
            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }
        else if (this.actionType == "hit") {
            this.hitTime--;
            if (this.hitTime < 0)
                this.action("attack");
        }
        else if (this.actionType == "die") {
            this.dieTime--;
            if (this.dieTime < 0)
                this.die();
        }
    };
    //���ⱻ����
    p.checkHit = function () {
        for (var i = 0; i < GameData.bulletArray.length; i++) {
            var tempBullet = GameData.bulletArray[i];
            if (tempBullet.isOver)
                return;
            var direction1 = Math.abs(tempBullet.show.x - P2Tool.getEgretNum(this.body.position[0]));
            if (direction1 < this.data.stand.halfWidth) {
                tempBullet.isOver = true;
                this.action("hit");
                return;
            }
        }
    };
    //��ɫ�Ķ���
    p.action = function (type) {
        console.log("type  " + type);
        this.actionType = type;
        var temp = this.body.displays[0];
        this.setChildIndex(temp, 99);
        if (type == "walk") {
            this.toward = 1;
            if (Math.random() < 0.5)
                this.toward = -1;
            this.toward = 1;
            this.moveTime = Math.floor(Math.random() * (this.data.walk.moveMaxTime - this.data.walk.moveMinTime)) + this.data.walk.moveMinTime;
            this.setMoveClip("walk");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
        }
        else if (type == "hit") {
            this.hitTime = this.data.hit.hitTime;
            this.setMoveClip("hit");
        }
        else if (type == "attack") {
            this.setMoveClip("attack");
        }
        else if (type == "die") {
            this.setMoveClip("die");
            this.show.play(1);
            this.dieTime = this.data.die.dieTime;
        }
    };
    //����������������Դ���ڴ�
    p.die = function () {
        console.log("die");
        this.show = null;
        this.isDie = true;
        this.parent.removeChild(this);
        World.P2World.removeBody(this.body);
    };
    //����Ƥ�𶯻����л�
    p.setMoveClip = function (type, time) {
        if (time === void 0) { time = -1; }
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)
            this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, time, true);
        this.show.scaleX = this.toward;
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return Enemy;
})(egret.DisplayObjectContainer);
egret.registerClass(Enemy,"Enemy");
