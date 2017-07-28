
/**
 * 点击事件
 */
export class Eventcoord {

    constructor() { };

    private times: number = 1;

    /**
     * 棋子移动
     * @param data 棋子坐标
     * @param startSute 第一次点击回调 
     * @param goalSite 第二次点击回调
     */
    clickCoordinates(data: any[], map: any[], startSute?: (frame: any, index?: number) => void, goalSite?: (frame: any, index?: number) => void) {
        const element = document.getElementById('canvas');
        const _this = this;
        element.addEventListener('click', function (event) {
            let frame = _this.coordinate(event, element);
            let _data;

            if (_this.times === 1) {
                let match = _this.coordinates(data, frame);

                if (match.message != 0) {
                    _this.times = 1;
                    return;
                } else {
                    startSute(match.code, match.index);
                }
            } else if (_this.times === 2) {
                let match = _this.coordinates(map, frame);

                if (match.message != 0) {
                    _this.times = 1;
                    return;
                } else {
                    goalSite(match.code, match.index);
                }
            }

            _this.times = _this.times === 1 ? 2 : 1;
        });
    }

    anew() {
        this.times = 2;
    }

    /**
     * 点击坐标
     * @param event canvas 回调e
     * @param element canvas html
     */
    private coordinate(event: MouseEvent, element: HTMLElement): any {
        var rect = element.getBoundingClientRect();
        return {
            x: event.clientX - rect.left * (rect.width / rect.width),
            y: event.clientY - rect.top * (rect.height / rect.height)
        }
    }

    /**
     * 判断点击位置是否有效
     * @param tion 匹配数组
     * @param clickCoord  坐标
     */
    private coordinates(tion: any[], clickCoord: any): any {
        let mess = {
            code: {},
            index: 0,
            message: 1
        }

        for (let i = 0; i < tion.length; i++) {
            if (tion[i].x - 22 <= clickCoord.x && clickCoord.x <= tion[i].x + 22 && tion[i].y - 22 <= clickCoord.y && clickCoord.y <= tion[i].y + 22) {
                mess.code = tion[i];
                mess.index = i;
                mess.message = 0;
                break;
            }
        }

        return mess;
    }
}