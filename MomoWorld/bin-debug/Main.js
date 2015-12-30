//入口函数
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.hadLoad = 0;
        this.resList = ["worldMap", "map", "hero", "enemy", "attack", "other", "num", "item", "ctrl"];
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    var d = __define,c=Main;p=c.prototype;
    p.onAddToStage = function (event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resList[0]);
    };
    p.onResourceLoadComplete = function (event) {
        this.hadLoad++;
        if (this.hadLoad == this.resList.length) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            GameData.loadData();
            GameData.reset();
            this.stage.addChild(new World());
            //UIManage.getInstance().showWelcome();
            UIManage.getInstance().showShengDiScene();
        }
        else {
            RES.loadGroup(this.resList[this.hadLoad]);
        }
    };
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    //设置加载进度条
    p.onResourceProgress = function (event) {
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,"Main");
