/*jslint node: true */
'use strict';

function doubleAll(numbers) {
    return numbers.map(function double(num) {
        return num * 2;
    });
}

module.exports = doubleAll;