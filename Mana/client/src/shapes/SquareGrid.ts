import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class SquareGrid {
    static ComputeCoordinate(screenWidth: number, screenHeight: number, width: number, height: number, gap: number) {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const grid: { x: number; y: number; w: number; h: number }[][] = [];

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

    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
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
