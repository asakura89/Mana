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
 */

var canvas;
var context;
var w;
var h;

var renderWidth = window.innerWidth;
var renderHeight = window.innerHeight;

var black_white = ['#000000', '#ffffff'];
var cmyk = ['#00ffff', '#ff00ff', '#ffff00', '#000000'];
var rgb = ['#cc0000', '#00cc00', '#0000cc'];
var gray = ['#000000', '#080808', '#101010', '#181818',
			'#202020', '#282828', '#303030', '#383838',
			'#404040', '#484848', '#505050', '#585858',
			'#606060', '#686868', '#707070', '#787878',
			'#808080', '#888888', '#909090', '#989898',
			'#a0a0a0', '#a8a8a8', '#b0b0b0', '#b8b8b8',
			'#c0c0c0', '#d0d0d0', '#d8d8d8', '#e0e0e0',
			'#e8e8e8', '#f0f0f0', '#f8f8f8', '#ffffff'];
var bright_colorful = ['#f0f0ef', '#fbfaf9', '#8ecb00', '#8ac900',
					   '#3e3e3e', '#46c7ec', '#58d5f1', '#ffae00',
					   '#dc0967', '#e40b7c'];
var hakim_particle = ['#000000', '#ff0000', '#ffff00'];
var google_io_2010 = ['#0068b3', '#f9aa89', '#e51937', '#c41230',
					  '#ffd24f', '#f0b310', '#1ab7ea', '#005581',
					  '#00704a', '#00a950', '#b3d88c'];

var shape = function() {
	this.type = 'grid';
	this.color = 'bright_colorful';
	this.width = 10;
	this.height = 10;
	this.renderWidth = renderWidth;
	this.renderHeight = renderHeight;
	this.appleScreen = 'iphone_retina';
	this.androidScreen = 'android_'
	this.render = function() {
		resize();
		draw(this.type, this.color, this.width, this.height);
	};
	this.save = function() {
		save();
	};
};


function init()
{
	var gui = new dat.GUI();
	var params = new shape();
	var shapeSizeFolder = gui.addFolder('Shape size');
	var renderSizeFolder = gui.addFolder('Render Size');
	var widthController = shapeSizeFolder.add(params, 'width').name('Shape width').min(1).max(window.innerWidth);
	var heightController = shapeSizeFolder.add(params, 'height').name('Shape height').min(1).max(window.innerHeight);
	var appleScreenFolder = renderSizeFolder.addFolder('Apple Devices');
	var androidScreenFolder = renderSizeFolder.addFolder('Android Devices');
	var customScreenFolder = renderSizeFolder.addFolder('Custom Screen');
	var appleScreenController = appleScreenFolder.add(params, 'appleScreen',
													  { 'Iphone': 'iphone',
													    'Iphone Retina Display': 'iphone_retina',
													    'Ipad': 'ipad'
													  }).name('Apple Screen size');
	var androidScreenController = androidScreenFolder.add(params, 'androidScreen',
													  { 'QVGA (240x320)': 'android_240_320',
														'(480x640)': 'android_480_640',
														'WQVGA400 (240x400)': 'android_ldpi_240_400',
														'WQVGA432 (240x432)': 'android_ldpi_240_432',
														'HVGA (320x480)': 'android_320_480',
														'WVGA800 (480x800)': 'android_480_800',
														'WVGA854 (480x854)': 'android_480_854',
														'(600x1024)': 'android_600_1024',
														'(1024x600)': 'android_1024_600',
														'(1024x768)': 'android_1024_768',
														'(1280x768)': 'android_1280_768',
														'WXGA (1280x800)': 'android_1280_800',
														'(1536x1152)': 'android_1536_1152',
														'(1920x1152)': 'android_1920_1152',
														'(1920x1200)': 'android_1920_1200'
													  }).name('Android Screen size');
	var renderWidthController = customScreenFolder.add(params, 'renderWidth').name('Custom width').min(320).max(window.innerWidth);
	var renderHeightController = customScreenFolder.add(params, 'renderHeight').name('Custom height').min(480).max(window.innerHeight);
	var shapeController = gui.add(params, 'type',
								  { 'Horizontal Bar': 'horizontal',
								  	'Vertical Bar': 'vertical',
								  	'Pixel Grid': 'grid',
								  	'Round Pixel Grid': 'round_grid'
								  }).name('Shape');
	var colorController = gui.add(params, 'color',
								  { 'Black and White': 'black_white',
								  	'Gray': 'gray',
								  	'CMYK': 'cmyk',
								  	'RGB': 'rgb',
								  	'Bright Colorful': 'bright_colorful',
								  	'Hakim Particle': 'hakim_particle',
								  	'Google IO 2010 theme': 'google_io_2010',
								  	'All Colors': 'all'
								  }).name('Color');
	gui.add(params, 'render').name('Render Shape');
	gui.add(params, 'save').name('Save Image');

	widthController.onChange(function(value) {
		widthController.width = value;
	});

	heightController.onChange(function(value) {
		heightController.width = value;
	});

	appleScreenController.onChange(screenSizeCalculate);
	androidScreenController.onChange(screenSizeCalculate);

	renderWidthController.onChange(function(value) {
		renderWidth = value;
	});

	renderHeightController.onChange(function(value) {
		renderHeight = value;
	});

	shapeController.onChange(function(value) {
		shapeController.type = value;
	});

	colorController.onChange(function(value) {
		colorController.color = value;
	});

	canvas = document.getElementById('myCanvas');
	context = canvas.getContext('2d');

	window.addEventListener('resize', function() { params.render(); }, false);

	params.render();
}

