import defaultProps from './deault.props'
import eventEmitter from '../context/utils/eventEmitter'
import _ from 'lodash'

const upperCaseFirstChar = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default (getCtr) => {
  const emitEventChangeAppData = (oldState, newState) => {
    eventEmitter.emit('changeAppCtrl', {
      oldState,
      newState
    })
  }

  return {
    generateDataSetter: () => {
      const controller = getCtr()
      _.forIn(defaultProps.data, (value, key) => {
        if (key.length) {
          const setterName = 'set' + upperCaseFirstChar(key)
          controller.data[setterName] = (mutation) => {
            try {
              const self = getCtr()
              const oldValue = _.cloneDeep(self.data[key])
              let newValue = null
              if (mutation instanceof Function) {
                const returnValue = mutation(oldValue)
                if (returnValue !== undefined) {
                  newValue = _.cloneDeep(returnValue)
                  self.data[key] = newValue
                } else {
                  throw new Error('Setter for ' + 'data.' + key + ' not return new value')
                }
              } else {
                newValue = _.cloneDeep(mutation)
                self.data[key] = newValue
              }
              emitEventChangeAppData({
                property: 'data.' + key,
                value: oldValue
              }, {
                property: 'data.' + key,
                value: newValue
              })
            } catch (err) {
                console.error(err) // eslint-disable-line
            }
          }
        }
      })
    }
  }
}
