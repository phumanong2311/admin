var config = {
  server: {
    protocol: 'http',
    host: 'api.edutour.vn',
    port: '3100'
  }
}

let { server } = config
config['server']['domain'] = `${server.protocol}://${server.host}:${server.port}`

module.exports = config
