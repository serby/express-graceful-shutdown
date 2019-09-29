# express-graceful-shutdown

Ensure that during shutdown express returns correctly with a 503

[![build status](https://secure.travis-ci.org/serby/express-graceful-shutdown.png)](http://travis-ci.org/serby/express-graceful-shutdown)

## Installation

```
npm install express-graceful-shutdown --save
```

## Options

- `logger`: a logger that provides `info`, `warn`, and `error` functions for recording graceful shutdown. Default: `console`.
- `forceTimeout`: number of milliseconds to wait for `server.close()` to complete before calling `process.exit(1)`. Default: `30000`.

## Usage

```js
var express = require('express'),
  app = express(),
  createGracefulShutdownMiddleware = require('express-graceful-shutdown'),
  http = require('http'),
  server = http.createServer(app)

app.use(createGracefulShutdownMiddleware(server, { forceTimeout: 30000 }))

app.get('/', function(req, res) {
  res.json({ foo: 'bar' })
})

server.listen(3000)
```

## Prettier

This project uses prettier for code formatting and linting. You can set prettier
up to [auto format code in your editor](https://prettier.io/docs/en/editors.html),
or manually format code before committing with `yarn prettier`.

## Credits

[Paul Serby](https://github.com/serby/) follow me on twitter [@serby](http://twitter.com/serby)

## License

Licensed under the [ISC](https://opensource.org/licenses/ISC)
