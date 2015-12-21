//世界管理类，用于统筹各个元素
class World extends egret.DisplayObjectContainer {
    static P2World:p2.World;//物理世界管理变量
    static Scene:egret.DisplayObjectContainer;//场景管理变量


    private world:p2.World;//物理世界
    private world_speed:number = 0.05;//每次刷新，物理世界的步进时长

    constructor() {
        super();
        this.init();
    }

    //初始化资源
    public init():void {
        World.Scene = new egret.DisplayObjectContainer();
        this.addChild(World.Scene);
        this.createWorldSystem();
        World.P2World = this.world;
        this.registerAndroidEvent();//注册各事件
        this.addEventListener(egret.Event.ENTER_FRAME, this.flash, this);//进行每一帧的数据处理
    }

    //创建世界系统
    private createWorldSystem():void {
        this.world = new p2.World();
        this.world.sleepMode = p2.World.BODY_SLEEPING;
        this.world['setGlobalStiffness'](1e5);
        this.world.defaultContactMaterial.restitution = 0.1;//设置刚体默认材质间的关系
        this.world.gravity[0] = 0;
        this.world.gravity[1] = -6;//设置物理世界在Y轴重力
    }

    //每一帧的数据处理函数，用于同步数据
    public flash():void {
        this.world.step(this.world_speed);//使物理系统向前经过一定时间
        UIManage.target.syncDisplay();
    }


    //键盘按钮的响应函数
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

    //键盘按钮的模拟
    private registerAndroidEvent() {
        window['gameObj'] = this;
        window['keyConfirm'] = this.control;//确定
        window['keyMenu'] = this.control;//菜单
        window['keyBack'] = this.control;//返回
        window['keyLeft'] = this.control;//左
        window['keyUp'] = this.control;//上
        window['keyRight'] = this.control;//右
        window['keyDown'] = this.control;//下
    }


}
