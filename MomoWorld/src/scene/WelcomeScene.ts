//��Ϸ��ӭҳ��
class WelcomeScene extends egret.DisplayObjectContainer {
    private background:egret.Bitmap;//��ӭҳ�汳��

    constructor() {
        super();
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        this.width = 800;
        this.height = 480;
    }

    //�����Ѷ�ѡ���ĳ��ֺ���ʧ
    public ctrlSelect():void {

    }

    //��������
    public onTouchStart(e:egret.TouchEvent):void {
    }

    //�����ɿ�
    public onTouchEnd(e:egret.TouchEvent):void {
    }

    public onRemove(e:egret.Event):void {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    }
}
