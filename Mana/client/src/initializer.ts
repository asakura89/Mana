import Mana from "./engine.ts";
import Screen from "./screen.ts";
import type { RenderConfiguration } from "./types.ts";

type DatGuiController = {
    min: (value: number) => DatGuiController;
    max: (value: number) => DatGuiController;
    name: (value: string) => DatGuiController;
    onFinishChange: (callback: (value: string) => void) => DatGuiController;
    setValue: (value: number) => void;
};

type DatGui = {
    addFolder: (name: string) => DatGui;
    add: <T extends object, K extends keyof T>(target: T, property: K, options?: string[]) => DatGuiController;
};

type DatGuiFactory = {
    GUI: new () => DatGui;
};

function createDatGui(): DatGui {
    const win = window as unknown as { dat?: DatGuiFactory };
    if (!win.dat) {
        throw new Error("dat.gui not available");
    }
    return new win.dat.GUI();
}

class Initializer {
    configuration: RenderConfiguration;
    datGui: DatGui;

    Init(): void {
        const mana = new Mana();
        document.body.appendChild(mana.Canvas);

        this.configuration = {
            Shape: Mana.Shapes[0],
            Palette: Mana.Palettes[0],
            Device: Mana.Devices[0],
            Width: 10,
            Height: 10,
            ScreenWidth: window.innerWidth,
            ScreenHeight: window.innerHeight
        };

        window.addEventListener("resize", () => {
            mana.Render(this.configuration);
        }, false);

        this.datGui = createDatGui();
        const shapeSizeFolder = this.datGui.addFolder("Size");

        shapeSizeFolder
            .add(this.configuration, "Width")
            .min(1)
            .max(Screen.Max.Width)
            .name("Shape Width");

        shapeSizeFolder
            .add(this.configuration, "Height")
            .min(1)
            .max(Screen.Max.Height)
            .name("Shape Height");

        const renderSizeFolder = this.datGui.addFolder("Render Size");
        const customScreenFolder = renderSizeFolder.addFolder("Custom Screen");

        const renderWidthController = customScreenFolder
            .add(this.configuration, "ScreenWidth")
            .min(Screen.Min.Width)
            .max(Screen.Max.Width)
            .name("Custom width");

        const renderHeightController = customScreenFolder
            .add(this.configuration, "ScreenHeight")
            .min(Screen.Min.Height)
            .max(Screen.Max.Height)
            .name("Custom height");

        renderSizeFolder
            .addFolder("Apple Devices")
            .add(this.configuration, "Device", Mana.Devices.filter((dev) => dev.toUpperCase().indexOf("ANDROID") === -1))
            .name("Apple Screen size")
            .onFinishChange((value) => {
                const size = Screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        renderSizeFolder
            .addFolder("Android Devices")
            .add(this.configuration, "Device", Mana.Devices.filter((dev) => dev.toUpperCase().indexOf("ANDROID") !== -1))
            .name("Android Screen size")
            .onFinishChange((value) => {
                const size = Screen.GetByName(value);
                renderWidthController.setValue(size.Width);
                renderHeightController.setValue(size.Height);
            });

        this.datGui
            .add(this.configuration, "Shape", Mana.Shapes)
            .name("Shape");

        this.datGui
            .add(this.configuration, "Palette", Mana.Palettes)
            .name("Palette");

        const configuration = this.configuration;
        this.datGui
            .add({
                Render: () => { mana.Render(configuration); }
            }, "Render")
            .name("Render Shape");

        this.datGui
            .add({
                Save: () => { mana.Save(); }
            }, "Save")
            .name("Save Image");

        mana.Render(this.configuration);
    }
}

window.addEventListener("load", () => {
    const initializer = new Initializer();
    initializer.Init();
});
