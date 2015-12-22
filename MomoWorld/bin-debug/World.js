//���������࣬����ͳ������Ԫ��
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        _super.call(this);
        this.world_speed = 0.05; //ÿ��ˢ�£����������Ĳ���ʱ��
        if (World.instance == null)
            World.instance = this;
        else
            throw new Error("World had been Instanced");
        this.init();
    }
    var d = __define,c=World;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        World.Scene = new egret.DisplayObjectContainer();
        this.addChild(World.Scene);
        this.createWorldSystem();
        World.P2World = this.world;
        this.addEventListener(egret.Event.ENTER_FRAME, this.flash, this); //����ÿһ֡�����ݴ���
    };
    //��������ϵͳ
    p.createWorldSystem = function () {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world['setGlobalStiffness'](1e5);
        this.world.defaultContactMaterial.restitution = 0.1; //���ø���Ĭ�ϲ��ʼ��Ĺ�ϵ
        this.world.gravity[0] = 0;
        this.world.gravity[1] = -6; //��������������Y������
    };
    //ÿһ֡�����ݴ�����������ͬ������
    p.flash = function () {
        this.world.step(this.world_speed); //ʹ����ϵͳ��ǰ����һ��ʱ��
        if (UIManage.target != null && typeof (UIManage.target.syncDisplay) == "function")
            UIManage.target.syncDisplay();
    };
    //���̰�ť����Ӧ����
    p.control = function (msg) {
        console.log("this is World control");
    };
    return World;
})(egret.DisplayObjectContainer);
egret.registerClass(World,"World");
