##Speech Synthesis Manager for OS X

###Install

```
$> npm install zetta-speech-osx-driver
```

###Usage

```
var zetta = require('zetta');
var Speech = require('zetta-speech-osx-driver');

zetta()
  .use(Speech)
  .listen(1337)
```

### Hardware

* [Mac OS X](https://www.apple.com/osx/)

###Transitions

#####say

###Design

The speech capabilities come from [Apple](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/say.1.html).