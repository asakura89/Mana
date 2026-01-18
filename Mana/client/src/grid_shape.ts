import type { Shape } from "./types.ts";

export const Shapes: Record<string, Shape> = {};

export default class GridShape {
    static ComputeCoordinate(colIdx: number, rowIdx: number, gap: number, width: number, height: number) {
        return {
            x: ((colIdx + 1) * gap) + (colIdx * width),
            y: ((rowIdx + 1) * gap) + (rowIdx * height)
        };
    }
}
