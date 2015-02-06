/*jslint node: true */
'use strict';

function logger(namespace) {
  return console.log.bind(console, namespace);
}

module.exports = logger;