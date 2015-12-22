//地图选择页面
class MapScene extends egret.DisplayObjectContainer {
    private base:egret.Bitmap;//基本地图
    private map0:egret.Bitmap;//地图一
    private map1:egret.Bitmap;//地图二
    private map2:egret.Bitmap;//地图三
    private map3:egret.Bitmap;//地图四
    private map4:egret.Bitmap;//地图五
    private map5:egret.Bitmap;//地图六
    private map6:egret.Bitmap;//地图七
    private map7:egret.Bitmap;//地图八
    private map8:egret.Bitmap;//地图九
    private map9:egret.Bitmap;//地图十
    private back:egret.Bitmap;//返回首页

    private select:egret.DisplayObjectContainer;//选择难度容器
    private selectBox:egret.Bitmap;//选择难度的选择框
    private commonBtn:egret.Bitmap;//简单难度按钮
    private hardBtn:egret.Bitmap;//困难难度按钮
    private ruinsBtn:egret.Bitmap;//地狱难度按钮

    private isSelect:boolean = false;//标示现在是否在显示难度选择框

    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        this.width = 800;
        this.height = 480;

        this.base = Tool.addBitmap(this, "worldMap_base_png", 0, 0, 800, 480, true);
        var scaleX = this.base.width / 640;
        var scaleY = this.base.height / 470;
        this.map0 = Tool.addBitmap(this, "worldMap_map0_disable_png", 179, 85, 0, 0, false);
        this.map1 = Tool.addBitmap(this, "worldMap_map1_disable_png", 183, 165, 0, 0, false);
        this.map2 = Tool.addBitmap(this, "worldMap_map2_disable_png", 244, 234, 0, 0, false);
        this.map3 = Tool.addBitmap(this, "worldMap_map3_disable_png", 288, 123, 0, 0, false);
        this.map4 = Tool.addBitmap(this, "worldMap_map4_disable_png", 553, 4, 0, 0, false);
        this.map5 = Tool.addBitmap(this, "worldMap_map5_disable_png", 573, 208, 0, 0, false);
        this.map6 = Tool.addBitmap(this, "worldMap_map6_disable_png", 343, 321, 0, 0, false);
        this.map7 = Tool.addBitmap(this, "worldMap_map7_disable_png", 292, 404, 0, 0, false);
        this.map8 = Tool.addBitmap(this, "worldMap_map8_disable_png", 93, 223, 0, 0, false);
        this.map9 = Tool.addBitmap(this, "worldMap_map9.disable_png", 9, 325, 0, 0, false);
        this.back = Tool.addBitmap(this, "worldMap_back1_png", 670, 430, 0, 0, true);
        for (var i = 0; i < 10; i++) {
            this["map" + i].width = Math.floor(this["map" + i].measuredWidth * scaleX);
            this["map" + i].height = Math.floor(this["map" + i].measuredHeight * scaleY);
            if (GameData.MapState[i].state > 0) {
                this["map" + i].texture = RES.getRes("worldMap_map" + i + "_png");
                this["map" + i].visible = false;
            }
        }


        this.select = new egret.DisplayObjectContainer();
        this.addChild(this.select);
        this.select.scaleX = 0;
        this.select.scaleY = 0;
        this.select.width = this.width;
        this.select.height = this.height;
        this.select.x = this.select.width / 2;
        this.select.y = this.select.height / 2;
        this.select.anchorOffsetX = this.select.width / 2;
        this.select.anchorOffsetY = this.select.height / 2;

