import Color from "../Color.js";
import {Shapes, default as GridShape} from "../GridShape.js";

class HorizontalBar extends GridShape {
    ComputeCoordinate (screenWidth, screenHeight, height, gap) {
        let rowsCount = Math.round(screenHeight / height);
        let rows = [];

        for(let idx = 0; idx < rowsCount; idx++) {
            let coord = super.ComputeCoordinate(0, idx, gap, screenWidth, height);
            rows.push({
                x: coord.x,
                y: coord.y,
                w: screenWidth,
                h: height
            });
        }

        return rows;
    }

    Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        let rows = this.ComputeCoordinate(screenWidth, screenHeight, height, 0);
        let color = new Color();
        let row;

        for(let idx = 0; idx < rows.length; idx++) {
            row = rows[idx];
            ctx.fillStyle = color.GetRandom(palette);
            ctx.fillRect(row.x, row.y, row.w, row.h);
        }
    }
}

Shapes.HorizontalBar = HorizontalBar;