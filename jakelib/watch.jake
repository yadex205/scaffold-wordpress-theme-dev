const chokidar = require('chokidar');

task('watch', { async: true }, () => {
  jake.Task['watch:php'].invoke();
  jake.Task['watch:css'].invoke();
});

namespace('watch', () => {
  task('php', { async: true }, () => {
    chokidar.watch('./src/**/*.php.ejs', { ignoreInitial: true }).on('all', () => {
      jake.Task['build:php'].reenable();
      jake.Task['build:php'].invoke();
    });

    jake.logger.log('[watch:php] start');
  });

  task('css', { async: true }, () => {
    chokidar.watch('./src/**/*.{sass,scss}', { ignoreInitial: true }).on('all', () => {
      jake.Task['build:css'].reenable();
      jake.Task['build:css'].invoke();
    });

    jake.logger.log('[watch:css] start');
  });
});
