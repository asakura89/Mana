import {default as GridShape, Shapes} from "../GridShape.js";
import Color from "../Color.js";

class VerticalBar {
    static ComputeCoordinate(screenWidth, screenHeight, width, gap) {
        const colsCount = Math.round(screenWidth / width);
        const cols = [];

        for (let idx = 0; idx < colsCount; idx++) {
            const coord = GridShape.ComputeCoordinate(idx, 0, gap, width, screenHeight);
            cols.push({
                x: coord.x,
                y: coord.y,
                w: width,
                h: screenHeight
            });
        }

        return cols;
    }

    static Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        const cols = this.ComputeCoordinate(screenWidth, screenHeight, width, 0);

        for (let idx = 0; idx < cols.length; idx++) {
            const col = cols[idx];
            ctx.fillStyle = Color.GetRandom(palette);
            ctx.fillRect(col.x, col.y, col.w, col.h);
        }
    }
}

Shapes.VerticalBar = VerticalBar;
