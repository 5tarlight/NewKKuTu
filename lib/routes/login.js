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
  console.log(req.ip + ' : login')
  if (!req.session.nick) {
    req.session.nick = nickMaker(15)
  }
  var context = {
    username: req.session.nick
  }
  req.app.render('login', context, function (err, html) {
    if (err) {
      console.log('렌더링중 에러 발생')
      console.dir(err)

      return
    }

    res.end(html)
  })
}

module.exports.check = function (req, res) {
  pool.getConnection(function (err, conn) {
    if (err) {
      if (conn) {
        conn.release()
      }
      console.dir(err)
      return
    }

    var id = req.body.id || req.query.id
    var password = req.body.password || req.query.password

    var exec = conn.query('select * from user where id = ? and password = ?', [String(id), String(password)], function (err, rows) {
      conn.release()
      console.log(exec.sql)

      if (err) {
        console.log('에러 발생')
        console.dir(err)
        return
      }

      if (rows.length > 0) {
        req.session.nick = rows[0].id
        var context = {}
        req.app.render('login_success', context, function (err, html) {
          if (err) {
            console.log('렌더링중 에러 발생')
            console.dir(err)

            return
          }

          res.end(html)
        })
      } else {
        var context = {}
        req.app.render('login_fail', context, function (err, html) {
          if (err) {
            console.log('렌더링중 에러 발생')
            console.dir(err)

            return
          }

          res.end(html)
        })
      }
    })
    // 세션 추가 코드
  })
}
