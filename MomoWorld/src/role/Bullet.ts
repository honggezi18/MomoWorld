//子弹类
class Bullet {
    public show:egret.Bitmap;
    public hitMC:egret.MovieClip;//击中目标显示的动画
    public data:any;//相关信息
    private _name:string = "1";
    private speed:number = 0;//速度
    private originX:number = 0;//起始X轴
    private toward:number = 1;//子弹射击的方向，1为右边，-1为左边
    private powerBase:number = 0;//该子弹的基本威力
    private powerSpace:number = 0;//该子弹威力的浮动值
    public isOver:boolean = false;

    //构造函数
    constructor(name:string, speed:number, toward:number, x:number, y:number, powerBase:number, powerSpace:number) {
        this._name = name;
        this.speed = speed;
        this.toward = toward;
        this.powerBase = powerBase;
        this.powerSpace = powerSpace;
        this.data = getBullet(this._name);
        this.show = Tool.addBitmap(UIManage.target.item, this.data.name + "_png", x, y, 0, 0, false);
        this.show.anchorOffsetX = this.show.width / 2;
        this.show.anchorOffsetY = this.show.height / 2;
        this.show.scaleX = this.toward;
        this.originX = x;
    }

    //同步函数，子弹前进
    public syncFun():void {
        this.show.x -= this.speed * this.toward;
        var distance:number = Math.abs(this.show.x - this.originX);
        if (distance > this.data.range - 50)this.show.alpha = ( this.data.range - distance) / 50;
        if (distance > this.data.range) {
            this.isOver = true;
            return;
        }

        //检查碰撞，有没有射中敌人
        for (var i = 0; i < GameData.enemyArray.length; i++) {
            var tempEnemy:Enemy = GameData.enemyArray[i];
            if (tempEnemy.isDie)continue;
            var direction1 = Math.abs(this.show.x - P2Tool.getEgretNum(tempEnemy.body.position[0]));//子弹和目标的距离
            if (direction1 < tempEnemy.data.stand.halfWidth) {
                this.isOver = true;//击中目标，是子弹不再往下走
                tempEnemy.action("hit", this.data);
                var powerSpace:number = Math.floor(Math.random() * this.powerSpace);
                var power:number = this.powerBase + powerSpace;
                if (powerSpace > this.powerSpace * 0.8)new Num("num3", P2Tool.getEgretNum(tempEnemy.body.position[0]), P2Tool.getEgretY(tempEnemy.body.position[1]) - 50, power);
                else new Num("num2", P2Tool.getEgretNum(tempEnemy.body.position[0]), P2Tool.getEgretY(tempEnemy.body.position[1]) - 50, power);
                tempEnemy.setData("blood", -power);//目标进行扣血
                return;
            }
        }
    }
}
