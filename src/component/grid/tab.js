import React from 'react'

export default class Tabs extends React.PureComponent {
  handleTabs (name) {
    this.props.handleTabs(name)
  }
  render () {
    let { options, active } = this.props
    return (
      <ul className='nav nav-tabs'>
        {options.map((item, i) => {
          return <li key={i} className={active === item.id ? 'active' : ''}><a data-toggle='tab' data-tab='name' onClick={() => this.handleTabs(item.id)}>{item.text}</a></li>
        })}
      </ul>
    )
  }
}
