import React from 'react'
import { Route } from 'react-router-dom'
import Grid from '../../../component/grid'
import FormWrapper from './form'
import { ROLELINK as LINK } from '../../../helper/link'
const KEY = 'category'
export default class Category extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      routes: [
        { key: 'catagory-gridview', path: this.getBaseUrl(LINK.GRID), exact: true, render: (props) => <Grid search sortHeader sortFooter meta={KEY} {...props} /> },
        { key: 'catagory-form', path: this.getBaseUrl(LINK.EDIT), render: (props) => <FormWrapper isEdit {...props} /> }

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
