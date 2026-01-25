import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";
import { drawPolygon } from "./shape_draw.ts";

class TriangleScatter {
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
            const radius = item.size / 2;
            drawPolygon(ctx, item.x + radius, item.y + radius, radius, 3, Math.random() * Math.PI * 2);
            ctx.fill();
        }
    }
}

Shapes.TriangleScatter = TriangleScatter;
ScatterShapes.TriangleScatter = true;
