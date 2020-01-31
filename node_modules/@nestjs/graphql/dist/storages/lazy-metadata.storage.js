"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LazyMetadataStorageHost {
    constructor() {
        this.storage = [];
    }
    store(fn) {
        this.storage.push(fn);
    }
    load() {
        this.storage.forEach(fn => fn());
    }
}
exports.LazyMetadataStorageHost = LazyMetadataStorageHost;
exports.lazyMetadataStorage = new LazyMetadataStorageHost();
