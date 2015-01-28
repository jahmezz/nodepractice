/*jslint node: true */
'use strict';
var through = require('through');
var trumpet = require('trumpet');
var tr = trumpet();

//grab all loud class elements
var loud = tr.select('.loud').createStream();
loud.pipe(through(function (buf) {
    this.queue(buf.toString().toUpperCase());
})).pipe(loud);

process.stdin.pipe(tr).pipe(process.stdout);