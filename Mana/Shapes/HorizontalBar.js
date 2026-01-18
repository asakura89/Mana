import {default as GridShape, Shapes} from "../GridShape.js";
import Color from "../Color.js";

class HorizontalBar {
    static ComputeCoordinate (screenWidth, screenHeight, height, gap) {
        const rowsCount = Math.round(screenHeight / height);
        const rows = [];

        for (let idx = 0; idx < rowsCount; idx++) {
            const coord = GridShape.ComputeCoordinate(0, idx, gap, screenWidth, height);
            rows.push({
                x: coord.x,
                y: coord.y,
                w: screenWidth,
                h: height
            });
        }

        return rows;
    }

    static Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        const rows = this.ComputeCoordinate(screenWidth, screenHeight, height, 0);

        for (let idx = 0; idx < rows.length; idx++) {
            const row = rows[idx];
            ctx.fillStyle = Color.GetRandom(palette);
            ctx.fillRect(row.x, row.y, row.w, row.h);
        }
    }
}

Shapes.HorizontalBar = HorizontalBar;
