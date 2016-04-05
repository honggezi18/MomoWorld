//入口函数
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        this.hadLoad = 0;
        this.resList = ["preload", "worldMap", "map", "hero", "enemy", "attack", "other", "num", "item", "ctrl"];
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
        RES.loadGroup(this.resList[0]);
    };
    p.onResourceLoadComplete = function (event) {
        this.hadLoad++;
        if (this.hadLoad == 1) {
            this.loadingView = new LoadingScene();
            this.stage.addChild(this.loadingView);
            RES.loadGroup(this.resList[this.hadLoad]);
        }
        else if (this.hadLoad == this.resList.length) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            GameData.loadData();
            GameData.reset();
            this.stage.removeChild(this.loadingView);
            this.stage.addChild(new World());
            UIManage.getInstance().showWelcome();
        }
        else {
            RES.loadGroup(this.resList[this.hadLoad]);
        }
        this.loadingView.setProgress(this.hadLoad, this.resList.length);
    };
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,"Main");
