/*jslint node: true */
'use strict';

function getShortMessages(messages) {
    function isShort(obj) {
        return obj.message.length < 50;
    }
    function getString(obj) {
        return obj.message;
    }
    return messages.filter(isShort).map(getString);
}

module.exports = getShortMessages;