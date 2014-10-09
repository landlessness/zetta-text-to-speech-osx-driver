var zetta = require('zetta');
var Speech = require('../index');

var app = require('./app');

zetta()
  .use(Speech)
  .use(app)
  .listen(1337);
