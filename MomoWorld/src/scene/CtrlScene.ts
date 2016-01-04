//操作层页面
class CtrlScene extends egret.DisplayObjectContainer {
    private static instance;

    //顶部素材
    private isTop:boolean = false;//标示是否显示顶部
    private topBackgorund:egret.Bitmap;//顶部的背景
    private bloodBar:egret.Bitmap;//血量条
    private powerBar:egret.Bitmap;//法力条
    private expBar:egret.Bitmap;//经验条
    private bloodText:egret.TextField;//血量数值
    private powerText:egret.TextField;//法力数值
    private expText:egret.TextField;//经验数值
    private level:egret.TextField;//当前角色等级
    private map:egret.TextField;//当前所在关卡

    //操作层素材
    private ctrlBackgorund:egret.Bitmap;//顶部的背景
    private left:egret.Bitmap;
    private right:egret.Bitmap;
    private blood:egret.Bitmap;
    private power:egret.Bitmap;
    private skill1:egret.Bitmap;
    private skill2:egret.Bitmap;
    private attack:egret.Bitmap;
    private jump:egret.Bitmap;
    private isCtrl:boolean = false;

    //每日任务界面
    private dailyContainer:egret.DisplayObjectContainer;//每日任务显示容器
    private dailyItemContainer:egret.DisplayObjectContainer;//每日任务显示容器
    private dailyBackground:egret.Bitmap;//背景
    private dailyItems:Array<egret.Bitmap>;//显示的项目
    private dailyDetail:Array<egret.TextField>;//任务详情
    private dailyGift:Array<egret.TextField>;//任务奖励
    private dailyBtn:Array<egret.Bitmap>;//每一项的按钮
    private dailyItemNum:number = 1;//任务项目的数量


    public static getInstance():CtrlScene {
        if (CtrlScene.instance == null)CtrlScene.instance = new CtrlScene();
        return CtrlScene.instance;
    }

    constructor() {
        super();
        if (CtrlScene.instance == null)CtrlScene.instance = this;
        else throw new Error("CtrlScene had been Instanced");
        World.instance.addChild(this);
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
    }

    //清除所有元素
    public removeAll():void {
        this.removeChildren();
        this.topBackgorund = null;
        this.bloodBar = null;
        this.powerBar = null;
        this.expBar = null;
        this.level = null;
        this.map = null;
    }

