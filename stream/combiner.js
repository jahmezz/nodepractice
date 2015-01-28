/*jslint node: true */
'use strict';

var combine = require('stream-combiner');
var split = require('split');
var zlib = require('zlib');
var through = require('through');

module.exports = function () {
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
    var record, json;
    return combine(
        split(),
        through(function (text) {
            if(text.length > 0) this.queue(JSON.parse(text));
        }),
        through(
            function on_write(row) {
                record = grouper.on_row(row);
                if(record) {
                    var json = JSON.stringify(record);
                    this.queue(json);
                    this.queue('\n');
                }
            },
            function on_end() {
                record = grouper.on_row({type: 'genre', name: undefined});
                json = JSON.stringify(record);
                this.queue(json);
                this.queue('\n');
                this.queue(null);
            }),
        zlib.createGzip());
};