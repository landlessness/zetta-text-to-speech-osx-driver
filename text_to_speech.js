var util = require('util');
var Device = require('zetta-device');
var exec = require('child_process').exec;

var TextToSpeech = module.exports = function(availableVoices, availableDevices) {
  Device.call(this);
  this._availableVoices = availableVoices;
  this._availableDevices = availableDevices;
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
    { name: 'words', title: 'Words to Speak', type: 'text'},
    { name: 'voice', title: 'Voice Persona', type: 'radio', value: this._availableVoices},
    { name: 'rate', title: 'Rate of Speech', units: 'words per minute', type: 'range', min: 90, max: 720, step: 1},
    { name: 'device', title: 'Audio Device', type: 'radio', value: this._availableDevices}
  ]);
};

// TODO: figure out object marshalling for voice
TextToSpeech.prototype.say = function(words, voice, rate, device, cb) {
  this.state = 'speaking';
  var self = this;

  var sayCommand = 'say ';
  if (device) {
    sayCommand += ' -a ' + device + ' ';
  }
  if (voice) {
    voice = (voice instanceof Object) ? voice : JSON.parse(voice);
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
