import Color from "../Color.js";
import {Shapes} from "../GridShape.js";
import SquareGrid from "./SquareGrid.js";

class RoundGrid extends SquareGrid {
    static Draw (ctx, screenWidth, screenHeight, width, height, gap, palette) {
        const grid = super.ComputeCoordinate(screenWidth, screenHeight, width, height, 0);

        for (let idxc = 0; idxc < grid.length; idxc++) {
            const col = grid[idxc];
            for (let idxr = 0; idxr < col.length; idxr++) {
                const circle = col[idxr];
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.beginPath();
                ctx.arc((circle.x +circle.w) -(circle.w /2), (circle.y +circle.w) -(circle.w /2), circle.w /2, 0, Math.PI *2, true);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.RoundGrid = RoundGrid;
