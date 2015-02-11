/*jslint node: true */
'use strict';

function Spy(target, method) {
    var original = target[method];
    var result = {
        count: 0
    };

    target[method] = function () {
        result.count++;
        return original.apply(this, arguments);
    };

    return result;
}

module.exports = Spy;