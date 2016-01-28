
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/p2/p2.js",
	"bin-debug/Main.js",
	"bin-debug/P2Tool.js",
	"bin-debug/Tool.js",
	"bin-debug/UIManage.js",
	"bin-debug/World.js",
	"bin-debug/data/BulletData.js",
	"bin-debug/data/CtrlData.js",
	"bin-debug/data/EnemyData.js",
	"bin-debug/data/GameData.js",
	"bin-debug/data/HeroData.js",
	"bin-debug/data/ItemData.js",
	"bin-debug/data/MapData.js",
	"bin-debug/role/Bullet.js",
	"bin-debug/role/Enemy.js",
	"bin-debug/role/Hero.js",
	"bin-debug/role/Item.js",
	"bin-debug/role/Num.js",
	"bin-debug/scene/CtrlScene.js",
	"bin-debug/scene/MapScene.js",
	"bin-debug/scene/ShengDiScene.js",
	"bin-debug/scene/WelcomeScene.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "exactFit",
		contentWidth: 800,
		contentHeight: 480,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};