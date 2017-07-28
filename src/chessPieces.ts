import { basis } from 'basisData';
import { Eventcoord } from 'eventCoord';
import { Rule } from 'moveRule';

/**
 * 棋子
 */
export class pieces extends Rule {
    //wid hig 棋子的宽高
    chessData = [];
    wid: number;
    hig: number;
    width: number;
    height: number;
    element: CanvasRenderingContext2D;

    coord: any;
    mapCoord: any;
    tch: number;

    ChessParty: boolean = true;

    constructor(width, height, wid: number, hig: number, element: CanvasRenderingContext2D) {
        super(wid, hig);
        this.coord = new basis().piecesCoordinate(wid, hig);
        this.mapCoord = new basis().wireCoordinate(wid, hig);
        this.element = element;
        this.wid = wid;
        this.hig = hig;
        this.width = width;
        this.height = height;

        this.initial();
        this.generate();
        this.chessSelect();
    }

    /**
     * vehicle 车
     * horse 马
     * elephants 象
     * bachelor 士
     * will 将
     * cannon 炮
     * soldier 兵
     */
    initial() {
        //both 双方
        //survive 是否存在
        let chessMess = [{
            redvehicleOne: {
                x: this.coord[0].x,
                y: this.coord[0].y,
                txt: '车',
                both: "red",
                survive: true,
                type: 'vehicle'
            },
            redhorseOne: {
                x: this.coord[1].x,
                y: this.coord[1].y,
                txt: '马',
                survive: true,
                both: "red",
                type: 'horse'
            },
            redelephantsOne: {
                x: this.coord[2].x,
                y: this.coord[2].y,
                txt: '象',
                survive: true,
                both: "red",
                type: 'elephants'
            },
            redbachelorOne: {
                x: this.coord[3].x,
                y: this.coord[3].y,
                txt: '士',
                survive: true,
                both: "red",
                type: 'bachelor'
            },
            redwill: {
                x: this.coord[4].x,
                y: this.coord[4].y,
                txt: '将',
                survive: true,
                both: "red",
                type: 'will',
            },
            redbachelorTwo: {
                x: this.coord[5].x,
                y: this.coord[5].y,
                txt: '士',
                survive: true,
                both: "red",
                type: 'bachelor'
            },
            redelephantsTwo: {
                x: this.coord[6].x,
                y: this.coord[6].y,
                txt: '象',
                survive: true,
                both: "red",
                type: 'elephants'
            },
            redhorseTwo: {
                x: this.coord[7].x,
                y: this.coord[7].y,
                txt: '马',
                survive: true,
                both: "red",
                type: 'horse'
            },
            redvehicleTwo: {
                x: this.coord[8].x,
                y: this.coord[8].y,
                txt: '车',
                survive: true,
                both: "red",
                type: 'vehicle'
            },
            redcannonOnt: {
                x: this.coord[19].x,
                y: this.coord[19].y,
                txt: '炮',
                survive: true,
                both: "red",
                type: 'cannon'
            },
            redcannonTwo: {
                x: this.coord[25].x,
                y: this.coord[25].y,
                txt: '炮',
                survive: true,
                both: "red",
                type: 'cannon'
            },
            redsoldierOne: {
                x: this.coord[27].x,
                y: this.coord[27].y,
                txt: '兵',
                survive: true,
                both: "red",
                type: 'soldier'
            },
            redsoldierTwo: {
                x: this.coord[29].x,
                y: this.coord[29].y,
                txt: '兵',
                survive: true,
                both: "red",
                type: 'soldier'
            },
            redsoldierThree: {
                x: this.coord[31].x,
                y: this.coord[31].y,
                txt: '兵',
                survive: true,
                both: "red",
                type: 'soldier'
            },
            redsoldierFour: {
                x: this.coord[33].x,
                y: this.coord[33].y,
                txt: '兵',
                survive: true,
                both: "red",
                type: 'soldier'
            },
            redsoldierFive: {
                x: this.coord[35].x,
                y: this.coord[35].y,
                txt: '兵',
                survive: true,
                both: "red",
                type: 'soldier'
            },
            blackvehicleOne: {
                x: this.coord[81].x,
                y: this.coord[81].y,
                txt: '车',
                survive: true,
                both: "black",
                type: 'vehicle'
            },
            blackhorseOne: {
                x: this.coord[82].x,
                y: this.coord[82].y,
                txt: '马',
                survive: true,
                both: "black",
                type: 'horse'
            },
            blackelephantsOne: {
                x: this.coord[83].x,
                y: this.coord[83].y,
                txt: '象',
                survive: true,
                both: "black",
                type: 'elephants'
            },
            blackbachelorOne: {
                x: this.coord[84].x,
                y: this.coord[84].y,
                txt: '士',
                survive: true,
                both: "black",
                type: 'bachelor'
            },
            blackwill: {
                x: this.coord[85].x,
                y: this.coord[85].y,
                txt: '将',
                survive: true,
                both: "black",
                type: 'will'
            },
            blackbachelorTwo: {
                x: this.coord[86].x,
                y: this.coord[86].y,
                txt: '士',
                survive: true,
                both: "black",
                type: 'bachelor'
            },
            blackelephantsTwo: {
                x: this.coord[87].x,
                y: this.coord[87].y,
                txt: '象',
                survive: true,
                both: "black",
                type: 'elephants'
            },
            blackhorseTwo: {
                x: this.coord[88].x,
                y: this.coord[88].y,
                txt: '马',
                survive: true,
                both: "black",
                type: 'horse'
            },
            blackvehicleTwo: {
                x: this.coord[89].x,
                y: this.coord[89].y,
                txt: '车',
                survive: true,
                both: "black",
                type: 'vehicle'
            },
            blackcannonOnt: {
                x: this.coord[64].x,
                y: this.coord[64].y,
                txt: '炮',
                survive: true,
                both: "black",
                type: 'cannon'
            },
            blackcannonTwo: {
                x: this.coord[70].x,
                y: this.coord[70].y,
                txt: '炮',
                survive: true,
                both: "black",
                type: 'cannon'
            },
            blacksoldierOne: {
                x: this.coord[54].x,
                y: this.coord[54].y,
                txt: '兵',
                survive: true,
                both: "black",
                type: 'soldier'
            },
            blacksoldierTwo: {
                x: this.coord[56].x,
                y: this.coord[56].y,
                txt: '兵',
                survive: true,
                both: "black",
                type: 'soldier'
            },
            blacksoldierThree: {
                x: this.coord[58].x,
                y: this.coord[58].y,
                txt: '兵',
                survive: true,
                both: "black",
                type: 'soldier'
            },
            blacksoldierFour: {
                x: this.coord[60].x,
                y: this.coord[60].y,
                txt: '兵',
                survive: true,
                both: "black",
                type: 'soldier'
            },
            blacksoldierFive: {
                x: this.coord[62].x,
                y: this.coord[62].y,
                txt: '兵',
                survive: true,
                both: "black",
                type: 'soldier'
            }
        }]

        this.chessData = Object.keys(chessMess[0]).map(function (k) { return chessMess[0][k] });
    }