        this.selectBox = Tool.addBitmap(this.select, "worldMap_box_png", 0, 0, 0, 0, false);
        this.commonBtn = Tool.addBitmap(this.select, "worldMap_common1_png", 435, 180, 0, 0, false);
        this.hardBtn = Tool.addBitmap(this.select, "worldMap_hard0_png", 435, 240, 0, 0, false);
        this.ruinsBtn = Tool.addBitmap(this.select, "worldMap_ruin0_png", 435, 300, 0, 0, false);
        this.selectBox.x = (this.width - this.selectBox.width) / 2;
        this.selectBox.y = (this.height - this.selectBox.height) / 2;


        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
    }

    //控制难度选择框的出现和消失
    public ctrlSelect():void {
        if (this.isSelect == false) {
            this.commonBtn.touchEnabled = true;
            this.hardBtn.touchEnabled = true;
            this.ruinsBtn.touchEnabled = true;
            if (GameData.MapState[GameData.mapIndex].state > 1)this.ruinsBtn.texture = RES.getRes("worldMap_hard1_png");
            if (GameData.MapState[GameData.mapIndex].state > 2)this.ruinsBtn.texture = RES.getRes("worldMap_ruin1_png");

            this.isSelect = true;
            this.select.visible = true;
            var tw = egret.Tween.get(this.select);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else {
            GameData.mapIndex = -1;
            this.isSelect = false;
            this.commonBtn.touchEnabled = false;
            this.hardBtn.touchEnabled = false;
            this.ruinsBtn.touchEnabled = false;
            var tw = egret.Tween.get(this.select);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.select.visible = false;
            }, this);
        }
    }

    //触屏按下
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isSelect) {//选择难度
            if (e.target == this.commonBtn)this.commonBtn.texture = RES.getRes("worldMap_common2_png");
            else if (e.target == this.hardBtn && GameData.MapState[GameData.mapIndex].state > 1)this.hardBtn.texture = RES.getRes("worldMap_hard2_png");
            else if (e.target == this.ruinsBtn && GameData.MapState[GameData.mapIndex].state > 2)this.ruinsBtn.texture = RES.getRes("worldMap_ruin2_png");
            return;
        }

        if (e.target == this.back)this.back.texture = RES.getRes("worldMap_back2_png");

        //选择地图
        if (205 < e.stageX && e.stageX < 273 && 140 < e.stageY && e.stageY < 170)GameData.mapIndex = 0;
        else if (195 < e.stageX && e.stageX < 300 && 210 < e.stageY && e.stageY < 235)GameData.mapIndex = 1;
        else if (285 < e.stageX && e.stageX < 390 && 315 < e.stageY && e.stageY < 340)GameData.mapIndex = 2;
        else if (405 < e.stageX && e.stageX < 505 && 165 < e.stageY && e.stageY < 190)GameData.mapIndex = 3;
        else if (650 < e.stageX && e.stageX < 755 && 125 < e.stageY && e.stageY < 150)GameData.mapIndex = 4;
        else if (618 < e.stageX && e.stageX < 720 && 300 < e.stageY && e.stageY < 325)GameData.mapIndex = 5;
        else if (425 < e.stageX && e.stageX < 530 && 385 < e.stageY && e.stageY < 415)GameData.mapIndex = 6;
        else if (305 < e.stageX && e.stageX < 410 && 412 < e.stageY && e.stageY < 437)GameData.mapIndex = 7;
        else if (180 < e.stageX && e.stageX < 285 && 360 < e.stageY && e.stageY < 390)GameData.mapIndex = 8;
        else if (45 < e.stageX && e.stageX < 150 && 420 < e.stageY && e.stageY < 445)GameData.mapIndex = 9;
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex].state > 0) {//设置地图样式
            this["map" + GameData.mapIndex].visible = true;
        }
    }

    //触屏松开
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isSelect) {
            if (e.target == this.commonBtn) {//设置按钮的样式
                GameData.difficulty = 1;
                this.commonBtn.texture = RES.getRes("worldMap_common1_png");
            }
            else if (e.target == this.hardBtn && GameData.MapState[GameData.mapIndex].state > 1) {
                GameData.difficulty = 2;
                this.hardBtn.texture = RES.getRes("worldMap_hard1_png");
            }
            else if (e.target == this.ruinsBtn && GameData.MapState[GameData.mapIndex].state > 2) {
                GameData.difficulty = 3;
                this.ruinsBtn.texture = RES.getRes("worldMap_ruin1_png");
            }
            this.ctrlSelect();
            return;
        }

        if (e.target == this.back) {
            this.back.texture = RES.getRes("worldMap_back1_png");
            UIManage.getInstance().showWelcome();
        }


        //点击地图后松开，恢复地图样式
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex].state > 0) {
            this["map" + GameData.mapIndex].visible = false;
            this.ctrlSelect();
        }
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
