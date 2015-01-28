/*jslint node: true */
'use strict';
var concat = require('concat-stream');
process.stdin.pipe(concat(fullString));

function fullString(string) {
    var s = string.toString().split('').reverse().join('');
    console.log(s);
}