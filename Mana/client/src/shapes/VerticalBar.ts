import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class VerticalBar {
    static ComputeCoordinate(screenWidth: number, screenHeight: number, width: number, gap: number) {
        const colsCount = Math.round(screenWidth / width);
        const cols: { x: number; y: number; w: number; h: number }[] = [];

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

    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const cols = this.ComputeCoordinate(screenWidth, screenHeight, width, 0);

        for (let idx = 0; idx < cols.length; idx++) {
            const col = cols[idx];
            ctx.fillStyle = Color.GetRandom(palette);
            ctx.fillRect(col.x, col.y, col.w, col.h);
        }
    }
}

Shapes.VerticalBar = VerticalBar;
