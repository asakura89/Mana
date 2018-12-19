const Devices = {};

class Screen {
    static get Min() {
        return {
            Width: 240,
            Height: 320
        };
    }

    static get Max() {
        return {
            Width: 1920,
            Height: 1200
        };
    }

    static GetByName (name) {
        return name ? Devices[name] : this.Min;
    }
}

export {Devices, Screen as default};
