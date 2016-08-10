/*
 * Simple optional binding
 * NaN-like behavior
 *
 */

let { pkgs, pkgTypes, pkgTypesCount } = require('./pkgsInfo'),
    { Nothing, Just } = require('./optional'),
    { tryFunc } = require('./common');

tryFunc(pkgs, obj => getByPath(obj, 'error.1'));

function getByPath(obj, path) {
  let fieldnames = path.split('.'),
      funcs = fieldnames.map(fieldname => getField.bind(null, fieldname));

  return funcs.reduce((acc, cur) => acc.bindM(cur), new Just(obj));

}

