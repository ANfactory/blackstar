require('./style.css');
var Star = require('./star/star');

var DURATION = 1000;
var VIEWPORT_SIZE = 2000;

var MAIN_RADIUS = 800;
var MAIN_X = VIEWPORT_SIZE / 2;
var MAIN_Y = VIEWPORT_SIZE / 2;

var SMALL_RADIUS = MAIN_RADIUS / 10;
var SMALL_Y = MAIN_Y + MAIN_RADIUS;
var SMALL_BASE_X = MAIN_X - SMALL_RADIUS * 5;

$(document).ready(function () {
  var svg = Snap('.blackstar').attr({viewBox: [0, 0, VIEWPORT_SIZE, VIEWPORT_SIZE].join(' ')});
  var fill = svg.gradient('L(0, 0, 0, ' + VIEWPORT_SIZE + ')hsl(180,10,15)-hsl(240,5,10)');

  var mainConfig = {centerX: MAIN_X, centerY: MAIN_Y, radius: MAIN_RADIUS, fill: fill};
  var mainStar = new Star(svg.polygon(), mainConfig, [5]);

  var smallConfig = {centerY: SMALL_Y, radius: SMALL_RADIUS, fill: fill};
  var smallSeed = [2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 3, 4, 4, 5, 5, 5];
  var smallStartAt = [[0, 2], [0, 1, 2, 3, 4], [1, 3, 4], [1, 2, 4], [0, 2, 3], [0, 1, 2]];
  var smalls = smallStartAt.map(function (openedBranchs, i) {
    var config = _.merge({}, smallConfig, {centerX: SMALL_BASE_X + SMALL_RADIUS * 2 * i});
    return new Star(svg.polygon(), config, smallSeed, openedBranchs);
  });

  setInterval(function () {
    //mainStar.randomize(DURATION / 5 * 3, mina.easeout);
    smalls.forEach(function (star, i) {
      star.randomize(DURATION / 2, mina.easeout, DURATION / 6 * i);
    });
  }, DURATION);
});
