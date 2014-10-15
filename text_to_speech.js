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
    { name: 'voice', title: 'Voice Persona', type: 'radio',
      value: this._availableVoices},
    { name: 'device', title: 'Audio Output Device', type: 'radio',
      value: this._availableDevices},
    { name: 'rate', title: 'Rate of Speech', type: 'range',
      min: 90, max: 720, step: 1, units: 'words per minute'}
  ]);
};

TextToSpeech.prototype.say = function(words, voice, device, rate, cb) {
  this.state = 'speaking';
  var self = this;

  var sayCommand = 'say ';
  if (device) {
    device = this._marshal(device);
    sayCommand += '-a ' + device.id + ' ';
  }
  if (voice) {
    voice = this._marshal(voice);
    sayCommand += '-v ' + voice.name + ' ';
  }
  if (rate) {
    sayCommand += '-r ' + rate + ' ';
  }
  sayCommand += '"' + words + '"';
  exec(sayCommand, function (error, stdout, stderr) {
    if (error === null) {
      self.state = 'silent';
      cb();
    } else {
      self.state = 'error';
      console.log('stderr: ' + stderr);
      console.log('exec error: ' + error);
      cb(error);
    }
  });
};

// TODO this feels like it should be a Zetta platform thing
// Zetta knows from above config that I want an Object not a string
TextToSpeech.prototype._marshal = function(param) {
  return (typeof param === 'string') ? JSON.parse(param) : ((param instanceof Array) ? param.first : param);
}
