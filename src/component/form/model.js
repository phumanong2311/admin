import async from 'async'
import _ from 'lodash'
import validators from './validators'

class Model {
  constructor (rawModel) {
    this._rawModel = rawModel
  }

  set data (newData) {
    this._model = _initModel(this._model, newData)
  }

  get data () {
    return _.mapValues(this._model, (field) => { return field.isValid ? field.value : null })
  }

  /**
   * Return valid status of the form
   * @return {boolean} true if all fields're valid
   */
  get isValid () {
    return !Object.keys(this._model).some((f) => {
      return _.isUndefined(this._model[f].isValid) ? !_.isEmpty(this._model[f].validators) : !this._model[f].isValid
    })
  }

  revalidate (callback) {
    const tasks = _.mapValues(this._model, (field, name) => (cb) => _validate.call(this, field, field.value, (f) => cb(null, f)))
    async.parallel(tasks, (err, validatedModel) => {
      if (validatedModel) this._model = validatedModel
      if (!_.isEmpty(err)) {
        return callback(null, false)
      }
      callback(null, this.isValid)
    })
  }

  bindTo (obj) {
    this._model = this._rawModel.model.bind(obj)()
    _createNewProps(this)
  }

  toObject () {
    return this._model
  }

  hasChanged (comparedData) {
    if (!comparedData) return false
    return Object.keys(this._model).some((name) => this._model[name].value !== comparedData[name])
  }

  setFieldProps (props) {
    _.mapValues(this._model, (value, key) => {
      this._model[key] = Object.assign({}, props, value)
    })
  }
  setFieldValue (name, value, options, callback) {
    let opts = Object.assign({}, { requireValidate: false }, options || {})
    let field = this._model[name]
    if (!opts.requireValidate) {
      field.value = value
      field.isValid = true
      if (!value && field.validators && field.validators.some((validator) => validator.compare === 'required')) field.isValid = false
      if (_.isEmpty(value) && field.validators && field.validators.some((validator) => validator.compare === 'nonEmptyArray')) field.isValid = false
      delete field.errors
      this._model = _setField(field, this._model)
      return callback(field)
    }

    _validate(field, value, (validatedField) => {
      field = Object.assign(field, validatedField, { value })
      this._model = _setField.call(this, field, this._model)
      callback(_.cloneDeep(field))
    })
  }
}

/* Private methods below */

/**
 * Init model value based on new data entered
 * @param {object} model Raw model object
 * @param {object} data New data added
 * @returns {object} New model with new data updated
 */
const _initModel = (model, data) => {
  data = data || {}
  Object.keys(model).forEach((name) => {
    let field = model[name]
    if (data && !_.isUndefined(data[name]) && !_.isNull(data[name])) { // If has initial data, set them to model
      // if default value can be returned by a function
      if (typeof field.defaultValue === 'function') {
        field.valueSetter = field.defaultValue
      } else if (!field.valueSetter) {
        field.valueSetter = (v) => v
      }
      field.value = (!_.isUndefined(field.value) && !_.isNull(field.value)) ? field.value : (field.valueSetter(data[name]) || '')
      field.isValid = !field.errors || field.errors.length === 0
    } else { // If not, set data empty
      delete field.value
    }
    // if the field do not have name property, use model key as field's name
    if (!field.name) field.name = name

    model = _setField(field, model)
  })
  return model
}

/**
 * Validate input value
 * @param {object} field The field need to validate
 * @param {mixed} value New value, which will be validated with
 * @param {validatedCallback} validatedCallback The callback after validated
 */
const _validate = (field, value, validatedCallback) => {
  field.isValid = true
  delete field.errors
  if (!field.validators || field.validators.length === 0) return validatedCallback(field)

  // choose run validation task parallel or series
  const asyncFunc = field.parrallelValidation ? async.parallel : async.series
  const tasks = field.validators.map(({ compare, compareTo, message, username, allname }) => {
    return (cb) => {
      const validate = typeof compare === 'string' ? validators[compare] : compare
      const _cb = !message ? cb : (err) => {
        if (err) return cb(new Error(message))
        cb()
      }
      compareTo !== null && compareTo !== undefined ? validate.call(this, value, compareTo, _cb) : username !== null && username !== undefined && allname !== null && allname !== undefined ? validate.call(this, username, allname, value, _cb) : validate.call(this, value, _cb)
    }
  })

  asyncFunc(field.parrallelValidation === true ? async.reflectAll(tasks) : tasks, (err, results) => {
    if (field.parrallelValidation !== true) {
      if (err) {
        let errors = Array.isArray(err) ? err : [err]
        field.errors = errors.map((e) => e.message)
      } else {
        field.errors = null
      }
    } else {
      if (results) {
        let result = Array.isArray(results) ? results : [results]
        field.errors = result.filter((e) => e.error).map((e) => e.error.message)
      } else { field.errors = null }
    }
    field.isValid = !field.errors || field.errors.filter((e) => e).length === 0
    validatedCallback(field)
  })
}

/**
 * Add virtual properties based on raw model's keys to Model object
 * @param {Model} obj Current model object
 */
const _createNewProps = (obj) => {
  let model = obj._model
  Object.defineProperties(obj, _.mapValues(model, (field) => ({
    value: _.omit(field, ['defaultValue', 'validators', 'calculate', 'valueSetter']),
    writable: true
  })))
}

/**
 *
 * @param {object} field Field object is an item of raw model
 * @param {object} model Raw model
 * @param {Array} queue To manage dependencies, avoid infinite loop because fields denpend on each other
 */
const _setField = (field, model, queue = []) => {
  queue.push(field.name)

  model[field.name] = field
  if (!field.isValid || typeof field.calculate !== 'object') return model

  const dependencyNames = Object.keys(field.calculate)
  for (var i = 0; i < dependencyNames.length; i++) {
    const dependencyName = dependencyNames[i]
    const calculator = field.calculate[dependencyName]

    if (typeof calculator !== 'function') continue
    if (queue.includes(dependencyName)) continue

    // trigger another field
    let dependencyField = model[dependencyName]
    let value = calculator(model)
    if (value === undefined || value === null) continue

    _validate(dependencyField, value, (validatedField) => {
      dependencyField = Object.assign(dependencyField, validatedField, { value })
      model = _setField(dependencyField, model)
    })
  }

  return model
}

export default Model
