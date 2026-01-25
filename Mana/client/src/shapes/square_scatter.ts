import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";

class SquareScatter {
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
            ctx.fillRect(item.x, item.y, item.size, item.size);
        }
    }
}

Shapes.SquareScatter = SquareScatter;
ScatterShapes.SquareScatter = true;
