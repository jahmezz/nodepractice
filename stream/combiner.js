/*jslint node: true */
'use strict';

var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');

module.exports = function () {
    var titles_by_genre = {};
    var grouper = {
        genres: {},
        current_genre: undefined,
        on_row: function (row) {
            if(row.type === 'genre') {
                var old_genre = this.current_genre;
                this.current_genre = row.name;
                if(this.current_genre) {
                    this.genres[this.current_genre] = {
                        name: this.current_genre,
                        books: []
                    };
                }
                return this.genres[old_genre];
            }

            if(row.type === 'book') {
                this.genres[this.current_genre].books.push(row.name);
                return null;
            }
        }
    };
    return combine(split(), parser, gzip);

    function parser(line) {
        var obj = JSON.parse(line);
        if(obj.type === 'genre') {
            type = obj.type;
            obj[type] = [];
        }
        else {
            obj[type].push(obj.name);
        }
    }

    function gzip() {
        var zipFile = zlib.createGzip();
        list.pipe(zipFile);
        this.queue(zipFile);
    }
    
};