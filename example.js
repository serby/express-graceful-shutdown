var express = require('express')
  , app = express()
  , createGracefulShutdownMiddleware = require('./index.js')
  , http = require('http')
  , server = http.createServer(app)

app.use(createGracefulShutdownMiddleware(server, { forceTimeout: 10000 }))

app.use('/longop', function(req, res) {
  var i = 0
  var callback = function() {
    if (i === 30) {
      res.end()
      return
    }
    res.write(i + '\n')
    i++
    setTimeout(callback, 1000)
  }
  callback()
})

console.log(process.pid)
server.listen(3000)
