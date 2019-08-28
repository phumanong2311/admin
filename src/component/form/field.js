/* global _ */
import React from 'react'
import PropTypes from 'prop-types'

/**
 * A wrapper for semantic-ui Field, with built-in validation & errors
 */
class Field extends React.PureComponent {
  constructor (props) {
    super(props)

    this.renderErrors = this.renderErrors.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleOnBlur = this.handleOnBlur.bind(this)
    this.handleOnFocus = this.handleOnFocus.bind(this)
  }

  handleKeyDown (e, data) {
    var code = e.keyCode || e.which
    if (code === 13 && !e.shiftKey) {
      if (typeof this.props.onBlur === 'function') this.props.onBlur(e, data)
    }
  }

  handleOnBlur (e, data) {
    e.target.placeholder = this.props.field.placeholder
    if (typeof this.props.onBlur === 'function') this.props.onBlur(e, data)
  }

  handleOnFocus (e, data) {
    e.target.placeholder = this.props.placeholderOnFocus
  }

  renderErrors (errors) {
    if (this.props.renderErrors) return this.props.renderErrors(errors)
    if (errors) return errors.map((err, i) => <span className='err-msg' key={`${this.props.field.name}-error-${i}`}>{err}</span>)
    return null
  }

  render () {
    let { id, className, submitOnEnter, placeholderOnFocus } = this.props
    let { name, label, description, placeholder, onChange, onBlur, defaultValue, errors, value, text } = this.props.field
    let error = errors && errors.length > 0
    let props = _.pickBy({ className, error }, (v) => v)
    defaultValue = value || defaultValue
    let inputProps = { id, name, placeholder, onChange, onBlur }

    let childComponent = React.Children.toArray(this.props.children)[0]

    if (childComponent.props.hasOwnProperty('value')) {
      inputProps.value = defaultValue
      inputProps.defaultValue = undefined
    } else {
      inputProps.defaultValue = defaultValue
      inputProps.value = undefined
    }

    if (submitOnEnter) inputProps.onKeyDown = this.handleKeyDown
    if (placeholderOnFocus) inputProps.onFocus = this.handleOnFocus
    if (typeof this.props.onBlur === 'function') inputProps.onBlur = this.handleOnBlur

    const inputComponent = React.cloneElement(childComponent, _.pickBy(inputProps, (v) => v))

    return (
      <div className='form-group'>
        {label && <label htmlFor={id}>{label}</label>}
        {inputComponent}
        {text && text}
        <br />
        {description && <p htmlFor={id}>{description}</p>}
        {error && this.renderErrors(errors)}
      </div>
    )
  }
}

const fieldType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.string),
  onBlur: PropTypes.func,
  onChange: PropTypes.func
})

fieldType.defaultProps = {
  validators: [],
  error: false,
  validateOnChange: true,
  validateOnBlur: true,
  delay: 400
}

Field.propTypes = {
  field: fieldType.isRequired,
  children: PropTypes.element.isRequired,
  id: PropTypes.string,
  className: PropTypes.string
}

export default Field
