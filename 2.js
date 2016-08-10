/*
 * Simple parametrized types
 * Optional
 */

let { pkgs, pkgTypes, pkgTypesCount } = require('./pkgsInfo'),
    { Nothing, Just } = require('./optional'),
    { tryFunc } = require('./common');

console.log('getAddInfo1:');
tryFunc(pkgs, getAddInfo1);
console.log();
console.log('getAddInfo2:');
tryFunc(pkgs, getAddInfo2);
console.log();

/*
console.log('getAddInfo1:');
pkgs.forEach(pkg => console.log(getAddInfo1(pkg)));
console.log('getAddInfo2:');
pkgs.forEach(pkg => console.log(getAddInfo2(pkg)));
*/

function getAddInfo1(pkg) {
  var i = 0;
  while (i < pkgTypesCount && pkg[pkgTypes[i]] === undefined) i++;

  if (i < pkgTypesCount) {
    let pkgInfo = pkg[pkgTypes[i]];
    if (pkgInfo[1] !== undefined) {
      return pkgInfo[1];
    }
  }
  return null;
}

function getAddInfo2(pkg) {
  var i = 0;
  while (i < pkgTypesCount && pkg[pkgTypes[i]] === undefined) i++;

  if (i < pkgTypesCount) {
    let pkgInfo = pkg[pkgTypes[i]];
    if (pkgInfo[1]) {
      return new Just(pkgInfo[1]);
    }
  }
  return new Nothing();
}


