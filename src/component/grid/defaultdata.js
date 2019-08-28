import React from 'react'
import _ from 'lodash'

export default () => {
  let entries = [
    { text: 2, value: 2 },
    { text: 10, value: 10 },
    { text: 20, value: 20 },
    { text: 30, value: 30 },
    { text: 40, value: 40 },
    { text: 50, value: 50 },
    { text: 100, value: 100 }
  ]

  let tabOptions = [
    {
      name: 'all',
      text: 'All',
      id: 'all',
      // renderAction: (state, data) => <Action data={data} content={() => {
      //   return <a onClick={() => this.handleAction('ACTIVE')}><i className={`fa ${data.is_active ? 'fa-check' : 'fa-ban'}`} /></a>
      // }} />,
      on: (state) => {
        let newState = _.clone(state)
        newState.payload.isDelete = false
        return newState
      }
    },
    {
      name: 'trash',
      text: 'Trash',
      id: 'trash',
      on: (state) => {
        let newState = _.clone(state)
        newState.payload.isDelete = true
        return newState
      }
    }
  ]

  return {
    tabOptions: tabOptions,
    entriesOption: entries,
    dfpayload: {
      strKey: '',
      pageSize: entries[0].value,
      pageNumber: 1,
      colSort: 'create_date',
      typeSort: '',
      isDelete: 0
    }
  }
}
