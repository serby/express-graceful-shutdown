# express-graceful-shutdown

Ensure that during shutdown express returns correctly with a 503

[![build status](https://secure.travis-ci.org/serby/express-graceful-shutdown.png)](http://travis-ci.org/serby/express-graceful-shutdown) [![Greenkeeper badge](https://badges.greenkeeper.io/serby/express-graceful-shutdown.svg)](https://greenkeeper.io/)

## Installation

```
npm install express-graceful-shutdown --save
```

## Options

* `logger`: a logger that provides `info`, `warn`, and `error` functions for recording graceful shutdown. Default: `console`.
* `forceTimeout`: number of milliseconds to wait for `server.close()` to complete before calling `process.exit(1)`. Default: `30000`.

## Usage

```js
var express = require('express')
  , app = express()
  , createGracefulShutdownMiddleware = require('express-graceful-shutdown')
  , http = require('http')
  , server = http.createServer(app)

app.use(createGracefulShutdownMiddleware(server, { forceTimeout: 30000 }))

app.get('/', function (req, res) {
    res.json({ foo: 'bar' })
})

server.listen(3000)
```

## Credits
[Paul Serby](https://github.com/serby/)
