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

  function getField(fieldname, obj) {
    return fieldname in obj ? new Just(obj[fieldname]) : new Nothing();
  }
}

//-----------------------------------------
// Exercises: 
//
// First story line:
//   Bind list monad:
//   1. Must be bindM method that takes 
//      func(takes value and returns array of values) as argument and
//      applies this func to every element of array and concat resulting arrays.
//   2. Create any func that takes value and returns array of values 
//      and test it with binding.
// Second story line:
//   Bind Either monad.
//   1. Must be bindM method that takes
//      func(takes value and returns Either) as argument and
//      applies it if Either is Right and leaves the same if is Left.
//   2. Create any func that takes value and returns Either value and 
//      test binding with it. Func must Left or Right depending on arguments.
