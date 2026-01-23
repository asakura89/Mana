import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class DiamondGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const cx = coord.x + width / 2;
                const cy = coord.y + height / 2;
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.beginPath();
                ctx.moveTo(cx, coord.y);
                ctx.lineTo(coord.x + width, cy);
                ctx.lineTo(cx, coord.y + height);
                ctx.lineTo(coord.x, cy);
                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.DiamondGrid = DiamondGrid;
