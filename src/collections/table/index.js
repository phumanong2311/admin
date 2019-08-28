import React from 'react'
import THead from '../../collections/table/head'

class TableLayout extends React.PureComponent {
  constructor (props) {
    super(props)
    this.renderTabel = this.renderTabel.bind(this)
    this.renderBody = this.renderBody.bind(this)
  }

  renderTabel () {
    let { tableModel, fnc, sortType, sortKey } = this.props
    return (
      <table className='table table-bordered table-striped'>
        <THead isSort={this.props.sortHeader} key={'header'} sortType={sortType} sortKey={sortKey} handleSort={fnc.handleSort} tblModel={tableModel} />
        {this.renderBody()}
        <THead isSort={this.props.sortFooter} key={'footer'} sortType={sortType} sortKey={sortKey} handleSort={fnc.handleSort} tblModel={tableModel} />
      </table>
    )
  }

  renderBody () {
    let { data, tableModel } = this.props
    if (!data || data.length <= 0) return null
    return (
      <React.Fragment>
        <tbody>
          {data.map((row, index) => {
            return (
              <tr key={'row_' + index}>
                {Object.keys(tableModel).map((key, i) => {
                  let field = tableModel[key]
                  if (i === 0) return <td className={tableModel[key].className || ''} key={i}>{index + 1}</td>
                  return <td className={tableModel[key].className || ''} key={i}>{field.render(row)}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </React.Fragment>
    )
  }

  render () {
    return (
      <div className='box-body'>
        {this.renderTabel()}
      </div>
    )
  }
}

export default React.memo(TableLayout)
