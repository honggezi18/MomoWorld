//主角控制器
var Hero = (function (_super) {
    __extends(Hero, _super);
    function Hero(name) {
        _super.call(this);
        this.bloodMax = 1; //?????????
        this.blood = 1; //???
        this.powerMax = 1; //?????????
        this.power = 1; //?????
        this.expMax = 1; //?????????
        this.exp = 1; //?????
        this.level = 1; //??????
        this.offsetX = 0; //????????????
        this.offsetY = 0;
        this.toward = 1; //????????,????1?????-1?????
        this.attackCD = 0; //???????????????
        this.hitCD = 0; //???????????????
        this.moveSpeed = 8; //???????????
        this.jumpPower = 5; //??????
        this.skillIndex = -1; //触发技能的技能下标
        this._name = "1";
        this.jumpState = ""; //????????????????
        this.actionType = ""; //?????
        this.mcType = ""; //????????????????
        this.isDie = false; //表示是否处于死亡状态
        this.isLevelUp = false; //表示是否升级
        this.isWalking = false; //表示是否正在行走
        this.isHitting = false; //表示是否正在被攻击
        this.isMissing = false; //表示是否正在处于无敌状态
        this.isSkilling = false; //表示是否正在处于发动技能状态
        this.isAttack = false; //表示是否正在进行普通攻击
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
    //初始化
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
    //同步函数
    p.syncFun = function () {
        if (this.blood < 0 && !this.isDie)
            this.action("die");
        this.checkHit(); //检测碰撞
        //同步皮肤
        P2Tool.syncDisplay(this.body);
        var bodyX = P2Tool.getEgretNum(this.body.position[0]);
        var bodyY = P2Tool.getEgretY(this.body.position[1]);
        this.show.x = bodyX + this.offsetX * this.toward;
        this.show.y = bodyY + this.offsetY;
        //???????????????
        if (this.body.position[0] < P2Tool.getP2Num(25))
            this.body.position[0] = P2Tool.getP2Num(25);
        if (this.body.position[0] > P2Tool.getP2Num(UIManage.target.tureWidth - 25))
            this.body.position[0] = P2Tool.getP2Num(UIManage.target.tureWidth - 25);
        if (this.isWalking == true)
            this.body.position[0] -= P2Tool.getP2Num(this.moveSpeed) * this.toward;
        if (this.isLevelUp) {
            this.show2.y = P2Tool.getEgretY(this.body.position[1]) + this.data.levelUp.offsetY;
            this.show2.x = P2Tool.getEgretNum(this.body.position[0]) + this.data.levelUp.offsetX;
        }
        //???????
        var parent = UIManage.target;
        if (bodyX > GameData.gameWidth / 2 && bodyX < parent.measuredWidth - GameData.gameWidth / 2)
            parent.x = GameData.gameWidth / 2 - bodyX;
        //???hero?????
        if (this.body.velocity[1] < 0 && this.jumpState == "up")
            this.jumpState = "down";
        if (this.body.velocity[1] > 0 && this.jumpState == "down") {
            if (this.isWalking)
                this.setMoveClip("walk");
            else
                this.action("stand");
            this.jumpState = "empty";
        }
        //进行普通攻击的CD
        if (this.attackCD > 0)
            this.attackCD--;
        //处于无敌状态
        if (this.isMissing) {
            this.hitCD--;
            if (this.hitCD < 0 && this.isHitting == true) {
                this.isHitting = false;
                this.action("stand");
            }
            if (this.hitCD < -80)
                this.isMissing = false;
        }
        //按下攻击键不放，进行连续攻击
        if (this.isAttack) {
            if (this.attackCD < 1) {
                this.attackCD = this.data.attack.CD;
                GameData.bulletArray.push(new Bullet("1", this.data.attack.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2, this.data.attack.powerBase, this.data.attack.powerSpace));
            }
        }
        //按下攻击键不放，进行连续攻击
        if (this.isSkilling) {
            if (this.attackCD < 1) {
                console.log("this.skill    " + this.skillIndex);
                var tempSkill = this.data["skill" + this.skillIndex]; //获取技能信息
                if (this.setData("power", -tempSkill.cost) > -1) {
                    this.attackCD = tempSkill.CD;
                    switch (this.skillIndex) {
                        case 0:
                            GameData.bulletArray.push(new Bullet("1", tempSkill.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2, tempSkill.powerBase, tempSkill.powerSpace));
                            break;
                        case 1:
                            GameData.bulletArray.push(new Bullet("1", tempSkill.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2, tempSkill.powerBase, tempSkill.powerSpace));
                            window.setTimeout(function () {
                                GameData.bulletArray.push(new Bullet("1", tempSkill.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2, tempSkill.powerBase, tempSkill.powerSpace));
                            }.bind(this), 100);
                            break;
                        case 2:
                            GameData.bulletArray.push(new Bullet("2", tempSkill.speed, this.toward, P2Tool.getEgretNum(this.body.position[0]) - GameData.bodyWidth * this.toward, P2Tool.getEgretY(this.body.position[1]) - GameData.bodyWidth / 2, tempSkill.powerBase, tempSkill.powerSpace));
                            break;
                        case 0:
                            break;
                    }
                }
            }
        }
    };
    //碰撞检测
    p.checkHit = function () {
        //????????
        for (var i = 0; i < GameData.itemArray.length; i++) {
            var tempItem = GameData.itemArray[i];
            if (Math.abs(P2Tool.getEgretNum(this.body.position[0]) - tempItem.show.x) < tempItem.range)
                tempItem.pickUp();
        }
        //???????
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
                    new Num("num1", P2Tool.getEgretNum(this.body.position[0]), P2Tool.getEgretY(this.body.position[1]) - 50, power);
                    return;
                }
            }
        }
    };
    //动作实现
    p.action = function (type, other) {
        if (other === void 0) { other = null; }
        if (this.actionType == type || this.isHitting || this.isDie)
            return;
        this.actionType = type;
        if (type == "RightDown" || type == "LeftDown") {
            this.toward = 1;
            this.isAttack = false;
            this.isWalking = true;
            if (type == "RightDown")
                this.toward = -1;
            this.setMoveClip("walk");
        }
        else if (type == "AttackDown") {
            if (this.attackCD > 0)
                return;
            this.isAttack = true;
            this.isWalking = false;
            this.setMoveClip("attack");
        }
        else if (type == "SkillDown") {
            if (!this.isSkilling)
                this.attackCD = 0;
            if (this.attackCD > 0 || this.power < 1)
                return;
            this.isAttack = false;
            this.isWalking = false;
            this.setSkill(other);
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
            this.isSkilling = false;
        }
        else if (type == "levelUp") {
            this.isLevelUp = true;
            this.level++;
            this.power = this.powerMax;
            this.blood = this.bloodMax;
            this.expMax += this.data.expSpace;
            this.show2 = Tool.addMoveClip(this, "hero_levelUp", "hero_levelUp", 0, 0, 1, 1, true);
            this.show2.y = P2Tool.getEgretY(this.body.position[1]) + this.data.levelUp.offsetY;
            this.show2.x = P2Tool.getEgretNum(this.body.position[0]) + this.data.levelUp.offsetX;
            this.show2.addEventListener(egret.Event.COMPLETE, function () {
                this.removeChild(this.show2);
                this.isLevelUp = false;
                this.show2 = null;
            }, this);
        }
        //点击向上键，进入地图选择页面
        if (type == "UpDown" && this.show.x > 1840 && this.show.x < 1945) {
            UIManage.getInstance().hideWelcome();
            UIManage.getInstance().showMap();
        }
    };
    //帧动画播放完成后的回调
    p.mcOver = function () {
        if (this.mcType == "die") {
            World.P2World.removeBody(this.body);
        }
    };
    //帧动画播放
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
    //设置人物数值
    p.setData = function (type, num) {
        if (type == "blood") {
            this.blood += num;
            if (this.blood > this.bloodMax)
                this.blood = this.bloodMax;
            return this.blood;
        }
        else if (type == "power") {
            this.power += num;
            if (this.power > this.powerMax)
                this.power = this.powerMax;
            else if (this.power < 0) {
                this.power -= num;
                return this.power + num;
            }
            return this.power;
        }
        else if (type == "exp") {
            this.exp += num;
            if (this.exp >= this.expMax) {
                this.exp -= this.expMax;
                this.action("levelUp");
            }
            return this.exp;
        }
    };
    //角色技能的实现
    p.setSkill = function (index) {
        console.log("setSkill   " + index);
        this.skillIndex = index;
        this.isSkilling = true;
        switch (index) {
            case 0:
                this.setMoveClip("attack");
                break;
            case 1:
                this.setMoveClip("attack");
                break;
            case 2:
                this.setMoveClip("attack");
                break;
            case 3:
                break;
        }
    };
    return Hero;
})(egret.DisplayObjectContainer);
egret.registerClass(Hero,"Hero");
