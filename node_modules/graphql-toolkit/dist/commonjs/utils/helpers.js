"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asArray = (fns) => (Array.isArray(fns) ? fns : [fns]);
function chainFunctions(funcs) {
    if (funcs.length === 1) {
        return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
exports.chainFunctions = chainFunctions;
function isEqual(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        if (a.length !== b.length)
            return false;
        for (var index = 0; index < a.length; index++) {
            if (a[index] !== b[index]) {
                return false;
            }
        }
        return true;
    }
    return a === b || (!a && !b);
}
exports.isEqual = isEqual;
function isNotEqual(a, b) {
    return !isEqual(a, b);
}
exports.isNotEqual = isNotEqual;
//# sourceMappingURL=helpers.js.map