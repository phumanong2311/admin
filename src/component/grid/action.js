import React from 'react'
import {Link} from 'react-router-dom'
class ActionTool extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleAction = this.handleAction.bind(this)
  }

  handleAction (type) {
    let {data} = this.props
    this.props.handleAction(type, data)
  }

  render () {
    let {data, linkedit} = this.props
    return (
      <div>
        <a onClick={() => this.handleAction('ACTIVE')}><i className={`fa ${data.isActive ? 'fa-check' : 'fa-ban'}`} /></a>
        <a onClick={() => this.handleAction('DELETE')}><i className='fa fa-trash-o' /></a>
        <Link to={linkedit + data._id}><i className='fa fa-pencil' /></Link>
      </div>
    )
  }
}

export default ActionTool
