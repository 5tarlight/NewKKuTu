const express = require('express')
const http = require('http')
const path = require('path')
const bodyParser = require('body-parser')
const serveStatic = require('serve-static')
const cors = require('cors')
const expressErrorHandler = require('express-error-handler')
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const socketio = require('socket.io')

const setting = require('./lib/secret/setting')
const r_loader = require('./lib/routes/route_loader')

var app = express()
var errorHandler = expressErrorHandler({
  static: {
    '404': './lib/public/404.html'
  }
})

app.set('port', setting.server.port)
app.set('views', path.join(__dirname, '/lib/public/views'))
app.set('view engine', 'ejs')
console.log('뷰 엔진이 ejs로 설정되었습니다.')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use(cookieParser())
app.use(expressSession({
  secret: 'my key',
  resave: true,
  saveUninitialized: true
}))

app.use('/', serveStatic(path.join(__dirname, '/lib/public')))

r_loader.init(app, express.Router())

app.use(expressErrorHandler.httpError(404))
app.use(errorHandler)

var server = http.createServer(app).listen(app.get('port'), function () {
  console.log('서버가 시작되었습니다 : ' + app.get('port'))
})

var io = socketio.listen(server)
console.log('socket.io ready')

io.sockets.on('connection', function(socket) {
  console.log('connection info : ', socket.request.connection._peername)
  socket.remoteAddress = socket.request.connection._peername.address
  socket.remotePort = socket.request.connection._peername.port
})