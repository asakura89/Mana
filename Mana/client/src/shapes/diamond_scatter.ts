import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";
import { drawDiamond } from "./shape_draw.ts";

class DiamondScatter {
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
            drawDiamond(ctx, item.x + item.size / 2, item.y + item.size / 2, item.size);
            ctx.fill();
        }
    }
}

Shapes.DiamondScatter = DiamondScatter;
ScatterShapes.DiamondScatter = true;
