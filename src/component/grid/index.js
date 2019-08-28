import React from 'react'
import Table from '../../collections/table'
import Tabs from './tab'
import Action from './action'
import ActionTrash from './actionTrash'
import PageLayout from '../../layout/pageLayout'
import GridViewLayout from '../../layout/gridViewLayout'
import { withContainer } from '../../context'
import METADATA from '../../helper/meta'
import dfdataModule from './defaultdata'
import _ from 'lodash'

let dfdata = dfdataModule()

class GridView extends React.PureComponent {
  constructor (props) {
    super(props)
    this.tabOptions = this.props.tabOptions || dfdata.tabOptions
    this.state = {
      payload: dfdata.dfpayload,
      tabCurrent: this.tabOptions[0].name
    }
    this.handleEntries = this.handleEntries.bind(this)
    this.handleSearchBox = this.handleSearchBox.bind(this)
    this.handleSort = this.handleSort.bind(this)
    this.renderAction = this.renderAction.bind(this)
    this.handleAction = this.handleAction.bind(this)
    this.handleActionTrash = this.handleActionTrash.bind(this)
    this.handleTabs = this.handleTabs.bind(this)
  }

  handleEntries (e) {
    let value = e.target.value
    let state = _.clone(this.state)
    state.payload.pageSize = value
    state.payload.pageNumber = 1
    this.setState(state, () => { this.getData() })
  }

  handleSearchBox (value) {
    let state = _.clone(this.state)
    state.payload.strKey = value
    state.payload.pageNumber = 1
    this.setState(state, () => { this.getData() })
  }

  handleSort (name, value) {
    let state = _.clone(this.state)
    state.payload.pageNumber = 1
    state.payload.colSort = name
    state.payload.typeSort = value
    this.setState(state, () => { this.getData() })
  }

  renderAction (data) {
    let {meta} = this.props
    let action = METADATA[meta].ACTIONLINK

    if (this.state.tabCurrent === 'all') return <Action data={data} linkedit={action.EDIT} handleAction={this.handleAction} />
    else if (this.state.tabCurrent === 'trash') return <ActionTrash data={data} handleActionTrash={this.handleActionTrash} />
  }

  handleAction (type, data) {
    if (type === 'ACTIVE') {
      this.update({ id: data._id, isActive: !data.isActive })
    } else if (type === 'DELETE') {
      this.delete({ id: data._id, isDelete: true })
    }
  }

  handleActionTrash (type, data) {
    if (type === 'ACTIVE') {
      this.update({ id: data._id, isDelete: false })
    } else if (type === 'DELETE') {
      this.remove({ id: data._id })
    }
  }

  handleTabs (id) {
    let state = _.clone(this.state)
    state.payload.pageNumber = 1
    state.tabCurrent = id
    state = dfdata.tabOptions.find(item => item.id === id).on(state)
    this.setState(state, () => { this.getData() })
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    let { api, meta } = this.props
    let { payload } = this.state
    api[meta].gets(payload)
  }

  update (data) {
    let { api, meta } = this.props
    api[meta].update(data, () => {
      this.getData()
    })
  }

  delete (data) {
    let { api, meta } = this.props
    api[meta].update(data, () => {
      this.getData()
    })
  }

  remove (data) {
    let { api, meta } = this.props
    api[meta].delete(data, () => {
      this.getData()
    })
  }

  render () {
    let { meta, data } = this.props
    let currentData = METADATA[meta]
    let { PAGE_HEADER, TABLEVIEW } = currentData
    let fnc = {
      handleEntries: this.handleEntries,
      handleSearchBox: this.handleSearchBox
    }

    let fncTable = {
      handleSort: this.handleSort
    }

    let { payload, tabCurrent } = this.state
    let { typeSort, colSort } = payload
    return (
      <PageLayout header={PAGE_HEADER}>
        <Tabs active={tabCurrent} options={this.tabOptions} handleTabs={this.handleTabs} />
        <GridViewLayout
          search={this.props.search || false}
          entries
          entriesOption={dfdata.entriesOption}
          fnc={fnc}>
          <Table
            tableModel={TABLEVIEW(this)}
            fnc={fncTable}
            sortType={typeSort}
            sortKey={colSort}
            sortHeader={this.props.sortHeader || false}
            sortFooter={this.props.sortFooter || false}
            data={(data && data.list) ? data.list : []}
          />
        </GridViewLayout>
      </PageLayout>
    )
  }
}

export default withContainer(React.memo(GridView), (c, props) => ({
  api: c.api,
  data: c.data[props.meta]
}))
