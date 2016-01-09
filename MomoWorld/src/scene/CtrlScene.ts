//操作层页面
class CtrlScene extends egret.DisplayObjectContainer {
    private static instance;
    private tipInfo:egret.TextField;//提示信息
    private showing:string = "empty";//标示正在显示着什么面板
    private isTip:boolean = false;//标示是否在显示提示

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
    private abilityContainer:egret.DisplayObjectContainer;//能力显示容器
    private abilityDetailContainer:egret.DisplayObjectContainer;//能力详细信息显示容器
    private abilityBackground:egret.Bitmap;//背景
    private abilityDetailIcon:egret.Bitmap;//详细页面图标
    private abilityIcon:Array<egret.Bitmap>;//各个图标
    private abilityBody:egret.TextField;//剩余属性点
    private abilitySkill:egret.TextField;//剩余技能点
    private abilityDetailLevel:egret.TextField;//详细页面的等级
    private abilityText:Array<egret.TextField>;//各个信息
    private abilityIndex:number = 0;//成就的选项下标
    private abilityIsDetail:boolean = false;//标示是否在显示详细面板
    private abilityData:any;//成就的数据

    //药店素材
    private drupShopContainer:egret.DisplayObjectContainer;//药店显示容器
    private drupShopDetailContainer:egret.DisplayObjectContainer;//药品弹框显示容器
    private drupShopItemGroup:eui.Group;//成就显示容器
    private drupShopBackground:egret.Bitmap;//背景
    private drupShopItems:Array<egret.Bitmap>;//商品项背景
    private drupShopIcon:Array<egret.Bitmap>;//各个图标
    private drupShopSum:egret.TextField;//商品的总价格
    private drupShopDrupNumText:eui.EditableText;//商品的数量的文字
    private drupShopName:Array<egret.TextField>;//商品名
    private drupShopInfo:Array<egret.TextField>;//商品信息
    private drupShopCost:Array<egret.TextField>;//商品价格
    private drupShopDrupNum:number = 1;//商品的数量
    private drupShopIndex:number = 0;//商品的选项下标
    private drupShopIsDetail:boolean = false;//标示是否在显示详细面板
    private drupShopData:any;//药店数据


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
            Tool.addBitmap(this, "ctrl_barBackground_png", 460 - 5, 440 - 5, 120 + 10, 30 + 10);
        }
    }

    //显示提示信息
    public showTip(info):void {
        if (this.isTip)return;
        if (this.tipInfo == null)this.tipInfo = Tool.addTextField(this, 200, 240, 400, 30, 30, 0xff0000, "提示信息");
        this.setChildIndex(this.tipInfo, 99);
        this.isTip = true;
        this.tipInfo.y = 200;
        this.tipInfo.alpha = 1.2;
        this.tipInfo.text = info;
        var tw = egret.Tween.get(this.tipInfo);
        tw.to({y: this.tipInfo.y - 150, alpha: 0.3}, 800).call(function () {
            this.tipInfo.alpha = 0;
            this.isTip = false;
        }, this);
    }

    //药品商店面板
    public ctrlDrupShop(type:string, num:number = 1):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
            this.drupShopData = drupShop;
            this.showing = "drupShop";
            this.drupShopItems = [];
            this.drupShopIcon = [];
            this.drupShopName = [];
            this.drupShopInfo = [];
            this.drupShopCost = [];
            this.drupShopContainer = new egret.DisplayObjectContainer();
            this.drupShopContainer.width = 500;
            this.drupShopContainer.height = 400;
            this.drupShopContainer.anchorOffsetX = this.drupShopContainer.width / 2;
            this.drupShopContainer.anchorOffsetY = this.drupShopContainer.height / 2;
            this.drupShopContainer.x = this.width / 2;
            this.drupShopContainer.y = 210;

            this.drupShopBackground = Tool.addBitmap(this.drupShopContainer, "drupShop_background_png", 0, 0, 500, 400);
            this.drupShopBackground.touchEnabled = true;
            this.drupShopBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 205 && e.localX < 250 && e.localY > 345 && e.localY < 390)this.ctrlDrupShop("hide");
            }, this);

            this.drupShopItemGroup = new eui.Group();
            this.drupShopItemGroup.touchEnabled = true;
            this.drupShopItemGroup.width = 370;
            this.drupShopItemGroup.height = 70 * this.drupShopData.items.length;
            this.drupShopItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.drupShopData.items.length; i++) {
                this.drupShopItems.push(Tool.addBitmap(this.drupShopItemGroup, "drupShop_item_png", 0, i * 70, 370, 65));
                this.drupShopIcon.push(Tool.addBitmap(this.drupShopItemGroup, this.drupShopData.items[i].icon, 17, i * 70 + 10, 40, 40));
                this.drupShopName.push(Tool.addTextField(this.drupShopItemGroup, 80, i * 70 + 8, 0, 0, 20, 0x000000, this.drupShopData.items[i].name));
                this.drupShopCost.push(Tool.addTextField(this.drupShopItemGroup, 290, i * 70 + 10, 0, 0, 18, 0x000000, this.drupShopData.items[i].cost));
                this.drupShopInfo.push(Tool.addTextField(this.drupShopItemGroup, 80, i * 70 + 38, 0, 0, 15, 0x000000, this.drupShopData.items[i].info));
                this.drupShopName[i].textAlign = egret.HorizontalAlign.LEFT;
                this.drupShopInfo[i].textAlign = egret.HorizontalAlign.LEFT;
                this.drupShopIcon[i].touchEnabled = true;
                this.drupShopIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                    for (var a = 0; a < this.drupShopIcon.length; a++) {
                        if (e.target == this.drupShopIcon[a]) {
                            this.drupShopIndex = a;
                            this.ctrlDrupShop("showDetail");
                            return;
                        }
                    }
                }, this);
            }

            //设置滑动组件
            var tempGroup = new eui.Group();
            var scroll = new eui.Scroller();
            scroll.x = 47;
            scroll.y = 105;
            scroll.width = 370;
            scroll.height = 210;
            scroll.viewport = tempGroup;
            scroll.touchEnabled = true;
            this.drupShopContainer.addChild(scroll);
            tempGroup.addChild(this.drupShopItemGroup);
            this.addChild(this.drupShopContainer);

            this.drupShopContainer.scaleX = 0;
            this.drupShopContainer.scaleY = 0;
            var tw = egret.Tween.get(this.drupShopContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.drupShopContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.drupShopContainer);
                this.drupShopDetailContainer = null;
                this.drupShopDrupNumText = null;
                this.drupShopBackground = null;
                this.drupShopContainer = null;
                this.drupShopItemGroup = null;
                this.drupShopIsDetail = null;
                this.drupShopDrupNum = null;
                this.drupShopIndex = null;
                this.drupShopItems = null;
                this.drupShopIcon = null;
                this.drupShopName = null;
                this.drupShopInfo = null;
                this.drupShopCost = null;
                this.drupShopData = null;
                this.drupShopSum = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "showDetail") {//购买某商品
            this.drupShopDrupNum = 1;
            this.drupShopIsDetail = true;
            this.drupShopDetailContainer = new egret.DisplayObjectContainer();
            this.drupShopDetailContainer.width = 300;
            this.drupShopDetailContainer.height = 180;
            this.drupShopDetailContainer.anchorOffsetX = 300 / 2;
            this.drupShopDetailContainer.anchorOffsetY = 180 / 2;
            this.drupShopDetailContainer.x = this.drupShopContainer.width / 2;
            this.drupShopDetailContainer.y = this.drupShopContainer.height / 2;
            this.drupShopContainer.addChild(this.drupShopDetailContainer);

            var background = Tool.addBitmap(this.drupShopDetailContainer, "drupShop_detail_png", 0, 0, 300, 180);
            var icon = Tool.addBitmap(this.drupShopDetailContainer, this.drupShopData.items[this.drupShopIndex].icon, 27, 33, 50, 50);
            var drupName = Tool.addTextField(this.drupShopDetailContainer, 12, 98, 80, 20, 16, 0xffffff, this.drupShopData.items[this.drupShopIndex].name);
            var intruction = Tool.addTextField(this.drupShopDetailContainer, 90, 25, 90, 90, 15, 0xffffff, this.drupShopData.items[this.drupShopIndex].info);
            var cost = Tool.addTextField(this.drupShopDetailContainer, 190, 70, 60, 15, 15, 0xffffff, "单价:" + this.drupShopData.items[this.drupShopIndex].cost);
            this.drupShopSum = Tool.addTextField(this.drupShopDetailContainer, 190, 95, 100, 15, 15, 0xffffff, "总额:" + this.drupShopData.items[this.drupShopIndex].cost);
            this.drupShopDrupNumText = new eui.EditableText();
            this.drupShopDrupNumText.x = 215;
            this.drupShopDrupNumText.y = 40;
            this.drupShopDrupNumText.width = 40;
            this.drupShopDrupNumText.size = 15;
            this.drupShopDrupNumText.height = 15;
            this.drupShopDrupNumText.textColor = 0xffffff;
            this.drupShopDrupNumText.textAlign = egret.HorizontalAlign.CENTER;
            this.drupShopDrupNumText.text = "01";
            this.drupShopDetailContainer.addChild(this.drupShopDrupNumText);
            this.drupShopDrupNumText.addEventListener(egret.Event.FOCUS_OUT, function () {
                var temp = parseInt(this.drupShopDrupNumText.text);
                console.log("temp  " + temp);
                this.ctrlDrupShop("update", temp);
            }, this);


            cost.textAlign = egret.HorizontalAlign.LEFT;
            intruction.textAlign = egret.HorizontalAlign.LEFT;
            this.drupShopSum.textAlign = egret.HorizontalAlign.LEFT;


            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                console.log("x   " + e.localX, "   y   " + e.localY);
                if (e.localX > 188 && e.localX < 203 && e.localY > 40 && e.localY < 58) this.ctrlDrupShop("update", --this.drupShopDrupNum);
                else if (e.localX > 267 && e.localX < 283 && e.localY > 40 && e.localY < 58) this.ctrlDrupShop("update", ++this.drupShopDrupNum);
                else if (e.localX > 40 && e.localX < 135 && e.localY > 105 && e.localY < 165) {
                    if (this.drupShopSum.textColor == 0xff0000)this.showTip("金币不足");
                    else {
                        this.showTip("购买成功");
                        this.ctrlDrupShop("hideDetail");
                    }
                }
                else if (e.localX > 190 && e.localX < 260 && e.localY > 135 && e.localY < 165) this.ctrlDrupShop("hideDetail");
            }, this);

            this.drupShopDetailContainer.scaleX = 0;
            this.drupShopDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.drupShopDetailContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {//升级某项技能
            if (!this.drupShopIsDetail)return;
            this.drupShopIsDetail = false;
            var tw = egret.Tween.get(this.drupShopDetailContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.drupShopContainer.removeChild(this.drupShopDetailContainer);
                this.drupShopDetailContainer = null;
                this.drupShopDrupNumText = null;
                this.drupShopSum = null;
                this.showing = "drupShop";
            }, this);
        }
        else if (type == "update") {
            console.log("update" + num);
            this.drupShopDrupNum = num;
            if (this.drupShopDrupNum < 1)this.drupShopDrupNum = 1;
            else if (this.drupShopDrupNum > 99)this.drupShopDrupNum = 99;
            this.drupShopDrupNumText.text = Tool.setZero(this.drupShopDrupNum, 2);
            var sum = this.drupShopData.items[this.drupShopIndex].cost * this.drupShopDrupNum;
            this.drupShopSum.text = "总额:" + sum;
            if (sum < GameData.goldNum)this.drupShopSum.textColor = 0xffffff;
            else this.drupShopSum.textColor = 0xff0000;
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
            this.abilityContainer.width = 700;
            this.abilityContainer.height = 420;
            this.abilityContainer.anchorOffsetX = this.abilityContainer.width / 2;
            this.abilityContainer.anchorOffsetY = this.abilityContainer.height / 2;
            this.abilityContainer.x = this.width / 2;
            this.abilityContainer.y = this.height / 2;

            this.abilityBackground = Tool.addBitmap(this.abilityContainer, "ability_background_png", 0, 0, this.abilityContainer.width, this.abilityContainer.height);
            this.abilityBackground.touchEnabled = true;
            this.abilityBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (this.abilityIsDetail)return;
                if (e.stageX > 270 && e.stageX < 425 && e.stageY > 360 && e.stageY < 390)this.ctrlAbility("hide");
                for (var y = 0; y < 3; y++) {
                    for (var x = 0; x < 5; x++) {
                        this.abilityIndex = y * 5 + x;
                        if (e.localX > (158 + 80 * x) && e.localX < (217 + 80 * x) && e.localY > (120 + y * 70) && e.localY < (180 + y * 70)) {
                            this.ctrlAbility("showDetail");
                            return;
                        }
                    }
                }
            }, this);

            this.abilitySkill = Tool.addTextField(this.abilityContainer, 120, 60, 0, 0, 18, 0xffffff, "剩余技能点:" + GameData.skillNum);
            this.abilityBody = Tool.addTextField(this.abilityContainer, 455, 60, 0, 0, 18, 0xffffff, "剩余属性值:" + GameData.bodyNum);

            for (var i = 0; i < 5; i++) {
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.skill1[i].icon, i * 80 + 187, 150, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 162, 50, 0, 15, 0xff0000, this.abilityData.skill1[i].level + "/" + this.abilityData.skill1[i].maxLevel));
                this.abilityText[i].textAlign = egret.HorizontalAlign.RIGHT;
            }

            for (var i = 0; i < 5; i++) {
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.skill2[i].icon, i * 80 + 187, 220, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 232, 50, 0, 15, 0xff0000, this.abilityData.skill2[i].level + "/" + this.abilityData.skill2[i].maxLevel));
                this.abilityText[i + 5].textAlign = egret.HorizontalAlign.RIGHT;
            }

            for (var i = 0; i < 5; i++) {
                this.abilityData.data[i].state = Math.floor(this.abilityData.data[i].level / (this.abilityData.data[i].maxLevel / 5)) + 1;
                if (this.abilityData.data[i].state > 5)this.abilityData.data[i].state = 5;
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png", i * 80 + 187, 290, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 302, 50, 0, 15, 0xff0000, this.abilityData.data[i].level + "/" + this.abilityData.data[i].maxLevel));
                this.abilityText[i + 10].textAlign = egret.HorizontalAlign.RIGHT;
            }

            this.addChild(this.abilityContainer);
            this.abilityContainer.scaleX = 0;
            this.abilityContainer.scaleY = 0;
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.abilityContainer);
                this.abilityDetailContainer = null;
                this.abilityDetailLevel = null;
                this.abilityBackground = null;
                this.abilityDetailIcon = null;
                this.abilityContainer = null;
                this.abilityIsDetail = null;
                this.abilitySkill = null;
                this.abilityIndex = null;
                this.abilityBody = null;
                this.abilityText = null;
                this.abilityData = null;
                this.abilityIcon = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "showDetail") {//升级某项技能
            this.abilityIsDetail = true;
            this.abilityDetailContainer = new egret.DisplayObjectContainer();
            this.abilityDetailContainer.width = 300;
            this.abilityDetailContainer.height = 180;
            this.abilityDetailContainer.anchorOffsetX = 300 / 2;
            this.abilityDetailContainer.anchorOffsetY = 180 / 2;
            this.abilityDetailContainer.x = this.abilityContainer.width / 2;
            this.abilityDetailContainer.y = this.abilityContainer.height / 2;
            this.abilityContainer.addChild(this.abilityDetailContainer);
            var background = Tool.addBitmap(this.abilityDetailContainer, "ability_detail_png", 0, 0, 300, 180);
            var intruction = Tool.addTextField(this.abilityDetailContainer, 120, 60, 150, 90, 15, 0xffffff, "简介");
            this.abilityDetailLevel = Tool.addTextField(this.abilityDetailContainer, 25, 130, 90, 20, 20, 0xffffff, "Level:" + this.abilityText[this.abilityIndex].text.substr(0, this.abilityText[this.abilityIndex].text.length - 3));
            if (this.abilityIndex < 5) intruction.text = this.abilityData.skill1[this.abilityIndex].intruction;
            else if (this.abilityIndex < 10)intruction.text = this.abilityData.skill2[this.abilityIndex - 5].intruction;
            else if (this.abilityIndex < 15)intruction.text = this.abilityData.data[this.abilityIndex - 10].intruction;
            intruction.textAlign = egret.HorizontalAlign.LEFT;

            this.abilityDetailIcon = new egret.Bitmap();
            this.abilityDetailIcon.texture = this.abilityIcon[this.abilityIndex].texture;
            this.abilityDetailContainer.addChild(this.abilityDetailIcon);
            this.abilityDetailIcon.width = 50;
            this.abilityDetailIcon.height = 50;
            this.abilityDetailIcon.x = 40;
            this.abilityDetailIcon.y = 65;

            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 40 && e.localX < 85 && e.localY > 85 && e.localY < 110)this.ctrlAbility("levelUp");
                else if (e.localX > 215 && e.localX < 280 && e.localY > 5 && e.localY < 35)this.ctrlAbility("hideDetail");
            }, this);

            this.abilityDetailContainer.scaleX = 0;
            this.abilityDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.abilityDetailContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);

        }
        else if (type == "hideDetail") {//升级某项技能
            if (!this.abilityIsDetail)return;
            this.abilityIsDetail = false;
            var tw = egret.Tween.get(this.abilityDetailContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.abilityContainer.removeChild(this.abilityDetailContainer);
                this.abilityDetailContainer = null;
                this.abilityDetailLevel = null;
                this.showing = "ability";
            }, this);
        }
        else if (type == "levelUp") {//升级某项技能
            if (this.abilityIndex < 5) {//升级单攻
                if (GameData.skillNum > 0 && this.abilityData.skill1[this.abilityIndex].level < this.abilityData.skill1[this.abilityIndex].maxLevel) {
                    GameData.skillNum--;
                    this.abilityData.skill1[this.abilityIndex].level++;
                    this.abilityText[this.abilityIndex].text = this.abilityData.skill1[this.abilityIndex].level + "/" + this.abilityData.skill1[this.abilityIndex].maxLevel;
                }
            }
            else if (this.abilityIndex < 10) {//升级群攻
                if (GameData.skillNum > 0 && this.abilityData.skill2[this.abilityIndex - 5].level < this.abilityData.skill2[this.abilityIndex - 5].maxLevel) {
                    GameData.skillNum--;
                    this.abilityData.skill2[this.abilityIndex - 5].level++;
                    this.abilityText[this.abilityIndex].text = this.abilityData.skill2[this.abilityIndex - 5].level + "/" + this.abilityData.skill2[this.abilityIndex - 5].maxLevel;
                }
            }
            else if (this.abilityIndex < 15) {//升级属性
                var i = this.abilityIndex - 10;
                if (GameData.bodyNum > 0 && this.abilityData.data[i].level < this.abilityData.data[i].maxLevel) {
                    GameData.bodyNum--;
                    this.abilityData.data[i].level++;
                    this.abilityData.data[i].state = Math.floor(this.abilityData.data[i].level / (this.abilityData.data[i].maxLevel / 5)) + 1;
                    if (this.abilityData.data[i].state > 5)this.abilityData.data[i].state = 5;
                    this.abilityIcon[this.abilityIndex].texture = RES.getRes(this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png");
                    this.abilityDetailIcon.texture = RES.getRes(this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png");
                    this.abilityText[this.abilityIndex].text = this.abilityData.data[i].level + "/" + this.abilityData.data[i].maxLevel;
                }
            }
            this.abilityDetailLevel.text = "Level:" + this.abilityText[this.abilityIndex].text.substr(0, this.abilityText[this.abilityIndex].text.length - 3);
            this.abilityBody.text = "剩余属性值:" + GameData.bodyNum;
            this.abilitySkill.text = "剩余技能点:" + GameData.skillNum;
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
