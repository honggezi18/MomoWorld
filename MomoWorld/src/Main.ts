//入口函数
class Main extends egret.DisplayObjectContainer {
    private hadLoad:number = 0;
    private resList:string[] = ["preload", "worldMap", "map", "hero", "enemy", "attack", "other", "num", "item", "ctrl"];
    private loadingView:LoadingScene;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }


    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup(this.resList[0]);
    }


    private onResourceLoadComplete(event:RES.ResourceEvent):void {
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
            //UIManage.getInstance().showMap();

            //GameData.mapIndex = 0;
            //UIManage.getInstance().showWarScene();
        }
        else {
            RES.loadGroup(this.resList[this.hadLoad]);
        }
        this.loadingView.setProgress(this.hadLoad, this.resList.length);
    }


    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

}


