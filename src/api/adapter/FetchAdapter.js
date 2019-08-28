/* global fetch */
export default class FetchAdapter {
  constructor (options) {
    /* structure options {
      ** headers
      ** method
      ** query
      ** body
    } */
    this.options = options
  }

  get (url, query, cb) {
    let { headers } = this.options
    url = this.formatLink(query) ? url + '?' + this.formatLink(query) : url

    fetch(url, {
      method: 'GET',
      headers
    }).then((response) => response.json()).then(data => cb(null, data)).catch(error => cb(error))
  }

  post (url, query = {}, body = {}, cb) {
    let { headers } = this.options
    url = url + '?' + this.formatLink(query)
    return fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json()).then(data => cb(null, data)).catch(error => cb(error))
  }

  put (url, query = {}, body = {}, cb) {
    let { headers } = this.options
    url = url + '?' + this.formatLink(query)
    return fetch(url, {
      method: 'PUT',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json()).then(data => cb(null, data)).catch(error => cb(error))
  }

  delete (url, query = {}, body = {}, cb) {
    let { headers } = this.options
    url = url + '?' + this.formatLink(query)
    return fetch(url, {
      method: 'DELETE',
      headers,
      body: JSON.stringify(body)
    }).then(response => response.json()).then(data => cb(null, data)).catch(error => cb(error))
  }

  formatLink (query) {
    var datas = []
    for (var k in query) {
      datas.push(k + '=' + query[k])
    }
    if (datas.length > 0) return datas.join('&')
    return null
  }

  fetchApi (url, options, cb) {
    let { method, headers, query, body } = options
    url = url + '?' + this.formatLink(query)
    if (method.toLowerCase() === 'get') {
      fetch(url, {
        method,
        headers
      }).then((response) => response.json()).then(data => cb(null, data)).catch(error => cb(error))
    } else {
      fetch(url, {
        method: 'PUT',
        headers,
        body: JSON.stringify(body)
      }).then(response => cb(null, response.json())).catch(error => cb(error))
    }
  }
}
