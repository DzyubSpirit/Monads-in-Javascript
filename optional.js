function Nothing() {}

function Just(value) {
  this.value = value;
}

Nothing.prototype.bindM = function(_) { return this; }

Just.prototype.bindM = function (func) { return func(this.value); } 

module.exports = { Nothing, Just };
