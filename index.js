var util = require('util');
var Scout = require('zetta-scout');
var exec = require('child_process').exec;
var async = require('async');
var TextToSpeech = require('./text_to_speech');

var TextToSpeechScout = module.exports = function() {
  Scout.call(this);
};
util.inherits(TextToSpeechScout, Scout);

TextToSpeechScout.prototype.init = function(next) {
  var self = this;

  async.parallel(
    {
      voices: function(callback) {
        exec('say -v ?', function (error, stdout, stderr) {
          callback(error, self.parseAvailableVoices(stdout));
        });
      },
      devices: function(callback){
        exec('say -a ?', function (error, stdout, stderr) {
          callback(error, self.parseAvailableDevices(stdout));
        });
      }
    }, function(error, availableOptions) {
      if (typeof error === 'undefined' || error === null) {
        self.discover(TextToSpeech, availableOptions);
        next();
      } else {
        console.log('exec error: ' + error);
      }
    }
  );
};

TextToSpeechScout.prototype.parseAvailableVoices = function(stream) {
  var regExp = new RegExp(/^(.*)([a-z][a-z]_[A-Z][A-Z])\s+#(.*)$/);
  var keys = ['name', 'locale', 'example'];
  return this.parseAvailableOptions(stream, regExp, keys);
}

TextToSpeechScout.prototype.parseAvailableDevices = function(stream) {
  var regExp = new RegExp(/^\s*(\d+)(.*)$/);
  var keys = ['id', 'name'];
  return this.parseAvailableOptions(stream, regExp, keys);
}

TextToSpeechScout.prototype.parseAvailableOptions = function(stream, regExp, keys) {
  var options = new Array();
  var lines = stream.split('\n');

  for (var i = 0; i < lines.length; i++) {
    match = lines[i].match(regExp);
    if (match !== null) {
      var option = {};
      for (var j=0; j < keys.length; j++) {
        option[keys[j]] = match[j+1].trim();
      }
      options.push(option);
    }
  }

  return options;
}