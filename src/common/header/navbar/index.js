import React from 'react'
import NavbarMessage from './message'
import NavbarNotifications from './notifications'
import NavbarTask from './task'
import NavbarUser from './user'

class Navbar extends React.PureComponent {
  render () {
    return (
      <nav className='navbar navbar-static-top'>
        <a className='sidebar-toggle' data-toggle='offcanvas' role='button'>
          <span className='sr-only'>Toggle navigation</span>
        </a>

        <div className='navbar-custom-menu'>
          <ul className='nav navbar-nav'>
            <NavbarMessage />
            <NavbarNotifications />
            <NavbarTask />
            <NavbarUser />
            <li>
              <a data-toggle='control-sidebar'><i className='fa fa-gears' /></a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navbar
