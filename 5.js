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

//----------------------------------------
/*
 * Exercise
 *
 * Story line for semigods.
 * If your mother or your father is god then write Promise without Promises.
 * P.S. And without promises about your writing Promise without Promises.
 *   1. Must be resolve function that takes value and returns promise.
 *   2. Must be `then` function that apply first argument to result of promise calculated it or not.
 */
