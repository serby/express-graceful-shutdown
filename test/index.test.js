var rewire = require('rewire')
  , createExpressGracefulShutdown = rewire('..')
  , assert = require('assert')
  , noop = function () {}
  , logger = require('mc-logger')

describe('express-graceful-shutdown', function () {

  it('should be a function' , function () {
    assert.equal(typeof createExpressGracefulShutdown({}), 'function')
  })

  it('should call next() when not shutting down' , function (done) {
    createExpressGracefulShutdown({})(null, null, done)
  })

  it('should send a 503 when shutting down' , function (done) {
    var gracefulShutdown
    createExpressGracefulShutdown.__set__('process'
      , { env: { NODE_ENV: 'testing' }, exit: noop, on: function (name, fn) {
          gracefulShutdown = fn
        }
      })

    var stubServer = { close: noop }
      , stubResponse =
      { status: function (code) {
          assert.equal(code, 503)
          done()
          return { send: noop }
        }
        , set: noop
      }
      , middleware = createExpressGracefulShutdown(stubServer, { logger: logger } )

    gracefulShutdown()

    middleware(null, stubResponse)
  })

  it('should shut down immediately when NODE_ENV is not set', function (done) {

    var gracefulShutdown
    createExpressGracefulShutdown.__set__('process'
      , { env: {}
        , exit: function () { done() }
        , on: function (name, fn) { gracefulShutdown = fn }
        })

    createExpressGracefulShutdown({}, { logger: logger } )
    gracefulShutdown()

  })

})
