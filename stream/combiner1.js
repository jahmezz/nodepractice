/*jslint node: true */
'use strict';

var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through');

module.exports = function () {
    // receives and records books and genres
    var grouper = through(write, end);
    // record of current genre + books
    var current;

    function write(line) {
        if (line.length === 0) {
            return;
        }
        var row = JSON.parse(line);

        //if new genre, print old genre
        if (row.type === 'genre') {
            if (current) {
                this.queue(JSON.stringify(current) + '\n');
            }
            current = { name: row.name, books: [] };
        }

        else if (row.type === 'book') {
            current.books.push(row.name);
        }
    }
    function end() {
        if (current) {
            this.queue(JSON.stringify(current) + '\n');
        }
        this.queue(null);
    }

    //push each new line to the grouper to print the json strings of genrebook,
    //then stream it into the gzip entity.
    return combine(
        split(),
        grouper,
        zlib.createGzip());
};