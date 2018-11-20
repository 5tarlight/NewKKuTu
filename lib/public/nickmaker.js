module.exports = function createNick (length) {
  let a = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ0123456789abcdefghijklnmopqrstuvwxyz'
  let temp = ''
  for (let i = 0; i < length; i++) {
    var land = Math.floor(Math.random() * (a.length - 1 - 0 + 1)) + 0
    temp += a[land]
  }
  return 'guest_' + temp
}