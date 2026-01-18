import type { Palette } from "./types.ts";

export const Palettes: Record<string, Palette> = {};

class RyandomNumberGenerator {
    static ryandomize(lowerBound: number, upperBound: number): number {
        const randArray: Int32Array<ArrayBuffer> = crypto.getRandomValues(new Int32Array(1));
        const random: number = lowerBound + (randArray[0] % (upperBound - lowerBound + 1));

        return Math.abs(Math.floor(random));
    }

    static ryandomizeSingle(upperBound: number): number {
        return this.ryandomize(0, upperBound);
    }
}

export default class Color {
    static GetRandom(palette?: string): string {
        if (palette && Palettes[palette]) {
            const colors = Palettes[palette];
            return colors[RyandomNumberGenerator.ryandomizeSingle(colors.length)];
        }

        return `rgba(${RyandomNumberGenerator.ryandomizeSingle(255)}, ${RyandomNumberGenerator.ryandomizeSingle(255)}, ${RyandomNumberGenerator.ryandomizeSingle(255)}, 1)`;
    }
}
