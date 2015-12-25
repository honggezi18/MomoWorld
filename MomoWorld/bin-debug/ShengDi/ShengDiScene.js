//游戏欢迎页面
var ShengDiScene = (function (_super) {
    __extends(ShengDiScene, _super);
    function ShengDiScene() {
        _super.call(this);
        this.absoluteX = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.absoluteY = 0; //标示点击的绝对坐标，即相对于背景的坐标
        this.tureWidth = 0;
        this.tureHeight = 0;
        this.testTime = 0;
        this.init();
    }
    var d = __define,c=ShengDiScene;p=c.prototype;
    //初始化资源
    p.init = function () {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this.background = Tool.addBitmap(this, "map_shengdi_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        var tempPlane = P2Tool.createPlane(World.P2World, 0, -555, 0);
        tempPlane.shapes[0].collisionMask = 3; //设置当前碰撞组，即只与这些类型的发送碰撞
        this.addChild(Hero.getInstance());
        this.y = -180;
        this.enemy = new Enemy("1");
        GameData.enemyArray.push(this.enemy);
        this.addChild(this.enemy);
    };
    //同步素材//先清空，再同步
    p.syncDisplay = function () {
        //释放内存，消除enemy
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var tempEnemy = GameData.enemyArray[i];
            if (tempEnemy.isDie) {
                Tool.removeOne(GameData.enemyArray, i);
                i--;
            }
        }
        //释放内存，消除子弹
        for (var i = 0; i < GameData.bulletArray.length; i++) {
            var tempBullet = GameData.bulletArray[i];
            if (tempBullet.isOver) {
                tempBullet.show.parent.removeChild(tempBullet.show);
                Tool.removeOne(GameData.bulletArray, i);
                console.log("bulletArray   " + GameData.bulletArray.length);
                i--;
            }
        }
        Hero.getInstance().syncFun(); //同步英雄
        for (var i = 0; i < GameData.enemyArray.length; i++)
            GameData.enemyArray[i].syncFun();
        for (var i = 0; i < GameData.bulletArray.length; i++)
            GameData.bulletArray[i].syncFun();
    };
    //触屏按下
    p.onTouchStart = function (e) {
        console.log("onTouchStart");
        //Hero.getInstance().action("hit");
        //this.enemy.action("die");
        Hero.getInstance().checkHit();
        //this.testTime++;
        //this.testTime %= 5;
        //if (this.testTime == 0)this.enemy.action("stand");
        //else if (this.testTime == 1)this.enemy.action("move");
        //else if (this.testTime == 2)this.enemy.action("hit");
        //else if (this.testTime == 3)this.enemy.action("die");
        //else if (this.testTime == 4)this.enemy.action("attack");
    };
    //触屏松开
    p.onTouchEnd = function (e) {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);
    };
    p.onRemove = function (e) {
        if (e.target == this) {
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
        }
        else {
            e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        }
    };
    //键盘按钮的响应函数
    p.control = function (msg) {
        //console.log("control    " + msg);
        if (msg == "DownDown" || msg == "LeftDown" || msg == "RightDown" || msg == "UpDown") {
            Hero.getInstance().action(msg);
        }
        else if (msg == "RightUp" || msg == "LeftUp" || msg == "UpUp" || msg == "DownUp" || msg == "AttackUp" || msg == "SkillUp" || msg == "GetUp") {
            Hero.getInstance().action("stand");
        }
        else if (msg == "JumpUp") {
            Hero.getInstance().action("other");
        }
        else if (msg == "JumpDown") {
            Hero.getInstance().action("JumpDown");
        }
        else if (msg == "AttackDown") {
            Hero.getInstance().action("AttackDown");
        }
        else if (msg == "SkillDown") {
            Hero.getInstance().action("SkillDown");
        }
        else if (msg == "GetDown") {
            Hero.getInstance().action("GetDown");
        }
    };
    return ShengDiScene;
})(egret.DisplayObjectContainer);
egret.registerClass(ShengDiScene,"ShengDiScene");
