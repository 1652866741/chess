interface moveRule {
    wid: number;
    hig: number;
    soldier: (chessCoord: any, clickCorrd: any) => any;
    cannon: (chessCoord: any, clickCorrd: any, data?: any) => any;
    vehicle: (chessCoord: any, clickCorrd: any, data?: any) => any;
    horse: (chessCoord: any, clickCorrd: any, data?: any) => any;
    elephants: (chessCoord: any, clickCorrd: any, data?: any) => any;
    bachelor: (chessCoord: any, clickCorrd: any, data?: any) => any;
    will: (chessCoord: any, clickCorrd: any, data?: any) => any;
    direction: (qCoord: any, cCoord: any) => string;
}

// 车炮移动原理相似
// 马象移动原理相似

/**
 * 象棋移动规则
 */
export class Rule implements moveRule {
    wid: number;
    hig: number;

    //message 为0通过 
    move = {
        message: 1,
        data: null,
        code: ""
    }

    constructor(wid: number, hig: number) {
        this.wid = wid;
        this.hig = hig;
    }

    /**
     * 兵
     * @param chessCoord 棋子坐标
     * @param clickCorrd 移动坐标
     */
    soldier(chessCoord: any, clickCorrd: any) {
        this.move.message = 1;

        //避免走交叉线
        if ((chessCoord.CXI + chessCoord.CYI + 1) === (clickCorrd.KYI + clickCorrd.KXI) || (chessCoord.CXI + chessCoord.CYI - 1) === (clickCorrd.KYI + clickCorrd.KXI)) {

        } else {
            this.move.code = "兵不可以这样走";
            return this.move;
        }

        //一次走多步
        if (chessCoord.CXI + 1 === clickCorrd.KXI || chessCoord.CYI + 1 === clickCorrd.KYI || chessCoord.CXI - 1 === clickCorrd.KXI || chessCoord.CYI - 1 === clickCorrd.KYI) {
        } else {
            this.move.code = "兵不可以这样走";
            return this.move;
        }

        if (chessCoord.both == "red") {

            if (clickCorrd.y < chessCoord.y) {
                this.move.code = "兵不能往后走";
                return this.move;
            }

            if (chessCoord.x != clickCorrd.x && chessCoord.CYI <= 5) {
                this.move.code = "兵没有过河，不能左右走";
                return this.move;
            }
        } else {

            if (clickCorrd.y > chessCoord.y) {
                this.move.code = "兵不能往后走";
                return this.move;
            }

            if (chessCoord.x != clickCorrd.x && chessCoord.CYI > 5) {
                this.move.code = "兵没有过河，不能左右走";
                return this.move;
            }
        }


        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 炮
     * @param chessCoord 
     * @param clickCorrd
     * @param data 
     */
    cannon(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        // console.log(`棋X:${chessCoord.CXI}, 棋Y:${chessCoord.CYI}, 击X:${clickCorrd.KXI}, 击Y:${clickCorrd.KYI}`);

        if (chessCoord.CXI !== clickCorrd.KXI && chessCoord.CYI !== clickCorrd.KYI) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let orientation = this.direction(chessCoord, clickCorrd);

        let error = 0;
        let chessNumber = 0;
        let resolution = "";
        data.forEach((n, i) => {
            let KX = Math.round(n.x / this.wid),
                KY = Math.round(n.y / this.hig);

            //TODO: 炮移动规则判断优化
            //炮移动
            if (clickCorrd.KYI === KY) {
                if (orientation === 'left') {
                    if (KX < chessCoord.CXI && KX > clickCorrd.KXI) {
                        chessNumber++;
                    }
                } else if (orientation === 'right') {
                    if (KX > chessCoord.CXI && KX < clickCorrd.KXI) {
                        chessNumber++;
                    }
                }
            } else if (orientation === 'top' || orientation === 'bottom') {
                if (clickCorrd.KXI === KX) {
                    if (orientation === 'top') {
                        if (KY < chessCoord.CYI && KY > clickCorrd.KYI) {
                            chessNumber++;
                        }
                    } else if (orientation === 'bottom') {
                        if (KY > chessCoord.CYI && KY < clickCorrd.KYI) {
                            chessNumber++;
                        }
                    }
                }
            }

            if (n.x === clickCorrd.x && n.y === clickCorrd.y) {
                resolution = n.both;
            }
        })

        if (chessNumber > 1 || resolution === chessCoord.both) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        if (chessNumber >= 1 && resolution.length === 0 || resolution.length !== 0 && chessNumber < 1) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 车
     * @param chessCoord 
     * @param clickCorrd 
     * @param data 
     */
    vehicle(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        if (chessCoord.CXI !== clickCorrd.KXI && chessCoord.CYI !== clickCorrd.KYI) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let orientation = this.direction(chessCoord, clickCorrd);

        let chessNumber = 0;
        let resolution = "";
        data.forEach((n, i) => {
            let KX = Math.round(n.x / this.wid),
                KY = Math.round(n.y / this.hig);

            //TODO: 车移动规则判断优化
            //车移动
            if (clickCorrd.KYI === KY) {
                if (orientation === 'left') {
                    if (KX < chessCoord.CXI && KX > clickCorrd.KXI) {
                        chessNumber++;

                    }
                } else if (orientation === 'right') {
                    if (KX > chessCoord.CXI && KX < clickCorrd.KXI) {
                        chessNumber++;
                    }
                }
            } else if (clickCorrd.KXI === KX) {
                if (orientation === 'top') {
                    if (KY < chessCoord.CYI && KY > clickCorrd.KYI) {
                        chessNumber++;
                    }
                } else if (orientation === 'bottom') {
                    if (KY > chessCoord.CYI && KY < clickCorrd.KYI) {
                        chessNumber++;
                    }
                }
            }

            if (n.x === clickCorrd.x && n.y === clickCorrd.y) {
                resolution = n.both;
            }
        })

        if (chessNumber >= 1 || resolution == chessCoord.both) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 马
     * @param chessCoord 
     * @param clickCorrd 
     * @param data 
     */
    horse(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        // console.log(`棋X:${chessCoord.CXI}, 棋Y:${chessCoord.CYI}, 击X:${clickCorrd.KXI}, 击Y:${clickCorrd.KYI}`);

        let orientation = this.direction(chessCoord, clickCorrd);

        let sunX = clickCorrd.KXI > chessCoord.CXI ? clickCorrd.KXI - chessCoord.CXI : chessCoord.CXI - clickCorrd.KXI;
        let sunY = clickCorrd.KYI > chessCoord.CYI ? clickCorrd.KYI - chessCoord.CYI : chessCoord.CYI - clickCorrd.KYI;

        if (sunX + sunY != 3) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        //撇脚马坐标
        let foot = { x: 0, y: 0 };
        if (sunX > sunY) {
            foot.x = (clickCorrd.KXI > chessCoord.CXI ? clickCorrd.KXI : chessCoord.CXI) - 1;
            foot.y = chessCoord.CYI;
        } else {
            foot.y = (clickCorrd.KYI > chessCoord.CYI ? clickCorrd.KYI : chessCoord.CYI) - 1;
            foot.x = chessCoord.CXI;
        }

        let footError = true;
        let resolution = "";
        data.forEach((resist) => {
            let KX = Math.round(resist.x / this.wid),
                KY = Math.round(resist.y / this.hig);

            if (KX === foot.x && KY === foot.y) {
                footError = false;
                return false;
            }

            if (resist.x === clickCorrd.x && resist.y === clickCorrd.y) {
                resolution = resist.both;
            }
        })

        if (!footError) {
            this.move.code = `撇脚马`;
            return this.move;
        }

        if (resolution == chessCoord.both) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 象
     * @param chessCoord 
     * @param clickCorrd 
     * @param data 
     */
    elephants(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        let seenX = chessCoord.CXI > clickCorrd.KXI ? chessCoord.CXI - clickCorrd.KXI : clickCorrd.KXI - chessCoord.CXI;
        let seenY = chessCoord.CYI > clickCorrd.KYI ? chessCoord.CYI - clickCorrd.KYI : clickCorrd.KYI - chessCoord.CYI;

        if (seenX != 2 || seenY != 2) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let foot = { x: 0, y: 0 };
        foot.x = chessCoord.CXI > clickCorrd.KXI ? chessCoord.CXI - 1 : clickCorrd.KXI - 1;
        foot.y = chessCoord.CYI > clickCorrd.KYI ? chessCoord.CYI - 1 : clickCorrd.KYI - 1;

        let resolution = "";
        let footError = true;
        data.forEach((res) => {
            let KX = Math.round(res.x / this.wid),
                KY = Math.round(res.y / this.hig);

            if (KX === foot.x && KY === foot.y) {
                footError = false;
                return false;
            }

            if (res.x === clickCorrd.x && res.y === clickCorrd.y) {
                resolution = res.both;
            }
        })

        if (resolution == chessCoord.both || !footError) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 士
     * @param chessCoord 
     * @param clickCorrd 
     * @param data 
     */
    bachelor(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        let redCoord = [{ x: 4, y: 1 }, { x: 5, y: 2 }, { x: 4, y: 3 }, { x: 6, y: 3 }, { x: 6, y: 1 }];
        let blackCoord = [{ x: 5, y: 9 }, { x: 4, y: 8 }, { x: 6, y: 8 }, { x: 4, y: 10 }, { x: 6, y: 10 }];

        let on = false;
        if (chessCoord.both == "red") {
            for (let i = 0; i < redCoord.length; i++) {
                if (redCoord[i].x === clickCorrd.KXI && redCoord[i].y === clickCorrd.KYI) {
                    on = true;
                    break;
                }
            }
        } else {
            for (let i = 0; i < blackCoord.length; i++) {
                if (blackCoord[i].x === clickCorrd.KXI && blackCoord[i].y === clickCorrd.KYI) {
                    on = true;
                    break;
                }
            }
        }

        if (!on) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        //判断士一次只能走一格
        let scuX = chessCoord.CXI > clickCorrd.KXI ? chessCoord.CXI - clickCorrd.KXI : clickCorrd.KXI - chessCoord.CXI;
        let scuY = chessCoord.CYI > clickCorrd.KYI ? chessCoord.CYI - clickCorrd.KYI : clickCorrd.KYI - chessCoord.CYI;

        if (scuX + scuY != 2 || scuX === 0 || scuY === 0) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let resolution = "";
        data.forEach((res) => {
            let KX = Math.round(res.x / this.wid),
                KY = Math.round(res.y / this.hig);

            if (res.x === clickCorrd.x && res.y === clickCorrd.y) {
                resolution = res.both;
            }
        })

        if (resolution == chessCoord.both) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 将
     * @param chessCoord 
     * @param clickCorrd 
     * @param data 
     */
    will(chessCoord: any, clickCorrd: any, data: any) {
        this.move.message = 1;

        console.log(`棋X:${chessCoord.CXI}, 棋Y:${chessCoord.CYI}, 击X:${clickCorrd.KXI}, 击Y:${clickCorrd.KYI}`);

        let willRedCoord = [{ x: 6, y: 1 }, { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 3 }, { x: 4, y: 2 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 5, y: 2 }];
        let willBlackCoord = [{ x: 4, y: 10 }, { x: 4, y: 9 }, { x: 4, y: 8 }, { x: 5, y: 8 }, { x: 6, y: 8 }, { x: 6, y: 9 }, { x: 6, y: 10 }, { x: 5, y: 10 }, { x: 5, y: 9 }];

        let location = this.direction(chessCoord, clickCorrd);

        let wi = (chessCoord.CXI + chessCoord.CYI) > (clickCorrd.KXI + clickCorrd.KYI) ? (chessCoord.CXI + chessCoord.CYI) - (clickCorrd.KXI + clickCorrd.KYI) : (clickCorrd.KXI + clickCorrd.KYI) - (chessCoord.CXI + chessCoord.CYI);
        if (wi != 1) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let on = false;
        if (chessCoord.both == "red") {
            for (let i = 0; i < willRedCoord.length; i++) {
                if (willRedCoord[i].x === clickCorrd.KXI && willRedCoord[i].y === clickCorrd.KYI) {
                    on = true;
                    break;
                }
            }
        } else {
            for (let i = 0; i < willBlackCoord.length; i++) {
                if (willBlackCoord[i].x === clickCorrd.KXI && willBlackCoord[i].y === clickCorrd.KYI) {
                    on = true;
                    break;
                }
            }
        }

        if (!on) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        let resolution = "";
        data.forEach((res) => {
            let KX = Math.round(res.x / this.wid),
                KY = Math.round(res.y / this.hig);

            if (res.x === clickCorrd.x && res.y === clickCorrd.y) {
                resolution = res.both;
            }
        })

        if (resolution == chessCoord.both) {
            this.move.code = `${chessCoord.txt}不可以这样走`;
            return this.move;
        }

        this.move.message = 0;
        this.move.data = clickCorrd;
        return this.move;
    }

    /**
     * 方向判断
     * @param qCoord  起始坐标
     * @param cCoord  结束坐标
     */
    direction(qCoord: any, cCoord: any): string {

        if (qCoord.CXI === cCoord.KXI) {
            if (cCoord.KYI < qCoord.CYI) {
                return "top";
            } else if (cCoord.KYI > qCoord.CYI) {
                return "bottom";
            } else {
                return "error";
            }
        }

        if (qCoord.CYI === cCoord.KYI) {
            if (cCoord.KXI < qCoord.CXI) {
                return "left";
            } else if (cCoord.KXI > qCoord.CXI) {
                return "right";
            } else {
                return "error";
            }
        }

        return "error";
    }
}

