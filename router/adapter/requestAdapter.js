/* global fetch */
const request = require('request')
const _ = require('lodash')

require('es6-promise').polyfill()
require('isomorphic-fetch')

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
    const url = this.options.url
    const options = _.clone(this.options)
    delete options.url
    options['body'] = JSON.stringify(this.options.form)
    fetch(url, options).then(response => response.json()).then(data => {
      return cb(null, data)
    }).catch(error => {
      return cb(error)
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
