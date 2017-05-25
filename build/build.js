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
    entry: 'src/main.js',
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
    return write('dist/vue-crumbs.min.js', banner + '\n' + uglify.minify('dist/vue-crumbs.js').code, bundle);
  })
  .then(function(bundle) {
    return write('dist/vue-crumbs.es2015.js', bundle.generate({
      banner: banner
    }).code, bundle);
  })
  .then(function(bundle) {
    return write('dist/vue-crumbs.common.js', bundle.generate({
      format: 'cjs',
      banner: banner
    }).code, bundle);
  })
  .catch(logError);

function write(dest, code, bundle) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(dest, code, function(err) {
      if (err) return reject(err);
      console.log(blue(dest) + ' ' + getSize(code));
      resolve(bundle);
    });
  });
}

function getSize(code) {
  return (code.length / 1024).toFixed(2) + 'kb';
}

function logError(e) {
  console.log(e);
}

function blue(str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m';
}