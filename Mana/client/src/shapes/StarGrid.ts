import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class StarGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const outer = Math.min(width, height) * 0.45;
        const inner = outer * 0.5;

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const cx = coord.x + width / 2;
                const cy = coord.y + height / 2;
                ctx.fillStyle = Color.GetRandom(palette);
                ctx.beginPath();
                for (let i = 0; i < 10; i++) {
                    const angle = (Math.PI / 5) * i - Math.PI / 2;
                    const r = i % 2 === 0 ? outer : inner;
                    const x = cx + Math.cos(angle) * r;
                    const y = cy + Math.sin(angle) * r;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }

                ctx.closePath();
                ctx.fill();
            }
        }
    }
}

Shapes.StarGrid = StarGrid;
