var socket = require('socket.io-client')

export default {
  connect: (cb) => {
    socket.on('connect', () => {
      return cb(null, {
        connect: 200
      })
    })
  }
}
