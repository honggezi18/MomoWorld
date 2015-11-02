//��Ϸ��ӭҳ��
class MapScene extends egret.DisplayObjectContainer {
    private base:egret.Bitmap;//������ͼ
    private map1:egret.Bitmap;//��ͼһ
    private map2:egret.Bitmap;//��ͼ��
    private map3:egret.Bitmap;//��ͼ��
    private map4:egret.Bitmap;//��ͼ��
    private map5:egret.Bitmap;//��ͼ��
    private map6:egret.Bitmap;//��ͼ��
    private map7:egret.Bitmap;//��ͼ��
    private map8:egret.Bitmap;//��ͼ��
    private map9:egret.Bitmap;//��ͼ��
    private map10:egret.Bitmap;//��ͼʮ

    private select:egret.DisplayObjectContainer;//ѡ���Ѷȿ�
    private selectBox:egret.Bitmap;//ѡ���Ѷȵ�ѡ���
    private commonBtn:egret.Bitmap;//���ѶȰ�ť
    private hardBtn:egret.Bitmap;//�����ѶȰ�ť
    private ruinsBtn:egret.Bitmap;//�����ѶȰ�ť

    private isSelect:boolean = false;//��ʾ�����Ƿ�����ʾ�Ѷ�ѡ���

    constructor() {
        super();
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        this.width = 800;
        this.height = 480;
        this.base = Tool.addBitmap(this, "worldMap_base_png", 0, 0, 800, 480, true);
        var scaleX = this.base.width / 640;
        var scaleY = this.base.height / 470;

        this.map1 = Tool.addBitmap(this, "worldMap_map1_disable_png", 179, 85, 0, 0, false);
        this.map2 = Tool.addBitmap(this, "worldMap_map2_disable_png", 183, 165, 0, 0, false);
        this.map3 = Tool.addBitmap(this, "worldMap_map3_disable_png", 244, 234, 0, 0, false);
        this.map4 = Tool.addBitmap(this, "worldMap_map4_disable_png", 288, 123, 0, 0, false);
        this.map5 = Tool.addBitmap(this, "worldMap_map5_disable_png", 553, 4, 0, 0, false);
        this.map6 = Tool.addBitmap(this, "worldMap_map6_disable_png", 573, 208, 0, 0, false);
        this.map7 = Tool.addBitmap(this, "worldMap_map7_disable_png", 343, 321, 0, 0, false);
        this.map8 = Tool.addBitmap(this, "worldMap_map8_disable_png", 292, 404, 0, 0, false);
        this.map9 = Tool.addBitmap(this, "worldMap_map9_disable_png", 93, 223, 0, 0, false);
        this.map10 = Tool.addBitmap(this, "worldMap_map10_disable_png", 9, 325, 0, 0, false);
        for (var i = 1; i < 11; i++) {
            this["map" + i].width = Math.floor(this["map" + i].measuredWidth * scaleX);
            this["map" + i].height = Math.floor(this["map" + i].measuredHeight * scaleY);
        }


        this.select = new egret.DisplayObjectContainer();
        this.addChild(this.select);
        this.isSelect = false;
        this.select.scaleX = 0;
        this.select.scaleY = 0;
        this.select.width = this.width;
        this.select.height = this.height;
        this.select.x = this.select.width / 2;
        this.select.y = this.select.height / 2;
        this.select.anchorOffsetX = this.select.width / 2;
        this.select.anchorOffsetY = this.select.height / 2;

        this.selectBox = Tool.addBitmap(this.select, "worldMap_box_png", 0, 0, 0, 0, false);
        this.commonBtn = Tool.addBitmap(this.select, "worldMap_common0_png", 435, 180, 0, 0, false);
        this.hardBtn = Tool.addBitmap(this.select, "worldMap_hard0_png", 435, 240, 0, 0, false);
        this.ruinsBtn = Tool.addBitmap(this.select, "worldMap_ruin0_png", 435, 300, 0, 0, false);
        this.selectBox.x = (this.width - this.selectBox.width) / 2;
        this.selectBox.y = (this.height - this.selectBox.height) / 2;

    }

