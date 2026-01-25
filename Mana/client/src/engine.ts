import { Devices } from "./screen.ts";
import { Palettes } from "./color.ts";
import { Shapes } from "./grid_shape.ts";
import type { RenderConfiguration } from "./types.ts";

export default class Mana {
    Canvas: HTMLCanvasElement;
    Context: CanvasRenderingContext2D;
    Width: number;
    Height: number;

    constructor() {
        this.Canvas = document.createElement("canvas");
        const context = this.Canvas.getContext("2d");
        if (!context) {
            throw new Error("Canvas 2D context not available");
        }

        this.Context = context;
        this.Width = 0;
        this.Height = 0;
    }

    static get Devices(): string[] {
        const arr: string[] = [];
        for (const device in Devices) {
            arr.push(device.toString());
        }

        return arr;
    }

    static get Palettes(): string[] {
        const arr: string[] = [];
        for (const palette in Palettes) {
            arr.push(palette.toString());
        }

        return arr;
    }

    static get Shapes(): string[] {
        const arr: string[] = [];
        for (const shape in Shapes) {
            arr.push(shape.toString());
        }

        return arr;
    }

    Save(): void {
        window.open(this.Canvas.toDataURL("image/png"));
    }

    Reset(): void {
        this.Context.clearRect(0, 0, this.Width, this.Height);
    }

    Render(conf: RenderConfiguration): void {
        this.Resize(conf.ScreenWidth, conf.ScreenHeight);
        const shapeType = Shapes[conf.Shape];
        if (shapeType) {
            shapeType.Draw(
                this.Context,
                conf.ScreenWidth,
                conf.ScreenHeight,
                conf.Width,
                conf.Height,
                0,
                conf.Palette,
                conf.RandomMinSize,
                conf.RandomMaxSize,
                conf.RandomDensity,
                conf.RandomMargin
            );
        }
    }

    Resize(width: number, height: number): void {
        this.Canvas.width = !width || width === 0 ? window.innerWidth : width;
        this.Canvas.height = !height || height === 0 ? window.innerHeight : height;
        this.Width = this.Canvas.width;
        this.Height = this.Canvas.height;
        this.Reset();
    }
}
