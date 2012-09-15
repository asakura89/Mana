/**
 * Copyright (C) 2012 Dita A Subrata
 * yukka.pixel@gmail.com
 * http://yukkapixel.com
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 * 
 * 
 * version 0.1:
 * - First release
 * 
 * version 0.2:		
 * - Added save image function
 * - Added shape's width and height control
 * - Added google io 2010 color pallete
 * - Added rounded pixel grid
 * 
 * version 0.3:
 * - Added custom render size
 * - Added various apple and android screen size
 * 
 * version 0.4:
 * - Cleaning Up
 * - Fix screen size changes
 */

"use strict";

var ShapeType = {
    HORIZONTAL: "0",
    VERTICAL: "1",
    GRID: "2",
    ROUND_GRID: "3"
};

var ColorType = {
    BW: "0",
    CMYK: "1",
    RGB: "2",
    GRAY: "3",
    BC: "4",
    HP: "5",
    GOOGLEIO2010: "6",
    ALL: "7"
};

var DeviceType = {
    IPHONE: "0",
    IPHONE_RETINA: "1",
    IPAD: "2",
    ANDROID_240_320: "3",
    ANDROID_480_640: "4",
    ANDROID_LDPI_240_400: "5",
    ANDROID_LDPI_240_432: "6",
    ANDROID_320_480: "7",
    ANDROID_480_800: "8",
    ANDROID_480_854: "9",
    ANDROID_600_1024: "10",
    ANDROID_1024_600: "11",
    ANDROID_1024_768: "12",
    ANDROID_1280_768: "13",
    ANDROID_1280_800: "14",
    ANDROID_1536_1152: "15",
    ANDROID_1920_1152: "16",
    ANDROID_1920_1200: "17"
};

var MaxScreenSize = {
    Width: 1920,
    Height: 1200
};

var MinScreenSize = {
    Width: 240,
    Height: 320
};

