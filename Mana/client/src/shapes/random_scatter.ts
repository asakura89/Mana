import Color from "../color.ts";
import { Shapes, ScatterShapes } from "../grid_shape.ts";
import { createScatterItems } from "./scatter.ts";
import { drawPolygon, drawStar, drawDiamond, drawCross, drawCapsule } from "./shape_draw.ts";

type DrawFn = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => void;

const drawCircle: DrawFn = (ctx, x, y, size) => {
    const r = size / 2;
    ctx.beginPath();
    ctx.arc(x + r, y + r, r, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
};

const drawSquare: DrawFn = (ctx, x, y, size) => {
    ctx.fillRect(x, y, size, size);
};

const drawTriangle: DrawFn = (ctx, x, y, size) => {
    const r = size / 2;
    drawPolygon(ctx, x + r, y + r, r, 3, Math.random() * Math.PI * 2);
    ctx.fill();
};

const drawHexagon: DrawFn = (ctx, x, y, size) => {
    const r = size / 2;
    drawPolygon(ctx, x + r, y + r, r, 6, Math.random() * Math.PI * 2);
    ctx.fill();
};

const drawOctagon: DrawFn = (ctx, x, y, size) => {
    const r = size / 2;
    drawPolygon(ctx, x + r, y + r, r, 8, Math.random() * Math.PI * 2);
    ctx.fill();
};

const drawDiamondShape: DrawFn = (ctx, x, y, size) => {
    drawDiamond(ctx, x + size / 2, y + size / 2, size);
    ctx.fill();
};

const drawStarShape: DrawFn = (ctx, x, y, size) => {
    const outer = size / 2;
    drawStar(ctx, x + outer, y + outer, outer, outer * 0.5, 5, Math.random() * Math.PI * 2);
    ctx.fill();
};

const drawCrossShape: DrawFn = (ctx, x, y, size) => {
    drawCross(ctx, x, y, size, 0.28);
    ctx.fill();
};

const drawCapsuleShape: DrawFn = (ctx, x, y, size) => {
    const h = size * 0.6;
    drawCapsule(ctx, x, y + (size - h) / 2, size, h);
    ctx.fill();
};

const drawRingShape: DrawFn = (ctx, x, y, size) => {
    const r = size / 2;
    ctx.lineWidth = Math.max(1, r * 0.2);
    ctx.beginPath();
    ctx.arc(x + r, y + r, r - ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();
};

const drawSet: DrawFn[] = [
    drawCircle,
    drawSquare,
    drawTriangle,
    drawHexagon,
    drawOctagon,
    drawDiamondShape,
    drawStarShape,
    drawCrossShape,
    drawCapsuleShape,
    drawRingShape
];

class RandomScatter {
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
            const draw = drawSet[Math.floor(Math.random() * drawSet.length)];
            const color = Color.GetRandom(palette);
            ctx.fillStyle = color;
            ctx.strokeStyle = color;
            draw(ctx, item.x, item.y, item.size);
        }
    }
}

Shapes.Random = RandomScatter;
ScatterShapes.Random = true;
