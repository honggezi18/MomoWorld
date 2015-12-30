//��������࣬����ͳ�����Ԫ��
class World extends egret.DisplayObjectContainer {
    static instance:World;//��������������
    static P2World:p2.World;//��������������
    private world:p2.World;//��������
    private world_speed:number = 0.05;//ÿ��ˢ�£���������Ĳ���ʱ��

    constructor() {
        super();
        if (World.instance == null)World.instance = this;
        else throw new Error("World had been Instanced");
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        CtrlScene.getInstance();
        this.createWorldSystem();
        World.P2World = this.world;
        this.addEventListener(egret.Event.ENTER_FRAME, this.flash, this);//����ÿһ֡�����ݴ���
    }

    //��������ϵͳ
    private createWorldSystem():void {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world['setGlobalStiffness'](1e5);
        this.world.defaultContactMaterial.restitution = 0.1;//���ø���Ĭ�ϲ��ʼ�Ĺ�ϵ
        this.world.gravity[0] = 0;
        this.world.gravity[1] = -6;//��������������Y������
    }

    //ÿһ֡�����ݴ�����������ͬ������
    public flash():void {
        CtrlScene.getInstance().syncFun();
        this.world.step(this.world_speed);//ʹ����ϵͳ��ǰ����һ��ʱ��
        if (UIManage.target != null && typeof(UIManage.target.syncDisplay) == "function")UIManage.target.syncDisplay();
    }

    //���̰�ť����Ӧ����
    private control(msg) {
        console.log("this is World control");
    }

}