var screenSizeCalculate = function(value) {
	switch(value)
	{
		case 'iphone':
			renderWidth = 320;
			renderHeight = 480;
			break;
		case 'iphone_retina':
			renderWidth = 640;
			renderHeight = 960;
			break;
		case 'ipad':
			renderWidth = 768;
			renderHeight = 1024;
			break;
		case 'android_240_320':
			renderWidth = 240;
			renderHeight = 320;
			break;
		case 'android_480_640':
			renderWidth = 480;
			renderHeight = 640;
			break;
		case 'android_ldpi_240_400':
			renderWidth = 240;
			renderHeight = 400;
			break;
		case 'android_ldpi_240_432':
			renderWidth = 240;
			renderHeight = 432;
			break;
		case 'android_320_480':
			renderWidth = 320;
			renderHeight = 480;
			break;
		case 'android_480_800':
			renderWidth = 480;
			renderHeight = 800;
			break;
		case 'android_480_854':
			renderWidth = 480;
			renderHeight = 854;
			break;
		case 'android_600_1024':
			renderWidth = 600;
			renderHeight = 1024;
			break;
		case 'android_1024_600':
			renderWidth = 1024;
			renderHeight = 600;
			break;
		case 'android_1024_768':
			renderWidth = 1024;
			renderHeight = 768;
			break;
		case 'android_1280_768':
			renderWidth = 1280;
			renderHeight = 768;
			break;
		case 'android_1280_800':
			renderWidth = 1280;
			renderHeight = 800;
			break;
		case 'android_1536_1152':
			renderWidth = 1536;
			renderHeight = 1152;
			break;
		case 'android_1920_1152':
			renderWidth = 1920;
			renderHeight = 1152;
			break;
		case 'android_1920_1200':
			renderWidth = 1920;
			renderHeight = 1200;
			break;
	}
};

function draw(paramType, paramColor, paramWidth, paramHeight)
{
	var shape;

	switch(paramType)
	{
		case 'horizontal':
			shape = createHorizontalBar(paramHeight, 0);
			var row = shape.length;

			for (var i = 0; i < row; i++) {
				context.fillStyle = getColor(paramColor);
				context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
			}
			break;
		case 'vertical':
			shape = createVerticalBar(paramWidth, 0);
			var col = shape.length;

			for (var i = 0; i < col; i++) {
				context.fillStyle = getColor(paramColor);
				context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
			}
			break;
		case 'grid':
			shape = createSquareGrid(paramWidth, paramHeight, 0);
			var col = shape.length;
			var row = shape[0].element.length;

			for (var i = 0; i < col; i++) {
				for (var j = 0; j < row; j++) {
					context.fillStyle = getColor(paramColor);
					context.fillRect(shape[i].element[j].x, shape[i].element[j].y,
									 shape[i].element[j].w, shape[i].element[j].h);
				}
			}
			break;
		case 'round_grid':
			shape = createSquareGrid(paramWidth, paramHeight, 0);
			var col = shape.length;
			var row = shape[0].element.length;

			for (var i = 0; i < col; i++) {
				for (var j = 0; j < row; j++) {
					context.fillStyle = getColor(paramColor);
					context.beginPath();
					context.arc((shape[i].element[j].x + shape[i].element[j].w)-shape[i].element[j].w/2, (shape[i].element[j].y  + shape[i].element[j].w)-shape[i].element[j].w/2, shape[i].element[j].w/2, 0, Math.PI*2, true);
					context.closePath();
					context.fill();
				}
			}
			break;
	}
}

