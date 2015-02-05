/*jslint node: true */
'use strict';

var slice = Array.prototype.slice;

function logger(namespace) {
  return function() {
    var args = slice.call(arguments);
    console.log.apply(console, [namespace].concat(args));
  };
}

module.exports = logger;