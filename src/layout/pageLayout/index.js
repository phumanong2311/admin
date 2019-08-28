import React from 'react'
import Header from './headers'

export default class PageLayout extends React.Component {
  render () {
    let { header } = this.props
    return (
      <div className='grid-common'>
        <section className='content'>
          <div className='row'>
            <div className='col-xs-12'>
              <div className='box box-success'>
                <Header header={header} />
                <div className='nav-tabs-custom'>
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
