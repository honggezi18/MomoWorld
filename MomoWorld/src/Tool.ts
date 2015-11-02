//������
class Tool {
    //��Ӱ�ť�ĺ���
    static addBitmap(target:any, res:string, x:number, y:number, width:number, height:number, isButton:boolean):egret.Bitmap {
        var temp:egret.Bitmap = new egret.Bitmap();
        temp.texture = RES.getRes(res);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        target.addChild(temp);
        if (isButton) {
            temp.touchEnabled = true;
            temp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, target.onTouchStart, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, target.onTouchEnd, target);
            temp.addEventListener(egret.TouchEvent.TOUCH_END, target.onTouchEnd, target);
            temp.addEventListener(egret.Event.REMOVED_FROM_STAGE, target.onRemove, target);//���Ƴ�ʱ������Ϣ�ļ���
        }
        return temp;
    }

    //���λͼ���ֵĺ���
    static addBitmapText(target:any, res:string, x:number, y:number, width:number, height:number, text:string):egret.BitmapText {
        var temp:egret.BitmapText = new egret.BitmapText();
        temp.font = RES.getRes(res);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        temp.text = text;
        target.addChild(temp);
        return temp;
    }

    //���������
    static addTextField(target:any, x:number, y:number, width:number, height:number, size:number, color:number, text:string):egret.TextField {
        var temp:egret.TextField = new egret.TextField();
        temp.x = Math.floor(x * GameData.scaleSmall);
        temp.y = Math.floor(y * GameData.scaleSmall);
        if (width != 0) {
            temp.width = Math.floor(width * GameData.scaleSmall);
            temp.height = Math.floor(height * GameData.scaleSmall);
        }
        temp.textColor = color;
        temp.bold = true;
        temp.size = Math.floor(size * GameData.scaleSmall);
        temp.text = text;
        target.addChild(temp);
        return temp;
    }

    //���ñ��ش洢�ı���
    static setLocal(name:string, value:any):void {
        localStorage.setItem(name, value);//����bΪ"isaac"
    }

    //��ȡ���ش洢�ı���
    static getLocal(name:string):any {
        var data = localStorage.getItem(name);//��ȡb��ֵ
        return data;
    }

    //��Ȿ�ش洢�ı���
    static checkLocal(name:string):boolean {
        var b = localStorage.getItem(name);
        if (b == null || b == "")return false;
        else return true;
    }

    //�Զ���ȫλ��,ǰ�油��
    static setZero(num:number, length:number):string {
        var str = "";
        if (num.toString().length >= length) {
            for (var i = 0; i < length; i++)str += "9";
            return str;
        }
        else  for (var i = num.toString().length; i < length; i++)str += "0";
        return str + num.toString();
    }

    //ɾ�������е��ض�Ԫ��
    static removeOne(array, index):void {
        if (index >= 0 && index < array.length) {
            for (var i = index; i < array.length; i++) {
                array[i] = array[i + 1];
            }
            array.length = array.length - 1;
        }
    }

}