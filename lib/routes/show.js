module.exports.join = function (req, res) {
  res.writeHead('200', {
    'Content-Type': 'html;charset=utf8'
  })
  res.end(req.session.nick)
}