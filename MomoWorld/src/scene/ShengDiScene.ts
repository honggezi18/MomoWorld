//游戏欢迎页面
class ShengDiScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//欢迎页面背景
    public role:egret.DisplayObjectContainer;//角色层
    public item:egret.DisplayObjectContainer;//物品层


    public _name:string;//当前关卡名字
    public absoluteX:number = 0;//标示点击的绝对坐标，即相对于背景的坐标
    public absoluteY:number = 0;//标示点击的绝对坐标，即相对于背景的坐标
    public tureWidth:number = 0;
    public tureHeight:number = 0;


    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        P2Tool.initSpace(50, new egret.Rectangle(0, 0, this.width, this.height));
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
        this._name = "圣地";

        this.background = Tool.addBitmap(this, "map_shengdi_png", 0, 0, 0, 0, true);
        this.tureWidth = this.background.width;
        this.tureHeight = this.background.height;
        var tempPlane = P2Tool.createPlane(World.P2World, 0, -555, 0);
        tempPlane.shapes[0].collisionMask = 3;//设置当前碰撞组，即只与这些类型的发送碰撞


        this.role = new egret.DisplayObjectContainer();
        this.item = new egret.DisplayObjectContainer();
        this.addChild(this.role);
        this.addChild(this.item);


        this.role.addChild(Hero.getInstance());
        this.y = -180;

        //for (var i = 0; i < 10; i++) {
        //    GameData.enemyArray.push(new Enemy("1", i / 2 * 400 + 100));
        //    this.role.addChild(GameData.enemyArray[i]);
        //}
    }

    //同步素材//先清空，再同步
    public syncDisplay():void {
        //释放内存，消除enemy
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var tempEnemy:Enemy = GameData.enemyArray[i];
            if (tempEnemy.isDie) {
                Tool.removeOne(GameData.enemyArray, i);
                i--;
            }

        }

        //释放内存，消除子弹
        for (var i = 0; i < GameData.bulletArray.length; i++) {
            var tempBullet:Bullet = GameData.bulletArray[i];
            if (tempBullet.isOver) {
                tempBullet.show.parent.removeChild(tempBullet.show);
                Tool.removeOne(GameData.bulletArray, i);
                i--;
            }
        }

        //释放内存，消除物品
        for (var i = 0; i < GameData.itemArray.length; i++) {
            var tempItem = GameData.itemArray[i];
            if (tempItem.isOver) {
                tempItem.show.parent.removeChild(tempItem.show);
                Tool.removeOne(GameData.itemArray, i);
                i--;
            }
        }

        Hero.getInstance().syncFun();//同步英雄
        for (var i = 0; i < GameData.enemyArray.length; i++) GameData.enemyArray[i].syncFun();
        for (var i = 0; i < GameData.bulletArray.length; i++) GameData.bulletArray[i].syncFun();
        for (var i = 0; i < GameData.itemArray.length; i++) GameData.itemArray[i].syncFun();
    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {
        console.log("onTouchStart");
        //new Item("thing1", P2Tool.getEgretNum(Hero.getInstance().body.position[0]), P2Tool.getEgretY(Hero.getInstance().body.position[1]));
    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
        //console.log("onTouchEnd     x    " + e.stageX + "    y    " + e.stageY);
    }

    public onRemove(e:egret.Event):void {
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
    }

    //键盘按钮的响应函数
    private control(msg) {
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
    }


}
