import {Palettes} from "./Color.js";
import {Shapes} from "./GridShape.js";
import {Devices, default as Screen} from "./Screen.js";

class Mana {
    constructor () {
        this.Canvas = document.createElement("canvas");
        this.Context = this.Canvas.getContext("2d");
    }

    get Devices() {
        let arr = [];
        for (let device in Devices)
            arr.push(device.toString());

        return arr;
    }

    get Palettes() {
        let arr = [];
        for (let palette in Palettes)
            arr.push(palette.toString());

        return arr;
    }

    get Shapes() {
        let arr = [];
        for (let shape in Shapes)
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

        let shapeType = Shapes[conf.Shape];
        if (shapeType) {
            let shape = new shapeType();
            shape.Draw(this.Context, conf.ScreenWidth, conf.ScreenHeight, conf.Width, conf.Height, 0, conf.Palette);
        }
    }

    Resize(width, height) {
        this.Canvas.width = !width || width === 0 ? window.innerWidth : width;
        this.Canvas.height = !height || height === 0 ? window.innerHeight : height;
        this.Reset();
    }
}

class Initializer {
    constructor() {
        let mana = new Mana();
        document.body.appendChild(mana.Canvas);

        this.Configuration = {
            Shape: mana.Shapes[0],
            Palette: mana.Palettes[0],
            Device: mana.Devices[0],
            Width: 10,
            Height: 10,
            ScreenWidth: window.innerWidth,
            ScreenHeight: window.innerHeight
        };

        window.addEventListener("resize", function () { mana.Render(this.Configuration); }, false);

        let screen = new Screen();
        this.datGui = new dat.GUI();
        let shapeSizeFolder = this.datGui.addFolder("Size");

        let shapeWidthController = shapeSizeFolder
            .add(this.Configuration, "Width")
            .min(1)
            .max(screen.Max.Width)
            .name("Shape Width");

        let shapeHeightController = shapeSizeFolder
            .add(this.Configuration, "Height")
            .min(1)
            .max(screen.Max.Height)
            .name("Shape Height");

        let renderSizeFolder = this.datGui.addFolder("Render Size");
        let customScreenFolder = renderSizeFolder.addFolder("Custom Screen");

        let renderWidthController = customScreenFolder
            .add(this.Configuration, "ScreenWidth")
            .min(screen.Min.Width)
            .max(screen.Max.Width)
            .name("Custom width");

        let renderHeightController = customScreenFolder
            .add(this.Configuration, "ScreenHeight")
            .min(screen.Min.Height)
            .max(screen.Max.Height)
            .name("Custom height");

        let appleScreenController = renderSizeFolder
            .addFolder("Apple Devices")
            .add(this.Configuration, "Device", mana.Devices.filter(dev => dev.toUpperCase().indexOf("ANDROID") === -1))
            .name("Apple Screen size")
            .onFinishChange(function (value) {
                var size = screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        let androidScreenController = renderSizeFolder
            .addFolder("Android Devices")
            .add(this.Configuration, "Device", mana.Devices.filter(dev => dev.toUpperCase().indexOf("ANDROID") !== -1))
            .name("Android Screen size")
            .onFinishChange(function (value) {
                var size = screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        let shapeController = this.datGui
            .add(this.Configuration, "Shape", mana.Shapes)
            .name("Shape");

        let paletteController = this.datGui
            .add(this.Configuration, "Palette", mana.Palettes)
            .name("Palette");

        let thisConfiguration = this.Configuration;
        this.datGui
            .add({
                Render: function () { mana.Render(thisConfiguration); }
            }, "Render")
            .name("Render Shape");

        this.datGui
            .add({
                Save: function () { mana.Save(); }
            }, "Save")
            .name("Save Image");

        mana.Render(this.Configuration);
    }
}

window.addEventListener("load", function () { new Initializer(); });
