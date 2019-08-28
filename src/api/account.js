// import Adapter from './adapter'
// import Config from './adapter/config'

import Adapter from './adapter'
import Config from './adapter/config'
import handleError from './error'
import Base from './base'

export default class Account  extends Base {

  constructor () {
    super()
    var conf = new Config()
    this.adapter = new Adapter(conf.get())
  }

  getUserInfo (cb) {
    this.adapter.get('/api/get-current-user', {}, (error, data) => {
      if (error) return cb(error)
      if (data.status !== 200) return cb(data.message)
      return cb(null, data.data)
    })
  }

  gets (payload, cb) {
    payload['api'] = '/api/admin/user'
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-accounts', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  get (payload, cb) {
    payload['api'] = '/api/admin/user/' + payload.id
    delete payload.id
    this.adapter.get('/base-api', payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('get-account', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  insert (payload, cb) {
    payload['api'] = '/api/admin/user'
    this.adapter.post('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('insert-account', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  update (payload, cb) {
    payload['api'] = '/api/admin/user/' + payload.id
    this.adapter.put('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200) return cb(resp.message)
      this.emit('update-account', resp.data)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }

  delete (payload, cb) {
    payload['api'] = '/api/admin/user/' + payload.id
    this.adapter.delete('/base-api', null, payload, (error, resp) => {
      if (error) return handleError(error, false, cb)
      if (resp.status !== 200 || !resp.data) return cb(resp.message)
      this.emit('delete-account', payload.id)
      if (typeof cb === 'function') {
        return cb(null, resp.data)
      }
    })
  }
}