function save()
{
	window.open(canvas.toDataURL('image/png'));
}

function getColor(paramColor)
{
	var arrlen;
	var color;

	switch(paramColor)
	{
		case 'black_white':
			arrlen = black_white.length;
			color = black_white[Math.round(Math.random()*arrlen)];
			break;
		case 'gray':
			arrlen = gray.length;
			color = gray[Math.round(Math.random()*arrlen)];
			break;
		case 'cmyk':
			arrlen = cmyk.length;
			color = cmyk[Math.round(Math.random()*arrlen)];
			break;
		case 'rgb':
			arrlen = rgb.length;
			color = rgb[Math.round(Math.random()*arrlen)];
			break;
		case 'bright_colorful':
			arrlen = bright_colorful.length;
			color = bright_colorful[Math.round(Math.random()*arrlen)];
			break;
		case 'hakim_particle':
			arrlen = hakim_particle.length;
			color = hakim_particle[Math.round(Math.random()*arrlen)];
			break;
		case 'google_io_2010':
			arrlen = google_io_2010.length;
			color = google_io_2010[Math.round(Math.random()*arrlen)];
			break;
		case 'all':
			color = 'rgba(' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ',' + Math.round(Math.random()*255) + ', 1)';
			break;
	}

	return color;
}

function createHorizontalBar(paramHeight, paramDistance)
{
	var gridRow = Math.round(h / paramHeight);
	var square2Create = new Array(gridRow);

	for (var i = 0; i < gridRow; i++) {
		var xy = computeCoordinate(0, i, paramDistance, w, paramHeight);
		square2Create[i] = {
			x: xy.x,
			y: xy.y,
			w: w,
			h: paramHeight
		};
	}

	return square2Create;
}

function createVerticalBar(paramWidth, paramDistance)
{
	var gridCol = Math.round(w / paramWidth);
	var square2Create = new Array(gridCol);

	for (var i = 0; i < gridCol; i++) {
		var xy = computeCoordinate(i, 0, paramDistance, paramWidth, h);
		square2Create[i] = {
			x: xy.x,
			y: xy.y,
			w: paramWidth,
			h: h
		};
	}

	return square2Create;
}

function createSquareGrid(paramWidth, paramHeight, paramDistance)
{
	var totalSpaceWidth = paramWidth + paramDistance;
	var totalSpaceHeight = paramHeight + paramDistance;
	var gridCol = Math.round(w / totalSpaceWidth);
	var gridRow = Math.round(h / totalSpaceHeight);
	var square2Create = [];

	for (var i = 0; i < gridCol; i++) {
		square2Create[i] = new Array2D();
		square2Create[i].setArray(gridRow);
		for (var j = 0; j < gridRow; j++) {
			var xy = computeCoordinate(i, j, paramDistance, paramWidth, paramHeight);
			square2Create[i].element[j] = {
				x: xy.x,
				y: xy.y,
				w: paramWidth,
				h: paramHeight
			};
		}
	}

	return square2Create;
}

function computeCoordinate(idxCol, idxRow, paramDistance, paramWidth, paramHeight)
{
	var retxy = {
		x: ((idxCol + 1) * paramDistance) + (idxCol * paramWidth),
		y: ((idxRow + 1) * paramDistance) + (idxRow * paramHeight)
	};

	return retxy;
}

function resize()
{
	w = canvas.width = renderWidth;
	h = canvas.height = renderHeight;

	reset();
}

function reset()
{
	context.clearRect(0,0,w,h);
}

// http://www.webdeveloper.com/forum/showthread.php?t=90849
function Array2D()
{
	function setArray(paramLength)
	{
		this.element = [];
		for (var i = 0; i < paramLength; i++) {
			this.element[i] = null;
		}
	}

	this.setArray = setArray;
	this.element = null;
}