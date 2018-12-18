import Color from "../Color.js";
import {Shapes} from "../GridShape.js";
import SquareGrid from "./SquareGrid.js";

class RoundGrid extends SquareGrid {
    Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        let grid = this.ComputeCoordinate(screenWidth, screenHeight, width, height, 0);
        let color = new Color();
        let col, circle;

        for(let idxc = 0; idxc < grid.length; idxc++) {
            col = grid[idxc];
            for (let idxr = 0; idxr < col.length; idxr++) {
                circle = col[idxr];
                ctx.fillStyle = color.GetRandom(palette);
                ctx.beginPath();
                ctx.arc((circle.x +circle.w) -circle.w /2, (circle.y +circle.w) -circle.w /2, circle.w /2, 0, Math.PI *2, true);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.RoundGrid = RoundGrid;

