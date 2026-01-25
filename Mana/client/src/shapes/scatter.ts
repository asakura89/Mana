export type ScatterConfig = {
    screenWidth: number;
    screenHeight: number;
    minSize: number;
    maxSize: number;
    density: number;
    margin: number;
};

export type ScatterItem = {
    x: number;
    y: number;
    size: number;
};

export function computeScatterCount(config: ScatterConfig): number {
    const area = Math.max(0, config.screenWidth) * Math.max(0, config.screenHeight);
    const base = area / 10000;
    const count = Math.round(base * Math.max(0, config.density));
    return Math.max(0, count);
}

export function createScatterItems(config: ScatterConfig): ScatterItem[] {
    const minSize = Math.max(1, Math.min(config.minSize, config.maxSize));
    const maxSize = Math.max(minSize, config.maxSize);
    const margin = Math.max(0, config.margin);
    const widthLimit = Math.max(1, config.screenWidth - margin * 2);
    const heightLimit = Math.max(1, config.screenHeight - margin * 2);
    const count = computeScatterCount(config);
    const items: ScatterItem[] = [];

    for (let i = 0; i < count; i++) {
        const size = minSize + Math.random() * (maxSize - minSize);
        const maxX = Math.max(0, widthLimit - size);
        const maxY = Math.max(0, heightLimit - size);
        const x = margin + Math.random() * maxX;
        const y = margin + Math.random() * maxY;
        items.push({ x, y, size });
    }

    return items;
}
