/*jslint node: true */
'use strict';

module.exports = function arrayMap(arr, fn) {
    return arr.reduce(function (prev, curr, idx, arr) {
        return prev.concat(fn(curr, idx, arr));
    }, []);
};