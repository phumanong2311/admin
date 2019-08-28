import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import LINK from '../../../helper/link'
const KEY = 'category'

export default class Category extends React.PureComponent {
  constructor (props) {
    super(props)
    const CATEGORYLINK = LINK.CATEGORYLINK
    this.state = {
      routes: [
        { key: 'catagory-gridview', permissions: ['CATEGORYVIEW'], path: CATEGORYLINK.GRID, exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        // { key: 'catagory-form', permissions: ['CATEGORYADD'], exact: true, path: CATEGORYLINK.ADD, render: (props) => <FormWrapper {...props} /> },
        { key: 'catagory-form', permissions: ['CATEGORYEDIT'], path: CATEGORYLINK.EDIT, render: (props) => <FormWrapper isEdit {...props} /> }
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
