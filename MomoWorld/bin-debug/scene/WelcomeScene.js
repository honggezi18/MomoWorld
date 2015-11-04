//��Ϸ��ӭҳ��
var WelcomeScene = (function (_super) {
    __extends(WelcomeScene, _super);
    function WelcomeScene() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=WelcomeScene;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        this.width = 800;
        this.height = 480;
    };
    //�����Ѷ�ѡ�����ĳ��ֺ���ʧ
    p.ctrlSelect = function () {
    };
    //��������
    p.onTouchStart = function (e) {
    };
    //�����ɿ�
    p.onTouchEnd = function (e) {
    };
    p.onRemove = function (e) {
        e.target.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchStart, this);
        e.target.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
        e.target.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemove, this);
    };
    return WelcomeScene;
})(egret.DisplayObjectContainer);
egret.registerClass(WelcomeScene,"WelcomeScene");
