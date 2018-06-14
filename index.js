'use strict';
const chalk = require('chalk');
const Jimp = require('@sindresorhus/jimp');

const PIXEL = '\u2584';

async function render(buffer, width, height) {
	const image = await Jimp.read(buffer);
	const columns = width || process.stdout.columns || 80;
	const rows = height || process.stdout.rows || 24;

	if (image.bitmap.width > columns || (image.bitmap.height / 2) > rows) {
		image.scaleToFit(columns, rows * 2);
	}

	let ret = '';
	for (let y = 0; y < image.bitmap.height - 1; y += 2) {
		for (let x = 0; x < image.bitmap.width; x++) {
			const {
				r,
				g,
				b,
				a
			} = Jimp.intToRGBA(image.getPixelColor(x, y));
			const {
				r: r2,
				g: g2,
				b: b2
			} = Jimp.intToRGBA(image.getPixelColor(x, y + 1));

			if (a === 0) {
				ret += chalk.reset(' ');
			} else {
				ret += chalk.bgRgb(r, g, b).rgb(r2, g2, b2)(PIXEL);
			}
		}

		ret += '\n';
	}

	return ret;
}

exports.buffer = render;
