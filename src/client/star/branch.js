function Branch(index) {
  this.index = index;
  this.openState = true;
}

Branch.prototype.open = function () {
  this.openState = true;
};
Branch.prototype.close = function () {
  this.openState = false;
};
Branch.prototype.isOpen = function () {
  return this.openState;
};

module.exports = Branch;