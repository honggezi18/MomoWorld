//��ͼѡ��ҳ��
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(name) {
        _super.call(this);
        this.bloodMax = 1; //��ǰ����Ѫ��
        this.blood = 1; //Ѫ��
        this.powerMax = 1; //��ǰ��������ֵ
        this.power = 1; //����ֵ
        this.expMax = 1; //��ǰ��������ֵ
        this.exp = 1; //����ֵ
        this.level = 1; //��ǰ�ȼ�
        this.offsetX = 0; //��ǰƤ����ƫ��ֵ
        this.offsetY = 0;
        this.toward = 1; //��ǰ�ĳ���,����1Ϊ������-1Ϊ����
        this.attackCD = 0; //��ͨ��������ȴʱ��
        this.hitCD = 0; //������ʱ����ȴʱ��
        this.moveSpeed = 8; //��ɫ�ƶ����ٶ�
        this.jumpPower = 5; //������
        this._name = "1";
        this.jumpState = ""; //��ʾ��ɫ��ǰ��Ծ��״̬
        this.actionType = ""; //�˶�״̬
        this.mcType = ""; //��ʾ��ǰ����������
        this.isDie = false; //��ʾ�Ƿ��Ѿ�����
        this.isWalking = false; //��ʾ��ǰ�Ƿ����ڱ���
        this.isHitting = false; //��ʾ��ǰ�Ƿ����ڱ�����
        this.isMissing = false; //��ʾ��ǰ�Ƿ�����״̬,�����������Ķ����޵�
        this.isAttack = false; //��ʾ��ǰ�Ƿ����ڹ���״̬
        if (Hero.instance == null)
            Hero.instance = this;
        else
            throw new Error("Hero had been Instanced");
        this.init(name);
    }
    var d = __define,c=Hero;p=c.prototype;
    Hero.getInstance = function () {
        if (Hero.instance == null)
            Hero.instance = new Hero(GameData.heroIndex);
        return Hero.instance;
    };
    //��ʼ����Դ
    p.init = function (name) {
        this._name = name;
        this.data = getHero(this._name);
        this.bloodMax = this.data.blood;
        this.blood = this.data.blood;
        this.powerMax = this.data.power;
        this.power = this.data.power;
        this.expMax = this.data.exp;
        this.exp = 0;
        this.show = Tool.addMoveClip(this, this.data.name, "stand", 0, 0, 1, -1, true);
        this.body = P2Tool.createBox(this, World.P2World, 200, 50, GameData.bodyWidth, GameData.bodyWidth, "testColor_png", false);
        this.body.shapes[0].collisionGroup = 2;
        this.body.shapes[0].collisionMask = 1;
        this.action("stand");
    };
    //ͬ������
    p.syncFun = function () {
        if (this.blood < 0 && !this.isDie)
            this.action("die");
        //���ñ���������
        this.checkHit();
        //ͬ������Ƥ��
        P2Tool.syncDisplay(this.body);
        var bodyX = P2Tool.getEgretNum(this.body.position[0]);
        var bodyY = P2Tool.getEgretY(this.body.position[1]);
        this.show.x = bodyX + this.offsetX * this.toward;
        this.show.y = bodyY + this.offsetY;
        //�������������ƶ�
        if (this.body.position[0] < P2Tool.getP2Num(25))
            this.body.position[0] = P2Tool.getP2Num(25);
        if (this.body.position[0] > P2Tool.getP2Num(UIManage.target.tureWidth - 25))
            this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - 25);
        if (this.isWalking == true)
            this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed) * this.toward;
        //ͬ������
        var parent = UIManage.target;
        if (bodyX > GameData.gameWidth / 2 && bodyX < parent.measuredWidth - GameData.gameWidth / 2)
            parent.x = GameData.gameWidth / 2 - bodyX;
        //����hero����Ծ
        if (this.body.velocity[1] < 0 && this.jumpState == "up")
            this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.isWalking)
                this.setMoveClip("walk");
            else
                this.action("stand");
            this.jumpState = "empty";
        }
        //������ʱ�Ĵ���
        if (this.isMissing) {
            this.hitCD--;
            if (this.hitCD < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitCD < -80)
                this.isMissing = false;
        }
        //���й���ʱ�Ĵ���
        if (this.isAttack) {
            this.attackCD--;
            if (this.attackCD < 0) {
                this.attackCD = this.data.attack.CD;
                GameData.bulletArray.push(new Bullet("1", this.data.attack.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2));
            }
        }
    };
    //������ײ
    p.checkHit = function () {
        //������ʰ��Ʒ
        for (var i = 0; i < GameData.itemArray.length; i++) {
            var tempItem = GameData.itemArray[i];
            if (Math.abs(P2Tool.getEgretNum(this.body.position[0]) - tempItem.show.x) < tempItem.range)
                tempItem.pickUp();
        }
        //���ⱻ����
        if (this.isMissing || this.isDie)
            return;
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var temp = GameData.enemyArray[i];
            if (temp.isDie)
                return;
            if (temp.isSkill == false) {
                var direction1 = Math.abs(temp.show.x - P2Tool.getEgretNum(this.body.position[0]));
                if (direction1 < temp.data.stand.halfWidth) {
                    this.action("hit");
                    var power = temp.data.stand.powerBase + Math.floor(Math.random() * temp.data.stand.powerSpace);
                    this.blood -= power;
                    console.log("Hero blood   " + this.blood);
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }
            else {
                var direction1 = (P2Tool.getEgretNum(temp.body.position[0]) - P2Tool.getEgretNum(this.body.position[0])) * temp.toward;
                if (direction1 < temp.data.attack.range && direction1 > 0) {
                    this.action("hit");
                    var power = temp.data.attack.powerBase + Math.floor(Math.random() * temp.data.attack.powerSpace);
                    this.blood -= power;
                    console.log("Hero blood   " + this.blood);
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }
        }
    };
    //��ɫ�Ķ���
    p.action = function (type) {
        if (this.actionType == type || this.isHitting || this.isDie)
            return;
        this.actionType = type;
        if (type == "RightDown" || type == "LeftDown") {
            this.toward = 1;
            this.isWalking = true;
            if (type == "RightDown")
                this.toward = -1;
            this.setMoveClip("walk");
        }
        else if (type == "AttackDown") {
            this.attackCD = 0;
            this.isAttack = true;
            this.setMoveClip("attack");
        }
        else if (type == "SkillDown") {
            this.setMoveClip("skill");
        }
        else if (type == "JumpDown") {
            this.setMoveClip("jump");
            this.jumpState = "up";
            this.body.velocity[1] = this.jumpPower;
        }
        else if (type == "hit") {
            this.setMoveClip("hit");
            this.isHitting = true;
            this.isMissing = true;
            this.isWalking = false;
            this.hitCD = this.data.hit.CD;
            this.body.velocity[0] += this.data.hit.hitMove * this.toward;
            this.body.velocity[1] += this.data.hit.hitMove;
        }
        else if (type == "die") {
            this.isDie = true;
            this.isHitting = false;
            this.isWalking = false;
            this.setMoveClip("die");
        }
        else if (type == "stand") {
            this.setMoveClip("stand");
            this.isAttack = false;
            this.isWalking = false;
        }
        //�����Ƿ�������ͼ
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            console.log("UpDown");
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }
    };
    //�������Ž���
    p.mcOver = function () {
        if (this.mcType == "die") {
            World.P2World.removeBody(this.body);
        }
    };
    //����Ƥ�𶯻����л�
    p.setMoveClip = function (type) {
        this.mcType = type;
        this.offsetX = this.data[type].offsetX;
        this.offsetY = this.data[type].offsetY;
        if (this.show != null && this.show.parent != null)
            this.removeChild(this.show);
        this.show = Tool.addMoveClip(this, this.data.name, type, 0, 0, 1, -1, true);
        this.show.x = P2Tool.getEgretNum(this.body.position[0]) + this.offsetX * this.toward;
        this.show.y = P2Tool.getEgretY(this.body.position[1]) + this.offsetY;
        this.show.addEventListener(egret.Event.LOOP_COMPLETE, this.mcOver, this);
        this.show.scaleX = this.toward;
    };
    return Hero;
})(egret.DisplayObjectContainer);
egret.registerClass(Hero,"Hero");
