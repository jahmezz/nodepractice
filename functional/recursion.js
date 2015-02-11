/*jslint node: true */
'use strict';

function getDependencies(tree, result) {
    var result = result || [];
    var deps = tree.dependencies || {};
    if (!tree.dependencies) return [];

    //iterate through the tree's dependecies
    Object.keys(deps).forEach(function (dep) {
        //create string from dependency and version
        var depStr = dep + '@' + deps[dep].version;

        //if not already present in array, push
        if (result.indexOf(depStr) < 0) {
            result.push(depStr);
        }

        //call again at the next level
        getDependencies(deps[dep], result);
    });

    return result.sort();
}

module.exports = getDependencies;