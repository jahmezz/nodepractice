/*jslint node: true */
'use strict';

function logger(namespace) {
  return console.log.bind(null, namespace);
}

module.exports = logger;