/* eslint-disable no-undef */
/* eslint-disable max-lines-per-function */
import Mana from "./Engine.js";
import {default as Screen} from "./Screen.js";

class Initializer {
    Init() {
        const mana = new Mana();
        document.body.appendChild(mana.Canvas);

        this.Configuration = {
            Shape: Mana.Shapes[0],
            Palette: Mana.Palettes[0],
            Device: Mana.Devices[0],
            Width: 10,
            Height: 10,
            ScreenWidth: window.innerWidth,
            ScreenHeight: window.innerHeight
        };

        window.addEventListener("resize", function () { mana.Render(this.Configuration); }, false);

        this.datGui = new dat.GUI();
        const shapeSizeFolder = this.datGui.addFolder("Size");

        shapeSizeFolder
            .add(this.Configuration, "Width")
            .min(1)
            .max(Screen.Max.Width)
            .name("Shape Width");

        shapeSizeFolder
            .add(this.Configuration, "Height")
            .min(1)
            .max(Screen.Max.Height)
            .name("Shape Height");

        const renderSizeFolder = this.datGui.addFolder("Render Size");
        const customScreenFolder = renderSizeFolder.addFolder("Custom Screen");

        const renderWidthController = customScreenFolder
            .add(this.Configuration, "ScreenWidth")
            .min(Screen.Min.Width)
            .max(Screen.Max.Width)
            .name("Custom width");

        const renderHeightController = customScreenFolder
            .add(this.Configuration, "ScreenHeight")
            .min(Screen.Min.Height)
            .max(Screen.Max.Height)
            .name("Custom height");

        renderSizeFolder
            .addFolder("Apple Devices")
            .add(this.Configuration, "Device", Mana.Devices.filter((dev) => dev.toUpperCase().indexOf("ANDROID") === -1))
            .name("Apple Screen size")
            .onFinishChange(function (value) {
                var size = screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        renderSizeFolder
            .addFolder("Android Devices")
            .add(this.Configuration, "Device", Mana.Devices.filter((dev) => dev.toUpperCase().indexOf("ANDROID") !== -1))
            .name("Android Screen size")
            .onFinishChange(function (value) {
                var size = Screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        this.datGui
            .add(this.Configuration, "Shape", Mana.Shapes)
            .name("Shape");

        this.datGui
            .add(this.Configuration, "Palette", Mana.Palettes)
            .name("Palette");

        const thisConfiguration = this.Configuration;
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

window.addEventListener("load", function () {
    const initializer = new Initializer();
    initializer.Init();
});
