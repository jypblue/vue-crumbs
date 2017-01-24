/**
 * 
 * @authors zx.wang (zx.wang1991@gmail.com)
 * @date    2017-01-23 23:52:38
 * @version $Id$
 */

const fs = require('fs');
const rollup = require('rollup');
const uglify = require('uglify-js');
const babel = require('rollup-plugin-babel');
const package = require('../package.json');

const banner =
	"/*!\n" +
	" * vue-crumbs v" + package.version + "\n" +
	" * https://github.com/jypblue/vue-crumbs\n" +
	" * Released under the MIT License. \n" +
	" */\n";

rollup.rollup({
	entry: 'src/index.js',
	plugins: [
		babel({
			presets: 'es2015-loose-rollup'
		})
	]
}).then(function(bundle) {
	return write('dist/vue-crumbs.js', bundle.generate({
		format: 'umd',
		banner: banner,
		moduleName: 'VueCrumbs'
	}).code, bundle);
}).then(function(bundle) {

})