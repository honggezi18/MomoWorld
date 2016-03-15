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
    public isBulletOver:boolean = false;
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
        if(this.isBulletOver)return;
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
                this.hitEffect(P2Tool.getEgretNum(tempEnemy.body.position[0]));
                this.isBulletOver = true;
                tempEnemy.action("hit");
                var powerSpace:number = Math.floor(Math.random() * this.powerSpace);
                var power:number = this.powerBase + powerSpace;
                if (powerSpace > this.powerSpace * 0.8)new Num("num3", P2Tool.getEgretNum(tempEnemy.body.position[0]), P2Tool.getEgretY(tempEnemy.body.position[1]) - 50, power);
                else new Num("num2", P2Tool.getEgretNum(tempEnemy.body.position[0]), P2Tool.getEgretY(tempEnemy.body.position[1]) - 50, power);
                tempEnemy.setData("blood", -power);//目标进行扣血
                return;
            }
        }
    }

    //若有击中反馈的，则在本函数播放击中动画
    public hitEffect(x) {
        if (this.data.offsetX == null){
            this.isOver = true;//击中目标，是子弹不再往下走
            return;
        }
        this.hitMC = Tool.addMoveClip(UIManage.target.item, "attack_hit" + this._name, "attack_hit" + this._name,
            x - this.data.offsetX, this.show.y + this.data.offsetY, this.data.scale, 1, true);
        this.hitMC.addEventListener(egret.Event.COMPLETE, this.mcOver, this);
    }

    //帧动画播放完成后的回调
    public mcOver():void {
        console.log("mcOver");
        this.isOver = true;
        this.hitMC.removeEventListener(egret.Event.COMPLETE, this.mcOver, this);
    }
}

