//Momo在信息页面实现装备武器
//Momo实现hero属性数据的变化
//实现卸下装备功能
//判断该位置是否装备道具
//实现卸下后，装备返回背包，以及从背包中实现装备道具
//搭建装备选择页面
//实现从装备选择框着装装备
//装备等级的显示
//内存回收
//点击约束


//操作层页面
class CtrlScene extends egret.DisplayObjectContainer {
    private static instance;
    private tipInfo:egret.TextField;//提示信息
    private showing:string = "empty";//标示正在显示着什么面板
    private isTip:boolean = false;//标示是否在显示提示

    //确定弹框
    private sureContainer:egret.DisplayObjectContainer;//确定框容器
    private sureInfo:egret.TextField;//弹框信息
    private sureAnswer:boolean = false;//弹框返回的信息

    //顶部素材示
    private isTop:boolean = false;//标是否显示顶部
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
    private abilitySelectBox1:egret.Bitmap;//技能一选择框
    private abilitySelectBox2:egret.Bitmap;//技能二选择框
    private abilityIcon:Array<egret.Bitmap>;//各个图标
    private abilityBody:egret.TextField;//剩余属性点
    private abilitySkill:egret.TextField;//剩余技能点
    private abilityState:egret.TextField;//当前技能携带状态
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

    //武器商店素材
    private weaponShopContainer:egret.DisplayObjectContainer;//药店显示容器
    private weaponShopDetailContainer:egret.DisplayObjectContainer;//药品弹框显示容器
    private weaponShopItemGroup:eui.Group;//成就显示容器
    private weaponShopBackground:egret.Bitmap;//背景
    private weaponShopItems:Array<egret.Bitmap>;//商品项背景
    private weaponShopIcon:Array<egret.Bitmap>;//各个图标
    private weaponShopName:Array<egret.TextField>;//商品名
    private weaponShopInfo:Array<egret.TextField>;//商品信息
    private weaponShopCost:Array<egret.TextField>;//商品价格
    private weaponShopSum:egret.TextField;//商品的总价格
    private weaponShopIndex:number = 0;//商品的选项下标
    private weaponShopIsDetail:boolean = false;//标示是否在显示详细面板
    private weaponShopData:any;//药店数据

    //背包素材
    private bagContainer:egret.DisplayObjectContainer;//药店显示容器
    private bagDetailContainer:egret.DisplayObjectContainer;//药品弹框显示容器
    private bagItemGroup:eui.Group;//成就显示容器
    private bagBackground:egret.Bitmap;//背景
    private bag_btnEquipment:egret.Bitmap;//装备选择卡
    private bag_btnItem:egret.Bitmap;//物品选择卡
    private bag_btnPiece:egret.Bitmap;//碎片选择卡
    private bag_btnDrup:egret.Bitmap;//药品选择卡
    private bagBooldBox:egret.Bitmap;//红瓶携带框
    private bagPowerBox:egret.Bitmap;//蓝瓶携带框
    private bagItems:Array<egret.Bitmap>;//商品项背景
    private bagIcon:Array<egret.Bitmap>;//各个图标
    private bagItemNum:Array<egret.TextField>;//标示物品个数
    private bagGoldNum:egret.TextField;//用户金币数
    private bagDiamondNum:egret.TextField;//用户砖石数
    private bagBtnName:string = "Equip";//背包选择卡的下标
    private bagIndex:number = 0;//商品的选项下标
    private bagIsDetail:boolean = false;//标示是否在显示详细面板
    //private bagData:any;//药店数据

    //玩家信息页面
    private dataContainer:egret.DisplayObjectContainer;//药品弹框显示容器
    private dataAddContainer:egret.DisplayObjectContainer;//着装装备的显示容器
    private dataDetailContainer:egret.DisplayObjectContainer;//装备详细信息页面容器
    private dataAddData:any;//保存选中的Icon信息
    private dataAddItems:any;//保存选中的Icon信息
    private dataAddIcon:any;//保存选中的Icon信息
    private dataSelectObj:any;//保存选中的Icon信息
    private dataAddType:string;//添加的装备类型
    private dataOldY:number;//旧的点击值，用于判断点击和滑动

