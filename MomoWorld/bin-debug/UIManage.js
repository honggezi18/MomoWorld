//游戏场景管理类
var UIManage = (function () {
    function UIManage() {
        if (UIManage.instance == null) {
            UIManage.instance = this;
            this.registerAndroidEvent(World.instance);
        }
        else
            throw new Error("UIManage had been Instanced");
    }
    var d = __define,c=UIManage;p=c.prototype;
    UIManage.getInstance = function () {
        if (UIManage.instance == null)
            UIManage.instance = new UIManage();
        return UIManage.instance;
    };
    //释放内存
    p.clear = function (targer) {
        this.registerAndroidEvent(World.instance);
        //if (Hero.getInstance() != null)Hero.instance = null;
        if (Hero.instance != null)
            Hero.instance = null;
        World.instance.removeChild(UIManage.target);
        CtrlScene.getInstance().removeAll();
        if (World.P2World)
            P2Tool.clearWorld(World.P2World);
        UIManage.target = null;
        targer = null;
    };
    //显示欢迎页面
    p.showWelcome = function () {
        console.log("showWelcome");
        if (this.welcomeScene != null)
            this.welcomeScene = null;
        this.welcomeScene = new WelcomeScene();
        this.registerAndroidEvent(this.welcomeScene);
        UIManage.target = this.welcomeScene;
        CtrlScene.getInstance().showCtrl("welcome");
        World.instance.addChildAt(UIManage.target, 0);
    };
    //隐藏欢迎页面
    p.hideWelcome = function () {
        if (this.welcomeScene != null) {
            console.log("hideWelcome");
            this.clear(this.welcomeScene);
        }
        else
            console.log("welcomeScene   had   not  instance");
    };
    //显示地图页面
    p.showMap = function () {
        console.log("showMap");
        if (this.mapScene != null)
            this.mapScene = null;
        this.mapScene = new MapScene();
        UIManage.target = this.mapScene;
        World.instance.addChildAt(UIManage.target, 0);
    };
    //隐藏地图页面
    p.hideMap = function () {
        if (this.mapScene != null) {
            console.log("hideMap");
            this.clear(this.mapScene);
        }
        else
            console.log("mapScene   had   not  instance");
    };
    //显示圣地地图页面
    p.showWarScene = function () {
        console.log("showWar");
        if (this.warScene != null)
            this.warScene = null;
        this.warScene = new WarScene();
        this.registerAndroidEvent(this.warScene);
        UIManage.target = this.warScene;
        World.instance.addChildAt(UIManage.target, 0);
        CtrlScene.getInstance().showTop();
        CtrlScene.getInstance().showCtrl();
    };
    //隐藏圣地地图页面
    p.hideWarScene = function () {
        if (this.warScene != null) {
            console.log("hideWarScene");
            CtrlScene.getInstance().showTop("hide");
            GameData.enemyArray = [];
            GameData.bulletArray = [];
            this.clear(this.warScene);
        }
        else
            console.log("warScene   had   not  instance");
    };
    //键盘按钮的模拟
    p.registerAndroidEvent = function (target) {
        window['gameObj'] = target;
        window['keyConfirm'] = target.control; //确定
        window['keyMenu'] = target.control; //菜单
        window['keyJump'] = target.control; //弹跳
        window['keySkill1'] = target.control; //技能
        window['keySkill2'] = target.control; //捡取
        window['keyAttack'] = target.control; //攻击
        window['keyLeft'] = target.control; //左
        window['keyUp'] = target.control; //上
        window['keyRight'] = target.control; //右
        window['keyDown'] = target.control; //下
    };
    return UIManage;
})();
egret.registerClass(UIManage,"UIManage");
