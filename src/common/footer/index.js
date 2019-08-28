import React from 'react'

class Footer extends React.PureComponent {
  render() {
    return (
      <footer className='main-footer'>
        <div className='pull-right hidden-xs'>
          <b>Version</b> 1
        </div>
        <strong>Copyright &copy; 2018-2019 <a>TA Company</a>.</strong> All rights reserved.
      </footer>
    )
  }
}
export default Footer
