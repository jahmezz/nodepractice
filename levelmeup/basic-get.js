var level = require('level');
var db = level(process.argv[2]);

var x = 0;
var count = 0;
while (x < 101) {
  db.get('key' + x, function (err, value) {
      if(err) {
        if(!err.notFound) throw err;
      } else {
        console.log('key' + count + '=' + value);
      }
      count++;
  });
  x++;
}
