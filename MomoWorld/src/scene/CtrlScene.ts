//操作层页面
class CtrlScene extends egret.DisplayObjectContainer {
    private static instance;
    private showing:string = "empty";//标示正在显示着什么面板

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
    private dailyItemGroup:eui.Group;//每日任务显示容器
    private dailyBackground:egret.Bitmap;//背景
    private dailyItems:Array<egret.Bitmap>;//显示的项目
    private dailyIcon:Array<egret.Bitmap>;//每日任务的图标
    private dailyDetail:Array<egret.TextField>;//任务详情
    private dailyGift:Array<egret.TextField>;//任务奖励
    private dailyBtn:Array<egret.Bitmap>;//每一项的按钮
    private dailyData:any;//每日任务的数据

    //成就界面
    private achievementContainer:egret.DisplayObjectContainer;//成就显示容器
    private achievementItemGroup:eui.Group;//成就显示容器
    private achievementBackground:egret.Bitmap;//背景
    private achievementItems:Array<egret.Bitmap>;//显示的项目
    private achievementIcon:Array<egret.Bitmap>;//成就的图标
    private achievementDetail:Array<egret.TextField>;//成就详情
    private achievementGift:Array<egret.TextField>;//成就奖励
    private achievementBtn:Array<egret.Bitmap>;//每一项的按钮
    private achievementData:any;//成就的数据

    //能力界面
    private abilityContainer:egret.DisplayObjectContainer;//成就显示容器
    private abilityBackground:egret.Bitmap;//背景
    private abilityIcon:Array<egret.Bitmap>;//各个图标
    private abilityText:Array<egret.TextField>;//各个信息
    private abilityData:any;//成就的数据


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

    //能力面板
    public ctrlAbility(type:string):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
            this.abilityData = ability;
            this.showing = "ability";
            this.abilityIcon = [];
            this.abilityText = [];
            this.abilityContainer = new egret.DisplayObjectContainer();
            this.abilityContainer.width = 500;
            this.abilityContainer.height = 350;
            this.abilityContainer.anchorOffsetX = this.abilityContainer.width / 2;
            this.abilityContainer.anchorOffsetY = this.abilityContainer.height / 2;
            this.abilityContainer.x = this.width / 2;
            this.abilityContainer.y = this.height / 2;

