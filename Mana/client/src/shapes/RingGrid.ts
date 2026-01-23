import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class RingGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const radius = Math.min(width, height) * 0.4;

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const cx = coord.x + width / 2;
                const cy = coord.y + height / 2;
                ctx.strokeStyle = Color.GetRandom(palette);
                ctx.lineWidth = Math.max(2, radius / 6);
                ctx.beginPath();
                ctx.arc(cx, cy, radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.stroke();
            }
        }
    }
}

Shapes.RingGrid = RingGrid;
