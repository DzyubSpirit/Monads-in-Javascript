/*
 * Simple promises
 * Simple as (a + b)
 *
 */

var result = Promise.resolve(5).then(function(value) {
  return Promise.resolve(6).then(function(value2) {
    return value + value2;
  });
});

result.then(function(value) {
  console.log(value);
});