            this.abilityBackground = Tool.addBitmap(this.abilityContainer, "ability_background_png", this.abilityContainer.width / 2, this.abilityContainer.height / 2, 500, 350, false, true);
            this.abilityBackground.touchEnabled = true;
            this.abilityBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                console.log("x  " + e.stageX + "   y   " + e.stageY);
                if (e.stageX > 600 && e.stageX < 630 && e.stageY > 75 && e.stageY < 100)this.ctrlAhievement("hide");
            }, this);

            for (var i = 0; i < 5; i++) {
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.items[i].icon, 13, i * 85 + 15, 50, 50));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, 120, i * 85 + 42, 0, 0, 20, 0x000000, this.abilityData.items[i].gift));
                this.abilityText[i].textAlign = egret.HorizontalAlign.LEFT;
            }



            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.abilityContainer);
                this.abilityBackground = null;
                this.abilityIcon = null;
                this.abilityText = null;
                this.abilityData = null;
                this.showing = "empty";
            }, this);
        }
    }

    //成就面板
    public ctrlAhievement(type:string):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
            this.achievementData = achievement;
            this.showing = "achievement";
            this.achievementBtn = [];
            this.achievementGift = [];
            this.achievementIcon = [];
            this.achievementItems = [];
            this.achievementDetail = [];
            this.achievementContainer = new egret.DisplayObjectContainer();
            this.achievementContainer.width = 500;
            this.achievementContainer.height = 350;
            this.achievementContainer.anchorOffsetX = this.achievementContainer.width / 2;
            this.achievementContainer.anchorOffsetY = this.achievementContainer.height / 2;
            this.achievementContainer.x = this.width / 2;
            this.achievementContainer.y = this.height / 2;
            this.achievementBackground = Tool.addBitmap(this.achievementContainer, "achievement_background_png", this.achievementContainer.width / 2, this.achievementContainer.height / 2, 500, 350, false, true);
            this.achievementBackground.touchEnabled = true;
            this.achievementBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.stageX > 600 && e.stageX < 630 && e.stageY > 75 && e.stageY < 100)this.ctrlAhievement("hide");
            }, this);

            this.achievementItemGroup = new eui.Group();
            this.achievementItemGroup.touchEnabled = true;
            this.achievementItemGroup.width = 470;
            this.achievementItemGroup.height = 85 * this.achievementData.items.length;
            this.achievementItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.achievementData.items.length; i++) {
                this.achievementItems.push(Tool.addBitmap(this.achievementItemGroup, "achievement_item_png", 2, i * 85, 470, 80));
                this.achievementBtn.push(Tool.addBitmap(this.achievementItemGroup, "achievement_get_png", 355, i * 85 + 40, 100, 30));
                this.achievementIcon.push(Tool.addBitmap(this.achievementItemGroup, this.achievementData.items[i].icon, 13, i * 85 + 15, 50, 50));
                this.achievementGift.push(Tool.addTextField(this.achievementItemGroup, 120, i * 85 + 42, 0, 0, 20, 0x000000, this.achievementData.items[i].gift));
                this.achievementDetail.push(Tool.addTextField(this.achievementItemGroup, 80, i * 85 + 8, 0, 0, 20, 0x000000, this.achievementData.items[i].detail));
                this.achievementGift[i].textAlign = egret.HorizontalAlign.LEFT;
                this.achievementDetail[i].textAlign = egret.HorizontalAlign.LEFT;
            }

            //设置滑动组件
            var tempGroup = new eui.Group();
            var scroll = new eui.Scroller();
            scroll.viewport = tempGroup;
            scroll.touchEnabled = true;
            scroll.width = 470;
            scroll.height = 260;
            scroll.x = 17;
            scroll.y = 70;
            this.achievementContainer.addChild(scroll);
            tempGroup.addChild(this.achievementItemGroup);
            this.addChild(this.achievementContainer);

            this.achievementContainer.scaleX = 0;
            this.achievementContainer.scaleY = 0;
            var tw = egret.Tween.get(this.achievementContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.achievementContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.achievementContainer);
                this.achievementBackground = null;
                this.achievementContainer = null;
                this.achievementItemGroup = null;
                this.achievementDetail = null;
                this.achievementItems = null;
                this.achievementGift = null;
                this.achievementBtn = null;
                this.showing = "empty";
            }, this);
        }
    }

    //对每日任务界面的操作
    public ctrlDaily(type:string):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
            this.dailyData = daily;
            this.showing = "daily";
            this.dailyBtn = [];
            this.dailyGift = [];
            this.dailyIcon = [];
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
            this.dailyBackground.touchEnabled = true;
            this.dailyBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.stageX > 600 && e.stageX < 630 && e.stageY > 75 && e.stageY < 100)this.ctrlDaily("hide");
            }, this);

            this.dailyItemGroup = new eui.Group();
            this.dailyItemGroup.touchEnabled = true;
            this.dailyItemGroup.width = 470;
            this.dailyItemGroup.height = 85 * this.dailyData.items.length;
            this.dailyItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.dailyData.items.length; i++) {
                this.dailyItems.push(Tool.addBitmap(this.dailyItemGroup, "daily_item_png", 2, i * 85, 470, 80));
                this.dailyBtn.push(Tool.addBitmap(this.dailyItemGroup, "daily_get_png", 355, i * 85 + 40, 100, 30));
                this.dailyIcon.push(Tool.addBitmap(this.dailyItemGroup, this.dailyData.items[i].icon, 13, i * 85 + 15, 50, 50));
                this.dailyGift.push(Tool.addTextField(this.dailyItemGroup, 120, i * 85 + 42, 0, 0, 20, 0x000000, this.dailyData.items[i].gift));
                this.dailyDetail.push(Tool.addTextField(this.dailyItemGroup, 80, i * 85 + 8, 0, 0, 20, 0x000000, this.dailyData.items[i].detail));
                this.dailyGift[i].textAlign = egret.HorizontalAlign.LEFT;
                this.dailyDetail[i].textAlign = egret.HorizontalAlign.LEFT;
            }

            //设置滑动组件
            var tempGroup = new eui.Group();
            var scroll = new eui.Scroller();
            scroll.viewport = tempGroup;
            scroll.touchEnabled = true;
            scroll.width = 470;
            scroll.height = 260;
            scroll.x = 17;
            scroll.y = 70;
            this.dailyContainer.addChild(scroll);
            tempGroup.addChild(this.dailyItemGroup);
            this.addChild(this.dailyContainer);

            this.dailyContainer.scaleX = 0;
            this.dailyContainer.scaleY = 0;
            var tw = egret.Tween.get(this.dailyContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.dailyContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.dailyContainer);
                this.dailyBackground = null;
                this.dailyContainer = null;
                this.dailyItemGroup = null;
                this.dailyDetail = null;
                this.dailyItems = null;
                this.dailyGift = null;
                this.dailyBtn = null;
                this.showing = "empty";
            }, this);
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
