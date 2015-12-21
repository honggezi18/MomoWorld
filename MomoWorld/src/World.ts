//��������࣬����ͳ�����Ԫ��
class World extends egret.DisplayObjectContainer {
    static P2World:p2.World;//��������������
    static Scene:egret.DisplayObjectContainer;//�����������


    private world:p2.World;//��������
    private world_speed:number = 0.05;//ÿ��ˢ�£���������Ĳ���ʱ��

    constructor() {
        super();
        this.init();
    }

    //��ʼ����Դ
    public init():void {
        World.Scene = new egret.DisplayObjectContainer();
        this.addChild(World.Scene);
        this.createWorldSystem();
        World.P2World = this.world;
        this.registerAndroidEvent();//ע����¼�
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
        this.world.step(this.world_speed);//ʹ����ϵͳ��ǰ����һ��ʱ��
        UIManage.target.syncDisplay();
    }


    //���̰�ť����Ӧ����
    private control(msg) {
        console.log("control    " + msg);
        if (msg == "UpDown") {
        }
        else if (msg == "DownDown") {
        }
        else if (msg == "LeftDown") {
            Hero.getInstance().move("Left");
        }
        else if (msg == "RightDown") {
            Hero.getInstance().move("Right");
        }
        else if (msg == "RightUp" || msg == "LeftUp" || msg == "UpUp" || msg == "DownUp") {
            Hero.getInstance().move("stop");
        }
        else if (msg == "Enter") {

        }
        else if (msg == "Back") {

        }
        else if (msg == "Menu") {

        }
    }

    //���̰�ť��ģ��
    private registerAndroidEvent() {
        window['gameObj'] = this;
        window['keyConfirm'] = this.control;//ȷ��
        window['keyMenu'] = this.control;//�˵�
        window['keyBack'] = this.control;//����
        window['keyLeft'] = this.control;//��
        window['keyUp'] = this.control;//��
        window['keyRight'] = this.control;//��
        window['keyDown'] = this.control;//��
    }


}
