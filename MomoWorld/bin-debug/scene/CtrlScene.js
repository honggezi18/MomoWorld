//操作层页面
var CtrlScene = (function (_super) {
    __extends(CtrlScene, _super);
    function CtrlScene() {
        _super.call(this);
        this.showing = "empty"; //标示正在显示着什么面板
        this.isTip = false; //标示是否在显示提示
        this.sureAnswer = false; //弹框返回的信息
        //顶部素材
        this.isTop = false; //标示是否显示顶部
        this.isCtrl = false;
        this.abilityIndex = 0; //成就的选项下标
        this.abilityIsDetail = false; //标示是否在显示详细面板
        this.drupShopDrupNum = 1; //商品的数量
        this.drupShopIndex = 0; //商品的选项下标
        this.drupShopIsDetail = false; //标示是否在显示详细面板
        this.weaponShopIndex = 0; //商品的选项下标
        this.weaponShopIsDetail = false; //标示是否在显示详细面板
        this.bagBtnIndex = "Equip"; //背包选择卡的下标
        this.bagIndex = 0; //商品的选项下标
        this.bagIsDetail = false; //标示是否在显示详细面板
        this.weaponState = 0; //武器升级面板状态
        if (CtrlScene.instance == null)
            CtrlScene.instance = this;
        else
            throw new Error("CtrlScene had been Instanced");
        World.instance.addChild(this);
        this.width = GameData.gameWidth;
        this.height = GameData.gameHeight;
    }
    var d = __define,c=CtrlScene;p=c.prototype;
    CtrlScene.getInstance = function () {
        if (CtrlScene.instance == null)
            CtrlScene.instance = new CtrlScene();
        return CtrlScene.instance;
    };
    //清除所有元素
    p.removeAll = function () {
        this.removeChildren();
        this.topBackgorund = null;
        this.bloodBar = null;
        this.powerBar = null;
        this.expBar = null;
        this.level = null;
        this.map = null;
    };
    //显示顶部层
    p.showTop = function () {
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
    };
    //显示操作层
    p.showCtrl = function (type) {
        if (type === void 0) { type = "war"; }
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
        this.ctrlWeapon("show");
    };
    //显示提示信息
    p.showTip = function (info) {
        if (this.isTip)
            return;
        if (this.tipInfo == null)
            this.tipInfo = Tool.addTextField(this, 200, 240, 400, 30, 30, 0xff0000, "提示信息");
        this.setChildIndex(this.tipInfo, 99);
        this.isTip = true;
        this.tipInfo.y = 200;
        this.tipInfo.alpha = 1.2;
        this.tipInfo.text = info;
        var tw = egret.Tween.get(this.tipInfo);
        tw.to({ y: this.tipInfo.y - 150, alpha: 0.3 }, 800).call(function () {
            this.tipInfo.alpha = 0;
            this.isTip = false;
        }, this);
    };
    //显示确定弹框
    p.showSure = function (info, fun) {
        if (this.sureContainer != null)
            return;
        this.sureContainer = new egret.DisplayObjectContainer();
        this.sureContainer.width = 300;
        this.sureContainer.height = 150;
        this.sureContainer.anchorOffsetX = 300 / 2;
        this.sureContainer.anchorOffsetY = 150 / 2;
        this.sureContainer.x = GameData.gameWidth / 2;
        this.sureContainer.y = GameData.gameHeight / 2;
        this.addChild(this.sureContainer);
        var background = Tool.addBitmap(this.sureContainer, "bag_sureBackground_png", 0, 0, 300, 150);
        var tempText = Tool.addTextField(this.sureContainer, 15, 20, 270, 70, 20, 0x000000, info);
        tempText.verticalAlign = egret.VerticalAlign.MIDDLE;
        background.touchEnabled = true;
        background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
            var isHide = false;
            if (e.localX > 30 && e.localX < 110 && e.localY > 110 && e.localY < 140) {
                this.sureAnswer = true;
                isHide = true;
            }
            else if (e.localX > 190 && e.localX < 275 && e.localY > 110 && e.localY < 140) {
                this.sureAnswer = false;
                isHide = true;
            }
            if (isHide) {
                egret.Tween.get(this.sureContainer).to({
                    scaleX: 0,
                    scaleY: 0
                }, 500, egret.Ease.backIn).call(function () {
                    this.sureContainer = Tool.clearItem(this.sureContainer);
                    fun();
                }, this);
            }
        }, this);
        this.sureContainer.scaleX = 0;
        this.sureContainer.scaleY = 0;
        var tw = egret.Tween.get(this.sureContainer);
        tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
    };
    //显示武器升级页面
    p.ctrlWeapon = function (type, index) {
        if (index === void 0) { index = 0; }
        if (type == "show") {
            if (this.weaponContainer != null)
                return;
            this.weaponContainer = new egret.DisplayObjectContainer();
            this.weaponContainer.width = 500;
            this.weaponContainer.height = 300;
            this.weaponContainer.anchorOffsetX = 500 / 2;
            this.weaponContainer.anchorOffsetY = 300 / 2;
            this.weaponContainer.x = GameData.gameWidth / 2;
            this.weaponContainer.y = GameData.gameHeight / 2;
            this.addChild(this.weaponContainer);
            this.weaponState = 1;
            this.weaponBackground = Tool.addBitmap(this.weaponContainer, "weapon_background" + this.weaponState + "_png", 0, 0, 500, 300);
            this.weaponExpbar = Tool.addBitmap(this.weaponContainer, "weapon_expbar_png", 224, 47, 95, 25);
            var tempText = Tool.addTextField(this.weaponContainer, 192, 48, 30, 25, 25, 0x000000, "30");
            tempText.stroke = 1;
            this.weaponBackground.touchEnabled = true;
            this.weaponBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 465 && e.localX < 500 && e.localY > 0 && e.localY < 50)
                    this.ctrlWeapon("hide");
                else if (e.localX > 195 && e.localX < 305 && e.localY > 95 && e.localY < 225)
                    this.ctrlWeapon("select");
                else if (this.weaponState > 0) {
                    if (e.localX > 175 && e.localX < 320 && e.localY > 240 && e.localY < 285)
                        this.ctrlWeapon("levelUp");
                    else if (e.localX > 42 && e.localX < 102 && e.localY > 40 && e.localY < 105)
                        this.ctrlWeapon("input", 1);
                    else if (e.localX > 400 && e.localX < 460 && e.localY > 40 && e.localY < 105)
                        this.ctrlWeapon("input", 2);
                    else if (e.localX > 42 && e.localX < 102 && e.localY > 200 && e.localY < 265)
                        this.ctrlWeapon("input", 3);
                    else if (e.localX > 400 && e.localX < 460 && e.localY > 200 && e.localY < 265)
                        this.ctrlWeapon("input", 4);
                }
            }, this);
            this.weaponContainer.alpha = 0;
            var tw = egret.Tween.get(this.weaponContainer);
            tw.to({ alpha: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            console.log("hide");
            egret.Tween.get(this.weaponContainer).to({ alpha: 0 }, 500, egret.Ease.backIn).call(function () {
                this.weaponContainer = Tool.clearItem(this.weaponContainer);
            }, this);
        }
        else if (type == "select") {
            console.log("select");
            this.weaponBackground.texture = RES.getRes("weapon_background" + this.weaponState + "_png");
        }
        else if (type == "input") {
            console.log("index   " + index);
        }
        else if (type == "levelUp") {
            console.log("levelUp");
        }
    };
    //显示玩家信息弹框
    p.ctrlData = function (type) {
        if (type == "show") {
            if (this.dataContainer != null)
                return;
            this.dataContainer = new egret.DisplayObjectContainer();
            this.dataContainer.width = 500;
            this.dataContainer.height = 480;
            this.dataContainer.anchorOffsetX = 500 / 2;
            this.dataContainer.anchorOffsetY = 480 / 2;
            this.dataContainer.x = GameData.gameWidth / 2;
            this.dataContainer.y = GameData.gameHeight / 2 - 50;
            this.addChild(this.dataContainer);
            var i = 0;
            var background = Tool.addBitmap(this.dataContainer, "data_background_png", 0, 0, 500, 480);
            //玩家数值显示
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "职业:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "等级:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "血量:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "法量:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "物攻:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "法攻:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "物抗:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "法抗:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "攻速:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 290, 100 + 30 * (i++), 170, 20, 20, 0x000000, "移速:" + i).textAlign = egret.HorizontalAlign.LEFT;
            //玩家装备显示//设置坐标数组，装备名数组，根据数组名检查装备，再显示图标，即装备种类固定数组下标，这样连接图标的点击响应
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                Tool.logPosition(e);
                if (e.localX > 455 && e.localX < 470 && e.localY > 65 && e.localY < 85)
                    this.ctrlData("hide");
            }, this);
            this.dataContainer.scaleX = 0;
            this.dataContainer.scaleY = 0;
            var tw = egret.Tween.get(this.dataContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            console.log("hide");
            egret.Tween.get(this.dataContainer).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.dataContainer = Tool.clearItem(this.dataContainer);
            });
        }
    };
    //我的背包面板
    p.ctrlBag = function (type, num) {
        if (num === void 0) { num = 1; }
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
            this.bagData = bag;
            this.showing = "bag";
            this.bagIcon = [];
            this.bagItems = [];
            this.bagItemNum = [];
            this.bagContainer = new egret.DisplayObjectContainer();
            this.bagContainer.width = 430;
            this.bagContainer.height = 320;
            this.bagContainer.anchorOffsetX = this.bagContainer.width / 2;
            this.bagContainer.anchorOffsetY = this.bagContainer.height / 2;
            this.bagContainer.x = this.width / 2;
            this.bagContainer.y = 210;
            this.bagBackground = Tool.addBitmap(this.bagContainer, "bag_background_png", 0, 0, 430, 320);
            this.bag_btnEquip = Tool.addBitmap(this.bagContainer, "bag_btnEquip1_png", 30, 10, 80, 35);
            this.bag_btnItem = Tool.addBitmap(this.bagContainer, "bag_btnItem0_png", 120, 10, 80, 35);
            this.bag_btnPiece = Tool.addBitmap(this.bagContainer, "bag_btnPiece0_png", 210, 10, 80, 35);
            this.bag_btnUse = Tool.addBitmap(this.bagContainer, "bag_btnUse0_png", 300, 10, 80, 35);
            this.bagGoldNum = Tool.addTextField(this.bagContainer, 340, 285, 80, 18, 18, 0x000000, GameData.goldNum);
            this.bagDiamondNum = Tool.addTextField(this.bagContainer, 215, 285, 90, 18, 18, 0x000000, GameData.diamondNum);
            this.bagGoldNum.textAlign = egret.HorizontalAlign.LEFT;
            this.bagDiamondNum.textAlign = egret.HorizontalAlign.LEFT;
            this.bagBackground.touchEnabled = true;
            this.bag_btnEquip.touchEnabled = true;
            this.bag_btnItem.touchEnabled = true;
            this.bag_btnPiece.touchEnabled = true;
            this.bag_btnUse.touchEnabled = true;
            this.bagBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                if (e.localX > 390 && e.localX < 420 && e.localY > 10 && e.localY < 40)
                    this.ctrlBag("hide");
            }, this);
            this.bag_btnEquip.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                if (this.bagBtnIndex == "Equip")
                    return;
                this.bagBtnIndex = "Equip";
                this.ctrlBag("changeBtn");
            }, this);
            this.bag_btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                if (this.bagBtnIndex == "Item")
                    return;
                this.bagBtnIndex = "Item";
                this.ctrlBag("changeBtn");
            }, this);
            this.bag_btnPiece.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                if (this.bagBtnIndex == "Piece")
                    return;
                this.bagBtnIndex = "Piece";
                this.ctrlBag("changeBtn");
            }, this);
            this.bag_btnUse.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                e.stopImmediatePropagation();
                if (this.bagBtnIndex == "Use")
                    return;
                this.bagBtnIndex = "Use";
                this.ctrlBag("changeBtn");
            }, this);
            this.bagItemGroup = new eui.Group();
            this.bagItemGroup.touchEnabled = true;
            this.bagItemGroup.width = 400;
            this.bagItemGroup.height = 70 * 5;
            this.bagItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < 5; i++) {
                this.bagItems.push(Tool.addBitmap(this.bagItemGroup, "bag_item_png", 0, i * 70, 400, 65));
                for (var a = 0; a < 7; a++) {
                    var index = i * 7 + a;
                    if (this.bagData[this.bagBtnIndex][index] == null)
                        break;
                    this.bagIcon.push(Tool.addBitmap(this.bagItemGroup, this.bagData[this.bagBtnIndex][index].icon, 14 + a * 55.2, i * 70 + 12, 40, 40));
                    this.bagItemNum.push(Tool.addTextField(this.bagItemGroup, 35 + a * 55.2, i * 70 + 40, 20, 15, 15, 0x000000, this.bagData[this.bagBtnIndex][index].num + ""));
                    this.bagItemNum[index].stroke = 1;
                    this.bagItemNum[index].visible = false;
                    this.bagItemNum[index].textAlign = egret.HorizontalAlign.RIGHT;
                    this.bagIcon[index].touchEnabled = true;
                    this.bagIcon[index].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        for (var b = 0; b < this.bagIcon.length; b++) {
                            if (e.target == this.bagIcon[b]) {
                                this.bagIndex = b;
                                this.ctrlBag("showDetail");
                                return;
                            }
                        }
                    }, this);
                }
            }
            //设置滑动组件
            var tempGroup = new eui.Group();
            var scroll = new eui.Scroller();
            scroll.x = 15;
            scroll.y = 58;
            scroll.width = 400;
            scroll.height = 210;
            scroll.viewport = tempGroup;
            scroll.touchEnabled = true;
            this.bagContainer.addChild(scroll);
            tempGroup.addChild(this.bagItemGroup);
            this.addChild(this.bagContainer);
            this.bagContainer.scaleX = 0;
            this.bagContainer.scaleY = 0;
            var tw = egret.Tween.get(this.bagContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.bagContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.bagContainer);
                this.bagDetailContainer = null;
                this.bagweaponNumText = null;
                this.bagBackground = null;
                this.bagContainer = null;
                this.bagItemGroup = null;
                this.bagIsDetail = null;
                this.bagweaponNum = null;
                this.bagIndex = null;
                this.bagItems = null;
                this.bagIcon = null;
                this.bagName = null;
                this.bagInfo = null;
                this.bagCost = null;
                this.bagData = null;
                this.bagSum = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "changeBtn") {
            console.log("changeBtn");
            this.bagGoldNum.text = GameData.goldNum + "";
            this.bagDiamondNum.text = GameData.diamondNum + "";
            this.bag_btnEquip.texture = RES.getRes("bag_btnEquip0_png");
            this.bag_btnItem.texture = RES.getRes("bag_btnItem0_png");
            this.bag_btnPiece.texture = RES.getRes("bag_btnPiece0_png");
            this.bag_btnUse.texture = RES.getRes("bag_btnUse0_png");
            this["bag_btn" + this.bagBtnIndex].texture = RES.getRes("bag_btn" + this.bagBtnIndex + "1_png");
            for (var i = 0; i < this.bagIcon.length; i++) {
                Tool.clearItem(this.bagIcon[i]);
                Tool.clearItem(this.bagItemNum[i]);
            }
            this.bagIcon.length = 0;
            this.bagItemNum.length = 0;
            for (var i = 0; i < 5; i++) {
                for (var a = 0; a < 7; a++) {
                    var index = i * 7 + a;
                    if (this.bagData[this.bagBtnIndex][index] == null)
                        break;
                    this.bagIcon.push(Tool.addBitmap(this.bagItemGroup, this.bagData[this.bagBtnIndex][index].icon, 14 + a * 55.2, i * 70 + 12, 40, 40));
                    this.bagItemNum.push(Tool.addTextField(this.bagItemGroup, 35 + a * 55.2, i * 70 + 40, 20, 15, 15, 0x000000, this.bagData[this.bagBtnIndex][index].num + ""));
                    this.bagItemNum[index].stroke = 1;
                    if (this.bagBtnIndex == "Equip")
                        this.bagItemNum[index].visible = false;
                    else
                        this.bagItemNum[index].visible = true;
                    this.bagItemNum[index].textAlign = egret.HorizontalAlign.RIGHT;
                    this.bagIcon[index].touchEnabled = true;
                    this.bagIcon[index].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        for (var b = 0; b < this.bagIcon.length; b++) {
                            if (e.target == this.bagIcon[b]) {
                                this.bagIndex = b;
                                this.ctrlBag("showDetail");
                                return;
                            }
                        }
                    }, this);
                }
            }
        }
        else if (type == "showDetail") {
            this.bagIsDetail = true;
            this.bagDetailContainer = new egret.DisplayObjectContainer();
            this.bagDetailContainer.width = 300;
            this.bagDetailContainer.height = 150;
            this.bagDetailContainer.anchorOffsetX = 300 / 2;
            this.bagDetailContainer.anchorOffsetY = 150 / 2;
            this.bagDetailContainer.x = this.bagContainer.width / 2;
            this.bagDetailContainer.y = this.bagContainer.height / 2;
            this.bagContainer.addChild(this.bagDetailContainer);
            var background = Tool.addBitmap(this.bagDetailContainer, "bag_detail" + this.bagBtnIndex + "_png", 0, 0, 300, 150);
            var icon = Tool.addBitmap(this.bagDetailContainer, this.bagData[this.bagBtnIndex][this.bagIndex].icon, 28, 30, 50, 50);
            var itemName = Tool.addTextField(this.bagDetailContainer, 100, 23, 80, 20, 16, 0x000000, this.bagData[this.bagBtnIndex][this.bagIndex].name);
            var intruction = Tool.addTextField(this.bagDetailContainer, 97, 47, 180, 41, 12, 0x000000, this.bagData[this.bagBtnIndex][this.bagIndex].info);
            var cost = Tool.addTextField(this.bagDetailContainer, 200, 23, 130, 75, 15, 0x000000, "售价:" + this.bagData[this.bagBtnIndex][this.bagIndex].cost);
            if (this.bagBtnIndex != "Equip") {
                var numText = Tool.addTextField(this.bagDetailContainer, 62, 75, 20, 15, 15, 0x000000, this.bagData[this.bagBtnIndex][this.bagIndex].num + "");
                numText.textAlign = egret.HorizontalAlign.RIGHT;
                numText.stroke = 1;
                this.bagSaleNum = new eui.EditableText();
                this.bagSaleNum.x = 133;
                this.bagSaleNum.y = 113;
                this.bagSaleNum.width = 35;
                this.bagSaleNum.height = 20;
                this.bagSaleNum.size = 20;
                this.bagSaleNum.textColor = 0x000000;
                this.bagSaleNum.textAlign = egret.HorizontalAlign.CENTER;
                this.bagSaleNum.text = "1";
                this.bagDetailContainer.addChild(this.bagSaleNum);
                this.bagSaleNum.addEventListener(egret.Event.FOCUS_OUT, function () {
                    var temp = parseInt(this.bagSaleNum.text);
                    if (temp > this.bagData[this.bagBtnIndex][this.bagIndex].num)
                        this.bagSaleNum.text = "" + this.bagData[this.bagBtnIndex][this.bagIndex].num;
                }, this);
            }
            itemName.textAlign = egret.HorizontalAlign.LEFT;
            cost.textAlign = egret.HorizontalAlign.LEFT;
            intruction.textAlign = egret.HorizontalAlign.LEFT;
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 20 && e.localX < 100 && e.localY > 110 && e.localY < 140) {
                    this.showSure("确定卖出吗？", function () {
                        if (this.sureAnswer) {
                            console.log("卖出成功");
                            if (this.bagBtnIndex == "Equip") {
                                GameData.goldNum += this.bagData[this.bagBtnIndex][this.bagIndex].cost;
                                Tool.removeOne(this.bagData[this.bagBtnIndex], this.bagIndex);
                            }
                            else {
                                GameData.goldNum += this.bagData[this.bagBtnIndex][this.bagIndex].cost * parseInt(this.bagSaleNum.text);
                                this.bagData[this.bagBtnIndex][this.bagIndex].num -= parseInt(this.bagSaleNum.text);
                                if (this.bagData[this.bagBtnIndex][this.bagIndex].num == 0)
                                    Tool.removeOne(this.bagData[this.bagBtnIndex], this.bagIndex);
                            }
                            GameData.saveData(); //保存数据
                            this.ctrlBag("changeBtn"); //刷新数据
                            this.ctrlBag("hideDetail");
                        }
                    }.bind(this));
                }
                else if (e.localX > 110 && e.localX < 190 && e.localY > 110 && e.localY < 140) {
                    if (this.bagBtnIndex == "Equip")
                        console.log("装备成功");
                    else if (this.bagBtnIndex == "Piece")
                        console.log("合成成功");
                    else if (this.bagBtnIndex == "Use" || this.bagBtnIndex == "Item") {
                        var tempNum = parseInt(this.bagSaleNum.text);
                        if (e.localX > 110 && e.localX < 130 && tempNum > 1)
                            this.bagSaleNum.text = "" + (tempNum - 1);
                        else if (e.localX > 170 && e.localX < 190 && tempNum < this.bagData[this.bagBtnIndex][this.bagIndex].num)
                            this.bagSaleNum.text = "" + (tempNum + 1);
                    }
                }
                else if (e.localX > 200 && e.localX < 280 && e.localY > 110 && e.localY < 140)
                    this.ctrlBag("hideDetail");
            }, this);
            this.bagDetailContainer.scaleX = 0;
            this.bagDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.bagDetailContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {
            if (!this.bagIsDetail)
                return;
            this.bagIsDetail = false;
            var tw = egret.Tween.get(this.bagDetailContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.bagContainer.removeChild(this.bagDetailContainer);
                this.bagDetailContainer = null;
                this.bagweaponNumText = null;
                this.bagSum = null;
                this.showing = "bag";
            }, this);
        }
    };
    //药品商店面板
    p.ctrlDrupShop = function (type, num) {
        if (num === void 0) { num = 1; }
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
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
            this.drupShopBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 205 && e.localX < 250 && e.localY > 345 && e.localY < 390)
                    this.ctrlDrupShop("hide");
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
                this.drupShopIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
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
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.drupShopContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
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
        else if (type == "showDetail") {
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
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                console.log("x   " + e.localX, "   y   " + e.localY);
                if (e.localX > 188 && e.localX < 203 && e.localY > 40 && e.localY < 58)
                    this.ctrlDrupShop("update", --this.drupShopDrupNum);
                else if (e.localX > 267 && e.localX < 283 && e.localY > 40 && e.localY < 58)
                    this.ctrlDrupShop("update", ++this.drupShopDrupNum);
                else if (e.localX > 40 && e.localX < 135 && e.localY > 105 && e.localY < 165) {
                    if (this.drupShopSum.textColor == 0xff0000)
                        this.showTip("金币不足");
                    else {
                        this.showTip("购买成功");
                        this.ctrlDrupShop("hideDetail");
                    }
                }
                else if (e.localX > 190 && e.localX < 260 && e.localY > 135 && e.localY < 165)
                    this.ctrlDrupShop("hideDetail");
            }, this);
            this.drupShopDetailContainer.scaleX = 0;
            this.drupShopDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.drupShopDetailContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {
            if (!this.drupShopIsDetail)
                return;
            this.drupShopIsDetail = false;
            var tw = egret.Tween.get(this.drupShopDetailContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
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
            if (this.drupShopDrupNum < 1)
                this.drupShopDrupNum = 1;
            else if (this.drupShopDrupNum > 99)
                this.drupShopDrupNum = 99;
            this.drupShopDrupNumText.text = Tool.setZero(this.drupShopDrupNum, 2);
            var sum = this.drupShopData.items[this.drupShopIndex].cost * this.drupShopDrupNum;
            this.drupShopSum.text = "总额:" + sum;
            if (sum < GameData.goldNum)
                this.drupShopSum.textColor = 0xffffff;
            else
                this.drupShopSum.textColor = 0xff0000;
        }
    };
    //武器商店面板
    p.ctrlWeaponShop = function (type, num) {
        if (num === void 0) { num = 1; }
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
            this.weaponShopData = weaponShop;
            this.showing = "weaponShop";
            this.weaponShopItems = [];
            this.weaponShopIcon = [];
            this.weaponShopName = [];
            this.weaponShopInfo = [];
            this.weaponShopCost = [];
            this.weaponShopContainer = new egret.DisplayObjectContainer();
            this.weaponShopContainer.width = 500;
            this.weaponShopContainer.height = 400;
            this.weaponShopContainer.anchorOffsetX = this.weaponShopContainer.width / 2;
            this.weaponShopContainer.anchorOffsetY = this.weaponShopContainer.height / 2;
            this.weaponShopContainer.x = this.width / 2;
            this.weaponShopContainer.y = 210;
            this.weaponShopBackground = Tool.addBitmap(this.weaponShopContainer, "weaponShop_background_png", 0, 0, 550, 400);
            this.weaponShopBackground.touchEnabled = true;
            this.weaponShopBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 200 && e.localX < 260 && e.localY > 345 && e.localY < 385)
                    this.ctrlWeaponShop("hide");
            }, this);
            this.weaponShopItemGroup = new eui.Group();
            this.weaponShopItemGroup.touchEnabled = true;
            this.weaponShopItemGroup.width = 370;
            this.weaponShopItemGroup.height = 70 * this.weaponShopData.items.length;
            this.weaponShopItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.weaponShopData.items.length; i++) {
                this.weaponShopItems.push(Tool.addBitmap(this.weaponShopItemGroup, "weaponShop_item_png", 0, i * 70, 370, 65));
                this.weaponShopIcon.push(Tool.addBitmap(this.weaponShopItemGroup, this.weaponShopData.items[i].icon, 17, i * 70 + 10, 40, 40));
                this.weaponShopName.push(Tool.addTextField(this.weaponShopItemGroup, 80, i * 70 + 8, 0, 0, 20, 0x000000, this.weaponShopData.items[i].name));
                this.weaponShopCost.push(Tool.addTextField(this.weaponShopItemGroup, 290, i * 70 + 10, 0, 0, 18, 0x000000, this.weaponShopData.items[i].cost));
                this.weaponShopInfo.push(Tool.addTextField(this.weaponShopItemGroup, 80, i * 70 + 38, 0, 0, 15, 0x000000, this.weaponShopData.items[i].info));
                this.weaponShopName[i].textAlign = egret.HorizontalAlign.LEFT;
                this.weaponShopInfo[i].textAlign = egret.HorizontalAlign.LEFT;
                this.weaponShopIcon[i].touchEnabled = true;
                this.weaponShopIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    for (var a = 0; a < this.weaponShopIcon.length; a++) {
                        if (e.target == this.weaponShopIcon[a]) {
                            this.weaponShopIndex = a;
                            this.ctrlWeaponShop("showDetail");
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
            this.weaponShopContainer.addChild(scroll);
            tempGroup.addChild(this.weaponShopItemGroup);
            this.addChild(this.weaponShopContainer);
            this.weaponShopContainer.scaleX = 0;
            this.weaponShopContainer.scaleY = 0;
            var tw = egret.Tween.get(this.weaponShopContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.weaponShopContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.weaponShopContainer);
                this.weaponShopDetailContainer = null;
                this.weaponShopweaponNumText = null;
                this.weaponShopBackground = null;
                this.weaponShopContainer = null;
                this.weaponShopItemGroup = null;
                this.weaponShopIsDetail = null;
                this.weaponShopweaponNum = null;
                this.weaponShopIndex = null;
                this.weaponShopItems = null;
                this.weaponShopIcon = null;
                this.weaponShopName = null;
                this.weaponShopInfo = null;
                this.weaponShopCost = null;
                this.weaponShopData = null;
                this.weaponShopSum = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "showDetail") {
            this.weaponShopIsDetail = true;
            this.weaponShopDetailContainer = new egret.DisplayObjectContainer();
            this.weaponShopDetailContainer.width = 300;
            this.weaponShopDetailContainer.height = 180;
            this.weaponShopDetailContainer.anchorOffsetX = 300 / 2;
            this.weaponShopDetailContainer.anchorOffsetY = 180 / 2;
            this.weaponShopDetailContainer.x = this.weaponShopContainer.width / 2;
            this.weaponShopDetailContainer.y = this.weaponShopContainer.height / 2;
            this.weaponShopContainer.addChild(this.weaponShopDetailContainer);
            var background = Tool.addBitmap(this.weaponShopDetailContainer, "weaponShop_detail_png", 0, 0, 300, 180);
            var icon = Tool.addBitmap(this.weaponShopDetailContainer, this.weaponShopData.items[this.weaponShopIndex].icon, 27, 33, 50, 50);
            var weaponName = Tool.addTextField(this.weaponShopDetailContainer, 12, 98, 80, 20, 16, 0xffffff, this.weaponShopData.items[this.weaponShopIndex].name);
            var intruction = Tool.addTextField(this.weaponShopDetailContainer, 90, 50, 195, 70, 15, 0xffffff, this.weaponShopData.items[this.weaponShopIndex].info);
            var cost = Tool.addTextField(this.weaponShopDetailContainer, 90, 28, 130, 16, 16, 0xffffff, "售价:" + this.weaponShopData.items[this.weaponShopIndex].cost);
            cost.textAlign = egret.HorizontalAlign.LEFT;
            intruction.textAlign = egret.HorizontalAlign.LEFT;
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 40 && e.localX < 135 && e.localY > 105 && e.localY < 165) {
                    if (this.weaponShopSum.textColor == 0xff0000)
                        this.showTip("金币不足");
                    else {
                        this.showTip("购买成功");
                        this.ctrlWeaponShop("hideDetail");
                    }
                }
                else if (e.localX > 190 && e.localX < 260 && e.localY > 135 && e.localY < 165)
                    this.ctrlWeaponShop("hideDetail");
            }, this);
            this.weaponShopDetailContainer.scaleX = 0;
            this.weaponShopDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.weaponShopDetailContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {
            if (!this.weaponShopIsDetail)
                return;
            this.weaponShopIsDetail = false;
            var tw = egret.Tween.get(this.weaponShopDetailContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.weaponShopContainer.removeChild(this.weaponShopDetailContainer);
                this.weaponShopDetailContainer = null;
                this.weaponShopweaponNumText = null;
                this.weaponShopSum = null;
                this.showing = "weaponShop";
            }, this);
        }
    };
    //能力面板
    p.ctrlAbility = function (type) {
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
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
            this.abilityBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (this.abilityIsDetail)
                    return;
                if (e.stageX > 270 && e.stageX < 425 && e.stageY > 360 && e.stageY < 390)
                    this.ctrlAbility("hide");
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
                if (this.abilityData.data[i].state > 5)
                    this.abilityData.data[i].state = 5;
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png", i * 80 + 187, 290, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 302, 50, 0, 15, 0xff0000, this.abilityData.data[i].level + "/" + this.abilityData.data[i].maxLevel));
                this.abilityText[i + 10].textAlign = egret.HorizontalAlign.RIGHT;
            }
            this.addChild(this.abilityContainer);
            this.abilityContainer.scaleX = 0;
            this.abilityContainer.scaleY = 0;
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
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
        else if (type == "showDetail") {
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
            if (this.abilityIndex < 5)
                intruction.text = this.abilityData.skill1[this.abilityIndex].intruction;
            else if (this.abilityIndex < 10)
                intruction.text = this.abilityData.skill2[this.abilityIndex - 5].intruction;
            else if (this.abilityIndex < 15)
                intruction.text = this.abilityData.data[this.abilityIndex - 10].intruction;
            intruction.textAlign = egret.HorizontalAlign.LEFT;
            this.abilityDetailIcon = new egret.Bitmap();
            this.abilityDetailIcon.texture = this.abilityIcon[this.abilityIndex].texture;
            this.abilityDetailContainer.addChild(this.abilityDetailIcon);
            this.abilityDetailIcon.width = 50;
            this.abilityDetailIcon.height = 50;
            this.abilityDetailIcon.x = 40;
            this.abilityDetailIcon.y = 65;
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.localX > 40 && e.localX < 85 && e.localY > 85 && e.localY < 110)
                    this.ctrlAbility("levelUp");
                else if (e.localX > 215 && e.localX < 280 && e.localY > 5 && e.localY < 35)
                    this.ctrlAbility("hideDetail");
            }, this);
            this.abilityDetailContainer.scaleX = 0;
            this.abilityDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.abilityDetailContainer);
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {
            if (!this.abilityIsDetail)
                return;
            this.abilityIsDetail = false;
            var tw = egret.Tween.get(this.abilityDetailContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.abilityContainer.removeChild(this.abilityDetailContainer);
                this.abilityDetailContainer = null;
                this.abilityDetailLevel = null;
                this.showing = "ability";
            }, this);
        }
        else if (type == "levelUp") {
            if (this.abilityIndex < 5) {
                if (GameData.skillNum > 0 && this.abilityData.skill1[this.abilityIndex].level < this.abilityData.skill1[this.abilityIndex].maxLevel) {
                    GameData.skillNum--;
                    this.abilityData.skill1[this.abilityIndex].level++;
                    this.abilityText[this.abilityIndex].text = this.abilityData.skill1[this.abilityIndex].level + "/" + this.abilityData.skill1[this.abilityIndex].maxLevel;
                }
            }
            else if (this.abilityIndex < 10) {
                if (GameData.skillNum > 0 && this.abilityData.skill2[this.abilityIndex - 5].level < this.abilityData.skill2[this.abilityIndex - 5].maxLevel) {
                    GameData.skillNum--;
                    this.abilityData.skill2[this.abilityIndex - 5].level++;
                    this.abilityText[this.abilityIndex].text = this.abilityData.skill2[this.abilityIndex - 5].level + "/" + this.abilityData.skill2[this.abilityIndex - 5].maxLevel;
                }
            }
            else if (this.abilityIndex < 15) {
                var i = this.abilityIndex - 10;
                if (GameData.bodyNum > 0 && this.abilityData.data[i].level < this.abilityData.data[i].maxLevel) {
                    GameData.bodyNum--;
                    this.abilityData.data[i].level++;
                    this.abilityData.data[i].state = Math.floor(this.abilityData.data[i].level / (this.abilityData.data[i].maxLevel / 5)) + 1;
                    if (this.abilityData.data[i].state > 5)
                        this.abilityData.data[i].state = 5;
                    this.abilityIcon[this.abilityIndex].texture = RES.getRes(this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png");
                    this.abilityDetailIcon.texture = RES.getRes(this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png");
                    this.abilityText[this.abilityIndex].text = this.abilityData.data[i].level + "/" + this.abilityData.data[i].maxLevel;
                }
            }
            this.abilityDetailLevel.text = "Level:" + this.abilityText[this.abilityIndex].text.substr(0, this.abilityText[this.abilityIndex].text.length - 3);
            this.abilityBody.text = "剩余属性值:" + GameData.bodyNum;
            this.abilitySkill.text = "剩余技能点:" + GameData.skillNum;
        }
    };
    //成就面板
    p.ctrlAhievement = function (type) {
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
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
            this.achievementBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.stageX > 600 && e.stageX < 630 && e.stageY > 75 && e.stageY < 100)
                    this.ctrlAhievement("hide");
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
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.achievementContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
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
    };
    //对每日任务界面的操作
    p.ctrlDaily = function (type) {
        if (type == "show") {
            if (this.showing != "empty")
                return; //若已经在显示着面板
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
            this.dailyBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                if (e.stageX > 600 && e.stageX < 630 && e.stageY > 75 && e.stageY < 100)
                    this.ctrlDaily("hide");
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
            tw.to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")
                return;
            var tw = egret.Tween.get(this.dailyContainer);
            tw.to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
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
    };
    //同步函数
    p.syncFun = function () {
        if (this.isTop) {
            this.bloodText.text = "血量:" + Hero.getInstance().blood + " / " + Hero.getInstance().bloodMax;
            this.powerText.text = "法力:" + Hero.getInstance().power + " / " + Hero.getInstance().powerMax;
            this.expText.text = "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax;
            this.bloodBar.width = Hero.getInstance().blood / Hero.getInstance().bloodMax * 120;
            this.powerBar.width = Hero.getInstance().power / Hero.getInstance().powerMax * 120;
            this.expBar.width = Hero.getInstance().exp / Hero.getInstance().expMax * 120;
            this.level.text = "LEVEL" + Hero.getInstance().level;
        }
    };
    //触屏按下
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        if (this.isCtrl) {
            if (e.target == this.left)
                Hero.getInstance().action("LeftDown");
            else if (e.target == this.right)
                Hero.getInstance().action("RightDown");
            else if (e.target == this.jump)
                Hero.getInstance().action("JumpDown");
            else if (e.target == this.attack)
                Hero.getInstance().action("AttackDown");
            else if (e.target == this.skill1)
                Hero.getInstance().action("SkillDown");
            else if (e.target == this.skill2)
                Hero.getInstance().action("SkillDown");
        }
    };
    //触屏松开
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        if (this.isCtrl) {
            if (e.target == this.left)
                Hero.getInstance().action("stand");
            else if (e.target == this.right)
                Hero.getInstance().action("stand");
            else if (e.target == this.jump)
                Hero.getInstance().action("other");
            else if (e.target == this.attack)
                Hero.getInstance().action("stand");
            else if (e.target == this.skill1)
                Hero.getInstance().action("stand");
            else if (e.target == this.skill2)
                Hero.getInstance().action("stand");
        }
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return CtrlScene;
})(egret.DisplayObjectContainer);
egret.registerClass(CtrlScene,"CtrlScene");
