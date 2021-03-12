const shell = require('shelljs');
const path = require('path');
const fs = require('fs');

const publishDir = path.join(__dirname, './dist');

const strPackage = fs.readFileSync('./package.json', 'utf-8');
const cfgPackage = JSON.parse(strPackage);
delete cfgPackage.scripts.publish;
fs.writeFileSync(path.resolve(publishDir, 'package.json'), JSON.stringify(cfgPackage));

// shell.cd(publishDir);
// if (shell.exec('yarn publish').code !== 0) {
//     shell.echo('Error: Npm publish failed');
//     return;
// }

console.log('发布成功！！！');
