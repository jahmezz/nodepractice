/*jslint node: true */
'use strict';
var split = require('split');
var through = require('through');
var odd = true;
var tr = through(function (buf) {
    var line = buf.toString();
    this.queue(odd ? line.toLowerCase() + '\n'
                   : line.toUpperCase() + '\n');
    odd = !odd;
});
process.stdin
    .pipe(split())
    .pipe(tr)
    .pipe(process.stdout);