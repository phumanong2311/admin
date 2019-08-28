import React from 'react'
import {withContainer } from '../../context'
import { domain } from '../../helper/utility'

class UserPanel extends React.PureComponent {

  render() {
    let { currentUser } = this.props
    return (
      <div className='user-panel'>
        <div className='pull-left image'>
          <img src='/img/user2-160x160.jpg' className='img-circle' alt='User Image'/>
          {/* <img src={domain + currentUser.avatar} className='img-circle' alt='User Image'/> */}
        </div>
        <div className='pull-left info'>
          <p>{(currentUser.fullname)? currentUser.fullname : ''}</p>
          <a><i className='fa fa-circle text-success'></i> Online</a>
        </div>
      </div>
    )
  }
}

export default withContainer(UserPanel, (c) => ({
  currentUser: c.data.currentUser
}))
