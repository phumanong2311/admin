import React from 'react'
import UserPanel from './userPanel'
import Search from './search'
import Menu from './menu'

class MainSidebar extends React.PureComponent {
  render () {
    return (
      <aside className='main-sidebar'>
        <section className='sidebar'>
          <UserPanel />
          <Search />
          <Menu />
        </section>
      </aside>
    )
  }
}

export default MainSidebar
