var util = require('util');
var Device = require('zetta-device');
var exec = require('child_process').exec;

var Speech = module.exports = function(availableVoices) {
  Device.call(this);
  this._availableVoices = availableVoices;
};
util.inherits(Speech, Device);

Speech.prototype.init = function(config) {
  config
    .state('silent')
    .type('text-to-speech')
    .name('Text to Speech')
    .when('silent', { allow: ['say']})
    .when('speaking', { allow: [] })
    .map('say', this.say, [
      { name: 'words', type: 'text'},
      { name: 'voice', type: 'radio', value: this._availableVoices},
      { name: 'rate', type: 'range', min: 90, max: 720, step: 1}
    ]);
};

Speech.prototype.say = function(words, voice, cb) {
  this.state = 'speaking';
  var self = this;

  var sayCommand = 'say ';
  if (voice) {
    sayCommand += '-v ' + voice + ' ';
  }
  sayCommand += '"' + words + '"';
  exec(sayCommand, function (error, stdout, stderr) {
    self.state = 'silent';
    console.log('stdout: ' + stdout);
    console.log('stderr: ' + stderr);
    if (error !== null) {
      console.log('exec error: ' + error);
      cb(error);
    } else {
      cb();
    }
  });
};
