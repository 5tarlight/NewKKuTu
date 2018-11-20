module.exports = {
  db: {
    dbname: 'Your DB Name Here',
    username: 'Your DB Username Here',
    password: 'Your DB Password Here',
    host: 'localhost',
    port: 3306
  },
  server: {
    host: 'starkkutu.kro.kr',
    port: 80
  },
  route_info: [
    {file: '../routes/portal', path: '/', method: 'join', type: 'get'},
    {file: '../routes/register', path: '/register', method: 'join', type: 'get'},
    {file: '../routes/register', path: '/process/register', method: 'register', type: 'post'},
    {file: '../routes/login', path: '/login', method: 'join', type: 'get'},
    {file: '../routes/login', path: '/process/login', method: 'check', type: 'post'},
    {file: '../routes/format', path: '/logout', method: 'format', type: 'get'},
    {file: '../routes/show', path: '/sessions', method: 'join', type: 'get'},
    {file: '../routes/game', path: '/game', method: 'join', type: 'get'}
  ]
}
