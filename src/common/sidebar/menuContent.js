import React from 'react'
import MenuItem from './menuItem'

class MenuContent extends React.PureComponent {
  render () {
    var rowsItem = []
    let { items, active } = this.props
    items.map((row, i) => {
      if (row.permission) {
        rowsItem.push(<MenuItem key={i} item={row} />)
      }
    })

    return (
      <li className={active && 'treeview active'} >
        <a>
          <i className={this.props.icon} /> <span>{this.props.title}</span>
          <span className='pull-right-container'>
            <i className='fa fa-angle-left pull-right' />
          </span>
        </a>
        <ul className='treeview-menu'>
          {rowsItem}
        </ul>
      </li>
    )
  }
}

export default React.memo(MenuContent)
