var util = require('util');
var AutoScout = require('zetta-auto-scout');
var TextToSpeech = require('./text_to_speech');

var TextToSpeechScout = module.exports = function(pin) {
  AutoScout.call(this, 'textToSpeech', TextToSpeech, pin);
};
util.inherits(TextToSpeechScout, AutoScout);
