import Xray from 'x-ray';
import toString from 'stream-to-string';
// import fs from 'fs';
let log, x;
x = Xray();
// Check imports
// console.log(x);
// console.log(fs);
// console.log(toString);

const scrape = (url, target = 'a', title = '', link = '') => {
  console.log('=======================================\n');
  console.log('Scraping for links at:', url);
  console.log('Within element(s):', target);
  // process.argv.forEach((val, index, array) => {
    // console.log('val:', val, 'index:', index, 'array', array, '\n');
    // console.log('val:', val);
  // });
  let result, sleep;

  sleep = (ms) => {
    let ct = new Date().getTime();
    while (ct + ms >= new Date().getTime()){};
  }

  result = x('http://' + url, target, [{
    title: title + '',
    link: link + '@href'
  }])
  // .paginate('.nav-previous a@href')
  .limit(3);

  result.write().on('data', (chunk) => {
    console.log(`... Received ${chunk.length} bytes of data.
Here's what I found:

=======================================
    `);
  });

  toString(result.write()).then((msg) => {
    // console.log(typeof msg);
    let json = JSON.parse(msg);
    sleep(3000);
    json.forEach(element => {
      console.log('[' + element.title + ']:', element.link);
    });
  });

}

// WRITE RESULTS TO XRAY.JSON
log = (url, target = 'a', title = '', link = '') => {
  let result;
  result = x('http://' + url, target, [{
    title: title + '',
    link: link + '@href'
  }])
  .limit(3);
  result.write('xray.json');
}

scrape(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);
log(process.argv[2], process.argv[3], process.argv[4], process.argv[5]);