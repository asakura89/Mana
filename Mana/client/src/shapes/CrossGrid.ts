import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class CrossGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const barW = Math.max(2, Math.min(width, height) * 0.2);

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const cx = coord.x + width / 2;
                const cy = coord.y + height / 2;
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.beginPath();
                ctx.rect(cx - barW / 2, coord.y, barW, height);
                ctx.rect(coord.x, cy - barW / 2, width, barW);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.CrossGrid = CrossGrid;
