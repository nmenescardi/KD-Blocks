/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

import './kd-accordion/index.js';
//import './kd-container/index.js';
import './kd-container-bg/index.js';
import icons from './icons/kd-logo';
//import './kd-two-columns/index.js';

(function() {
	var el = wp.element.createElement;
	wp.blocks.updateCategory('kd-blocks', { icon: icons.logo });
})(icons);
