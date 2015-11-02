//游戏场景管理类
class UIManage {
    static instance;
    private mapScene:MapScene;

    public static getInstance():UIManage {
        if (UIManage.instance == null)UIManage.instance = new UIManage();
        return UIManage.instance;
    }

    constructor() {
        if (UIManage.instance == null)UIManage.instance = this;
        else throw new Error("UIManage had been Instanced");
    }

    public showMap() {
        console.log("showMap");
        if (this.mapScene != null)this.mapScene = null;
        this.mapScene = new MapScene();
        Main.Stage.addChild(this.mapScene);
    }

    public hideMap() {
        if (this.mapScene != null) {
            console.log("hideMap");
            Main.Stage.removeChild(this.mapScene);
            this.mapScene = null;
        }
        else console.log("mapScene   had   not  instance");
    }




}