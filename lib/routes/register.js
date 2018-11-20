const mysql = require('mysql')
const setting = require('../secret/setting.js')
const nickMaker = require('../public/nickmaker')

var pool = mysql.createPool({
  connectionLimit: 10,
  host: setting.db.host,
  port: setting.db.port,
  user: setting.db.username,
  password: setting.db.password,
  database: setting.db.dbname,
  debug: false
})

module.exports.join = function (req, res) {
  console.log(req.ip + ' : register')
  if (!req.session.nick) {
    req.session.nick = nickMaker(15)
  }
  var context = {
    username: 'guest_' + req.session.nick
  }
  req.app.render('register', context, function (err, html) {
    if (err) {
      console.log('렌더링중 에러 발생')
      console.dir(err)

      return
    }

    res.end(html)
  })
}

module.exports.register = function (req, res) {
  var id = req.body.id || req.query.id
  var password = req.body.password || req.query.password

  pool.getConnection(function (err, conn) {
    if (err) {
      if (conn) {
        conn.release()
      }
      console.log('에러 발생')
      console.dir(err)
    }
    var data = { id: String(id), password: String(password) }

    var exec = conn.query('INSERT INTO user SET ?', data, function (err, result) {
      conn.release()
      console.log(exec.sql)

      if (err) {
        console.log('에러 발생')
        console.dir(err)

        return
      }
      console.log(req.ip + ' : ' + data.id + ', ' + data.password + ' 회원가입됨')

      var context = {}
      req.app.render('register_success', context, function (err, html) {
        if (err) {
          console.log('렌더링중 에러 발생')
          console.dir(err)

          return
        }

        res.end(html)
      })
    })
  })
}
