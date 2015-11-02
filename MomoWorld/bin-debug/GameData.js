//游戏数据类
var GameData = (function () {
    function GameData() {
    }
    var d = __define,c=GameData;p=c.prototype;
    //重置参数
    GameData.reset = function () {
    };
    //加载数据
    GameData.loadData = function () {
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++) {
            if (Tool.checkLocal(nameList[i])) {
                GameData[nameList[i]] = JSON.parse(Tool.getLocal(nameList[i]));
            }
        }
    };
    //保存数据//角色数据//基本数据（金币数）
    GameData.saveData = function () {
        var nameList = ["Hero1", "Hero2", "Hero3"]; //角色列表.
        for (var i = 0; i < nameList.length; i++)
            Tool.setLocal(nameList[i], JSON.stringify(GameData[nameList[i]]));
    };
    GameData.gameWidth = 480;
    GameData.gameHeight = 800;
    GameData.scaleSmall = 1;
    return GameData;
})();
egret.registerClass(GameData,"GameData");
