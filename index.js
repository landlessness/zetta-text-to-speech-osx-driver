var Device = require('zetta-device');
var util = require('util');
var exec = require('child_process').exec;

var Speech = module.exports = function() {
  Device.call(this);
};
util.inherits(Speech, Device);

Speech.prototype.init = function(config) {
  config
    .state('quiet')
    .type('speech')
    .name('Speech')
    .when('quiet', { allow: ['say']})
    .when('speaking', { allow: [] })
    .map('say', this.say, [
      { name: 'words', type: 'text'},
      { name: 'voice', type: 'text'}
    ]);
};

Speech.prototype.say = function(words, voice, cb) {
  this.state = 'speaking';
  var self = this;

  var sayCommand = 'say ';
  console.log(typeof voice);
  if (voice) {
    sayCommand += '-v ' + voice + ' ';
  }
  sayCommand += '"' + words + '"';
  exec(sayCommand,   function (error, stdout, stderr) {
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
    }
    self.state = 'quiet';
    cb();
  });
};
