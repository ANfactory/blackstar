var Branch = require('./branch');

var defaultConfig = {
  centerX: 0,
  centerY: 0,
  radius: 100,
  fill: '#181818'
};

function Star(polygon, config, seed, openedBranchs) {
  this.polygon = polygon;
  this.config = _.merge({}, defaultConfig, config);
  this.seed = seed || _.range(1, 6);
  this.openedBranchs = openedBranchs || _.range(5);
  this.branchs = _.range(5).map(function (i) {
    return new Branch(i);
  });

  this.init();
}

Star.prototype.init = function () {
  this.openBranchs();
  this.polygon.attr({points: this.getNewPoints(), fill: this.config.fill});
};

Star.prototype.randomize = function (duration, easing, delay) {
  this.randomizeBranchs();
  this.openBranchs();
  var points = this.getNewPoints();
  if (duration) {
    setTimeout(_.bind(function () {
      this.polygon.animate({points: points}, duration, easing || mina.easeout);
    }, this), delay || 0);
  } else {
    this.polygon.attr({points: points});
  }
};

Star.prototype.randomizeBranchs = function () {
  var last = _.clone(this.openedBranchs);
  console.log(last, this.openedBranchs, _.isEqual(last, this.openedBranchs));
  while (_.isEqual(last, this.openedBranchs)) {
    this.openedBranchs = this.pickBranch().sort();
  }
  console.log('from: ', last, 'to: ', this.openedBranchs);
};

Star.prototype.openBranchs = function () {
  this.branchs = this.branchs.map(_.bind(function (branch) {
    branch.setState(_.includes(this.openedBranchs, branch.index));
    return branch;
  }, this));
};

Star.prototype.getNewPoints = function () {
  var results = [];
  var angle = Math.PI / this.branchs.length;
  var phi = (1 + Math.sqrt(5)) / 2;
  var innerRadius = this.config.radius / (1 + phi);

  for (var i = 0; i < 2 * this.branchs.length; i++) {
    var branch = this.branchs[Math.floor(i / 2)];
    var r = (i & 1) == 0 && branch.isOpen() ? this.config.radius
      : ((i & 1) == 0 ? innerRadius / (phi * .7652) : innerRadius);

    results.push(this.config.centerX + Math.cos(i * angle - Math.PI / 2) * r);
    results.push(this.config.centerY + Math.sin(i * angle - Math.PI / 2) * r);
  }

  return results;
};

Star.prototype.pickBranch = function () {
  var toOpen = _.sample(this.seed);
  var openIndexes = [];
  if (toOpen === 2) {
    var first = _.sample(_.range(5));
    openIndexes.push(first);
    openIndexes.push(this.pickSecondBranchIndex(first, 5));
  } else {
    openIndexes = _.sampleSize(_.range(5), toOpen);
  }
  return openIndexes;
};

Star.prototype.pickSecondBranchIndex = function (index, length) {
  var next = index + (Math.random() > .5 ? 2 : -2);
  return next < length ? (next < 0 ? next + length : next) : next - length;
};

module.exports = Star;
