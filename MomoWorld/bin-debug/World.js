//���������࣬����ͳ������Ԫ��
var World = (function (_super) {
    __extends(World, _super);
    function World() {
        _super.call(this);
        this.world_speed = 0.05; //ÿ��ˢ�£����������Ĳ���ʱ��
        this.init();
    }
    var d = __define,c=World;p=c.prototype;
    //��ʼ����Դ
    p.init = function () {
        World.Scene = new egret.DisplayObjectContainer();
        this.addChild(World.Scene);
        this.createWorldSystem();
        World.P2World = this.world;
        this.registerAndroidEvent(); //ע�����¼�
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
        UIManage.target.syncDisplay();
    };
    //���̰�ť����Ӧ����
    p.control = function (msg) {
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
    };
    //���̰�ť��ģ��
    p.registerAndroidEvent = function () {
        window['gameObj'] = this;
        window['keyConfirm'] = this.control; //ȷ��
        window['keyMenu'] = this.control; //�˵�
        window['keyBack'] = this.control; //����
        window['keyLeft'] = this.control; //��
        window['keyUp'] = this.control; //��
        window['keyRight'] = this.control; //��
        window['keyDown'] = this.control; //��
    };
    return World;
})(egret.DisplayObjectContainer);
egret.registerClass(World,"World");
