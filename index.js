'use strict';
const chalk = require('chalk');
const Jimp = require('@sindresorhus/jimp');

const PIXEL = '\u2584';

async function render(buffer, width, height) {
	const image = await Jimp.read(buffer);
	const columns = width || process.stdout.columns || 80;
	const rows = height || process.stdout.rows || 24;

	image.resize(columns, rows);

	let ret = '';
	for (let y = 0; y < image.bitmap.height; y++) {
		for (let x = 0; x < image.bitmap.width; x++) {
			const {
				r,
				g,
				b,
				a
			} = Jimp.intToRGBA(image.getPixelColor(x, y));

			if (a === 0) {
				ret += chalk.reset(' ');
			} else {
				ret += chalk.bgRgb(r, g, b).rgb(r, g, b)(PIXEL);
			}
		}

		ret += '\n';
	}

	return ret;
}

exports.buffer = render;
