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

//-----------------------------------------
// Exercises: 
//
// First story line:
//   Create list monad:
//   1. Must be a constructor that takes value and 
//      returns one-element array with this value.
// Second story line:
//   Create Either monad. (Either a b) can be (Left a) or (Right b) 
//   like (Optional a) can be Nothing or (Just a):
//   1. Must have Left and Right constructors.
