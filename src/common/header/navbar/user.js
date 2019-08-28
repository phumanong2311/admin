import React from 'react'
import { formatDate } from '../../../helper/utility'
import config from '../../../../config'
import { withContainer } from '../../../context'

let domain = config.server.domain

class UserNav extends React.PureComponent {
  constructor (props) {
    super(props)
    this.currentUser = this.props.currentUser ? this.props.currentUser : {}
  }

  render () {
    let currentUser = this.props
    return (
      <li className='dropdown user user-menu'>
        <a className='dropdown-toggle' data-toggle='dropdown'>
          <img
            src={currentUser.avatar ? domain + currentUser.avatar : 'img/user2-160x160.jpg'}
            className='user-image'
            alt='User Image'
          />
          <span className='hidden-xs'>
            {currentUser.fullname ? currentUser.fullname : ''}
          </span>
        </a>
        <ul className='dropdown-menu'>
          <li className='user-header'>
            <img
              src={currentUser.avatar ? domain + currentUser.avatar : 'img/user2-160x160.jpg'}
              className='img-circle'
              alt='User Image'
            />
            <p>
              {currentUser.fullname ? currentUser.fullname : ''}
              <small>
                {currentUser.birthday && formatDate(currentUser.birthday)}
              </small>
            </p>
          </li>
          <li className='user-body'>
            <div className='row'>
              <div className='col-xs-12 text-center'>
                <a href='/admin/change-password'>Đổi mật khẩu</a>
              </div>
              {/* <div className='col-xs-4 text-center'>
                <a>Đổi mật khẩu</a>
              </div>
              <div className='col-xs-4 text-center'>
                <a>Friends</a>
              </div> */}
            </div>
          </li>
          <li className='user-footer'>
            <div className='pull-left'>
              <a href='/admin/profile' className='btn btn-default btn-flat'>Hồ sơ</a>
            </div>
            <div className='pull-right'>
              <a href='/system/login' className='btn btn-default btn-flat'>
                Đăng xuất
              </a>
            </div>
          </li>
        </ul>
      </li>
    )
  }
}

export default withContainer(UserNav, (c) => ({
  currentUser: c.data.currentUser
}))
