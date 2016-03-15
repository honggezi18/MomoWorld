//����ҳ��
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy(name, x) {
        _super.call(this);
        this.offsetX = 0; //��ǰƤ����ƫ��ֵ
        this.offsetY = 0;
        this.blood = 1; //Ѫ��
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ����-1Ϊ����
        this.moveTime = 0; //���ߵ�ʱ��
        this.standTime = 0; //���ߵ�ʱ��
        this.hitCD = 0; //������ʱ����ȴʱ��
        this.actionType = ""; //��ʾ��ɫ��ǰ״̬
        this.mcType = ""; //��ʾ��ǰ����������
        this._name = "empty";
        this.isDie = false; //��ʾ�Ƿ��Ѿ�����
        this.isSkill = false; //��ʾ��ǰ�Ƿ��ڷ�������
        this.isAngry = false; //��ʾ��ǰ�Ƿ�������״̬�����Ƿ񱻹�����
        this.isMissing = false; //��ʾ��ǰ�Ƿ�����״̬,����������Ķ����޵�
        this.init(name, x);
    }
    var d = __define,c=Enemy;p=c.prototype;
    //��ʼ����Դ
    p.init = function (name, x) {
        this._name = name;
        this.data = getEnemy(this._name);
        this.blood = this.data.blood;
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, x, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2; //���õ�ǰ������ײ��
        this.body.shapes[0].collisionMask = 1; //����Щ�鷢����ײ
        this.setChildIndex(this.show, 99);
        this.action("stand");
    };
    //同步函数
    p.syncFun = function () {
        //检查死亡
        if (this.isDie)
            return;
        //this.checkHit(); //检查碰撞
        //ͬ同步皮肤
        P2Tool.syncDisplay(this.body);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward; //������������ҵĲ�ͬ�ı����������ƫ��ֵ
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        //执行动作
        if (this.actionType == "walk") {
            if (this.isAngry) {
                var walk = function () {
                    if (Hero.getInstance().body.position[0] > this.body.position[0] + P2Tool.getP2Num(50))
                        this.toward = -1;
                    else if (Hero.getInstance().body.position[0] < this.body.position[0] - P2Tool.getP2Num(50))
                        this.toward = 1;
                    this.show.scaleX = this.toward;
                    this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);
                }.bind(this);
                if (this.data.attack == null)
                    walk();
                else {
                    var distance = Math.abs(P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0]));
                    if (distance < this.data.attack.range)
                        this.action("attack");
                    else
                        walk();
                }
                return;
            }
            //��ͨ���������
            this.moveTime--;
            var tempX = this.show.measuredWidth / 2 - this.offsetX * this.toward; //��������Լ��
            var parentWidth = UIManage.target.tureWidth;
            if (this.show.x > tempX && this.show.x < parentWidth - tempX)
                this.body.position[0] -= P2Tool.getP2Num(this.data.walk.speed * this.toward);
            if (this.moveTime < 0) {
                this.body.velocity[0] = 0;
                this.action("stand");
            }
        }
        else if (this.actionType == "stand") {
            this.standTime--;
            if (this.standTime == 0)
                this.action("walk");
        }
        else if (this.actionType == "hit") {
            this.hitCD--;
            if (this.hitCD == 0)
                this.action("walk");
        }
    };
    //检测碰撞
    p.checkHit = function () {
        for (var i = 0; i < GameData.bulletArray.length; i++) {
            var tempBullet = GameData.bulletArray[i];
            if (tempBullet.isOver)
                return;
            var direction1 = Math.abs(tempBullet.show.x - P2Tool.getEgretNum(this.body.position[0]));
            if (direction1 < this.data.stand.halfWidth) {
                tempBullet.isOver = true;
                this.action("hit");
                this.isAngry = true;
                var powerSpace = Math.floor(Math.random() * Hero.getInstance().data.attack.powerSpace);
                var power = Hero.getInstance().data.attack.powerBase + powerSpace;
                this.blood -= power;
                if (powerSpace > Hero.getInstance().data.attack.powerSpace * 0.8)
                    new Num("num3", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                else
                    new Num("num2", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                return;
            }
        }
    };
    //��ɫ�Ķ���
    p.action = function (type) {
        this.actionType = type;
        var temp = this.body.displays[0];
        this.setChildIndex(temp, 99);
        if (type == "walk") {
            this.toward = 1;
            if (Math.random() < 0.5)
                this.toward = -1;
            this.moveTime = Math.floor(Math.random() * this.data.walk.spaceTime) + this.data.walk.baseTime;
            this.setMoveClip("walk");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
            this.standTime = Math.floor(Math.random() * this.data.stand.spaceTime) + this.data.stand.baseTime;
        }
        else if (type == "hit" && !this.isMissing) {
            this.isAngry = true;
            this.isSkill = false;
            this.hitCD = this.data.hit.CD;
            this.setMoveClip("hit");
        }
        else if (type == "attack") {
            this.isMissing = true;
            this.setMoveClip("attack");
        }
        else if (type == "die") {
            this.isDie = true;
            this.setMoveClip("die");
            Hero.getInstance().setData("exp", this.data.exp);
        }
    };
    //�������Ž���
    p.mcOver = function () {
        if (this.mcType == "attack") {
            this.isMissing = false;
            var distance = (P2Tool.getEgretNum(this.body.position[0]) - P2Tool.getEgretNum(Hero.getInstance().body.position[0])) * this.toward; //�ж��Ƿ������������ƶ�
            if (distance > this.data.attack.range || distance < 0) {
                this.isSkill = false;
                this.action("walk");
            }
        }
        else if (this.mcType == "die") {
            this.show = null;
            this.parent.removeChild(this);
            World.P2World.removeBody(this.body);
            var random = Math.floor(Math.random() * this.data.die.items.length);
            GameData.itemArray.push(new Item(this.data.die.items[random], P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1])));
        }
    };
    //����Ƥ���������л�
    p.setMoveClip = function (type) {
        var _this = this;
        this.mcType = type;
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)
            this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, -1, true);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        this.show.scaleX = this.toward;
        //���ö������¼�����
        this.show.addEventListener(egret.Event.LOOP_COMPLETE, this.mcOver, this);
        if (this.mcType == "attack")
            this.show.addEventListener(egret.MovieClipEvent.FRAME_LABEL, function (e) {
                if (e.frameLabel == "@attackTure")
                    _this.isSkill = true;
            }, this);
    };
    //设置人物数值
    p.setData = function (type, num) {
        if (type == "blood") {
            this.blood += num;
            if (this.blood < 0 && !this.isDie)
                this.action("die");
            return this.blood;
        }
    };
    return Enemy;
})(egret.DisplayObjectContainer);
egret.registerClass(Enemy,"Enemy");
