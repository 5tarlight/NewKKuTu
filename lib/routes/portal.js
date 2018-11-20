const nickMaker = require('../public/nickmaker')

module.exports.join = function (req, res) {
  console.log(req.ip + ' : portal')

  if(!req.session.nick) {
    req.session.nick = nickMaker(15)
  }
  var context = { username : req.session.nick }

  req.app.render('portal', context, function (err, html) {
    if (err) {
      console.log('렌더링중 에러 발생')
      console.dir(err)

      return
    }

    res.end(html)
  })
}