    //显示顶部层
    public showTop():void {
        this.isTop = true;
        this.topBackgorund = Tool.addBitmap(this, "ctrl_topBackground_png", 0, 0, this.width, 80);
        Tool.addBitmap(this, "ctrl_barBackground_png", 200 - 5, 35 - 5, 120 + 10, 30 + 10);
        Tool.addBitmap(this, "ctrl_barBackground_png", 350 - 5, 35 - 5, 120 + 10, 30 + 10);
        Tool.addBitmap(this, "ctrl_barBackground_png", 500 - 5, 35 - 5, 120 + 10, 30 + 10);
        this.bloodBar = Tool.addBitmap(this, "ctrl_bloodBar_png", 200, 35, 120, 30);
        this.powerBar = Tool.addBitmap(this, "ctrl_powerBar_png", 350, 35, 120, 30);
        this.expBar = Tool.addBitmap(this, "ctrl_expBar_png", 500, 35, 120, 30);
        this.bloodText = Tool.addTextField(this, 200, 10, 0, 0, 15, 0x000000, "血量:" + Hero.getInstance().blood + " / " + Hero.getInstance().bloodMax);
        this.powerText = Tool.addTextField(this, 350, 10, 0, 0, 15, 0x000000, "法力:" + Hero.getInstance().power + " / " + Hero.getInstance().powerMax);
        this.expText = Tool.addTextField(this, 500, 10, 0, 0, 15, 0x000000, "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax);
        this.level = Tool.addTextField(this, 20, 20, 0, 0, 30, 0x000000, "LEVEL:" + Hero.getInstance().level);
        this.map = Tool.addTextField(this, 700, 20, 0, 0, 30, 0x000000, UIManage.target._name);
    }

    //显示操作层
    public showCtrl(type:string = "war"):void {
        this.isCtrl = true;
        this.ctrlBackgorund = Tool.addBitmap(this, "ctrl_topBackground_png", 0, 410, this.width, 70, false, false);
        this.left = Tool.addBitmap(this, "ctrl_left_png", 50, 445, 50, 50, true, true);
        this.right = Tool.addBitmap(this, "ctrl_right_png", 120, 445, 50, 50, true, true);
        this.attack = Tool.addBitmap(this, "ctrl_attack_png", 680, 445, 50, 50, true, true);
        this.jump = Tool.addBitmap(this, "ctrl_jump_png", 750, 445, 50, 50, true, true);

        if (type == "war") {
            this.blood = Tool.addBitmap(this, "ctrl_blood_png", 190, 445, 50, 50, true, true);
            this.power = Tool.addBitmap(this, "ctrl_power_png", 260, 445, 50, 50, true, true);
            this.skill1 = Tool.addBitmap(this, "ctrl_skill1_png", 540, 445, 50, 50, true, true);
            this.skill2 = Tool.addBitmap(this, "ctrl_skill2_png", 610, 445, 50, 50, true, true);
        }
        else if (type == "welcome") {
            this.level = Tool.addTextField(this, 250, 425, 0, 0, 30, 0x000000, "LEVEL:" + Hero.getInstance().level);
            this.expText = Tool.addTextField(this, 460, 415, 0, 0, 15, 0x000000, "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax);
            this.expBar = Tool.addBitmap(this, "ctrl_expBar_png", 460, 440, 120, 30);
        }
    }

    //对每日任务界面的
    public ctrlDaily(type:string):void {
        if (type == "show") {
            this.dailyBtn = [];
            this.dailyGift = [];
            this.dailyItems = [];
            this.dailyDetail = [];
            this.dailyContainer = new egret.DisplayObjectContainer();
            this.dailyContainer.width = 500;
            this.dailyContainer.height = 350;
            this.dailyContainer.anchorOffsetX = this.dailyContainer.width / 2;
            this.dailyContainer.anchorOffsetY = this.dailyContainer.height / 2;
            this.dailyContainer.x = this.width / 2;
            this.dailyContainer.y = this.height / 2;
            this.dailyBackground = Tool.addBitmap(this.dailyContainer, "daily_background_png", this.dailyContainer.width / 2, this.dailyContainer.height / 2, 500, 350, false, true);


            this.dailyItemContainer = new egret.DisplayObjectContainer();
            this.dailyItemContainer.width = 470;
            this.dailyItemContainer.height = 250;
            this.dailyItemContainer.x = 17;
            this.dailyItemContainer.y = 80;

            this.dailyContainer.addChild(this.dailyItemContainer);
            for (var i = 0; i < this.dailyItemNum; i++) {
                this.dailyItems.push(Tool.addBitmap(this.dailyItemContainer, "daily_item_png", this.width / 2 + 2, this.height / 2, 470, 80, false, true));
                this.dailyBtn.push(Tool.addBitmap(this.dailyItemContainer, "daily_get_png", this.width / 2, this.height / 2, 100, 30, false, true));
                this.dailyGift.push(Tool.addTextField(this.dailyItemContainer, 50, 50, 0, 0, 30, 0x000000, "奖励"));
                this.dailyDetail.push(Tool.addTextField(this.dailyItemContainer, 50, 50, 0, 0, 30, 0x000000, "详细信息"));
            }

            this.addChild(this.dailyContainer);
        }
        else if (type == "hide") {

        }
    }

    //同步函数
    public syncFun():void {
        if (this.isTop) {//若显示顶部
            this.bloodText.text = "血量:" + Hero.getInstance().blood + " / " + Hero.getInstance().bloodMax;
            this.powerText.text = "法力:" + Hero.getInstance().power + " / " + Hero.getInstance().powerMax;
            this.expText.text = "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax;
            this.bloodBar.width = Hero.getInstance().blood / Hero.getInstance().bloodMax * 120;
            this.powerBar.width = Hero.getInstance().power / Hero.getInstance().powerMax * 120;
            this.expBar.width = Hero.getInstance().exp / Hero.getInstance().expMax * 120;
            this.level.text = "LEVEL" + Hero.getInstance().level;
        }
    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isCtrl) {
            if (e.target == this.left)Hero.getInstance().action("LeftDown");
            else if (e.target == this.right)Hero.getInstance().action("RightDown");
            else if (e.target == this.jump)Hero.getInstance().action("JumpDown");
            else if (e.target == this.attack)Hero.getInstance().action("AttackDown");
            else if (e.target == this.skill1)Hero.getInstance().action("SkillDown");
            else if (e.target == this.skill2)Hero.getInstance().action("SkillDown");
        }
    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isCtrl) {
            if (e.target == this.left)Hero.getInstance().action("stand");
            else if (e.target == this.right)Hero.getInstance().action("stand");
            else if (e.target == this.jump)Hero.getInstance().action("other");
            else if (e.target == this.attack)Hero.getInstance().action("stand");
            else if (e.target == this.skill1)Hero.getInstance().action("stand");
            else if (e.target == this.skill2)Hero.getInstance().action("stand");
        }

    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
