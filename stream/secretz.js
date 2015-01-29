/*jslint node: true */
'use strict';

var crypto = require('crypto'),
    zlib = require('zlib'),
    tar = require('tar'),
    through = require('through'),
    // outputs 'entry's
    parser = tar.Parse();

// called whenever entries are created
function onEntry(entry) {
    // if the entry is not a file, we skip
    if(entry.type !== 'File') {
        return;
    }

    //append the path of entry
    function write(data) {
        this.queue(data.toString() + ' ' + entry.path + '\n');
    }

    // find hash, append file path and print
    entry.pipe(crypto.createHash('md5', { encoding: 'hex' }))
         .pipe(through(write))
         .pipe(process.stdout);
}

// event handler for entry
parser.on('entry', onEntry);

// grab decoder info
var cipher = process.argv[2],
    passphrase = process.argv[3];

// decrypt, unzip and then handle entries in zip file
process.stdin.pipe(crypto.createDecipher(cipher, passphrase))
             .pipe(zlib.createGunzip())
             .pipe(parser);