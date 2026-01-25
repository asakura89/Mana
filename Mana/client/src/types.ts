export type ScreenSize = {
    Width: number;
    Height: number;
};

export type Palette = string[];

export type Shape = {
    Draw: (
        ctx: CanvasRenderingContext2D,
        screenWidth: number,
        screenHeight: number,
        width: number,
        height: number,
        gap: number,
        palette: string,
        randomMinSize: number,
        randomMaxSize: number,
        randomDensity: number,
        randomMargin: number
    ) => void;
};

export type RenderConfiguration = {
    Shape: string;
    Palette: string;
    Device: string;
    Width: number;
    Height: number;
    ScreenWidth: number;
    ScreenHeight: number;
    RandomMinSize: number;
    RandomMaxSize: number;
    RandomDensity: number;
    RandomMargin: number;
};
