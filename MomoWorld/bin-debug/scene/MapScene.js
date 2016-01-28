//地图选择类
var MapScene = (function (_super) {
    __extends(MapScene, _super);
    function MapScene() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=MapScene;p=c.prototype;
    //初始化
    p.init = function () {
        this.width = 800;
        this.height = 480;
        //设置地图的彩色地板及灰色面板
        this.base = Tool.addBitmap(this, "worldMap_base_png", 0, 0, 800, 480, true);
        this.map0 = Tool.addBitmap(this, "worldMap_map0_disable_png", 179, 85);
        this.map1 = Tool.addBitmap(this, "worldMap_map1_disable_png", 183, 165);
        this.map2 = Tool.addBitmap(this, "worldMap_map2_disable_png", 288, 123);
        this.map3 = Tool.addBitmap(this, "worldMap_map3_disable_png", 553, 4);
        this.map4 = Tool.addBitmap(this, "worldMap_map4_disable_png", 573, 208);
        this.map5 = Tool.addBitmap(this, "worldMap_map5_disable_png", 343, 321);
        this.map6 = Tool.addBitmap(this, "worldMap_map6_disable_png", 93, 223);
        this.map7 = Tool.addBitmap(this, "worldMap_map7_disable_png", 9, 325);
        this.map8 = Tool.addBitmap(this, "worldMap_map8_disable_png", 244, 234);
        this.map9 = Tool.addBitmap(this, "worldMap_map9_disable_png", 292, 404);
        this.back = Tool.addBitmap(this, "worldMap_back1_png", 670, 430, 0, 0, true);
        //设置是否显示激活后的图片，能否点击//设置灰色块的大小
        for (var i = 0; i < 10; i++) {
            this["map" + i].width = Math.floor(this["map" + i].measuredWidth * this.base.width / 640);
            this["map" + i].height = Math.floor(this["map" + i].measuredHeight * this.base.height / 470);
            if (GameData.MapState[i] > 0) {
                this["map" + i].texture = RES.getRes("worldMap_map" + i + "_png");
                this["map" + i].visible = false;
            }
        }
        //设置难度选择框
        this.select = Tool.addDisplayContainer(this, 0, 0, this.width, this.height, true);
        this.selectBox = Tool.addBitmap(this.select, "worldMap_box_png", this.width / 2, this.height / 2, 0, 0, false, true);
        this.commonBtn = Tool.addBitmap(this.select, "worldMap_common1_png", 435, 180);
        this.hardBtn = Tool.addBitmap(this.select, "worldMap_hard0_png", 435, 240);
        this.ruinsBtn = Tool.addBitmap(this.select, "worldMap_ruin0_png", 435, 300);
        this.mapName = Tool.addTextField(this.select, 215, 100, 150, 30, 30, 0x000000, "");
        this.level = Tool.addTextField(this.select, 440, 90, 150, 20, 20, 0x000000, "");
        this.mapName.stroke = 0.6;
        this.select.visible = false;
        this.hardBtn.touchEnabled = true;
        this.ruinsBtn.touchEnabled = true;
        this.commonBtn.touchEnabled = true;
        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.commonBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.hardBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        this.ruinsBtn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        GameData.mapIndex = 0;
        this.ctrlSelect();
    };
    //难度选择页面相关操作
    p.ctrlSelect = function () {
        if (!this.select.visible) {
            //显示难度按钮
            GameData.difficulty = -1;
            this.select.visible = true;
            if (GameData.MapState[GameData.mapIndex] > 1)
                this.hardBtn.texture = RES.getRes("worldMap_hard1_png");
            if (GameData.MapState[GameData.mapIndex] > 2)
                this.ruinsBtn.texture = RES.getRes("worldMap_ruin1_png");
            egret.Tween.get(this.select).to({ scaleX: 1, scaleY: 1 }, 500, egret.Ease.backOut);
            //显示地图信息
            var mapData = getMap(GameData.mapIndex);
            this.mapName.text = mapData["name"];
            this.level.text = "推荐等级:" + mapData["level"];
            for (var i = 0; i < mapData.dropItem.length; i++) {
                var tempItem = mapData.dropItem[i];
                Tool.addBitmap(this.select, "item_background_png", 230 + 60 * (i % 3), 230 + 55 * Math.floor(i / 3), 45, 45, false, true);
                var tempBit = Tool.addBitmap(this.select, tempItem.res, 230 + 60 * (i % 3), 230 + 55 * Math.floor(i / 3), 30, 30, false, true);
                console.log("tempItem.res  " + tempItem.res);
            }
        }
        else {
            GameData.mapIndex = -1; //初始化地图选择
            egret.Tween.get(this.select).to({ scaleX: 0, scaleY: 0 }, 500, egret.Ease.backIn).call(function () {
                this.select.visible = false;
                if (GameData.difficulty > 0) {
                    UIManage.getInstance().hideMap();
                    UIManage.getInstance().showShengDiScene();
                }
            }, this);
        }
    };
    //难度选择按钮点击响应
    p.onTouchStart = function (e) {
        e.stopImmediatePropagation();
        if (this.select.visible) {
            if (e.target == this.commonBtn)
                this.commonBtn.texture = RES.getRes("worldMap_common2_png");
            else if (e.target == this.hardBtn && GameData.MapState[GameData.mapIndex] > 1)
                this.hardBtn.texture = RES.getRes("worldMap_hard2_png");
            else if (e.target == this.ruinsBtn && GameData.MapState[GameData.mapIndex] > 2)
                this.ruinsBtn.texture = RES.getRes("worldMap_ruin2_png");
            return; //点击约束
        }
        //返回点击
        if (e.target == this.back)
            this.back.texture = RES.getRes("worldMap_back2_png");
        if (205 < e.stageX && e.stageX < 273 && 140 < e.stageY && e.stageY < 170)
            GameData.mapIndex = 0;
        else if (195 < e.stageX && e.stageX < 300 && 210 < e.stageY && e.stageY < 235)
            GameData.mapIndex = 1;
        else if (405 < e.stageX && e.stageX < 505 && 165 < e.stageY && e.stageY < 190)
            GameData.mapIndex = 2;
        else if (650 < e.stageX && e.stageX < 755 && 125 < e.stageY && e.stageY < 150)
            GameData.mapIndex = 3;
        else if (618 < e.stageX && e.stageX < 720 && 300 < e.stageY && e.stageY < 325)
            GameData.mapIndex = 4;
        else if (425 < e.stageX && e.stageX < 530 && 385 < e.stageY && e.stageY < 415)
            GameData.mapIndex = 5;
        else if (180 < e.stageX && e.stageX < 285 && 360 < e.stageY && e.stageY < 390)
            GameData.mapIndex = 6;
        else if (45 < e.stageX && e.stageX < 150 && 420 < e.stageY && e.stageY < 445)
            GameData.mapIndex = 7;
        else if (285 < e.stageX && e.stageX < 390 && 315 < e.stageY && e.stageY < 340)
            GameData.mapIndex = 8;
        else if (305 < e.stageX && e.stageX < 410 && 412 < e.stageY && e.stageY < 437)
            GameData.mapIndex = 9;
        //若激活状态为真，则显示点击响应
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex] > 0)
            this["map" + GameData.mapIndex].visible = true;
    };
    //难度选择按钮点击响应
    p.onTouchEnd = function (e) {
        e.stopImmediatePropagation();
        if (this.select.visible) {
            if (e.target == this.commonBtn) {
                GameData.difficulty = 1;
                this.commonBtn.texture = RES.getRes("worldMap_common1_png");
            }
            else if (e.target == this.hardBtn && GameData.MapState[GameData.mapIndex] > 1) {
                GameData.difficulty = 2;
                this.hardBtn.texture = RES.getRes("worldMap_hard1_png");
            }
            else if (e.target == this.ruinsBtn && GameData.MapState[GameData.mapIndex] > 2) {
                GameData.difficulty = 3;
                this.ruinsBtn.texture = RES.getRes("worldMap_ruin1_png");
            }
            this.ctrlSelect(); //点击其他地方，隐藏面板
            return;
        }
        //点击返回
        if (e.target == this.back) {
            this.back.texture = RES.getRes("worldMap_back1_png");
            UIManage.getInstance().hideMap();
            UIManage.getInstance().showWelcome();
        }
        //选择地图，弹出难度选择面板
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex] > 0) {
            this["map" + GameData.mapIndex].visible = false;
            this.ctrlSelect();
        }
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return MapScene;
})(egret.DisplayObjectContainer);
egret.registerClass(MapScene,"MapScene");