    //象棋移动
    chessSelect() {
        let th = this;
        let data = this.chessData;

        let firstData = {};
        let second = {};
        let inates = new Eventcoord();
        inates.clickCoordinates(data, this.coord,
            function (frame, index) {
                if (!th.ChessParty && frame.both == "red") {
                    alert("该黑色方下棋");
                    inates.anew();
                } else if (th.ChessParty && frame.both == "black") {
                    alert("该红方色方下棋");
                    inates.anew();
                } else {
                    firstData = frame;
                    th.tch = index;
                }
            },
            function (frame) {
                second = frame;
                th.chessChange(firstData, second, th.tch);
            })
    }

    /**
     * 获取象棋移动的坐标，并改变象棋数组坐标，重新绘制象棋
     * @param site 要移动象棋坐标
     * @param coord 移动文字坐标
     * @param num 要移动象棋数组里的index
     */
    chessChange(site: any, coord: any, num: number) {
        site.CXI = Math.round(site.x / this.wid);
        site.CYI = Math.round(site.y / this.hig);
        coord.KXI = Math.round(coord.x / this.wid);
        coord.KYI = Math.round(coord.y / this.hig);

        let seat;
        switch (site.type) {
            case "soldier":
                seat = super.soldier(site, coord);
                break;
            case "cannon":
                seat = super.cannon(site, coord, this.chessData);
                break;
            case "vehicle":
                seat = super.vehicle(site, coord, this.chessData);
                break;
            case "horse":
                seat = super.horse(site, coord, this.chessData);
                break;
            case "elephants":
                seat = super.elephants(site, coord, this.chessData);
                break;
            case "bachelor":
                seat = super.bachelor(site, coord, this.chessData);
                break;
            case "will":
                seat = super.will(site, coord, this.chessData);
                break;
            default:
                break;
        }

        if (seat) {
            if (seat.message != 0) {
                alert(seat.code);
            } else {
                let exist = this.goalExist(this.chessData, seat.data);
                if (exist) {
                    this.victory(exist);
                }
                this.eatOff(seat.data, num);
                this.generate();
                this.ChessParty = !this.ChessParty;
            }
        }
    }

