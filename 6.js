/*
 * Simple haskell do-notation in javascript
 * With blackgens and yieldches
 *
 */

let { Nothing, Just, doM } = require('./optional');

let result = new Just(5).bindM(value =>
                 new Just(6).bindM(value2 =>
                      new Just(value + value2)));
console.log('Result:');
console.log(result);

//-----------------------------------------

let result2 = new Just(5).bindM(addSixM);
console.log('Result2:');
console.log(result2);

function addSixM(val) {
  return new Just(6).bindM(addM.bind(null, val));
}

function addM(val1, val2) {
  return new Just(val1 + val2);
}

//-----------------------------------------

let result3 = doM(function*() {
    var value = yield new Just(5);
    var value2 = yield new Just(6);
    return new Just(value + value2);
}());

console.log('Result3:');
console.log(result3);
