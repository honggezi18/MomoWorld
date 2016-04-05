//加载中页面
var LoadingScene = (function (_super) {
    __extends(LoadingScene, _super);
    function LoadingScene() {
        _super.call(this);
        this.createView();
    }
    var d = __define,c=LoadingScene;p=c.prototype;
    p.createView = function () {
        this.textField = new egret.TextField();
        this.textField.x = 700;
        this.textField.y = 305;
        this.textField.text = "0%";
        this.textField.size = 25;
        this.textField.width = 70;
        this.textField.height = 25;
        this.textField.textColor = 0x9bc710;
        this.textField.textAlign = "right";
        this.background = Tool.addBitmap(this, "preload_background_png", 0, 0, GameData.gameWidth, GameData.gameHeight, false, false);
        this.loadingBar = Tool.addBitmap(this, "preload_loadingBar_png", GameData.gameWidth / 2 - 20, GameData.gameHeight * 2 / 3, 650, 20, false, true);
        this.loading = Tool.addBitmap(this, "preload_loading_png", 60, 313, 10, 18, false, false);
        this.jump = Tool.addMoveClip(this, "loading_jump", "loading_jump", 70, 240, 1, -1, true);
        this.jump.scaleX = -1;
        this.addChild(this.textField);
    };
    p.setProgress = function (current, total) {
        this.textField.text = Math.floor(current / total * 100) + "%";
        this.loading.width = current / total * (this.loadingBar.width - 10);
        this.jump.x = 70 + 600 * current / total;
    };
    return LoadingScene;
})(egret.Sprite);
egret.registerClass(LoadingScene,"LoadingScene");
