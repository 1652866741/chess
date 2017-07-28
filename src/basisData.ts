interface data {
    wireCoordinate: (wid: number, hig: number) => any[];
    piecesCoordinate: (wid: number, hig: number) => any[];
}
/**
 * 坐标获取类
 */
export class basis implements data {

    constructor() {

    }

    /**
     * 方块坐标
     * @param wid 方块宽
     * @param hig 方块高
     */
    wireCoordinate(wid: number, hig: number) {
        let boundary = [];

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 8; j++) {
                // 4 代表河道
                if (i === 4) {

                } else {
                    boundary.push({
                        x: j * wid + 40,
                        y: i * hig + 40
                    });
                }
            }
        }
        return boundary;
    }

    /**
     * 棋子坐标
     * @param wid 方块宽
     * @param hig 方块高
     */
    piecesCoordinate(wid: number, hig: number) {
        let coordinate = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 9; j++) {
                coordinate.push({
                    x: j * wid + 40,
                    y: i * hig + 40
                })
            }
        }
        return coordinate;
    }
}