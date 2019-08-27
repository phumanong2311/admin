
var init = {
  checkAuthentication: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.redirect('/login')
    }
  },
  checkAuthenticationResponseError: (req, res, next) => {
    if (req.isAuthenticated()) {
      next()
    } else {
      res.status(500).json({message: 'authenticate error'})
    }
  }
}

module.exports = init
