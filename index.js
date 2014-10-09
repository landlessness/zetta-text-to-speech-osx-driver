var util = require('util');
var Scout = require('zetta-scout');
var exec = require('child_process').exec;
var TextToSpeech = require('./text_to_speech');

var TextToSpeechScout = module.exports = function() {
  Scout.call(this);
};

util.inherits(TextToSpeechScout, Scout);

TextToSpeechScout.prototype.init = function(next) {
  var self = this;
  var discoverVoices = "say -v '?'";

  // TODO: make into a help function
  exec(discoverVoices, function (error, stdout, stderr) {
    if (error === null) {
      self.discover(TextToSpeech, self.parseAvailableVoicesStream(stdout), self.parseAvailableDevicesStream(stdout));
      next();
    } else {
      console.log('exec error: ' + error);
    }
  });
  
  //TODO: available output file formats:
  // say -o foo --file-format=?

  //TODO: available output data formats for a specific file format: 
  // say -o foo --file-format=WAVE  --data-format=?

  //TODO: available output bit rates for a specific file and data format: 
  // say -o foo --file-format=adts --data-format=aac --bit-rate=?
  
};

// TODO: actually parse the results from the say command
TextToSpeechScout.prototype.parseAvailableVoicesStream = function(voicesStream) {

  var voices = [
    {name: 'Agnes', locale: 'en_US', example: "Isn't it nice to have a computer that will talk to you?"},
    {name: 'Albert', locale: 'en_US', example: "I have a frog in my throat. No, I mean a real frog!"},
    {name: 'Paola', locale: 'it_IT', example: "Salve, mi chiamo Paola e sono una voce italiana."}
  ];

  return voices;
}

// TODO: actually parse the results from the say command
TextToSpeechScout.prototype.parseAvailableDevicesStream = function(devicesStream) {

  var devices = [
    {name: 'AirPlay', id: 39},
    {name: 'Built-in Output', id: 47}
  ];

  return devices;
}