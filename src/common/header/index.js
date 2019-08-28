import React from 'react'
import Logo from './logo'
import NavBar from './navbar'

class Headers extends React.Component {
  render () {
    return (
      <header className='main-header'>
        <Logo />
        <NavBar />
      </header>
    )
  }
}

export default Headers
