import React from 'react'

export default class GridViewLayout extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleEntries = this.handleEntries.bind(this)
    this.handleSearchBox = this.handleSearchBox.bind(this)
    this.time = null
  }

  renderSearchBox () {
    return this.props.search && <div id='example1_filter' className='dataTables_filter'>
      <label>Tìm Kiếm :</label>
      <input onChange={this.handleSearchBox} type='search' className='form-control input-sm' placeholder='' aria-controls='example1' />
      <div className='clearfix' />
    </div>
  }

  handleSearchBox (e) {
    clearTimeout(this.time)
    let value = e.target.value
    let { fnc } = this.props
    if (!fnc || !fnc.handleSearchBox) return false
    this.time = setTimeout(() => {
      fnc.handleSearchBox(value)
    }, 500)
  }

  renderEntries () {
    let {entriesOption} = this.props
    return (
      <div className='dataTables_length' id='example1_length'>
        <label>Hiển Thị</label>
        <select name='example1_length' aria-controls='example1' className='form-control input-sm' onChange={this.handleEntries}>
          {(entriesOption && entriesOption.length > 0) && entriesOption.map((e, i) => <option key={i} value={e.value}>{e.text}</option>)}
        </select>
        <div className='clearfix' />
      </div>
    )
  }

  handleEntries (e) {
    let { fnc } = this.props
    if (!fnc || !fnc.handleEntries) return false
    return fnc.handleEntries(e)
  }

  renderContent () {
    let { entries, search } = this.props
    return (
      <div className='row'>
        {(entries || search) && <React.Fragment>
          <div className={!entries ? 'col-sm-12' : 'col-sm-6'}>
            {this.renderEntries()}
          </div>
          <div className={!search ? 'col-sm-12' : 'col-sm-6'}>
            {this.renderSearchBox()}
          </div>
        </React.Fragment>}
        <div className='box-body'>
          {this.props.children}
        </div>
      </div>
    )
  }

  render () {
    return (
      <div className='tab-content'>
        <div className='tab-pane active' >
          <div className='box-body'>
            <div className='dataTables_wrapper form-inline dt-bootstrap'>
              {this.renderContent()}
              {/* <Pages enableEntries='true' changePage={this.changePage} total={this.state.current.totalRows} currentPage={this.state.current.pageNumber} pageSize={this.state.current.pageSize} /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
