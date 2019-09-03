const LocalStrategy = require('passport-local').Strategy
var request = require('request')
const url = require('url')
const config = require('../config')

module.exports = (passport) => {
  // register passport when user login form
  passport.use(new LocalStrategy(
    (username, password, done) => {
      var api = url.format({
        pathname: config.server.domain + '/api/admin/login',
        query: {
          'username': username,
          'password': password
        }
      })
      request(api, function (error, response, body) {
        if (error) return done(null, false)
        if (response.statusCode !== 200) return done(new Error('Get user fail'))
        var resp = JSON.parse(body)
        return done(null, resp.user)
      })
    }
  ))

  // init passport
  passport.serializeUser((user, done) => {
    done(null, { _id: user._id, username: user.username, token: user.token })
  })

  // check api with passport
  passport.deserializeUser((userSession, done) => {
    var { username, token } = userSession
    var api = url.format({
      pathname: config.server.domain + '/api/admin/auth-user/' + username, query: { 'token': token }
    })
    request(api, function (error, response, body) {
      if (error) return done(error)
      if (response.statusCode !== 200) return done(new Error('Get user fail'))
      var resp = JSON.parse(body)
      return done(null, resp.data)
    })
  })
}
