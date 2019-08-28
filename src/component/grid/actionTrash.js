import React from 'react'
class ActionTrash extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleActionTrash = this.handleActionTrash.bind(this)
  }

  handleActionTrash (type) {
    let {data} = this.props
    this.props.handleActionTrash(type, data)
  }

  render () {
    return (
      <div>
        <a onClick={() => this.handleActionTrash('ACTIVE')}>active</a>
        <a onClick={() => this.handleActionTrash('DELETE')}>remove</a>
      </div>
    )
  }
}

export default ActionTrash
