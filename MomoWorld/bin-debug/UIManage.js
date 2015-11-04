//游戏场景管理类
var UIManage = (function () {
    function UIManage() {
        if (UIManage.instance == null)
            UIManage.instance = this;
        else
            throw new Error("UIManage had been Instanced");
    }
    var d = __define,c=UIManage;p=c.prototype;
    UIManage.getInstance = function () {
        if (UIManage.instance == null)
            UIManage.instance = new UIManage();
        return UIManage.instance;
    };
    p.showWelcome = function () {
        console.log("showWelcome");
        if (this.welcomeScene != null)
            this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        Main.Stage.addChild(this.welcomeScene);
    };
    p.hideWelcome = function () {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
            Main.Stage.removeChild(this.welcomeScene);
            this.welcomeScene = null;
        }
        else
            console.log("welcomeScene   had   not  instance");
    };
    p.showMap = function () {
        console.log("showMap");
        if (this.mapScene != null)
            this.mapScene = null;
        this.mapScene = new MapScene();
        Main.Stage.addChild(this.mapScene);
    };
    p.hideMap = function () {
        if (this.mapScene != null) {
            console.log("hideMap");
            Main.Stage.removeChild(this.mapScene);
            this.mapScene = null;
        }
        else
            console.log("mapScene   had   not  instance");
    };
    return UIManage;
})();
egret.registerClass(UIManage,"UIManage");
