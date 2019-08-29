var config = {
  server: {
    protocol: 'http',
    host: 'localhost',
    port: '3100'
  }
}

let { server } = config
// config['server']['domain'] = `${server.protocol}://${server.host}:${server.port}`
config['server']['domain'] = `http://api.edutour.vn`

module.exports = config
