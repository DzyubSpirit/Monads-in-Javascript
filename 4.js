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
