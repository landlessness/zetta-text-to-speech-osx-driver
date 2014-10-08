##Zetta driver for 'say', the speech synthesis manager for OS X

###Install

```
$> npm install zetta-text-to-speech-osx-driver
```

###Usage

```
var zetta = require('zetta');
var TextToSpeech = require('zetta-text-to-speech-osx-driver');

zetta()
  .use(TextToSpeech)
  .listen(1337)
```

### Hardware

* [Mac OS X](https://www.apple.com/osx/)

###Transitions

#####say

###Design

The speech capabilities come from [Apple](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/say.1.html).