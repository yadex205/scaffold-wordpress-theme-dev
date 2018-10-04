const { promisify } = require('util');
const { basename, relative, resolve } = require('path');

const ejs = require('ejs');
const glob = require('glob');
const replaceExt = require('replace-ext');
const writeFile = require('write');

task('build', ['build:php']);

namespace('build', () => {
  task('php', { async: true }, async () => {
    for (let src of await promisify(glob)('./src/**/!(_)*.php.ejs')) {
      const dest = resolve('./dist', relative('./src', replaceExt(src, '')));
      const result = await ejs.renderFile(src, {}, { async: true });

      await writeFile(dest, result.toString());
    }
  });
});
