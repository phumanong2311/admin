import React from 'react'
import ReactDom from 'react-dom'

import App from './container/app'
import Controller from './controller'
import { setupAppControllerContext, ControllerProvider } from './context'

import './scss/main.scss'

var ctx = new Controller()
setupAppControllerContext(ctx)
ctx.runApplication(() => {
  ReactDom.render(
    <ControllerProvider>
      <App />
    </ControllerProvider>, document.getElementById('app'))
})
