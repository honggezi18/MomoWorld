//入口函数
class Main extends egret.DisplayObjectContainer {
    private hadLoad:number = 0;
    private resList:string[] = ["map", "welcome", "hero", "other"];

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
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.loadGroup(this.resList[0]);
    }


    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        this.hadLoad++;
        if (this.hadLoad == this.resList.length) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);

            GameData.loadData();
            GameData.reset();
            this.addChild(new World());
            UIManage.getInstance().showWelcome();
            //UIManage.getInstance().showMap();
        }
        else {
            RES.loadGroup(this.resList[this.hadLoad]);
        }
    }


    private onResourceLoadError(event:RES.ResourceEvent):void {
        console.warn("Group:" + event.groupName + " has failed to load");
        this.onResourceLoadComplete(event);
    }

    //设置加载进度条
    private onResourceProgress(event:RES.ResourceEvent):void {


    }
}


