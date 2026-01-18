import type { ScreenSize } from "./types.ts";

export const Devices: Record<string, ScreenSize> = {};

export default class Screen {
    static get Min(): ScreenSize {
        return {
            Width: 240,
            Height: 320
        };
    }

    static get Max(): ScreenSize {
        return {
            Width: 1920,
            Height: 1200
        };
    }

    static GetByName(name?: string): ScreenSize {
        return name && Devices[name] ? Devices[name] : this.Min;
    }
}
