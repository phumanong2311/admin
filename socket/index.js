module.exports = (io) => {
  io.use((socket, next) => {
    global.appSession(socket.request, {}, next)
  }).on('connection', (socketApp) => {
    console.log('connect success socket app')
    require('./services')(socketApp)
  })
}
