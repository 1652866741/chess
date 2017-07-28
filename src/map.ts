import { basis } from 'basisData';


/**
 * 象棋地图
 */


export class Board extends basis {
    boundary: any[];//线坐标
    coordinate: any[];//棋子坐标
    wid: number;
    hig: number;
    river: number;
    element: CanvasRenderingContext2D;

    constructor(ele: CanvasRenderingContext2D, wid: number, hig: number) {
        super();
        this.element = ele;
        this.wid = wid;
        this.hig = hig;
        this.boundary = super.wireCoordinate(wid, hig);
        this.coordinate = super.piecesCoordinate(wid, hig);


        this.basisMap();
        this.croosMap();
    }

    //基础地图绘制
    basisMap() {
        this.element.beginPath();
        this.element.lineWidth = 1;
        for (let i = 0; i < this.boundary.length; i++) {
            this.element.strokeRect(this.boundary[i].x, this.boundary[i].y, this.wid, this.hig);
        }
        this.element.fill();
        this.element.stroke();
    }

    // 交叉线条绘制
    croosMap() {
        let ctx = this.element;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(this.coordinate[3].x, this.coordinate[3].y);
        ctx.lineTo(this.coordinate[23].x, this.coordinate[23].y);

        ctx.moveTo(this.coordinate[5].x, this.coordinate[5].y);
        ctx.lineTo(this.coordinate[21].x, this.coordinate[21].y);

        ctx.moveTo(this.coordinate[66].x, this.coordinate[66].y);
        ctx.lineTo(this.coordinate[86].x, this.coordinate[86].y);

        ctx.moveTo(this.coordinate[68].x, this.coordinate[68].y);
        ctx.lineTo(this.coordinate[84].x, this.coordinate[84].y);
        ctx.fillStyle = "#FF1493";
        ctx.fill();
        ctx.stroke();
    }
}