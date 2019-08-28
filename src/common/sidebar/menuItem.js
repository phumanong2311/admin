import React from 'react'
import { Link } from 'react-router-dom'

class MenuContent extends React.PureComponent {
  render () {
    return (
      <li className='active'>
        <Link to={this.props.item.link}><i className='fa fa-circle-o' />{this.props.item.text}</Link>
      </li>
    )
  }
}

export default MenuContent
