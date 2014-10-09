module.exports = function repeatAfterYou(server) {
  
  var textToSpeechQuery = server.where({type: 'text-to-speech'});

  server.observe([textToSpeechQuery], function(speechToText) {
    console.log('you observed me!');
    speechToText.call(
      'say',
      'Welcome! I will repeat after you.',
      speechToText._availableVoices.first,
      250
    );
  });
  
}

// for random voice
// speechToText._availableVoices[
//   Math.floor((Math.random() * speechToText._availableVoices.length))
// ],
