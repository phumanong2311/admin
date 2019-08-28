
import React from 'react'
import eventEmitter from './utils/eventEmitter'

const ThemeContext = React.createContext({})

const defaultControllerSelector = (c) => ({
  api: c.api
})

let appCtrl = {}

const setupAppControllerContext = (ctrl) => {
  appCtrl = ctrl
  window.appCtrl = appCtrl
}

class ControllerProvider extends React.Component {
  constructor (props) {
    super(props)
    this.state = {...appCtrl}
    this.updateState = this.updateState.bind(this)
  }

  componentDidMount () {
    eventEmitter.on('changeAppCtrl', this.updateState)
  }

  updateState (mutation = {oldState: null, newState: null}) {
    this.setState({...appCtrl})
  }

  componentWillUnmount () {
    eventEmitter.removeListener('changeAppCtrl', this.updateState)
  }

  render () {
    let contextValue = {...this.state}
    return (
      <ThemeContext.Provider value={contextValue}>
        {this.props.children}
      </ThemeContext.Provider>
    )
  }
}

const withContainer = (Component, userSelector = defaultControllerSelector, ReactComponent = React.PureComponent) => {
  class ContainerWrapper extends ReactComponent {
    constructor (props) {
      super(props)
      this.state = {}
      this.componentRef = React.createRef()
    }

    render () {
      return (
        <ThemeContext.Consumer>
          {(c) => {
            let defaultProps = defaultControllerSelector(c)
            let userSelectorProps = {}
            if (userSelector) {
              userSelectorProps = userSelector(c, this.props)
            }
            return <Component
              ref={this.componentRef}
              {...defaultProps}
              {...userSelectorProps}
              {...this.props}
            />
          }}
        </ThemeContext.Consumer>
      )
    }
  }
  return ContainerWrapper
}

export { setupAppControllerContext, ControllerProvider, withContainer }
