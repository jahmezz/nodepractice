var express = require('express');
var app = express();

app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(process.argv[3]));

app.listen(process.argv[2]);