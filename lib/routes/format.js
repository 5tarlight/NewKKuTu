module.exports.format = function(req, res) {
  req.session.nick = null
  res.redirect('/')
}