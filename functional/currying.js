/*jslint node: true */
'use strict';

function curryN(fn, n) {
    if (!n) {
        n = fn.length;
    }

    function genCurry(prev) {
        return function (arg) {
            var args = prev.concat(arg);
            if (args.length < n) return genCurry(args);
            else return fn.apply(this, args);
        };
    }

    return genCurry([]);
}

module.exports = curryN;