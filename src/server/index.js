var express = require('express');
var assets = require('./assets.json');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/../../public'));

app.get('/',  function (req, res) {
  res.render('index', { title: 'Blackstar', assets: assets.main});
});

module.exports = app;