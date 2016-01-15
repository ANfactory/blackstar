function Branch(index) {
  this.index = index;
  this.openState = true;
}
Branch.prototype.setState = function (state) {
  this.openState = state;
};

Branch.prototype.isOpen = function () {
  return this.openState;
};

module.exports = Branch;