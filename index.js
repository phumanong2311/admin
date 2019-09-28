var express = require('express')
const app = express()
var server = require('http').createServer(app)
const passport = require('passport')
var engine = require('ejs-locals')
var cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
var path = require('path')

// create socket app
var io = require('socket.io')(server)

const session = require('express-session')

global.appSession = session({
  secret: 'TACOMPANY',
  name: 'ta'
})

// middle ware
app.use(global.appSession)
app.use(cookieParser())
app.use(bodyParser())

app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())
app.use(passport.initialize())
app.use(passport.session())
app.use('/', express.static('dist'))
app.use('/', express.static('lib'))

// view app
app.set('views', path.join(__dirname, '/views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')

require('./passport/init')(passport)

// router app
require('./router')(app)

require('./socket')(io, app)

app.listen(process.env.PORT || 3200, () => {
  console.log(`server listen port ${process.env.PORT || 3200}`)
})
