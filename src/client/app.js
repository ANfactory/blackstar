require('./style.css');

var Branch = require('./star/branch');

function createStar(branchNb) {
  return _.range(branchNb)
    .map(function (i) {
      return new Branch(i);
    });
}

function calculateStarPoints(centerX, centerY, branchs, radius) {
  var results = [];
  var angle = Math.PI / branchs.length;
  var phi = (1 + Math.sqrt(5)) / 2;
  var innerRadius = radius / (1 + phi);

  for (var i = 0; i < 2 * branchs.length; i++) {
    var branch = branchs[Math.floor(i / 2)];
    var r = (i & 1) == 0 && branch.isOpen()
      ? radius
      : ((i & 1) == 0 ? innerRadius / (phi * .7652) : innerRadius);

    results.push(centerX + Math.cos(i * angle - Math.PI / 2) * r);
    results.push(centerY + Math.sin(i * angle - Math.PI / 2) * r);
  }

  return results;
}

function pickSecondBranchIndex(index, length) {
  var next = index + (Math.random() > .5 ? 2 : -2);
  return next < length ? (next < 0 ? next + length : next) : next - length;
}

var pickBranch = function (config) {
  config = config || [1, 2, 3, 4, 5];
  var toOpen = _.sample(config);
  var openIndexes = [];
  if (toOpen === 2) {
    var first = _.sample([0, 1, 2, 3, 4]);
    openIndexes.push(first);
    openIndexes.push(pickSecondBranchIndex(first, 5));
  } else {
    openIndexes = _.sample([0, 1, 2, 3, 4], toOpen);
  }
  return openIndexes;
};

$(document).ready(function () {
  var SIZE = 1000;
  var VIEWBOX_SIZE = SIZE * 1.1;
  var COLOR = '#181818';
  var DURATION = 1400;

  var pickBranchConfig = [2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 5, 5];
  var branchs = createStar(5);
  var branchsToOpen = [];

  var svg = Snap('.blackstar');
  var starPolygon = svg.polygon();
  var g = svg.gradient('L(0, 0, 0, ' + VIEWBOX_SIZE + ')#383838-' + COLOR);

  svg.attr({viewBox: [0, 0, VIEWBOX_SIZE, VIEWBOX_SIZE].join(' ')});
  starPolygon.attr({
    points: calculateStarPoints(VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2, branchs, SIZE / 2),
    fill: g
  });

  console.log('Blackstar initialized');

  setInterval(function () {
    var newBranchsToOpen = pickBranch(pickBranchConfig);
    while (_.eq(newBranchsToOpen.sort(), branchsToOpen.sort())) {
      newBranchsToOpen = pickBranch(pickBranchConfig);
    }

    branchsToOpen = newBranchsToOpen;

    console.log('branch to open: ', branchsToOpen);

    branchs = branchs.map(function (branch) {
      branch.close();
      if (_.includes(branchsToOpen, branch.index)) {
        branch.open();
      }
      return branch;
    });

    starPolygon.animate({
      points: calculateStarPoints(VIEWBOX_SIZE / 2, VIEWBOX_SIZE / 2, branchs, SIZE / 2)
    }, DURATION / 5 * 3, mina.easeout);
  }, DURATION);
});
