import FetchAdapter from './FetchAdapter'

export default class Adapter extends FetchAdapter {
  constructor (conf) {
    super(conf)
    this.options = conf
  }

  initAdapter (conf) {
    if (!conf) throw new Error('api config required')
    this.options = conf
  }
}
