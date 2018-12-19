import {Devices} from "./Screen.js";
import {Palettes} from "./Color.js";
import {Shapes} from "./GridShape.js";

class Mana {
    constructor () {
        this.Canvas = document.createElement("canvas");
        this.Context = this.Canvas.getContext("2d");
    }

    static get Devices() {
        const arr = [];
        for (const device in Devices)
            arr.push(device.toString());

        return arr;
    }

    static get Palettes() {
        const arr = [];
        for (const palette in Palettes)
            arr.push(palette.toString());

        return arr;
    }

    static get Shapes() {
        const arr = [];
        for (const shape in Shapes)
            arr.push(shape.toString());

        return arr;
    }

    Save() {
        window.open(this.Canvas.toDataURL("image/png"));
    }

    Reset() {
        this.Context.clearRect(0, 0, this.Width, this.Height);
    }

    Render(conf) {
        this.Resize(conf.ScreenWidth, conf.ScreenHeight);

        const shapeType = Shapes[conf.Shape];
        if (shapeType) {
            shapeType.Draw(this.Context, conf.ScreenWidth, conf.ScreenHeight, conf.Width, conf.Height, 0, conf.Palette);
        }
    }

    Resize(width, height) {
        this.Canvas.width = !width || width === 0 ? window.innerWidth : width;
        this.Canvas.height = !height || height === 0 ? window.innerHeight : height;
        this.Reset();
    }
}

export default Mana;
