var zetta = require('zetta');
var Speech = require('../index');

zetta()
  .use(Speech)
  .listen(1337);
