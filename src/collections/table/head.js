import React from 'react'
import _ from 'lodash'

export default class Thead extends React.Component {
  constructor (props) {
    super(props)
    this.handleSort = this.handleSort.bind(this)
    this.state = {
      sort: this.props.sortType || 'sort-default',
      value: this.props.sortKey || ''
    }
  }

  handleSort (e) {
    let {isSort} = this.props
    if (!isSort) return

    let key = e.currentTarget.getAttribute('data-key')
    let state = _.clone(this.state)
    if (state.value !== key) {
      state.sort = 'asc'
    } else {
      if (state.sort !== 'asc') state.sort = 'asc'
      else state.sort = 'desc'
    }
    state.value = key
    this.setState(state, () => {
      this.props.handleSort(state.value, state.sort)
    })
  }

  render () {
    let { tblModel, isSort } = this.props
    let { sort, value } = this.state
    return (
      <React.Fragment>
        <thead>
          <tr>
            {Object.keys(tblModel).map((key, i) => {
              let classsort = ''
              let domSort = <th key={i}>{tblModel[key].text}</th>
              if (isSort && tblModel[key].sorted) {
                if (tblModel[key].sorted) classsort = 'sort-default'
                if (tblModel[key].col === value) classsort = sort
                domSort = <th className={classsort} key={i} data-key={tblModel[key].col} onClick={this.handleSort}>{tblModel[key].text}</th>
              }
              return domSort

            })}
          </tr>
        </thead>
      </React.Fragment>
    )
  }
}