    /**
     * 吃
     */
    eatOff(c, num) {
        var exit = true;
        this.chessData.every((sun, index) => {
            if (sun.both == c.both) {
                if (sun.x === c.x && sun.y === c.y) {
                    return false;
                }
            } else {
                if (sun.x === c.x && sun.y === c.y) {
                    this.chessData[num].x = c.x;
                    this.chessData[num].y = c.y;
                    this.chessData.splice(index, 1);
                    exit = false;
                    return false;
                }
            }
            return true;
        })

        if (exit) {
            this.chessData[num].x = c.x;
            this.chessData[num].y = c.y;
        }
    }

    goalExist(data: any, goal: any): any {
        for (let i = 0; i < data.length; i++) {
            if (data[i].x === goal.x && data[i].y === goal.y) {
                return data[i];
            }
        }
        return false;
    }

    /**
     * 胜利判断
     * @param c 
     */
    victory(c): boolean {
        if (c.type == 'will') {
            if (c.both == 'red') {
                var r = confirm("黑方胜利")
                if (r == true) {
                    window.location.reload();
                }
                else {
                    window.location.reload();
                }
            } else if (c.both == 'black') {
                var r = confirm("红方胜利")
                if (r == true) {
                    window.location.reload();
                }
                else {
                    window.location.reload();
                }
            }
            return false;
        }
        return true;
    }

    /**
     * 象棋循环 
     */
    generate() {
        let signRed = this.chessData;
        this.element.clearRect(0, 0, this.width, this.height);

        for (let i = 0; i < signRed.length; i++) {
            let color = signRed[i].both == "red" ? "red" : "black";
            this.board(signRed[i].x, signRed[i].y, signRed[i].txt, color);
        }
    }

    /**
     * 象棋绘制
     * @param x  象棋x轴
     * @param y  象棋y轴
     * @param t  象棋文字
     * @param s  象棋颜色
     */
    board(x: number, y: number, t: string, s: string) {
        let ctx = this.element;
        ctx.beginPath();
        ctx.fillStyle = "#be9168";
        ctx.arc(x, y, 22, 0, 2 * Math.PI);
        ctx.arc(x, y, 18, 0, 2 * Math.PI);
        ctx.fill();
        ctx.font = "16px Georgia";
        ctx.fillStyle = s;
        ctx.fillText(t, x - 8, y + 5);
        ctx.stroke();
    }
}