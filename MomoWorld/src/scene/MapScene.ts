//地图选择类
class MapScene extends egret.DisplayObjectContainer {
    private base:egret.Bitmap;//彩色基础地图
    private map0:egret.Bitmap;//圣地
    private map1:egret.Bitmap;//水下世界
    private map2:egret.Bitmap;//冰峰雪域
    private map3:egret.Bitmap;//埃德尔斯坦
    private map4:egret.Bitmap;//武陵
    private map5:egret.Bitmap;//尼哈沙漠
    private map6:egret.Bitmap;//米纳尔森林
    private map7:egret.Bitmap;//时间神殿
    private map8:egret.Bitmap;//时间静止之湖
    private map9:egret.Bitmap;//克里蒂亚斯
    private back:egret.Bitmap;//返回按钮

    private select:egret.DisplayObjectContainer;//难度选择容器
    private selectBox:egret.Bitmap;//背景盒子
    private commonBtn:egret.Bitmap;//普通难度
    private hardBtn:egret.Bitmap;//困难按钮
    private ruinsBtn:egret.Bitmap;//地狱按钮
    private isSelect:boolean = false;//标示是否是难度选择页面

    constructor() {
        super();
        this.init();
    }

    //初始化
    public init():void {
        this.width = 800;
        this.height = 480;
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

        //设置能否点击//设置灰色块的大小
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
        this.selectBox = Tool.addBitmap(this.select, "worldMap_box_png", 0, 0);
        this.commonBtn = Tool.addBitmap(this.select, "worldMap_common1_png", 435, 180);
        this.hardBtn = Tool.addBitmap(this.select, "worldMap_hard0_png", 435, 240);
        this.ruinsBtn = Tool.addBitmap(this.select, "worldMap_ruin0_png", 435, 300);
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

    //显示难度选择及其按钮的显示
    public ctrlSelect():void {
        if (this.isSelect == false) {
            this.commonBtn.touchEnabled = true;
            this.hardBtn.touchEnabled = true;
            this.ruinsBtn.touchEnabled = true;
            if (GameData.MapState[GameData.mapIndex] > 1)this.ruinsBtn.texture = RES.getRes("worldMap_hard1_png");
            if (GameData.MapState[GameData.mapIndex] > 2)this.ruinsBtn.texture = RES.getRes("worldMap_ruin1_png");

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
                UIManage.getInstance().hideMap();
                UIManage.getInstance().showShengDiScene();
            }, this);
        }
    }

    //难度选择按钮点击响应
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isSelect) {//ѡ���Ѷ�
            if (e.target == this.commonBtn)this.commonBtn.texture = RES.getRes("worldMap_common2_png");
            else if (e.target == this.hardBtn && GameData.MapState[GameData.mapIndex] > 1)this.hardBtn.texture = RES.getRes("worldMap_hard2_png");
            else if (e.target == this.ruinsBtn && GameData.MapState[GameData.mapIndex] > 2)this.ruinsBtn.texture = RES.getRes("worldMap_ruin2_png");
            return;
        }

        if (e.target == this.back)this.back.texture = RES.getRes("worldMap_back2_png");

        //ѡ���ͼ
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
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex] > 0) {//���õ�ͼ��ʽ
            this["map" + GameData.mapIndex].visible = true;
        }
    }

    //难度选择按钮点击响应
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (this.isSelect) {
            if (e.target == this.commonBtn) {//���ð�ť����ʽ
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
            this.ctrlSelect();
            return;
        }

        if (e.target == this.back) {
            this.back.texture = RES.getRes("worldMap_back1_png");
            UIManage.getInstance().hideMap();
            UIManage.getInstance().showWelcome();
        }


        //�����ͼ���ɿ����ָ���ͼ��ʽ
        if (GameData.mapIndex != -1 && GameData.MapState[GameData.mapIndex] > 0) {
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
