//游戏场景管理类
class UIManage {
    static instance;
    static target;//当前显示的场景
    private welcomeScene:WelcomeScene;
    private shengDiScene:ShengDiScene;
    private mapScene:MapScene;

    public static getInstance():UIManage {
        if (UIManage.instance == null)UIManage.instance = new UIManage();
        return UIManage.instance;
    }

    constructor() {
        if (UIManage.instance == null){
            UIManage.instance = this;
            this.registerAndroidEvent(World.instance);
        }
        else throw new Error("UIManage had been Instanced");
    }

    //释放内存
    public clear(targer:any):void {
        this.registerAndroidEvent(World.instance);
        if (Hero.getInstance() != null)Hero.instance = null;
        World.Scene.removeChild(targer);
        P2Tool.clearWorld(World.P2World);
        UIManage.target = null;
        targer = null;
    }


    //显示欢迎页面
    public showWelcome():void {
        console.log("showWelcome");
        if (this.welcomeScene != null)this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        this.registerAndroidEvent(this.welcomeScene);
        UIManage.target = this.welcomeScene;
        World.Scene.addChild(this.welcomeScene);
    }

    //隐藏欢迎页面
    public hideWelcome():void {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
          this.clear(this.welcomeScene);
        }
        else console.log("welcomeScene   had   not  instance");
    }

    //显示地图页面
    public showMap():void {
        console.log("showMap");
        if (this.mapScene != null)this.mapScene = null;
        this.mapScene = new MapScene();
        UIManage.target = this.mapScene;
        World.Scene.addChild(this.mapScene);
    }

    //隐藏地图页面
    public hideMap():void {
        if (this.mapScene != null) {
            console.log("hideMap");
            this.clear(this.mapScene);
        }
        else console.log("mapScene   had   not  instance");
    }


    //显示圣地地图页面
    public showShengDiScene():void {
        console.log("showShengDi");
        if (this.shengDiScene != null)this.shengDiScene = null;
        this.shengDiScene = new ShengDiScene();
        this.registerAndroidEvent(this.shengDiScene);
        UIManage.target = this.shengDiScene;
        World.Scene.addChild(this.shengDiScene);
    }

    //隐藏圣地地图页面
    public hideShengDiScene():void {
        if (this.shengDiScene != null) {
            console.log("hideShengDi");
            this.clear(this.shengDiScene);
        }
        else console.log("shengDiScene   had   not  instance");
    }

    //键盘按钮的模拟
    public registerAndroidEvent(target) {
        window['gameObj'] = target;
        window['keyConfirm'] = target.control;//确定
        window['keyMenu'] = target.control;//菜单
        window['keyJump'] = target.control;//弹跳
        window['keyLeft'] = target.control;//左
        window['keyUp'] = target.control;//上
        window['keyRight'] = target.control;//右
        window['keyDown'] = target.control;//下
    }


}