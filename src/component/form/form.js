import React from 'react'
import _ from 'lodash'
import Model from './model'

const withFormBehaviors = (WrappedComponent, rawModel) => {
  const defaultFieldProps = {
    delayOnChange: 400, // set to zero if you don't want to delay while typing
    parrallelValidation: false // use for the field that need to run all validation at the same time (password field)
  }

  /**
  * identify which field (by name) and it's value from input
  * @param {Event} e Input Event object
  * @param {object} data Input component's properties (using Semantic UI standard)
  * @return {object} Object of name, value extracted from input
  */
  const getInputData = (e, data) => {
    let target = e ? e.target : {}
    let name = target && target.name ? target.name : (data && data.name ? data.name : '')
    let value = target && target.value ? target.value : (data && data.value ? data.value : '')
    let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
    let type = target && target.type ? target.type : (data && data.type ? data.type : '')
    if (type === 'checkbox') value = checked ? 1 : 0

    return { name, value }
  }

  const dataChanged = (data = {}, newData = {}) => {
    if (_.isEmpty(newData) && _.isEmpty(data)) return false
    if (_.isEmpty(data) && !_.isEmpty(newData)) return true
    return Object.keys(newData).some((name) => data.hasOwnProperty(name) && !_.isEqual(newData[name], data[name]))
  }

  const boundModel = new Model(rawModel)

  return class extends React.PureComponent {
    constructor (props) {
      super(props)
      boundModel.bindTo(this)
      boundModel.setFieldProps(defaultFieldProps)
      boundModel.data = this.props.data
      this.state = {
        model: { ...boundModel.toObject() },
        loading: false,
        data: this.props.data
      }

      this.handleInputChange = this.handleInputChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
      this.handleSubmitSingle = this.handleSubmitSingle.bind(this)
      this.handleSubmitFinish = this.handleSubmitFinish.bind(this)
    }

    /**
     * Get input value, run validations and set new Field's state after validated
     * @param {Event} e Input Event object
     * @param {object} data Input component's properties (using Semantic UI standard)
     */

    handleInputChange (e, data) {
      e = e || {}
      let { name, value } = getInputData(e, data)
      if (value === this.state.model[name].value) return
      boundModel.setFieldValue(name, value, { requireValidate: true }, (field) => {
        this.setState({ hasChanged: true, isSaved: false, model: { ...boundModel.toObject() } }, () => {
          if (typeof this.props.onInputValidated === 'function') {
            this.props.onInputValidated(field)
          }
        })
      })
    }

    handleSubmitFinish () {
      this.setState({model: { ...boundModel.toObject() }, hasChanged: false, isSaved: false, loading: false})
    }

    /**
     * Event fired when the form submitted
     */
    handleSubmit (callback) { // TODO
      if (this.state.loading) return
      this.setState({loading: true}, () => {
        if (!this.props.onSubmit) return
        boundModel.revalidate((err, valid) => {
          if (err || !valid || typeof this.props.onSubmit !== 'function') {
            return this.setState({model: { ...boundModel.toObject() }, hasChanged: !!err, loading: false})
          }

          let data = boundModel.data

          if (typeof callback === 'function') {
            return callback(data)
          } else {
            this.props.onSubmit(data, (err) => {
              this.setState({model: { ...boundModel.toObject() }, hasChanged: !!err, isSaved: !err, loading: false})
            })
          }
        })
      })
    }

    /**
     * Event fired when the form submitted
     */
    handleSubmitSingle (callback) { // TODO
      if (this.state.loading) return
      this.setState({loading: true}, () => {
        boundModel.revalidate((err, valid) => {
          if (err || !valid || typeof callback !== 'function') {
            return this.setState({model: { ...boundModel.toObject() }, hasChanged: !!err, loading: false})
          }

          let data = boundModel.data

          if (typeof callback === 'function') {
            return callback(data)
          }
        })
      })
    }

    static getDerivedStateFromProps (props, state) {
      if (!dataChanged(state.data, props.data)) return null
      boundModel.data = _.merge(_.clone(boundModel.data), props.data)
      return {
        model: { ...boundModel.toObject(), data: props.data },
        data: props.data
      }
    }

    render () {
      let componentProps = this.props
      return (
        <React.Fragment>
          <WrappedComponent {...componentProps}
            model={this.state.model}
            onInputChange={typeof this.props.onInputChange === 'function' ? this.props.onInputChange : this.handleInputChange}
            isFormValid={boundModel.isValid}
            hasChanged={this.state.hasChanged}
            loading={this.state.loading}
            formData={boundModel.data}
            handleSubmit={this.handleSubmit}
            handleSubmitSingle={this.handleSubmitSingle}
            handleSubmitFinish={this.handleSubmitFinish}
            isSaved={this.state.isSaved}
          />
        </React.Fragment>
      )
    }
  }
}

export { withFormBehaviors }
