# express-graceful-shutdown

Ensure that during shutdown express returns correctly with a 503

[![build status](https://secure.travis-ci.org/serby/express-graceful-shutdown.png)](http://travis-ci.org/serby/express-graceful-shutdown)

## Installation

```
npm install express-graceful-shutdown --save
```

## Usage

```js
var express = require('express')
  , app = express()
  , createGracefulShutdownMiddleware = require('express-graceful-shutdown')

app.use(createGracefulShutdownMiddleware)
```

## Credits
[Paul Serby](https://github.com/serby/)
