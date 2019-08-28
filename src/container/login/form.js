import React from 'react'

export default class Form extends React.Component {
  render () {
    return (
      <form action='/login' method='post'>
        <div className='form-group has-feedback'>
          <input type='text' name='username' className='form-control' value='master' placeholder='Email or username' />
          <span className='glyphicon glyphicon-envelope form-control-feedback' />
        </div>
        <div className='form-group has-feedback'>
          <input name='password' type='password' className='form-control' value='nhanhuynh' placeholder='Password' />
          <span className='glyphicon glyphicon-lock form-control-feedback' />
        </div>
        <div className='row'>
          <div className='col-xs-12'>
            <button type='submit' className='btn btn-primary btn-block btn-flat'>Sign In</button>
          </div>
        </div>
      </form>
    )
  }
}
