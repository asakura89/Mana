import {default as GridShape, Shapes} from "../GridShape.js";
import Color from "../Color.js";

class SquareGrid {
    static ComputeCoordinate(screenWidth, screenHeight, width, height, gap) {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const grid = [];

        for (let idxc = 0; idxc < colsCount; idxc++) {
            grid[idxc] = [];
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, gap, width, height);
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

    static Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        const grid = this.ComputeCoordinate(screenWidth, screenHeight, width, height, 0);

        for (let idxc = 0; idxc < grid.length; idxc++) {
            const col = grid[idxc];
            for (let idxr = 0; idxr < col.length; idxr++) {
                const square = col[idxr];
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.fillRect(square.x, square.y, square.w, square.h);
            }
        }
    }
}

Shapes.SquareGrid = SquareGrid;
export default SquareGrid;
