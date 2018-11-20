var route_loader = {};

var config = require('../secret/setting');


route_loader.init = function (app, router) {
  console.log('라우팅 정보 초기화중...');
  return initRoutes(app, router);
}

// route_info에 정의된 라우팅 정보 처리
function initRoutes(app, router) {

  var infoLen = config.route_info.length;
  console.log('%d개의 라우팅 경로 추가중...', infoLen);

  for (var i = 0; i < infoLen; i++) {
    var curItem = config.route_info[i];

    var curModule = require(curItem.file);

    if (curItem.type == 'get') {
      router.route(curItem.path).get(curModule[curItem.method]);
    } else if (curItem.type == 'post') {
      router.route(curItem.path).post(curModule[curItem.method]);
    } else {
      router.route(curItem.path).post(curModule[curItem.method]);
    }


    console.log('라우팅 경로 [%s]이(가) 설정됨.', curItem.path);
  }
  app.use('/', router);
}

module.exports = route_loader;
