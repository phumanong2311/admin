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

        if (!error && response.statusCode === 200) {
          var resp = JSON.parse(body)
          if (resp) {
            if (resp.user) return done(null, resp.user)
            return done(null, false)
          } else {
            return done(null, false)
          }
        } else {
          return done(null, false)
        }
      })
    }
  ))

  // init passport
  passport.serializeUser((user, done) => {
    done(null, user)
  })

  // check api with passport
  passport.deserializeUser((user, done) => {
    return done(null, user)
    // var { username, token } = user
    // var api = url.format({
    //   pathname: config.server.domain + '/api/admin/get-user', query: { 'username': username, 'token': token }
    // })
    // request(api, function (error, response, body) {
    //   if (!error && response.statusCode === 200) {
    //     var user = JSON.parse(body)
    //     if (user && user.status === 200) {
    //       if (user.data) {
    //         return done(null, user.data)
    //       } else {
    //         return done(null, false)
    //       }
    //     } else {
    //       return done(null, false)
    //     }
    //   } else {
    //     return done(null, false)
    //   }
    // })
  })
}
