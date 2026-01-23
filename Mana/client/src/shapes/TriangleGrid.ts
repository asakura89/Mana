import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class TriangleGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const x0 = coord.x;
                const y0 = coord.y;
                const x1 = coord.x + width;
                const y1 = coord.y + height;
                const up = (idxc + idxr) % 2 === 0;
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.beginPath();
                if (up) {
                    ctx.moveTo(x0 + width / 2, y0);
                    ctx.lineTo(x1, y1);
                    ctx.lineTo(x0, y1);
                }
                else {
                    ctx.moveTo(x0, y0);
                    ctx.lineTo(x1, y0);
                    ctx.lineTo(x0 + width / 2, y1);
                }

                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.TriangleGrid = TriangleGrid;
