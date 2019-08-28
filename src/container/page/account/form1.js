import React from 'react'
import {Link} from 'react-router-dom'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import { withFormBehaviors } from '../../../component/form/form'
import { withContainer } from '../../../context'
import config from '../../../../config'
import Model from './model1'
import Field from '../../../component/form/field'
import Select from '../../../component/control/select'

import 'react-datepicker/dist/react-datepicker.css'

let domain = config.server.domain

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.uploadFile = this.uploadFile.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  uploadFile (e) {
    var files = e.target.files
    var name = e.target.getAttribute('data-name')
    var folder = e.target.getAttribute('data-folder')

    this.props.api.file.upload(files, name, folder, (err, resp) => {
      if (err) this.props.onInputChange(null, { name, value: null })
      else this.props.onInputChange(null, {name, value: resp.img})
    })
  }

  handleSubmit () {
  }

  render () {
    let {model, isFormValid, hasChanged, onInputChange} = this.props
    let {avatar, username, email, firstname, lastname, address, phone, birthday, gender} = model
    var linkAvatar = (avatar.value) ? domain + avatar.value : 'https://img7.androidappsapk.co/115/7/3/a/com.profile.admires_stalkers_unknown.png'
    return (
      <section className='content'>
        <div className='row'>
          <div className='col-md-3'>
            <div className='box box-primary'>
              <div className='box-body box-profile'>
                <img className='profile-user-img img-responsive img-circle' src={linkAvatar} alt='User profile picture' />
                <h3 className='profile-username text-center'>GROUP DEV</h3>
                <p className='text-muted text-center'>Admin Group</p>
                <Field field={avatar}>
                  <div className='upload-image'>
                    <button className='btn btn-block btn-success'>Avatar</button>
                    <input data-name='avatar' data-folder='account' id='upload-input' className='btn btn-block btn-success' type='file' name='uploads[]' onChange={this.uploadFile} />
                  </div>
                </Field>
              </div>
            </div>

            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Create Account</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <Field field={username}>
                    <input type='text' className='form-control' placeholder={username.placeholder} onChange={this.props.onInputChange} defaultValue={username.value} />
                  </Field>

                  <Field field={email}>
                    <input type='text' className='form-control' placeholder={email.placeholder} onChange={this.props.onInputChange} defaultValue={email.value} />
                  </Field>
                </div>
              </form>
            </div>

          </div>
          <div className='col-md-6'>
            <div className='box box-success'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Account info</h3>
              </div>
              <form role='form'>
                <div className='box-body'>
                  <Field field={firstname}>
                    <input type='text' className='form-control' placeholder={firstname.placeholder} onChange={onInputChange} defaultValue={firstname.value} />
                  </Field>

                  <Field field={lastname}>
                    <input type='text' className='form-control' placeholder={lastname.placeholder} onChange={onInputChange} defaultValue={lastname.value} />
                  </Field>

                  <div className='form-group'>
                    <label>Fullname</label>
                    <span> {`${firstname.value} ${lastname.value}`.trim()}</span>
                  </div>

                  <Field field={address}>
                    <input type='text' className='form-control' placeholder={address.placeholder} onChange={onInputChange} defaultValue={address.value} />
                  </Field>

                  <Field field={phone}>
                    <input type='text' className='form-control' placeholder={phone.placeholder} onChange={onInputChange} defaultValue={phone.value} />
                  </Field>

                  <Field field={birthday}>
                    <DatePicker className='form-control' selected={moment(birthday.value).isValid() ? new Date(birthday.value) : new Date()} onChange={(date) => onInputChange(null, {name: 'birthday', value: date})} />
                  </Field>

                  <Field field={gender}>
                    <Select isSelected={parseInt(gender.value)} options={gender.options} classSelect='select2' onChange={onInputChange} />
                  </Field>

                  <Field field={model.is_active}>
                    <span className='checkbox-react' onClick={() => onInputChange(null, { name: 'is_active', value: model.active.value !== 1 ? 1 : 0 })}>
                      {model.is_active.value === 1 && <i className='fa fa-check' />}
                    </span>
                  </Field>
                </div>
              </form>
            </div>
          </div>
          {/* <div className='col-md-3'>
            <div className='box box-primary'>
              <div className='box-header with-border'>
                <h3 className='box-title'>Cài Đặt</h3>
              </div>
              <form role='form'>
                <div className='form-group'>
                  <label>Nhận Mail</label>
                  <span data-name='active' className='checkbox-react'>
                    <i className='fa fa-check' />
                  </span>
                </div>
              </form>
            </div>
          </div> */}
          <div className='col-md-12'>
            <div className='box box-success'>
              <div className='box-body'>
                <div className='pull-left'>
                  <Link to='/account' className='btn btn-danger btn-xs'>Cancle</Link>
                </div>

                <div className='pull-right'>
                  <input
                    className='btn btn-success btn-xs'
                    disabled={!isFormValid || (!hasChanged)}
                    type='submit'
                    defaultValue='Save'
                    onClick={this.handleSubmit} />
                </div>

                <div className='clearfix' />
              </div>
            </div>
          </div>

        </div>
      </section>
    )
  }
}

const FormBox = withFormBehaviors(Form, Model)

class FormWrapper extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state.data = this.props.currentUser
  }
  render () {
    return <FormBox data={this.state.data} api={this.props.api} />
  }
}

export default withContainer(React.memo(FormWrapper), (c, props) => ({
  api: c.api,
  currentUser: c.data.currentUser
}))
