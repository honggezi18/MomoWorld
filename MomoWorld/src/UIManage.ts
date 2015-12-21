//游戏场景管理类
class UIManage {
    static instance;
    static target;//当前显示的场景
    private welcomeScene:WelcomeScene;
    private mapScene:MapScene;

    public static getInstance():UIManage {
        if (UIManage.instance == null)UIManage.instance = new UIManage();
        return UIManage.instance;
    }

    constructor() {
        if (UIManage.instance == null)UIManage.instance = this;
        else throw new Error("UIManage had been Instanced");
    }

    public showWelcome() {
        console.log("showWelcome");
        if (this.welcomeScene != null)this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        UIManage.target = this.welcomeScene;
        World.Scene.addChild(this.welcomeScene);
    }

    public hideWelcome() {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
            World.Scene.removeChild(this.welcomeScene);
            this.welcomeScene = null;
        }
        else console.log("welcomeScene   had   not  instance");
    }

    public showMap() {
        console.log("showMap");
        if (this.mapScene != null)this.mapScene = null;
        this.mapScene = new MapScene();
        UIManage.target = this.mapScene;
        World.Scene.addChild(this.mapScene);
    }

    public hideMap() {
        if (this.mapScene != null) {
            console.log("hideMap");
            World.Scene.removeChild(this.mapScene);
            this.mapScene = null;
        }
        else console.log("mapScene   had   not  instance");
    }




}