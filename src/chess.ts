import { Board } from 'map';
import { pieces } from 'chessPieces';
import { Eventcoord } from 'Eventcoord';

class Chess {
    constructor() {
        let w = 500;
        let h = 500;

        let canvas = <HTMLCanvasElement>document.getElementById('map');
        let context = canvas.getContext('2d');
        canvas.width = 500 + 80;
        canvas.height = 500 + 80;
        let board = new Board(context, w / 8, h / 9);

        let can = <HTMLCanvasElement>document.getElementById('canvas');
        let ctx = can.getContext('2d');
        can.width = 500 + 80;
        can.height = 500 + 80;
        new pieces(can.width, can.height, w / 8, h / 9, ctx);
    }
}

new Chess();