import Color from "../Color.js";
import {Shapes, default as GridShape} from "../GridShape.js";

class VerticalBar extends GridShape {
    ComputeCoordinate(screenWidth, screenHeight, width, gap) {
        let colsCount = Math.round(screenWidth / width);
        let cols = [];

        for (let idx = 0; idx < colsCount; idx++) {
            let coord = super.ComputeCoordinate(idx, 0, gap, width, screenHeight);
            cols.push({
                x: coord.x,
                y: coord.y,
                w: width,
                h: screenHeight
            });
        }

        return cols;
    }

    Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        let cols = this.ComputeCoordinate(screenWidth, screenHeight, width, 0);
        let color = new Color();
        let col;

        for(let idx = 0; idx < cols.length; idx++) {
            col = cols[idx];
            ctx.fillStyle = color.GetRandom(palette);
            ctx.fillRect(col.x, col.y, col.w, col.h);
        }
    }
}

Shapes.VerticalBar  = VerticalBar;