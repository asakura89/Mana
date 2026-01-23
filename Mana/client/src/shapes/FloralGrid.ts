import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class FloralGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const radius = Math.min(width, height) / 2;
        const petalCount = 6;

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const cx = coord.x + width / 2;
                const cy = coord.y + height / 2;
                ctx.fillStyle = Color.GetRandom(palette);
                for (let i = 0; i < petalCount; i++) {
                    const angle = (Math.PI * 2 * i) / petalCount;
                    const px = cx + Math.cos(angle) * radius * 0.45;
                    const py = cy + Math.sin(angle) * radius * 0.45;
                    ctx.beginPath();
                    ctx.ellipse(px, py, radius * 0.35, radius * 0.2, angle, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.fill();
                }

                ctx.beginPath();
                ctx.arc(cx, cy, radius * 0.25, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.FloralGrid = FloralGrid;
