const { promisify } = require('util');
const { basename, relative, resolve } = require('path');

const ejs = require('ejs');
const fse = require('fs-extra');
const glob = require('glob');
const replaceExt = require('replace-ext');
const sass = require('node-sass');
const sassGlobImporter = require('node-sass-glob-importer');
const writeFile = require('write');

task('build', ['build:php', 'build:css']);

namespace('build', () => {
  task('php', { async: true }, async () => {
    for (let src of await promisify(glob)('./src/**/!(_)*.{php.ejs,php}')) {
      if (src.endsWith('.php.ejs')) {
        const dest = resolve('./dist', relative('./src', replaceExt(src, '')));
        const result = await ejs.renderFile(src, {}, { async: true });

        await writeFile(dest, result.toString());
      } else {
        const dest = resolve('./dist', relative('./src', src));
        await fse.copy(src, dest);
      }
    }
  });

  task('css', { async: true }, async () => {
    for (let src of await promisify(glob)('./src/**/!(_)*.{sass,scss}')) {
      const dest = resolve('./dist', relative('./src', replaceExt(src, '.css')));
      const result = await promisify(sass.render).bind(sass)({
        file: src,
        importer: sassGlobImporter()
      });

      await writeFile(dest, result.css.toString());
    }
  });
});
