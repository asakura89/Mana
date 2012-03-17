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
 */

var canvas;
var context;
var w;
var h;

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

var shape = function() {
	this.type = 'grid';
	this.color = 'bright_colorful';
	this.width = 10;
	this.height = 10;
	this.render = function() {
		resize();
		draw(this.type, this.color);
	};
};


function init()
{
	var gui = new dat.GUI();
	var params = new shape();
	var shapeController = gui.add(params, 'type',
								  { 'Horizontal Bar': 'horizontal',
								  	'Vertical Bar': 'vertical',
								  	'Pixel Grid': 'grid'
								  }).name('Shape');
	var colorController = gui.add(params, 'color',
								  { 'Black and White': 'black_white',
								  	'Gray': 'gray',
								  	'CMYK': 'cmyk',
								  	'RGB': 'rgb',
								  	'Bright Colorful': 'bright_colorful',
								  	'Hakim Particle': 'hakim_particle',
								  	'All Colors': 'all'
								  }).name('Color');
	gui.add(params, 'render').name('Render Shape');

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

function draw(paramType, paramColor)
{
	var shape;

	switch(paramType)
	{
		case 'horizontal':
			shape = createHorizontalBar(10, 0);
			var row = shape.length;

			for (var i = 0; i < row; i++) {
				context.fillStyle = getColor(paramColor);
				context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
			}
			break;
		case 'vertical':
			shape = createVerticalBar(10, 0);
			var col = shape.length;

			for (var i = 0; i < col; i++) {
				context.fillStyle = getColor(paramColor);
				context.fillRect(shape[i].x, shape[i].y, shape[i].w, shape[i].h);
			}
			break;
		case 'grid':
			shape = createSquareGrid(10, 10, 0);
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
	}
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
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;

	reset();
}

function reset()
{
	context.clearRect(0,0,w,h);
}

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