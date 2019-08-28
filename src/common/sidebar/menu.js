import React from 'react'
import { withContainer } from '../../context'
import MenuContent from './menuContent'

class Menu extends React.Component {
  render () {
    let { menu } = this.props
    return (
      <ul className='sidebar-menu'>
        {/* <li><Link to='/'><i className='fa fa-dashboard' />Home</Link></li>
        <li><Link to={CATEGORYLINK.GRID}><i className='fa fa-dashboard' />Category</Link></li>
        <li><Link to={CATEGORYLINK.ADD}><i className='fa fa-dashboard' />Category Add</Link></li>
        <li><Link to='/product'><i className='fa fa-dashboard' />Product</Link></li> */}

        <li><a><i className='fa fa-dashboard' /><span>Dashboard</span></a></li>
        {menu && menu.map((row, i) => {
          return row.permission && <MenuContent key={i} title={row.title} items={row.childItem} icon={row.icon} />
        })}
      </ul>
    )
  }
}

export default withContainer(Menu, (c) => ({
  menu: c.data.menu
}))
