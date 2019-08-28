import eventEmitter from '../context/utils/eventEmitter'
export default class Base {
  constructor () {
    this._event = eventEmitter
  }

  emit (name, result) {
    this._event.emit(name, result)
  }

  on (name, cb) {
    this._event.on(name, cb)
  }
}
