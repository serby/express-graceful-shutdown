function createMiddleware(server, opts) {
  var shuttingDown = false,
    options = { logger: console, forceTimeout: 30000, ...opts }

  // Graceful shutdown taken from: http://blog.argteam.com/
  process.on('SIGTERM', gracefulExit)

  function gracefulExit() {
    // Don't bother with graceful shutdown on development to speed up round trip
    if (!process.env.NODE_ENV) return process.exit(1)

    if (shuttingDown) return
    shuttingDown = true
    options.logger.info('Received kill signal (SIGTERM), shutting down')

    setTimeout(function() {
      options.logger.error(
        'Could not close connections in time, forcefully shutting down'
      )
      process.exit(1)
    }, options.forceTimeout).unref()

    server.close(function() {
      options.logger.info('Closed out remaining connections.')
      process.exit()
    })
  }

  function middleware(req, res, next) {
    if (!shuttingDown) return next()
    res.set('Connection', 'close')
    res.status(503).send('Server is in the process of restarting.')
  }

  return middleware
}

module.exports = createMiddleware
