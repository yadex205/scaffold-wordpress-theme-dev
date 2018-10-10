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
    const sources = await promisify(glob)('./src/**/!(_)*.php.ejs');
    for (let src of sources) {
      try {
        const dest = resolve('./dist', relative('./src', replaceExt(src, '')));
        const result = await ejs.renderFile(src, {}, { async: true, cache: true });
        await writeFile(dest, result.toString());
        jake.logger.log(`[build:php] ${src} => ${dest}`)
      } catch (error) {
        jake.logger.error(error.toString());
      }
    }
  });

  task('css', { async: true }, async () => {
    const sources = await promisify(glob)('./src/**/!(_)*.{sass,scss}');
    for (let src of sources) {
      try {
        const dest = resolve('./dist', relative('./src', replaceExt(src, '.css')));
        const result = await promisify(sass.render).bind(sass)({
          file: src,
          importer: sassGlobImporter()
        });

        await writeFile(dest, result.css.toString())
        jake.logger.log(`[build:css] ${src} => ${dest}`)
      } catch (error) {
        jake.logger.error(error.toString());
      }
    }
  });
});
