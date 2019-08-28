import eventEmiter from '../context/utils/eventEmitter'
let handleError = (error, emit = false, cb) => {
  if (emit) eventEmiter.emit('error-app', new Error(error))
  if (typeof cb === 'function') {
    return cb(error)
  }
}
export default handleError
