import Adapter from './adapter'
import Config from './adapter/config'

export default class Partner {
  constructor () {
    var conf = new Config()
    this.adapter = new Adapter(conf)
  }

  gets (cb) {
    let payload = {
      searchKey: '',
      pageSize: 10,
      pageNumber: 1,
      colSort: 'update_date',
      typeSort: 'DESC',
      isDel: 0,
      api: '/api/admin/partner/grid'
    }
    this.adapter.get('/base-api', payload, (error, data) => {
      if (error) return cb(error)
      if (data.status !== 200) return cb(data.message)
      return cb(null, data.data)
    })
  }
}
