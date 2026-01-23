import GridShape, { Shapes } from "../grid_shape.ts";
import Color from "../color.ts";

class StippledSquareGrid {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string): void {
        const totalWidth = width + gap;
        const totalHeight = height + gap;
        const colsCount = Math.round(screenWidth / totalWidth);
        const rowsCount = Math.round(screenHeight / totalHeight);
        const size = Math.min(width, height) * 0.9;
        const spacing = Math.max(2, Math.floor(size / 6));

        for (let idxc = 0; idxc < colsCount; idxc++) {
            for (let idxr = 0; idxr < rowsCount; idxr++) {
                const coord = GridShape.ComputeCoordinate(idxc, idxr, 0, width, height);
                const jitterX = (Math.random() - 0.5) * width * 0.2;
                const jitterY = (Math.random() - 0.5) * height * 0.2;
                const cx = coord.x + width / 2 + jitterX;
                const cy = coord.y + height / 2 + jitterY;
                const angle = (Math.random() - 0.5) * Math.PI;
                const color = Color.GetRandom(palette);
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(angle);
                ctx.beginPath();
                ctx.rect(-size / 2, -size / 2, size, size);
                ctx.closePath();
                ctx.clip();
                ctx.strokeStyle = color;
                ctx.lineWidth = Math.max(1, size / 30);
                for (let y = -size / 2; y <= size / 2; y += spacing) {
                    ctx.beginPath();
                    ctx.moveTo(-size / 2, y);
                    ctx.lineTo(size / 2, y + spacing / 2);
                    ctx.stroke();
                }

                ctx.restore();
            }
        }
    }
}

Shapes.StippledSquareGrid = StippledSquareGrid;