    //武器升级页面
    private weaponContainer:egret.DisplayObjectContainer;//武器升级页面显示容器
    private weaponBackground:egret.Bitmap;//武器升级背景图
    private weaponExpbar:egret.Bitmap;//武器经验条
    private weaponState:number = 0;//武器升级面板状态

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
            if (getDrup(GameData.bag_BooldId))this.blood = Tool.addBitmap(this, getDrup(GameData.bag_BooldId).res, 190, 445, 50, 50, true, true);
            if (getDrup(GameData.bag_PowerId))this.power = Tool.addBitmap(this, getDrup(GameData.bag_PowerId).res, 260, 445, 50, 50, true, true);
            this.skill1 = Tool.addBitmap(this, ability.skill1[GameData.skill1Index].icon, 540, 445, 50, 50, true, true);
            this.skill2 = Tool.addBitmap(this, ability.skill2[GameData.skill2Index].icon, 610, 445, 50, 50, true, true);
        }
        else if (type == "welcome") {
            this.level = Tool.addTextField(this, 250, 425, 0, 0, 30, 0x000000, "LEVEL:" + Hero.getInstance().level);
            this.expText = Tool.addTextField(this, 460, 415, 0, 0, 15, 0x000000, "经验:" + Hero.getInstance().exp + " / " + Hero.getInstance().expMax);
            this.expBar = Tool.addBitmap(this, "ctrl_expBar_png", 460, 440, 120, 30);
            Tool.addBitmap(this, "ctrl_barBackground_png", 460 - 5, 440 - 5, 120 + 10, 30 + 10);
        }
        this.ctrlData("show");
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

    //显示确定弹框
    public showSure(info, fun):void {
        if (this.sureContainer != null)return;
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
        background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
            var isHide:boolean = false;
            if (e.localX > 30 && e.localX < 110 && e.localY > 110 && e.localY < 140) {//卖出
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
        tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
    }

    //显示武器升级页面
    public ctrlWeapon(type:string, index:number = 0):void {
        if (type == "show") {
            if (this.weaponContainer != null)return;
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
            this.weaponBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 465 && e.localX < 500 && e.localY > 0 && e.localY < 50)this.ctrlWeapon("hide");
                else if (e.localX > 195 && e.localX < 305 && e.localY > 95 && e.localY < 225)this.ctrlWeapon("select");
                else if (this.weaponState > 0) {//已经选择升级的武器
                    if (e.localX > 175 && e.localX < 320 && e.localY > 240 && e.localY < 285)this.ctrlWeapon("levelUp");
                    else if (e.localX > 42 && e.localX < 102 && e.localY > 40 && e.localY < 105)this.ctrlWeapon("input", 1);
                    else if (e.localX > 400 && e.localX < 460 && e.localY > 40 && e.localY < 105)this.ctrlWeapon("input", 2);
                    else if (e.localX > 42 && e.localX < 102 && e.localY > 200 && e.localY < 265)this.ctrlWeapon("input", 3);
                    else if (e.localX > 400 && e.localX < 460 && e.localY > 200 && e.localY < 265)this.ctrlWeapon("input", 4);
                }
            }, this);
            this.weaponContainer.alpha = 0;
            var tw = egret.Tween.get(this.weaponContainer);
            tw.to({alpha: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            console.log("hide");
            egret.Tween.get(this.weaponContainer).to({alpha: 0}, 500, egret.Ease.backIn).call(function () {
                this.weaponContainer = Tool.clearItem(this.weaponContainer);
            }, this);
        }
        else if (type == "select") {//选择武器
            console.log("select");
            this.weaponBackground.texture = RES.getRes("weapon_background" + this.weaponState + "_png");


        }
        else if (type == "input") {//选择升级材料
            console.log("index   " + index);

        }
        else if (type == "levelUp") {//武器升级
            console.log("levelUp");
        }


    }

    //显示玩家信息弹框
    public ctrlData(type:string, detailType:number = 0):void {
        if (type == "show") {
            //this.ctrlData("showAdd");
            //return;

            if (this.dataContainer != null)return;
            this.dataContainer = new egret.DisplayObjectContainer();
            this.dataContainer.width = 500;
            this.dataContainer.height = 400;
            this.dataContainer.anchorOffsetX = 500 / 2;
            this.dataContainer.anchorOffsetY = 400 / 2;
            this.dataContainer.x = GameData.gameWidth / 2;
            this.dataContainer.y = GameData.gameHeight / 2 - 35;
            this.addChild(this.dataContainer);

            var i:number = 0;
            var background = Tool.addBitmap(this.dataContainer, "data_background_png", 0, 0, 500, 400);

            //玩家数值显示
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "职业:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "等级:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "血量:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "法量:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "物攻:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "法攻:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "物抗:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "法抗:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "攻速:" + i).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataContainer, 300, 35 + 30 * (i++), 170, 20, 20, 0x000000, "移速:" + i).textAlign = egret.HorizontalAlign.LEFT;

            //玩家装备显示//设置坐标数组，装备名数组，根据数组名检查装备，再显示图标，即装备种类固定数组下标，这样连接图标的点击响应
            var value;
            for (value in GameData.data_Equipment) {
                if (value == "ring") {
                    GameData.data_Equipment["ring"].forEach(function (value2, index2) {
                        if (value2 == -1)return;
                        heroState[value][index2].id = value2;
                        Tool.addBitmap(this.dataContainer, "item_background" + getEquipment(value2).grade + "_png", heroState[value][index2].x, heroState[value][index2].y, 50, 50, false, true);
                        Tool.addBitmap(this.dataContainer, getEquipment(value2).res, heroState[value][index2].x, heroState[value][index2].y, 40, 40, false, true);
                    }.bind(this));
                }
                else {
                    if (GameData.data_Equipment[value] == -1)continue;
                    heroState[value].id = GameData.data_Equipment[value];
                    Tool.addBitmap(this.dataContainer, "item_background" + getEquipment(GameData.data_Equipment[value]).grade + "_png", heroState[value].x, heroState[value].y, 50, 50, false, true);
                    Tool.addBitmap(this.dataContainer, getEquipment(GameData.data_Equipment[value]).res, heroState[value].x, heroState[value].y, 40, 40, false, true);
                }
            }
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 475 && e.localX < 500 && e.localY > 0 && e.localY < 25)this.ctrlData("hide");
                else {
                    if (this.dataAddContainer || this.dataDetailContainer)return;
                    for (value in heroState) {
                        if (value == "ring") {
                            for (var i = 0; i < heroState[value].length; i++) {
                                if (e.localX > heroState[value][i].x - 25 && e.localX < heroState[value][i].x + 25 && e.localY > heroState[value][i].y - 25 && e.localY < heroState[value][i].y + 25) {
                                    this.dataSelectObj = {};
                                    this.dataSelectObj.x = heroState[value][i].x;
                                    this.dataSelectObj.y = heroState[value][i].y;
                                    this.dataSelectObj._type = value;
                                    this.dataSelectObj._index = i;

                                    if (heroState[value][i].id == -1) {
                                        this.dataAddType = "ring";
                                        this.ctrlData("showAdd");
                                        return;
                                    }
                                    else this.dataSelectObj.id = heroState[value][i].id;
                                    this.ctrlData("showDetail");
                                    return;
                                }
                            }
                        }
                        else if (e.localX > heroState[value].x - 25 && e.localX < heroState[value].x + 25 && e.localY > heroState[value].y - 25 && e.localY < heroState[value].y + 25) {
                            this.dataSelectObj = {};
                            this.dataSelectObj.x = heroState[value].x;
                            this.dataSelectObj.y = heroState[value].y;
                            this.dataSelectObj._type = value;

                            if (heroState[value].id == -1) {
                                this.dataAddType = value;
                                this.ctrlData("showAdd");
                                return;
                            }
                            else this.dataSelectObj.id = heroState[value].id;
                            this.ctrlData("showDetail");
                            return;
                        }
                    }
                }
            }, this);

            this.dataContainer.scaleX = 0;
            this.dataContainer.scaleY = 0;
            var tw = egret.Tween.get(this.dataContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);


        }
        else if (type == "hide") {
            if (this.dataAddContainer || this.dataDetailContainer)return;
            egret.Tween.get(this.dataContainer).to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.dataContainer);
                this.dataContainer = null;
                this.dataAddContainer = null;
                this.dataDetailContainer = null;
                this.dataAddData = null;
                this.dataAddItems = null;
                this.dataAddIcon = null;
                this.dataSelectObj = null;
                this.dataContainer = null;
                this.dataAddType = null;
                this.dataOldY = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "showAdd") {
            if (this.dataAddContainer)return;
            this.dataAddItems = [];
            this.dataAddIcon = [];
            this.dataAddContainer = new egret.DisplayObjectContainer();
            this.dataAddContainer.width = 100;
            this.dataAddContainer.height = 400;
            this.dataAddContainer.anchorOffsetX = this.dataAddContainer.width / 2;
            this.dataAddContainer.anchorOffsetY = this.dataAddContainer.height / 2;
            this.dataAddContainer.x = 200;
            this.dataAddContainer.y = GameData.gameHeight / 2 - 35;

            var dataAddBackground = Tool.addBitmap(this.dataAddContainer, "data_addScene_png", 0, 0, 100, 400);
            dataAddBackground.touchEnabled = true;
            dataAddBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 75 && e.localX < 100 && e.localY > 0 && e.localY < 25)this.ctrlData("hideAdd");
            }, this);

            //获取符合的装备,//筛选符合的装备
            this.dataAddData = [];
            var tempEquip;
            for (var i = 0; i < GameData.bag_Equipment.length; i++) {
                tempEquip = getEquipment(GameData.bag_Equipment[i]);
                if (tempEquip._type == this.dataAddType) {
                    this.dataAddData.push({
                        id: GameData.bag_Equipment[i],
                        grade: tempEquip.grade
                    })
                }
            }

            var dataAddItemGroup = new eui.Group();
            dataAddItemGroup.touchEnabled = true;
            dataAddItemGroup.width = this.dataAddContainer.width;
            dataAddItemGroup.height = 60 * this.dataAddData.length;
            dataAddItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.dataAddData.length; i++) {
                var tempEquip = getEquipment(this.dataAddData[i].id);
                this.dataAddItems.push(Tool.addBitmap(dataAddItemGroup, "item_background" + tempEquip.grade + "_png", dataAddItemGroup.width / 2, i * 60 + 32, 60, 58, false, true));
                this.dataAddIcon.push(Tool.addBitmap(dataAddItemGroup, tempEquip.res, dataAddItemGroup.width / 2, i * 60 + 32, 50, 50, false, true));
                this.dataAddIcon[i].touchEnabled = true;
                this.dataAddIcon[i].addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e:egret.TouchEvent) {
                    this.dataOldY = e.stageY;
                }, this);
                this.dataAddIcon[i].addEventListener(egret.TouchEvent.TOUCH_END, function (e:egret.TouchEvent) {
                    if (Math.abs(e.stageY - this.dataOldY) < 10) {//短暂的点击，用于点击Icon
                        for (var a = 0; a < this.dataAddData.length; a++) {
                            if (e.target == this.dataAddIcon[a]) {//显示详细信息
                                this.dataSelectObj.id = this.dataAddData[a].id;
                                this.ctrlData("showDetail", 1);
                                return;
                            }
                        }
                    }
                }, this);
            }

            //设置滑动组件
            var tempGroup = new eui.Group();
            var scroll = new eui.Scroller();
            scroll.x = tempGroup.x;
            scroll.y = 30;
            scroll.width = 100;
            scroll.height = 360;
            scroll.viewport = tempGroup;
            scroll.touchEnabled = true;
            this.dataAddContainer.addChild(scroll);
            tempGroup.addChild(dataAddItemGroup);
            this.addChild(this.dataAddContainer);

            this.swapChildren(this.dataAddContainer, this.dataContainer);
            egret.Tween.get(this.dataAddContainer).to({x: 100}, 500, egret.Ease.backOut);
        }
        else if (type == "hideAdd") {
            var tw = egret.Tween.get(this.dataAddContainer);
            tw.to({x: 200}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.dataAddContainer);
                this.dataAddContainer = null;
                this.dataAddItems = null;
                this.dataAddIcon = null;
            }, this);
        }
        else if (type == "showDetail") {//显示物品详细信息
            if (this.dataDetailContainer)return;
            this.dataDetailContainer = new egret.DisplayObjectContainer();
            this.dataDetailContainer.width = 300;
            this.dataDetailContainer.height = 150;
            this.dataDetailContainer.anchorOffsetX = 300 / 2;
            this.dataDetailContainer.anchorOffsetY = 150 / 2;
            this.dataDetailContainer.x = this.dataContainer.width / 2;
            this.dataDetailContainer.y = this.dataContainer.height / 2;
            this.dataContainer.addChild(this.dataDetailContainer);

            var equipData = getEquipment(this.dataSelectObj.id);
            var background = Tool.addBitmap(this.dataDetailContainer, "data_detailScene" + detailType + "_png", 0, 0, 300, 150);
            Tool.addBitmap(this.dataDetailContainer, equipData.res, 28, 30, 50, 50);
            Tool.addTextField(this.dataDetailContainer, 100, 23, 80, 20, 16, 0x000000, equipData.name).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataDetailContainer, 97, 47, 180, 41, 12, 0x000000, equipData.info).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.dataDetailContainer, 200, 23, 130, 75, 15, 0x000000, "售价:" + equipData.cost + "金币").textAlign = egret.HorizontalAlign.LEFT;

            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 20 && e.localX < 100 && e.localY > 110 && e.localY < 140) {
                    if (detailType == 0) {
                        var item:any;
                        for (var i = 0; i < this.dataContainer.$children.length; i++) {
                            item = this.dataContainer.getChildAt(i);
                            if (item.x == this.dataSelectObj.x && item.y == this.dataSelectObj.y) {
                                if (this.dataSelectObj._type == "ring") {
                                    GameData.bag_Equipment.push(GameData.data_Equipment["ring"][this.dataSelectObj._index]);
                                    heroState["ring"][this.dataSelectObj._index].id = -1;
                                    GameData.data_Equipment["ring"][this.dataSelectObj._index] = -1;
                                }
                                else {
                                    GameData.bag_Equipment.push(GameData.data_Equipment[this.dataSelectObj._type]);
                                    heroState[this.dataSelectObj._type].id = -1;
                                    GameData.data_Equipment[this.dataSelectObj._type] = -1;
                                }
                                this.dataContainer.removeChildAt(i);
                                break;
                            }
                        }
                        //删除等级背景
                        for (var i = 0; i < this.dataContainer.$children.length; i++) {
                            item = this.dataContainer.getChildAt(i);
                            if (item.x == this.dataSelectObj.x && item.y == this.dataSelectObj.y) {
                                this.dataContainer.removeChildAt(i);
                                this.ctrlData("hideDetail");
                                return;
                            }
                        }
                    }
                    else if (detailType == 1) {
                        this.showTip("装备成功！");
                        this.ctrlData("hideAdd");
                        this.ctrlData("hideDetail");
                        console.log("_type  " + this.dataSelectObj._type);
                        if (this.dataSelectObj._type == "ring") {
                            heroState["ring"][this.dataSelectObj._index].id = this.dataSelectObj.id;
                            GameData.data_Equipment["ring"][this.dataSelectObj._index] = this.dataSelectObj.id;
                        }
                        else {
                            heroState[this.dataSelectObj._type].id = this.dataSelectObj.id;
                            GameData.data_Equipment[this.dataSelectObj._type] = this.dataSelectObj.id;
                        }

                        for (var i = 0; i < GameData.bag_Equipment.length; i++) {
                            if (GameData.bag_Equipment[i] == this.dataSelectObj.id) {
                                GameData.bag_Equipment.splice(i, 1);
                                break;
                            }
                        }

                        var temp1 = Tool.addBitmap(this.dataContainer, "item_background" + getEquipment(this.dataSelectObj.id).grade + "_png", this.dataSelectObj.x, this.dataSelectObj.y, 50, 50, false, true);
                        var temp2 = Tool.addBitmap(this.dataContainer, getEquipment(this.dataSelectObj.id).res, this.dataSelectObj.x, this.dataSelectObj.y, 40, 40, false, true);
                        this.dataContainer.setChildIndex(temp2, 2);
                        this.dataContainer.setChildIndex(temp1, 2);
                    }
                }
                else if (e.localX > 200 && e.localX < 280 && e.localY > 110 && e.localY < 140) this.ctrlData("hideDetail");
            }, this);

            this.dataDetailContainer.scaleX = 0;
            this.dataDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.dataDetailContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {//升级某项技能
            var tw = egret.Tween.get(this.dataDetailContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.dataContainer.removeChild(this.dataDetailContainer);
                this.dataDetailContainer = null;
                this.showing = "heroState";
            }, this);
        }

    }

    //我的背包面板
    public ctrlBag(type:string, sure:boolean = false):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
            //this.bagData = bag;
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
            this.bag_btnEquipment = Tool.addBitmap(this.bagContainer, "bag_btnEquipment1_png", 30, 10, 80, 35);
            this.bag_btnItem = Tool.addBitmap(this.bagContainer, "bag_btnItem0_png", 120, 10, 80, 35);
            this.bag_btnPiece = Tool.addBitmap(this.bagContainer, "bag_btnPiece0_png", 210, 10, 80, 35);
            this.bag_btnDrup = Tool.addBitmap(this.bagContainer, "bag_btnDrup0_png", 300, 10, 80, 35);
            this.bagGoldNum = Tool.addTextField(this.bagContainer, 340, 285, 80, 18, 18, 0x000000, GameData.goldNum);
            this.bagDiamondNum = Tool.addTextField(this.bagContainer, 215, 285, 90, 18, 18, 0x000000, GameData.diamondNum);
            this.bagGoldNum.textAlign = egret.HorizontalAlign.LEFT;
            this.bagDiamondNum.textAlign = egret.HorizontalAlign.LEFT;
            this.bagBackground.touchEnabled = true;
            this.bag_btnEquipment.touchEnabled = true;
            this.bag_btnItem.touchEnabled = true;
            this.bag_btnPiece.touchEnabled = true;
            this.bag_btnDrup.touchEnabled = true;
            this.bagBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                e.stopImmediatePropagation();
                if (e.localX > 390 && e.localX < 420 && e.localY > 10 && e.localY < 40)this.ctrlBag("hide");
            }, this);

            this.bag_btnEquipment.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                e.stopImmediatePropagation();
                if (this.bagBtnName == "Equipment")return;
                this.bagBtnName = "Equipment";
                this.ctrlBag("changeBtn");
            }, this);

            this.bag_btnItem.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                e.stopImmediatePropagation();
                if (this.bagBtnName == "Item")return;
                this.bagBtnName = "Item";
                this.ctrlBag("changeBtn");
            }, this);

            this.bag_btnPiece.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                e.stopImmediatePropagation();
                if (this.bagBtnName == "Piece")return;
                this.bagBtnName = "Piece";
                this.ctrlBag("changeBtn");
            }, this);

            this.bag_btnDrup.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                e.stopImmediatePropagation();
                if (this.bagBtnName == "Drup")return;
                this.bagBtnName = "Drup";
                this.ctrlBag("changeBtn");
            }, this);

            this.bagBtnName = "Equipment";
            this.bagItemGroup = new eui.Group();
            this.bagItemGroup.touchEnabled = true;
            this.bagItemGroup.width = 400;
            this.bagItemGroup.height = 70 * 5;
            this.bagItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < 5; i++) {
                this.bagItems.push(Tool.addBitmap(this.bagItemGroup, "bag_item_png", 0, i * 70, 400, 65));
                for (var a = 0; a < 7; a++) {
                    var index = i * 7 + a;
                    if (index >= GameData["bag_" + this.bagBtnName].length)break;
                    var id = Math.floor(GameData["bag_" + this.bagBtnName][index]);
                    var num = Math.floor((GameData["bag_" + this.bagBtnName][index] - id) * 100);
                    var data = window["get" + this.bagBtnName](id);

                    this.bagIcon.push(Tool.addBitmap(this.bagItemGroup, data.res, 34 + a * 55.2, i * 70 + 32, 40, 40, false, true));
                    this.bagItemNum.push(Tool.addTextField(this.bagItemGroup, 35 + a * 55.2, i * 70 + 40, 20, 15, 15, 0x000000, num + ""));
                    this.bagItemNum[index].stroke = 1;
                    this.bagItemNum[index].visible = false;
                    this.bagItemNum[index].textAlign = egret.HorizontalAlign.RIGHT;
                    this.bagIcon[index].touchEnabled = true;
                    this.bagIcon[index].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {//添加点击响应
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
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);

            //生成药瓶选择框
            this.bagBooldBox = Tool.addBitmap(this.bagItemGroup, "bag_bloodBox_png", 0, 0, 65, 60, false, true);
            this.bagPowerBox = Tool.addBitmap(this.bagItemGroup, "bag_powerBox_png", 0, 0, 65, 60, false, true);
            this.bagBooldBox.visible = false;
            this.bagPowerBox.visible = false;
        }
        else if (type == "hide") {
            if (this.bagDetailContainer)return;
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.bagContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.bagContainer);
                this.bagDetailContainer = null;
                this.bagBackground = null;
                this.bagContainer = null;
                this.bagItemGroup = null;
                this.bagIsDetail = null;
                this.bagIndex = null;
                this.bagItems = null;
                this.bagIcon = null;
                this.bag_btnEquipment = null;
                this.bag_btnItem = null;
                this.bagBooldBox = null;
                this.bag_btnPiece = null;
                this.bagItemNum = null;
                this.bagDiamondNum = null;
                this.bagBtnName = null;
                this.showing = "empty";
            }, this);
        }
        else if (type == "changeBtn") {//进行选择卡的跳转
            if (this.bagDetailContainer && !sure)return;
            console.log("changeBtn");
            this.bagGoldNum.text = GameData.goldNum + "";
            this.bagDiamondNum.text = GameData.diamondNum + "";
            this.bag_btnEquipment.texture = RES.getRes("bag_btnEquipment0_png");
            this.bag_btnItem.texture = RES.getRes("bag_btnItem0_png");
            this.bag_btnPiece.texture = RES.getRes("bag_btnPiece0_png");
            this.bag_btnDrup.texture = RES.getRes("bag_btnDrup0_png");
            this["bag_btn" + this.bagBtnName].texture = RES.getRes("bag_btn" + this.bagBtnName + "1_png");

            for (var i = 0; i < this.bagIcon.length; i++) {
                Tool.clearItem(this.bagIcon[i]);
                Tool.clearItem(this.bagItemNum[i]);
            }
            this.bagIcon.length = 0;
            this.bagItemNum.length = 0;


            for (var i = 0; i < 5; i++) {
                this.bagItems.push(Tool.addBitmap(this.bagItemGroup, "bag_item_png", 0, i * 70, 400, 65));
                for (var a = 0; a < 7; a++) {
                    var index = i * 7 + a;
                    if (index >= GameData["bag_" + this.bagBtnName].length)break;
                    var id = Math.floor(GameData["bag_" + this.bagBtnName][index]);
                    var num = Math.floor((GameData["bag_" + this.bagBtnName][index] - id) * 100);
                    var data = window["get" + this.bagBtnName](id);

                    this.bagIcon.push(Tool.addBitmap(this.bagItemGroup, data.res, 34 + a * 55.2, i * 70 + 32, 40, 40, false, true));
                    this.bagItemNum.push(Tool.addTextField(this.bagItemGroup, 35 + a * 55.2, i * 70 + 40, 20, 15, 15, 0x000000, num + ""));
                    if (this.bagBtnName == "Equipment")this.bagItemNum[index].visible = false;
                    this.bagItemNum[index].stroke = 1;
                    this.bagItemNum[index].textAlign = egret.HorizontalAlign.RIGHT;
                    this.bagIcon[index].touchEnabled = true;
                    this.bagIcon[index].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {//添加点击响应
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

            //判断当前是否是药品栏，进行药瓶携带框的视图调整
            this.bagBooldBox.visible = false;
            this.bagPowerBox.visible = false;
            if (this.bagBtnName !== "Drup")return;
            GameData.bag_Drup.forEach(function (item, index) {
                if (GameData.bag_BooldId == Math.floor(item)) {
                    this.bagItemGroup.setChildIndex(this.bagBooldBox, 99);
                    this.bagBooldBox.visible = true;
                    this.bagBooldBox.x = 34 + index % 7 * 55.2;
                    this.bagBooldBox.y = Math.floor(index / 7) * 70 + 32;
                }
                else if (GameData.bag_PowerId == Math.floor(item)) {
                    this.bagItemGroup.setChildIndex(this.bagPowerBox, 99);
                    this.bagPowerBox.visible = true;
                    this.bagPowerBox.x = 34 + index % 7 * 55.2;
                    this.bagPowerBox.y = Math.floor(index / 7) * 70 + 32;
                }
            }, this)

        }
        else if (type == "showDetail") {//显示物品详细信息
            if (this.bagDetailContainer)return;
            this.bagIsDetail = true;
            this.bagDetailContainer = new egret.DisplayObjectContainer();
            this.bagDetailContainer.width = 300;
            this.bagDetailContainer.height = 150;
            this.bagDetailContainer.anchorOffsetX = 300 / 2;
            this.bagDetailContainer.anchorOffsetY = 150 / 2;
            this.bagDetailContainer.x = this.bagContainer.width / 2;
            this.bagDetailContainer.y = this.bagContainer.height / 2;
            this.bagContainer.addChild(this.bagDetailContainer);

            var id = Math.floor(GameData["bag_" + this.bagBtnName][this.bagIndex]);
            var num = Math.floor((GameData["bag_" + this.bagBtnName][this.bagIndex] - id) * 100);
            var data = window["get" + this.bagBtnName](id);

            var background = Tool.addBitmap(this.bagDetailContainer, "bag_detail" + this.bagBtnName + "_png", 0, 0, 300, 150);
            Tool.addBitmap(this.bagDetailContainer, data.res, 28, 30, 50, 50);
            Tool.addTextField(this.bagDetailContainer, 100, 23, 80, 20, 16, 0x000000, data.name).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.bagDetailContainer, 97, 47, 180, 41, 12, 0x000000, data.info).textAlign = egret.HorizontalAlign.LEFT;
            Tool.addTextField(this.bagDetailContainer, 200, 23, 130, 75, 15, 0x000000, "售价:" + data.cost).textAlign = egret.HorizontalAlign.LEFT;

            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 20 && e.localX < 100 && e.localY > 110 && e.localY < 140) {//卖出
                    this.showSure("确定全部卖出吗？", function (cost:number, num:number) {
                        var id = Math.floor(GameData["bag_" + this.bagBtnName][this.bagIndex]);
                        var num = Math.floor((GameData["bag_" + this.bagBtnName][this.bagIndex] - id) * 100);
                        var data = window["get" + this.bagBtnName](id);
                        if (this.sureAnswer) {
                            console.log("卖出成功");
                            if (this.bagBtnName == "Equipment") {
                                GameData.goldNum += data.cost;
                                GameData["bag_" + this.bagBtnName].splice([this.bagIndex], 1);
                            }
                            else {
                                GameData.goldNum += data.cost * num;
                                GameData["bag_" + this.bagBtnName].splice([this.bagIndex], 1);
                            }
                            //GameData.saveData();//保存数据
                            this.ctrlBag("changeBtn", true);//刷新数据
                            this.ctrlBag("hideDetail");
                        }
                    }.bind(this));
                }
                else if (e.localX > 110 && e.localX < 190 && e.localY > 110 && e.localY < 140) {
                    if (this.bagBtnName == "Equipment") {
                        //判断当前着装情况，实现穿着装备，//在页面中去除，数据去除

                        var id = Math.floor(GameData["bag_Equipment"][this.bagIndex]);
                        var data = window["getEquipment"](id);

                        if (data._type == "ring") {
                            for (var a = 0; a < GameData.data_Equipment["ring"].length; a++) {
                                if (GameData.data_Equipment["ring"][a] == -1) {
                                    GameData["bag_" + this.bagBtnName].splice([this.bagIndex], 1);
                                    GameData.data_Equipment["ring"][a] = id;
                                    this.showTip("装备成功！");
                                    GameData.saveData();//保存数据
                                    this.ctrlBag("changeBtn", true);//刷新数据
                                    this.ctrlBag("hideDetail");
                                    return;
                                }
                            }
                            this.showTip("请先卸下原装备");
                        }
                        else {
                            if (GameData.data_Equipment[data._type] == -1) {
                                GameData["bag_" + this.bagBtnName].splice([this.bagIndex], 1);
                                GameData.data_Equipment[data._type] = id;
                                this.showTip("装备成功");
                                GameData.saveData();//保存数据
                                this.ctrlBag("changeBtn", true);//刷新数据
                                this.ctrlBag("hideDetail");
                            }
                            else this.showTip("请先卸下原装备");
                        }

                    }
                    else if (this.bagBtnName == "Piece")console.log("合成成功");
                    else if (this.bagBtnName == "Drup") {//通过药品类型判断携带还是使用
                        var id = Math.floor(GameData["bag_" + this.bagBtnName][this.bagIndex]);
                        var data2 = window["get" + this.bagBtnName](id);
                        if (data2.func == "boold") {
                            this.bagBooldBox.visible = true;
                            GameData.bag_BooldId = id;
                            this.bagBooldBox.x = 34 + this.bagIndex % 7 * 55.2;
                            this.bagBooldBox.y = Math.floor(this.bagIndex / 7) * 70 + 32;
                            this.bagItemGroup.setChildIndex(this.bagBooldBox, 99);
                        }
                        else if (data2.func == "power") {
                            this.bagPowerBox.visible = true;
                            GameData.bag_PowerId = id;
                            this.bagPowerBox.x = 34 + this.bagIndex % 7 * 55.2;
                            this.bagPowerBox.y = Math.floor(this.bagIndex / 7) * 70 + 32;
                            this.bagItemGroup.setChildIndex(this.bagPowerBox, 99);
                        }
                        else console.log("使用成功");
                        this.showTip("携带成功");
                        this.ctrlBag("hideDetail");
                    }
                }
                else if (e.localX > 200 && e.localX < 280 && e.localY > 110 && e.localY < 140) this.ctrlBag("hideDetail");
            }, this);

            this.bagDetailContainer.scaleX = 0;
            this.bagDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.bagDetailContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {//升级某项技能
            if (!this.bagIsDetail)return;
            this.bagIsDetail = false;
            var tw = egret.Tween.get(this.bagDetailContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.bagContainer.removeChild(this.bagDetailContainer);
                this.bagDetailContainer = null;
                this.showing = "bag";
            }, this);
        }
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
            this.drupShopItemGroup.height = 70 * this.drupShopData.length;
            this.drupShopItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.drupShopData.length; i++) {
                var tempDrup = getDrup(this.drupShopData[i]);
                this.drupShopItems.push(Tool.addBitmap(this.drupShopItemGroup, "drupShop_item_png", 0, i * 70, 370, 65));
                this.drupShopIcon.push(Tool.addBitmap(this.drupShopItemGroup, tempDrup.res, 17, i * 70 + 10, 40, 40));
                this.drupShopName.push(Tool.addTextField(this.drupShopItemGroup, 80, i * 70 + 8, 0, 0, 20, 0x000000, tempDrup.name));
                this.drupShopCost.push(Tool.addTextField(this.drupShopItemGroup, 290, i * 70 + 10, 0, 0, 18, 0x000000, tempDrup.cost));
                this.drupShopInfo.push(Tool.addTextField(this.drupShopItemGroup, 80, i * 70 + 38, 0, 0, 15, 0x000000, tempDrup.info));
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
            if (this.drupShopDetailContainer)return;
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
            if (this.drupShopDetailContainer)return;
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

            var tempDrup = getDrup(this.drupShopData[this.drupShopIndex]);
            var background = Tool.addBitmap(this.drupShopDetailContainer, "drupShop_detail_png", 0, 0, 300, 180);
            var icon = Tool.addBitmap(this.drupShopDetailContainer, tempDrup.res, 27, 33, 50, 50);
            var drupName = Tool.addTextField(this.drupShopDetailContainer, 12, 98, 80, 20, 16, 0xffffff, tempDrup.name);
            var intruction = Tool.addTextField(this.drupShopDetailContainer, 90, 25, 90, 90, 15, 0xffffff, tempDrup.info);
            var cost = Tool.addTextField(this.drupShopDetailContainer, 190, 70, 60, 15, 15, 0xffffff, "单价:" + tempDrup.cost);
            this.drupShopSum = Tool.addTextField(this.drupShopDetailContainer, 190, 95, 100, 15, 15, 0xffffff, "总额:" + tempDrup.cost);
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
                this.ctrlDrupShop("update", temp);
            }, this);


            cost.textAlign = egret.HorizontalAlign.LEFT;
            intruction.textAlign = egret.HorizontalAlign.LEFT;
            this.drupShopSum.textAlign = egret.HorizontalAlign.LEFT;


            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 188 && e.localX < 203 && e.localY > 40 && e.localY < 58) this.ctrlDrupShop("update", --this.drupShopDrupNum);
                else if (e.localX > 267 && e.localX < 283 && e.localY > 40 && e.localY < 58) this.ctrlDrupShop("update", ++this.drupShopDrupNum);
                else if (e.localX > 40 && e.localX < 135 && e.localY > 105 && e.localY < 165) {
                    if (this.drupShopSum.textColor == 0xff0000)this.showTip("金币不足");
                    else {//实现购买功能
                        var sum:number = parseInt(this.drupShopSum.text.substr(3, this.drupShopSum.text.length));
                        var isHad:boolean = false;
                        for (var i = 0; i < GameData.bag_Drup.length; i++) {
                            if (this.drupShopData[this.drupShopIndex] == Math.floor(GameData.bag_Drup[i])) {
                                GameData.bag_Drup[i] += this.drupShopDrupNum * 0.01;
                                isHad = true;
                                break;
                            }
                        }

                        if (!isHad) {
                            var item = this.drupShopData[this.drupShopIndex] + this.drupShopDrupNum * 0.01;
                            GameData.bag_Drup.push(item);
                        }
                        GameData.goldNum -= sum;
                        GameData.saveData();
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
            var sum = getDrup(this.drupShopData[this.drupShopIndex]).cost * this.drupShopDrupNum;
            this.drupShopSum.text = "总额:" + sum;
            if (sum < GameData.goldNum)this.drupShopSum.textColor = 0xffffff;
            else this.drupShopSum.textColor = 0xff0000;
        }
    }

    //武器商店面板
    public ctrlWeaponShop(type:string, num:number = 1):void {
        if (type == "show") {
            if (this.showing != "empty")return;//若已经在显示着面板
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
            this.weaponShopBackground.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 200 && e.localX < 260 && e.localY > 345 && e.localY < 385)this.ctrlWeaponShop("hide");
            }, this);

            this.weaponShopItemGroup = new eui.Group();
            this.weaponShopItemGroup.touchEnabled = true;
            this.weaponShopItemGroup.width = 370;
            this.weaponShopItemGroup.height = 70 * this.weaponShopData.length;
            this.weaponShopItemGroup.cacheAsBitmap = true;
            for (var i = 0; i < this.weaponShopData.length; i++) {
                var temp = getEquipment(this.weaponShopData[i]);
                this.weaponShopItems.push(Tool.addBitmap(this.weaponShopItemGroup, "weaponShop_item_png", 0, i * 70, 370, 65));
                this.weaponShopIcon.push(Tool.addBitmap(this.weaponShopItemGroup, temp.res, 17, i * 70 + 10, 40, 40));
                this.weaponShopName.push(Tool.addTextField(this.weaponShopItemGroup, 80, i * 70 + 8, 0, 0, 20, 0x000000, temp.name));
                this.weaponShopCost.push(Tool.addTextField(this.weaponShopItemGroup, 290, i * 70 + 10, 0, 0, 18, 0x000000, temp.cost));
                this.weaponShopInfo.push(Tool.addTextField(this.weaponShopItemGroup, 80, i * 70 + 38, 0, 0, 15, 0x000000, temp.info));
                this.weaponShopName[i].textAlign = egret.HorizontalAlign.LEFT;
                this.weaponShopInfo[i].textAlign = egret.HorizontalAlign.LEFT;
                this.weaponShopIcon[i].touchEnabled = true;
                this.weaponShopIcon[i].addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
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
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.weaponShopDetailContainer)return;
            if (this.showing == "empty")return;
            var tw = egret.Tween.get(this.weaponShopContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.removeChild(this.weaponShopContainer);
                this.weaponShopDetailContainer = null;
                this.weaponShopBackground = null;
                this.weaponShopContainer = null;
                this.weaponShopItemGroup = null;
                this.weaponShopIsDetail = null;
                this.weaponShopIndex = null;
                this.weaponShopItems = null;
                this.weaponShopIcon = null;
                this.weaponShopName = null;
                this.weaponShopInfo = null;
                this.weaponShopCost = null;
                this.weaponShopData = null;
                this.weaponShopSum = null;//Momo
                this.showing = "empty";
            }, this);
        }
        else if (type == "showDetail") {//购买某商品
            if (this.weaponShopDetailContainer)return;
            this.weaponShopIsDetail = true;
            this.weaponShopDetailContainer = new egret.DisplayObjectContainer();
            this.weaponShopDetailContainer.width = 300;
            this.weaponShopDetailContainer.height = 180;
            this.weaponShopDetailContainer.anchorOffsetX = 300 / 2;
            this.weaponShopDetailContainer.anchorOffsetY = 180 / 2;
            this.weaponShopDetailContainer.x = this.weaponShopContainer.width / 2;
            this.weaponShopDetailContainer.y = this.weaponShopContainer.height / 2;
            this.weaponShopContainer.addChild(this.weaponShopDetailContainer);

            var temp = getEquipment(this.weaponShopData[this.weaponShopIndex]);
            var background = Tool.addBitmap(this.weaponShopDetailContainer, "weaponShop_detail_png", 0, 0, 300, 180);
            var icon = Tool.addBitmap(this.weaponShopDetailContainer, temp.res, 27, 33, 50, 50);
            var weaponName = Tool.addTextField(this.weaponShopDetailContainer, 12, 98, 80, 20, 16, 0xffffff, temp.name);
            var intruction = Tool.addTextField(this.weaponShopDetailContainer, 90, 50, 195, 70, 15, 0xffffff, temp.info);
            this.weaponShopSum = Tool.addTextField(this.weaponShopDetailContainer, 90, 28, 130, 16, 16, 0xffffff, "售价:" + temp.cost);
            this.weaponShopSum.textAlign = egret.HorizontalAlign.LEFT;
            intruction.textAlign = egret.HorizontalAlign.LEFT;

            var sum:number = parseInt(this.weaponShopSum.text.substr(3, this.weaponShopSum.text.length));

            if (GameData.goldNum < sum) this.weaponShopSum.textColor = 0xff0000;
            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 40 && e.localX < 135 && e.localY > 105 && e.localY < 165) {
                    if (this.weaponShopSum.textColor == 0xff0000)this.showTip("金币不足");
                    else {//实现购买功能
                        GameData.goldNum -= parseInt(this.weaponShopSum.text.substr(3, this.weaponShopSum.text.length));
                        GameData.bag_Equipment.push(this.weaponShopData[this.weaponShopIndex]);
                        this.showTip("购买成功");
                        this.ctrlWeaponShop("hideDetail");
                    }
                }
                else if (e.localX > 190 && e.localX < 260 && e.localY > 135 && e.localY < 165) this.ctrlWeaponShop("hideDetail");
            }, this);

            this.weaponShopDetailContainer.scaleX = 0;
            this.weaponShopDetailContainer.scaleY = 0;
            var tw = egret.Tween.get(this.weaponShopDetailContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hideDetail") {//升级某项技能
            if (!this.weaponShopIsDetail)return;
            this.weaponShopIsDetail = false;
            var tw = egret.Tween.get(this.weaponShopDetailContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.weaponShopContainer.removeChild(this.weaponShopDetailContainer);
                this.weaponShopDetailContainer = null;
                this.weaponShopSum = null;
                this.showing = "weaponShop";
            }, this);
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

            this.abilitySelectBox1 = Tool.addBitmap(this.abilityContainer, "ability_selectBox_png", GameData.skill1Index * 80 + 187, 150, 75, 75, false, true);
            this.abilitySelectBox2 = Tool.addBitmap(this.abilityContainer, "ability_selectBox_png", GameData.skill2Index * 80 + 187, 220, 75, 75, false, true);
            this.abilitySkill = Tool.addTextField(this.abilityContainer, 120, 60, 0, 0, 18, 0xffffff, "剩余技能点:" + GameData.skillNum);
            this.abilityBody = Tool.addTextField(this.abilityContainer, 455, 60, 0, 0, 18, 0xffffff, "剩余属性值:" + GameData.bodyNum);

            //解析技能状态
            var abilityNum1 = 0;
            var abilitySum1 = 0;
            for (var i = 0; i < 5; i++) {
                abilityNum1 = Math.floor(GameData.skill1State[i]);
                abilitySum1 = Math.floor((GameData.skill1State[i] - abilityNum1) * 100);
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.skill1[i].icon, i * 80 + 187, 150, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 162, 50, 15, 15, 0xff0000, abilityNum1 + "/" + abilitySum1));
                this.abilityText[i].textAlign = egret.HorizontalAlign.RIGHT;
            }

            for (var i = 0; i < 5; i++) {
                abilityNum1 = Math.floor(GameData.skill2State[i]);
                abilitySum1 = Math.floor((GameData.skill2State[i] - abilityNum1) * 100);
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.skill2[i].icon, i * 80 + 187, 220, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 232, 50, 15, 15, 0xff0000, abilityNum1 + "/" + abilitySum1));
                this.abilityText[i + 5].textAlign = egret.HorizontalAlign.RIGHT;
            }

            for (var i = 0; i < 5; i++) {
                abilityNum1 = Math.floor(GameData.abilityState[i]);
                abilitySum1 = Math.floor((GameData.abilityState[i] - abilityNum1) * 100);
                this.abilityData.data[i].state = Math.floor(abilityNum1 / (abilitySum1 / 5)) + 1;
                if (this.abilityData.data[i].state > 5)this.abilityData.data[i].state = 5;
                this.abilityIcon.push(Tool.addBitmap(this.abilityContainer, this.abilityData.data[i].icon + this.abilityData.data[i].state + "_png", i * 80 + 187, 290, 60, 60, false, true));
                this.abilityText.push(Tool.addTextField(this.abilityContainer, i * 80 + 163, 302, 50, 15, 15, 0xff0000, abilityNum1 + "/" + abilitySum1));
                this.abilityText[i + 10].textAlign = egret.HorizontalAlign.RIGHT;
            }

            this.addChild(this.abilityContainer);
            this.abilityContainer.scaleX = 0;
            this.abilityContainer.scaleY = 0;
            this.abilityContainer.setChildIndex(this.abilitySelectBox1, 99);
            this.abilityContainer.setChildIndex(this.abilitySelectBox2, 99);
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else if (type == "hide") {
            if (this.showing == "empty")return;
            GameData.saveData();
            var tw = egret.Tween.get(this.abilityContainer);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.abilityContainer = Tool.clearItem(this.abilityContainer);
                this.abilityDetailContainer = null;
                this.abilityDetailLevel = null;
                this.abilityBackground = null;
                this.abilityDetailIcon = null;
                this.abilitySelectBox1 = null;
                this.abilitySelectBox2 = null;
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
            this.abilityState = Tool.addTextField(this.abilityDetailContainer, 15, 10, 70, 22, 22, 0xff0000, "携带中");
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

            //动态修改技能状态说明
            if (this.abilityIndex > 9)this.abilityState.text = "属  性";
            else if (this.abilityIndex != GameData.skill1Index && this.abilityIndex != GameData.skill2Index + 5) {
                var tempNum = parseInt(this.abilityText[this.abilityIndex].text.substr(0, this.abilityText[this.abilityIndex].text.length - 3));
                if (tempNum == 0)this.abilityState.text = "未激活";
                else this.abilityState.text = "携  带";
            }

            background.touchEnabled = true;
            background.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e:egret.TouchEvent) {
                if (e.localX > 40 && e.localX < 90 && e.localY > 70 && e.localY < 114)this.ctrlAbility("levelUp");
                else if (e.localX > 15 && e.localX < 90 && e.localY > 5 && e.localY < 40) {//携带技能
                    if (this.abilityIndex > 9)return;
                    if (parseInt(this.abilityText[this.abilityIndex].text.substr(0, this.abilityText[this.abilityIndex].text.length - 3)) == 0)return;
                    else if (this.abilityIndex < 5) {
                        GameData.skill1Index = this.abilityIndex;
                        this.abilitySelectBox1.x = this.abilityIcon[this.abilityIndex].x;
                    }
                    else if (this.abilityIndex < 10) {
                        GameData.skill2Index = this.abilityIndex - 5;
                        this.abilitySelectBox2.x = this.abilityIcon[this.abilityIndex].x;
                    }

                    this.ctrlAbility("hideDetail");
                }
                else if (e.localX > 215 && e.localX < 280 && e.localY > 10 && e.localY < 35)this.ctrlAbility("hideDetail");
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
                this.abilityDetailContainer = Tool.clearItem(this.abilityDetailContainer);
                this.abilityDetailLevel = null;
                this.abilityState = null;
                this.showing = "ability";
            }, this);
        }
        else if (type == "levelUp") {//升级某项技能
            var abilityNum1 = 0;
            var abilitySum1 = 0;
            if (this.abilityState.text == "未激活")this.abilityState.text = "携带";
            if (this.abilityIndex < 5) {//升级单攻
                abilityNum1 = Math.floor(GameData.skill1State[this.abilityIndex]);
                abilitySum1 = Math.floor((GameData.skill1State[this.abilityIndex] - abilityNum1) * 100);
                if (GameData.skillNum > 0 && abilityNum1 < abilitySum1) {
                    GameData.skillNum--;
                    GameData.skill1State[this.abilityIndex]++;
                    this.abilityText[this.abilityIndex].text = (abilityNum1 + 1) + "/" + abilitySum1;
                }
            }
            else if (this.abilityIndex < 10) {//升级群攻
                abilityNum1 = Math.floor(GameData.skill2State[this.abilityIndex - 5]);
                abilitySum1 = Math.floor((GameData.skill2State[this.abilityIndex - 5] - abilityNum1) * 100);
                if (GameData.skillNum > 0 && abilityNum1 < abilitySum1) {
                    GameData.skillNum--;
                    GameData.skill2State[this.abilityIndex - 5]++;
                    this.abilityText[this.abilityIndex].text = (abilityNum1 + 1) + "/" + abilitySum1;
                }
            }
            else if (this.abilityIndex < 15) {//升级属性
                var i = this.abilityIndex - 10;
                abilityNum1 = Math.floor(GameData.abilityState[i]);
                abilitySum1 = Math.floor((GameData.abilityState[i] - abilityNum1) * 100);
                if (GameData.bodyNum > 0 && abilityNum1 < abilitySum1) {
                    GameData.bodyNum--;
                    GameData.abilityState[i]++;
                    var tempState = Math.floor(abilityNum1 / (abilitySum1 / 5)) + 1;
                    this.abilityIcon[this.abilityIndex].texture = RES.getRes(this.abilityData.data[i].icon + tempState + "_png");
                    this.abilityDetailIcon.texture = RES.getRes(this.abilityData.data[i].icon + tempState + "_png");
                    this.abilityText[this.abilityIndex].text = (abilityNum1 + 1) + "/" + abilitySum1;
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
