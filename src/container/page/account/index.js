import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'account'

export default class Account extends React.PureComponent {
  constructor (props) {
    super(props)
    const ACCOUNTLINK = LINK.ACCOUNTLINK
    this.state = {
      routes: [
        { key: 'account-gridview', permissions: ['ACCOUNTVIEW'], path: ACCOUNTLINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        // { key: 'account-form', permissions: ['CATEGORYADD'], exact: true, path: ACCOUNTLINK.ADD, render: (props) => <FormWrapper {...props} /> },
        { key: 'account-form', permissions: ['ACCOUNTEDIT'], path: ACCOUNTLINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
      ]
    }
    this.getBaseUrl = this.getBaseUrl.bind(this)
  }

  getBaseUrl (widget = '/') {
    return widget
  }

  render () {
    return (
      <React.Fragment>
        {this.state.routes.map((route) => <Route {...route} />)}
      </React.Fragment>
    )
  }
}
