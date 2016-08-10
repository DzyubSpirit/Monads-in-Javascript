/*
 * Simple optional binding
 * See nice girl - take nice girl
 *
 */

let { pkgs, pkgTypes, pkgTypesCount } = require('./pkgsInfo'),
    { Nothing, Just } = require('./optional'),
    { tryFunc } = require('./common');

function getAddInfo(pkg) {
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

let OptMonoid = {
  mempty: new Nothing(),
  mappend: function(val1, val2) {
    if (val1 instanceof Nothing) {
      return val2;
    } else {
      return val1;
    }
  },
  mconcat: function(vals) {
    return vals.reduce(OptMonoid.mappend, OptMonoid.mempty);
  }
};

function getAddInfo2(pkg) {
  let fieldnames = pkgTypes.map(pkgType => getField(pkgType, pkg)),
      fieldname = OptMonoid.mconcat(fieldnames);

  return fieldname.bindM(getField.bind(null, '1'));
}

function getField(fieldname, obj) {
  return fieldname in obj ? new Just(obj[fieldname]) : new Nothing();
}

console.log('getAddInfo');
tryFunc(pkgs, getAddInfo);
console.log();
console.log('getAddInfo2');
tryFunc(pkgs, getAddInfo2);
console.log();

//-----------------------------------------
// Exercises: 
//
// First story line:
//   Bind list monad in other way:
//   1. Must be applyM method that takes 
//      func(takes value and returns array of values) as argument and
//      applies this func to every element of array and
//      takes from first array first element, second array - second element and so on.
//   2. Create any func that takes value and returns array of values 
//      and test it with new binding.
// Second story line:
//   Create monoid for Either monad.
//   1. Must be mempty that returns (Left "Epic fail")
//   2. Must be mappend that returns first argument if it is Right else returns second if it is Right else returns Left with concatenanted messages of two Lefts. 
//   3. Must be mconcat that returns Right if anyone is Right and concatenated errors otherwise.
