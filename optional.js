function Nothing() {}

function Just(value) {
  this.value = value;
}

Nothing.prototype.bindM = function(_) { return this; }

Just.prototype.bindM = function (func) { return func(this.value); } 

function doM(gen) {
  function step(value) {
    var result = gen.next(value);
    if (result.done) {
      return result.value;
    }
    return result.value.bindM(step);
  }
  return step();
}

module.exports = { Nothing, Just, doM};
