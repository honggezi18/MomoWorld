class MomoEvent extends egret.Event {
    public static attackTure:string = "attackTure";

    public constructor(type:string, bubbles:boolean = false, cancelable:boolean = false) {
        super(type, bubbles, cancelable);
    }
}