var Mana = (function() {
    var obj = {};

    obj.Width = window.innerWidth;
    obj.Height = window.innerHeight;
    obj.Canvas = document.createElement("canvas");
    obj.Context = obj.Canvas.getContext("2d");
    obj.Colors = {
        BlackWhite: ["#000000", "#ffffff"],
        CMYK: ["#00ffff", "#ff00ff", "#ffff00", "#000000"],
        RGB: ["#cc0000", "#00cc00", "#0000cc"],
        Gray: ["#000000", "#080808", "#101010", "#181818",
               "#202020", "#282828", "#303030", "#383838",
               "#404040", "#484848", "#505050", "#585858",
               "#606060", "#686868", "#707070", "#787878",
               "#808080", "#888888", "#909090", "#989898",
               "#a0a0a0", "#a8a8a8", "#b0b0b0", "#b8b8b8",
               "#c0c0c0", "#d0d0d0", "#d8d8d8", "#e0e0e0",
               "#e8e8e8", "#f0f0f0", "#f8f8f8", "#ffffff"],
        BrightColorful: ["#f0f0ef", "#fbfaf9", "#8ecb00", "#8ac900",
                         "#3e3e3e", "#46c7ec", "#58d5f1", "#ffae00",
                         "#dc0967", "#e40b7c"],
        HakimParticle: ["#000000", "#ff0000", "#ffff00"],
        GoogleIO2010: ["#0068b3", "#f9aa89", "#e51937", "#c41230",
                       "#ffd24f", "#f0b310", "#1ab7ea", "#005581",
                       "#00704a", "#00a950", "#b3d88c"]
    };
    obj.GetRandomColor = function(paramColor) {
        var arrlen, color;

        switch(paramColor) {
            case ColorType.BW:
                arrlen = obj.Colors.BlackWhite.length;
                color = obj.Colors.BlackWhite[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.GRAY:
                arrlen = obj.Colors.Gray.length;
                color = obj.Colors.Gray[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.CMYK:
                arrlen = obj.Colors.CMYK.length;
                color = obj.Colors.CMYK[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.RGB:
                arrlen = obj.Colors.RGB.length;
                color = obj.Colors.RGB[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.BC:
                arrlen = obj.Colors.BrightColorful.length;
                color = obj.Colors.BrightColorful[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.HP:
                arrlen = obj.Colors.HakimParticle.length;
                color = obj.Colors.HakimParticle[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.GOOGLEIO2010:
                arrlen = obj.Colors.GoogleIO2010.length;
                color = obj.Colors.GoogleIO2010[Math.round(Math.random() * arrlen)];
                break;
            case ColorType.ALL:
                color = "rgba(" + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + "," + Math.round(Math.random() * 255) + ", 1)";
                break;
        }

        return color;
    };
    obj.GetScreenSize = function(paramDevice) {
        var screenSize = { w: 0, h: 0 };

        switch (paramDevice) {
            case DeviceType.IPHONE:
                screenSize.w = 320;
                screenSize.h = 480;
                break;
            case DeviceType.IPHONE_RETINA:
                screenSize.w = 640;
                screenSize.h = 960;
                break;
            case DeviceType.IPAD:
                screenSize.w = 768;
                screenSize.h = 1024;
                break;
            case DeviceType.ANDROID_240_320:
                screenSize.w = 240;
                screenSize.h = 320;
                break;
            case DeviceType.ANDROID_480_640:
                screenSize.w = 480;
                screenSize.h = 640;
                break;
            case DeviceType.ANDROID_LDPI_240_400:
                screenSize.w = 240;
                screenSize.h = 400;
                break;
            case DeviceType.ANDROID_LDPI_240_432:
                screenSize.w = 240;
                screenSize.h = 432;
                break;
            case DeviceType.ANDROID_320_480:
                screenSize.w = 320;
                screenSize.h = 480;
                break;
            case DeviceType.ANDROID_480_800:
                screenSize.w = 480;
                screenSize.h = 800;
                break;
            case DeviceType.ANDROID_480_854:
                screenSize.w = 480;
                screenSize.h = 854;
                break;
            case DeviceType.ANDROID_600_1024:
                screenSize.w = 600;
                screenSize.h = 1024;
                break;
            case DeviceType.ANDROID_1024_600:
                screenSize.w = 1024;
                screenSize.h = 600;
                break;
            case DeviceType.ANDROID_1024_768:
                screenSize.w = 1024;
                screenSize.h = 768;
                break;
            case DeviceType.ANDROID_1280_768:
                screenSize.w = 1280;
                screenSize.h = 768;
                break;
            case DeviceType.ANDROID_1280_800:
                screenSize.w = 1280;
                screenSize.h = 800;
                break;
            case DeviceType.ANDROID_1536_1152:
                screenSize.w = 1536;
                screenSize.h = 1152;
                break;
            case DeviceType.ANDROID_1920_1152:
                screenSize.w = 1920;
                screenSize.h = 1152;
                break;
            case DeviceType.ANDROID_1920_1200:
                screenSize.w = 1920;
                screenSize.h = 1200;
                break;
        }

        return screenSize;
    };
    obj.ComputeCoordinate = function(idxCol, idxRow, paramDistance, paramWidth, paramHeight) {
        var retxy = {
            x: ((idxCol + 1) * paramDistance) + (idxCol * paramWidth),
            y: ((idxRow + 1) * paramDistance) + (idxRow * paramHeight)
        };

        return retxy;
    };
    obj.CreateHorizontalBar = function(paramHeight, paramDistance) {
        var gridRow = Math.round(obj.Height / paramHeight);
        var square2Create = new Array(gridRow);

        for(var i = 0; i < gridRow; i++) {
            var xy = obj.ComputeCoordinate(0, i, paramDistance, obj.Width, paramHeight);
            square2Create[i] = {
                x: xy.x,
                y: xy.y,
                w: obj.Width,
                h: paramHeight
            };
        }

        return square2Create;
    };
    obj.CreateVerticalBar = function(paramWidth, paramDistance) {
        var gridCol = Math.round(obj.Width / paramWidth);
        var square2Create = new Array(gridCol);

        for(var i = 0; i < gridCol; i++) {
            var xy = obj.ComputeCoordinate(i, 0, paramDistance, paramWidth, obj.Height);
            square2Create[i] = {
                x: xy.x,
                y: xy.y,
                w: paramWidth,
                h: obj.Height
            };
        }

        return square2Create;
    };
    obj.CreateSquareGrid = function(paramWidth, paramHeight, paramDistance) {
        var totalSpaceWidth = paramWidth + paramDistance;
        var totalSpaceHeight = paramHeight + paramDistance;
        var gridCol = Math.round(obj.Width / totalSpaceWidth);
        var gridRow = Math.round(obj.Height / totalSpaceHeight);
        var square2Create = [];

        for(var i = 0; i < gridCol; i++) {
            square2Create[i] = new Array(gridRow);
            for(var j = 0; j < gridRow; j++) {
                var xy = obj.ComputeCoordinate(i, j, paramDistance, paramWidth, paramHeight);
                square2Create[i][j] = {
                    x: xy.x,
                    y: xy.y,
                    w: paramWidth,
                    h: paramHeight
                };
            }
        }

        return square2Create;
    };
    obj.Draw = function(paramType, paramColor, paramWidth, paramHeight) {
        var shape, col, row;

        switch(paramType) {
            case ShapeType.HORIZONTAL:
                shape = obj.CreateHorizontalBar(paramHeight, 0);
                row = shape.length;

                for(var i = 0; i < row; i++) {
                    obj.Context.fillStyle = obj.GetRandomColor(paramColor);
                    obj.Context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
                }
                break;
            case ShapeType.VERTICAL:
                shape = obj.CreateVerticalBar(paramWidth, 0);
                col = shape.length;

                for(var i = 0; i < col; i++) {
                    obj.Context.fillStyle = obj.GetRandomColor(paramColor);
                    obj.Context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
                }
                break;
            case ShapeType.GRID:
                shape = obj.CreateSquareGrid(paramWidth, paramHeight, 0);
                col = shape.length;
                row = shape[0].length;

                for(var i = 0; i < col; i++) {
                    for(var j = 0; j < row; j++) {
                        obj.Context.fillStyle = obj.GetRandomColor(paramColor);
                        obj.Context.fillRect(shape[i][j].x, shape[i][j].y, shape[i][j].w, shape[i][j].h);
                    }
                }
                break;
            case ShapeType.ROUND_GRID:
                shape = obj.CreateSquareGrid(paramWidth, paramHeight, 0);
                col = shape.length;
                row = shape[0].length;

                for(var i = 0; i < col; i++) {
                    for(var j = 0; j < row; j++) {
                        obj.Context.fillStyle = obj.GetRandomColor(paramColor);
                        obj.Context.beginPath();
                        obj.Context.arc((shape[i][j].x + shape[i][j].w) - shape[i][j].w / 2, (shape[i][j].y + shape[i][j].w) - shape[i][j].w / 2, shape[i][j].w / 2, 0, Math.PI * 2, true);
                        obj.Context.closePath();
                        obj.Context.fill();
                    }
                }
                break;
        }
    };
    obj.Save = function() {
        window.open(obj.Canvas.toDataURL('image/png'));
    };
    obj.Resize = function() {
        obj.Canvas.height = obj.Height;
        obj.Canvas.width = obj.Width;
        obj.Reset();
    };
    obj.Reset = function() {
        obj.Context.clearRect(0, 0, obj.Width, obj.Height);
    };

    return obj;
})();

var Initializer = (function() {
    var obj = {};
    var mana = Mana;

    obj.Configuration = (function() {
        var objConf = {};
        var defaultConf = {};

        objConf.ShapeType = ShapeType.GRID;
        objConf.ColorType = ColorType.BC;
        objConf.ShapeWidth = 10;
        objConf.ShapeHeight = 10;
        objConf.Width = window.innerWidth;
        objConf.Height = window.innerHeight;
        objConf.DeviceType = DeviceType.IPHONE;
        objConf.RenderMana = function() {
            mana.Resize();
            mana.Width = objConf.Width;
            mana.Height = objConf.Height;
            mana.Draw(objConf.ShapeType, objConf.ColorType, objConf.ShapeWidth, objConf.ShapeHeight);
        };
        objConf.SaveMana = function() {
            mana.Save();
        };

        return objConf;
    })();
    obj.InitDatGUI = function(config) {
        var gui = new dat.GUI();
        var shapeSizeFolder = gui.addFolder("Shape Size");
        var renderSizeFolder = gui.addFolder("Render Size");
        var shapeWidthController = shapeSizeFolder.add(config, "ShapeWidth").name("Shape Width").min(1).max(MaxScreenSize.Width);
        var shapeHeightController = shapeSizeFolder.add(config, "ShapeHeight").name("Shape Height").min(1).max(MaxScreenSize.Height);
        var appleScreenFolder = renderSizeFolder.addFolder("Apple Devices");
        var androidScreenFolder = renderSizeFolder.addFolder("Android Devices");
        var customScreenFolder = renderSizeFolder.addFolder("Custom Screen");
        var appleScreenController = appleScreenFolder
            .add(config, "DeviceType",
                {
                    "Iphone": DeviceType.IPHONE,
                    "Iphone Retina Display": DeviceType.IPHONE_RETINA,
                    "Ipad": DeviceType.IPAD
                }).name("Apple Screen size");
        var androidScreenController = androidScreenFolder
            .add(config, "DeviceType",
                {
                    "QVGA (240x320)": DeviceType.ANDROID_240_320,
                    "(480x640)": DeviceType.ANDROID_480_640,
                    "WQVGA400 (240x400)": DeviceType.ANDROID_LDPI_240_400,
                    "WQVGA432 (240x432)": DeviceType.ANDROID_LDPI_240_432,
                    "HVGA (320x480)": DeviceType.ANDROID_320_480,
                    "WVGA800 (480x800)": DeviceType.ANDROID_480_800,
                    "WVGA854 (480x854)": DeviceType.ANDROID_480_854,
                    "(600x1024)": DeviceType.ANDROID_600_1024,
                    "(1024x600)": DeviceType.ANDROID_1024_600,
                    "(1024x768)": DeviceType.ANDROID_1024_768,
                    "(1280x768)": DeviceType.ANDROID_1280_768,
                    "WXGA (1280x800)": DeviceType.ANDROID_1280_800,
                    "(1536x1152)": DeviceType.ANDROID_1536_1152,
                    "(1920x1152)": DeviceType.ANDROID_1920_1152,
                    "(1920x1200)": DeviceType.ANDROID_1920_1200
                }).name("Android Screen size");
        var renderWidthController = customScreenFolder.add(config, "Width").name("Custom width").min(MinScreenSize.Width).max(MaxScreenSize.Width);
        var renderHeightController = customScreenFolder.add(config, "Height").name("Custom height").min(MinScreenSize.Height).max(MaxScreenSize.Height);
        var shapeController = gui
            .add(config, "ShapeType",
                {
                    "Horizontal Bar": ShapeType.HORIZONTAL,
                    "Vertical Bar": ShapeType.VERTICAL,
                    "Pixel Grid": ShapeType.GRID,
                    "Round Pixel Grid": ShapeType.ROUND_GRID
                }).name("Shape");
        var colorController = gui
            .add(config, "ColorType",
                {
                    "Black and White": ColorType.BW,
                    "Gray": ColorType.GRAY,
                    "CMYK": ColorType.CMYK,
                    "RGB": ColorType.RGB,
                    "Bright Colorful": ColorType.BC,
                    "Hakim Particle": ColorType.HP,
                    "Google IO 2010 theme": ColorType.GOOGLEIO2010,
                    "All Colors": ColorType.ALL
                }).name("Color");
        gui.add(config, "RenderMana").name("Render Shape");
        gui.add(config, "SaveMana").name("Save Image");

        appleScreenController.onFinishChange(function(value) {
            var size = mana.GetScreenSize(value);
            renderWidthController.setValue(size.w);
            renderHeightController.setValue(size.h);
        });
        androidScreenController.onFinishChange(function(value) {
            var size = mana.GetScreenSize(value);
            renderWidthController.setValue(size.w);
            renderHeightController.setValue(size.h);
        });
    };
    obj.Init = function() {
        var config = obj.Configuration;
        document.body.appendChild(mana.Canvas);
        window.addEventListener("resize", function () { config.RenderMana(); }, false);
        obj.InitDatGUI(config);

        config.RenderMana();
    };

    return obj;
})();