"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./mongoose.decorators"));
var mongoose_utils_1 = require("./mongoose.utils");
exports.getConnectionToken = mongoose_utils_1.getConnectionToken;
exports.getModelToken = mongoose_utils_1.getModelToken;
