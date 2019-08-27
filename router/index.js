var { auth } = require('./middleware')
var passport = require('passport')

var ApiAdapter = require('./adapter')
var menuData = require('../services/menu.util')

module.exports = function (app) {
  app.get('/login', (req, res, next) => {
    req.logout()
    return res.render('page/login')
  })

  app.get('/logout', (req, res, next) => {
    req.logout()
    return res.redirect('/login')
  })

  app.post('/login', passport.authenticate('local', {failureRedirect: '/login', successRedirect: '/'}))

  app.use('/*', auth)

  // base api method get restfull api
  app.get('/base-api', (req, res) => {
    if (!req.query.api) return res.status(500).json({ status: 500, message: 'api missing error' })

    var Adapter = new ApiAdapter({ url: req.query.api, headers: { token: req.user.token } })
    delete req.query.api
    Adapter.setParams(req.query)
    Adapter.get((error, resp) => {
      if (error) return res.status(500).json({ message: 'request api error' })
      var result = JSON.parse(resp)
      var data = result.data
      return res.status(200).json({ status: 200, message: 'success', data })
    })
  })

  // base api method post restfull api
  app.post('/base-api', (req, res) => {
    if (!req.body.api) return res.status(500).json({ status: 500, message: 'api missing error' })
    var Adapter = new ApiAdapter({ url: req.body.api, headers: { token: req.user.token } })
    let body = req.body
    delete body.api
    Adapter.setBody(body)
    Adapter.post((error, resp) => {
      if (error) return res.status(500).json({ message: 'request api error' })
      var result = JSON.parse(resp)
      var {data, message, status} = result
      if (status !== 200) return res.status(200).json({ status, message, data })
      return res.status(200).json({ status: 200, message: 'success', data })
    })
  })

  // base api method put restfull api
  app.put('/base-api', (req, res) => {
    if (!req.body.api) return res.status(500).json({ status: 500, message: 'api missing error' })
    var Adapter = new ApiAdapter({ url: req.body.api, headers: { token: req.user.token } })
    let body = req.body
    delete body.api
    Adapter.setBody(body)
    Adapter.put((error, resp) => {
      if (error) return res.status(500).json({ message: 'request api error' })
      var result = JSON.parse(resp)
      var data = result.data
      return res.status(200).json({ status: 200, message: 'success', data })
    })
  })

  // base api method delete restfull api
  app.delete('/base-api', (req, res) => {
    if (!req.body.api) return res.status(500).json({ status: 500, message: 'api missing error' })
    var Adapter = new ApiAdapter({ url: req.body.api, headers: { token: req.user.token } })
    let body = req.body
    delete body.api
    Adapter.setBody(body)
    Adapter.delete((error, resp) => {
      if (error) return res.status(500).json({ message: 'request api error' })
      var result = JSON.parse(resp)
      var data = result.data
      return res.status(200).json({ status: 200, message: 'success', data })
    })
  })

  app.get('/api/get-current-user', (req, res) => {
    let user = req.user
    let menu = menuData(req.user.permissions)
    let data = { user, menu }
    return res.status(200).json({ status: 200, message: 'server error', data })
  })

  app.get('/*', (req, res, next) => {
    return res.render('page/admin')
  })
}
