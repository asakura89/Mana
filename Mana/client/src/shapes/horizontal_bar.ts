import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class HorizontalBar {
    static ComputeCoordinate(screenWidth: number, screenHeight: number, height: number, gap: number) {
        const rowsCount = Math.round(screenHeight / height);
        const rows: { x: number; y: number; w: number; h: number }[] = [];

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

    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string, randomMinSize: number, randomMaxSize: number, randomDensity: number, randomMargin: number): void {
        const rows = this.ComputeCoordinate(screenWidth, screenHeight, height, 0);

        for (let idx = 0; idx < rows.length; idx++) {
            const row = rows[idx];
            ctx.fillStyle = Color.GetRandom(palette);
            ctx.fillRect(row.x, row.y, row.w, row.h);
        }
    }
}

Shapes.HorizontalBar = HorizontalBar;
