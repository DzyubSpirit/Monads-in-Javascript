function tryFunc(pkgs, getInfo) {
  pkgs.forEach(pkg => console.log(getInfo(pkg)));
}

module.exports = { tryFunc };