    //�����Ѷ�ѡ��
    public ctrlSelect():void {
        if (this.isSelect == false) {
            this.isSelect = true;
            this.select.visible = true;
            var tw = egret.Tween.get(this.select);
            tw.to({scaleX: 1, scaleY: 1}, 500, egret.Ease.backOut);
        }
        else {
            this.isSelect = false;
            var tw = egret.Tween.get(this.select);
            tw.to({scaleX: 0, scaleY: 0}, 500, egret.Ease.backIn).call(function () {
                this.select.visible = false;
            }, this);
        }
    }


    //��������
    public onTouchStart(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (205 < e.stageX && e.stageX < 273 && 140 < e.stageY && e.stageY < 170)this.map1.texture = RES.getRes("worldMap_map1_png");
        else if (195 < e.stageX && e.stageX < 300 && 210 < e.stageY && e.stageY < 235)this.map2.texture = RES.getRes("worldMap_map2_png");
        else if (285 < e.stageX && e.stageX < 390 && 315 < e.stageY && e.stageY < 340)this.map3.texture = RES.getRes("worldMap_map3_png");
        else if (405 < e.stageX && e.stageX < 505 && 165 < e.stageY && e.stageY < 190)this.map4.texture = RES.getRes("worldMap_map4_png");
        else if (650 < e.stageX && e.stageX < 755 && 125 < e.stageY && e.stageY < 150)this.map5.texture = RES.getRes("worldMap_map5_png");
        else if (618 < e.stageX && e.stageX < 720 && 300 < e.stageY && e.stageY < 325)this.map6.texture = RES.getRes("worldMap_map6_png");
        else if (425 < e.stageX && e.stageX < 530 && 385 < e.stageY && e.stageY < 415)this.map7.texture = RES.getRes("worldMap_map7_png");
        else if (305 < e.stageX && e.stageX < 410 && 412 < e.stageY && e.stageY < 437)this.map8.texture = RES.getRes("worldMap_map8_png");
        else if (180 < e.stageX && e.stageX < 285 && 360 < e.stageY && e.stageY < 390)this.map9.texture = RES.getRes("worldMap_map9_png");
        else if (45 < e.stageX && e.stageX < 150 && 420 < e.stageY && e.stageY < 445)this.map10.texture = RES.getRes("worldMap_map10_png");
    }

    //�����ɿ�
    public onTouchEnd(e:egret.TouchEvent):void {
        e.stopImmediatePropagation();
        if (205 < e.stageX && e.stageX < 273 && 140 < e.stageY && e.stageY < 170)this.map1.texture = RES.getRes("worldMap_map1_disable_png");
        else if (195 < e.stageX && e.stageX < 300 && 210 < e.stageY && e.stageY < 235)this.map2.texture = RES.getRes("worldMap_map2_disable_png");
        else if (285 < e.stageX && e.stageX < 390 && 315 < e.stageY && e.stageY < 340)this.map3.texture = RES.getRes("worldMap_map3_disable_png");
        else if (405 < e.stageX && e.stageX < 505 && 165 < e.stageY && e.stageY < 190)this.map4.texture = RES.getRes("worldMap_map4_disable_png");
        else if (650 < e.stageX && e.stageX < 755 && 125 < e.stageY && e.stageY < 150)this.map5.texture = RES.getRes("worldMap_map5_disable_png");
        else if (618 < e.stageX && e.stageX < 720 && 300 < e.stageY && e.stageY < 325)this.map6.texture = RES.getRes("worldMap_map6_disable_png");
        else if (425 < e.stageX && e.stageX < 530 && 385 < e.stageY && e.stageY < 415)this.map7.texture = RES.getRes("worldMap_map7_disable_png");
        else if (305 < e.stageX && e.stageX < 410 && 412 < e.stageY && e.stageY < 437)this.map8.texture = RES.getRes("worldMap_map8_disable_png");
        else if (180 < e.stageX && e.stageX < 285 && 360 < e.stageY && e.stageY < 390)this.map9.texture = RES.getRes("worldMap_map9_disable_png");
        else if (45 < e.stageX && e.stageX < 150 && 420 < e.stageY && e.stageY < 445)this.map10.texture = RES.getRes("worldMap_map10_disable_png");
        this.ctrlSelect();
    }
    
    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}