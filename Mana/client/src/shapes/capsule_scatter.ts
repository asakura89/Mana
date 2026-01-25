import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";
import { drawCapsule } from "./shape_draw.ts";

class CapsuleScatter {
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
            ctx.fillStyle = Color.GetRandom(palette);
            const w = item.size;
            const h = item.size * 0.6;
            drawCapsule(ctx, item.x, item.y + (item.size - h) / 2, w, h);
            ctx.fill();
        }
    }
}

Shapes.CapsuleScatter = CapsuleScatter;
ScatterShapes.CapsuleScatter = true;
