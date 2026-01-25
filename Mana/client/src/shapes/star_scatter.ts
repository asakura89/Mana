import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";
import { drawStar } from "./shape_draw.ts";

class StarScatter {
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
            const outer = item.size / 2;
            const inner = outer * 0.5;
            drawStar(ctx, item.x + outer, item.y + outer, outer, inner, 5, Math.random() * Math.PI * 2);
            ctx.fill();
        }
    }
}

Shapes.StarScatter = StarScatter;
ScatterShapes.StarScatter = true;
