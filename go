const resolve = require('path').resolve;
const spawnSync = require('child_process').spawnSync;

const repoUrl = 'https://github.com/yadex205/scaffold-wordpress-theme-dev.git';
const target = resolve(process.env.PROJECT_NAME || 'my-theme-dev');

spawnSync('git', ['clone' , repoUrl, target], { stdio: 'inherit' });

try {
  spawnSync('yarn', ['install'], { stdio: 'inherit', cwd: target });
} catch (error) {
  spawnSync('npm', ['install'], { stdio: 'inherit', cwd: target });
}
