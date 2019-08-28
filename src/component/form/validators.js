import _ from 'lodash'
import Joi from 'joi-browser'
// import Utility from '../../../src/assets/js/utility_c'
const lang = () => window.localize.lang.validator

export default {
  required: function (value, cb) {
    if (_.isNil(value) || value.toString().trim().length === 0) {
      return cb(new Error('%s cannot be left empty'.replace('%s', value)))
    }
    cb(null, true)
  },
  nonEmptyArray: function (value, cb) {
    if (value.length === 0) {
      return cb(new Error(lang().required))
    }
    cb(null, true)
  },
  maxlen: function (value, compareTo, cb) {
    if (value && value.trim().length > compareTo) {
      return cb(new Error('Field cannot be shorter than %s characters'.replace('%s', compareTo)))
    }
    cb(null, true)
  },
  checked: function (value, cb) {
    if (value !== 1) {
      return cb(new Error('please check'))
    }
    cb(null, true)
  },
  minlen: function (value, compareTo, cb) {
    if (value && value.trim().length < compareTo) {
      return cb(new Error('Field cannot be shorter than %s characters'.replace('%s', compareTo)))
    }
    cb(null, true)
  },
  email: function (value, cb) {
    if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value)) {
      return cb(new Error('The email is invalid'))
    }
    cb(null, true)
  },
  oneSpecialCharacter: function (value, cb) {
    if (!(/[^A-Za-z0-9]/).test(value)) {
      return cb(new Error(lang().noSpecialChar.replace('%s', '~ <> ; () * : % $ {} \\ " "')))
    }
    cb(null, true)
  },
  notContainEntireUsername: function (username, allname, value, cb) {
    if (value.toLowerCase().indexOf(username.toLowerCase()) !== -1 || value.toLowerCase().indexOf(allname.toLowerCase()) !== -1) {
      return cb(new Error(lang().notContainEntireUsername))
    }
    cb(null, true)
  },
  noSpecialChar: function (value, cb) {
    if (value && !(/^[^`\\{}$%:*();<>"~]+$/).test(value)) {
      return cb(new Error(lang().noSpecialChar.replace('%s', '~ <> ; () * : % $ {} \\ " `"')))
    }
    cb(null, true)
  },
  alphanumeric: function (value, cb) {
    if (!(/^[a-zA-Z0-9\s]+$/).test(value)) {
      return cb(new Error(lang().alphanumeric))
    }
    cb(null, true)
  },
  stringIsNumber: function (value, cb) {
    if (!(/^(\d{0,99}(\.\d{0,99}){0,1})$/).test(value)) {
      return cb(new Error('Only numeric characters can be used in field'))
    }
    cb(null, true)
  },
  otherValue: function (value, cb) {
    if (value === 'Other') {
      return cb(new Error(lang().otherValue))
    }
    cb(null, true)
  },
  isDateValid: function (value, cb) {
    const date = typeof value === 'number' ? window.localize.toDateString(new Date(value)) : window.localize.toDateString(value)
    // if (!Utility.isDateValid(date)) {
    //   return cb(new Error(lang().isDateValid))
    // }
    // cb(null, true)
  },
  isDateInFuture: function (value, cb) {
    value = typeof value === 'number' ? value : value.toString() // use for value is number, not Date
    // if (!Utility.isDateInFuture(value, true)) {
    //   return cb(new Error(lang().isDateInFuture))
    // }
    // cb(null, true)
  },
  imgType: function (image, cb) {
    if (['image/gif', 'image/jpeg', 'image/png'].indexOf(image.type) === -1) {
      return cb(new Error(lang().imgType))
    }
    cb(null, true)
  },
  imgSize: function (image, compareTo, cb) {
    if (image.size > compareTo) {
      return cb(new Error(lang().imgSize))
    }
    cb(null, true)
  },
  phone: function (value, cb) {
    cb(null, true)
  },
  websiteUrl: function (value, cb) {
    if (!(/^((https?:\/\/)?([^/?@:# ]*)\.([^@:# ]*))?$/g).test(value)) {
      return cb(new Error(lang().websiteUrl))
    }
    cb(null, true)
  },
  country: function (value, cb) {
    if (!(/^[A-Z]{2}$/).test(value)) {
      return cb(new Error(lang().country))
    }
    cb(null, true)
  },
  dateAfter: function (value, compareTo, cb) {
    if (value.getTime() < compareTo.getTime()) {
      return cb(new Error(lang().dateAfter.replace('$s', compareTo)))
    }
    cb(null, true)
  },
  dateBefore: function (value, compareTo, cb) {
    if (value.getTime() > compareTo.getTime()) {
      return cb(new Error(lang().dateBefore.replace('$s', compareTo)))
    }
    cb(null, true)
  },
  itemOf: function (value, compareTo, cb) {
    if (!Array.isArray(compareTo) || compareTo.length === 0 || !compareTo.includes(value)) {
      return cb(new Error(lang().itemOf))
    }
    cb(null, true)
  },
  haveLowercaseLetter: function (value, cb) {
    const self = this || {}
    const schema = Joi.string().regex(/[a-z]/g).error(self.error || new Error(''))
    Joi.validate(value, schema, (error) => {
      cb(error, value)
    })
  },
  stringHaveNumber: function (value, cb) {
    const self = this || {}
    const schema = Joi.string().regex(/[0-9]/g).error(self.error || new Error(''))
    Joi.validate(value, schema, (error) => {
      cb(error, value)
    })
  },
  haveUppercaseLetter: function (value, cb) {
    const self = this || {}
    const schema = Joi.string().regex(/[A-Z]/g).error(self.error || new Error(''))
    Joi.validate(value, schema, (error) => {
      cb(error, value)
    })
  },
  alphabet: function (value, cb) {
    if (!(/^[a-zA-Z\s]+$/).test(value)) {
      return cb(new Error(lang().alphabet))
    }
    cb(null, true)
  }
}
