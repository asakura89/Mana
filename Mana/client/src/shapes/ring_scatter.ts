import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";

class RingScatter {
    static Draw(ctx: CanvasRenderingContext2D, screenWidth: number, screenHeight: number, width: number, height: number, gap: number, palette: string, randomMinSize: number, randomMaxSize: number, randomDensity: number, randomMargin: number): void {
        const items = createScatterItems({
            screenWidth,
            screenHeight,
            minSize: randomMinSize,
            maxSize: randomMaxSize,
            density: randomDensity,
            margin: randomMargin
        });

        for (const item of items) {
            const radius = item.size / 2;
            ctx.strokeStyle = Color.GetRandom(palette);
            ctx.lineWidth = Math.max(1, radius * 0.2);
            ctx.beginPath();
            ctx.arc(item.x + radius, item.y + radius, radius - ctx.lineWidth / 2, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

Shapes.RingScatter = RingScatter;
ScatterShapes.RingScatter = true;
