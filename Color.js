let Palettes = {};
class Color {
    GetRandom (palette) {
        if (palette) {
            let colors = Palettes[palette];
            return colors[Math.round(Math.random() *colors.length)];
        }
        else
            return `rgba(${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, ${Math.round(Math.random() *255)}, 1)`;
    }
}

export {Palettes, Color as default}