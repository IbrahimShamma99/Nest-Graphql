"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeArgumentsHost = (host) => Object.assign({
    getRoot: () => host.getArgByIndex(0),
    getArgs: () => host.getArgByIndex(1),
    getContext: () => host.getArgByIndex(2),
    getInfo: () => host.getArgByIndex(3),
}, host);
