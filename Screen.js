let Devices = {};
class Screen {
    get Min() {
        return {
            Width: 240,
            Height: 320
        };
    }

    get Max() {
        return {
            Width: 1920,
            Height: 1200
        }
    }

    GetByName (name) {
        return name ? Devices[name] : this.Min;
    }
}

export {Devices, Screen as default}