'use strict';

var _xRay = require('x-ray');

var _xRay2 = _interopRequireDefault(_xRay);

var _streamToString = require('stream-to-string');

var _streamToString2 = _interopRequireDefault(_streamToString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import fs from 'fs';
var x = (0, _xRay2.default)();
// Check imports
// console.log(x);
// console.log(fs);
// console.log(toString);

var scrape = function scrape(url) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'a';
  var title = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var link = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';

  console.log('=======================================\n');
  console.log('Scraping for links at:', url);
  console.log('Within element(s):', target);
  // process.argv.forEach((val, index, array) => {
  // console.log('val:', val, 'index:', index, 'array', array, '\n');
  // console.log('val:', val);
  // });
  var result = void 0,
      sleep = void 0;

  sleep = function sleep(ms) {
    var ct = new Date().getTime();
    while (ct + ms >= new Date().getTime()) {};
  };

  result = x('http://' + url, target, [{
    title: title + '',
    link: link + '@href'
  }])
  // .paginate('.nav-previous a@href')
  .limit(3);

  result.write('results.json');

  result.write().on('data', function (chunk) {
    console.log('... Received ' + chunk.length + ' bytes of data.\nHere\'s what I found:\n\n=======================================\n    ');
  });

  (0, _streamToString2.default)(result.write()).then(function (msg) {
    // console.log(typeof msg);
    var json = JSON.parse(msg);
    sleep(3000);

    json.forEach(function (element) {
      console.log('[' + element.title + ']:', element.link);
    });
  });
};

scrape(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
