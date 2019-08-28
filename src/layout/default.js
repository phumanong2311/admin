import React from 'react'
import Header from '../common/header'
import SideBar from '../common/sidebar'
import Footer from '../common/footer'
import ControlSideBar from '../common/controlSidebar'

class DefaultLayout extends React.Component {
  render () {
    return (
      <React.Fragment>
        <Header />
        <SideBar />
        <div className='content-wrapper'>
          <section className='content-header'>
            <h1> Admin System <small>Control panel</small> </h1>
            <ol className='breadcrumb'>
              <li><a href='#'><i className='fa fa-dashboard'></i> Home</a></li>
              <li className='active'>Dashboard</li>
            </ol>
          </section>
          {this.props.children}
        </div>
        <Footer />
        <ControlSideBar />
      </React.Fragment>
    )
  }
}

export default DefaultLayout

