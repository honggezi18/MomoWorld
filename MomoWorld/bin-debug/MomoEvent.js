var MomoEvent = (function (_super) {
    __extends(MomoEvent, _super);
    function MomoEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=MomoEvent;p=c.prototype;
    MomoEvent.attackTure = "attackTure";
    return MomoEvent;
})(egret.Event);
egret.registerClass(MomoEvent,"MomoEvent");
