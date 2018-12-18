import Color from "../Color.js";
import {Shapes, default as GridShape} from "../GridShape.js";

class SquareGrid extends GridShape {
    ComputeCoordinate(screenWidth, screenHeight, width, height, gap) {
        let totalWidth = width + gap;
        let totalHeight = height + gap;
        let colsCount = Math.round(screenWidth / totalWidth);
        let rowsCount = Math.round(screenHeight / totalHeight);
        let grid = [];

        for(let idxc = 0; idxc < colsCount; idxc++) {
            grid[idxc] = [];
            for(let idxr = 0; idxr < rowsCount; idxr++) {
                let coord = super.ComputeCoordinate(idxc, idxr, gap, width, height);
                grid[idxc][idxr] = {
                    x: coord.x,
                    y: coord.y,
                    w: width,
                    h: height
                };
            }
        }

        return grid;
    }

    Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        let grid = this.ComputeCoordinate(screenWidth, screenHeight, width, height, 0);
        let color = new Color();
        let col, square;

        for(let idxc = 0; idxc < grid.length; idxc++) {
            col = grid[idxc];
            for (let idxr = 0; idxr < col.length; idxr++) {
                square = col[idxr];
                ctx.fillStyle = color.GetRandom(palette);
                ctx.fillRect(square.x, square.y, square.w, square.h);
            }
        }
    }
}

Shapes.SquareGrid = SquareGrid;
export default SquareGrid;