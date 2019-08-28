import React from 'react'
import FormLogin from './form'

export default class Login extends React.Component {
  render () {
    return (
      <div className='login-box' >
        <div className='login-logo'>
          <a><b>Admin</b>LTE</a>
        </div>
        <div className='login-box-body'>
          <p className='login-box-msg'>Sign in to start your session</p>
          <FormLogin />
        </div>
      </div>
    )
  }
}
