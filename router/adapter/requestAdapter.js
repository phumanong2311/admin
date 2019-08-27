var request = require('request')

class RequestAdapter {
  constructor (options) {
    this.options = options
  }

  addHeaders (field, value) {
    this.options['headers'][field] = value
  }

  setOptions (options) {
    this.options = options
  }

  get (cb) {
    request(this.options, (error, response, body) => {
      if (error) return cb(error)
      if (response.statusCode !== 200) return cb(response)
      return cb(null, body)
    })
  }

  post (cb) {
    request(this.options, (error, response, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  put (cb) {
    request(this.options, (error, response, body) => {
      console.log('response', error, body)
      if (error) return cb(error)
      return cb(null, body)
    })
  }

  delete (cb) {
    request.delete(this.options, (error, response, body) => {
      if (error) return cb(error)
      return cb(null, body)
    })
  }
}

module.exports = RequestAdapter
