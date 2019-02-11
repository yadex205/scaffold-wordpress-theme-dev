const resolve = require('path').resolve;
const unlinkSync = require('fs').unlinkSync;
const spawnSync = require('child_process').spawnSync;

const repoUrl = 'https://github.com/yadex205/scaffold-wordpress-theme-dev.git';
const target = resolve(process.env.PROJECT_NAME || 'my-theme-dev');

function run(command, args = [], options = {}) {
  options = Object.assign({}, { stdio: 'inherit' }, options);
  return spawnSync(command, args, options);
}

run('git', ['clone' , '--depth', '1', repoUrl, target]);

switch(process.platform) {
case 'win32':
  run('rd', ['/s', '/q', resolve(target, '.git')]);
  break;
default:
  run('rm', ['-rf', resolve(target, '.git')]);
  break;
}
unlinkSync(resolve(target, 'go'));

try {
  run('yarn', ['install'], { cwd: target });
} catch (error) {
  run('npm', ['install'], { cwd: target });
}
