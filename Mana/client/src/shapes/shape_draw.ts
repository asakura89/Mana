export function drawPolygon(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, sides: number, rotation: number): void {
    if (sides < 3) return;
    ctx.beginPath();
    for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * Math.PI * 2) / sides;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
}

export function drawStar(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, outerRadius: number, innerRadius: number, points: number, rotation: number): void {
    if (points < 2) return;
    ctx.beginPath();
    const step = Math.PI / points;
    for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = rotation + i * step;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }
    ctx.closePath();
}

export function drawDiamond(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, size: number): void {
    const half = size / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - half);
    ctx.lineTo(centerX + half, centerY);
    ctx.lineTo(centerX, centerY + half);
    ctx.lineTo(centerX - half, centerY);
    ctx.closePath();
}

export function drawCross(ctx: CanvasRenderingContext2D, x: number, y: number, size: number, thicknessRatio: number): void {
    const t = Math.max(1, size * thicknessRatio);
    const half = size / 2;
    const tHalf = t / 2;
    ctx.beginPath();
    ctx.rect(x + half - tHalf, y, t, size);
    ctx.rect(x, y + half - tHalf, size, t);
    ctx.closePath();
}

export function drawRing(ctx: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, thickness: number): void {
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.max(1, radius - thickness / 2), 0, Math.PI * 2);
    ctx.closePath();
}

export function drawCapsule(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number): void {
    const radius = Math.min(width, height) / 2;
    const right = x + width;
    const bottom = y + height;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(right - radius, y);
    ctx.arc(right - radius, y + radius, radius, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(x + radius, bottom);
    ctx.arc(x + radius, y + radius, radius, Math.PI / 2, (Math.PI * 3) / 2);
    ctx.closePath();
}
