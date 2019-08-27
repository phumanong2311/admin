var Adapter = require('./requestAdapter')
var config = require('../../config')

class ApiAdapterForward extends Adapter {
  constructor (options) {
    super(options)
    this.params = {}
  }

  setParams (params) {
    this.params = params
  }

  setBody (body) {
    this.options['form'] = body
  }

  get (cb) {
    this.options = setUrl(this.options, this.params)
    super.get((error, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  post (cb) {
    this.options['method'] = 'POST'
    this.options['headers']['Content-Type'] = 'application/json'
    this.options = setUrl(this.options)
    super.post((error, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  put (cb) {
    this.options['method'] = 'PUT'
    this.options['headers']['Content-Type'] = 'application/json'
    this.options = setUrl(this.options)
    super.put((error, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  delete (cb) {
    this.options['method'] = 'DELETE'
    this.options['headers']['Content-Type'] = 'application/json'
    this.options['headers']['Accept'] = 'application/json'
    this.options['headers']['Accept-Charset'] = 'utf-8'
    this.options = setUrl(this.options)
    super.delete((error, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }
}

function setUrl (options, params) {
  var url = `${config.server.domain}${options['url']}`
  options['url'] = params ? `${url}?` + formatURL(params) : url
  return options
}

function formatURL (data) {
  let arrForm = []
  for (var k in data) {
    arrForm.push(k + '=' + data[k])
  }
  return (arrForm.length > 0) ? arrForm.join('&') : ''
}

module.exports = ApiAdapterForward
