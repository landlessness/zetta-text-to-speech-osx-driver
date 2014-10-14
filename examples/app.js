module.exports = function repeatAfterYou(server) {
  
  var textToSpeechQuery = server.where({type: 'text-to-speech'});

  server.observe([textToSpeechQuery], function(speechToText) {
    speechToText.call(
      'say',
      'Welcome! I will repeat after you.',
      speechToText._availableVoices.first,
      speechToText._availableDevices.first,
      250
    );
  });
  
}