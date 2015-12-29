//子弹类型攻击
class Bullet {
    public show:egret.Bitmap;
    public data:any;//静态数据
    private _name:string = "1";
    private speed:number = 0;//移动速度
    private originX:number = 0;//初始距离，产生子弹的X坐标
    private toward:number = 1;//当前的朝向,其中1为向左。-1为向右
    public isOver:boolean = false;

    //构造函数
    constructor(name:string, speed:number, toward:number, x:number, y:number) {
        this._name = name;
        this.speed = speed;
        this.toward = toward;
        this.data = getBullet(this._name);
        this.show = Tool.addBitmap(UIManage.target.item, this.data.name + "_png", x, y, 0, 0, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.scaleX = this.toward;
        this.originX = x;
    }


    //同步函数
    public syncFun():void {
        this.show.x -= this.speed * this.toward;
        var distance:number = Math.abs(this.show.x - this.originX);
        if (distance > this.data.range - 50)this.show.alpha = ( this.data.range - distance) / 50;
        if (distance > this.data.range)this.isOver = true;
    }
}
