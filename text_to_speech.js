var util = require('util');
var Device = require('zetta-device');
var exec = require('child_process').exec;

var TextToSpeech = module.exports = function(availableVoices) {
  Device.call(this);
  this._availableVoices = availableVoices;
};
util.inherits(TextToSpeech, Device);

TextToSpeech.prototype.init = function(config) {
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

// TODO: figure out object marshalling for voice
TextToSpeech.prototype.say = function(words, voice, rate, cb) {
  this.state = 'speaking';
  var self = this;

  var sayCommand = 'say ';
  if (voice) {
    sayCommand += '-v ' + voice.name + ' ';
  }
  if (rate) {
    sayCommand += '-r ' + rate + ' ';
  }
  sayCommand += '"' + words + '"';
  exec(sayCommand, function (error, stdout, stderr) {
    self.state = 'silent';
    if (error === null) {
      cb();
    } else {
      console.log('stderr: ' + stderr);
      console.log('exec error: ' + error);
      cb(error);
    }
  });
};
