//��ͼѡ��ҳ��
class Hero extends egret.DisplayObjectContainer {
    private body:egret.MovieClip;//��ɫ���α���

    constructor() {
        super();
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        this.body = Tool.addMoveClip(this, "hero_stand_png", 0, 0, 0, -1);
    }


    public onRemove(e:egret.Event):void {

        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
